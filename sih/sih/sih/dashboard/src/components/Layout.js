import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children, teachers }) => {
  const { user } = useAuth();  // get the current user
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile) setIsSidebarOpen(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ If user is not yet loaded, prevent errors
  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <Navbar onToggleSidebar={handleToggleSidebar} />

      <div className="layout-container">
        <Sidebar isOpen={isSidebarOpen} teachers={teachers} />

        <main
          className={`main-content ${isSidebarOpen && !isMobile ? "shifted" : ""}`}
        >
          <div className="content-box">
            {/* ✅ Safe role check */}
            {user.role === "teacher" ? (
              <div>{children}</div>
            ) : (
              <div>{children}</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
