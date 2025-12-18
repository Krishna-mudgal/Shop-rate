import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RatingTable from "../../components/RatingTable";
import UpdatePasswordModal from "../../components/UserPasswordModal";

export default function OwnerHomePage() {
  const navigate = useNavigate();

  const [avgRating, setAvgRating] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const API_BASE = "http://localhost:5000/api";

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await fetch(`${API_BASE}/owner/dashboard`, {
        credentials: "include",
      });

      if (!res.ok) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      setAvgRating(data.averageRating);
      setRatings(data.ratings);
    };

    fetchDashboard();
  }, []);

  const handleLogout = async () => {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Owner Dashboard</h1>

        <div className="flex gap-3">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
          >
            Update Password
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Average Rating Card */}
      <div className="bg-gray-800 p-6 rounded-xl mb-6">
        <p className="text-sm text-gray-400">Average Store Rating</p>
        <h2 className="text-4xl font-bold mt-2">
          {avgRating !== null ? avgRating.toFixed(1) : "—"}
          <span className="text-lg text-gray-400"> / 5</span>
        </h2>
      </div>

      {/* Ratings Table */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">
          Users Who Rated Your Store
        </h2>

        <RatingTable ratings={ratings} />
      </div>

      {/* Update Password Modal */}
      {showPasswordModal && (
        <UpdatePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </div>
  );
}
