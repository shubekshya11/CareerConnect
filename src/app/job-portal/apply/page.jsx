"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

const JobApplyFormContent = () => {
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const [form, setForm] = useState({
    user_id: "",
    job_id: "",
    email: "",
    cover_letter: "",
    cv: null,
  });

  const [jobInfo, setJobInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [jobLoading, setJobLoading] = useState(true);
  const [jobId, setJobId] = useState("");
  const [profileComplete, setProfileComplete] = useState(true);
  const [checkingProfile, setCheckingProfile] = useState(true);

  useEffect(() => {
    const jobId = searchParams.get("job_id");
    setJobId(jobId);
    setForm((prev) => ({
      ...prev,
      ...(jobId && { job_id: jobId }),
      ...(user?.id && { user_id: user.id }),
      ...(user?.email && { email: user.email }),
    }));

    if (jobId) fetchJobInfo(jobId);
    if (user?.id) checkProfileOnLoad();
  }, [searchParams, user]);

  async function fetchJobInfo(jobId) {
    try {
      setJobLoading(true);
      const res = await fetch(`/api/jobs/${jobId}`);
      if (!res.ok) throw new Error("Failed to fetch job information");
      const data = await res.json();
      setJobInfo(data);
    } catch (err) {
      console.error(err);
      setJobInfo(null);
    } finally {
      setJobLoading(false);
    }
  }

  // Check profile completeness on page load
  async function checkProfileOnLoad() {
    try {
      setCheckingProfile(true);
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (!res.ok) {
        setProfileComplete(false);
        return;
      }

      const data = await res.json();
      const userData = data.user || {};

      const hasAddress = userData.address && userData.address.trim() !== "";
      const hasExperience = userData.experience && userData.experience.trim() !== "";
      const hasSkills = userData.skills && userData.skills.trim() !== "";

      setProfileComplete(hasAddress && hasExperience && hasSkills);
    } catch (err) {
      console.error("Profile check error:", err);
      setProfileComplete(false);
    } finally {
      setCheckingProfile(false);
    }
  }

  function handleChange(e) {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const jobRes = await fetch(`/api/jobs/${jobId}`);
    const jobData = await jobRes.json();

    if (!jobData?.id) {
      setMessage("Job not found.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("user_id", form.user_id);
    data.append("job_id", form.job_id);
    data.append("cover_letter", form.cover_letter);
    data.append("email", form.email);
    if (form.cv) data.append("cv", form.cv);

    try {
      const res = await fetch("/api/jobPortal", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      setMessage(result.message);

      if (res.ok) {
        resetForm();
        setProfileComplete(true); // Reset profile complete status after successful submission
      } else if (result.error === 'PROFILE_INCOMPLETE') {
        // Profile validation failed, update profile complete status
        setProfileComplete(false);
      }
    } catch (err) {
      console.error(err);
      setMessage("Error submitting application.");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({
      user_id: user?.id || "",
      job_id: searchParams.get("job_id") || "",
      email: user?.email || "",
      cover_letter: "",
      cv: null,
    });
  }

  return (
    <div id="job-portal-apply-form">
      <div id="job-apply-header" className="mb-3">
        {jobLoading ? (
          // Skeleton placeholders 
          <div className="placeholder-glow">
            <h3>
              <span className="placeholder col-6"></span>
            </h3>
            <p className="text-muted">
              <span className="placeholder col-4"></span>
            </p>
            <p>
              <span className="placeholder col-5"></span>
            </p>
          </div>
        ) : jobInfo ? (
          <>
            <h3>{jobInfo.title}</h3>
            <p className="text-muted">{jobInfo.company}</p>
            <p>{jobInfo.location}</p>
          </>
        ) : (
          <p className="text-danger">Job not found or unavailable.</p>
        )}
      </div>
      <hr />

      {/* Profile Completion Message */}
      {!checkingProfile && !profileComplete && (
        <div className="mb-4 p-3" style={{ 
          backgroundColor: '#f5f5f5', 
          borderLeft: '4px solid #8f17ba', // Use your primary brand color
          borderRadius: '4px'
        }}>
          <p className="mb-0" style={{ 
            color: '#333333', 
            fontSize: '0.875rem',
            lineHeight: '1.5'
          }}>
            <strong>Complete profile first to apply faster.</strong> Make sure all the fields are filled in your profile.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="hidden" name="user_id" value={form.user_id} />
        <input type="hidden" name="job_id" value={form.job_id} />

        <div className="mb-3">
          <label className="form-label">Email Address *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            required
            readOnly
            disabled={jobLoading}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cover Letter</label>
          <textarea
            name="cover_letter"
            rows={5}
            value={form.cover_letter}
            onChange={handleChange}
            className="form-control"
            disabled={jobLoading}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">CV (PDF, DOC)</label>
          <input
            type="file"
            name="cv"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="form-control"
            disabled={jobLoading}
          />
          {form.cv && <div className="mt-2 text-muted">{form.cv.name}</div>}
        </div>

        <button
          type="submit"
          className={`btn btn-career-primary ${jobLoading ? "disabled placeholder" : ""}`}
          disabled={loading || jobLoading}
          style={jobLoading ? { width: "200px", height: "38px" } : {}}
        >
          {loading ? "Submitting..." : jobLoading ? "" : "Submit Application"}
        </button>
      </form>

      {message && (
        <div 
          className="mt-3 p-3" 
          style={{ 
            backgroundColor: message.includes("successfully") 
              ? '#f0f9f0' 
              : message.includes("complete your profile") 
              ? '#fff4e6' 
              : '#ffe6e6',
            borderLeft: `4px solid ${message.includes("successfully") 
              ? 'rgb(25, 181, 19)' 
              : message.includes("complete your profile") 
              ? '#dba121' // Use your secondary brand color for warnings
              : '#dc3545'}`,
            borderRadius: '4px'
          }}
        >
          <p className="mb-0" style={{ 
            color: '#333333', 
            fontSize: '0.875rem',
            lineHeight: '1.5'
          }}>
            {message}
          </p>
        </div>
      )}
    </div>
  );
};

const JobApplyForm = () => (
  <Suspense fallback={<div className="container my-5 text-center">Loading...</div>}>
    <JobApplyFormContent />
  </Suspense>
);

export default JobApplyForm;
