"use client";
import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ToastNotification from "../../components/ToastNotification"; 

const VerifyEmailContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [showToast, setShowToast] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = e.target.otp.value;
    setShowToast(false);
    setIsLoading(true);

    try {
      const res = await fetch("/api/register/verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/login");
      } else {
        setError(data.error || "Invalid verification code.");
        setShowToast(true);
      }
    } catch (error) {
      setError("An error occurred while verifying your email.");
      setShowToast(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <form
          onSubmit={handleSubmit}
          className="form-group d-flex flex-column gap-3"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <div className="text-center mb-3">
            <img
              src="/images/logo.svg"
              alt="Sakchha Logo"
              className="mb-1"
              style={{ width: "100px" }}
            />
          </div>
          <h2 className="text-center">Verify Your Email</h2>
            <p className="text-center text-muted mb-3">
              Enter the 6-digit verification code 
            </p>
          <input
            type="text"
            id="otp"
            name="otp"
            className="form-control text-center"
            maxLength={6}
            placeholder="Enter verification code"
            required
          />

          <button
            type="submit"
            className="btn btn-sakchha-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </div>

      {/* Toast Notification */}
      <ToastNotification
        show={showToast}
        success={false}
        message={error}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

const VerifyEmail = () => {
  return (
    <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
};

export default VerifyEmail;
