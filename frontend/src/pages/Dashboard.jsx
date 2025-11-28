import { motion } from "framer-motion";
import { Upload, MessageCircle, Brain, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

const features = [
  {
    title: "Upload Notes",
    description: "Upload PDFs or notes and let MindWeave process them into smart chunks.",
    icon: <Upload className="text-indigo-500" size={30} />,
    path: "/dashboard/upload",
    badge: "Start here",
  },
  {
    title: "Ask Questions",
    description: "Ask focused questions from your uploaded content and get contextual answers.",
    icon: <MessageCircle className="text-fuchsia-500" size={30} />,
    path: "/dashboard/ask",
    badge: "Q&A",
  },
  {
    title: "Summarize Notes",
    description: "Generate clean, focused summaries by topic and domain from your notes.",
    icon: <Brain className="text-emerald-500" size={30} />,
    path: "/dashboard/summarize",
    badge: "AI Summary",
  },
  {
    title: "Generate Flashcards",
    description: "Turn your content into interactive flashcards for fast revision.",
    icon: <Layers className="text-sky-500" size={30} />,
    path: "/dashboard/flashcards",
    badge: "Study Mode",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <section className="space-y-10">
        {/* Top Text */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Welcome to <span className="text-indigo-600">MindWeave</span>
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Choose a workspace to get started. You can upload notes, ask questions,
            generate summaries, or create flashcards — all powered by your own content.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.button
              key={feature.title}
              onClick={() => navigate(feature.path)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group text-left rounded-3xl bg-white/90 border border-indigo-100/70 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all p-5 flex flex-col gap-4 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-indigo-50 group-hover:bg-indigo-100 transition">
                  {feature.icon}
                </div>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">
                  {feature.badge}
                </span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  {feature.title}
                </h2>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between text-sm font-semibold text-indigo-600">
                <span>Open workspace</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}
