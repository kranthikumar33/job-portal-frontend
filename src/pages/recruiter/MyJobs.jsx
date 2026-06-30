import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/job/getadminjobs");
        setJobs(res.data.jobs || []);
      } catch {
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const formatDate = (iso) => {
    if (!iso) return "Recently posted";
    const date = new Date(iso);
    if (isNaN(date)) return "Recently posted";
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await API.delete(`/job/delete/${jobId}`);
      setJobs((prev) => prev.filter((j) => j._id !== jobId));
    } catch {
      alert("Failed to delete job. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Posted Jobs</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your listings and review applicants
          </p>
        </div>
        <button
          onClick={() => navigate("/recruiter/jobs/post")}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shrink-0"
        >
          + Post New Job
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Empty */}
      {!loading && jobs.length === 0 && (
        <div className="text-center py-24">
          <p className="text-4xl mb-4">📋</p>
          <h2 className="text-base font-semibold text-gray-700">
            No jobs posted yet
          </h2>
          <p className="text-sm text-gray-400 mt-1 mb-5">
            Post your first job to start receiving applications.
          </p>
          <button
            onClick={() => navigate("/recruiter/jobs/post")}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Post a Job →
          </button>
        </div>
      )}

      {/* ── Mobile: stacked cards ── */}
      {!loading && jobs.length > 0 && (
        <div className="md:hidden flex flex-col gap-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-sm font-bold text-blue-600 shrink-0">
                  {job.company?.name?.[0]?.toUpperCase() || "?"}
                </div>
                <div className="min-w-0 flex-1">
                  <button
                    onClick={() => navigate(`/jobs/${job._id}`)}
                    className="font-semibold text-gray-900 hover:text-blue-600 transition-colors text-left block truncate w-full"
                  >
                    {job.title}
                  </button>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {job.company?.name || "—"} · 📍 {job.location}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  {job.jobType}
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                  {job.applications?.length ?? 0} applied
                </span>
                <span className="text-xs text-gray-400 px-2.5 py-1">
                  {formatDate(job.createdAt)}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() =>
                    navigate(`/recruiter/jobs/${job._id}/applicants`)
                  }
                  className="flex-1 text-xs font-semibold text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-400 px-3 py-2 rounded-lg transition-colors text-center"
                >
                  Applicants
                </button>
                <button
                  onClick={() => navigate(`/recruiter/jobs/${job._id}/edit`)}
                  className="flex-1 text-xs font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 px-3 py-2 rounded-lg transition-colors text-center"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="flex-1 text-xs font-semibold text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-2 rounded-lg transition-colors text-center"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Desktop: table ── */}
      {!loading && jobs.length > 0 && (
        <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                <th className="text-left px-6 py-4">Role</th>
                <th className="text-left px-6 py-4">Company</th>
                <th className="text-left px-6 py-4">Type</th>
                <th className="text-left px-6 py-4">Applicants</th>
                <th className="text-left px-6 py-4">Posted</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {jobs.map((job) => (
                <tr
                  key={job._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/jobs/${job._id}`)}
                      className="font-medium text-gray-900 hover:text-blue-600 transition-colors text-left"
                    >
                      {job.title}
                    </button>
                    <p className="text-xs text-gray-400 mt-0.5">
                      📍 {job.location}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-600">
                        {job.company?.name?.[0]?.toUpperCase() || "?"}
                      </div>
                      <span className="text-gray-700">
                        {job.company?.name || "—"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                      {job.jobType}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-gray-700 font-medium">
                      {job.applications?.length ?? 0}
                    </span>
                    <span className="text-gray-400 ml-1">applied</span>
                  </td>

                  <td className="px-6 py-4 text-gray-400 text-xs">
                    {formatDate(job.createdAt)}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          navigate(`/recruiter/jobs/${job._id}/applicants`)
                        }
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-400 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Applicants →
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/recruiter/jobs/${job._id}/edit`)
                        }
                        className="text-xs font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="text-xs font-semibold text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary */}
      {!loading && jobs.length > 0 && (
        <div className="mt-5 flex gap-6 text-sm text-gray-400">
          <span>
            {jobs.length} job{jobs.length !== 1 ? "s" : ""} posted
          </span>
          <span>
            {jobs.reduce((acc, j) => acc + (j.applications?.length ?? 0), 0)}{" "}
            total applicants
          </span>
        </div>
      )}
    </div>
  );
};

export default MyJobs;
