import { useEffect, useState } from "react";
import useProfileStore from "@/store/profileStore";
import axios from "axios";
import Loader from "@/components/Extras/Loader";

const MonthlyExpenses = () => {
  const { profile } = useProfileStore();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile?.id) return; // Ensure the user is logged in before fetching

    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`/api/expenses?userId=${profile.id}`);
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [profile?.id]);

  if (!profile) return null; // Ensure profile exists before rendering

  // Calculate total expenses
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  // Calculate percentage spent
  const percentageSpent = ((totalExpenses / profile.monthly_income) * 100).toFixed(2);

  return (
    <div className="px-5 grid gap-2 h-full py-4 rounded-lg bg-gray-800">
      <div className="flex justify-between gap-1">
        <h2 className="text-base font-bold text-gray-400">Monthly Expenses</h2>
        <span className="text-red-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
    <path d="M4 18.6458V8.05426C4 5.20025 4 3.77325 4.87868 2.88663C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.88663C20 3.77325 20 5.20025 20 8.05426V18.6458C20 20.1575 20 20.9133 19.538 21.2108C18.7831 21.6971 17.6161 20.6774 17.0291 20.3073C16.5441 20.0014 16.3017 19.8485 16.0325 19.8397C15.7417 19.8301 15.4949 19.9768 14.9709 20.3073L13.06 21.5124C12.5445 21.8374 12.2868 22 12 22C11.7132 22 11.4555 21.8374 10.94 21.5124L9.02913 20.3073C8.54415 20.0014 8.30166 19.8485 8.03253 19.8397C7.74172 19.8301 7.49493 19.9768 6.97087 20.3073C6.38395 20.6774 5.21687 21.6971 4.46195 21.2108C4 20.9133 4 20.1575 4 18.6458Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 6L8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 10H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.5 9.875C13.6716 9.875 13 10.4626 13 11.1875C13 11.9124 13.6716 12.5 14.5 12.5C15.3284 12.5 16 13.0876 16 13.8125C16 14.5374 15.3284 15.125 14.5 15.125M14.5 9.875C15.1531 9.875 15.7087 10.2402 15.9146 10.75M14.5 9.875V9M14.5 15.125C13.8469 15.125 13.2913 14.7598 13.0854 14.25M14.5 15.125V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
</svg></span>
      </div>
      <h1 className="text-2xl font-bold md:text-3xl">
        {profile.currency} {loading ? <Loader/> : totalExpenses.toLocaleString()}
      </h1>

      {/* Show percentage spent */}
      <span className="text-xs md:text-sm text-red-500">
        {loading ? "..." : `${percentageSpent}% of income spent`}
      </span>
    </div>
  );
};

export default MonthlyExpenses;
