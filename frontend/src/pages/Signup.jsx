import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        const res = await fetch("http://localhost:5000/api/auth/signup", {
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

        alert("Signup successful");
        reset();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-gray-800 p-6 rounded-xl shadow-lg w-96 text-gray-100"
            >
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Create Account
                </h2>

                <input
                    type="text"
                    placeholder="Full Name"
                    className="input-dark"
                    {...register("name", {
                        required: "Name is required",
                        minLength: { value: 20, message: "Min 20 characters" },
                        maxLength: { value: 60, message: "Max 60 characters" },
                    })}
                />
                {errors.name && <p className="error-text">{errors.name.message}</p>}

                {/* Email */}
                <input
                    type="email"
                    placeholder="Email"
                    className="input-dark"
                    {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="error-text">{errors.email.message}</p>}

                <textarea
                    placeholder="Address"
                    className="input-dark h-20 resize-none"
                    {...register("address", {
                        maxLength: { value: 400, message: "Max 400 characters" },
                    })}
                />
                {errors.address && (
                    <p className="error-text">{errors.address.message}</p>
                )}

                {/* Password */}
                <input
                    type="password"
                    placeholder="Password"
                    className="input-dark"
                    {...register("password", {
                        required: "Password is required",
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/,
                            message: "8–16 chars, uppercase & special char",
                        },
                    })}
                />
                {errors.password && (
                    <p className="error-text">{errors.password.message}</p>
                )}

                <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Register as</p>

                    <div className="grid grid-cols-2 gap-3">
                        <label className="role-card">
                            <input
                                type="radio"
                                value="USER"
                                {...register("role", { required: true })}
                                defaultChecked
                                className="hidden peer"
                            />
                            <div className="role-card-inner peer-checked:border-blue-500 peer-checked:bg-gray-700">
                                <span className="font-medium">Normal User</span>
                            </div>
                        </label>

                        <label className="role-card">
                            <input
                                type="radio"
                                value="OWNER"
                                {...register("role", { required: true })}
                                className="hidden peer"
                            />
                            <div className="role-card-inner peer-checked:border-blue-500 peer-checked:bg-gray-700">
                                <span className="font-medium">Shop Owner</span>
                            </div>
                        </label>
                    </div>

                    {errors.role && (
                        <p className="error-text mt-1">Please select a role</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg font-semibold"
                >
                    Register
                </button>

                <p className="text-sm text-gray-400 text-center mt-4">
                    Already have an account?{" "}
                    <button type="button" onClick={() => navigate("/login")} className="text-blue-400 hover:underline">
                        Login
                    </button>
                </p>
            </form>
        </div>
    );
}
