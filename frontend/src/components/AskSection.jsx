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
      whileHover={{ scale: 1.02 }}
      className="p-6 bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
        <MessageCircle className="text-indigo-600" /> Ask a Question
      </h2>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 flex justify-center items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Ask"}
        </button>
      </div>

      {answer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-indigo-50 border border-indigo-100 rounded-lg"
        >
          <p className="text-gray-800">
            <strong>Answer:</strong> {answer}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
