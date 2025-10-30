import axios from "axios";

const tokenHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const api = axios.create({
  baseURL: "http://localhost:5055",
  headers: { "Content-Type": "application/json" },
});

export const signupUser = (data) => api.post("/auth/signup", data);
export const loginUser = (data) => api.post("/auth/login", data);

// Upload notes
export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/upload", formData, { headers: { ...tokenHeader(), "Content-Type": "multipart/form-data" } });
};

// Ask question
export const askQuestion = (question, top_k = 6) => {
  return api.post("/ask", { question, top_k }, { headers: tokenHeader() });
};

// Summarize notes
export const summarizeNotes = (topic, domain = "academic", top_k = 12) => {
  return api.post("/summarize", { topic, domain, top_k }, { headers: tokenHeader() });
};

// Generate flashcards
export const generateFlashcards = (topic, top_k = 8) => {
  return api.post("/flashcards", { topic, top_k }, { headers: tokenHeader() });
};
