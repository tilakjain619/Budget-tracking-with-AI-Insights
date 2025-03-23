import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export const generateAIInsights = async (expenses, income) => {
    const prompt = `
    Analyze the following user's financial data:
    - Monthly Income: ${income}
    - Expenses: ${JSON.stringify(expenses)}

    Identify:
    1. Any unusual spending patterns.
    2. Savings opportunities.

    Format the response as:
    {
      "unusualSpending": "Your unusual spending insight here.",
      "savingsOpportunity": "Your savings opportunity insight here."
    }
    `;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.6,
            max_tokens: 100,
            
        });

        return JSON.parse(response.choices[0].message.content);
    } catch (error) {
        console.error("Error fetching AI insights:", error);
        return { unusualSpending: "Unable to analyze spending.", savingsOpportunity: "Unable to generate insights." };
    }
};
