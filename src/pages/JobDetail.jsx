import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null); // { msg, type }

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/job/get/${id}`);
        setJob(res.data.job);
      } catch {
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    const checkApplied = async () => {
      if (!user || user.role !== "student") return;
      try {
        const res = await API.get("/application/get");
        const alreadyApplied = res.data.applications?.some(
          (app) => app.job?._id === id
        );
        setApplied(alreadyApplied);
      } catch {
        // not critical — just means we can't pre-check
      }
    };

    fetchJob();
    checkApplied();
  }, [id, user]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleApply = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setApplying(true);
    setError("");
    try {
      await API.get(`/application/apply/${id}`);
      setApplied(true);
      showToast("Application submitted successfully! 🎉");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Something went wrong. Try again.";
      if (msg.toLowerCase().includes("already applied")) {
        setApplied(true);
        showToast("You've already applied for this job.", "info");
      } else {
        setError(msg);
      }
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-3">🔍</p>
          <h2 className="text-lg font-semibold text-gray-800">Job not found</h2>
          <p className="text-sm text-gray-400 mt-1 mb-4">
            This listing may have been removed.
          </p>
          <button
            onClick={() => navigate("/jobs")}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const isStudent = user?.role === "student";
  const isRecruiter = user?.role === "recruiter";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium transition-all ${
            toast.type === "info"
              ? "bg-blue-50 text-blue-700 border border-blue-200"
              : "bg-green-50 text-green-700 border border-green-200"
          }`}
        >
          {toast.msg}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-6 transition-colors"
        >
          <span>←</span> Back
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            {/* Left: company logo placeholder + info */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-2xl font-bold text-blue-600 shrink-0">
                {job.company?.name?.[0]?.toUpperCase() || "?"}
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{job.title}</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  {job.company?.name || "Company"}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                    {job.jobType}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    📍 {job.location}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    💰 ₹{job.salary} LPA
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    🎓 {job.experience} yrs exp
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    🪑 {job.position} position{job.position > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>

            {/* Apply button (students only) */}
            {isStudent && (
              <div className="shrink-0">
                {applied ? (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700 bg-green-50 border border-green-200 px-5 py-2.5 rounded-xl">
                    ✓ Applied
                  </span>
                ) : (
                  <button
                    onClick={handleApply}
                    disabled={applying}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
                  >
                    {applying ? "Submitting..." : "Apply Now"}
                  </button>
                )}
                {error && (
                  <p className="text-xs text-red-500 mt-2 text-right">{error}</p>
                )}
              </div>
            )}

            {/* Recruiter badge */}
            {isRecruiter && (
              <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg">
                You posted this job
              </span>
            )}

            {/* Not logged in */}
            {!user && (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
              >
                Login to Apply
              </button>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Main content */}
          <div className="md:col-span-2 flex flex-col gap-5">
            {/* Description */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                About this role
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Requirements */}
            {job.requirements?.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                  Requirements
                </h2>
                <ul className="flex flex-col gap-2">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-0.5 text-blue-500 shrink-0">▸</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            {/* Quick facts */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                Job Details
              </h2>
              <div className="flex flex-col gap-3">
                <Detail label="Job Type" value={job.jobType} />
                <Detail label="Location" value={job.location} />
                <Detail label="Salary" value={`₹${job.salary} LPA`} />
                <Detail label="Experience" value={`${job.experience} yrs`} />
                <Detail label="Openings" value={`${job.position} position${job.position > 1 ? "s" : ""}`} />
                {job.applications?.length !== undefined && (
                  <Detail
                    label="Applicants"
                    value={`${job.applications.length} applied`}
                  />
                )}
              </div>
            </div>

            {/* Company card */}
            {job.company && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                  Company
                </h2>
                <p className="text-sm font-medium text-gray-800">{job.company.name}</p>
                {job.company.location && (
                  <p className="text-xs text-gray-400 mt-1">{job.company.location}</p>
                )}
                {job.company.description && (
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-3">
                    {job.company.description}
                  </p>
                )}
              </div>
            )}

            {/* CTA for students (sticky at bottom of sidebar) */}
            {isStudent && !applied && (
              <button
                onClick={handleApply}
                disabled={applying}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
              >
                {applying ? "Submitting..." : "Apply for this role"}
              </button>
            )}
            {isStudent && applied && (
              <div className="w-full text-center text-sm font-medium text-green-700 bg-green-50 border border-green-200 py-3 rounded-xl">
                ✓ You've applied for this role
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-gray-400">{label}</span>
    <span className="text-gray-800 font-medium">{value}</span>
  </div>
);

export default JobDetail;
