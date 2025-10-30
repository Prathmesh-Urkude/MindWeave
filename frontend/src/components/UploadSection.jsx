import { useState } from "react";
import { motion } from "framer-motion";
import { uploadFile } from "../api/index.js";
import { Upload } from "lucide-react";

export default function UploadSection() {
  const [upload, setUpload] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!upload) return alert("Please select a file first!");
    setLoading(true);
    try {
      const res = await uploadFile(upload);
      alert(`✅ Uploaded ${res.data.filename} (${res.data.num_chunks} chunks processed)`);
      setUpload(null);
    } catch (err) {
      alert(err.response?.data?.detail || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
        <Upload className="text-indigo-600" /> Upload Notes
      </h2>
      <div className="flex flex-col gap-3">
        <input
          type="file"
          onChange={(e) => setUpload(e.target.files[0])}
          className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>
      </div>
    </motion.div>
  );
}
