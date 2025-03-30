import React, { useState, useEffect } from "react";
import TotalBalance from "./TotalBalance";
import MonthlyExpenses from "./MonthlyExpenses";
import Savings from "./Savings";
import useProfileStore from "@/store/profileStore";
import axios from "axios";
import AnalyticsChart from "./Extras/AnalyticsChart";

const ReportPDF = () => {
  const { profile } = useProfileStore();
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const userId = profile?.id;

  useEffect(() => {
    if (userId) {
      getExpenses(userId);
      getBudgets(userId);
    }
  }, [userId]);

  const getExpenses = async (userId) => {
    try {
      const response = await axios.get(`/api/expenses?userId=${userId}`);
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const getBudgets = async (userId) => {
    try {
      const response = await axios.get(`/api/get-budgets?userId=${userId}`);
      setBudgets(response.data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  // 🔹 Calculate total expenses
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  // 🔹 Calculate budget analytics
  const totalBudgetLimit = budgets.reduce((sum, bud) => sum + bud.limit, 0);
  const totalSpent = budgets.reduce((sum, bud) => sum + bud.spent, 0);
  const totalRemaining = totalBudgetLimit - totalSpent;

  return (
    <div id="report-content" className="p-8 bg-gray-900">
      <h2 className="font-bold text-xl">Budget Report</h2>

      {/* Key Metrics */}
      <section className="flex mt-4 flex-wrap gap-3 justify-center lg:justify-around">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[32%]">
          <TotalBalance />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[32%]">
          <MonthlyExpenses />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[32%]">
          <Savings />
        </div>
      </section>
      {/* 🔹 Analytics Summary */}
      <div className="bg-gray-900 grid gap-1 text-white mt-5 rounded-xl">
        <h2 className="font-bold text-lg">Analytics Summary</h2>
        <p className="mt-2">Total Expenses: <strong>{profile?.currency}{totalExpenses}</strong></p>
        <p>Total Budget Limit: <strong>{profile?.currency}{totalBudgetLimit}</strong></p>
        <p>Total Spent: <strong>{profile?.currency}{totalSpent}</strong></p>
        <p>Remaining Budget: <strong>{profile?.currency}{totalRemaining}</strong></p>
      </div>

      {/* 🔹 Add Pie Chart & Bar Chart */}
      <AnalyticsChart 
        totalExpenses={totalExpenses} 
        totalBudgetLimit={totalBudgetLimit} 
        totalSpent={totalSpent} 
        totalRemaining={totalRemaining} 
      />
      <div className='bg-gray-800 mt-5 w-full overflow-x-auto rounded-xl'>
                    <h2 className='px-5 py-4 font-bold text-lg text-gray-300'>Expense Details</h2>
                    {
                        <div className='w-full overflow-x-auto'>
                            <table className='w-full'>
                                <thead className='bg-gray-700 text-left w-full'>
                                    <tr>
                                        <th className='px-5 py-4'>Category</th>
                                        <th className='px-5 py-4'>Description</th>
                                        <th className='px-5 py-4'>Amount</th>
                                        <th className='px-5 py-4'>Date & Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        expenses.map((expense) => (
                                            <tr key={expense._id}>
                                                <td className='px-5 py-4 font-bold'>{expense.category}</td>
                                                <td className='px-5 py-4 text-sm sm:text-base line-clamp-3'>{expense.description}</td>
                                                <td className='px-5 py-4'>{profile?.currency}{expense.amount}</td>
                                                <td className='px-5 py-4'>{new Date(expense.createdAt).toLocaleDateString()}, {new Date(expense.createdAt).toLocaleTimeString()}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            {
                                expenses.length === 0 && <h2 className='px-5 py-4 text-lg'>No Expenses found</h2>
                            }
                        </div>
                    }
                </div>
                <div className='bg-gray-800 mt-5 w-full overflow-x-auto rounded-xl'>
                        <h2 className='px-5 py-4 font-bold text-lg text-gray-300'>Budget Details</h2>
                        <div className='w-full overflow-x-auto'>
                            <table className='w-full'>
                                <thead className='bg-gray-700 text-left w-full'>
                                    <tr>
                                        <th className='px-5 py-4'>Category</th>
                                        <th className='px-5 py-4'>Limit</th>
                                        <th className='px-5 py-4'>Spent</th>
                                        <th className='px-5 py-4'>Remaining</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        budgets.map((budget) => (
                                            <tr key={budget._id}>
                                                <td className='px-5 py-4 font-bold'>{budget.category}</td>
                                                <td className='px-5 py-4'>{profile?.currency}{budget.limit}</td>
                                                <td className='px-5 py-4'>{profile?.currency}{budget.spent}</td>
                                                <td className='px-5 py-4'>{profile?.currency}{budget.limit - budget.spent}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            {
                                        budgets.length === 0 && <h2 className='px-5 py-4 text-lg'>No Budgets created yet</h2>
                                    }
                        </div>
                    </div>
    </div>
  );
};

export default ReportPDF;
