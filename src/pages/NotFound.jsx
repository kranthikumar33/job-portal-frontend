import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-7xl font-extrabold text-blue-600 mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h1>
        <p className="text-sm text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-medium text-gray-500 border border-gray-200 hover:border-gray-400 px-5 py-2.5 rounded-xl transition-colors"
          >
            ← Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;