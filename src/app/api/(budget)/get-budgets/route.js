import { connectToDatabase } from "@/lib/connectToDatabase";
import { NextResponse } from "next/server";
import Budget from "@/models/Budget";
import mongoose from "mongoose";

export async function GET(req) {
    await connectToDatabase();

    try {
        // Extract userId from query parameters
        const searchParams = req.nextUrl.searchParams;
        const userId = searchParams.get("userId");

        // Validate userId
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
        }

        const budgets = await Budget.find({
            userId: new mongoose.Types.ObjectId(userId)
        });

        if (!budgets || budgets.length === 0) {
            return NextResponse.json({ message: "No Budgets found" }, { status: 404 });
        }

        return NextResponse.json(budgets, { status: 200 });
    } catch (error) {
        console.error("Error fetching budgets:", error);
        return NextResponse.json({ error: "Cannot get Budgets. Try again later." }, { status: 500 });
    }
}
