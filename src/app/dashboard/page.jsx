"use client";
import RecentTransactions from "@/components/RecentTransactions";
import useAuthStore from "@/store/authStore";
import useProfileStore from "@/store/profileStore";
import axios from "axios";
import Link from "next/link";

import React, { useEffect, useState } from 'react'
import TotalBalance from "@/components/TotalBalance";
import MonthlyExpenses from "@/components/MonthlyExpenses";
import Savings from "@/components/Savings";
import AIInsights from "@/components/AIInsights";

const Dashboard = () => {
  const { user } = useAuthStore();
  const { profile } = useProfileStore();
  const income = profile?.monthly_income;
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
  return (
    <div>
      {user ? (
        <div>
          <section className="flex flex-wrap gap-3 justify-center lg:justify-around">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[32%]">
            <TotalBalance/>
            </div>

            <div className="w-full sm:flex-1 sm:w-1/2 md:w-1/3 lg:w-[32%]">
              <MonthlyExpenses/>
            </div>
            <div className="w-full sm:flex-1 sm:w-1/2 md:w-1/3 lg:w-[32%]">
              <Savings/>
            </div>

            
          </section>

          <AIInsights income={income} month={month} year={year} />

          <RecentTransactions/>
        </div>
      ) : (
        <h2 className="p-2 text-lg text-balance">Kindly Login to access your Dashboard!</h2>
      )}
    </div>
  );
}

export default Dashboard;

