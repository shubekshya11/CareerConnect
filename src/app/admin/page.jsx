"use client"
import { useAdminAuth } from '../context/AdminContext'
import AdminDashboard from './AdminDashboard'

export default function AdminPage() {
  const { user, isLoading } = useAdminAuth()

  if (isLoading) {
    return (
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-auto">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <AdminDashboard user={user} />
}