import { useState } from "react";
import api, { setAuthToken } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Login.css";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("username", email); // backend expects "username"
      formData.append("password", password);

      const res = await api.post("/users/login", formData);

      localStorage.setItem("token", res.data.access_token);

      window.location.href = "/dashboard";
    } catch (err) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      {/* LEFT LOGIN CARD */}
      <div className="login-card">
        <h2>Welcome Back</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="register-text">
          Don’t have an account?
          <span onClick={() => navigate("/register")}> Register/Create account</span>
        </p>
      </div>

      {/* RIGHT SIDE PANEL */}
      <div className="login-visual">
        <h1>Unlock Your Potential</h1>
        <p>AI-Driven Skill Pathways</p>
      </div>

    </div>
  );

}
