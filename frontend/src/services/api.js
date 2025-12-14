import axios from "axios";

// TEMP: force this exact URL
const API_BASE = "http://localhost:8080/api";

let currentAuth = null;

// Set Basic Auth credentials
export const setAuth = (username, password) => {
  currentAuth = { username, password };
};

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

    const basic = btoa(`${currentAuth.username}:${currentAuth.password}`);
    config.headers["Authorization"] = `Basic ${basic}`;
  }
  return config;
});

// Borrowings
export const getBorrowings = () =>
  api.get("/borrowings").then((res) => res.data);

export const getBorrowingsWithStudent = () =>
  api.get("/borrowings-with-student").then((res) => res.data);

// Students
export const getStudents = () =>
  api.get("/students").then((res) => res.data);

export const getStudentById = (studentId) =>
  api.get(`/students/${studentId}`).then((res) => res.data);

// Analytics
export const getAnalyticsSummary = () =>
  api.get("/analytics/summary").then((res) => res.data);

export const predictDemand = (bookId) =>
  api.get(`/analytics/predict/demand/${bookId}`).then((res) => res.data);
*/
// Auth
export const register = (data) =>
  api.post("/auth/register", data).then((res) => res.data);

export const loginApi = (identifier, password) =>
  api.post("/auth/login", { identifier, password }).then((res) => res.data);
export const getStudentProfile = (username) =>
  api
    .get(`/student-profile/${username}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("getStudentProfile error", err);
      if (err.response && err.response.status === 404) {
        return { success: false, message: "Profile not found" };
      }
      // for any other problem, rethrow so you see it
      throw err;
    });


export const getSemesterRecommendations = (username) =>
  api.get(`/recommendations/semester/${username}`).then(res => res.data);

export const sendOtp = (email) =>
  api.post("/auth/send-otp", { email }).then((res) => res.data);
