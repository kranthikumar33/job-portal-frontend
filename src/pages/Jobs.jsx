import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../api/axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [search, setSearch] = useState(searchParams.get("keyword") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/job/get?keyword=${search}`);
        setJobs(res.data.jobs);
      } catch {
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(keyword);
    setSearchParams(keyword ? { keyword } : {});
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8 max-w-6xl mx-auto">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Browse Jobs</h1>
        <p className="text-gray-500 text-sm mt-1">
          {search ? `Showing results for "${search}"` : "Find your next opportunity"}
        </p>
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
        {search && (
          <button
            type="button"
            onClick={() => {
              setKeyword("");
              setSearch("");
              setSearchParams({});
            }}
            className="text-sm text-gray-400 hover:text-gray-700 border border-gray-200 px-4 py-2.5 rounded-lg transition-colors"
          >
            Clear
          </button>
        )}
      </form>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* No Jobs */}
      {!loading && jobs.length === 0 && (
        <div className="text-center py-24">
          <p className="text-4xl mb-3">🔍</p>
          <h2 className="text-base font-semibold text-gray-700">No jobs found</h2>
          <p className="text-sm text-gray-400 mt-1">
            Try a different keyword or{" "}
            <button
              onClick={() => { setKeyword(""); setSearch(""); setSearchParams({}); }}
              className="text-blue-600 hover:underline"
            >
              browse all jobs
            </button>
          </p>
        </div>
      )}

      {/* Job Cards */}
      {!loading && jobs.length > 0 && (
        <>
          <p className="text-xs text-gray-400 mb-4">{jobs.length} job{jobs.length !== 1 ? "s" : ""} found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between"
                onClick={() => navigate(`/jobs/${job._id}`)}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {job.jobType}
                    </span>
                    <span className="text-xs text-gray-400">{job.location}</span>
                  </div>

                  <h2 className="text-base font-semibold text-gray-900 mb-1">{job.title}</h2>
                  <p className="text-sm text-gray-500 mb-3">{job.company?.name || "Company"}</p>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{job.description}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span>💰 ₹{job.salary} LPA</span>
                    <span>🎓 {job.experience} yrs exp</span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/jobs/${job._id}`); }}
                    className="text-xs font-medium text-blue-600 hover:underline"
                  >
                    View →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Jobs;
