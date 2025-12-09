import { Link, useNavigate } from "react-router-dom";
import { adminDrawerData } from "./drawerData";
import { useState } from "react";
import adminImg from "../../../assets/images/pic2.jpg";

export const AdminDrawer = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileToggle = () => {
    setProfileOpen((prev) => !prev);
  };


  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <div className="bg-pink-200 h-full relative">
      {/* Profile Section */}
      <div
        className="flex items-center space-x-3 p-4 cursor-pointer hover:bg-pink-300 transition"
        onClick={handleProfileToggle}
      >
        <img
          src={adminImg}
          alt="Admin"
          className="w-12 h-12 rounded-full border-2 border-pink-700"
        />
        <div>
          <p className="font-semibold text-pink-900">Elizabeth Njoki</p>
          
        </div>
      </div>

      {/* Drawer Menu */}
      <ul className="mt-4">
        {adminDrawerData.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <Link
                to={item.link}
                className="flex items-center space-x-3 p-4 text-pink-900 hover:bg-pink-300 hover:text-pink-900 transition-all duration-200"
              >
                <Icon className="text-lg" />
                <span className="text-lg">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Profile Modal */}
      {profileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 relative flex flex-col items-center">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-pink-700 text-2xl font-bold hover:text-pink-900 transition"
              onClick={handleProfileToggle}
            >
              &times;
            </button>

            {/* Profile Image */}
            <div className="relative">
              <img
                src={adminImg}
                alt="Admin"
                className="w-28 h-28 rounded-full border-4 border-pink-700 shadow-md"
              />
            </div>

            {/* Profile Info */}
            <h2 className="mt-4 text-xl font-bold text-pink-800">Elizabeth Njoki</h2>
            <p className="text-pink-600">Administrator</p>
            <p className="mt-2 text-center text-gray-600 text-sm">
              njokimunywa@gmail.com
            </p>

            {/* Logout Button */}
            <div className="mt-4 w-full flex justify-center">
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
