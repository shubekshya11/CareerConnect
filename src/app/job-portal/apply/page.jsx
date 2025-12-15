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

      if (res.ok) resetForm();
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

      {message && <div className="mt-3">{message}</div>}
    </div>
  );
};

const JobApplyForm = () => (
  <Suspense fallback={<div className="container my-5 text-center">Loading...</div>}>
    <JobApplyFormContent />
  </Suspense>
);

export default JobApplyForm;
