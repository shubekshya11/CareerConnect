"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ToastNotification from "./ToastNotification";

export default function RegisterForm() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!/^[A-Za-z\s]*$/.test(form.firstname.trim())) {
      setError("First name should contain only characters");
      return false;
    }
    if (!/^[A-Za-z\s]*$/.test(form.lastname.trim())) {
      setError("Last name should contain only characters");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      setError("Phone number must be exactly 10 digits");
      return false;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowToast(false);
    setError("");
    setSuccess("");

    // Validate form
    if (!validateForm()) {
      setShowToast(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        setShowToast(true);
      } else {
        setSuccess("Registration successful! Please verify your email.");
        setShowToast(true);
        router.push(`/register/verify-email?email=${encodeURIComponent(data.email)}`);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      setShowToast(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  return (
    <>
      <form
        className="form-group d-flex flex-column gap-3"
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <div className="career-login-img text-center mb-3">
          <img
            src="/images/BlackNormal.png"
            alt="careerConnect Register"
            style={{ width: "250px", height: "auto" }}
          />
        </div>

        <h1 className="text-center">Create an Account</h1>

        <div className="row">
          <div className="col-md-6 mb-2">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              className="form-control"
              value={form.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-2">
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              className="form-control"
              value={form.lastname}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="form-control"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="form-control"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="btn btn-career-primary"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-muted mt-2 mb-0">
          Already have an account?{" "}
          <a href="/login" className="login-link">
            Login here
          </a>
        </p>
      </form>

      {/* Toast Notification */}
      <ToastNotification
        show={showToast}
        success={!!success}
        message={success || error}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}