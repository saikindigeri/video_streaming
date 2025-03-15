"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setLoading(false);

    if (res.ok) {
      alert("Registration successful");
      router.push("/login");
    } else {
      alert("Error registering");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br  p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md transition-transform transform">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg transition hover:bg-blue-700 active:scale-95"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
