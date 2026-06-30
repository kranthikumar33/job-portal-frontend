import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `hover:text-blue-600 transition-colors ${
      isActive(path) ? "text-blue-600 font-semibold" : "text-gray-600"
    }`;

  const closeMenu = () => setOpen(false);

  return (
    <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <Link to="/" onClick={closeMenu} className="text-xl font-bold text-blue-600 tracking-tight">
          Job<span className="text-gray-900">Portal</span>
        </Link>

        {/* Middle Links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {!user && (
            <>
              <Link to="/" className={linkClass("/")}>Home</Link>
              <Link to="/jobs" className={linkClass("/jobs")}>Jobs</Link>
            </>
          )}
          {user?.role === "student" && (
            <>
              <Link to="/" className={linkClass("/")}>Home</Link>
              <Link to="/jobs" className={linkClass("/jobs")}>Jobs</Link>
              <Link to="/student/applications" className={linkClass("/student/applications")}>My Applications</Link>
            </>
          )}
          {user?.role === "recruiter" && (
            <>
              <Link to="/recruiter/companies" className={linkClass("/recruiter/companies")}>Companies</Link>
              <Link to="/recruiter/jobs" className={linkClass("/recruiter/jobs")}>My Jobs</Link>
            </>
          )}
        </div>

        {/* Right Side — hidden on mobile */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Login</Link>
              <Link to="/signup" className="text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">Sign up</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
                  {user.fullname?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700">{user.fullname}</span>
              </Link>
              <button onClick={handleLogout} className="text-sm font-medium text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition-colors">
                Logout
              </button>
            </>
          )}
        </div>

        {/* Hamburger — mobile only */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-700" aria-label="Toggle menu">
          {open ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden mt-3 pb-3 flex flex-col gap-3 text-sm font-medium border-t border-gray-100 pt-3">
          {!user && (
            <>
              <Link to="/" onClick={closeMenu} className={linkClass("/")}>Home</Link>
              <Link to="/jobs" onClick={closeMenu} className={linkClass("/jobs")}>Jobs</Link>
            </>
          )}
          {user?.role === "student" && (
            <>
              <Link to="/" onClick={closeMenu} className={linkClass("/")}>Home</Link>
              <Link to="/jobs" onClick={closeMenu} className={linkClass("/jobs")}>Jobs</Link>
              <Link to="/student/applications" onClick={closeMenu} className={linkClass("/student/applications")}>My Applications</Link>
            </>
          )}
          {user?.role === "recruiter" && (
            <>
              <Link to="/recruiter/companies" onClick={closeMenu} className={linkClass("/recruiter/companies")}>Companies</Link>
              <Link to="/recruiter/jobs" onClick={closeMenu} className={linkClass("/recruiter/jobs")}>My Jobs</Link>
            </>
          )}

          <div className="border-t border-gray-100 pt-3 flex flex-col gap-3">
            {!user ? (
              <>
                <Link to="/login" onClick={closeMenu} className="text-gray-700">Login</Link>
                <Link to="/signup" onClick={closeMenu} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center transition-colors">Sign up</Link>
              </>
            ) : (
              <>
                <Link to="/profile" onClick={closeMenu} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
                    {user.fullname?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700">{user.fullname}</span>
                </Link>
                <button onClick={handleLogout} className="text-red-500 border border-red-200 px-3 py-1.5 rounded-lg text-left">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;