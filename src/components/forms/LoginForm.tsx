"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Google login failed.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await authClient.signIn.email({ email, password });
    setIsLoading(false);

    if (error) {
      return toast.error(error.message || "Login failed.");
    }

    toast.success("Logged in successfully!");
    router.push("/");
  };

  const inputClass =
    "w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all";
  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
      <h1 className="text-3xl font-bold text-teal-700 dark:text-teal-400 mb-1">
        Welcome back
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
        Enter your details to access your account.
      </p>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full mb-6 flex items-center justify-center gap-2 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span className="font-medium">Continue with Google</span>
      </button>

      <div className="flex items-center gap-2 mb-2">
        <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
        <span className="text-gray-500 text-sm">Or</span>
        <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputClass + " pr-10"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 rounded-lg bg-teal-700 text-white font-medium hover:bg-teal-800 transition-colors disabled:opacity-60"
        >
          {isLoading ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
        Do not have an account?{" "}
        <Link
          href="/register"
          className="text-teal-700 dark:text-teal-400 font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
