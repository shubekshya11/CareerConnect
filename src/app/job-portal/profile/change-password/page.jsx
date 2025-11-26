"use client";

import React, { useState } from "react";

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle password change
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      setSuccessMsg("Password changed successfully!");
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h3 className="text-center mb-4">Change Password</h3>

      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
        {/* Current Password */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter current password"
            required
          />
        </div>

        {/* New Password */}
        <div className="mb-3">
          <label className="form-label fw-semibold">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter new password"
            required
          />
        </div>

        {/* Confirm New Password */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-control"
            placeholder="Re-enter new password"
            required
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-danger text-center">{error}</p>}

        {/* Success Message */}
        {successMsg && <p className="text-success text-center">{successMsg}</p>}

        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-sakchha-primary w-100"
            disabled={loading}
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
