import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000/api";

export default function AdminAddStore() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await fetch(`${API_BASE}/admin/stores`, {
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

    alert("Store added successfully");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-8 rounded-2xl w-full max-w-lg border border-gray-700"
      >
        <h1 className="text-2xl font-semibold mb-6">Add Store</h1>

        <input
          {...register("name", { required: true })}
          placeholder="Store Name"
          className="input-dark mb-3"
        />

        <input
          {...register("email", { required: true })}
          placeholder="Store Email"
          type="email"
          className="input-dark mb-3"
        />

        <textarea
          {...register("address", { required: true })}
          placeholder="Store Address"
          className="input-dark mb-3 resize-none h-20"
        />

        <input
          {...register("ownerId", { required: true })}
          placeholder="Owner User ID"
          type="number"
          className="input-dark mb-6"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-green-600 py-2 rounded hover:bg-green-700"
          >
            Create Store
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/stores")}
            className="flex-1 bg-gray-700 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
