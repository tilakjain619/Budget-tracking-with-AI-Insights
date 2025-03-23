import { useEffect, useState } from "react";
import useProfileStore from "@/store/profileStore";
import axios from "axios";
import Loader from "@/components/Extras/Loader";

const Savings = () => {
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

  // Calculate savings
  const savings = profile.monthly_income - totalExpenses;

  // Calculate percentage saved (relative to monthly income)
  const percentageSaved = ((savings / profile.monthly_income) * 100).toFixed(0);

  // Savings Goal Logic
  const savingsGoal = profile.savings_goal || 0; // Default to 0 if undefined
  const savingsGoalAchieved = savingsGoal > 0 ? ((savings / savingsGoal) * 100).toFixed(0) : 0; // Avoid division by zero

  return (
    <div className="px-5 grid gap-2 h-full py-4 rounded-lg bg-gray-800">
      <div className="flex justify-between gap-1">
        <h2 className="text-base font-bold text-gray-400">Savings Goal</h2>
        <span className="text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
            <path d="M5 13.5H3C2.44772 13.5 2 13.9477 2 14.5V21C2 21.5523 2.44772 22 3 22H5C5.55228 22 6 21.5523 6 21V14.5C6 13.9477 5.55228 13.5 5 13.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 14.5H11.75C12.4404 14.5 13 15.0596 13 15.75C13 16.4404 12.4404 17 11.75 17H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 16.9998H14.6917C15.5417 16.9998 16.3697 16.729 17.0554 16.2267L19.6836 14.3015C20.2549 13.8584 21.0678 13.9088 21.5796 14.4192C22.1734 15.0112 22.1328 15.9828 21.4918 16.5236L17.0951 20.1022C16.3817 20.6828 15.49 20.9998 14.5701 20.9998H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19 7C19 9.76133 16.7614 12 14 12C11.2386 12 9 9.76133 9 7C9 4.23857 11.2386 2 14 2C16.7614 2 19 4.23857 19 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {/* Show Savings Progress */}
      <h1 className="text-2xl font-bold md:text-3xl">
        {savingsGoalAchieved}%
      </h1>

      {/* Savings Goal Display */}
      {savingsGoal > 0 && (
        <>
          <div className="w-full overflow-hidden bg-gray-700 h-2 rounded-lg mt-1">
            <div
              className="h-2 animate-progress-bar rounded-lg bg-green-500"
              style={{ width: `${Math.min(savingsGoalAchieved, 100)}%` }} // Cap at 100%
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Savings;
