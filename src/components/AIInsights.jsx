import { useEffect, useState } from "react";
import useProfileStore from "@/store/profileStore";
import axios from "axios";

const AIInsights = ({ income, month, year }) => {
    
    const { profile } = useProfileStore();
    const [loading, setLoading] = useState(true);
    const [aiInsights, setAiInsights] = useState({
        spendingTrends: "",
        unusualSpending: "",
        longTermSavings: "",
        predictedExpenseNextMonth: 0
    });
    console.log(income, month, year, profile.id);

    const fetchAIInsights = async () => {
        setLoading(true);
        try {
            const response = await axios.post("/api/ai-insights", {
                userId: profile.id,
                income,
                month,
                year
            });

            setAiInsights(response.data);
        } catch (error) {
            console.error("Error fetching AI insights:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (!profile?.id || !income || !month || !year) return;

        fetchAIInsights();
    }, [profile?.id, income, month, year]);

    if (!profile) return null;

    return (
        <section className="mt-6 px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl">
            <div className="flex gap-2 items-center">
                <span className="px-3 py-3 bg-purple-600 rounded-lg opacity-75">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
                        <path d="M19 16V14C19 11.1716 19 9.75736 18.1213 8.87868C17.2426 8 15.8284 8 13 8H11C8.17157 8 6.75736 8 5.87868 8.87868C5 9.75736 5 11.1716 5 14V16C5 18.8284 5 20.2426 5.87868 21.1213C6.75736 22 8.17157 22 11 22H13C15.8284 22 17.2426 22 18.1213 21.1213C19 20.2426 19 18.8284 19 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M19 18C20.4142 18 21.1213 18 21.5607 17.5607C22 17.1213 22 16.4142 22 15C22 13.5858 22 12.8787 21.5607 12.4393C21.1213 12 20.4142 12 19 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M5 18C3.58579 18 2.87868 18 2.43934 17.5607C2 17.1213 2 16.4142 2 15C2 13.5858 2 12.8787 2.43934 12.4393C2.87868 12 3.58579 12 5 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                </span>
                <div>
                    <h2 className="font-bold text-base md:text-lg">AI Insights</h2>
                    <p className="text-xs text-gray-400 md:text-sm">Smart analysis of your spending trends</p>
                </div>
            </div>

            {loading ? (
                <p className="text-gray-400 mt-4">Generating insights...</p>
            ) : (
                <div className="flex flex-wrap gap-2 mt-3">
                    <div className="w-full px-4 py-3 bg-gray-900 rounded-xl">
                        <h2 className="font-bold text-base md:text-lg">Spending Trends</h2>
                        <p className="text-xs text-gray-400 md:text-sm">{aiInsights.spendingTrends || "No spending trends detected."}</p>
                    </div>
                    <div className="w-full px-4 py-3 bg-gray-900 rounded-xl">
                        <h2 className="font-bold text-base md:text-lg">Unusual Spending</h2>
                        <p className="text-xs text-gray-400 md:text-sm">{aiInsights.unusualSpending || "No unusual spending found."}</p>
                    </div>
                    <div className="w-full px-4 py-3 bg-gray-900 rounded-xl">
                        <h2 className="font-bold text-base md:text-lg">Long-term Savings Opportunities</h2>
                        <p className="text-xs text-gray-400 md:text-sm">{aiInsights.longTermSavings || "No savings insights available."}</p>
                    </div>
                    <div className="w-full px-4 py-3 bg-gray-900 rounded-xl">
                        <h2 className="font-bold text-base md:text-lg">Predicted Expenses (Next Month)</h2>
                        <p className="text-xs text-gray-400 md:text-sm">${aiInsights.predictedExpenseNextMonth || 0}</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AIInsights;
