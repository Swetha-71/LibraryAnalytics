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
  }
);

// ---------------- BORROWINGS ----------------
export function getBorrowings() {
  return api.get("/borrowings").then((res) => res.data);
}

export function getBorrowingsWithStudent() {
  return api.get("/borrowings-with-student").then((res) => res.data);
}

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
    .then((res) => res.data)
    .catch((err) => {
      if (err.response && err.response.status === 404) {
        return { success: false, message: "Profile not found" };
      }
      throw err;
    });
}

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
