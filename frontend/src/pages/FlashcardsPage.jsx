import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Loader2, Eye, EyeOff, Sparkles } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { generateFlashcards } from "../api/index";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function FlashcardsPage() {
  const [topic, setTopic] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert("Enter a topic first!");
      return;
    }

    setLoading(true);
    setFlashcards([]);

    try {
      const res = await generateFlashcards(topic);
      const rawCards = res?.data?.cards ?? res?.data ?? [];

      const normalized = rawCards.map((c, i) => ({
        id: c?.id ?? `flash-${i}`,
        q: c?.q ?? c?.question ?? c?.front ?? "No question available",
        a: c?.a ?? c?.answer ?? c?.back ?? "No answer provided",
        difficulty: c?.difficulty ?? "Learn",
      }));

      setFlashcards(normalized);
    } catch (err) {
      console.error("generateFlashcards error:", err);
      alert("Failed to generate flashcards");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
        
        {/* Header */}
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
            <Layers size={40} className="text-indigo-600" />
            Smart Flashcards
          </h1>
          <p className="text-gray-600 text-lg">Practice and revise with AI-powered flashcards 📘✨</p>
        </div>

        {/* Flashcard Container */}
        <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-2xl border border-indigo-200/40 shadow-xl space-y-8 relative">

          {/* Sparkle Icon */}
          <motion.div animate={{ opacity: 0.5 }} className="absolute right-10 top-8 pointer-events-none" aria-hidden>
            <Sparkles size={80} className="text-purple-300" />
          </motion.div>

          {/* Input */}
          <div className="flex gap-4">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder='Enter a topic'
              className="flex-1 px-5 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-300 outline-none text-lg"
            />

            <motion.button
              disabled={!topic.trim() || loading}
              whileHover={{ scale: 1.05 }}
              onClick={handleGenerate}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-semibold shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin w-6 h-6 mx-auto" /> : "✨ Generate"}
            </motion.button>
          </div>

          {/* Loading UI */}
          {loading && (
            <motion.div className="flex flex-col items-center py-10 gap-4">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}>
                <Sparkles size={48} className="text-indigo-600" />
              </motion.div>
              <p className="text-xl font-semibold text-indigo-700 animate-pulse">Generating flashcards…</p>
            </motion.div>
          )}

          {/* Flashcards Grid */}
          {!loading && flashcards.length > 0 && (
            <AnimatePresence>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {flashcards.map((card) => (
                  <motion.div key={card.id}>
                    <FlashCard card={card} />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}

          {/* Empty State */}
          {!flashcards.length && !loading && (
            <p className="text-center text-gray-400 text-lg py-8">
              🚀 Enter a topic and generate flashcards!
            </p>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

/* FlashCard Component */
function FlashCard({ card }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="p-6 rounded-3xl shadow-xl bg-gradient-to-br from-[#6C27D9] via-[#9333EA] to-[#EC4899] text-white border border-white/20 space-y-4"
    >
      
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">📌 QUESTION</h3>
        <span className="text-xs bg-white/10 px-2 py-1 rounded-full">{card.difficulty}</span>
      </div>

      <p className="text-base font-medium leading-relaxed">{card.q}</p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowAnswer(!showAnswer)}
        className="px-4 py-2 rounded-xl bg-white/20 text-sm font-semibold flex items-center gap-2"
      >
        {showAnswer ? <EyeOff size={18} /> : <Eye size={18} />}
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </motion.button>

      {showAnswer && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          className="p-4 rounded-xl bg-white text-gray-800 border border-gray-200"
        >
          <p className="font-bold text-purple-700 text-sm mb-2">ANSWER</p>

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ node, ...props }) => (
                <p className="text-gray-800 leading-relaxed mb-2" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="ml-6 list-disc text-gray-800 mb-1" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-bold text-purple-700" {...props} />
              ),
            }}
          >
            {card.a}
          </ReactMarkdown>
        </motion.div>
      )}
    </motion.div>
  );
}
