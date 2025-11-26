"use client";

import { useState, useEffect } from "react";
import AdminHeader from "../AdminHeader";

export default function AdminApplicationReview() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/applications', { credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch applications');
      setApplications(data);
    } catch (err) {
      setError(err.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedApplication(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  const getApplicantName = (app) => {
    if (app.firstname && app.lastname) {
      return `${app.firstname} ${app.lastname}`;
    }
    if (app.user) {
      return `${app.user.firstname} ${app.user.lastname}`;
    }
    return app.email || "-";
  };

  return (
    <>
      <AdminHeader />
      <section id="applications-review" className="container mx-auto py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-2xl font-bold">Applications Review</h1>
        </div>

        {loading && <div className="text-center py-4">Loading applications...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Applicant Name</th>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Applied On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No applications found
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id}>
                      <td>{app.id}</td>
                      <td>{getApplicantName(app)}</td>
                      <td>{app.job?.title || "-"}</td>
                      <td>{app.job?.company || "-"}</td>
                      <td>{formatDate(app.created_at || app.createdAt)}</td>
                      <td>
                        <button
                          onClick={() => handleViewDetails(app)}
                          className="btn btn-sm btn-primary"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Application Details Modal */}
        {showDetailsModal && selectedApplication && (
          <div
            className="modal show d-block"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Application Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="container">
                    <div className="row">
                      <div className="col-12 py-2">
                        {/* Main Header */}
                        <div className="mb-4">
                          <h3 className="mb-2">
                            {getApplicantName(selectedApplication)}
                          </h3>
                          <p className="text-muted mb-2">
                            {selectedApplication.email || selectedApplication.user?.email || "Not provided"}
                          </p>

                        </div>

                        {/* Personal Information */}
                        <div className="mb-4">
                          <h5 className="mb-2">PERSONAL INFORMATION</h5>
                          <p className="mb-1">
                            <strong>Address:</strong> {selectedApplication.address || selectedApplication.user?.address || "Not provided"}
                          </p>
                          <p className="mb-1">
                            <strong>Experience:</strong> {selectedApplication.experience || selectedApplication.user?.experience || "Not provided"}
                          </p>
                          <p className="mb-0">
                            <strong>Skills:</strong> {selectedApplication.skills || selectedApplication.user?.skills || "Not provided"}
                          </p>
                        </div>

                        {/* Job Information */}
                        <div className="mb-4">
                          <h5 className="mb-2">JOB INFORMATION</h5>
                          <p className="mb-1">
                            <strong>Position:</strong> {selectedApplication.job?.title || "N/A"}
                          </p>
                          <p className="mb-1">
                            <strong>Company:</strong> {selectedApplication.job?.company || "N/A"}
                          </p>
                          <p className="mb-1">
                            <strong>Location:</strong> {selectedApplication.job?.location || "N/A"}
                          </p>
                          <p className="mb-1">
                            <strong>Job Type:</strong> {selectedApplication.job?.job_type || "N/A"}
                          </p>
                          <p className="mb-0">
                            <strong>Applied On:</strong> {formatDate(selectedApplication.created_at || selectedApplication.createdAt)}
                          </p>
                        </div>

                        {/* Cover Letter */}
                        <div className="mb-4">
                          <h5 className="mb-2">COVER LETTER</h5>
                          <div
                            className="bg-light p-3 rounded border"
                            style={{ whiteSpace: 'pre-wrap' }}
                          >
                            {selectedApplication.cover_letter || "No cover letter provided"}
                          </div>
                        </div>

                        {/* CV Download */}
                        <div className="mb-4">
                          <h5 className="mb-2">RESUME/CV</h5>
                          {selectedApplication.cv_path ? (
                            <button
                              onClick={() => window.open(selectedApplication.cv_path, "_blank")}
                              className="btn btn-success"
                            >
                              Download CV
                            </button>
                          ) : (
                            <p className="text-muted mb-0">No CV uploaded</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}