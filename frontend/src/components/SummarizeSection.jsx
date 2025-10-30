import { useState } from "react";
import { motion } from "framer-motion";
import { summarizeNotes } from "../api/index.js";
import { Brain, Loader2 } from "lucide-react";

export default function SummarizeSection() {
  const [topic, setTopic] = useState("");
  const [domain, setDomain] = useState("academic");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!topic.trim()) return alert("Enter a topic");
    setLoading(true);
    setSummary(""); // Clear previous summary
    try {
      const res = await summarizeNotes(topic, domain);
      setSummary(res.data.summary);
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to summarize");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      // Main theme background
      className="p-8 rounded-3xl border shadow-2xl transition-all
        bg-gradient-to-tr from-white/70 via-blue-50 to-violet-50 text-gray-900"
    >
      <h2 className="text-2xl font-bold mb-5 text-gray-900 flex items-center gap-3">
        <Brain className="text-indigo-600" size={28} /> Summarize Notes
      </h2>
      <div className="flex flex-col gap-4 mb-4">
        <input
          type="text"
          placeholder="Topic or text for summary..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          // Styled to match FlashcardsSection input
          className="w-full px-5 py-3 rounded-xl shadow-md border-2 border-indigo-200/50 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/30 outline-none text-lg bg-white/80 placeholder:text-indigo-400"
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            // Styled to match FlashcardsSection input
            className="flex-1 px-5 py-3 rounded-xl shadow-md border-2 border-indigo-200/50 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/30 outline-none text-lg bg-white/80 placeholder:text-indigo-400"
          >
            <option value="academic">Academic</option>
            <option value="education">Education</option>
            <option value="medical">Medical</option>
            <option value="law">Law</option>
            <option value="legal">Legal</option>
          </select>
          <motion.button
            onClick={handleSummarize}
            disabled={loading || !topic.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            // Styled to match FlashcardsSection button
            className="sm:w-auto w-full px-8 py-3 rounded-xl text-lg font-semibold bg-gradient-to-tr from-indigo-600 to-fuchsia-600 text-white drop-shadow-lg hover:from-fuchsia-600 hover:to-indigo-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              "Summarize"
            )}
          </motion.button>
        </div>
      </div>

      {summary && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // Themed summary box
          className="mt-6 p-6 bg-white/80 border-2 border-indigo-200/30 rounded-2xl shadow-inner text-gray-800"
        >
          <strong className="font-bold text-gray-900">Summary:</strong> {summary}
        </motion.div>
      )}
    </motion.div>
  );
}