import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import AppliedJobs from "./pages/student/AppliedJobs";
import RegisterCompany from "./pages/recruiter/RegisterCompany";
import Companies from "./pages/recruiter/Companies";
import PostJob from "./pages/recruiter/PostJob";
import MyJobs from "./pages/recruiter/MyJobs";
import Applicants from "./pages/recruiter/Applicants";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

const Layout = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Student */}
        <Route
          path="/student/applications"
          element={
            <ProtectedRoute allowedRole="student">
              <AppliedJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <div className="p-8 text-xl font-bold">Student Dashboard</div>
            </ProtectedRoute>
          }
        />

        {/* Recruiter */}
        <Route
          path="/recruiter/jobs"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <MyJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/jobs/:id/applicants"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <Applicants />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/companies"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <Companies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/companies/register"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <RegisterCompany />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/jobs/post"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <PostJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <div className="p-8 text-xl font-bold">Recruiter Dashboard</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
