export const metadata = {
  title: "Budget - SmartTrack",
  description: "Access Budget Insights, manage categories, and many more with SmartTrack",
};

const Layout = ({ children }) => {
    return (
      <div className="min-h-screen w-full md:w-[85%] py-4 md:mx-auto">
        {children}
      </div>
    );
  };
  
  export default Layout;
  