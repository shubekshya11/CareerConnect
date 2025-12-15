"use client";

import React, { useState, useEffect } from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    skills: "",
    education: "",
    experience: "",
    profile_complete: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
const user = data.user || {};
setProfile({
  id: user.id,
  firstname: user.firstname,
  lastname: user.lastname,
  email: user.email,
  phone: user.phone,
  address: user.address,
  skills: user.skills,
  education: user.education,
  experience: user.experience,

  profile_complete: Boolean(user.profile_complete),
});
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const formData = new FormData();
      [
        "id",
        "firstname",
        "lastname",
        "email",
        "phone",
        "address",
        "skills",
        "education",
        "experience",
      ].forEach((key) => {
        if (profile[key] !== null) formData.append(key, profile[key]);
      });

      const res = await fetch(`/api/register`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const data = await res.json();
      setSuccessMsg(data.message || "Profile updated successfully!");
      setIsEditing(false);

      // Refresh updated data
      setProfile((prev) => ({
        ...prev,
        ...data.user,
      }));

      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Profile completeness check
  const isProfileComplete = Boolean(
    profile.profile_complete ||
      (profile.firstname &&
        profile.lastname &&
        profile.email &&
        profile.address &&
        profile.skills &&
        profile.education &&
        profile.experience)
  );

  // Loading and Error states
  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading profile...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-danger py-5">
        <p>{error}</p>
      </div>
    );

  // Render UI
  return (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-9 offset-md-3 p-4">

        <div className="border rounded shadow-sm bg-white p-4 mb-4">

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">My Profile</h3>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-career-primary btn-sm"
              >
                Edit Profile
              </button>
            )}
          </div>

          {error && <p className="text-danger">{error}</p>}
          {successMsg && <p className="text-success">{successMsg}</p>}

          {isEditing ? (
            <form onSubmit={handleSubmit} className="mt-3">

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    className="form-control"
                    value={profile.firstname}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    className="form-control"
                    value={profile.lastname}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={profile.email}
                    onChange={handleChange}
                    required
                    readOnly
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={profile.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={profile.address}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Skills</label>
                <textarea
                  name="skills"
                  className="form-control"
                  rows={2}
                  value={profile.skills || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Education</label>
                <textarea
                  name="education"
                  className="form-control"
                  rows={2}
                  value={profile.education || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Experience</label>
                <textarea
                  name="experience"
                  className="form-control"
                  rows={2}
                  value={profile.experience || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-4 d-flex gap-2">
                <button type="submit" className="btn btn-success btn-sm">
                  Save Changes
                </button>

                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>

            </form>
          ) : (
            <div className="mt-3">

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Profile Summary</h5>
                <span className={`badge ${isProfileComplete ? "bg-success" : "bg-warning text-dark"}`}>
                  {isProfileComplete ? "Complete" : "Incomplete"}
                </span>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <p><strong>Name:</strong> {profile.firstname} {profile.lastname}</p>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>Phone:</strong> {profile.phone || "N/A"}</p>
                  <p><strong>Address:</strong> {profile.address || "N/A"}</p>
                </div>

                <div className="col-md-6 mb-3">
                  <p><strong>Skills:</strong> {profile.skills || "N/A"}</p>
                  <p><strong>Education:</strong> {profile.education || "N/A"}</p>
                  <p><strong>Experience:</strong> {profile.experience || "N/A"}</p>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  </div>
);

};

export default ProfilePage;
