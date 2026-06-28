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

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Posted Jobs</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your listings and review applicants
          </p>
        </div>
        <button
          onClick={() => navigate("/recruiter/jobs/post")}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
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
          <h2 className="text-base font-semibold text-gray-700">No jobs posted yet</h2>
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

      {/* Jobs Table */}
      {!loading && jobs.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
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
                <tr key={job._id} className="hover:bg-gray-50 transition-colors">
                  {/* Role */}
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{job.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">📍 {job.location}</p>
                  </td>

                  {/* Company */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-600">
                        {job.company?.name?.[0]?.toUpperCase() || "?"}
                      </div>
                      <span className="text-gray-700">{job.company?.name || "—"}</span>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                      {job.jobType}
                    </span>
                  </td>

                  {/* Applicants count */}
                  <td className="px-6 py-4">
                    <span className="text-gray-700 font-medium">
                      {job.applications?.length ?? 0}
                    </span>
                    <span className="text-gray-400 ml-1">applied</span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-gray-400 text-xs">
                    {formatDate(job.createdAt)}
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-400 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      View Applicants →
                    </button>
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
          <span>{jobs.length} job{jobs.length !== 1 ? "s" : ""} posted</span>
          <span>
            {jobs.reduce((acc, j) => acc + (j.applications?.length ?? 0), 0)} total applicants
          </span>
        </div>
      )}
    </div>
  );
};

export default MyJobs;
