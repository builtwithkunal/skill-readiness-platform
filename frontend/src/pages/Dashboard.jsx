import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [role, setRole] = useState("Python Developer");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get(`/dashboard/${role}`);
      setData({
       role_readiness_score: res.data.role_readiness_score ?? 0,
       assessment_scores: res.data.assessment_scores ?? [],
       resume_skills: res.data.resume_skills ?? [],
       skill_gaps: res.data.skill_gaps ?? [],
      });

    } catch (err) {
      setError("Unable to load dashboard data");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      {loading && <p>Loading dashboard...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && !data && <p>No dashboard data yet.</p>}



      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option>Python Developer</option>
        <option>Data Analyst</option>
      </select>

      <button onClick={loadDashboard}>Refresh</button>

      {data && (
        <div>
          <h3>Role Readiness Score</h3>
          <h1>{data.role_readiness_score}%</h1>

          <h3>Assessment Scores</h3>
          {data.assessment_scores.length === 0 && (
            <p>Please complete assessment to see scores.</p>
          )}
          <ul>
            {data.assessment_scores.map((item) => (
              <li key={item.skill}>
                {item.skill}: {item.score}%
              </li>
            ))}
          </ul>

          <h3>Resume Skills</h3>
          {data.resume_skills.length === 0 && (
            <p>Please upload your resume.</p>
          )}
          <ul>
            {data.resume_skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>

          <h3>Skill Gaps & Guidance</h3>

          {data.skill_gaps.length === 0 && (
            <p>No major skill gaps 🎉</p>
          )}

          {data.skill_gaps.map((gap) => (
            <div key={gap.skill}>
              <strong>{gap.skill}</strong>
              <p>Current: {gap.current_score}%</p>
              <p>Required: {gap.required_score}%</p>
              <ul>
                <li>{gap.guidance.study}</li>
                <li>{gap.guidance.practice}</li>
                <li>{gap.guidance.project}</li>
              </ul>
            </div>
          ))}
        </div>
      )}

      <hr />

      <button onClick={() => window.location.href = "/assessment"}>
        Take Assessment
      </button>

      <button onClick={() => window.location.href = "/resume"}>
        Upload Resume
      </button>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
