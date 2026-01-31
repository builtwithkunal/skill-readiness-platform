import api, { setAuthToken } from "../services/api";

export default function Dashboard() {
  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
