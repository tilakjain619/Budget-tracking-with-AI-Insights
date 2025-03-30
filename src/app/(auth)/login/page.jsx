"use client";
import React, { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ToastContext";
import useProfileStore from "@/store/profileStore";
import Loader from "@/components/Extras/Loader";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { user, setUser } = useAuthStore();
    const { showToast } = useToast();
    const { setProfile } = useProfileStore();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            showToast("Invalid credentials", "danger");
            setLoading(false);
        } else {
            setUser(result);
            const session = await getSession();
            if(session?.user){
                setProfile(session.user);
            }
            router.push("/dashboard");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[75vh] grid w-full items-center">
            <div className="w-full max-w-[400px] mx-auto">
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
                    <button type="submit" className="bg-gradient-to-r flex justify-center gap-2 px-4 rounded-md py-3 w-full from-purple-800 to-purple-600">Sign In
                        {loading && <Loader backgroundColor={"#9333ea"}/>}
                    </button>
                    <p className="text-sm flex items-center gap-1 md:text-base text-center mt-1">Don't have an account? <Link href="/signup" className="text-purple-400 gap-0.5 flex items-center">Signup<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={17} height={17} fill={"none"}>
                        <path d="M16.5 7.5L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M8 6.18791C8 6.18791 16.0479 5.50949 17.2692 6.73079C18.4906 7.95209 17.812 16 17.812 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg></Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
