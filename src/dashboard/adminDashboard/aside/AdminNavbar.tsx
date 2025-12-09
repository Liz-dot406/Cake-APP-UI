import { FaBars, FaUserCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

interface AdminNavbarProps {
  handleDrawerToggle: () => void;
  drawerOpen: boolean;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({ handleDrawerToggle, drawerOpen }) => {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-pink-700 via-pink-500 to-pink-600 text-white px-6 py-4 shadow-md">
      
      {/* Left: Drawer toggle button */}
      <button
        className="lg:hidden text-2xl mr-4"
        onClick={handleDrawerToggle}
      >
        {drawerOpen ? <IoMdClose /> : <FaBars />}
      </button>

      {/* Center: Title */}
      <span className="text-lg font-semibold">
        Admin Dashboard
      </span>

      {/* Right: Profile / actions */}
      <div className="flex items-center space-x-3">
        <span className="hidden sm:block text-sm">Hello, Admin</span>
        <FaUserCircle className="text-2xl text-white hover:text-yellow-200 cursor-pointer" />
      </div>
    </div>
  );
};
