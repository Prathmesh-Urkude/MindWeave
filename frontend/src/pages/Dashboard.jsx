import { useState, useRef } from "react";
import { Menu, X, Upload, MessageCircle, Brain, Layers } from "lucide-react";
import { motion } from "framer-motion";
import UploadSection from "../components/UploadSection";
import AskSection from "../components/AskSection";
import SummarizeSection from "../components/SummarizeSection";
import FlashcardsSection from "../components/FlashcardsSection";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const uploadRef = useRef(null);
  const askRef = useRef(null);
  const summarizeRef = useRef(null);
  const flashcardsRef = useRef(null);

  const menuItems = [
    { label: "Upload", icon: <Upload size={20} />, ref: uploadRef },
    { label: "Ask", icon: <MessageCircle size={20} />, ref: askRef },
    { label: "Summarize", icon: <Brain size={20} />, ref: summarizeRef },
    { label: "Flashcards", icon: <Layers size={20} />, ref: flashcardsRef },
  ];

  const handleScrollTo = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="flex bg-gradient-to-br from-indigo-50 via-white to-blue-50 min-h-[calc(100vh-5rem)] overflow-hidden relative">
      {/* Header */}
      <Header />
      
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 250 : 80 }}
        className={`fixed top-[5rem] left-0 h-[calc(100vh-5rem)] bg-white/90 backdrop-blur-lg border-r border-indigo-100 shadow-lg flex flex-col transition-all duration-300 z-40`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          {sidebarOpen && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-lg text-indigo-700 tracking-wide"
            >
              MindWeave
            </motion.h2>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
            className="text-indigo-600 hover:text-indigo-800 transition md:hidden"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 flex flex-col mt-6 space-y-1 overflow-y-auto">
          {menuItems.map((item, i) => (
            <motion.button
              key={i}
              onClick={() => handleScrollTo(item.ref)}
              whileHover={{ scale: 1.03 }}
              className="group flex items-center gap-3 px-5 py-3 rounded-lg transition-all duration-200 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 relative"
            >
              <div className="text-indigo-500">{item.icon}</div>
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              {!sidebarOpen && (
                <span className="absolute left-16 bg-indigo-600 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                  {item.label}
                </span>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="mt-auto border-t border-gray-200 p-4">
          {sidebarOpen && (
            <p className="text-sm text-gray-500 text-center">
              © 2025 MindWeave
            </p>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "md:ml-[250px]" : "md:ml-[80px]"
        } p-8 overflow-y-auto scroll-smooth`}
        style={{ scrollPaddingTop: "6rem" }}
      >
        <div className="max-w-7xl mx-auto space-y-24">
          <motion.section
            ref={uploadRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Upload size={24} className="text-indigo-600" />
              Upload Files
            </h1>
            <UploadSection />
          </motion.section>

          <motion.section
            ref={askRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MessageCircle size={24} className="text-indigo-600" />
              Ask Questions
            </h1>
            <AskSection />
          </motion.section>

          <motion.section
            ref={summarizeRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Brain size={24} className="text-indigo-600" />
              Summarize Notes
            </h1>
            <SummarizeSection />
          </motion.section>

          <motion.section
            ref={flashcardsRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Layers size={24} className="text-indigo-600" />
              Generate Flashcards
            </h1>
            <FlashcardsSection />
          </motion.section>
        </div>
      </main>
    </div>
  );
}
