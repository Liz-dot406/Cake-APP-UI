import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/users/loginThunk";
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Clear form every time component mounts
  useEffect(() => {
    setEmail("");
    setPassword("");
    setError("");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 

    try {
      await dispatch(login(email, password) as any);

      // ✅ Clear form after successful login
      setEmail("");
      setPassword("");

      navigate("/customer/dashboard/users");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow"
      autoComplete="off" // Prevent browser autofill
    >
      <h2 className="text-2xl font-bold text-pink-700 mb-4">Login</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-3"
        required
        autoComplete="off"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-3"
        required
        autoComplete="new-password"
      />

      <button className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600">
        Login
      </button>
    </form>
  );
};
