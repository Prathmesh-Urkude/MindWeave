import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Brain,
  FileText,
  Sparkles,
  BookOpen,
  Zap,
  Rocket,
  Workflow,
  Layers,
  Stars,
} from "lucide-react";

export default function Home() {
  return (
    
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100 text-gray-800 overflow-hidden">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <main className="relative flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-transparent to-purple-100 blur-3xl opacity-60 animate-pulse" />
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-extrabold mb-6 z-10"
        >
          Build Knowledge Faster With{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            MindWeave
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg sm:text-xl text-gray-600 max-w-3xl mb-10 z-10"
        >
          Transform your notes into organized knowledge — generate summaries,
          flashcards, and AI-powered insights instantly.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4 z-10">
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              Get Started
            </motion.button>
          </Link>

          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-full shadow-lg hover:bg-gray-300 hover:shadow-2xl transition-all duration-300"
            >
              Create Account
            </motion.button>
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white">
        <h2 className="text-4xl font-bold text-center mb-14 text-gray-800">
          Why Choose <span className="text-blue-600">MindWeave?</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />,
              title: "Smart Notes",
              desc: "AI structures, organizes, and highlights your notes automatically.",
              bg: "bg-blue-50",
            },
            {
              icon: <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />,
              title: "Instant Summaries",
              desc: "Get concise summaries to quickly understand lengthy topics.",
              bg: "bg-purple-50",
            },
            {
              icon: <BookOpen className="w-12 h-12 text-pink-600 mx-auto mb-4" />,
              title: "Flashcards Generator",
              desc: "Turn notes into interactive flashcards for smarter learning.",
              bg: "bg-pink-50",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`${feature.bg} rounded-2xl shadow-md p-8 text-center transition-all duration-300`}
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-b from-blue-50 via-purple-50 to-white py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-14">
          How <span className="text-blue-600">MindWeave</span> Works
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {[
            {
              step: "1",
              icon: <Layers className="w-10 h-10 text-blue-600 mx-auto mb-3" />,
              title: "Upload Notes",
              desc: "Upload PDFs, images, or text — our AI reads it all.",
            },
            {
              step: "2",
              icon: <Brain className="w-10 h-10 text-purple-600 mx-auto mb-3" />,
              title: "AI Processing",
              desc: "The system extracts insights, keywords, and structures content.",
            },
            {
              step: "3",
              icon: <Workflow className="w-10 h-10 text-pink-600 mx-auto mb-3" />,
              title: "Generate Resources",
              desc: "Summaries, flashcards, and key takeaways created instantly.",
            },
            {
              step: "4",
              icon: <Stars className="w-10 h-10 text-indigo-600 mx-auto mb-3" />,
              title: "Learn Smarter",
              desc: "Review, revise, and retain — all from one unified platform.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100 hover:border-blue-200"
            >
              <div className="text-2xl font-bold text-blue-600 mb-2">
                Step {item.step}
              </div>
              {item.icon}
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Power Section */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <h2 className="text-4xl font-bold text-center mb-12">
          The Power Behind <span className="text-blue-400">MindWeave AI</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <Zap className="w-12 h-12 text-blue-400 mx-auto mb-4" />,
              title: "Fast Processing",
              desc: "Experience lightning-fast content analysis and response times.",
            },
            {
              icon: <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4" />,
              title: "Adaptive Learning",
              desc: "The AI personalizes suggestions based on your study behavior.",
            },
            {
              icon: <Rocket className="w-12 h-12 text-pink-400 mx-auto mb-4" />,
              title: "Seamless Integration",
              desc: "Compatible with cloud storage, notes apps, and study tools.",
            },
          ].map((ai, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 rounded-2xl p-8 text-center hover:bg-gray-700 transition-all duration-300"
            >
              {ai.icon}
              <h3 className="text-xl font-semibold mb-2">{ai.title}</h3>
              <p className="text-gray-300">{ai.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative text-center py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]"
        />
        <h2 className="text-5xl font-extrabold mb-4 z-10">
          Start Weaving Your Knowledge Today
        </h2>
        <p className="text-lg mb-8 text-gray-100 z-10">
          Join thousands of learners using AI to revolutionize the way they
          study and grow.
        </p>
        <Link to="/signup">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="px-10 py-4 bg-white text-blue-700 font-semibold rounded-full shadow-xl hover:shadow-2xl hover:bg-gray-100 transition-all duration-300"
          >
            Join Now
          </motion.button>
        </Link>
      </section>
       {/* Footer */}
      <Footer />
    </div>
  );
}
