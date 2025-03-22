import { connectToDatabase } from "@/lib/connectToDatabase";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(req) {
    await connectToDatabase();
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    try {
        const { monthly_income } = await req.json();
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        await User.findByIdAndUpdate(userId, {
            monthly_income
        }, { new: true });
        return NextResponse.json({ message: "Monthly Income Updated" }, { status: 200 });

    } catch (error) {
        return NextResponse({ error: "Something went wrong while updating the Expense" }, { status: 400 });

    }
}