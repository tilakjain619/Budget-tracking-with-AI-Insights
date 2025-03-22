import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Extras/Loader";
import useProfileStore from "@/store/profileStore";

const BudgetProgress = ({ userId }) => {
  const [currentBudget, setCurrentBudget] = useState(0);
  const [spent, setSpent] = useState(0);
  const [lastMonthBudget, setLastMonthBudget] = useState(0);
  const [lastMonthSpent, setLastMonthSpent] = useState(0);
  const [loading, setLoading] = useState(true);
  const {profile} = useProfileStore();

  useEffect(() => {
    if (!userId) return;

    const fetchBudgets = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/get-budgets?userId=${userId}`);
        const budgets = response.data;

        // Get current and last month details
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        const lastMonthDate = new Date(now.setMonth(now.getMonth() - 1));
        const lastMonth = lastMonthDate.getMonth() + 1;
        const lastMonthYear = lastMonthDate.getFullYear();

        // Function to extract month & year from createdAt
        const getMonthYear = (dateString) => {
          const date = new Date(dateString);
          return { month: date.getMonth() + 1, year: date.getFullYear() };
        };

        // Aggregate budgets & spent for each month
        let totalLastMonthBudget = 0, totalLastMonthSpent = 0;
        let totalCurrentBudget = 0, totalCurrentSpent = 0;

        budgets.forEach((b) => {
          const { month, year } = getMonthYear(b.createdAt);

          if (month === lastMonth && year === lastMonthYear) {
            totalLastMonthBudget += b.limit;
            totalLastMonthSpent += b.spent;
          }

          if (month === currentMonth && year === currentYear) {
            totalCurrentBudget += b.limit;
            totalCurrentSpent += b.spent;
          }
        });

        setLastMonthBudget(totalLastMonthBudget);
        setLastMonthSpent(totalLastMonthSpent);
        setCurrentBudget(totalCurrentBudget);
        setSpent(totalCurrentSpent);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching budgets:", error);
        setLoading(false);
      }
    };

    fetchBudgets();
  }, [userId]);

  // Calculate remaining and progress
  const remaining = currentBudget - spent;
  const progressPercentage = currentBudget ? (spent / currentBudget) * 100 : 0;

  // Calculate percentage change from last month
  const budgetChange =
    lastMonthBudget > 0
      ? ((currentBudget - lastMonthBudget) / lastMonthBudget) * 100
      : 0;

  return (
    <div className="bg-gray-800 p-5 rounded-xl text-white">
      {loading ? (
        <Loader/>
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-base sm:text-lg font-bold">Monthly Budget</h3>
            <p className={`text-xs sm:text-sm ${budgetChange >= 0 ? "text-green-400" : "text-red-400"}`}>
              vs Last Month {budgetChange >= 0 ? "↑" : "↓"} {budgetChange.toFixed(2)}%
            </p>
          </div>

          {/* Budget Amount */}
          <h2 className="text-3xl font-bold mt-2">
            {profile.currency}{currentBudget.toLocaleString()}
          </h2>

          {/* Progress Bar */}
          <div className="w-full overflow-hidden bg-gray-700 h-2 rounded-lg mt-2">
            <div
              className="h-2 animate-progress-bar rounded-lg bg-purple-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Spent and Remaining */}
          <div className="flex justify-between text-gray-400 text-sm mt-2">
            <p>Spent: {profile.currency}{spent.toLocaleString()}</p>
            <p>Remaining: {profile.currency}{remaining.toLocaleString()}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default BudgetProgress;
