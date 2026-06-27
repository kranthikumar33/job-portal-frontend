import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await API.get("/company/get");
        setCompanies(res.data.companies);
        console.log("companies data:", res.data.companies);
      } catch (err) {
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8 max-w-4xl mx-auto">

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Companies</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your registered companies</p>
        </div>
        <button
          onClick={() => navigate("/recruiter/companies/register")}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          + New Company
        </button>
      </div>

      {loading && (
        <div className="text-center text-gray-400 py-20 text-sm">Loading...</div>
      )}

      {!loading && companies.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-sm mb-4">No companies registered yet.</p>
          <button
            onClick={() => navigate("/recruiter/companies/register")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg"
          >
            Register your first company
          </button>
        </div>
      )}

      {!loading && companies.length > 0 && (
        <div className="space-y-4">
          {companies.map((company) => (
            <div
              key={company._id}
              className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between hover:shadow-sm transition-shadow"
            >
              <div>
                <h2 className="text-base font-semibold text-gray-900">{company.name}</h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-1">{company.description}</p>
                {company.location && (
                  <p className="text-xs text-gray-400 mt-1">📍 {company.location}</p>
                )}
              </div>
              <button
                onClick={() => navigate("/recruiter/jobs/post", { state: { companyId: company._id } })}
                className="text-sm font-medium bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
              >
                Post Job
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Companies;