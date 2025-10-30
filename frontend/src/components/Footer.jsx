import { Facebook, Twitter, Instagram, Linkedin, Github, Brain } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-6 h-6 text-blue-500" />
            <h2 className="text-lg font-semibold text-white">MindWeave</h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Empowering your mind with AI-powered learning, creativity, and productivity tools — all in one place.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/about" className="hover:text-blue-400">About</a></li>
            <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
            <li><a href="/dashboard" className="hover:text-blue-400">Dashboard</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-400"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-blue-400"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-blue-400"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-blue-400"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="hover:text-blue-400"><Github className="w-5 h-5" /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-xs text-gray-400">
        © {new Date().getFullYear()} <span className="text-blue-400 font-semibold">MindWeave</span>. All rights reserved.
      </div>
    </footer>
  );
}
