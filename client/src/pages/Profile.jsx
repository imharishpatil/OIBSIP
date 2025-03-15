import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // 📌 Fetch User Profile
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // 📌 Handle Profile Update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5000/api/auth/profile", user, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  // 📌 Handle Password Change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5000/api/auth/change-password", passwords, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      alert("Password changed successfully!");
    } catch (error) {
      alert("Failed to change password.");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Profile</h1>

      {/* Update Profile Form */}
      <form onSubmit={handleUpdateProfile} className="border p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          disabled
          className="w-full p-2 border rounded mb-3 bg-gray-100"
        />
        <input
          type="text"
          placeholder="Phone"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          className="w-full p-2 border rounded mb-3"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          Update Profile
        </button>
      </form>

      {/* Change Password Form */}
      <form onSubmit={handleChangePassword} className="border p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <input
          type="password"
          placeholder="Old Password"
          value={passwords.oldPassword}
          onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={passwords.newPassword}
          onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Profile;