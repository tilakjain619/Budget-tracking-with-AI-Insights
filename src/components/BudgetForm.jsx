import useProfileStore from '@/store/profileStore';
import React, { useState } from 'react';
import { useToast } from './ToastContext';
import axios from 'axios';

const BudgetForm = ({ setShowBudgetForm, showBudgetForm }) => {
    const { profile } = useProfileStore();
    const [category, setCategory] = useState("");
    const [limit, setLimit] = useState(0);
    const {showToast} = useToast();
    const [isClosing, setIsClosing] = useState(false);

    const handleCreateCategory = async (e) =>{
        e.preventDefault();
        try {
            if(!category || !limit){
                showToast("Category or Limit not entered", "danger");
            }
            if(limit <= 0){
                showToast("Limit is Invalid", "danger");
            }

            const response = await axios.post("/api/budget", {
                userId: profile.id,
                category,
                limit
            });
            setCategory("");
            setLimit(0);
            closePopup();
            setShowBudgetForm(false);
            showToast(response.data.message, "success");
        } catch (error) {
            showToast(error, "danger");
        }
    }
    const closePopup = () => {
        setIsClosing(true);
        setTimeout(() => setShowBudgetForm(false), 300);
    };
    return (
        <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[90%] sm:max-w-[600px] px-4 py-4 rounded-xl z-10 bg-gray-800 ${isClosing ? 'popup-exit' : 'popup-enter'}`}>
            <section className='flex justify-between gap-2 items-center'>
                <div>
                    <h2 className='font-bold text-lg'>Create Budget</h2>
                </div>
                <button
                    className='flex gap-2 items-center w-10 h-10 sm:w-fit sm:px-4 justify-center bg-gray-700 rounded-full'
                    onClick={() => setShowBudgetForm(!showBudgetForm)} // Toggle Form
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={20}
                        height={20}
                        fill={"none"}
                    >
                        <path
                            d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span className='hidden sm:block'>Close</span>
                </button>
            </section>
            <form className='grid gap-1'>
                <label htmlFor="category" className='text-gray-400 mt-2'>
                    Enter Category name
                </label>
                <input onChange={(e) => setCategory(e.target.value)} value={category} required className='px-4 py-3 rounded-md bg-gray-700' type="text" id='category' placeholder='Category ex. Food, Travelling' />
                <label htmlFor="limit" className='text-gray-400 mt-2'>
                    Add a Limit
                </label>
                <input onChange={(e) => setLimit(e.target.value)} value={limit} required className='px-4 py-3 rounded-md bg-gray-700' type="number" id='limit' placeholder='Budget limit' />

                <small className='text-xs text-gray-300 md:text-sm bg-green-800 bg-opacity-60 py-1.5 md:py-2 px-3 rounded-md text-balance mt-2'>
                    Category will help you categorise and track your expenses more effeciently
                </small>
                <button onClick={handleCreateCategory} className='w-full mt-2 bg-purple-600 rounded-md py-2'>Submit</button>
            </form>
        </div>
    );
};

export default BudgetForm;
