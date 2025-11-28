import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Brain, Menu, X } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  if (isLoggedIn) {
    navLinks.push({ label: "Dashboard", path: "/dashboard" });
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/50 backdrop-blur-lg border-b border-white/30 shadow-lg">
      {/* Top Gradient Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />

      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-4 gap-4">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:scale-110 transition-all duration-300"
        >
          <Brain className="w-8 h-8 text-blue-600 animate-pulse" />
          MindWeave
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          {navLinks.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`relative hover:text-indigo-600 text-lg transition
                ${location.pathname === path ? "text-indigo-600 font-semibold" : ""}
              `}
            >
              {label}
              <span
                className={`absolute left-0 bottom-[-4px] h-[3px] rounded-full bg-gradient-to-r 
                from-indigo-500 to-fuchsia-500 transition-all duration-300
                ${location.pathname === path ? "w-full" : "w-0 group-hover:w-full"}
              `} />
            </Link>
          ))}

          {/* Auth Buttons */}
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-gray-800 hover:text-indigo-600 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 
                text-white shadow-md hover:shadow-xl transition-all"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full bg-red-500 text-white shadow hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-gray-900"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden flex flex-col items-center gap-6 py-6 bg-white/80 backdrop-blur-xl shadow-lg"
        >
          {navLinks.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className="text-lg text-gray-800 hover:text-indigo-600"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="px-6 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                onClick={() => setMenuOpen(false)}
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </motion.div>
      )}
    </header>
  );
}
