import React from 'react'

const About = () => {
    return (
        <div className='min-h-screen w-full md:w-[75%] py-4 md:mx-auto'>
            <h1 className='text-xl md:text-3xl font-bold'>About SmartTrack</h1>
            <p className='mt-2 text-gray-300'>💰 SmartTrack is a smart and intuitive web application designed to help users manage their finances efficiently. With features like income tracking, expense categorization, and AI-driven financial insights, this tool enables users to make informed financial decisions and improve their savings.
            </p>
            <hr className='my-3 opacity-25'/>
            <h2 className='text-lg md:text-2xl font-bold'>Key Features</h2>
            <ul className='mt-2 text-gray-300 grid gap-2'>
                <li>✅ <strong>Expense & Income Tracking</strong> – Log and categorize your daily transactions effortlessly.</li>
                <li>📊 <strong>Real-Time Analytics</strong> – Get visual insights into your spending patterns.</li>
                <li>🔄 <strong>Multi-Currency Support (Soon)</strong> – Convert and track expenses in different currencies.</li>
                <li>🤖 <strong>AI-Powered Insights</strong> – Identify unusual spending habits and savings opportunities using GPT-3.5 Turbo.</li>
                <li>🔃 <strong>View and Export Report</strong> – Effortlessly generate detailed reports of your financial data, visualize distributions, and export them in PDF.</li>
                <li>🔐 <strong>Secure Authentication</strong> – Seamless and secure login with MongoDB authentication using NextAuth.</li>
                <li>⚡ <strong>Fast & Responsive UI</strong> – Built with Next.js for a smooth user experience.</li>
            </ul>

            <hr className='my-3 opacity-25'/>
            <h2 className='text-lg md:text-2xl font-bold mt-3'>Why This Project?</h2>
            <p className='mt-2 text-gray-300'>Managing finances can be overwhelming, and many existing solutions lack AI-powered insights to help users make better financial decisions. SmartTrack bridges this gap by offering a smart and personalized approach to budgeting.
            </p>
            <hr className='my-3 opacity-25'/>
            <p className='mt-3'>
                🚀 <strong>Tech Stack</strong> - Next.js, MongoDB, NextAuth, Zustand (state management), and GPT for AI insights.
            </p>
        </div>
    )
}

export default About
