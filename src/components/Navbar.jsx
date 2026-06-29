import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `hover:text-blue-600 transition-colors ${
      isActive(path) ? "text-blue-600 font-semibold" : "text-gray-600"
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600 tracking-tight">
        Job<span className="text-gray-900">Portal</span>
      </Link>

      {/* Middle Links */}
      <div className="flex items-center gap-6 text-sm font-medium">
        {/* Guest */}
        {!user && (
          <>
            <Link to="/" className={linkClass("/")}>
              Home
            </Link>
            <Link to="/jobs" className={linkClass("/jobs")}>
              Jobs
            </Link>
          </>
        )}

        {/* Student */}
        {user?.role === "student" && (
          <>
            <Link to="/" className={linkClass("/")}>
              Home
            </Link>
            <Link to="/jobs" className={linkClass("/jobs")}>
              Jobs
            </Link>
            <Link
              to="/student/applications"
              className={linkClass("/student/applications")}
            >
              My Applications
            </Link>
          </>
        )}

        {/* Recruiter */}
        {user?.role === "recruiter" && (
          <>
            <Link
              to="/recruiter/companies"
              className={linkClass("/recruiter/companies")}
            >
              Companies
            </Link>
            <Link to="/recruiter/jobs" className={linkClass("/recruiter/jobs")}>
              My Jobs
            </Link>
          </>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {!user ? (
          <>
            <Link
              to="/login"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            {/* Avatar + name */}
            <Link
              to="/profile"
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
                {user.fullname?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {user.fullname}
              </span>
            </Link>

            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition-colors"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
