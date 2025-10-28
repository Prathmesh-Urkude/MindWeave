import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
    
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center grow text-center px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">MindWeave</span>
        </h1>

        <p className="text-lg text-gray-600 mb-8 max-w-md">
          Your personal AI assistant for notes, summaries, and flashcards.
        </p>

        <div className="flex space-x-4">
          <Link to="/login">
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-300">
              Signup
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
