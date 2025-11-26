"use client";
import React, { useState, useEffect } from "react";
import JobsTable from "../components/JobsTable";
import JobSearch from "../components/JobSearch";

const JobPortal = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add this useEffect to fetch initial jobs
  useEffect(() => {
    const fetchInitialJobs = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/jobs');
        
        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }
        
        const jobsData = await res.json();
        // Set jobs to empty array if no jobs exist 
        setJobs(Array.isArray(jobsData) ? jobsData : []);
        
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setJobs([]); // Ensure jobs is empty array even on error
      } finally {
        setLoading(false);
      }
    };

    fetchInitialJobs();
  }, []);

  return (
    <>

        <div id="job-portal" className="container-fluid px-0">
          <div className="jobs-content">
            {/*  Pass jobs + setJobs + setLoading to JobSearch */}
            <JobSearch setJobs={setJobs} setLoading={setLoading} />

            {/*  Pass jobs to JobsTable */}
            <JobsTable jobs={jobs} loading={loading} />
          </div>
        </div>
   </>

  );
};

export default JobPortal;
