import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const statusColors = {
  pending:  { bg: "bg-yellow-50",  text: "text-yellow-700",  border: "border-yellow-200",  dot: "bg-yellow-400" },
  accepted: { bg: "bg-green-50",   text: "text-green-700",   border: "border-green-200",   dot: "bg-green-500"  },
  rejected: { bg: "bg-red-50",     text: "text-red-600",     border: "border-red-200",     dot: "bg-red-400"    },
};

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/application/get");
        setApplications(res.data.applications || []);
      } catch {
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
        <p className="text-sm text-gray-400 mt-1">
          Track the status of all your job applications
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Empty */}
      {!loading && applications.length === 0 && (
        <div className="text-center py-24">
          <p className="text-4xl mb-4">📭</p>
          <h2 className="text-base font-semibold text-gray-700">No applications yet</h2>
          <p className="text-sm text-gray-400 mt-1 mb-5">
            Start applying to jobs and track them here.
          </p>
          <button
            onClick={() => navigate("/jobs")}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Browse Jobs →
          </button>
        </div>
      )}

      {/* Applications list */}
      {!loading && applications.length > 0 && (
        <div className="flex flex-col gap-4">
          {applications.map((app) => {
            const job = app.job;
            const status = app.status || "pending";
            const colors = statusColors[status] || statusColors.pending;

            return (
              <div
                key={app._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between gap-4 flex-wrap hover:shadow-md transition-shadow"
              >
                {/* Left: company initial + info */}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-lg font-bold text-blue-600 shrink-0">
                    {job?.company?.name?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {job?.title || "—"}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {job?.company?.name || "Company"} &middot;{" "}
                      {job?.location || "—"}
                    </p>
                    <p className="text-xs text-gray-300 mt-1">
                      Applied {formatDate(app.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Right: status + view */}
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                  {job?._id && (
                    <button
                      onClick={() => navigate(`/jobs/${job._id}`)}
                      className="text-xs text-blue-600 hover:underline font-medium"
                    >
                      View job →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary bar */}
      {!loading && applications.length > 0 && (
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 flex gap-6 flex-wrap text-sm">
          <Stat label="Total Applied" value={applications.length} />
          <Stat
            label="Pending"
            value={applications.filter((a) => (a.status || "pending") === "pending").length}
            color="text-yellow-600"
          />
          <Stat
            label="Accepted"
            value={applications.filter((a) => a.status === "accepted").length}
            color="text-green-600"
          />
          <Stat
            label="Rejected"
            value={applications.filter((a) => a.status === "rejected").length}
            color="text-red-500"
          />
        </div>
      )}
    </div>
  );
};

const Stat = ({ label, value, color = "text-gray-900" }) => (
  <div>
    <p className={`text-lg font-bold ${color}`}>{value}</p>
    <p className="text-xs text-gray-400">{label}</p>
  </div>
);

export default AppliedJobs;
