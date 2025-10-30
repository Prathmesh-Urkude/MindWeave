import { useState } from "react";
import { motion } from "framer-motion";
import { uploadFile } from "../api/index.js";
import { Upload, Loader2 } from "lucide-react"; // Added Loader2

export default function UploadSection() {
  const [upload, setUpload] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Store filename for display
  const [fileName, setFileName] = useState(""); 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpload(file);
      setFileName(file.name);
    } else {
      setUpload(null);
      setFileName("");
    }
  };

  const handleUpload = async () => {
    if (!upload) return alert("Please select a file first!");
    setLoading(true);
    try {
      const res = await uploadFile(upload);
      alert(
        `✅ Uploaded ${res.data.filename} (${res.data.num_chunks} chunks processed)`
      );
      setUpload(null);
      setFileName("");
    } catch (err) {
      alert(err.response?.data?.detail || "Upload failed");
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
        <Upload className="text-indigo-600" size={28} /> Upload Notes
      </h2>
      <div className="flex flex-col gap-4">
        <input
          type="file"
          onChange={handleFileChange}
          // Custom file input style to match the theme
          className="w-full text-lg text-indigo-500 border-2 border-indigo-200/50 rounded-xl shadow-md bg-white/80
            file:mr-5 file:py-3 file:px-6 file:rounded-l-lg file:border-0 file:text-lg file:font-semibold
            file:bg-gradient-to-tr file:from-indigo-600 file:to-fuchsia-600 file:text-white
            hover:file:from-fuchsia-600 hover:file:to-indigo-600 transition-all cursor-pointer
            focus:ring-4 focus:ring-indigo-400/30 outline-none"
        />
        <motion.button
          onClick={handleUpload}
          disabled={loading || !upload}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          // Styled to match FlashcardsSection button
          className="w-full px-8 py-3 rounded-xl text-lg font-semibold bg-gradient-to-tr from-indigo-600 to-fuchsia-600 text-white drop-shadow-lg hover:from-fuchsia-600 hover:to-indigo-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" /> Uploading...
            </>
          ) : (
            "Upload File"
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}