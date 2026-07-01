import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Search } from "lucide-react";

const CATEGORIES = [
  { label: "Engineering", icon: "⚙️" },
  { label: "Design", icon: "🎨" },
  { label: "Marketing", icon: "📣" },
  { label: "Finance", icon: "💹" },
  { label: "Data Science", icon: "📊" },
  { label: "Product", icon: "🧩" },
];

const STATS = [
  { value: "10,000+", label: "Jobs Listed" },
  { value: "3,500+", label: "Companies" },
  { value: "50,000+", label: "Students Placed" },
  { value: "95%", label: "Success Rate" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Create your account",
    desc: "Sign up as a student or recruiter in under a minute.",
  },
  {
    step: "02",
    title: "Browse or post jobs",
    desc: "Students explore thousands of listings. Recruiters post roles instantly.",
  },
  {
    step: "03",
    title: "Apply & get hired",
    desc: "One-click apply. Track every application in real time.",
  },
];

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs${keyword ? `?keyword=${keyword}` : ""}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-6 py-24 text-center">
        <p className="text-blue-200 text-sm font-medium tracking-widest uppercase mb-4">
          Your Career Starts Here
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl mx-auto">
          Find the job that fits{" "}
          <span className="text-blue-200">your ambition</span>
        </h1>
        <p className="text-blue-100 mt-5 text-base max-w-xl mx-auto leading-relaxed">
          Browse thousands of openings from top companies. Apply in one click
          and track every step of your journey.
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="mt-10 max-w-xl mx-auto bg-white rounded-2xl p-2 shadow-lg flex flex-col gap-2 sm:flex-row sm:items-center"
        >
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Job title, skill, or keyword..."
            className="w-full flex-1 px-4 py-3 text-sm text-gray-800 bg-transparent outline-none placeholder-gray-400 rounded-xl"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
          >
            Search Jobs
          </button>
        </form>
        {!user && (
          <div className="mt-6 flex items-center justify-center gap-4 text-sm">
            <button
              onClick={() => navigate("/signup")}
              className="text-white underline underline-offset-2 hover:text-blue-200 transition-colors"
            >
              Create free account
            </button>
            <span className="text-blue-400">·</span>
            <button
              onClick={() => navigate("/jobs")}
              className="text-white underline underline-offset-2 hover:text-blue-200 transition-colors"
            >
              Browse all jobs
            </button>
          </div>
        )}
        {user && (
          <p className="mt-5 text-blue-200 text-sm">
            Welcome back,{" "}
            <span className="font-semibold text-white">{user.fullname}</span> 👋
          </p>
        )}
      </section>

      {/* ── Stats ── */}
      <section className="bg-blue-700 text-white px-6 py-10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold">{s.value}</p>
              <p className="text-blue-200 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Browse by Category
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Explore roles across the industries hiring right now
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              onClick={() => navigate(`/jobs?keyword=${cat.label}`)}
              className="flex items-center gap-3 bg-white border border-gray-100 hover:border-blue-300 hover:shadow-md rounded-2xl px-5 py-4 text-left transition-all group"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">How it works</h2>
            <p className="text-gray-400 text-sm mt-2">
              Three steps from sign-up to offer letter
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-sm font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      {!user && (
        <section className="px-6 py-20 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to find your next role?
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              Join thousands of students already landing jobs through JobPortal.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => navigate("/signup")}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Get Started — it's free
              </button>
              <button
                onClick={() => navigate("/jobs")}
                className="border border-gray-200 hover:border-gray-400 text-gray-700 text-sm font-medium px-6 py-3 rounded-xl transition-colors"
              >
                Browse Jobs
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} JobPortal. Built with React & Node.js.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <Link
              to="/privacy-policy"
              className="hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-blue-600 transition-colors">
              Terms & Conditions
            </Link>
            <a
              href="mailto:support@jobportal.dev"
              className="hover:text-blue-600 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
