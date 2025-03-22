import { connectToDatabase } from "@/lib/connectToDatabase";
import { NextResponse } from "next/server";
import Expense from "@/models/Expense";
import Budget from "@/models/Budget";

export async function GET(req) {
    await connectToDatabase();
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    try {

        if(!userId){
            return NextResponse.json({ error: "User ID not provided" }, { status: 400 });
        }

        const expenses = await Expense.find({userId}).sort({
            createdAt: -1
        });

        return NextResponse.json(expenses, { status: 200 });

    } catch (error) {
        return NextResponse({ error: "Error fetching Expenses" }, { status: 400 });
    }
}
export async function POST(req) {
    await connectToDatabase();
    try {
        const {
            userId,
            amount,
            category,
            budgetId,
            description
        } = await req.json();

        if(!userId || !amount || !category || !budgetId || !budgetId || !description){
            return NextResponse.json({ error: "Please provide full details" }, { status: 400 });
        }

        const newExpense = new Expense({
            userId,
            amount,
            category,
            budgetId,
            description
        });

        await newExpense.save();
        // Update Budget's Spent Amount
        await Budget.findByIdAndUpdate(budgetId, {
            $inc: { spent: amount } // ✅ Increment spent amount
        });
        return NextResponse.json({ message: "Expense added" }, { status: 200 });

    } catch (error) {
        return NextResponse({ error: "Something went wrong in Expenses" }, { status: 400 });
    }
}

export async function PUT(req) {
    await connectToDatabase();
    const searchParams = req.nextUrl.searchParams;
    const expenseId = searchParams.get('expenseId');

    if(!expenseId) return NextResponse.json({ message: "Expense ID is required" }, { status: 400 });

    try {
        const {amount, category, budgetId, description} = await req.json();

        const existingExpense = await Expense.findById(expenseId);
        if (!existingExpense) {
            return NextResponse.json({ message: "Expense not found" }, { status: 404 });
        }

        const amountDifference = amount - existingExpense.amount;
        const updatedExpense = await Expense.findByIdAndUpdate(expenseId, {
            amount,
            category,
            budgetId,
            description
        }, {new: true});

        // Update Budget's Spent Amount
        await Budget.findByIdAndUpdate(budgetId, {
            $inc: { spent: amountDifference } // ✅ Adjust spent based on difference
        });

        return NextResponse.json({ message: "Expense Updated" }, { status: 200 });
    } catch (error) {
        return NextResponse({ error: "Something went wrong while updating the Expense" }, { status: 400 });
    }
}
export async function DELETE(req) {
    await connectToDatabase();
    const searchParams = req.nextUrl.searchParams;
    const expenseId = searchParams.get('expenseId');

    if(!expenseId) return NextResponse.json({ message: "Expense ID is required" }, { status: 400 });

    try {
        const existingExpense = await Expense.findById(expenseId);
        if (!existingExpense) {
            return NextResponse.json({ message: "Expense not found" }, { status: 404 });
        }

        const { budgetId, amount } = existingExpense;

        // ✅ Delete the Expense
        await Expense.findByIdAndDelete(expenseId);

        // ✅ Deduct from Budget's Spent Amount
        await Budget.findByIdAndUpdate(budgetId, { $inc: { spent: -amount } });

        return NextResponse.json({ message: "Expense Deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse({ error: "Something went wrong while deleting the Expense" }, { status: 400 });
    }
}