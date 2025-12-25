"use client";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const JobPortalHeader = () => {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

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
        <div className="sidebar-user-section">
          <div className="sidebar-avatar">
            {loading ? (
              <span className="placeholder-glow">
                <span className="placeholder rounded-circle" style={{ width: "56px", height: "56px" }}></span>
              </span>
            ) : (
              <span className="avatar-circle">
                {getInitials(user)}
              </span>
            )}
          </div>
          <div className="sidebar-user-info">
            {loading ? (
              <span className="placeholder-glow d-block mb-1">
                <span className="placeholder" style={{ width: "80%", height: "18px" }}></span>
              </span>
            ) : (
              <div className="sidebar-user-name">
                {`${user?.firstname || ''} ${user?.lastname || ''}`.trim() || "User"}
              </div>
            )}
            {loading ? (
              <span className="placeholder-glow d-block">
                <span className="placeholder" style={{ width: "60%", height: "14px" }}></span>
              </span>
            ) : (
              <div className="sidebar-user-email">
                {user?.email || ""}
              </div>
            )}
          </div>
        </div>

        <div className="sidebar-nav-links">
          <ul className="sidebar-nav-list">
            <li className="sidebar-nav-item">
              <Link 
                href="/job-portal" 
                className={`sidebar-nav-link ${pathname === '/job-portal' ? 'active' : ''}`}
              >
                <span className="material-icons-outlined sidebar-nav-icon">dashboard</span>
                <span className="sidebar-nav-text">Dashboard</span>
              </Link>
            </li>
            <li className="sidebar-nav-item">
              <Link 
                href="/job-portal/AppliedJobs" 
                className={`sidebar-nav-link ${pathname === '/job-portal/AppliedJobs' ? 'active' : ''}`}
              >
                <span className="material-icons-outlined sidebar-nav-icon">business_center</span>
                <span className="sidebar-nav-text">Applied Jobs</span>
              </Link>
            </li>
            <li className="sidebar-nav-item">
              <Link 
                href="/job-portal/profile" 
                className={`sidebar-nav-link ${pathname?.startsWith('/job-portal/profile') ? 'active' : ''}`}
              >
                <span className="material-icons-outlined sidebar-nav-icon">person</span>
                <span className="sidebar-nav-text">Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default JobPortalHeader;