import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Brain, FileText, MessagesSquare, Sparkles } from "lucide-react";

export default function About() {
  return (
    <>
      <Header />

      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col justify-center items-center px-6 pt-28">
        <div className="max-w-5xl w-full text-center">

          {/* Title */}
          <motion.h1
            className="text-5xl font-extrabold text-transparent bg-clip-text 
            bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 tracking-tight"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            What is MindWeave?
          </motion.h1>

          <motion.p
            className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            MindWeave is a next-generation AI knowledge companion. Upload documents like PDFs, notes,
            legal files, or medical reports—and instantly unlock deep insights. Our system retrieves
            context-smart answers, generates summaries, and creates flashcards to boost learning and productivity.
          </motion.p>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <FileText className="w-12 h-12 text-blue-600" />,
                title: "Advanced Document Parsing",
                desc: "AI-driven extraction from PDFs, Word files, plain text & scanned documents."
              },
              {
                icon: <MessagesSquare className="w-12 h-12 text-purple-600" />,
                title: "Intelligent Q&A",
                desc: "Ask questions & get precise responses powered by vector embeddings + Gemini AI."
              },
              {
                icon: <Sparkles className="w-12 h-12 text-pink-600" />,
                title: "AI Learning Assistant",
                desc: "Auto-flashcards & contextual summaries help you learn smarter, faster."
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, translateY: -6 }}
                transition={{ type: "spring", stiffness: 120 }}
                viewport={{ once: true }}
                className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-200 shadow-lg 
                hover:shadow-2xl transition-all"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Bottom Badge */}
          <motion.div
            className="mt-16 inline-flex items-center gap-3 px-6 py-3 rounded-full 
            bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-semibold shadow-lg"
            whileHover={{ scale: 1.07 }}
          >
            <Brain size={26} className="animate-pulse" />
            Powered by AI Innovation
          </motion.div>

        </div>
      </section>

      <Footer />
    </>
  );
}
