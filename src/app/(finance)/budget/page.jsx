"use client";
import BudgetForm from '@/components/BudgetForm';
import BudgetProgress from '@/components/BudgetProgress';
import { useToast } from '@/components/ToastContext';
import useAuthStore from '@/store/authStore';
import useProfileStore from '@/store/profileStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Budget = () => {
    const [showBudgetForm, setShowBudgetForm] = useState(false);
    const [budgets, setBudgets] = useState([]);
    const { profile } = useProfileStore();
    const {user} = useAuthStore();
    const router = useRouter();
    const {showToast} = useToast();
    
    useEffect(() =>{
        if(!user){
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
    useEffect(() => {
        if (userId) {
            getBudgets(userId);
        }
    }, [userId, showBudgetForm]);

    const handleDeleteBudget = async (budgetId) => {
            const isConfirmed = window.confirm("Do you want to delete this budget?\nNote: It will also delete all related expenses too");
    
            if (isConfirmed) {
                try {
                    await axios.delete(`/api/budget?budgetId=${budgetId}`);
                    showToast("Budget Deleted", "success");
    
                    // ✅ If expenses are in state, update them here
                    setBudgets((prevBudgets) => prevBudgets.filter(budget => budget._id !== budgetId));
                } catch (error) {
                    showToast("Failed to delete budget", "error");
                }
            }
        };

    return (
        <>
            <div className={`${showBudgetForm ? 'opacity-10' : 'opacity-100'} px-2 py-2`}>
                <section className='flex justify-between gap-2 items-center'>
                    <div>
                        <h2 className='font-bold text-lg'>Budget Management</h2>
                        <p className='text-gray-400 text-sm'>{currentMonth}, {currentYear}</p>
                    </div>
                    <button
                        className='flex gap-2 items-center px-4 py-3 bg-purple-500 rounded-xl'
                        onClick={() => setShowBudgetForm(!showBudgetForm)} // Toggle Form
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
                            <path d="M12 8V16M16 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        <span className='hidden sm:block'>Create Budget</span>
                    </button>
                </section>

                <section className='mt-8 grid gap-4'>
                    <div>
                        <BudgetProgress userId={userId}/>
                    </div>
                    <div className='bg-gray-800 overflow-x-auto rounded-xl'>
                        <h2 className='px-5 py-4 font-bold text-lg text-gray-300'>Budget Details</h2>
                        <div className='w-full overflow-x-auto'>
                            <table className='w-full'>
                                <thead className='bg-gray-700 text-left w-full'>
                                    <tr>
                                        <th className='px-5 py-4'>Category</th>
                                        <th className='px-5 py-4'>Limit</th>
                                        <th className='px-5 py-4'>Spent</th>
                                        <th className='px-5 py-4'>Remaining</th>
                                        <th className='px-5 py-4'>Actions</th>
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
                                                <td className='px-5 py-4'>
                                                <button className='flex gap-1 bg-red-400 bg-opacity-60  px-3 py-1 rounded-full items-center text-xs md:text-sm' onClick={() => handleDeleteBudget(budget._id)}>
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
                                        budgets.length === 0 && <h2 className='px-5 py-4 text-lg'>No Budgets created yet</h2>
                                    }
                        </div>
                    </div>
                </section>

            </div>
            {/* Show budget form if toggled */}
            {showBudgetForm && <BudgetForm showBudgetForm={showBudgetForm} setShowBudgetForm={setShowBudgetForm} />}
        </>
    );
}

export default Budget;
