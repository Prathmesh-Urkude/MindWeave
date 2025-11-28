import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Loader2, Send, Sparkles } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { askQuestion } from "../api/index.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AskPage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      chatRef.current?.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 150);
  };

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userMsg = { role: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);

    setQuestion("");
    setLoading(true);
    scrollToBottom();

    try {
      const res = await askQuestion(userMsg.text);
      const text = res.data.answer || "No answer found.";
      setMessages((prev) => [...prev, { role: "assistant", text }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "⚠️ Something went wrong!" },
      ]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-10 relative"
      >
        {/* Floating background glow */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <Sparkles className="absolute top-3 right-6 text-purple-400" size={100} />
        </div>

        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3 drop-shadow-sm">
            <MessageCircle className="text-indigo-600" size={42} />
            Ask AI From Your Document
          </h1>
          <p className="text-gray-600 text-lg">
            AI reads your document context and answers from your own notes 📚✨
          </p>
        </div>

        {/* Chat Window */}
        <div
          ref={chatRef}
          className="h-[65vh] overflow-y-auto p-6 rounded-3xl
          bg-white/70 backdrop-blur-2xl shadow-xl border border-indigo-200/50
          space-y-5 scroll-smooth"
        >
          {messages.map((msg, i) => {
            const isUser = msg.role === "user";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`max-w-[80%] p-4 rounded-2xl text-[15px] leading-relaxed shadow-md
                  ${
                    isUser
                      ? "ml-auto bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white rounded-br-none"
                      : "mr-auto bg-gray-100 text-black border border-gray-200 rounded-bl-none"
                  }`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: (props) => <p className="mb-1" {...props} />,
                    ul: (props) => <ul className="list-disc ml-6 my-1" {...props} />,
                    li: (props) => <li className="my-1" {...props} />,
                    strong: (props) => (
                      <strong className="font-semibold text-indigo-700" {...props} />
                    ),
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </motion.div>
            );
          })}

          {/* AI Typing Indicator */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 mr-auto bg-gray-200 shadow-md px-4 py-3 rounded-2xl rounded-bl-none"
            >
              <Loader2 className="animate-spin text-indigo-600 w-5 h-5" />
              <span className="text-gray-700">AI is responding...</span>
            </motion.div>
          )}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-indigo-200/50">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything from your notes..."
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            className="flex-1 px-5 py-3 bg-gray-50 border border-gray-300 rounded-xl text-[16px]
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 outline-none"
          />

          <motion.button
            onClick={handleAsk}
            whileHover={{ scale: !loading ? 1.1 : 1 }}
            disabled={loading || !question.trim()}
            className="p-3 rounded-xl shadow-lg bg-gradient-to-r
            from-indigo-600 to-purple-600 text-white 
            hover:from-purple-600 hover:to-indigo-600 transition disabled:opacity-50"
          >
            <Send size={22} />
          </motion.button>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
