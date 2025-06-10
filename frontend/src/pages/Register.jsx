import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "../config/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate(); // 👈 Add this line

  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    qualification: "",
    department: "",
    position: "",
    hiringDate: "",
    salary: "",
    password: "",
    crpassword: "",
  });

  const [error, setError] = useState({});

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

    if (!/^[A-Za-z\s]+$/.test(data.fullName) || data.fullName.length < 3) {
      tempErrors.fullName = "Please use only alphabets and min 3 characters";
      isValid = false;
    }

    if (!/^[6-9]\d{9}$/.test(data.phone)) {
      tempErrors.phone = "Please enter a valid 10-digit mobile number";
      isValid = false;
    }

    if (
      !/^[A-Za-z0-9._%+-]+@(gmail\.com|yahoo\.com|ricr\.in)$/.test(data.email)
    ) {
      tempErrors.email = "Please enter a valid email (gmail, yahoo, ricr only)";
      isValid = false;
    }

    if (
      !data.dob ||
      (() => {
        const dob = new Date(data.dob);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        const dayDiff = today.getDate() - dob.getDate();
        return (
          age < 20 ||
          (age === 20 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
        );
      })()
    ) {
      tempErrors.dob = "Age must be more than 20 years";
      isValid = false;
    }

    if (data.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (data.password !== data.crpassword) {
      tempErrors.crpassword = "Passwords do not match";
      isValid = false;
    }

    if (isNaN(data.salary) || parseFloat(data.salary) <= 0) {
      tempErrors.salary = "Enter a valid positive salary amount";
      isValid = false;
    }

    setError(tempErrors);
    return isValid;
  };

  const handelsubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await axios.post("auth/register", data);
      toast.success(res.data.message || "Registration successful!");

      // Reset form
      setData({
        fullName: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
        qualification: "",
        department: "",
        position: "",
        hiringDate: "",
        salary: "",
        password: "",
        crpassword: "",
      });
      setError({});

      // 👇 Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 via-blue-200 to-cyan-100 p-6">
      <div className="w-full max-w-2xl bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/30">
        <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8 drop-shadow">
          Create Account
        </h2>
        <form className="space-y-6" onSubmit={handelsubmit}>
          {/* Full Name */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={data.fullName}
              onChange={handelchange}
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            {error.fullName && (
              <p className="text-sm text-red-600 mt-1">{error.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handelchange}
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            {error.email && (
              <p className="text-sm text-red-600 mt-1">{error.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={data.phone}
              onChange={handelchange}
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            {error.phone && (
              <p className="text-sm text-red-600 mt-1">{error.phone}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Gender
            </label>
            <select
              name="gender"
              value={data.gender}
              onChange={handelchange}
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* DOB */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={data.dob}
              onChange={handelchange}
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            {error.dob && (
              <p className="text-sm text-red-600 mt-1">{error.dob}</p>
            )}
          </div>

          {/* Qualification */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Qualification
            </label>
            <input
              type="text"
              name="qualification"
              value={data.qualification}
              onChange={handelchange}
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={data.department}
              onChange={handelchange}
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Position */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Position
            </label>
            <input
              type="text"
              name="position"
              value={data.position}
              onChange={handelchange}
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Hiring Date */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Hiring Date
            </label>
            <input
              type="date"
              name="hiringDate"
              value={data.hiringDate}
              onChange={handelchange}
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              value={data.salary}
              onChange={handelchange}
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            {error.salary && (
              <p className="text-sm text-red-600 mt-1">{error.salary}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handelchange}
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            {error.password && (
              <p className="text-sm text-red-600 mt-1">{error.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="crpassword"
              value={data.crpassword}
              onChange={handelchange}
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            {error.crpassword && (
              <p className="text-sm text-red-600 mt-1">{error.crpassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition duration-200"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
