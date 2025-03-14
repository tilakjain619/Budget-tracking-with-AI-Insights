"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { user, setUser } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            alert("Invalid credentials");
        } else {
            setUser(result);
            router.push("/dashboard");
        }
    };

    return (
        <div className="min-h-[75vh] grid w-full justify-center items-center">
            <div className="w-full md:w-[400px]">
                <h2 className="mb-3 text-center text-xl">Welcome back ;)</h2>
                <form onSubmit={handleSubmit} className="grid gap-2">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-md border border-gray-800 focus:border-purple-600"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-md border border-gray-800 focus:border-purple-600"
                    />
                    <button type="submit" className="bg-gradient-to-r px-4 rounded-md py-3 from-purple-800 to-purple-600">Sign In</button>
                    <p className="text-sm md:text-base text-center mt-1">Don't have an account? <Link href="/signup" className="text-purple-400">Signup</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
