"use client";
import React, { useState } from 'react'
import axios from 'axios'
import { useToast } from '@/components/ToastContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loader from '@/components/Extras/Loader';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showToast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/signup', { name, email, password });
      setEmail("");
      setName("");
      setPassword("");
      showToast("Signup successful. Redirecting you to Login", "success");
      setTimeout(() =>{
        router.push("/login");
      }, 2000)
    } catch (error) {
      showToast(error.response.data.message, "danger");
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[75vh] grid w-full justify-center items-center">
      <div className="w-full md:w-[400px]">
      <h2 className="mb-3 text-center text-xl">Sign Up on SmartTrack</h2>
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
        <div className='flex items-center gap-2 my-1 text-pretty text-gray-400'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
    <path d="M7 11H6C2.69067 11 2 11.6907 2 15V18C2 21.3093 2.69067 22 6 22H18C21.3093 22 22 21.3093 22 18V15C22 12.7889 21.6917 11.7468 20.5 11.2987" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 18L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.2442 3.13291C17.6913 2.64778 17.9149 2.40522 18.1524 2.26374C18.7256 1.92234 19.4315 1.91173 20.0142 2.23573C20.2557 2.37001 20.4862 2.60575 20.947 3.07721C21.4079 3.54868 21.6383 3.78441 21.7696 4.03149C22.0863 4.62767 22.0759 5.34971 21.7422 5.93611C21.6039 6.17913 21.3668 6.40783 20.8926 6.86523L15.2504 12.3075C13.7556 13.7493 12.8297 14.0483 10.7592 13.9941C10.3833 13.9842 10.1954 13.9793 10.0862 13.8551C9.9769 13.731 9.99182 13.5393 10.0216 13.1558C10.1592 11.3881 10.4706 10.4824 11.6737 9.17706L17.2442 3.13291Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
</svg>
          <p className='text-sm '>By signing up to SmartTrack, I agree to all <span className='text-purple-500 cursor-pointer'>Terms and conditions.</span></p>
        </div>
        <button className="bg-gradient-to-r flex justify-center gap-2 px-4 rounded-md py-3 from-purple-800 to-purple-600" type="submit">Sign Up
        {loading && <Loader backgroundColor={"#9333ea"}/>}
        </button>
        <p className="text-sm md:text-base text-center mt-1 flex items-center gap-1">Already have an account? <Link href="/login" className="text-purple-400 gap-0.5 flex items-center">Signin <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={17} height={17} fill={"none"}>
    <path d="M16.5 7.5L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 6.18791C8 6.18791 16.0479 5.50949 17.2692 6.73079C18.4906 7.95209 17.812 16 17.812 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg></Link></p>
      </form>
      </div>
    </div>
  )
}

export default SignUp
