import { useState } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900">
      {/* Global Header */}
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content Area */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`flex-1 px-6 md:px-10 py-10 mt-20 transition-all duration-300 
            ${sidebarOpen ? "md:ml-[250px]" : "md:ml-[80px]"}
            bg-white/40 backdrop-blur-xl rounded-tl-3xl shadow-inner border-l border-white/50`}
        >
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
}
