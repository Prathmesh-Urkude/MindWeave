import { useState } from "react";
import { motion } from "framer-motion";
import { askQuestion } from "../api/index.js";
import { MessageCircle, Loader2 } from "lucide-react";

export default function AskSection() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return alert("Please enter a question");
    setLoading(true);
    setAnswer(""); // Clear previous answer
    try {
      const res = await askQuestion(question);
      setAnswer(res.data.answer);
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to get answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      // Replaced glassmorphism with the main theme's background
      className="p-8 rounded-3xl border shadow-2xl transition-all
        bg-gradient-to-tr from-white/70 via-blue-50 to-violet-50 text-gray-900"
    >
      <h2 className="text-2xl font-bold mb-5 text-gray-900 flex items-center gap-3">
        <MessageCircle className="text-indigo-600" size={28} /> Ask a Question
      </h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          // Styled to match FlashcardsSection input
          className="w-full px-5 py-3 rounded-xl shadow-md border-2 border-indigo-200/50 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/30 outline-none text-lg bg-white/80 placeholder:text-indigo-400"
        />
        <motion.button
          onClick={handleAsk}
          disabled={loading || !question.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          // Styled to match FlashcardsSection button
          className="px-8 py-3 rounded-xl text-lg font-semibold bg-gradient-to-tr from-indigo-600 to-fuchsia-600 text-white drop-shadow-lg hover:from-fuchsia-600 hover:to-indigo-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            "✨ Ask"
          )}
        </motion.button>
      </div>

      {answer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          // Themed answer box
          className="mt-6 p-6 bg-white/80 border-2 border-indigo-200/30 rounded-2xl shadow-inner"
        >
          <p className="text-gray-800 text-lg">
            <strong className="font-bold text-gray-900">Answer:</strong> {answer}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}