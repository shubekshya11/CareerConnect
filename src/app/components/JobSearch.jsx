"use client";
import React, { useState, useEffect } from "react";

const fetchJobs = async (keyword = "") => {
  const url = keyword
    ? `/api/jobs?keyword=${encodeURIComponent(keyword)}&user=true`
    : "/api/jobs?user=true";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
};

const JobSearch = ({ setJobs, setLoading: setLoadingParent }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync loading state with parent
  useEffect(() => {
    if (setLoadingParent) {
      setLoadingParent(loading);
    }
  }, [loading, setLoadingParent]);

  // Fetch all jobs initially (optional)
  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJobs(searchKeyword.trim());
      setJobs(Array.isArray(data) ? data : []); // Updates parent
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
      setJobs(Array.isArray(data) ? data : []); //  Updates parent
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="job-search-container p-4">
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

      {error && (
        <div className="alert alert-danger text-center py-2">
          Error: {error}
        </div>
      )}
    </>
  );
};

export default JobSearch;
