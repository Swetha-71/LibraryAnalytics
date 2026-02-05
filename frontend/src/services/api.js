import axios from "axios";

const API_BASE = "http://localhost:8080/api";

let currentAuth = null;

export const setAuth = (username, password) => {
  currentAuth = { username, password };
};

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

<<<<<<< HEAD
api.interceptors.request.use(
  function (config) {
    if (currentAuth) {
      const basic = btoa(currentAuth.username + ":" + currentAuth.password);
      config.headers.Authorization = "Basic " + basic;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
=======
/*
// If you later want Basic Auth, uncomment this:
api.interceptors.request.use((config) => {
  if (currentAuth) {
    const basic = btoa(`${currentAuth.username}:${currentAuth.password}`);
    config.headers["Authorization"] = `Basic ${basic}`;
>>>>>>> 3fb4616dfcffd945348dddf7e59ace5a4ec8a9cf
  }
);

// ---------------- BORROWINGS ----------------
export function getBorrowings() {
  return api.get("/borrowings").then((res) => res.data);
}

export function getBorrowingsWithStudent() {
  return api.get("/borrowings-with-student").then((res) => res.data);
}

<<<<<<< HEAD
// ---------------- STUDENTS ----------------
export function getStudents() {
  return api.get("/students").then((res) => res.data);
}

export function getStudentById(studentId) {
  return api.get("/students/" + studentId).then((res) => res.data);
}

export function getStudentProfile(username) {
  return api
    .get("/student-profile/" + username)
=======
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

export const sendOtp = (email) =>
  api.post("/auth/send-otp", { email }).then((res) => res.data);

// Student profile (old)
export const getStudentProfile = (username) =>
  api
    .get(`/student-profile/${username}`)
>>>>>>> 3fb4616dfcffd945348dddf7e59ace5a4ec8a9cf
    .then((res) => res.data)
    .catch((err) => {
      if (err.response && err.response.status === 404) {
        return { success: false, message: "Profile not found" };
      }
      throw err;
    });
}

<<<<<<< HEAD
// ---------------- ANALYTICS ----------------
export function getAnalyticsSummary() {
  return api.get("/analytics/summary").then((res) => res.data);
}

export function predictDemand(bookId) {
  return api.get("/analytics/predict/demand/" + bookId).then((res) => res.data);
}

// ---------------- AUTH / OTP ----------------
export function sendOtp(email) {
  return api.post("/auth/send-otp", { email }).then((res) => res.data);
}
=======
// Semester-based recommendations
export const getSemesterRecommendations = (username) =>
  api.get(`/recommendations/semester/${username}`).then((res) => res.data);

// Friends-are-reading recommendations
export const getFriendsRecommendations = (username) =>
  api
    .get(`/recommendations/friends/${username}`)
    .then(res => res.data.borrowings || []);

// ================= ADDITIONS =================
>>>>>>> 3fb4616dfcffd945348dddf7e59ace5a4ec8a9cf

export function register(data) {
  return api.post("/auth/register", data).then((res) => res.data);
}

export function loginApi(identifier, password) {
  return api
    .post("/auth/login", { identifier, password })
    .then((res) => res.data);
}

// ---------------- SEARCH & DASHBOARD ----------------
export const searchBooks = (query) =>
  api.get(`/books/search?query=${query}`).then((res) => res.data);

export const getBorrowedBooks = (username) =>
  api.get(`/borrowed-books/${username}`).then((res) => res.data);

export const getFines = (username) =>
  api.get(`/student-fines/${username}`).then((res) => res.data);
<<<<<<< HEAD
=======

// ---------------- PROFILES (for student dashboard) ----------------
>>>>>>> 3fb4616dfcffd945348dddf7e59ace5a4ec8a9cf

// ---------------- PROFILES ----------------
export const getProfile = (username) =>
  api
    .get(`/profiles/${username}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("getProfile error", err);
      return { success: false, message: "Profile not found" };
    });

export const updateProfile = (username, data) =>
  api
    .put(`/profiles/${username}`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("updateProfile error", err);
      return { success: false, message: "Failed to update profile" };
    });

// ---------------- RECOMMENDATIONS ----------------
export function getSemesterRecommendations(username) {
  return api
    .get("/recommendations/semester/" + username)
    .then((res) => res.data);
}
