import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getStudentProfile, getSemesterRecommendations } from "../services/api";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
  if (!user) return;
  getStudentProfile(user.username)
    .then((data) => {
      if (data.success) setProfile(data);
      else setProfile(null);
    })
    .catch((err) => {
      console.error("Profile load failed", err);
      setProfile(null);
    });
}, [user]);

  if (!user) return <div>Please log in.</div>;

  return (
    <div style={{ padding: "24px" }}>
      <h2>Your Library Activity</h2>

      {profile ? (
        <>
          <p>
            Branch: <b>{profile.branch}</b> | Semester:{" "}
            <b>{profile.semester}</b>
          </p>
          <p>
  Subjects this semester:{" "}
  {profile.subjects && profile.subjects.length > 0
    ? profile.subjects.map((s) => s.shortName).join(", ")
    : "Not set yet"}
</p>

        </>
      ) : (
        <p>No profile yet. Ask librarian/admin to set your branch & semester.</p>
      )}

      <h3>Recommended Books for Your Semester</h3>
      {recommended.length === 0 ? (
        <p>No recommendations yet.</p>
      ) : (
        <ul>
          {recommended.map(b => (
            <li key={b.id || b._id}>
              {b.title} – {b.author}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentDashboard;
