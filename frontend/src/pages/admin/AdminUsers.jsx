import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
  });

  const navigate = useNavigate();

  const fetchUsers = async () => {
    const params = new URLSearchParams(filters);
    const res = await fetch(
      `${API_BASE}/admin/users?${params.toString()}`,
      { credentials: "include" }
    );
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {Object.keys(filters).map((key) => (
          <input
            key={key}
            placeholder={`Filter by ${key}`}
            value={filters[key]}
            onChange={(e) =>
              setFilters({ ...filters, [key]: e.target.value })
            }
            className="input-dark"
          />
        ))}
      </div>

      <button
        onClick={fetchUsers}
        className="bg-blue-600 px-4 py-2 rounded mb-6"
      >
        Apply Filters
      </button>

      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-gray-700">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">
                  <button
                    onClick={() =>
                      navigate(`/admin/users/${u.id}`)
                    }
                    className="text-blue-400 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
