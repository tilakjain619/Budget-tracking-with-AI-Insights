export const metadata = {
  title: "Dashboard - SmartTrack",
  description: "Desc by Budget Tracking App with AI Insights",
};

const Layout = ({ children }) => {
    return (
      <div className="min-h-screen w-full md:w-[85%] py-4 md:mx-auto">
        {children}
      </div>
    );
  };
  
  export default Layout;
  