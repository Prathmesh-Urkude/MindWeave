import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Loader2, Sparkles, Highlighter } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { summarizeNotes } from "../api/index.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function SummarizePage() {
  const [topic, setTopic] = useState("");
  const [domain, setDomain] = useState("academic");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!topic.trim()) return alert("Please enter a topic!");

    setLoading(true);
    setSummary("");

    try {
      const res = await summarizeNotes(topic, domain);
      setSummary(res?.data?.summary ?? "No summary generated.");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || "Failed to summarize!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12 relative"
      >

        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3 drop-shadow-sm">
            <Brain className="text-indigo-600" size={40} />
            Smart Summarizer
          </h1>
          <p className="text-gray-600 text-lg">
            Instantly create focused summaries powered by AI ✨
          </p>
        </div>

        {/* Card */}
        <motion.div
          className="p-10 rounded-3xl bg-white/90 backdrop-blur-xl border border-indigo-200/50 shadow-2xl space-y-8
          hover:shadow-indigo-200/40 hover:border-indigo-400 transition-all"
        >
          {/* Input Fields */}
          <div className="flex flex-col gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="📌 Enter topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl shadow-md border-2 border-indigo-200 focus:border-indigo-500
                focus:ring-4 focus:ring-indigo-300/40 outline-none text-lg bg-white placeholder-indigo-400"
              />
              <Highlighter size={20} className="absolute right-4 top-4 text-indigo-500" />
            </div>

            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl shadow-md border-2 border-indigo-200 focus:border-indigo-500
              focus:ring-4 focus:ring-indigo-300/40 outline-none text-lg bg-white"
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
              whileHover={{ scale: !loading ? 1.06 : 1 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-2xl text-lg font-semibold 
              bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white shadow-xl 
              hover:from-fuchsia-600 hover:to-indigo-600 transition flex items-center justify-center gap-3
              disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-6 h-6" />
                  Summarizing...
                </>
              ) : (
                <>
                  <Sparkles size={20} className="text-yellow-300" />
                  Generate Summary
                </>
              )}
            </motion.button>
          </div>

          {/* Result Output */}
          <AnimatePresence>
            {!loading && summary && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 bg-white shadow-inner border-2 border-indigo-200 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
                  <Sparkles size={22} className="text-fuchsia-600" />
                  Summary Output
                </h3>

                {/* FIXED: No className on ReactMarkdown */}
                <div className="prose prose-indigo max-w-none leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {summary}
                  </ReactMarkdown>
                </div>
              </motion.div>
            )}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center gap-3 mt-4 text-indigo-600 font-medium text-lg"
              >
                <Loader2 className="animate-spin w-7 h-7" />
                AI is thinking...
              </motion.div>
            )}

            {!loading && !summary && (
              <p className="text-center text-gray-500">
                👆 Enter a topic and click <strong>Generate Summary</strong>
              </p>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
