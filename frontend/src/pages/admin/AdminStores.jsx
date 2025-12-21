import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api";

export default function AdminStores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      const res = await fetch(`${API_BASE}/admin/stores`, {
        credentials: "include",
      });
      const data = await res.json();
      setStores(data);
    };

    fetchStores();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-6">Stores</h1>

      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Address</th>
              <th className="p-3">Rating</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((s) => (
              <tr
                key={s.id}
                className="border-t border-gray-700"
              >
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.email}</td>
                <td className="p-3">{s.address}</td>
                <td className="p-3">
                  {s.averageRating
                    ? Number(s.averageRating).toFixed(1)
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
