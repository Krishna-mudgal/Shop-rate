import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000/api";

export default function AdminAddUser() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await fetch(`${API_BASE}/admin/users`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.message);
      return;
    }

    alert("User created successfully");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-8 rounded-2xl w-full max-w-lg border border-gray-700"
      >
        <h1 className="text-2xl font-semibold mb-6">Add User</h1>

        <input
          {...register("name", { required: true })}
          placeholder="Full Name"
          className="input-dark mb-3"
        />

        <input
          {...register("email", { required: true })}
          placeholder="Email"
          type="email"
          className="input-dark mb-3"
        />

        <input
          {...register("password", { required: true })}
          placeholder="Password"
          type="password"
          className="input-dark mb-3"
        />

        <textarea
          {...register("address")}
          placeholder="Address"
          className="input-dark mb-3 resize-none h-20"
        />

        <select
          {...register("role", { required: true })}
          className="input-dark mb-6"
        >
          <option value="">Select Role</option>
          <option value="USER">Normal User</option>
          <option value="OWNER">Store Owner</option>
          <option value="ADMIN">Admin</option>
        </select>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-600 py-2 rounded hover:bg-blue-700"
          >
            Create User
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/users")}
            className="flex-1 bg-gray-700 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
