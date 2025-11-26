"use client";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const JobPortalHeader = () => {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
    router.refresh();
  };

  // Helper to get initials from user name or email
  const getInitials = (user) => {
    if (!user) return "";
    if (user?.name) {
      const names = user.name.split(" ");
      return names.length === 1
        ? names[0][0]
        : names[0][0] + names[names.length - 1][0];
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "P";
  };

  return (
    <>
      <header id="job-header">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/job-portal">
              <img
                src="/images/sakchha-careers-logo.svg"
                alt="Sakchha Careers"
              />
              {process.env.NODE_ENV == 'development' && (
                <span className="dev-mode-badge" title="Development Mode">
                  DEV MODE
                </span>
              )}
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    id="profileDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span
                      className="rounded-circle bg-light text-primary fw-bold d-flex justify-content-center align-items-center me-2"
                      style={{
                        width: "32px",
                        height: "32px",
                        fontSize: "1rem",
                      }}
                    >
                      {loading ? "" : getInitials(user)}
                    </span>
                    
                    {loading ? (
                      <span
                        className="placeholder-glow"
                        style={{ minWidth: "120px", minHeight: "20px" }}
                      >
                        <span className="placeholder col-12"></span>
                      </span>
                    ) : (
                      user?.firstname || user?.email || " "
                    )}
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="profileDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="/job-portal/profile">
                        View Profile
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="/job-portal/profile/change-password">
                        Change Password
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div id="job-sidenav">
        <div className="d-flex align-items-center p-3 px-3">
          <span
            className="rounded-circle bg-secondary-light text-white d-flex justify-content-center align-items-center me-2"
            style={{
              minWidth: "48px",
              minHeight: "48px",
              fontSize: "1.5rem",
            }}
          >
            {loading ? "" : getInitials(user)}
          </span>
          <div className="h5 fw-light" style={{flexBasis: '100%'}}>
            {/* Sidebar */}
            {loading ? (
              <span className="placeholder-glow">
                <span className="placeholder w-100" style={{ height: "24px" }}></span>
              </span>
            ) : (
              `${user?.firstname || ''} ${user?.lastname || ''}`.trim() || user?.email || " "
            )}
          </div>
        </div>

        <div className="nav-links d-flex flex-column">
          <ul className="navbar-nav">
            <li className="nav-item d-flex align-items-center">
              <span className="material-icons-outlined me-2">dashboard</span>
              <a className="nav-link p-0" href="/job-portal">
                Dashboard
              </a>
            </li>
            <li className="nav-item d-flex align-items-center mt-2">
              <span className="material-icons-outlined me-2">
                business_center
              </span>
              <a className="nav-link p-0" href="/job-portal/AppliedJobs">
                Applied Jobs
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default JobPortalHeader;