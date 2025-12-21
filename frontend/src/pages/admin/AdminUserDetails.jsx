import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000/api";

function Detail({ label, value }) {
    return (
        <div className="mb-3">
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-lg">{value}</p>
        </div>
    );
}


export default function AdminUserDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const res = await fetch(`${API_BASE}/admin/users/${id}`, {
                credentials: "include",
            });

            if (!res.ok) {
                navigate("/admin/users");
                return;
            }

            const result = await res.json();
            setData(result);
            setLoading(false);
        };

        fetchUserDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
                Loading user details...
            </div>
        );
    }

    const { user, averageRating } = data;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 relative">
            <button
                onClick={() => navigate("/admin/users")}
                className="absolute top-6 left-6 flex items-center gap-2 text-blue-400 hover:underline"
            >
                ← Back to Users
            </button>

            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="w-full max-w-xl">
                    <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
                        <div className="mb-6 border-b border-gray-700 pb-4">
                            <h1 className="text-2xl font-semibold">User Details</h1>
                            <p className="text-sm text-gray-400 mt-1">
                                Detailed information about this account
                            </p>
                        </div>

                        <div className="grid gap-4">
                            <Detail label="Name" value={user.name} />
                            <Detail label="Email" value={user.email} />
                            <Detail label="Address" value={user.address || "—"} />

                            <div>
                                <p className="text-sm text-gray-400">Role</p>
                                <span
                                    className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium
                  ${user.role === "ADMIN"
                                            ? "bg-purple-600/20 text-purple-400"
                                            : user.role === "OWNER"
                                                ? "bg-green-600/20 text-green-400"
                                                : "bg-blue-600/20 text-blue-400"
                                        }`}
                                >
                                    {user.role}
                                </span>
                            </div>
                        </div>

                        {user.role === "OWNER" && (
                            <div className="mt-8 p-4 rounded-xl bg-gray-900 border border-gray-700">
                                <p className="text-sm text-gray-400 mb-1">
                                    Store Average Rating
                                </p>

                                <div className="flex items-center gap-2">
                                    <span className="text-3xl font-bold">
                                        {averageRating
                                            ? Number(averageRating).toFixed(1)
                                            : "—"}
                                    </span>
                                    <span className="text-gray-400">/ 5</span>
                                </div>

                                {!averageRating && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        No ratings submitted yet
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

}
