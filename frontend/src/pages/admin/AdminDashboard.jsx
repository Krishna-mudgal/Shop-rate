import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../../components/StatCard";
import UpdatePasswordModal from "../../components/UserPasswordModal";

const API_BASE = "http://localhost:5000/api";

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            const res = await fetch(`${API_BASE}/admin/dashboard`, {
                credentials: "include",
            });

            if (!res.ok) {
                navigate("/login");
                return;
            }

            const data = await res.json();
            setStats(data);
        };

        fetchStats();
    }, []);

    if (!stats) {
        return (
            <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
                Loading dashboard...
            </div>
        );
    }

    const handleLogout = async () => {
        await fetch(`${API_BASE}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6 relative">
            {/* Top-right actions */}
            <div className="absolute top-6 right-6 flex gap-3">
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

            <h1 className="text-2xl font-semibold mb-6">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard title="Total Users" value={stats.totalUsers} />
                <StatCard title="Total Stores" value={stats.totalStores} />
                <StatCard title="Total Ratings" value={stats.totalRatings} />
            </div>

            <div className="mt-8 flex justify-center">
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={() => navigate("/admin/stores")}
                        className="bg-blue-600 px-5 py-2 rounded hover:bg-blue-700"
                    >
                        View Stores
                    </button>

                    <button
                        onClick={() => navigate("/admin/users")}
                        className="bg-green-600 px-5 py-2 rounded hover:bg-green-700"
                    >
                        View Users
                    </button>

                    <button
                        onClick={() => navigate("/admin/add-user")}
                        className="bg-purple-600 px-5 py-2 rounded hover:bg-purple-700"
                    >
                        Add User
                    </button>

                    <button
                        onClick={() => navigate("/admin/add-store")}
                        className="bg-green-600 px-5 py-2 rounded hover:bg-green-700"
                    >
                        Add Store
                    </button>
                </div>
            </div>

            {showPasswordModal && (
                <UpdatePasswordModal onClose={() => setShowPasswordModal(false)} />
            )}
        </div>

    );
}
