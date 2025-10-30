import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateFlashcards } from "../api/index.js";
import {
  Layers,
  Loader2,
  Sparkles,
  BookOpenText,
  BadgeHelp,
  BadgeCheck,
} from "lucide-react";

// Gradient Backgrounds for Flashcards
const gradients = [
  "from-indigo-500 via-blue-500 to-fuchsia-500",
  "from-teal-500 via-cyan-500 to-blue-500",
  "from-violet-500 via-pink-500 to-rose-500",
];

// Flashcard Component - Reveals answer on hover instead of click
function Flashcard({ card, index }) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 60 }}
      transition={{ type: "spring", stiffness: 220, damping: 21 }}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
      className={`select-none w-full min-w-[230px] max-w-[350px] h-[220px] sm:h-[240px] mx-auto
        cursor-pointer rounded-2xl bg-gradient-to-br
        ${gradients[index % gradients.length]}
        shadow-xl border-2 border-white/10 ring-1 ring-indigo-400/10 transform-gpu relative transition-all duration-300
        ${isRevealed ? "ring-4 ring-fuchsia-400 scale-105 z-20" : ""}
      `}
      style={{ boxSizing: "border-box" }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center px-6 py-8 transition-all duration-700">
        {isRevealed ? (
          <div className="flex flex-col items-center gap-2 h-full justify-center">
            <BadgeCheck className="text-green-300 drop-shadow-lg" size={32} />
            <div className="font-black text-lg text-white/80 drop-shadow-md mb-2">ANSWER</div>
            <div className="text-gray-900 bg-white/95 py-3 px-5 font-bold rounded-xl shadow-2xl text-center leading-snug max-w-xs border-2 border-white/70 overflow-y-auto max-h-32">
              {card?.a || <span className="italic opacity-60 text-lg">No answer provided.</span>}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 h-full justify-center">
            <BadgeHelp className="text-yellow-200 drop-shadow-lg" size={32} />
            <div className="font-black text-lg text-white/80 drop-shadow-md mb-2">QUESTION</div>
            <div className="text-white font-semibold text-xl text-center leading-snug max-w-xs drop-shadow-lg">
              {card?.q || "No question available"}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Main Flashcards Section without dark mode
export default function FlashcardsSection() {
  const [topic, setTopic] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFlashcards = useCallback(async () => {
    if (!topic.trim()) return alert("Enter a topic");
    setLoading(true);
    setFlashcards([]);
    try {
      const res = await generateFlashcards(topic);
      setFlashcards(res.data.cards && Array.isArray(res.data.cards) ? res.data.cards : []);
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to generate flashcards");
    } finally {
      setLoading(false);
    }
  }, [topic]);

  const getGridCols = (count) => {
    if (count <= 3) return "sm:grid-cols-2 lg:grid-cols-3";
    return "sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4";
  };

  return (
    <div>
      <div
        className="relative p-8 rounded-3xl border shadow-2xl transition-all min-h-screen overflow-x-hidden
          bg-gradient-to-tr from-white/70 via-blue-50 to-violet-50 text-gray-900"
      >
        {/* Background Sparkle effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="absolute left-10 top-10 pointer-events-none z-0"
        >
          <Sparkles size={90} color="#8b5cf6" />
        </motion.div>

        {/* Header */}
        <div className="flex justify-between mb-6 items-center relative z-10">
          <h2 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
            <Layers className="text-indigo-600" size={36} />
            Generate Flashcards
          </h2>
        </div>

        {/* Input + Generate Button */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 relative z-10">
          <input
            type="text"
            placeholder={"Enter Topic"}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 px-5 py-3 rounded-xl shadow-md border-2 border-indigo-200/50 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/30 outline-none text-lg bg-white/80 placeholder:text-indigo-400"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                handleFlashcards();
              }
            }}
          />
          <motion.button
            onClick={handleFlashcards}
            disabled={loading || !topic.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-xl text-lg font-semibold bg-gradient-to-tr from-indigo-600 to-fuchsia-600 text-white drop-shadow-lg hover:from-fuchsia-600 hover:to-indigo-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "✨ Generate"}
          </motion.button>
        </div>

        {/* Loading State */}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center my-14">
            <Loader2 className="animate-spin w-8 h-8 text-indigo-500" />
            <span className="ml-3 text-xl text-indigo-500 font-medium">Generating flashcards...</span>
          </motion.div>
        )}

        {/* Flashcards Grid */}
        <AnimatePresence>
          {flashcards.length > 0 && !loading && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              className={`grid gap-7 justify-center ${getGridCols(flashcards.length)} mt-6`}
            >
              {flashcards.map((card, i) => (
                <Flashcard key={i} card={card} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Initial/Empty State */}
        {!flashcards.length && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center my-20 p-8 bg-gray-100/50 rounded-xl shadow-inner max-w-lg mx-auto"
          >
            <BookOpenText className="w-12 h-12 text-indigo-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Ready to Study?</h3>
            <p className="text-center text-gray-600">
              Enter a <strong>topic</strong> above and hit <strong>"Generate"</strong> to create a fresh set of interactive flashcards!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}