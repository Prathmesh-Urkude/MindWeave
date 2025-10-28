import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MindWeave
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-700 font-medium hover:text-blue-600 transition duration-200"
          >
            Home
          </Link>

          {/* Show Dashboard only when logged in */}
          {isLoggedIn && (
            <Link
              to="/dashboard"
              className="text-gray-700 font-medium hover:text-blue-600 transition duration-200"
            >
              Dashboard
            </Link>
          )}

          {/* Show Login/Signup only when NOT logged in */}
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="text-gray-700 font-medium hover:text-blue-600 transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-700 font-medium hover:text-blue-600 transition duration-200"
              >
                Signup
              </Link>
            </>
          )}

          {/* Show Logout only when logged in */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
