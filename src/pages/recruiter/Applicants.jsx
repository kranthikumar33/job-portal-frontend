import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";

const statusColors = {
  pending:  { bg: "bg-yellow-50",  text: "text-yellow-700",  border: "border-yellow-200"  },
  accepted: { bg: "bg-green-50",   text: "text-green-700",   border: "border-green-200"   },
  rejected: { bg: "bg-red-50",     text: "text-red-600",     border: "border-red-200"     },
};

const Applicants = () => {
  const { id } = useParams(); // job id
  const navigate = useNavigate();

  const [applicants, setApplicants] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null); // applicationId being updated
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await API.get(`/application/${id}/applicants`);
        setApplicants(res.data.applicants || []);
      } catch {
        setApplicants([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchJob = async () => {
      try {
        const res = await API.get(`/job/get/${id}`);
        setJobTitle(res.data.job?.title || "Job");
      } catch {
        setJobTitle("Job");
      }
    };

    fetchApplicants();
    fetchJob();
  }, [id]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleStatus = async (applicationId, status) => {
    setUpdating(applicationId);
    try {
      await API.put(`/application/status/${applicationId}/update`, { status });
      // update locally — no need to refetch
      setApplicants((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status } : app
        )
      );
      showToast(
        status === "accepted"
          ? "Applicant accepted ✓"
          : "Applicant rejected"
      , status === "accepted" ? "success" : "error");
    } catch {
      showToast("Failed to update status. Try again.", "error");
    } finally {
      setUpdating(null);
    }
  };

  const counts = {
    total: applicants.length,
    pending: applicants.filter((a) => (a.status || "pending") === "pending").length,
    accepted: applicants.filter((a) => a.status === "accepted").length,
    rejected: applicants.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 max-w-5xl mx-auto">

      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium border transition-all ${
            toast.type === "error"
              ? "bg-red-50 text-red-600 border-red-200"
              : "bg-green-50 text-green-700 border-green-200"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/recruiter/jobs")}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-4 transition-colors"
        >
          ← Back to My Jobs
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Applicants</h1>
        <p className="text-sm text-gray-400 mt-1">
          {jobTitle} &mdash; review and update application statuses
        </p>
      </div>

      {/* Stats bar */}
      {!loading && applicants.length > 0 && (
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total", value: counts.total, color: "text-gray-900" },
            { label: "Pending", value: counts.pending, color: "text-yellow-600" },
            { label: "Accepted", value: counts.accepted, color: "text-green-600" },
            { label: "Rejected", value: counts.rejected, color: "text-red-500" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4"
            >
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Empty */}
      {!loading && applicants.length === 0 && (
        <div className="text-center py-24">
          <p className="text-4xl mb-4">📭</p>
          <h2 className="text-base font-semibold text-gray-700">No applicants yet</h2>
          <p className="text-sm text-gray-400 mt-1">
            Share your job listing to start receiving applications.
          </p>
        </div>
      )}

      {/* Applicants Table */}
      {!loading && applicants.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                <th className="text-left px-6 py-4">Applicant</th>
                <th className="text-left px-6 py-4">Contact</th>
                <th className="text-left px-6 py-4">Applied On</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-center px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {applicants.map((app) => {
                const applicant = app.applicant;
                const status = app.status || "pending";
                const colors = statusColors[status] || statusColors.pending;
                const isUpdating = updating === app._id;

                return (
                  <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                    {/* Name + avatar */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700 shrink-0">
                          {applicant?.fullname?.[0]?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {applicant?.fullname || "Unknown"}
                          </p>
                          <p className="text-xs text-gray-400 capitalize">
                            {applicant?.role || "student"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4">
                      <p className="text-gray-600">{applicant?.email || "—"}</p>
                      {applicant?.phoneNumber && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {applicant.phoneNumber}
                        </p>
                      )}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-gray-400 text-xs">
                      {new Date(app.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Status badge */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </td>

                    {/* Accept / Reject buttons */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {status === "accepted" ? (
                          <span className="text-xs text-green-600 font-medium">✓ Accepted</span>
                        ) : status === "rejected" ? (
                          <span className="text-xs text-red-500 font-medium">✗ Rejected</span>
                        ) : (
                          <>
                            <button
                              disabled={isUpdating}
                              onClick={() => handleStatus(app._id, "accepted")}
                              className="text-xs font-semibold text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                            >
                              {isUpdating ? "..." : "Accept"}
                            </button>
                            <button
                              disabled={isUpdating}
                              onClick={() => handleStatus(app._id, "rejected")}
                              className="text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                            >
                              {isUpdating ? "..." : "Reject"}
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Applicants;
