import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Jobs from "./pages/Jobs";       
import RegisterCompany from "./pages/recruiter/RegisterCompany";
import Companies from "./pages/recruiter/Companies";
import PostJob from "./pages/recruiter/PostJob";
import MyJobs from "./pages/recruiter/MyJobs";

const Layout = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/recruiter/jobs" element={
  <ProtectedRoute allowedRole="recruiter">
    <MyJobs />
  </ProtectedRoute>
} />



        <Route path="/recruiter/companies" element={
  <ProtectedRoute allowedRole="recruiter">
    <Companies />
  </ProtectedRoute>
} />

<Route path="/recruiter/companies/register" element={
  <ProtectedRoute allowedRole="recruiter">
    <RegisterCompany />
  </ProtectedRoute>
} />

<Route path="/recruiter/jobs/post" element={
  <ProtectedRoute allowedRole="recruiter">
    <PostJob />
  </ProtectedRoute>
} />
        <Route path="/student/dashboard" element={
          <ProtectedRoute allowedRole="student">
            <div className="p-8 text-xl font-bold">Student Dashboard</div>
          </ProtectedRoute>
        } />

        <Route path="/recruiter/dashboard" element={
          <ProtectedRoute allowedRole="recruiter">
            <div className="p-8 text-xl font-bold">Recruiter Dashboard</div>
          </ProtectedRoute>
        } />
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