"use client"
import React, { useEffect } from "react";

const ToastNotification = ({ show, success, message, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Automatically close after 3 seconds
      return () => clearTimeout(timer); // Cleanup the timer on unmount or when `show` changes
    }
  }, [show, onClose]);

  return (
    <div
      className={`toast align-items-center position-fixed bottom-0 end-0 m-3 ${
        show ? "show" : "hide"
      }`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ zIndex: 1055 }}
    >
      <div className={`d-flex` + (success ? " toast-success" : " toast-error")}>
        <div className="toast-body d-flex align-items-center gap-2">
          {success ? (
            <i className="material-icons">check_circle</i>
          ) : (
            <i className="material-icons">cancel</i>
          )}
          {message}
        </div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          aria-label="Close"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;
