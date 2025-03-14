import { connectToDatabase } from "@/lib/connectToDatabase";
import User from "@/models/User";
import { hash } from "bcryptjs";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        // Connect to the database
        await connectToDatabase();

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ message: "User already exists" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Hash the password
        const hashedPassword = await hash(password, 10);

        // Create and save the new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        // Return success response
        return new Response(JSON.stringify({ message: "User registered successfully" }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error in POST /api/auth/signup:", error);
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
