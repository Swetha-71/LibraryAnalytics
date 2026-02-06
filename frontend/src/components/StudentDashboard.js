import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getProfile,
  updateProfile,
  getSemesterRecommendations,
  getBorrowedBooks,
  getFines,
  api
} from "../services/api";

const StudentDashboard = () => {
  const { user } = useAuth();

  const [page, setPage] = useState("dashboard");
  const [profile, setProfile] = useState(null);
  const [profileForm, setProfileForm] = useState({});
  const [editing, setEditing] = useState(false);

  // 🔥 NEW STATES
  const [subjects, setSubjects] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [friendsRecommended, setFriendsRecommended] = useState([]);

  const [borrowed, setBorrowed] = useState([]);
  const [fine, setFine] = useState(0);

  useEffect(() => {
    if (!user) return;

    // ---------------- PROFILE ----------------
    getProfile(user.username).then((res) => {
      if (res && res.success !== false) {
        setProfile(res);
        setProfileForm(res);
      }
    });

    // ---------------- SEMESTER RECOMMENDATIONS ----------------
    getSemesterRecommendations(user.username)
      .then((res) => {
        if (res) {
          setSubjects(res.subjects || []);
          setRecommendedBooks(res.books || []);
        }
      })
      .catch(console.error);

    // ---------------- FRIENDS READING ----------------
    api
      .get(`/recommendations/friends/${user.username}`)
      .then((res) => setFriendsRecommended(res.data.borrowings || []))
      .catch(console.error);

    // ---------------- BORROWED & FINES ----------------
    getBorrowedBooks(user.username).then(setBorrowed);
    getFines(user.username).then((res) => setFine(res?.totalFine || 0));
  }, [user]);

  if (!user) return <p>Please login</p>;

  // ---------------- DASHBOARD ----------------
  function dashboard() {
    return (
      <>
        <h2>Dashboard</h2>

        {profile && (
          <div style={styles.card}>
            <p><b>Name:</b> {profile.name}</p>
            <p><b>Branch:</b> {profile.branch}</p>
            <p><b>Semester:</b> {profile.semester}</p>
            <p>
              <b>Subjects:</b>{" "}
              {subjects.length
                ? subjects.map((s) => s.shortName).join(", ")
                : "N/A"}
            </p>
          </div>
        )}

        <h3>Recommended Books</h3>
        {recommendedBooks.length === 0 ? (
          <p>No recommendations yet</p>
        ) : (
          recommendedBooks.map((b) => (
            <div key={b.id} style={styles.book}>
              {b.title} — {b.author}
            </div>
          ))
        )}

        <h3>What your friends are reading</h3>
        {friendsRecommended.length === 0 ? (
          <p>No data yet</p>
        ) : (
          friendsRecommended.map((b) => (
            <div key={b.id} style={styles.book}>
              {b.bookTitle} (borrowed by {b.studentId})
            </div>
          ))
        )}
      </>
    );
  }

  // ---------------- UI ----------------
  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h3>📚 Library</h3>
        <div onClick={() => setPage("dashboard")}>Dashboard</div>
      </div>

      <div style={styles.main}>{dashboard()}</div>
    </div>
  );
};

// ---------------- STYLES ----------------
const styles = {
  container: { display: "flex", minHeight: "100vh" },
  sidebar: { width: 200, padding: 20, background: "#fff" },
  main: { flex: 1, padding: 30 },
  card: { background: "#fff", padding: 20, marginBottom: 20 },
  book: { padding: 10, background: "#f9fafb", marginBottom: 6 }
};

export default StudentDashboard;
