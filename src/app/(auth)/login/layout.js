const Layout = ({ children }) => {
  return (
    <div className="min-h-screen w-full md:w-[85%] py-4 md:mx-auto">
      {/* Background */}
      <div className="absolute inset-0  blur-md animate-pulse bg-center bg-no-repeat lg:bg-repeat-x bg-contain -z-10" style={{ backgroundImage: "url('./bg-design.svg')" }}></div>
      
      {/* Page Content */}
      {children}
    </div>
  );
};

export default Layout;
