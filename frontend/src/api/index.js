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
