import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export const Navbar = () => {
  return (
    <nav className="bg-pink-50 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img src={logo} alt="Bakers House Logo" className="w-10 h-10 rounded-full" />
            </Link>
            <span className="ml-2 text-xl font-semibold text-pink-800 tracking-wide">
              Bakers House
            </span>
          </div>

          
          <div className="hidden lg:flex space-x-6">
            <Link to="/" className="text-pink-800 hover:text-pink-600 font-medium">Home</Link>
            <Link to="/about" className="text-pink-800 hover:text-pink-600 font-medium">About</Link>
            <Link to="/cakes" className="text-pink-800 hover:text-pink-600 font-medium">Cakes</Link>
            <Link to="/contact" className="text-pink-800 hover:text-pink-600 font-medium">Contact</Link>
          </div>

         
          <div className="hidden lg:flex space-x-4">
            <Link to="/login" className="text-pink-800 hover:text-pink-600 font-medium">Login</Link>
            <Link to="/register" className="text-pink-800 hover:text-pink-600 font-medium">Register</Link>
          </div>

          
          <div className="lg:hidden">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
              <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-pink-100 rounded-box w-52">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/cakes">Cakes</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};
