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
      whileHover={{ scale: 1.01 }}
      className="p-6 bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
        <Brain className="text-indigo-600" /> Summarize Notes
      </h2>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Topic for summary..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <select
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          <option value="academic">Academic</option>
          <option value="education">Education</option>
          <option value="medical">Medical</option>
          <option value="law">Law</option>
          <option value="legal">Legal</option>
        </select>
        <button
          onClick={handleSummarize}
          disabled={loading}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 flex items-center gap-2 justify-center"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Summarize"}
        </button>
      </div>

      {summary && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-4 bg-indigo-50 border border-indigo-100 rounded-lg text-gray-800"
        >
          <strong>Summary:</strong> {summary}
        </motion.div>
      )}
    </motion.div>
  );
}
