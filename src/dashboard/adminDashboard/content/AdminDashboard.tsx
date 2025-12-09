import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store"; 
import { Navbar } from "../../../components/navabr/Navbar";
import { AdminDrawer } from "../aside/AdminDrawer";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { AdminNavbar } from "../aside/AdminNavbar";

const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };
   
  const userRole = useSelector((state: RootState) => state.user.user?.role);


  if (userRole !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Navbar />

      <AdminNavbar handleDrawerToggle={handleDrawerToggle} drawerOpen={drawerOpen} />

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 z-40 w-64 bg-pink-100 border-r border-pink-200 shadow-lg ${
            drawerOpen ? "" : "hidden"
          } lg:static lg:block lg:w-64`}
          style={{ minHeight: "100vh" }}
        >
          <div>
            <button
              className="absolute top-4 right-4 text-pink-800 text-4xl lg:hidden"
              onClick={handleDrawerToggle}
            >
              <IoMdClose />
            </button>
            <AdminDrawer />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
