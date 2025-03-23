import mongoose from "mongoose";
import AIInsight from "@/models/AIInsight";
import Expense from "@/models/Expense"; // Assuming you have an Expense model
import { connectToDatabase } from "@/lib/connectToDatabase";
import OpenAI from "openai";

export async function POST(req) {
    try {
        // Ensure database connection
        await connectToDatabase();

        const { userId, income, month, year } = await req.json();

        if (!userId || !income || !month || !year) {
            return new Response(JSON.stringify({ message: "Missing required data" }), { status: 400 });
        }

        // Fetch all expenses for the user across multiple budgets
        const userExpenses = await Expense.find({ userId }).sort({ date: -1 });

        if (!userExpenses.length) {
            return new Response(JSON.stringify({ message: "No expenses found for user" }), { status: 404 });
        }

        // Group expenses by category
        const categorizedExpenses = {};
        userExpenses.forEach((exp) => {
            if (!categorizedExpenses[exp.category]) {
                categorizedExpenses[exp.category] = 0;
            }
            categorizedExpenses[exp.category] += exp.amount;
        });

        const formattedExpenses = Object.entries(categorizedExpenses)
            .map(([category, amount]) => `- ${category}: $${amount}`)
            .join("\n");

        // AI Prompt for overall analysis
        const prompt = `
        Analyze the following user's **overall financial data** over multiple months:
        - Monthly Income: $${income}
        - Expenses:
        ${formattedExpenses}

        Identify:
        1. Major spending trends over multiple months.
        2. Unusual spending patterns.
        3. Long-term savings opportunities.
        4. Predict next month's total expenses.

        Format response as:
        {
          "spendingTrends": "Your spending trend insights here.",
          "unusualSpending": "Your unusual spending insights here.",
          "longTermSavings": "Your long-term savings opportunities here.",
          "predictedExpenseNextMonth": 1234
        }
        `;

        // Initialize OpenAI with AIMLAPI
        const openAI = new OpenAI({
            apiKey: `${process.env.AIMLAPI_KEY}`,
            baseURL: "https://api.aimlapi.com/v1",
            dangerouslyAllowBrowser: true,
            headers: { "Authorization": `Bearer ${process.env.AIMLAPI_KEY}` }
        });

        // Make API call
        const response = await openAI.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a budget analyser and expenses tracker who suggests, recommends and predicts."
                },
                { role: "user", content: prompt }],
            temperature: 0.5,
            max_tokens: 50
        });

        // Log API response
        console.log("AIMLAPI Response:", response);

        // Parse the response safely
        let aiResponse;
        try {
            aiResponse = JSON.parse(response.choices[0].message.content);
        } catch (error) {
            console.error("AI response parsing error:", error);
            return new Response(JSON.stringify({ message: "Invalid AI response format" }), { status: 500 });
        }

        // Save AI Insights to MongoDB
        const newAIInsight = await AIInsight.create({
            userId,
            month,
            year,
            spendingPattern: aiResponse.unusualSpending,
            spendingTrends: aiResponse.spendingTrends,
            savingTip: aiResponse.longTermSavings,
            predictedExpenseNextMonth: aiResponse.predictedExpenseNextMonth,
        });

        return new Response(JSON.stringify(newAIInsight), { status: 200 });
    } catch (error) {
        console.error("Server Error:", error);
        return new Response(JSON.stringify({ message: "Failed to generate AI insights", error: error.message }), { status: 500 });
    }
}
