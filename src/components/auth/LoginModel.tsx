
"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { authService } from "@/service/authService";
import { useRouter } from "next/navigation";
import Loading from "../Loading";

interface LoginResponse {
  token: string;
  role: "ROLE_ADMIN" | "ROLE_USER";
}

interface LoginProps {
  onOpenRegister: () => void;
  onClose: () => void;
}

export default function Login({ onOpenRegister, onClose }: LoginProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);
  

  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res: LoginResponse = await authService.login(username, password);
      
      // Store tokens
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);

      onClose(); // Close modal

      // Redirect based on role
      if (res.role === "ROLE_ADMIN") {
       
        router.replace("/admin/dashboard");
      } else {
       
        router.replace("/client/");
      }
    } catch (err: unknown) {
      setError("Invalid username or password. Please try again.");
      console.log(err);
      
    }finally{
      setLoading(false)
    }
  };

  return (
    <>
    <Loading loading={loading}/>
    <div className="bg-[#EEEEEE] shadow-lg text-white p-10 rounded-2xl w-[350px] relative">
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-5 text-gray-400 hover:text-black cursor-pointer text-xl font-bold transition-colors"
        aria-label="Close"
      >
        ✖
      </button>

      <h2 className="text-2xl font-bold text-black text-center mb-1">Welcome Back</h2>
      <p className="text-gray-700 text-center mb-6 text-[12px]">
        Login to continue booking hotels
      </p>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full text-[12px] rounded-md border-gray-600 bg-gray-300 px-3 py-2 text-black focus:ring-1 focus:ring-gray-500 focus:outline-none"
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="relative mb-8">
          <label className="block text-sm text-gray-700">Password</label>
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full text-[12px] rounded-md border-gray-600 bg-gray-300 px-3 py-2 text-black focus:ring-1 focus:ring-gray-500 focus:outline-none"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPass((prev) => !prev)}
            className="absolute right-3 top-8 text-gray-400 cursor-pointer transition-colors"
            aria-label={showPass ? "Hide password" : "Show password"}
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#777C6D] hover:bg-[#444640] py-2 rounded-md font-semibold transition-colors cursor-pointer"
        >
          Login
        </button>
      </form>

      <p className="text-center text-[12px] text-gray-800 mt-6">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onOpenRegister}
          className="text-blue-900 hover:underline font-semibold cursor-pointer"
        >
          Register
        </button>
      </p>
    </div>
    </>
  );
}
