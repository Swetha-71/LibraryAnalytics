import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080/api";


// You can later update this with real token-based auth.
let currentAuth = null;

export const setAuth = (username, password) => {
  // For demo: store plain, then send as Basic Auth
  currentAuth = { username, password };
};

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Add interceptor to attach Authorization header
api.interceptors.request.use((config) => {
  if (currentAuth) {
    const basic = btoa(`${currentAuth.username}:${currentAuth.password}`);
    config.headers["Authorization"] = `Basic ${basic}`;
  }
  return config;
});

// Borrowings APIs
export const getBorrowings = () =>
  api.get("/borrowings").then((res) => res.data);
export const getBorrowingsWithStudent = () =>
  api.get("/borrowings-with-student").then((res) => res.data);

// Students APIs
export const getStudents = () =>
  api.get("/students").then((res) => res.data);
export const getStudentById = (studentId) =>
  api.get(`/students/${studentId}`).then((res) => res.data);

// Analytics APIs
export const getAnalyticsSummary = () =>
  api.get("/analytics/summary").then((res) => res.data);
export const predictDemand = (bookId) =>
  api.get(`/analytics/predict/demand/${bookId}`).then((res) => res.data);
export const register = (data) =>
  api.post('/auth/register', data).then(res => res.data);
