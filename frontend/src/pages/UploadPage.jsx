import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../components/DashboardLayout";
import { Upload, Loader2, File, CheckCircle2 } from "lucide-react";
import { uploadFile } from "../api/index.js";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle File Select
  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setFileName(f.name);
    }
  };

  // Drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setFileName(droppedFile.name);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    setLoading(true);
    try {
      const res = await uploadFile(file);
      alert(`✨ Uploaded ${res.data.filename} (${res.data.num_chunks} chunks processed)`);

      setFile(null);
      setFileName("");
    } catch (err) {
      alert(err.response?.data?.detail || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-10"
      >
        {/* PAGE HEADER */}
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
            <Upload size={32} className="text-indigo-600" />
            Upload Notes
          </h1>
          <p className="text-gray-600 mt-2">
            Upload study materials to convert them into smart searchable chunks.
          </p>
        </div>

        {/* UPLOAD ZONE */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`
            border-2 border-dashed rounded-3xl p-10 cursor-pointer shadow-xl backdrop-blur-xl 
            transition-all bg-white/60 
            ${dragActive ? "border-indigo-500 bg-indigo-50/70" : "border-indigo-300/60"}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center text-center space-y-5">
            <motion.div
              animate={{ scale: dragActive ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-6 bg-indigo-100 rounded-full"
            >
              <Upload size={40} className="text-indigo-600" />
            </motion.div>

            <h2 className="text-xl font-bold text-gray-800">
              Drag & Drop Your File Here
            </h2>

            <p className="text-gray-600">
              or click below to browse your computer
            </p>

            {/* File Input Hidden */}
            <label
              htmlFor="fileInput"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-semibold shadow-md hover:shadow-lg hover:from-fuchsia-600 hover:to-indigo-600 transition cursor-pointer"
            >
              Browse Files
            </label>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />

            {fileName && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 px-4 py-2 bg-white/70 border rounded-xl shadow-sm"
              >
                <File className="text-indigo-600" />
                <span className="text-gray-700 font-medium">{fileName}</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* UPLOAD BUTTON */}
        <motion.button
          onClick={handleUpload}
          disabled={!file || loading}
          whileHover={{ scale: !loading ? 1.05 : 1 }}
          whileTap={{ scale: !loading ? 0.95 : 1 }}
          className="w-full md:w-auto px-10 py-4 rounded-xl text-lg font-semibold bg-gradient-to-tr 
            from-indigo-600 to-fuchsia-600 text-white drop-shadow-lg 
            hover:from-fuchsia-600 hover:to-indigo-600 transition-all 
            disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Uploading...
            </>
          ) : (
            <>
              <CheckCircle2 /> Upload File
            </>
          )}
        </motion.button>
      </motion.div>
    </DashboardLayout>
  );
}
