"use client";
import React, { useState } from 'react'
import axios from 'axios'
import { useToast } from '@/components/ToastContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showToast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', { name, email, password });
      setEmail("");
      setName("");
      setPassword("");
      showToast("Signup successful. Redirecting you to Login", "success");
      setTimeout(() =>{
        router.push("/login");
      }, 2000)
    } catch (error) {
      showToast(error.response.data.message, "danger")
    }
  }

  return (
    <div className="min-h-[75vh] grid w-full justify-center items-center">
      <div className="w-full md:w-[400px]">
      <h2 className="mb-3 text-center text-xl">Start Smart Tracking</h2>
      <form onSubmit={handleSubmit} className="grid gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="w-full px-4 py-3 rounded-md border border-gray-800 focus:border-purple-600"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-3 rounded-md border border-gray-800 focus:border-purple-600"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-3 rounded-md border border-gray-800 focus:border-purple-600"
        />
        <button className="bg-gradient-to-r px-4 rounded-md py-3 from-purple-800 to-purple-600" type="submit">Sign Up</button>
        <p className="text-sm md:text-base text-center mt-1">Already have an account? <Link href="/login" className="text-purple-400">Sign In</Link></p>
      </form>
      </div>
    </div>
  )
}

export default SignUp
