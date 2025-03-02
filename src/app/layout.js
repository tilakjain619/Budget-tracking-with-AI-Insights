import "./globals.css";

export const metadata = {
  title: "Budget Tracking App with AI Insights",
  description: "Desc by Budget Tracking App with AI Insights",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
