import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleRegister = async () => {
    try {
      await api.post("/users/register", {
        email: email,
        password: password,
      });

      alert("Registration successful. Please login.");
    } catch (err) {
      alert("Registration failed");
      console.error(err);
    }
  };

  return (
    <div className="login-container">

      {/* LEFT REGISTER CARD */}
      <div className="login-card">
        <h2>Create Account</h2>

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

        <button onClick={handleRegister}>
          Register
        </button>
        <p className="register-text">
          Already have an account?
          <span onClick={() => navigate("/")}> Login</span>
        </p>
      </div>

      {/* RIGHT SIDE PANEL */}
      <div className="login-visual">
        <h1>Start Your Journey</h1>
        <p>Build Skills. Get Ready. Get Hired.</p>
      </div>

    </div>
  );

}
