import React from "react";
import { useAdminAuth } from "../context/AdminContext";
import { useRouter } from "next/navigation";

const AdminHeader = () => {
  const { logout } = useAdminAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/sk-admin");
    router.refresh();
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <a className="navbar-brand d-flex align-items-center" href="/admin">
              Admin Dashboard
              {process.env.NODE_ENV == "development" && (
                <span
                  className="badge bg-warning text-dark ms-2 d-flex align-items-center"
                  style={{ fontSize: "0.75rem" }}
                  title="Development Mode"
                >
                  <span
                    className="material-icons"
                    style={{ fontSize: "14px", marginRight: "2px" }}
                  >
                    code
                  </span>
                  DEV
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
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/admin/blog-portal">
                    Blog Portal
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/admin/file-manager">
                    File Manager
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/admin/job-manager">
                    Job Manager
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/admin/applications-review">
                    Applications Review
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/blogs">
                    Blogs
                  </a>
                </li>

                <li className="nav-item">
                  <button className="nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default AdminHeader;
