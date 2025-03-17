"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU";

    if (res.ok) {
      localStorage.setItem("jwtToken", token);
      toast.success("Login success")
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
<div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
  >
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

    {/* Email Input */}
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">Email</label>
      <input
        name="email"
        type="email"
        placeholder="Enter your email"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        onChange={handleChange}
        required
      />
    </div>

    {/* Password Input */}
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">Password</label>
      <input
        name="password"
        type="password"
        placeholder="Enter your password"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        onChange={handleChange}
        required
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg transition hover:bg-blue-700"
    >
      Login
    </button>

    {/* Extra Options */}
    <p className="text-center text-gray-600 text-sm mt-4">
      Don&apos;t have an account?{" "}
      <a href="/register" className="text-blue-600 font-semibold hover:underline">
        Sign Up
      </a>
    </p>
  </form>
</div>


  );
}
