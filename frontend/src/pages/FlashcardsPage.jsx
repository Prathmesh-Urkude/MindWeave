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
    if (!topic.trim()) return alert("Enter a topic first!");
    setLoading(true);
    setFlashcards([]);

    try {
      const res = await generateFlashcards(topic);
      // be defensive: ensure we get an array
      const cards = Array.isArray(res?.data?.cards) ? res.data.cards : [];
      setFlashcards(cards);
    } catch (err) {
      console.error("generateFlashcards error:", err);
      alert("Failed to generate flashcards");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-10"
      >
        {/* Header */}
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
            <Layers size={40} className="text-indigo-600" />
            Smart Flashcards
          </h1>
          <p className="text-gray-600 text-lg">
            Practice and revise with AI-powered flashcards 📘✨
          </p>
        </div>

        {/* Card Container */}
        <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-2xl border border-indigo-200/40 shadow-xl space-y-8 relative">
          {/* Sparkle Decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="absolute right-10 top-8 pointer-events-none"
            aria-hidden
          >
            <Sparkles size={80} className="text-purple-300" />
          </motion.div>

          {/* Input */}
          <div className="flex gap-4">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder='Enter a topic e.g., "Salesforce", "Networking", "Python"...'
              className="flex-1 px-5 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-300 outline-none text-lg"
              aria-label="Topic"
            />

            <motion.button
              disabled={!topic.trim() || loading}
              whileHover={{ scale: !loading && topic.trim() ? 1.05 : 1 }}
              onClick={handleGenerate}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-semibold shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
              aria-disabled={!topic.trim() || loading}
            >
              {loading ? <Loader2 className="animate-spin w-6 h-6 mx-auto" /> : "✨ Generate"}
            </motion.button>
          </div>

          {/* Loading State */}
          {loading && (
            <motion.div
              className="flex flex-col items-center justify-center py-10 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                className="text-indigo-600"
              >
                <Sparkles size={48} />
              </motion.div>
              <p className="text-xl font-semibold animate-pulse text-indigo-700">
                Generating flashcards…
              </p>
            </motion.div>
          )}

          {/* Flashcards Grid */}
          <AnimatePresence>
            {!loading && flashcards.length > 0 && (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {flashcards.map((card, index) => (
                  <FlashCard key={card?.id ?? index} card={card} />
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {!flashcards.length && !loading && (
            <p className="text-center text-gray-400 text-lg py-8">
              🎯 Enter a topic to build your learning deck
            </p>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

/* ⭐ Flashcard Component — consistent styling + safe fallbacks */
function FlashCard({ card = {} }) {
  const [showAnswer, setShowAnswer] = useState(false);

  // safe defaults
  const question = card?.q ?? "No question available";
  const answer = card?.a ?? "No answer provided.";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="p-6 rounded-3xl shadow-xl bg-gradient-to-br from-[#6C27D9] via-[#9333EA] to-[#EC4899] text-white space-y-4 border border-white/20"
      aria-live="polite"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-bold text-lg tracking-wide flex items-center gap-2">📌 QUESTION</h3>
        <div className="text-sm text-white/90 px-3 py-1 rounded-full bg-white/10">{card?.difficulty ?? "Learn"}</div>
      </div>

      <p className="text-base leading-relaxed font-medium">{question}</p>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowAnswer((s) => !s)}
        className="px-4 py-2 rounded-xl bg-white/25 text-white font-semibold text-sm backdrop-blur-md shadow-lg flex items-center gap-2"
        aria-expanded={showAnswer}
      >
        {showAnswer ? <EyeOff size={18} /> : <Eye size={18} />}
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </motion.button>

      <AnimatePresence>
        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="bg-white text-gray-900 rounded-xl p-4 mt-2 shadow-xl border border-gray-200"
          >
            <p className="font-bold text-purple-700 text-sm mb-2">ANSWER</p>

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: (props) => <p className="text-gray-800 leading-relaxed mb-2" {...props} />,
                li: (props) => <li className="ml-6 list-disc text-gray-800 mb-1" {...props} />,
                strong: (props) => <strong className="font-bold text-purple-700" {...props} />,
              }}
            >
              {answer}
            </ReactMarkdown>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}