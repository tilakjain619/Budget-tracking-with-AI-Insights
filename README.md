## SmartTrack

-   A **budget tracking web app** that helps users **track expenses, manage budget, and gain AI-powered insights**.
-   Built with **Next.js and MongoDB**, featuring **secure authentication** and **real-time analytics**.

## Problem Statement

Many people find it hard to keep track of their expenses and save money. Without knowing how they spend, it’s easy to make bad financial choices.
## Solution

-   A **user-friendly web app** that simplifies **expense tracking** and **budget management**.
-   **AI-generated insights** help users **optimize savings** and **avoid overspending**.

## Features

-   **Expense & Budget Tracking** – Log and categorize transactions effortlessly.
-   **Real-Time Analytics** – Visual insights into spending habits.
-   **Multi-Currency Support** – Convert and track expenses in different currencies.
-   **AI-Powered Insights** – Detect unusual spending patterns and savings opportunities using **GPT-4o Mini**.
-   **Secure Authentication** – Seamless login with **MongoDB authentication via NextAuth**.
-   **Fast & Responsive UI** – Optimized with **Next.js** for a smooth experience.

## 🛠 Tech Stack

-   **Frontend**: Next.js, Tailwind CSS
-   **Database**: MongoDB
-   **Authentication**: NextAuth (MongoDB-based)
-   **AI Integration**: GPT-4o Mini for financial insights

## 🔧 Installation

1.  Clone the repository:
    
    ```sh
    git clone https://github.com/tilakjain619/Budget-tracking-with-AI-Insights.git
    cd Budget-tracking-with-AI-Insights
    ```
    
2.  Install dependencies:
    
    ```sh
    npm install
    ```
    
3.  Set up environment variables in a **.env** file:
    
    ```
    NEXT_PUBLIC_MONGODB_URI=mongodb://localhost:27017/budget-tracker
    NEXTAUTH_SECRET=your_secret_key
    NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
    ```
    
4.  Start the development server:
    
    ```sh
    npm run dev
    ```
    

## Usage

-   **Sign up/login** to track expenses and income.
- **Create** budget category.
-   **Add, edit, or delete** transactions.
-   **View insights** on spending patterns using **AI-generated suggestions**.

## Future Enhancements

-   Bank account integration
-   Monthly budgeting feature
-   Smart alerts for overspending

## Conclusion
This app makes it easy to track finances and gain clarity with the help of AI-driven insights. It’s designed to simplify budgeting and improve financial decision-making for users.