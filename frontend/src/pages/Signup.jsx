import { useState } from "react";
import { signupUser } from "../api/index.js";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import Header from "../components/Header";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser(form);
      alert("Account created successfully! 🎉");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 text-gray-800">
      <Header />

      {/* Main Auth Card */}
      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/60 
        hover:shadow-purple-200 transition-all duration-300">

          {/* Heading */}
          <h2 className="text-4xl font-extrabold text-center tracking-tight 
            bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 
            text-transparent bg-clip-text mb-3">
            Let’s Get Started 🚀
          </h2>

          <p className="text-center text-gray-600 mb-8">
            Join the <span className="font-semibold text-indigo-600">MindWeave</span> community
          </p>

          {error && (
            <div className="bg-red-50 border border-red-400 text-red-600 text-sm py-2 px-3 rounded-lg mb-4 text-center shadow-sm">
              {error}
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Full Name */}
            <div className="relative">
              <User className="absolute left-3 top-3 text-indigo-500 w-5 h-5" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border bg-white/60 border-gray-300 
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-indigo-500 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border bg-white/60 border-gray-300 
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-indigo-500 w-5 h-5" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border bg-white/60 border-gray-300 
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all"
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold flex justify-center items-center gap-2 
              text-white shadow-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600
              hover:shadow-purple-300 hover:from-indigo-700 hover:to-blue-700 active:scale-95 transition-all"
            >
              <UserPlus className="w-5 h-5" /> Create Account
            </button>
          </form>

          {/* Login Redirect */}
          <p className="text-sm text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-indigo-600 hover:underline font-medium"
            >
              Log in
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
