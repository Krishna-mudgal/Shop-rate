import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message);
            return;
        }

        const role = data.user.role;

        if (role === "ADMIN") {
            navigate("/admin");
        } else if (role === "OWNER") {
            navigate("/owner");
        } else {
            navigate("/user");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-gray-800 p-6 rounded-xl shadow-lg w-96 text-gray-100"
            >
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Welcome Back
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="input-dark"
                    {...register("email", {
                        required: "Email is required",
                    })}
                />
                {errors.email && (
                    <p className="error-text">{errors.email.message}</p>
                )}

                <input
                    type="password"
                    placeholder="Password"
                    className="input-dark"
                    {...register("password", {
                        required: "Password is required",
                    })}
                />
                {errors.password && (
                    <p className="error-text">{errors.password.message}</p>
                )}

                <button
                    type="submit"
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg font-semibold"
                >
                    Login
                </button>

                <p className="text-sm text-gray-400 text-center mt-4">
                    Don’t have an account?{" "}
                    <button type="button" onClick={() => navigate("/signup")} className="text-blue-400 hover:underline">
                        Sign up
                    </button>
                </p>
            </form>
        </div>
    );
}
