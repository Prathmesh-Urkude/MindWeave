import {
  Menu,
  X,
  Home,
  Upload,
  MessageCircle,
  Brain,
  Layers,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Overview", icon: <Home size={22} />, path: "/dashboard" },
    { label: "Upload", icon: <Upload size={22} />, path: "/dashboard/upload" },
    { label: "Ask", icon: <MessageCircle size={22} />, path: "/dashboard/ask" },
    { label: "Summarize", icon: <Brain size={22} />, path: "/dashboard/summarize" },
    { label: "Flashcards", icon: <Layers size={22} />, path: "/dashboard/flashcards" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <motion.aside
      animate={{ width: sidebarOpen ? 250 : 80 }}
      className="fixed top-[5rem] left-0 h-[calc(100vh-5rem)]
      bg-white/60 backdrop-blur-2xl shadow-xl border-r border-white/40
      transition-all duration-300 z-50 flex flex-col"
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/40">
        {sidebarOpen && (
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-extrabold text-lg tracking-wide
            bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
          >
            📚 MindWeave
          </motion.h2>
        )}
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="text-indigo-600 hover:text-indigo-800 transition md:hidden"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 flex flex-col mt-6 space-y-1 overflow-y-auto px-2">
        {menuItems.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative
              ${
                isActive
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500"
                  : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
              }`
            }
          >
            <div
              className={({ isActive }) =>
                `transition-all duration-300 ${
                  sidebarOpen ? "" : "mx-auto"
                }`
              }
            >
              {item.icon}
            </div>

            {/* Label - Only shown when expanded */}
            {sidebarOpen && <span className="font-medium">{item.label}</span>}

            {/* Tooltip when collapsed */}
            {!sidebarOpen && (
              <span className="absolute left-20 bg-indigo-600 text-white 
              text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-md">
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto border-t border-white/40 p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl 
          bg-gradient-to-r from-red-500 to-pink-500 text-white
          hover:from-red-600 hover:to-pink-600 transition-all shadow-md font-medium justify-center"
        >
          <LogOut size={20} />
          {sidebarOpen && "Logout"}
        </button>

        {sidebarOpen && (
          <p className="text-xs text-gray-500 text-center mt-3">
            © {new Date().getFullYear()} MindWeave
          </p>
        )}
      </div>
    </motion.aside>
  );
}
