"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import ToastNotification from "../components/ToastNotification";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { checkAuthStatus } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowToast(false);
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        setShowToast(true);
      } else {
        await checkAuthStatus();
        router.push("/job-portal");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
      setShowToast(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  return (
    <div className="container-fluid vh-100 bg-white">
      <div className="row h-100">

        {/* LEFT COLUMN */}
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center p-5 bg-light border-end">
          <h2 className="fw-bold text-center mb-4" style={{ fontSize: "2rem" }}>
            Welcome to Career Connect
          </h2>

          <p className="lead text-center mb-3">
            Get Started Today!
          </p>

          <p className="lead text-center mb-4">
            To apply, you must login here.
          </p>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center p-4">
          <div className="w-100" style={{ maxWidth: "380px" }}>
            <form className="form-group d-flex flex-column gap-3" onSubmit={handleSubmit}>
              
              <div className="text-center mb-3">
                <img 
                  src="/images/BlackNormal.png" 
                  alt="Logo" 
                  style={{ width: "250px", height: "auto" }} 
                />
              </div>

              <h1 className="text-center mb-3">CareerConnect Login</h1>

              <input
                type="text"
                name="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="btn btn-career-primary w-100"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-muted mt-2 mb-0">
  Don't have an account?{" "}
  <a href="/register" className="text-muted text-decoration-underline-hover">
    Register here
  </a>
</p>
            </form>

            {/* Toast */}
            <ToastNotification
              show={showToast}
              success={false}
              message={error}
              onClose={() => setShowToast(false)}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
