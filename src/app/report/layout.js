export const metadata = {
  title: "Report - SmartTrack",
  description: "Access AI Insights, predictions, goals, and many more with SmartTrack Report",
};

const Layout = ({ children }) => {
    return (
      <div className="min-h-screen w-full md:w-[85%] py-4 md:mx-auto">
        {children}
      </div>
    );
  };
  
  export default Layout;
  