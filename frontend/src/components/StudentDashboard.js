import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getProfile,
  updateProfile,
  getSemesterRecommendations,
  getFriendsRecommendations, // <-- this must be here
  searchBooks,
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
  const [recommended, setRecommended] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [borrowed, setBorrowed] = useState([]);
  const [fine, setFine] = useState(0);
  const [loadingSearch, setLoadingSearch] = useState(false);
const [friendsRecommended, setFriendsRecommended] = useState([]);

  // Load student data
  useEffect(() => {
    if (!user) return;

    getProfile(user.username)
      .then((res) => {
        if (res && res.success === false) {
          setProfile(null);
          setProfileForm({ name: "", email: "", branch: "", semester: "" });
        } else if (res) {
          setProfile(res);
          setProfileForm({
            name: res.name || "",
            email: res.email || "",
            branch: res.branch || "",
            semester: res.semester || ""
          });
        }
      })
      .catch((err) => console.error("Profile error:", err));

    getSemesterRecommendations(user.username)
      .then((res) => setRecommended(Array.isArray(res) ? res : []))
      .catch((err) => {
        console.error("Recommendations error:", err);
        setRecommended([]);
      });
getFriendsRecommendations(user.username)
  .then(borrows => setFriendsRecommended(Array.isArray(borrows) ? borrows : []))
  .catch(err => {
    console.error("Friends recommendations error:", err);
    setFriendsRecommended([]);
  });


    getBorrowedBooks(user.username)
      .then((res) => setBorrowed(Array.isArray(res) ? res : []))
      .catch((err) => {
        console.error("Borrowed books error:", err);
        setBorrowed([]);
      });

    getFines(user.username)
      .then((res) => setFine(res?.totalFine || 0))
      .catch((err) => {
        console.error("Fines error:", err);
        setFine(0);
      });
  }, [user]);

  // Live search
  useEffect(() => {
    if (!searchText) {
      setSearchResult([]);
      return;
    }

    const debounce = setTimeout(async () => {
      setLoadingSearch(true);
      try {
        const res = await searchBooks(searchText);
        setSearchResult(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error("Search error", err);
        setSearchResult([]);
      }
      setLoadingSearch(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchText]);

  // Save profile update (create or update)
  const handleProfileUpdate = async () => {
    try {
      const res = await updateProfile(user.username, profileForm);

      if (res && res.success === false) {
        throw new Error(res.message || "Update failed");
      }

      setProfile(res);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update profile error:", err);
      alert("Failed to update profile. Check console.");
    }
  };

  if (!user) return <p>Please login</p>;

  function menu(key, label) {
  const active = page === key;
  return (
    <div
      onClick={() => setPage(key)}
      style={{
        padding: 10,
        cursor: "pointer",
        marginBottom: 8,
        borderRadius: 999,
        background: active
          ? "linear-gradient(135deg,#1d4ed8,#0f766e)"
          : "transparent",
        color: active ? "#ffffff" : "#111827",   // darker for inactive
        fontSize: 14,
        letterSpacing: "0.05em",
        textTransform: "uppercase"
      }}
    >
      {label}
    </div>
  );
}

  // ---------------- UI ----------------
  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h3>📚 Library</h3>
        {menu("dashboard", "Dashboard")}
        {menu("profile", "Profile")}
        {menu("search", "Search Books")}
        {menu("borrowed", "Borrowed")}
        {menu("fines", "Fines")}
        {menu("logout", "Logout")}
      </div>

      <div style={styles.main}>
        {page === "dashboard" && dashboard()}
        {page === "profile" && profilePage()}
        {page === "search" && searchPage()}
        {page === "borrowed" && borrowedPage()}
        {page === "fines" && finesPage()}
      </div>
    </div>
  );

  // ---------------- Pages ----------------
  function dashboard() {
    return (
      <>
        <h2>Dashboard</h2>
        {profile && (
          <div style={styles.card}>
            <p>
              <b>Name:</b> {profile.name}
            </p>
            <p>
              <b>Branch:</b> {profile.branch}
            </p>
            <p>
              <b>Semester:</b> {profile.semester}
            </p>
            <p>
              <b>Subjects:</b>{" "}
              {Array.isArray(profile.subjects)
                ? profile.subjects.map((s) => s.shortName).join(", ")
                : "N/A"}
            </p>
          </div>
        )}

        <h3>Recommended Books</h3>
{/* existing semester-based recommendations */}

<h3>What your friends are reading</h3>
{friendsRecommended.length === 0 ? (
  <p>No data yet</p>
) : (
  friendsRecommended.map(b => (
    <div key={b.id || `${b.studentId}-${b.bookTitle}-${b.borrowDate}`}>
      {b.bookTitle} (borrowed by {b.studentId})
    </div>
  ))
)}


      </>
    );
  }

  function profilePage() {
    return (
      <>
        <h2>My Profile</h2>

        {profile ? (
          <div style={styles.card}>
            {editing ? (
              <>
                <input
                  style={styles.input}
                  value={profileForm.name || ""}
                  placeholder="Name"
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, name: e.target.value })
                  }
                />
                <input
                  style={styles.input}
                  value={profileForm.email || ""}
                  placeholder="Email"
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, email: e.target.value })
                  }
                />
                <input
                  style={styles.input}
                  value={profileForm.branch || ""}
                  placeholder="Branch"
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, branch: e.target.value })
                  }
                />
                <input
                  style={styles.input}
                  value={profileForm.semester || ""}
                  placeholder="Semester"
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      semester: e.target.value
                    })
                  }
                />

                <button style={styles.button} onClick={handleProfileUpdate}>
                  Save
                </button>
                <button
                  style={styles.buttonCancel}
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p>
                  <b>Name:</b> {profile.name}
                </p>
                <p>
                  <b>Email:</b> {profile.email}
                </p>
                <p>
                  <b>Branch:</b> {profile.branch}
                </p>
                <p>
                  <b>Semester:</b> {profile.semester}
                </p>

                <button
                  style={styles.button}
                  onClick={() => {
                    setProfileForm({
                      name: profile.name || "",
                      email: profile.email || "",
                      branch: profile.branch || "",
                      semester: profile.semester || ""
                    });
                    setEditing(true);
                  }}
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        ) : (
          <div style={styles.card}>
            <p>No profile data</p>

            <input
              style={styles.input}
              value={profileForm.name || ""}
              placeholder="Name"
              onChange={(e) =>
                setProfileForm({ ...profileForm, name: e.target.value })
              }
            />
            <input
              style={styles.input}
              value={profileForm.email || ""}
              placeholder="Email"
              onChange={(e) =>
                setProfileForm({ ...profileForm, email: e.target.value })
              }
            />
            <input
              style={styles.input}
              value={profileForm.branch || ""}
              placeholder="Branch"
              onChange={(e) =>
                setProfileForm({ ...profileForm, branch: e.target.value })
              }
            />
            <input
              style={styles.input}
              value={profileForm.semester || ""}
              placeholder="Semester"
              onChange={(e) =>
                setProfileForm({ ...profileForm, semester: e.target.value })
              }
            />

            <button style={styles.button} onClick={handleProfileUpdate}>
              Create Profile
            </button>
          </div>
        )}
      </>
    );
  }

  function searchPage() {
    const borrowBook = async (bookId) => {
      try {
        await api.post(`/borrow/${bookId}/${user.username}`);
        alert("Book borrowed successfully!");
      } catch (err) {
        console.error("Borrow error:", err);
        alert("Failed to borrow book");
      }
    };

    return (
      <>
        <h2>Search Books</h2>
        <input
          placeholder="Enter title / author"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={styles.input}
        />
        {loadingSearch && <p>Searching...</p>}
        {searchResult.length === 0 && searchText && !loadingSearch && (
          <p>No books found</p>
        )}
        {searchResult.map((b) => (
          <div key={b._id || b.id} style={styles.book}>
            {b.title} – {b.author}{" "}
            <button
              style={{
                marginLeft: 10,
                padding: "4px 8px",
                cursor: "pointer"
              }}
              onClick={() => borrowBook(b._id || b.id)}
            >
              Borrow
            </button>
          </div>
        ))}
      </>
    );
  }

  function borrowedPage() {
    return (
      <>
        <h2>Borrowed Books</h2>
        {borrowed.length === 0 ? (
          <p>No borrowed books</p>
        ) : (
          borrowed.map((b) => (
            <div key={b._id || b.id} style={styles.book}>
              {b.title} | Due: {b.dueDate}
            </div>
          ))
        )}
      </>
    );
  }

  function finesPage() {
    return (
      <>
        <h2>Total Fine</h2>
        <h3>₹ {fine}</h3>
      </>
    );
  }
};

