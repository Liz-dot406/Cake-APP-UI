import { Link } from "react-router-dom";
import { customerDrawerData } from "./drawerData";

export const CustomerDrawer = () => {
  return (
    <div className="bg-gradient-to-b from-pink-100 via-rose-50 to-white h-full rounded-r-3xl shadow-lg">
      <h2 className="text-2xl font-bold text-rose-800 p-5 border-b-4 border-amber-300">
        Dashboard Menu
      </h2>

      <ul className="mt-3">
        {customerDrawerData.map((item) => {
          const Icon = item.icon; 
          return (
            <li key={item.id}>
              <Link
                to={item.link}
                className="flex items-center space-x-3 p-4 text-rose-700 font-medium hover:bg-amber-100 hover:text-rose-900 border-l-4 border-transparent hover:border-amber-400 transition-all duration-300 ease-in-out"
              >
                <span className="text-xl">
                  <Icon /> {/* Render the icon */}
                </span>
                <span className="text-lg">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
