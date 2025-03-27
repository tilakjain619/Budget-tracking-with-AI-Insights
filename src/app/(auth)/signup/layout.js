import '../bg-animate.css';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen w-full md:w-[85%] py-4 md:mx-auto">
      {/* Background */}
      <div className="area fixed left-0 top-0 -z-10 w-full">
            <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div>
      {/* Page Content */}
      {children}
    </div>
  );
};

export default Layout;
