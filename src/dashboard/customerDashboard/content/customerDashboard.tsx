import { Outlet } from "react-router-dom";
import { Navbar } from "../../../components/navabr/Navbar";
import { CustomerDrawer } from "../aside/CustomerDrawer";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store"; 

const CustomerDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  
  const isCustomer = useSelector(
    (state: RootState) => state.user.user?.role === "customer"
  );

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <div className="bg-rose-50 min-h-screen">
      <Navbar />

     
      <div className="flex px-4 py-4 bg-pink-200 items-center shadow-md">
        <button
          className="mr-4 text-pink-800 text-2xl lg:hidden"
          onClick={handleDrawerToggle}
        >
          {drawerOpen ? <IoMdClose /> : <FaBars />}
        </button>
        <span className="text-pink-900 text-lg font-semibold">
          Welcome to your customer Dashboard
        </span>
      </div>

      <div className="flex">
        
        <aside
          className={`fixed top-0 z-40 w-64 bg-gradient-to-b from-pink-100 via-rose-50 to-white border-r-4 border-amber-200
            ${drawerOpen ? "" : "hidden"} lg:static lg:block lg:w-64 shadow-md`}
          style={{ minHeight: "100vh" }}
        >
          <div className="relative">
            <button
              className="absolute top-4 right-4 text-pink-700 text-3xl lg:hidden"
              onClick={handleDrawerToggle}
            >
              <IoMdClose />
            </button>
            <CustomerDrawer />
          </div>
        </aside>

        
        <main className="flex-1 bg-white rounded-tl-3xl shadow-inner p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
