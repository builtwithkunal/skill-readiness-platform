import { setAuthToken } from "../services/api";

export default function Dashboard() {
  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <button onClick={() => window.location.href = "/assessment"}>
        Take Assessment
      </button>

      <br /><br />

      <button onClick={logout}>Logout</button>
    </div>
  );
}
