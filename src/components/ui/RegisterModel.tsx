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
    <div className="bg-[#EEEEEE] text-white p-5  rounded-2xl shadow-lg  relative">
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-5 text-gray-400 hover:text-black cursor-pointer text-xl font-bold transition-colors"
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
        <div className="sm:h-[350px]  sm:w-[500px] w-[300px]">
          <h2 className="text-2xl text-black font-bold text-center mb-1">Create Account</h2>
          <p className="text-gray-700 sm:text-[13px] text-[8px] text-center mb-6">
            Join Kerago and start booking amazing hotels
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid sm:grid-cols-2 grid-col-1 gap-2 ">
              <div>
                <label className="block text-sm text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={userRegister.username}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md text-[13px] border-gray-600 bg-gray-300 px-3 py-2 text-black focus:ring-1 focus:ring-gray-500 focus:outline-none"
                  required
                  placeholder="enter your name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userRegister.email}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md text-[13px] border-gray-600 bg-gray-300 px-3 py-2 text-black focus:ring-1 focus:ring-gray-500 focus:outline-none"
                  required
                  placeholder="enter your mail"
                />
              </div>

            </div>

            <div className="grid sm:grid-cols-2 grid-col-1 gap-2 mb-8">
              <div>
                <label className="block text-sm text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={userRegister.phone}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md text-[13px] border-gray-600 bg-gray-300 px-3 py-2 text-black focus:ring-1 focus:ring-gray-500 focus:outline-none"
                  required
                  placeholder="enter your mobile number"
                />
              </div>

              <div className="relative">
                <label className="block text-sm text-gray-700">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userRegister.password}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md text-[13px] border-gray-600 bg-gray-300 px-3 py-2 text-black focus:ring-1 focus:ring-gray-500 focus:outline-none"
                  required
                  placeholder="enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-[#777C6D] hover:bg-[#444640] py-2 rounded-md font-semibold transition-colors"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-gray-700 mt-6 text-[13px]">
            Already have an account?{" "}
            <button
              onClick={onClose}
              className="text-blue-900 hover:underline font-semibold cursor-pointer"
            >
              Login
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
