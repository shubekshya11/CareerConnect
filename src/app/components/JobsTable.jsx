"use client";
import React from "react";
import Link from "next/link";

const JobsTable = ({ jobs, loading }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="job-table w-full px-3">
      {loading ? (
        <>
          <span className="placeholder-glow">
            <span className="placeholder w-25"></span>
          </span>
          {Array(4).fill({}).map((job, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-top border-bottom px-2 py-3"
            >
              <div className="job-details flex-grow-1 me-4">
                <div className="h5 fw-light mb-2 placeholder-glow">
                  <span className="placeholder w-75" style={{ height: "24px" }}></span>
                </div>
                <div className="text-secondary mb-1 placeholder-glow">
                  <div className="d-flex align-items-center">
                    <span className="placeholder w-25 me-1"></span>
                    <span className="placeholder w-1 mx-1"></span>
                    <span className="placeholder w-20 ms-1"></span>
                  </div>
                </div>
                <div className="text-secondary mb-1 placeholder-glow">
                  <span className="placeholder w-50"></span>
                </div>
                <div className="text-secondary mb-1 placeholder-glow">
                  <span className="placeholder w-60"></span>
                </div>
              </div>
              <div className="job-cta d-flex flex-column gap-2" style={{ minWidth: "120px" }}>
                <span className="btn placeholder disabled" style={{ height: "38px" }}></span>
                <span className="btn placeholder disabled" style={{ height: "38px" }}></span>
              </div>
            </div>
          ))}
        </>
      ) : jobs.length > 0 ? (
        <>
          {`Showing ${jobs.length} ${jobs.length === 1 ? "position" : "positions"}`}
          {jobs.map((job, index) => (
            <div
              key={job.id}
              className="d-flex justify-content-between align-items-top border-bottom px-2 py-3"
            >
              <div className="job-details flex-grow-1 me-4">
                <div className="h5 fw-light mb-2 text-dark">
                  {job.title}
                </div>
                <div className="text-secondary mb-1">
                  <>
                    <span className="me-1">{job.location}</span>|
                    <span className="ms-1">{job.job_type || "N/A"}</span>
                  </>
                </div>
                <div className="text-secondary mb-1">
                  <>No. of Vacancies: {job.vacancy_qty || job.vacancy}</>
                </div>
                <div className="text-secondary mb-1">
                  <>
                    <span className="me-1">Apply Before:</span>
                    {formatDate(job.deadline)}
                  </>
                </div>
              </div>
              <div className="job-cta d-flex flex-column gap-2" style={{ minWidth: "120px" }}>
                <>
                  <Link href={`/job-portal/apply?job_id=${job.id}`}>
                    <button className="btn btn-sakchha-primary w-100">Apply Now</button>
                  </Link>
                  <Link href={`/job-portal/${job.id}`}>
                    <button className="btn btn-sakchha-outline w-100">Read more</button>
                  </Link>
                </>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="text-center py-5">
          <p className="text-muted">Jobs not found</p>
        </div>
      )}
    </div>
  );
};

export default JobsTable;