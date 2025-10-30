import { useState } from "react";
import { motion } from "framer-motion";
import { generateFlashcards } from "../api/index.js";
import { Layers, Loader2 } from "lucide-react";

export default function FlashcardsSection() {
  const [topic, setTopic] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFlashcards = async () => {
    if (!topic.trim()) return alert("Enter a topic");
    setLoading(true);
    try {
      const res = await generateFlashcards(topic);
      setFlashcards(res.data.cards || []);
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to generate flashcards");
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
        <Layers className="text-indigo-600" /> Generate Flashcards
      </h2>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Topic for flashcards..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <button
          onClick={handleFlashcards}
          disabled={loading}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 flex justify-center items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Generate"}
        </button>
      </div>

      {flashcards.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
        >
          {flashcards.map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.6 }}
              className="relative h-40 bg-gradient-to-tr from-indigo-500 to-blue-500 text-white rounded-xl shadow-lg flex items-center justify-center cursor-pointer"
            >
              <div className="absolute inset-0 p-4 flex flex-col justify-center items-center">
                <p className="font-medium text-lg text-center">Q: {card.q}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
