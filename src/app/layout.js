import Navbar from "@/components/Navbar";
import "./globals.css";
import "./style.css";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ToastProvider } from "@/components/ToastContext";

export const metadata = {
  title: "SmartTrack - Budget Tracking with AI Insights",
  description: "Experience next-generation budget management with AI-driven insights and predictive analytics",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <Navbar />
          <main className="px-3 min-h-[85vh] py-2">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
