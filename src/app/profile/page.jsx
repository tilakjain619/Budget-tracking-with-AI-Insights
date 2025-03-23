"use client";
import { useToast } from '@/components/ToastContext';
import useProfileStore from '@/store/profileStore';
import axios from 'axios';
import React, { useState } from 'react'

const Profile = () => {
    const { profile, updateProfile } = useProfileStore();
    const [monthlyIncome, setMonthlyIncome] = useState(profile?.monthly_income);
    const [savingsGoal, setSavingsGoal] = useState(profile?.savings_goal || 0);
    const [editingIncome, setEditingIncome] = useState(false);
    const [editingSavingsGoal, setEditingSavingsGoal] = useState(false);
    const userId = profile?.id;
    const { showToast } = useToast();

    // Update Monthly Income
    const handleEditIncome = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`/api/profile?userId=${userId}`, {
                monthly_income: monthlyIncome
            });

            updateProfile({ monthly_income: monthlyIncome }); // ✅ Update global store
            showToast(response.data.message, "success");
        } catch (error) {
            showToast("Failed to update monthly income", "error");
        }

        setEditingIncome(false);
    };

    // Update Savings Goal
    const handleEditSavingsGoal = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`/api/profile?userId=${userId}`, {
                savings_goal: savingsGoal
            });

            updateProfile({ savings_goal: savingsGoal }); // ✅ Update global store
            showToast(response.data.message, "success");
        } catch (error) {
            showToast("Failed to update savings goal", "error");
        }

        setEditingSavingsGoal(false);
    };

    return (
        <div className='min-h-[80vh] max-w-[500px] mx-auto grid items-center'>
            {profile ? (
                <div className='grid bg-gray-800 px-5 py-4 rounded-xl gap-2'>
                    <h1>Your Profile</h1>
                    <h2 className='text-lg border-t border-gray-500 pt-2 mt-1 font-bold sm:text-2xl'>
                        {profile.name}
                    </h2>
                    <p className='text-gray-300'>Email: {profile.email}</p>

                    {/* Monthly Income */}
                    <p className='text-gray-300 '>Monthly Income:</p>
                    <form className='flex items-center gap-2'>
                        <input
                            value={monthlyIncome}
                            onChange={(e) => setMonthlyIncome(e.target.value)}
                            className={`w-3/5 rounded-lg bg-gray-700 ${editingIncome ? 'opacity-100' : 'opacity-60'} px-3 py-2`} 
                            readOnly={!editingIncome}
                        />
                        <button 
                            onClick={(e) => {
                                if (editingIncome) {
                                    handleEditIncome(e);
                                } else {
                                    e.preventDefault();
                                    setEditingIncome(true);
                                }
                            }} 
                            className={`${editingIncome ? 'bg-green-800' : 'bg-gray-700'} w-2/5 text-sm px-3 py-2 rounded-lg`}
                        >
                            {editingIncome ? "Save" : "Update"}
                        </button>
                    </form>

                    {/* Savings Goal */}
                    <p className='text-gray-300 '>Savings Goal:</p>
                    <form className='flex items-center gap-2'>
                        <input
                            value={savingsGoal}
                            onChange={(e) => setSavingsGoal(e.target.value)}
                            className={`w-3/5 rounded-lg bg-gray-700 ${editingSavingsGoal ? 'opacity-100' : 'opacity-60'} px-3 py-2`} 
                            readOnly={!editingSavingsGoal}
                        />
                        <button 
                            onClick={(e) => {
                                if (editingSavingsGoal) {
                                    handleEditSavingsGoal(e);
                                } else {
                                    e.preventDefault();
                                    setEditingSavingsGoal(true);
                                }
                            }} 
                            className={`${editingSavingsGoal ? 'bg-green-800' : 'bg-gray-700'} w-2/5 text-sm px-3 py-2 rounded-lg`}
                        >
                            {editingSavingsGoal ? "Save" : "Update"}
                        </button>
                    </form>

                    <p className='text-sm text-gray-400 border-t border-gray-500 py-2 mt-2'>
                        Track with Dashboard! Manage your finances with ease and track your progress all in one place.
                    </p>
                </div>
            ) : (
                <div className='px-2 py-3 grid gap-1'>
                    <h2 className='text-lg text-gray-300'>
                        Something wrong with your profile?
                    </h2>
                    <p className='text-sm text-gray-400 border-t border-gray-500 py-3 my-2'>
                        Login to SmartTrack! Manage your finances with ease and track your progress all in one place.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Profile;
