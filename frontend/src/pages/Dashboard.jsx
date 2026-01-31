import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [role, setRole] = useState("Python Developer");
  const [data, setData] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const loadDashboard = async () => {
    try {
      const res = await api.get(`/dashboard/${role}`);
      setData(res.data);
    } catch (err) {
      alert("Unable to load dashboard");
      console.error(err);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

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
          <ul>
            {data.assessment_scores.map((item) => (
              <li key={item.skill}>
                {item.skill}: {item.score}%
              </li>
            ))}
          </ul>

          <h3>Resume Skills</h3>
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
