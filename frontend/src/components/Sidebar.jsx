import { Home, Upload, MessageCircle, Brain, Layers, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Sidebar({ onSelect }) {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} /> },
    { name: "Upload", icon: <Upload size={20} /> },
    { name: "Ask", icon: <MessageCircle size={20} /> },
    { name: "Summarize", icon: <Brain size={20} /> },
    { name: "Flashcards", icon: <Layers size={20} /> },
  ];

  const handleSelect = (name) => {
    setActive(name);
    if (onSelect) onSelect(name); // optional callback to update content
  };

  return (
    <motion.aside
      animate={{ width: open ? 240 : 80 }}
      className="bg-gradient-to-b from-indigo-700 via-indigo-800 to-indigo-900 text-white flex flex-col h-[calc(100vh-64px)] shadow-xl transition-all duration-300 rounded-r-2xl sticky top-[64px] select-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-indigo-600">
        {open && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold tracking-wide whitespace-nowrap"
          >
            MindWeave
          </motion.h1>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            setOpen(!open);
          }}
          className="p-1 rounded-md bg-indigo-600 hover:bg-indigo-500 transition"
        >
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2 mt-6 px-3 overflow-y-auto">
        {menuItems.map((item, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.03 }}
            onClick={(e) => {
              e.preventDefault(); // prevent unwanted scroll reset
              handleSelect(item.name);
            }}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 w-full text-left
              ${
                active === item.name
                  ? "bg-indigo-600 shadow-lg shadow-indigo-500/30"
                  : "hover:bg-indigo-700"
              }`}
          >
            <div className="text-indigo-200">{item.icon}</div>
            {open && (
              <span className="text-sm font-medium text-indigo-100">
                {item.name}
              </span>
            )}
          </motion.button>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t border-indigo-600 p-4">
        <motion.button
          whileHover={{ scale: 1.03 }}
          onClick={(e) => e.preventDefault()} // prevent scroll jump
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg bg-indigo-700 hover:bg-indigo-600 transition-all"
        >
          <LogOut size={18} className="text-indigo-200" />
          {open && <span className="text-sm font-medium">Logout</span>}
        </motion.button>
      </div>
    </motion.aside>
  );
}
