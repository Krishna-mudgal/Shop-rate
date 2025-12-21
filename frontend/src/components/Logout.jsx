import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000/api";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
}
