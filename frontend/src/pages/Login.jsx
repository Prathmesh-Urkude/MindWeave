import { useState } from "react";
import { loginUser } from "../api/index.js";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import Header from "../components/Header";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(form);
      localStorage.setItem("token", response.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 text-gray-800">
      <Header />

      {/* Main Section */}
      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/60 
        hover:shadow-purple-200 transition-all">

          {/* Heading */}
          <h2 className="text-4xl font-extrabold text-center tracking-tight 
            bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text mb-3">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Sign in to continue with{" "}
            <span className="font-semibold text-indigo-600">MindWeave</span>
          </p>

          {error && (
            <div className="bg-red-50 border border-red-400 text-red-600 text-sm p-2 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-indigo-500 w-5 h-5" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 
                bg-white/60 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                transition-all shadow-sm"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-indigo-500 w-5 h-5" />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 
                bg-white/60 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                transition-all shadow-sm"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold 
              flex justify-center items-center gap-2 text-white shadow-lg
              bg-gradient-to-r from-indigo-600 to-purple-600
              hover:shadow-purple-300 hover:from-indigo-700 hover:to-purple-700
              active:scale-95 transition-all"
            >
              <LogIn className="w-5 h-5" /> Login
            </button>
          </form>

          {/* Signup Redirect */}
          <p className="text-sm text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-indigo-600 hover:underline font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
