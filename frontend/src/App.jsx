import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";
import AskPage from "./pages/AskPage";
import SummarizePage from "./pages/SummarizePage";
import FlashcardsPage from "./pages/FlashcardsPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <main className="grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Dashboard Overview */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Feature pages */}
            <Route
              path="/dashboard/upload"
              element={
                <ProtectedRoute>
                  <UploadPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/ask"
              element={
                <ProtectedRoute>
                  <AskPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/summarize"
              element={
                <ProtectedRoute>
                  <SummarizePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/flashcards"
              element={
                <ProtectedRoute>
                  <FlashcardsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
