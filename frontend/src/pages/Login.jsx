import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/api";
import toast from "react-hot-toast";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handelchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (
      !/^[A-Za-z0-9._%+-]+@(gmail\.com|yahoo\.com|ricr\.in)$/.test(data.email)
    ) {
      tempErrors.email = "Only @gmail.com, @yahoo.com, @ricr.in are allowed";
      isValid = false;
    }

    if (data.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setError(tempErrors);
    return isValid;
  };

  const handelsubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await axios.post("auth/login", data);
      if (res.status === 200) {
        toast.success("Welcome back!");
        navigate("/dashboard");
      }

      setData({
        email: "",
        password: "",
      });

      setError({});
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Server Error";
      toast.error(errorMsg);
      setError({ general: errorMsg });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 px-6 py-8 bg-white shadow-xl rounded-2xl border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Welcome Back
      </h2>
      <form className="space-y-5" onSubmit={handelsubmit}>
        <div>
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            name="email"
            value={data.email}
            onChange={handelchange}
            placeholder="@gmail.com"
          />
          {error.email && (
            <p className="text-sm text-red-600 mt-1">{error.email}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            name="password"
            value={data.password}
            onChange={handelchange}
            placeholder="******"
          />
          {error.password && (
            <p className="text-sm text-red-600 mt-1">{error.password}</p>
          )}
        </div>

        {error.general && (
          <p className="text-sm text-red-600 text-center">{error.general}</p>
        )}

        <button
          type="submit"
          className="w-full text-white py-3 rounded-3xl text-lg font-semibold shadow-lg transition duration-300
            bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500"
        >
          Login
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:underline font-medium"
        >
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
