"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

const JobDetails = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const id = params?.id;

  const [job, setJob] = useState(null);
  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSticky, setIsSticky] = useState(false);

  // Fetch job details and applied status
  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      try {
        const res = await fetch(`/api/jobs/${id}`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch job details");
        const data = await res.json();
        setJob(data);
        setIsApplied(data.isApplied || false);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, user]);

  // Sticky sidebar 
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleApply = () => {
    if (!job || isApplied) return;
    router.push(`/job-portal/apply?job_id=${job.id}`);
  };

  if (error)
    return (
      <div className="container-fluid text-center text-danger py-5">
        {error}
      </div>
    );

  if (!job && !loading)
    return (
      <div className="container-fluid text-center py-5">
        Job not found.
      </div>
    );

  return (
    <>
      <div className="container">
        <div className="row">
          {/* Main job content */}
          <div className="col-md-7 offset-md-2 py-2 mb-5">
            <div className="mb-4">
              <h3 className={`mb-2 pt-4 ${loading ? "placeholder-glow" : ""}`}>
                {loading ? (
                  <span className="placeholder col-6"></span>
                ) : (
                  job.title
                )}
              </h3>
              <p className={`text-muted mb-2 ${loading ? "placeholder-glow" : ""}`}>
                {loading ? (
                  <span className="placeholder col-4"></span>
                ) : (
                  job.location
                )}
              </p>

              <div className="row">
                <div className="col-12 col-md-6">
                  <p className="mb-1">
                    {loading ? (
                      <span className="placeholder-glow">
                        <span className="placeholder col-3"></span>
                      </span>
                    ) : (
                      <>
                        <strong>Type:</strong> {job.job_type || "N/A"}
                      </>
                    )}
                  </p>
                  <p className="mb-1">
                    {loading ? (
                      <span className="placeholder-glow">
                        <span className="placeholder col-2"></span>
                      </span>
                    ) : (
                      <>
                        <strong>Vacancy:</strong> {job.vacancy_qty || "N/A"}
                      </>
                    )}
                  </p>
                </div>

                <div className="col-12 col-md-6">
                  <p className="mb-1">
                    {loading ? (
                      <span className="placeholder-glow">
                        <span className="placeholder col-3"></span>
                      </span>
                    ) : (
                      <>
                        <strong>Salary:</strong> {job.salary || "N/A"}
                      </>
                    )}
                  </p>
                  <p className="mb-0">
                    {loading ? (
                      <span className="placeholder-glow">
                        <span className="placeholder col-3"></span>
                      </span>
                    ) : (
                      <>
                        <strong>Deadline:</strong> {job.deadline || "N/A"}
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Job sections */}
            {["job_description", "qualifications", "responsibilities"].map((key) => (
              <div className="mb-4" key={key}>
                <h5 className={`mb-2 ${loading ? "placeholder-glow" : ""}`}>
                  {loading ? (
                    <span className="placeholder col-4"></span>
                  ) : (
                    key.replace("_", " ").toUpperCase()
                  )}
                </h5>
                <div className={`mb-0 ${loading ? "placeholder-glow" : ""}`}>
                  {loading ? (
                    <span className="placeholder col-12"></span>
                  ) : job[key] ? (
                    key === "qualifications" || key === "responsibilities" ? (
                      <ul className="mb-0 ps-3" style={{ paddingLeft: '1.5rem' }}>
                        {job[key].split('\n').map((item, index) => (
                          item.trim() && (
                            <li key={index} className="mb-1">
                              {item.replace(/^[-•*]\s*/, '').trim()}
                            </li>
                          )
                        ))}
                      </ul>
                    ) : (
                      <div style={{ whiteSpace: "pre-line" }}>
                        {job[key]}
                      </div>
                    )
                  ) : (
                    "No description available."
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="col-md-3 py-3 border-start my-3 mb-5">
            <div
              className="ps-2 pb-3 sticky"
              style={
                isSticky
                  ? { top: "100px", width: "300px", transition: "all 0.5s ease-in-out" }
                  : {}
              }
            >
              <h5 className={`mb-3 ${loading ? "placeholder-glow" : ""}`}>
                {loading ? (
                  <span className="placeholder col-6"></span>
                ) : (
                  "Apply for this position"
                )}
              </h5>

              {loading ? (
                <button className="btn btn-primary w-50 mb-3 disabled placeholder col-12">
                  &nbsp;
                </button>
              ) : isApplied ? (
                <button className="btn btn-secondary w-100 mb-3" disabled>
                  Applied
                </button>
              ) : (
                <button
                  className="btn btn-primary w-50 mb-3"
                  onClick={handleApply}
                >
                  Apply Now
                </button>
              )}

              <div className="text-muted small">
                <p className="mb-2">
                  {loading ? (
                    <span className="placeholder-glow">
                      <span className="placeholder col-6"></span>
                    </span>
                  ) : (
                    <>
                      <strong>Application Deadline:</strong>
                      <br />
                      {job.deadline || "N/A"}
                    </>
                  )}
                </p>

                <p className="mb-0">
                  {loading ? (
                    <span className="placeholder-glow">
                      <span className="placeholder col-4"></span>
                    </span>
                  ) : (
                    <>
                      <strong>Positions Available:</strong>
                      <br />
                      {job.vacancy_qty || "N/A"}
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;