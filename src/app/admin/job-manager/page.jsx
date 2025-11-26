"use client";

import { useState, useEffect } from "react";
import AdminHeader from "../AdminHeader";
import Link from "next/link";

export default function JobManager() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/jobs?admin=true', { credentials: 'include'
             });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to fetch jobs');
            setJobs(data);
        } catch (err) {
            setError(err.message || 'Failed to load jobs');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this job?')) return;
        
        try {
            const res = await fetch(`/api/jobs/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (!res.ok) throw new Error('Failed to delete job');
            fetchJobs(); // Refresh the list
        } catch (err) {
            alert(err.message || 'Failed to delete job');
        }
    };

    return (
        <>
            <AdminHeader />
            <section id="job-manager" className="container mx-auto py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="text-2xl font-bold">Job Manager</h1>
                </div>

                <Link href="/admin/job-manager/create" className="btn btn-primary mb-4">
                    Create New Job
                </Link>

                {loading && <div className="text-center py-4">Loading jobs...</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                {!loading && !error && (
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Type</th>
                                    <th>Location</th>
                                    <th>Vacancies</th>
                                    <th>Deadline</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4">
                                            No jobs found
                                        </td>
                                    </tr>
                                ) : (
                                    jobs.map((job) => (
                                        <tr key={job.id}>
                                            <td>{job.id}</td>
                                            <td>{job.title}</td>
                                            <td>{job.job_type}</td>
                                            <td>{job.location}</td>
                                            <td>{job.vacancy_qty}</td>
                                            <td>{job.deadline ? new Date(job.deadline).toLocaleDateString() : 'N/A'}</td>
                                            <td>
                                                <Link 
                                                    href={`/admin/job-manager/${job.id}/edit`}
                                                    className="btn btn-sm btn-primary me-2"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(job.id)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </>
    );
}