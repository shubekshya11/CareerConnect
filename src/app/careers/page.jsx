"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const fetchJobs = async (keyword = "") => {
  const url = keyword
    ? `/api/jobs?keyword=${encodeURIComponent(keyword)}`
    : "/api/jobs";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
};

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all jobs initially
  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJobs(searchKeyword.trim());
      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = async () => {
    setSearchKeyword("");
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <Header />
      <section id="careers-hero" className="p-0 ">
        <div className="box-container m-3 text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="content pe-5">
                  <div className="breadcrumb">
                    <a href="/">Home</a>
                    <i className="material-icons">chevron_right</i>
                    <span>Careers</span>
                  </div>
                  <h1>Careers</h1>
                  <div className="py-3 fw-light">
                    Explore exciting career opportunities with Sakchha to work with international clients.
                    We offer professional growth opportunities, and a collaborative work environment.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <main id="careers-portal">
        {/* Search Section */}
        <div className="container job-search-container my-5 border border-0">
          <form onSubmit={handleSearch} className="d-flex items-center">
            <input
              type="text"
              placeholder="Search jobs by title, company, or location..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="job-search-input"
            />
            <button type="submit" className="job-search-btn">
              Search
            </button>
            {searchKeyword && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="btn btn-secondary rounded-pill ms-2"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger text-center py-2">
            Error: {error}
          </div>
        )}

        {/* Jobs Table */}
        <div className="container job-table w-full mb-5 pb-5">
          {jobs.length > 0 || loading ? (
            <>
              {!loading && (
                <div className="mb-4 text-muted">
                  Showing {jobs.length} {jobs.length === 1 ? "position" : "positions"}
                </div>
              )}
              {(loading ? Array(4).fill({}) : jobs).map((job, index) => (
                <div
                  key={loading ? index : job.id}
                  className="d-flex justify-content-between align-items-top border-bottom px-2 py-3"
                >
                  <div className="job-details flex-grow-1 me-4">
                    <div className={`h5 fw-light mb-2 ${loading ? "placeholder-glow" : "text-dark"}`}>
                      {loading ? (
                        <span className="placeholder w-75" style={{height: "24px"}}></span>
                      ) : (
                        job.title
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
                          <span className="me-1">{job.location}</span>|
                          <span className="ms-1">{job.job_type || "N/A"}</span>
                        </>
                      )}
                    </div>
                    <div className={`text-secondary mb-1 ${loading ? "placeholder-glow" : ""}`}>
                      {loading ? (
                        <span className="placeholder w-50"></span>
                      ) : (
                        <>No. of Vacancies: {job.vacancy_qty || job.vacancy}</>
                      )}
                    </div>
                    <div className={`text-secondary mb-1 ${loading ? "placeholder-glow" : ""}`}>
                      {loading ? (
                        <span className="placeholder w-60"></span>
                      ) : (
                        <>
                          <span className="me-1">Apply Before:</span>
                          {formatDate(job.deadline)}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="job-cta d-flex flex-column gap-2" style={{minWidth: "120px"}}>
                    {loading ? (
                      <>
                        <span className="btn placeholder disabled" style={{height: "38px"}}></span>
                        <span className="btn placeholder disabled" style={{height: "38px"}}></span>
                      </>
                    ) : (
                      <>
                        <Link href={`/job-portal/apply?job_id=${job.id}`}>
                          <button className="btn btn-sakchha-primary w-100">Apply Now</button>
                        </Link>
                        <Link href={`/careers/${job.id}`}>
                          <button className="btn btn-sakchha-outline w-100">Read more</button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : null}
        </div>

        <footer id="contact-me" className="pt-5">
          <Footer />
        </footer>
      </main>
    </>
  );
};

export default Careers;