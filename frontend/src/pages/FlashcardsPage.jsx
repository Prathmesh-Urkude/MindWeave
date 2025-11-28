function FlashCard({ card }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      className="p-6 rounded-3xl shadow-xl 
      bg-white/80 backdrop-blur-xl 
      border border-indigo-200/50 transition-all duration-300
      hover:shadow-indigo-300/40"
    >
      {/* Question Header */}
      <h3 className="font-semibold text-sm tracking-wide text-indigo-700 flex items-center gap-2">
        <span className="text-lg">📌</span> QUESTION
      </h3>

      {/* Question Text */}
      <p className="text-gray-800 text-base mt-2 font-medium leading-relaxed">
        {card.q}
      </p>

      {/* Reveal Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowAnswer(!showAnswer)}
        className="mt-4 px-4 py-2 rounded-xl text-sm font-semibold shadow-md 
        bg-gradient-to-r from-indigo-600 to-purple-600 text-white
        transition-all hover:shadow-indigo-300/40"
      >
        {showAnswer ? (
          <span className="flex items-center gap-2">
            <EyeOff size={18} /> Hide Answer
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Eye size={18} /> Show Answer
          </span>
        )}
      </motion.button>

      {/* Answer Reveal */}
      <AnimatePresence>
        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200/50
            rounded-xl p-4 mt-4 shadow-inner"
          >
            <p className="font-bold text-indigo-700 text-sm mb-2">ANSWER</p>

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: (props) => (
                  <p className="text-gray-800 leading-relaxed mb-1" {...props} />
                ),
                li: (props) => (
                  <li className="ml-6 list-disc text-gray-700 mb-1" {...props} />
                ),
                strong: (props) => (
                  <strong className="text-indigo-700" {...props} />
                ),
              }}
            >
              {card.a}
            </ReactMarkdown>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
