export const metadata = {
  title: "Expenses - SmartTrack",
  description: "Manage your expenses, track categories, goals, etc with SmartTrack",
};

const Layout = ({ children }) => {
    return (
      <div className="min-h-screen w-full md:w-[85%] py-4 md:mx-auto">
        {children}
      </div>
    );
  };
  
  export default Layout;
  