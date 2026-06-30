import axios from "axios";

// In production (Vercel), set VITE_API_URL to your Render backend URL, e.g.
// https://job-portal-backend.onrender.com/api
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5011/api",
  withCredentials: true,
});

export default API;