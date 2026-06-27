import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/job/get?keyword=${search}`);
        setJobs(res.data.jobs);
      } catch (err) {
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [search]); // re-fetches every time search changes

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(keyword); // triggers the useEffect above
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8 max-w-6xl mx-auto">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Browse Jobs</h1>
        <p className="text-gray-500 text-sm mt-1">Find your next opportunity</p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search by title or keyword..."
          className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          Search
        </button>
      </form>

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-400 py-20 text-sm">Loading jobs...</div>
      )}

      {/* No Jobs */}
      {!loading && jobs.length === 0 && (
        <div className="text-center text-gray-400 py-20 text-sm">No jobs found.</div>
      )}

      {/* Job Cards */}
      {!loading && jobs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between"
              onClick={() => navigate(`/jobs/${job._id}`)}
            >
              {/* Company name & location */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {job.jobType}
                  </span>
                  <span className="text-xs text-gray-400">{job.location}</span>
                </div>

                {/* Title */}
                <h2 className="text-base font-semibold text-gray-900 mb-1">{job.title}</h2>

                {/* Company */}
                <p className="text-sm text-gray-500 mb-3">
                  {job.company?.name || "Company"}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {job.description}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex gap-3 text-xs text-gray-500">
                  <span>💰 ₹{job.salary} LPA</span>
                  <span>🎓 {job.experience} yrs exp</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent card click
                    navigate(`/jobs/${job._id}`);
                  }}
                  className="text-xs font-medium text-blue-600 hover:underline"
                >
                  View →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;