// ---------------- Styles ----------------
const styles = {
  container: {
  display: "flex",
  minHeight: "100vh",
  background:
    "linear-gradient(135deg, #fdfcfb 0%, #e2d1f9 40%, #cfd9df 100%)"
},
  sidebar: {
  width: 230,
  background: "#ffffff",
  color: "#111827",
  padding: 20,
  borderRight: "1px solid #d1d5db",
  boxShadow: "0 0 25px rgba(15,23,42,0.06)"
},

  main: {
  flex: 1,
  padding: 32,
  background: "transparent"
},
  card: {
    background: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    color: "#111827",
    boxShadow: "0 12px 30px rgba(15,23,42,0.12)",
    border: "1px solid #e5e7eb"
  },
  book: {
    background: "#ffffff",
    padding: 12,
    marginBottom: 8,
    borderRadius: 10,
    color: "#111827",
    border: "1px solid #e5e7eb"
  },
  input: {
    width: "100%",
    padding: 10,
    fontSize: 15,
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    marginBottom: 12,
    background: "#f9fafb",
    color: "#111827"
  },
  button: {
    padding: "9px 18px",
    marginRight: 8,
    background: "linear-gradient(135deg,#1d4ed8,#0f766e)",
    color: "#f9fafb",
    border: "none",
    borderRadius: 999,
    cursor: "pointer",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: 600
  },
  buttonCancel: {
    padding: "9px 18px",
    background: "#9ca3af",
    color: "#f9fafb",
    border: "none",
    borderRadius: 999,
    cursor: "pointer",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: 500
  }
};

export default StudentDashboard;
