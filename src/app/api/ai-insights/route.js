import { connectToDatabase } from "@/lib/connectToDatabase";
import AIInsight from "@/models/AIInsight";
import { NextResponse } from "next/server";


export async function GET(req) {
    try {
        await connectToDatabase();

        const { searchParams } = req.nextUrl;
        const userId = searchParams.get("userId");
        const day = Number(searchParams.get("day"));
        const month = Number(searchParams.get("month"));
        const year = Number(searchParams.get("year"));

        console.log("Query Params:", { userId, day, month, year });

        if (!userId || !day || !month || !year) {
            return NextResponse.json({ error: "Missing required query parameters" }, { status: 400 });
        }

        const insights = await AIInsight.findOne({ userId, day, month, year });

        console.log("Fetched Insights:", insights);

        // ✅ If no insights exist, return an empty object (not 404)
        if (!insights) {
            return NextResponse.json({}, { status: 200 });
        }

        return NextResponse.json(insights, { status: 200 });
    } catch (error) {
        console.error("Error fetching AI insights:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}


export async function POST(req) {
    try {
        await connectToDatabase(); // Ensure DB connection

        const { userId, day, month, year, spendingPattern, unusualSpending, savingTip, predictedExpenseNextMonth } = await req.json();

        if (!userId || !day || !month || !year || !spendingPattern || !unusualSpending || !savingTip || predictedExpenseNextMonth === undefined) {
            return new Response(JSON.stringify({ message: "Missing required data" }), { status: 400 });
        }

        // Check if insights for this specific day already exist and update or create
        const existingInsight = await AIInsight.findOne({ userId, day, month, year });
        
        if (existingInsight) {
            // Update existing insight
            existingInsight.spendingPattern = spendingPattern;
            existingInsight.unusualSpending = unusualSpending;
            existingInsight.savingTip = savingTip;
            existingInsight.predictedExpenseNextMonth = predictedExpenseNextMonth;
            await existingInsight.save();
            
            return new Response(JSON.stringify(existingInsight), { status: 200 });
        } else {
            // Create new insight
            const newAIInsight = await AIInsight.create({
                userId,
                day,
                month,
                year,
                spendingPattern,
                unusualSpending,
                savingTip,
                predictedExpenseNextMonth,
            });

            return new Response(JSON.stringify(newAIInsight), { status: 201 });
        }
    } catch (error) {
        console.error("Error saving AI insights:", error);
        return new Response(JSON.stringify({ message: "Failed to save insights", error: error.message }), { status: 500 });
    }
}
