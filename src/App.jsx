import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

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
    </BrowserRouter>
  );
}

export default App;