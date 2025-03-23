import { useEffect, useState } from "react";
import useProfileStore from "@/store/profileStore";
import axios from "axios";
import Loader from "@/components/Extras/Loader";

const TotalBalance = () => {
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

  // Calculate total balance
  const totalBalance = profile.monthly_income - totalExpenses;

  // Calculate percentage left or overdue
  const percentageLeft = ((totalBalance / profile.monthly_income) * 100).toFixed(2);
  const percentageOverdue = Math.abs(((totalBalance / profile.monthly_income) * 100)).toFixed(2);

  return (
    <div className="px-5 grid gap-2 h-full py-4 rounded-lg bg-gray-800">
      <div className="flex justify-between gap-1">
        <h2 className="text-base font-bold text-gray-400">Total Balance</h2>
        <span className="text-blue-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
    <path d="M13 5C17.9706 5 22 8.35786 22 12.5C22 14.5586 21.0047 16.4235 19.3933 17.7787C19.1517 17.9819 19 18.2762 19 18.5919V21H17L16.2062 19.8674C16.083 19.6916 15.8616 19.6153 15.6537 19.6687C13.9248 20.1132 12.0752 20.1132 10.3463 19.6687C10.1384 19.6153 9.91703 19.6916 9.79384 19.8674L9 21H7V18.6154C7 18.2866 6.83835 17.9788 6.56764 17.7922C5.49285 17.0511 2 15.6014 2 14.0582V12.5C2 11.9083 2.44771 11.4286 3 11.4286C3.60665 11.4286 4.10188 11.1929 4.30205 10.5661C5.32552 7.36121 8.83187 5 13 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M14.5 8C13.868 7.67502 13.1963 7.5 12.5 7.5C11.8037 7.5 11.132 7.67502 10.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.49981 11H7.50879" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 8.5C21.5 8 22 7.06296 22 5.83053C22 4.26727 20.6569 3 19 3C18.6494 3 18.3128 3.05676 18 3.16106" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
</svg></span>
      </div>
      <h1 className="text-2xl font-bold md:text-3xl">
        {profile.currency} {loading ? <Loader/> : totalBalance.toLocaleString()}
      </h1>

      {/* Show Money Left or Overdue */}
      {totalBalance >= 0 ? (
        <span className="text-xs md:text-sm text-green-500">{percentageLeft}% money left</span>
      ) : (
        <span className="text-xs md:text-sm text-red-500">{percentageOverdue}% overdue</span>
      )}
    </div>
  );
};

export default TotalBalance;
