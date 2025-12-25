"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const JobPortalHeader = () => {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Open dropdown if on profile pages
  useEffect(() => {
    if (pathname?.startsWith('/job-portal/profile')) {
      setProfileDropdownOpen(true);
    }
  }, [pathname]);

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
                    className="nav-link dropdown-toggle job-portal-profile-dropdown d-flex align-items-center"
                    href="#"
                    id="profileDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="job-portal-profile-avatar">
                      {loading ? (
                        <span className="placeholder-glow">
                          <span className="placeholder rounded-circle" style={{ width: "36px", height: "36px" }}></span>
                        </span>
                      ) : (
                        <span className="profile-avatar-circle">
                          {getInitials(user)}
                        </span>
                      )}
                    </span>
                    
                    {loading ? (
                      <span
                        className="placeholder-glow"
                        style={{ minWidth: "120px", minHeight: "20px" }}
                      >
                        <span className="placeholder col-12"></span>
                      </span>
                    ) : (
                      <span className="job-portal-profile-name">
                        {user?.firstname || user?.email || " "}
                      </span>
                    )}
                    {/* <span className="material-icons-outlined job-portal-dropdown-arrow">expand_more</span> */}
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end job-portal-dropdown-menu"
                    aria-labelledby="profileDropdown"
                  >
                    <li>
                      <button className="dropdown-item job-portal-dropdown-item" onClick={handleLogout}>
                        <span className="material-icons-outlined">logout</span>
                        <span>Logout</span>
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
            <li className="sidebar-nav-item sidebar-nav-item-dropdown">
              <div 
                className={`sidebar-nav-link ${pathname?.startsWith('/job-portal/profile') ? 'active' : ''}`}
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                style={{ cursor: 'pointer' }}
              >
                <span className="material-icons-outlined sidebar-nav-icon">person</span>
                <span className="sidebar-nav-text">Profile</span>
                <span className={`material-icons-outlined sidebar-nav-arrow ${profileDropdownOpen ? 'open' : ''}`}>
                  expand_more
                </span>
              </div>
              {profileDropdownOpen && (
                <ul className="sidebar-submenu">
                  <li className="sidebar-submenu-item">
                    <Link 
                      href="/job-portal/profile" 
                      className={`sidebar-submenu-link ${pathname === '/job-portal/profile' ? 'active' : ''}`}
                    >
                      <span className="material-icons-outlined sidebar-submenu-icon">account_circle</span>
                      <span className="sidebar-submenu-text">View Profile</span>
                    </Link>
                  </li>
                  <li className="sidebar-submenu-item">
                    <Link 
                      href="/job-portal/profile/change-password" 
                      className={`sidebar-submenu-link ${pathname === '/job-portal/profile/change-password' ? 'active' : ''}`}
                    >
                      <span className="material-icons-outlined sidebar-submenu-icon">lock</span>
                      <span className="sidebar-submenu-text">Change Password</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default JobPortalHeader;