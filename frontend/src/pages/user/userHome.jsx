import { useEffect, useState } from "react";
import StoreCard from "../../components/StoreCard";
import UpdatePasswordModal from "../../components/UserPasswordModal";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000/api";

const UserHome = () => {
    const [stores, setStores] = useState([]);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const navigate = useNavigate();

    const fetchStores = async () => {
        setLoading(true);

        const res = await fetch(
            `${API_BASE}/user/stores?name=${name}&address=${address}`,
            {
                credentials: "include",
            }
        );

        const data = await res.json();
        if (!Array.isArray(data)) {
        console.error("Expected array, got:", data);
        setStores([]); // fallback
    } else {
        setStores(data);
    }
        setLoading(false);
    };

    useEffect(() => {
        fetchStores();
    }, []);

    const handleLogout = async () => {
        await fetch(`${API_BASE}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        navigate("/login");
    };

    const submitRating = async (storeId, rating) => {
        const res = await fetch(`${API_BASE}/ratings/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ storeId, rating }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message);
            return;
        }

        // Refresh stores to reflect updated rating
        fetchStores();
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
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

            <h1 className="text-2xl font-semibold mb-6">Stores</h1>

            {/* Search */}
            <div className="flex gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-dark"
                />

                <input
                    type="text"
                    placeholder="Search by address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input-dark"
                />

                <button
                    onClick={fetchStores}
                    className="bg-blue-600 px-4 rounded hover:bg-blue-700"
                >
                    Search
                </button>
            </div>

            {/* Store List */}
            {loading ? (
                <p className="text-gray-400">Loading stores...</p>
            ) : stores.length === 0 ? (
                <p className="text-gray-400">No stores found</p>
            ) : (
                <div className="grid gap-4">
                    {stores.map((store) => (
                        <StoreCard
                            key={store.id}
                            store={store}
                            onRate={submitRating}
                        />
                    ))}
                </div>
            )}

            {showPasswordModal && (
                <UpdatePasswordModal onClose={() => setShowPasswordModal(false)} />
            )}
        </div>
    );
}

export default UserHome
