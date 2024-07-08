'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });
  const [error, setError] = useState<string | string[]>("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const result = await response.json();
        if (result.error) {
          // Check if the error is an array (e.g., validation errors from Zod)
          if (Array.isArray(result.error)) {
            setError(result.error.map((err: any) => err.message));
          } else {
            setError(result.error);
          }
        } else {
          setError("Failed to register");
        }
        return;
      }

      const result = await response.json();
      setSuccess("Registration successful!");
      router.push('/pages/auth/signin');
    } catch (err) {
      setError("Registration failed. Please try again later.");
    }
  };

  return (
    <div
      className="bg-gray-100 flex justify-center items-center min-h-screen"
      data-theme="cupcake"
    >
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Register</h2>
          {error && (
            <div className="alert alert-error">
              {Array.isArray(error) ? (
                <ul>
                  {error.map((err, index) => (
                    <li key={index}>{err}</li>
                  ))}
                </ul>
              ) : (
                <p>{error}</p>
              )}
            </div>
          )}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="confirm password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <div className="flex">
                <label className="label cursor-pointer">
                  <span className="label-text">Customer</span>
                  <input
                    type="radio"
                    name="role"
                    className="radio checked:bg-red-500"
                    value="customer"
                    checked={formData.role === "customer"}
                    onChange={handleChange}
                  />
                </label>
                <label className="label cursor-pointer ml-4">
                  <span className="label-text">Pharmacist</span>
                  <input
                    type="radio"
                    name="role"
                    className="radio checked:bg-blue-500"
                    value="pharmacist"
                    checked={formData.role === "pharmacist"}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
