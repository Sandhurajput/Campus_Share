import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

function LoginForm({ onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      const response = await fetch("http://localhost:5000/api/login-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ lastLogin: new Date().toISOString() }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "User logged in successfully!");
        setEmail("");
        setPassword("");
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="w-full lg:w-1/2 p-8 md:p-12">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Welcome Back</h2>
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            placeholder="Your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-purple-700 transition transform hover:scale-[1.01]"
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-center">
        {message && <p className="text-sm text-green-600 bg-green-50 p-2 rounded-lg">{message}</p>}
        {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">{error}</p>}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToSignup}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
