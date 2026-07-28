import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function AuthForm() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (mode === "signup") {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
          email,
          password,
        });
      }

      const form = new URLSearchParams();
      form.append("username", email);
      form.append("password", password);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        form,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      login(res.data.access_token, email);
    } catch (err) {
      console.error(err);
      const detail = err.response?.data?.detail;
      setError(typeof detail === "string" ? detail : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-[#2A2422] border border-[#F7F0EA]/10 rounded-2xl p-6"
      >
        <p className="font-mono-data text-xs tracking-widest text-[#B8ADA3] uppercase mb-1 text-center">
          Personal Ledger
        </p>
        <h1 className="font-display text-2xl font-bold text-[#F7F0EA] text-center mb-6">
          {mode === "login" ? "Welcome back" : "Create your ledger"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-[#332C29] text-[#F7F0EA] placeholder-[#7A716B] rounded-lg px-3 py-2.5 outline-none border border-transparent focus:border-[#FF8A5B] transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full bg-[#332C29] text-[#F7F0EA] placeholder-[#7A716B] rounded-lg px-3 py-2.5 outline-none border border-transparent focus:border-[#FF8A5B] transition-colors"
          />

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-[#E2574C] text-sm"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={submitting}
            className="w-full text-[#1E1A18] font-medium rounded-lg py-2.5 mt-2 disabled:opacity-50"
            style={{ background: "linear-gradient(90deg, #FF8A5B, #FFC178)" }}
          >
            {submitting ? "Please wait..." : mode === "login" ? "Log In" : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-[#B8ADA3] mt-4">
          {mode === "login" ? "New here?" : "Already have an account?"}{" "}
          <button
            onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(null); }}
            className="text-[#FFC178] hover:underline"
          >
            {mode === "login" ? "Create an account" : "Log in"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}

export default AuthForm;