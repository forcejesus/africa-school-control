import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-rose-50/30 to-pink-50/20">
      <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-rose-200/50">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline bg-blue-50 px-4 py-2 rounded-lg transition-colors">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
