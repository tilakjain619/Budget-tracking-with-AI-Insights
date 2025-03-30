import { connectToDatabase } from "@/lib/connectToDatabase";
import AIInsight from "@/models/AIInsight";
import Budget from "@/models/Budget";
import Expense from "@/models/Expense";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(req) {
    await connectToDatabase();
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    try {
        const { monthly_income, savings_goal } = await req.json();
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        await User.findByIdAndUpdate(userId, {
            monthly_income, savings_goal
        }, { new: true });
        return NextResponse.json({ message: "Profile Updated" }, { status: 200 });

    } catch (error) {
        return NextResponse({ error: "Something went wrong while updating" }, { status: 400 });

    }
}

export async function DELETE(req) {
    await connectToDatabase();
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    try {
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Manually delete related records
        await Expense.deleteMany({ userId });
        await Budget.deleteMany({ userId });
        await AIInsight.deleteMany({ userId });

        // Delete the user
        await User.findByIdAndDelete(userId);

        return NextResponse.json(
            { message: "Account and associated records deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error during deletion:", error);
        return NextResponse.json(
            { error: "Something went wrong while deleting the profile" },
            { status: 400 }
        );
    }
}
