import { useEffect, useState } from "react";
import api from "../services/api";
import "./Dashboard.css";


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
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>

      {/* STATUS */}
      {loading && <p>Loading dashboard...</p>}
      {error && <p className="error">{error}</p>}

      {/* ROLE SELECT */}
      <div className="role-bar">
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option>Python Developer</option>
          <option>Data Analyst</option>
        </select>
        <button onClick={loadDashboard}>Refresh</button>
      </div>

      {data && (
        <>
          {/* READINESS SCORE */}
          <div className="score-card">
            <h3>Role Readiness Score</h3>
            <h1>{data.role_readiness_score}%</h1>
          </div>

          {/* ASSESSMENT */}
          <div className="section">
            <h3>Assessment Scores</h3>

            {data.assessment_scores.length === 0 && (
              <p>Please complete assessment to see scores.</p>
            )}

            <div className="card-grid">
              {data.assessment_scores.map((item) => (
                <div className="mini-card" key={item.skill}>
                  <p>{item.skill}</p>
                  <strong>{item.score}%</strong>
                </div>
              ))}
            </div>
          </div>

          {/* RESUME SKILLS */}
          <div className="section">
            <h3>Resume Skills</h3>

            {data.resume_skills.length === 0 && (
              <p>Please upload your resume.</p>
            )}

            <div className="skill-tags">
              {data.resume_skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>

          {/* SKILL GAPS */}
          <div className="section">
            <h3>Skill Gaps & Guidance</h3>

            {data.skill_gaps.length === 0 && (
              <p>No major skill gaps 🎉</p>
            )}

            {data.skill_gaps.map((gap) => (
              <div className="gap-card" key={gap.skill}>
                <h4>{gap.skill}</h4>
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
        </>
      )}

      {/* ACTION BUTTONS */}
      <div className="action-buttons">
        <button onClick={() => window.location.href = "/assessment"}>
          Take Assessment
        </button>

        <button onClick={() => window.location.href = "/resume"}>
          Upload Resume
        </button>
      </div>

    </div>
  );

}
