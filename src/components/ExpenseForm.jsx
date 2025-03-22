"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const ExpenseForm = ({ showExpenseForm, setShowExpenseForm, userId, expenseToEdit, refreshExpenses, budgets }) => {
    const [formData, setFormData] = useState({
        userId: userId,
        category: "",
        budgetId: "",
        description: "",
        amount: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (expenseToEdit) {
            setFormData({
                userId: userId, // Ensure userId is included when editing
                category: expenseToEdit.category,
                budgetId: expenseToEdit.budgetId,
                description: expenseToEdit.description,
                amount: expenseToEdit.amount,
            });
        } else {
            setFormData({
                userId: userId, // Reset userId when adding new expense
                category: "",
                budgetId: "",
                description: "",
                amount: "",
            });
        }
    }, [expenseToEdit, userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "budgetId") {
            const selectedBudget = budgets.find((budget) => budget._id === value);
            setFormData({
                ...formData,
                budgetId: value,
                category: selectedBudget ? selectedBudget.category : "",
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (expenseToEdit) {
                await axios.put(`/api/expenses?expenseId=${expenseToEdit._id}`, formData);
            } else {
                await axios.post("/api/expenses", formData);
            }
            refreshExpenses();
            setShowExpenseForm(false);
        } catch (error) {
            console.error("Error saving expense", error);
        }
        setLoading(false);
    };

    return (
        <div className="fixed px-3 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                <section className='flex justify-between gap-2 items-center'>
                    <div>
                        <h2 className="text-lg font-bold mb-4">
                            {expenseToEdit ? "Edit Expense" : "Add Expense"}
                        </h2>
                    </div>
                    <button
                        className='flex gap-2 items-center w-10 h-10 sm:w-fit sm:px-4 justify-center bg-gray-700 rounded-full'
                        onClick={() => setShowExpenseForm(!showExpenseForm)} // Toggle Form
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
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">
                        Category
                        <select
                            name="budgetId"
                            value={formData.budgetId}
                            onChange={handleChange}
                            className="w-full bg-gray-800 p-2 border border-gray-700 mt-2 rounded"
                            required
                        >
                            <option value="">Select Budget</option>
                            {budgets.map((budget) => (
                                <option key={budget._id} value={budget._id}>{budget.category}</option>
                            ))}
                        </select>
                    </label>
                    <label className="flex whitespace-nowrap text-gray-400 gap-2 items-center text-sm mb-2">
                        Selected Category:
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            readOnly
                            className="bg-transparent w-2/4"
                        />
                    </label>
                    <label className="block mb-2">
                        Description
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-700 mt-2 rounded"
                            required
                        />
                    </label>
                    <label className="block mb-2">
                        Amount
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-700 mt-2 rounded"
                            required
                        />
                    </label>
                    <div className="flex justify-end mt-4">
                        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded" disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExpenseForm;
