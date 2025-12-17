"use client";
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ToastNotification from "../components/ToastNotification";
import { useAdminAuth } from '../context/AdminContext';

export default function SkAdmin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { checkAdminAuthStatus, admin } = useAdminAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    setShowToast(false);  // Hide the toast initially when submitting
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/adminSignin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Ensure cookies set by the server (httpOnly) are accepted by the browser
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        setShowToast(true); // Show the toast notification
      } else {
        // Update auth context (tokens are in httpOnly cookies). checkAdminAuthStatus
        // now returns the admin user (if any) so we can immediately decide about navigation
        const adminUser = await checkAdminAuthStatus();
        if (adminUser && adminUser.role === 'admin') {
          router.push("/admin");
        } else {
          setError('Login succeeded but authentication cookie not found. Please ensure cookies are enabled.');
          setShowToast(true);
        }
      }
    } catch (error) {
      // In case of network or unexpected errors
      setError("An unexpected error occurred. Please try again later.");
      setShowToast(true); // Show the toast notification for errors
    } finally {
      setIsLoading(false);
      // Optionally close the toast after 5 seconds
      setTimeout(() => setShowToast(false), 5000);
    }
  }
  return (
    <>
        <form
          className="form-group d-flex flex-column gap-3"
          onSubmit={handleSubmit}
        >
          <div className="career-login-img text-center">
            <img src="/images/BlackNormal.png" alt="CareerConnect Login" width="250" />
          </div>
          <h1 className="text-center">CareerConnect Login</h1>
          <input
            type="text"
            name="username"
            placeholder="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn btn-career-primary"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        {/* Toast Notification */}
        <ToastNotification
          show={showToast}
          success={false} // For failure, success is false
          message={error}
          onClose={() => setShowToast(false)} // Close toast when clicked
        />
    </>
  );
}
