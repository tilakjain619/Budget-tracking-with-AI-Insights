import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Budget Tracking App with AI Insights",
  description: "Desc by Budget Tracking App with AI Insights",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main className="px-3 py-2">
        {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
