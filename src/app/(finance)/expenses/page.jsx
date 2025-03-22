"use client";
import Loader from '@/components/Extras/Loader';
import useAuthStore from '@/store/authStore';
import useProfileStore from '@/store/profileStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import ExpenseForm from '@/components/ExpenseForm';
import { useToast } from '@/components/ToastContext';

const Expenses = () => {
    const { profile } = useProfileStore();
    const { user } = useAuthStore();
    const router = useRouter();
    const [budgets, setBudgets] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [showExpenseForm, setShowExpenseForm] = useState(false);
    const [expensesLoading, setExpensesLoading] = useState(false);
    const [expenseToEdit, setExpenseToEdit] = useState(null);

    const { showToast } = useToast();

    useEffect(() => {
        if (!user) {
            router.push("/");
            return;
        }
    }, [user, router]);

    const userId = profile?.id;
    // Get the full month name
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentYear = new Date().getFullYear();

    const getBudgets = async (userId) => {
        const response = await axios.get(`/api/get-budgets?userId=${userId}`);
        setBudgets(response.data);
    }
    const getExpenses = async (userId) => {
        setExpensesLoading(true);
        const response = await axios.get(`/api/expenses?userId=${userId}`);
        setExpenses(response.data);
        setExpensesLoading(false);
    }
    useEffect(() => {
        if (userId) {
            getExpenses(userId);
            getBudgets(userId);
        }
    }, [userId]);

    const handleEditExpense = (expense) => {
        console.log("Editing Expense:", expense);
        setExpenseToEdit(expense);
        setShowExpenseForm(true);
    };
    const handleDeleteExpenses = async (expenseId) => {
        const isConfirmed = window.confirm("Do you want to delete this expense?");

        if (isConfirmed) {
            try {
                await axios.delete(`/api/expenses?expenseId=${expenseId}`);
                showToast("Expense Deleted", "success");

                // ✅ If expenses are in state, update them here
                setExpenses((prevExpenses) => prevExpenses.filter(exp => exp._id !== expenseId));
            } catch (error) {
                showToast("Failed to delete expense", "error");
            }
        }
    };

    return (
        <>
            <div className={`${showExpenseForm ? 'opacity-20' : 'opacity-100'} px-2 py-2`}>
                <section className='flex justify-between gap-2 items-center'>
                    <div>
                        <h2 className='font-bold text-lg'>Expenses</h2>
                        <p className='text-gray-400 text-sm'>{currentMonth}, {currentYear}</p>
                    </div>
                    <button
                        className='flex gap-2 items-center px-4 py-3 bg-purple-500 rounded-xl'
                        onClick={() => {
                            setShowExpenseForm(!showExpenseForm);
                            setExpenseToEdit(null);
                        }} // Toggle Form
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
                            <path d="M12 8V16M16 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        <span className='hidden sm:block'>Add Expense</span>
                    </button>
                </section>

                <section className='mt-8 grid gap-4'>
                    <div className='bg-gray-800 overflow-x-auto rounded-xl'>
                        <h2 className='px-5 py-4 font-bold text-lg text-gray-300'>Expense Details</h2>
                        {
                            expensesLoading ? <div className='w-full justify-center grid items-center min-h-40'>
                                <Loader />
                            </div> :
                                <div className='w-full overflow-x-auto'>
                                    <table className='w-full'>
                                        <thead className='bg-gray-700 text-left w-full'>
                                            <tr>
                                                <th className='px-5 py-4'>Category</th>
                                                <th className='px-5 py-4'>Description</th>
                                                <th className='px-5 py-4'>Amount</th>
                                                <th className='px-5 py-4'>Date</th>
                                                <th className='px-5 py-4'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                expenses.map((expense) => (
                                                    <tr key={expense._id}>
                                                        <td className='px-5 py-4 font-bold'>{expense.category}</td>
                                                        <td className='px-5 py-4 text-sm sm:text-base line-clamp-3'>{expense.description}</td>
                                                        <td className='px-5 py-4'>{profile?.currency}{expense.amount}</td>
                                                        <td className='px-5 py-4'>{new Date(expense.createdAt).toLocaleDateString()}</td>
                                                        <td className='px-5 py-4 flex gap-1 items-center'>
                                                            <button className='flex gap-1 bg-blue-900 bg-opacity-6 0 px-3 py-1 rounded-full items-center text-xs md:text-sm' onClick={() => handleEditExpense(expense)}>
                                                                <svg className='text-gray-300 hidden sm:block' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={14} height={14} fill={"none"}>
                                                                    <path d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    <path d="M13 4L20 11" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    <path d="M14 22L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                                Edit
                                                            </button>
                                                            <button className='flex gap-1 bg-red-400 bg-opacity-60  px-3 py-1 rounded-full items-center text-xs md:text-sm' onClick={() => handleDeleteExpenses(expense._id)}>
                                                                <svg className='text-gray-300 hidden sm:block' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={14} height={14} fill={"none"}>
                                                                    <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                    <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                    <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                    <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                </svg>
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    {
                                        expenses.length === 0 && <h2 className='px-5 py-4 text-lg'>No Expenses created yet</h2>
                                    }
                                </div>
                        }
                    </div>
                </section>

            </div>
            {/* Show budget form if toggled */}
            {showExpenseForm &&
                <ExpenseForm
                    showExpenseForm={showExpenseForm}
                    setShowExpenseForm={setShowExpenseForm}
                    userId={userId}
                    expenseToEdit={expenseToEdit}
                    refreshExpenses={() => getExpenses(userId)}
                    budgets={budgets}
                />}
        </>
    )
}

export default Expenses
