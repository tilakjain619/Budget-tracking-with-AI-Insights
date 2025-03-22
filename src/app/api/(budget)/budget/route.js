import { connectToDatabase } from "@/lib/connectToDatabase";
import Budget from "@/models/Budget";
import Expense from "@/models/Expense";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectToDatabase();

    try {
        const {
            userId,
            category,
            limit
        } = await req.json();

        if (!category || !limit || limit <= 0) {
            return NextResponse.json({
                error: 'Category or Limit is invalid'
            }, { status: 400 })
        }

        const existingBudget = await Budget.findOne({
            userId, category
        });

        if (existingBudget) {
            return NextResponse.json({ error: "Category already exists" }, { status: 400 });
        }

        const newBudget = new Budget({
            userId,
            category,
            limit
        });

        await newBudget.save();

        return NextResponse.json({ message: "New Budget category created", budget: newBudget }, { status: 201 });
    } catch (error) {
        console.error("Error creating budget:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    await connectToDatabase();
    const searchParams = req.nextUrl.searchParams;
    const budgetId = searchParams.get('budgetId');

    if (!budgetId) return NextResponse.json({ message: "Budget ID is required" }, { status: 400 });

    try {
        const existingBudget = await Budget.findById(budgetId);
        if (!existingBudget) {
            return NextResponse.json({ message: "Expense not found" }, { status: 404 });
        }
        await Expense.deleteMany({budgetId});
        await Budget.findByIdAndDelete(budgetId);

        return NextResponse.json({ message: "Budget Deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse({ error: "Something went wrong while deleting the Budget" }, { status: 400 });
    }
}