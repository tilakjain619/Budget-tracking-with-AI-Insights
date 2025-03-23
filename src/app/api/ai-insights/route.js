import { connectToDatabase } from "@/lib/connectToDatabase";
import AIInsight from "@/models/AIInsight";
import { NextResponse } from "next/server";


export async function GET(req) {
    try {
        await connectToDatabase();

        const { searchParams } = req.nextUrl;
        const userId = searchParams.get("userId");
        const month = Number(searchParams.get("month"));
        const year = Number(searchParams.get("year"));

        console.log("Query Params:", { userId, month, year });

        if (!userId || !month || !year) {
            return NextResponse.json({ error: "Missing required query parameters" }, { status: 400 });
        }

        const insights = await AIInsight.findOne({ userId, month, year });

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

        const { userId, month, year, spendingPattern, unusualSpending, savingTip, predictedExpenseNextMonth } = await req.json();

        if (!userId || !month || !year || !spendingPattern || !unusualSpending || !savingTip || predictedExpenseNextMonth === undefined) {
            return new Response(JSON.stringify({ message: "Missing required data" }), { status: 400 });
        }

        const newAIInsight = await AIInsight.create({
            userId,
            month,
            year,
            spendingPattern,
            unusualSpending,
            savingTip,
            predictedExpenseNextMonth,
        });

        return new Response(JSON.stringify(newAIInsight), { status: 201 });
    } catch (error) {
        console.error("Error saving AI insights:", error);
        return new Response(JSON.stringify({ message: "Failed to save insights", error: error.message }), { status: 500 });
    }
}
