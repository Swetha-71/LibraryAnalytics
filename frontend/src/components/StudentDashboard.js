import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { 
  getProfile,
  updateProfile,
  getSemesterRecommendations, 
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

  // Load student data
  useEffect(() => {
    if (!user) return;

    // Use the new profiles endpoint (has name/email and is updatable)
    getProfile(user.username)
      .then(res => {
        // helpers return { success: false, message: "Profile not found" } when missing
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
      .catch(err => console.error("Profile error:", err));

    getSemesterRecommendations(user.username)
      .then(res => setRecommended(Array.isArray(res) ? res : []))
      .catch(err => {
        console.error("Recommendations error:", err);
        setRecommended([]);
      });

    getBorrowedBooks(user.username)
      .then(res => setBorrowed(Array.isArray(res) ? res : []))
      .catch(err => {
        console.error("Borrowed books error:", err);
        setBorrowed([]);
      });

    getFines(user.username)
      .then(res => setFine(res?.totalFine || 0))
      .catch(err => {
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

  // Save profile update
  const handleProfileUpdate = async () => {
    try {
      const res = await updateProfile(user.username, profileForm);

      if (res && res.success === false) {
        throw new Error(res.message || 'Update failed');
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
            <p><b>Name:</b> {profile.name}</p>
            <p><b>Branch:</b> {profile.branch}</p>
            <p><b>Semester:</b> {profile.semester}</p>
            <p>
              <b>Subjects:</b>{" "}
              {Array.isArray(profile.subjects) ? profile.subjects.map(s => s.shortName).join(", ") : "N/A"}
            </p>
          </div>
        )}

        <h3>Recommended Books</h3>
        {recommended.length === 0 ? <p>No recommendations</p> : recommended.map(b => (
          <div key={b._id || b.id} style={styles.book}>
            {b.title} – {b.author}
          </div>
        ))}
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
                  setProfileForm({ ...profileForm, semester: e.target.value })
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
              <p><b>Name:</b> {profile.name}</p>
              <p><b>Email:</b> {profile.email}</p>
              <p><b>Branch:</b> {profile.branch}</p>
              <p><b>Semester:</b> {profile.semester}</p>

              <button
                style={styles.button}
                onClick={() => {
                  setProfileForm({
                    name: profile.name || "",
                    email: profile.email || "",
                    branch: profile.branch || "",
                    semester: profile.semester || "",
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
            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
          />
          <input
            style={styles.input}
            value={profileForm.email || ""}
            placeholder="Email"
            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
          />
          <input
            style={styles.input}
            value={profileForm.branch || ""}
            placeholder="Branch"
            onChange={(e) => setProfileForm({ ...profileForm, branch: e.target.value })}
          />
          <input
            style={styles.input}
            value={profileForm.semester || ""}
            placeholder="Semester"
            onChange={(e) => setProfileForm({ ...profileForm, semester: e.target.value })}
          />

          <button style={styles.button} onClick={() => setEditing(true)}>
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
          onChange={e => setSearchText(e.target.value)}
          style={styles.input}
        />
        {loadingSearch && <p>Searching...</p>}
        {searchResult.length === 0 && searchText && !loadingSearch && <p>No books found</p>}
        {searchResult.map(b => (
          <div key={b._id || b.id} style={styles.book}>
            {b.title} – {b.author}{" "}
            <button
              style={{ marginLeft: 10, padding: "4px 8px", cursor: "pointer" }}
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
        {borrowed.length === 0 ? <p>No borrowed books</p> : borrowed.map(b => (
          <div key={b._id || b.id} style={styles.book}>
            {b.title} | Due: {b.dueDate}
          </div>
        ))}
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

  function menu(key, label) {
    return (
      <div
        onClick={() => setPage(key)}
        style={{
          padding: 10,
          cursor: "pointer",
          background: page === key ? "#2563eb" : "transparent",
          color: page === key ? "#fff" : "#ddd"
        }}
      >
        {label}
      </div>
    );
  }
};

// ---------------- Styles ----------------
const styles = {
  container: { display: "flex", minHeight: "100vh" },
  sidebar: { width: 220, background: "#1e3a8a", color: "#fff", padding: 16 },
  main: { flex: 1, padding: 24, background: "#f4f6fa" },
  card: { background: "#fff", padding: 16, marginBottom: 20 },
  book: { background: "#fff", padding: 10, marginBottom: 8, borderRadius: 4 },
  input: { width: "100%", padding: 8, fontSize: 16, borderRadius: 4, border: "1px solid #ccc", marginBottom: 10 },
  button: { padding: "8px 16px", marginRight: 8, background: "#2563eb", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" },
  buttonCancel: { padding: "8px 16px", background: "#aaa", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }
};

export default StudentDashboard;
