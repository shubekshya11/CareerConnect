"use client"
import AdminHeader from './AdminHeader';

export default function AdminDashboard({ user }) {
  return (
    <>
      <AdminHeader />
      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-primary">Welcome, {user?.username || 'Admin'}!</h5>
            <p className="card-text text-muted">
              Use the links below to navigate to the admin portals.
            </p>
            <ul className="list-group my-3 d-flex flex-column gap-2">
              <li className="list-group-item border-top-0 border-start-0 border-end-0">
                <a href="/admin/job-manager" className="text-decoration-none text-dark">
                  <i className="bi bi-pencil-square me-2"></i> Job Manager
                </a>
              </li>
              <li className="list-group-item border-top-0 border-start-0 border-end-0">
                <a href="/admin/applications-review" className="text-decoration-none text-dark">
                  <i className="bi bi-pencil-square me-2"></i> Applications Review
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
