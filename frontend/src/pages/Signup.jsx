// src/pages/Signup.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { signupUser } from "../services/authService";

const Signup = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signupUser(form);
      const { _id, name, email, role, token } = res.data;
      login({ _id, name, email, role }, token);
      navigate("/restaurants");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      {["name", "email", "password"].map((field) => (
        <input
          key={field}
          name={field}
          type={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          className="block w-full mb-2 p-2 border"
          value={form[field]}
          onChange={handleChange}
          required
        />
      ))}
      <button type="submit" className="w-full bg-blue-600 text-white py-2">
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
