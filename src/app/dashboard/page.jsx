"use client";
import RecentTransactions from "@/components/RecentTransactions";
import useAuthStore from "@/store/authStore";
import useProfileStore from "@/store/profileStore";
import axios from "axios";
import Link from "next/link";

import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const { profile } = useProfileStore();
  return (
    <div>
      {user ? (
        <div>
          <section className="flex flex-wrap gap-3 justify-center lg:justify-around">
            <div className="px-5 grid gap-2 w-full sm:w-1/2 md:w-1/3 lg:w-[32%] py-4 rounded-lg bg-gray-800">
              <div className="flex justify-between gap-1">
                <h2 className="text-base font-bold text-gray-400">Total Balance</h2>
                $
              </div>
              <h1 className="text-2xl font-bold md:text-3xl">{profile.currency} 24,000</h1>
              <span className="text-xs md:text-sm text-green-500">+2.4 from last month</span>
            </div>

            <div className="px-5 grid gap-2 w-full sm:flex-1 sm:w-1/2 md:w-1/3 lg:w-[32%] py-4 rounded-lg bg-gray-800">
              <div className="flex justify-between gap-1">
                <h2 className="text-base font-bold text-gray-400">Monthly Balances</h2>
                $
              </div>
              <h1 className="text-2xl font-bold md:text-3xl">{profile.currency} 20,000</h1>
              <span className="text-xs md:text-sm text-red-500">-4 from last month</span>
            </div>

            <div className="px-5 grid gap-2 w-full sm:w-1/2 sm:flex-1 md:w-1/3 lg:w-[32%] py-4 rounded-lg bg-gray-800">
              <div className="flex justify-between gap-1">
                <h2 className="text-base font-bold text-gray-400">Savings Goal</h2>
                $
              </div>
              <h1 className="text-2xl font-bold md:text-3xl">{profile.currency} 29,000</h1>
              <span className="text-xs md:text-sm text-green-500">+2.4 from last month</span>
            </div>
          </section>

          <section className="mt-6 md:mt-8 px-4 py-4 lg:mx-1 bg-gray-800 border border-gray-700 rounded-xl">
            <div className="flex gap-2 items-center">
              <span className="px-3 py-3 bg-purple-600 grid items-center rounded-lg opacity-75">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
                  <path d="M19 16V14C19 11.1716 19 9.75736 18.1213 8.87868C17.2426 8 15.8284 8 13 8H11C8.17157 8 6.75736 8 5.87868 8.87868C5 9.75736 5 11.1716 5 14V16C5 18.8284 5 20.2426 5.87868 21.1213C6.75736 22 8.17157 22 11 22H13C15.8284 22 17.2426 22 18.1213 21.1213C19 20.2426 19 18.8284 19 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M19 18C20.4142 18 21.1213 18 21.5607 17.5607C22 17.1213 22 16.4142 22 15C22 13.5858 22 12.8787 21.5607 12.4393C21.1213 12 20.4142 12 19 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M5 18C3.58579 18 2.87868 18 2.43934 17.5607C2 17.1213 2 16.4142 2 15C2 13.5858 2 12.8787 2.43934 12.4393C2.87868 12 3.58579 12 5 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M13.5 3.5C13.5 4.32843 12.8284 5 12 5C11.1716 5 10.5 4.32843 10.5 3.5C10.5 2.67157 11.1716 2 12 2C12.8284 2 13.5 2.67157 13.5 3.5Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 13V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 13V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 17.5C10 17.5 10.6667 18 12 18C13.3333 18 14 17.5 14 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <div>
                <h2 className="font-bold text-base md:text-lg">AI Insights</h2>
                <p className="text-xs text-gray-400 md:text-sm">Smart analysis of your spending patterns</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <div className="w-full md:w-[49.5%] px-4 py-3 bg-gray-900 rounded-xl flex gap-2">
                <div className="text-green-500 text-lg">
                  $
                </div>
                <div>
                  <h2 className="font-bold text-base md:text-lg">Unusual Spending Pattern</h2>
                  <p className="text-xs text-gray-400  md:text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo minima illo rerum illum expedita officiis iusto!</p>
                </div>
              </div>
              <div className="w-full md:w-[49.5%] px-4 py-3 bg-gray-900 rounded-xl flex gap-2">
                <div className="text-green-500 text-lg">
                  $
                </div>
                <div>
                  <h2 className="font-bold text-base md:text-lg">Unusual Spending Pattern</h2>
                  <p className="text-xs text-gray-400  md:text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo minima illo rerum illum expedita officiis iusto!</p>
                </div>
              </div>
            </div>
          </section>

          <RecentTransactions/>
        </div>
      ) : (
        <h2 className="p-2 text-lg text-balance">Kindly Login to access your Dashboard!</h2>
      )}
    </div>
  );
}

export default Dashboard;

