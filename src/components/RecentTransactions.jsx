import React, { useState, useEffect } from 'react'
import useProfileStore from "@/store/profileStore";
import axios from "axios";
import Link from "next/link";
import Loader from './Extras/Loader';

const RecentTransactions = () => {
    const { profile } = useProfileStore();
    const [expenses, setExpenses] = useState([]);
    const [expenseLoading, setExpensesLoading] = useState(false);

    const getExpenses = async (userId) => {
        setExpensesLoading(true);

        try {
            const response = await axios.get(`/api/expenses?userId=${userId}`);
            const allExpenses = response.data;

            setExpenses(allExpenses.slice(0, 3)); // ✅ Show only 3 most recent expenses
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }

        setExpensesLoading(false);
    };


    useEffect(() => {
        if (profile.id && expenses.length === 0) {
            getExpenses(profile.id);
        }
    }, [profile.id]);
    return (
        <section className="mt-4 md:mt-5 py-4 lg:mx-1">
            <div className="flex justify-between gap-1">
                <h2 className="text-base font-bold sm:text-lg text-gray-300">Recent Transactions</h2>
                <div>
                    <Link href="/expenses" className="text-purple-500 text-sm sm:text-base">View All</Link>
                </div>
            </div>
            {
                expenseLoading ? <div className="w-full grid h-14 items-center justify-center"><Loader/></div> :
                    <div className='mt-4 grid gap-3 rounded-xl bg-gray-800'>
                        {
                            expenses.map((expense) =>(
                                <div key={expense._id} className='flex px-4 items-center py-3 rounded-xl border-b border-b-gray-700 justify-between gap-2'>
                                    <div>
                                        <h3 className='font-bold text-sm sm:text-base'>{expense.description}</h3>
                                        <h4 className='text-gray-400 text-xs sm:text-sm'>{expense.category}</h4>
                                    </div>
                                    <p className='text-red-500 text-sm sm:text-base font-bold'>{profile?.currency}{expense.amount}</p>
                                </div>
                            ))
                        }
                    </div>
            }
        </section>
    )
}

export default RecentTransactions
