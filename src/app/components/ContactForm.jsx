"use client"
import React, { useState } from "react";
import ToastNotification from "./ToastNotification";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    contactNumber: "",
    organization: "",
    text: "",
  });
  // loading state
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    // Check for empty or whitespace-only input
    if (!value || value.trim() === "") {
      newErrors[name] = "This field cannot contain only space or only other special characters.";
      setErrors(newErrors);
      return false;
    }
    
    // Check for special characters only (no letters or numbers) - skip for contactNumber
    if (name !== "contactNumber" && !/[a-zA-Z0-9]/.test(value.trim())) {
      newErrors[name] = "This field cannot contain only special characters.";
      setErrors(newErrors);
      return false;
    }
    
    // Specific validation for firstName and lastName (only alphabetic characters)
    if (name === "firstName" || name === "lastName") {
      if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
        newErrors[name] = "Name can only contain alphabetic characters and spaces.";
        setErrors(newErrors);
        return false;
      }
    }
    
    // Specific validation for contactNumber (only numbers, spaces, +, and -)
    if (name === "contactNumber") {
      if (!/^[\+0-9\s\-]+$/.test(value.trim())) {
        newErrors[name] = "Contact number can only contain numbers, spaces, plus sign (+), and hyphens (-).";
        setErrors(newErrors);
        return false;
      }
    }
    
    // Specific validation for emailAddress
    if (name === "emailAddress") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        newErrors[name] = "Please enter a valid email address.";
        setErrors(newErrors);
        return false;
      }
    }
    
    // Clear error if validation passes
    delete newErrors[name];
    setErrors(newErrors);
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user is typing (don't validate while typing)
    const newErrors = { ...errors };
    delete newErrors[name];
    setErrors(newErrors);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    // Validate field only when user leaves the field
    if (value !== "") {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const fieldsToValidate = ['firstName', 'lastName', 'emailAddress', 'contactNumber', 'organization', 'text'];
    let hasErrors = false;
    
    fieldsToValidate.forEach(field => {
      if (!validateField(field, formData[field])) {
        hasErrors = true;
      }
    });
    
    if (hasErrors) {
      setSuccess(false);
      setShowToast(true);
      setMessage("Please fix the validation errors before submitting.");
      setTimeout(() => setShowToast(false), 5000);
      return;
    }
    
    setLoading(true); // set loading to true while sending the request
    
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
    
      const data = await response.json();
    
      if (response.status === 200) {
        setSuccess(true);
        setShowToast(true);
        setMessage(data.message);
        setFormData({
          firstName: "",
          lastName: "",
          emailAddress: "",
          contactNumber: "",
          organization: "",
          text:""
        });
        setErrors({}); 
      } else {
        setSuccess(false);
        setShowToast(true);
        setMessage(data.message || "An unexpected error occurred. Please try again later.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSuccess(false);
      setShowToast(true);
      setMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false); // set loading to false after the request is completed
      setTimeout(() => setShowToast(false), 5000); // hide the toast after 5 seconds
    }
  }

  return (
    <div className="contact-form">
  
      <div className='form-container'>
        <form className="form-group row" onSubmit={handleSubmit}>
          <div className="col-md-6 col-12">
            <label htmlFor="firstname">First Name <span className="text-danger">*</span></label>
            <input
              type="text"
              id="firstname"
              name="firstName"
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.firstName && <div className="invalid-feedback d-block">{errors.firstName}</div>}
          </div>
          <div className="col-md-6 col-12">
            <label htmlFor="lastname">Last Name <span className="text-danger">*</span></label>
            <input
              type="text"
              id="lastname"
              name="lastName"
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.lastName && <div className="invalid-feedback d-block">{errors.lastName}</div>}
          </div>
          <div className="col-md-6 col-12">
            <label htmlFor="email">Email <span className="text-danger">*</span></label>
            <input
              type="email"
              id="email"
              name="emailAddress"
              className={`form-control ${errors.emailAddress ? 'is-invalid' : ''}`}
              value={formData.emailAddress}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.emailAddress && <div className="invalid-feedback d-block">{errors.emailAddress}</div>}
          </div>
          <div className="col-md-6 col-12">
            <label htmlFor="contact">Contact No. <span className="text-danger">*</span></label>
            <input
              type="text"
              id="contact"
              name="contactNumber"
              className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
              value={formData.contactNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              pattern="[\+0-9\s\-]+"
              required
            />
            {errors.contactNumber && <div className="invalid-feedback d-block">{errors.contactNumber}</div>}
          </div>
          <div className="col-12">
            <label htmlFor="company-name">Company/Organization Name <span className="text-danger">*</span></label>
            <input
              type="text"
              id="company-name"
              name="organization"
              className={`form-control ${errors.organization ? 'is-invalid' : ''}`}
              value={formData.organization}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.organization && <div className="invalid-feedback d-block">{errors.organization}</div>}
          </div>
          <div className="col-12">
            <label htmlFor="text">Leave a Message: <span className="text-danger">*</span></label>
            <textarea
              id="text"
              name="text"
              placeholder="Type your message here..."
              className={`form-control ${errors.text ? 'is-invalid' : ''}`}
              value={formData.text}
              onChange={handleChange}
              onBlur={handleBlur}
              required
           >
            </textarea>
            {errors.text && <div className="invalid-feedback d-block">{errors.text}</div>}
          </div>
          <div className="col-12">
          <button type="submit" className="my-3 btn btn-career-primary" disabled={loading}>
          {loading ? <span className="d-flex align-items-center justify-content-center gap-1"><i className="material-icons loading-animation">refresh</i> <span>Sending Inquiry</span></span> : <span className="d-flex align-items-center justify-content-center">Send Us An Inquiry</span>}
          </button>
          </div>
        </form>
      </div>

       {/* Toast Notification */}
       <ToastNotification
        show={showToast}
        success={success}
        message={message}
        onClose={() => setShowToast(false)}
      />

    </div>
  );
};

export default ContactForm;
