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
  <div id="job-portal-profile" className="container-fluid px-0">
    <div className="profile-content-wrapper">

        <div className="profile-card">

          <div className="profile-header">
            <h2 className="profile-title">My Profile</h2>
            <div className="profile-header-actions">
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-career-primary"
                >
                  Edit Profile
                </button>
              )}
              {!isEditing && (
                <span className={`profile-badge ${isProfileComplete ? "complete" : "incomplete"}`}>
                  {isProfileComplete ? "Complete" : "Incomplete"}
                </span>
              )}
            </div>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {successMsg && <div className="alert alert-success">{successMsg}</div>}

          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">

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
            <div className="profile-view">

              <div className="profile-section profile-contact-info">
                <div className="profile-info-grid">
                  <div className="profile-info-item">
                    <span className="profile-info-label">Name</span>
                    <span className="profile-info-value">{profile.firstname} {profile.lastname}</span>
                  </div>
                  <div className="profile-info-item">
                    <span className="profile-info-label">Email</span>
                    <span className="profile-info-value">{profile.email}</span>
                  </div>
                  <div className="profile-info-item">
                    <span className="profile-info-label">Phone</span>
                    <span className="profile-info-value">{profile.phone || "N/A"}</span>
                  </div>
                  <div className="profile-info-item">
                    <span className="profile-info-label">Address</span>
                    <span className="profile-info-value">{profile.address || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3 className="profile-section-title">
                  <span className="material-icons-outlined profile-section-icon">code</span>
                  Skills
                </h3>
                <div className="profile-section-content">
                  {profile.skills ? (
                    <div className="profile-text-content" style={{ whiteSpace: "pre-wrap" }}>
                      {profile.skills}
                    </div>
                  ) : (
                    <div className="profile-empty-state">No skills added yet</div>
                  )}
                </div>
              </div>

              <div className="profile-section">
                <h3 className="profile-section-title">
                  <span className="material-icons-outlined profile-section-icon">school</span>
                  Education
                </h3>
                <div className="profile-section-content">
                  {profile.education ? (
                    <div className="profile-text-content" style={{ whiteSpace: "pre-wrap" }}>
                      {profile.education}
                    </div>
                  ) : (
                    <div className="profile-empty-state">No education information added yet</div>
                  )}
                </div>
              </div>

              <div className="profile-section">
                <h3 className="profile-section-title">
                  <span className="material-icons-outlined profile-section-icon">work</span>
                  Experience
                </h3>
                <div className="profile-section-content">
                  {profile.experience ? (
                    <div className="profile-text-content" style={{ whiteSpace: "pre-wrap" }}>
                      {profile.experience}
                    </div>
                  ) : (
                    <div className="profile-empty-state">No experience information added yet</div>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>

    </div>
  </div>
);

};

export default ProfilePage;
