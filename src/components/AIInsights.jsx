import { useEffect, useState } from "react";
import useProfileStore from "@/store/profileStore";
import OpenAI from "openai";
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

    console.log(income, month, year, profile?.id);

    const saveInsightsToDB = async (insights) => {
        try {
            await axios.post("/api/ai-insights", {
                userId: profile.id,
                month,
                year,
                spendingPattern: insights.spendingTrends,
                unusualSpending: insights.unusualSpending, // 🔥 Now included!
                savingTip: insights.longTermSavings,
                predictedExpenseNextMonth: insights.predictedExpenseNextMonth,
            });
            console.log("AI insights saved successfully");
        } catch (error) {
            console.error("Error saving AI insights:", error);
        }
    };
    

    useEffect(() => {
        if (!profile?.id || !income || !month || !year) return;
    
        let isMounted = true;

        const checkAndFetchAIInsights = async () => {
            try {
                setLoading(true);
        
                // Step 1: Check if insights exist in the database
                const response = await axios.get(`/api/ai-insights?userId=${profile.id}&month=${month}&year=${year}`);
                if (response.status === 200 && response.data && Object.keys(response.data).length > 0) {
                    console.log("Using stored AI insights:", response.data);
                    if (isMounted) setAiInsights(response.data);
                    return;
                }
        
                console.log("No existing insights found, generating new insights...");
                
                // Step 2: Fetch new insights from OpenAI
                const openai = new OpenAI({
                    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
                    dangerouslyAllowBrowser: true,
                });
        
                const prompt = `
                Analyze the following financial details and provide AI-based insights:
                - User ID: ${profile.id}
                - Income: ${profile.currency}${income}
                - Month: ${month}
                - Year: ${year}
        
                Provide insights strictly in valid JSON format, keep each response up to 30 words:
                {
                    "spendingTrends": "Insight about spending trends.",
                    "unusualSpending": "Insight about unusual spending.",
                    "longTermSavings": "Long-term savings tips.",
                    "predictedExpenseNextMonth": 1234
                }
                `;
        
                const aiResponse = await openai.chat.completions.create({
                    model: "gpt-4o-mini",
                    messages: [{ role: "system", content: prompt }],
                    temperature: 0.7
                });
        
                let aiMessage = aiResponse.choices[0]?.message?.content?.trim();
                let aiParsedResponse = {};
        
                try {
                    aiParsedResponse = JSON.parse(aiMessage);
                } catch (parseError) {
                    console.error("AI response parsing error:", parseError, "Response:", aiMessage);
                    return;
                }
        
                if (isMounted) {
                    setAiInsights(aiParsedResponse);
                    saveInsightsToDB(aiParsedResponse); // Save insights to DB for future reference
                }
        
            } catch (error) {
                console.error("Error checking AI insights:", error);
            } finally {
                setLoading(false);
            }
        };
        

        checkAndFetchAIInsights();

        return () => {
            isMounted = false;
        };
    }, [profile?.id, income, month, year]);

    if (!profile) return null;

    return (
        <section className="mt-6 px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl">
            <div className="flex gap-2 items-center">
                <span className="px-3 py-3 bg-purple-500 rounded-lg bg-opacity-80">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
    <path d="M14 12.6483L16.3708 10.2775C16.6636 9.98469 16.81 9.83827 16.8883 9.68032C17.0372 9.3798 17.0372 9.02696 16.8883 8.72644C16.81 8.56849 16.6636 8.42207 16.3708 8.12923C16.0779 7.83638 15.9315 7.68996 15.7736 7.61169C15.473 7.46277 15.1202 7.46277 14.8197 7.61169C14.6617 7.68996 14.5153 7.83638 14.2225 8.12923L11.8517 10.5M14 12.6483L5.77754 20.8708C5.4847 21.1636 5.33827 21.31 5.18032 21.3883C4.8798 21.5372 4.52696 21.5372 4.22644 21.3883C4.06849 21.31 3.92207 21.1636 3.62923 20.8708C3.33639 20.5779 3.18996 20.4315 3.11169 20.2736C2.96277 19.973 2.96277 19.6202 3.11169 19.3197C3.18996 19.1617 3.33639 19.0153 3.62923 18.7225L11.8517 10.5M14 12.6483L11.8517 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19.5 2.5L19.3895 2.79873C19.2445 3.19044 19.172 3.38629 19.0292 3.52917C18.8863 3.67204 18.6904 3.74452 18.2987 3.88946L18 4L18.2987 4.11054C18.6904 4.25548 18.8863 4.32796 19.0292 4.47083C19.172 4.61371 19.2445 4.80956 19.3895 5.20127L19.5 5.5L19.6105 5.20127C19.7555 4.80956 19.828 4.61371 19.9708 4.47083C20.1137 4.32796 20.3096 4.25548 20.7013 4.11054L21 4L20.7013 3.88946C20.3096 3.74452 20.1137 3.67204 19.9708 3.52917C19.828 3.38629 19.7555 3.19044 19.6105 2.79873L19.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M19.5 12.5L19.3895 12.7987C19.2445 13.1904 19.172 13.3863 19.0292 13.5292C18.8863 13.672 18.6904 13.7445 18.2987 13.8895L18 14L18.2987 14.1105C18.6904 14.2555 18.8863 14.328 19.0292 14.4708C19.172 14.6137 19.2445 14.8096 19.3895 15.2013L19.5 15.5L19.6105 15.2013C19.7555 14.8096 19.828 14.6137 19.9708 14.4708C20.1137 14.328 20.3096 14.2555 20.7013 14.1105L21 14L20.7013 13.8895C20.3096 13.7445 20.1137 13.672 19.9708 13.5292C19.828 13.3863 19.7555 13.1904 19.6105 12.7987L19.5 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M10.5 2.5L10.3895 2.79873C10.2445 3.19044 10.172 3.38629 10.0292 3.52917C9.88629 3.67204 9.69044 3.74452 9.29873 3.88946L9 4L9.29873 4.11054C9.69044 4.25548 9.88629 4.32796 10.0292 4.47083C10.172 4.61371 10.2445 4.80956 10.3895 5.20127L10.5 5.5L10.6105 5.20127C10.7555 4.80956 10.828 4.61371 10.9708 4.47083C11.1137 4.32796 11.3096 4.25548 11.7013 4.11054L12 4L11.7013 3.88946C11.3096 3.74452 11.1137 3.67204 10.9708 3.52917C10.828 3.38629 10.7555 3.19044 10.6105 2.79873L10.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
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
                <div className="flex flex-wrap gap-3 mt-4">
                    <div className="w-full sm:w-[49%] px-4 py-3 bg-gray-900 rounded-xl">
                        <h2 className="font-bold text-base md:text-lg">Spending Trends</h2>
                        <p className="text-xs text-gray-400 md:text-sm">{aiInsights.spendingPattern || "No spending trends detected."}</p>
                    </div>
                    <div className="w-full sm:w-[49%] px-4 py-3 bg-gray-900 rounded-xl">
                        <h2 className="font-bold text-base md:text-lg">Unusual Spending</h2>
                        <p className="text-xs text-gray-400 md:text-sm">{aiInsights.unusualSpending || "No unusual spending found."}</p>
                    </div>
                    <div className="w-full sm:w-[49%] px-4 py-3 bg-gray-900 rounded-xl">
                        <h2 className="font-bold text-base md:text-lg">Savings Opportunities</h2>
                        <p className="text-xs text-gray-400 md:text-sm">{aiInsights.savingTip || "No savings insights available."}</p>
                    </div>
                    <div className="w-full sm:w-[49%] px-4 py-3 bg-gray-900 rounded-xl">
                        <h2 className="font-bold text-base md:text-lg">Predicted Expenses (Next Month)</h2>
                        <p className="text-xl text-gray-400 md:text-2x; font-bold">{`${profile.currency}${aiInsights.predictedExpenseNextMonth || 0}`}</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AIInsights;
