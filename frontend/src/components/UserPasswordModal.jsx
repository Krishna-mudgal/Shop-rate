import { useForm } from "react-hook-form";

export default function UpdatePasswordModal({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const API_BASE = "http://localhost:5000/api";

  const onSubmit = async (data) => {
    const res = await fetch(`${API_BASE}/auth/update-password`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      alert("Failed to update password");
      return;
    }

    alert("Password updated successfully");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-6 rounded-xl w-96"
      >
        <h2 className="text-xl font-semibold mb-4">
          Update Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          className="input-dark"
          {...register("newPassword", {
            required: true,
            pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/,
          })}
        />
        {errors.newPassword && (
          <p className="error-text">
            Invalid password format
          </p>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
