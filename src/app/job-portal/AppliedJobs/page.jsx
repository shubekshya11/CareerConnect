"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AppliedJobsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applications, setApplications] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      setError(null);
      try {
        const meRes = await fetch("/api/auth/me", { credentials: "include" });
        if (!meRes.ok) {
          if (meRes.status === 401) {
            router.push("/login");
            return;
          }
          throw new Error("Failed to get user");
        }
        const meData = await meRes.json();
        const currentUser = meData?.user;
        if (!currentUser?.id) {
          router.push("/login");
          return;
        }
        setUser(currentUser);

        const appsRes = await fetch(
          `/api/jobPortal?userId=${encodeURIComponent(currentUser.id)}`,
          { credentials: "include" }
        );
        if (!appsRes.ok) {
          const errText = await appsRes.text();
          throw new Error(errText || "Failed to fetch applications");
        }
        const apps = await appsRes.json();
        setApplications(Array.isArray(apps) ? apps : []);
      } catch (e) {
        setError(e.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [router]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Use placeholders if loading
  const rows = loading ? Array(4).fill({}) : applications;

  return (
    <div id="job-portal" className="container-fluid px-0">
      <div className="jobs-content">
        {error && (
          <div className="alert alert-danger text-center py-2">
            Error: {error}
          </div>
        )}

        <div className="job-table w-full px-3">
          {rows.length === 0 && !loading ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg">No applications found</p>
              <p className="mt-2">
                You haven't applied to any jobs yet.{" "}
                <Link className="text-primary" href="/careers">
                  Browse open roles
                </Link>
                .
              </p>
            </div>
          ) : (
            rows.map((app, index) => {
              const job = app.job || {};
              return (
                <div
                  key={loading ? index : app.id}
                  className="d-flex justify-content-between align-items-top border-bottom px-2 py-3"
                >
                  <div className="job-details flex-grow-1 me-4">
                    <div className={`h5 fw-light mb-2 ${loading ? "placeholder-glow" : "text-dark"}`}>
                      {loading ? (
                        <span className="placeholder w-75" style={{height: "24px"}}></span>
                      ) : (
                        job.title || "Untitled Role"
                      )}
                    </div>
                    <div className={`text-secondary mb-1 ${loading ? "placeholder-glow" : ""}`}>
                      {loading ? (
                        <div className="d-flex align-items-center">
                          <span className="placeholder w-25 me-1"></span>
                          <span className="placeholder w-1 mx-1"></span>
                          <span className="placeholder w-20 ms-1"></span>
                        </div>
                      ) : (
                        <>
                          <span className="me-1">{job.location || "N/A"}</span>|
                          <span className="ms-1">{job.job_type || "N/A"}</span>
                        </>
                      )}
                    </div>
                    <div className={`text-secondary mb-1 ${loading ? "placeholder-glow" : ""}`}>
                      {loading ? (
                        <span className="placeholder w-50"></span>
                      ) : (
                        `Applied On: ${formatDate(app.created_at)}`
                      )}
                    </div>
                    {loading ? (
                      <div className={`text-secondary mb-1 ${loading ? "placeholder-glow" : ""}`}>
                        <span className="placeholder w-60"></span>
                      </div>
                    ) : job.vacancy_qty ? (
                      <div className="text-secondary mb-1">No. of Vacancies: {job.vacancy_qty}</div>
                    ) : null}
                    {loading ? (
                      <div className={`text-secondary mb-1 ${loading ? "placeholder-glow" : ""}`}>
                        <span className="placeholder w-65"></span>
                      </div>
                    ) : job.deadline ? (
                      <div className="text-secondary mb-1">
                        <span className="me-1">Apply Before:</span>
                        {formatDate(job.deadline)}
                      </div>
                    ) : null}
                  </div>
                  <div className="job-cta d-flex flex-column gap-2" style={{minWidth: "120px"}}>
                    {loading ? (
                      <span className="btn placeholder disabled" style={{height: "38px"}}></span>
                    ) : (
                      job.id && (
                        <Link href={`/job-portal/${job.id}`}>
                          <button className="btn btn-career-outline w-100">View Job</button>
                        </Link>
                      )
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AppliedJobsPage;