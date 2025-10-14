"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { authService } from "@/service/authService";

export interface RegisterForm {
  username: string;
  email: string;
  phone: string;
  password: string;
}

interface RegisterProps {
  onClose: () => void;
}

export default function Register({ onClose }: RegisterProps) {
  const [userRegister, setFormData] = useState<RegisterForm>({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...userRegister, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.register(userRegister);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg w-[400px] relative">
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl font-bold transition-colors"
        aria-label="Close"
      >
        ✖
      </button>

      {success ? (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Registration Successful 🎉</h2>
          <p className="text-gray-300 mb-4">Please login to continue.</p>
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold"
          >
            Continue
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>
          <p className="text-gray-400 text-center mb-6">
            Join Kerago and start booking amazing hotels
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300">Username</label>
              <input
                type="text"
                name="username"
                value={userRegister.username}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-gray-600 bg-slate-800 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={userRegister.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-gray-600 bg-slate-800 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300">Phone</label>
              <input
                type="tel"
                name="phone"
                value={userRegister.phone}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-gray-600 bg-slate-800 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm text-gray-300">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={userRegister.password}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-gray-600 bg-slate-800 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md font-semibold transition-colors"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-gray-300 mt-6">
            Already have an account?{" "}
            <button
              onClick={onClose}
              className="text-blue-400 hover:underline font-semibold"
            >
              Login
            </button>
          </p>
        </>
      )}
    </div>
  );
}
