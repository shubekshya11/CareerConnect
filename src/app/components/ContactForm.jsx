"use client"
import React, { useState } from "react";
import ToastNotification from "./ToastNotification";
// import axios from "axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    contactNumber: "",
    organization: "",
    country: "United States",
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
      const response = await axios.post('/api/inquiry', formData);
      // const response = await axios.get('/api/testroute');;
    
      if (response.status === 200) {
        setSuccess(true);
        setShowToast(true);
        setMessage(response.data.message);
        setFormData({
          firstName: "",
          lastName: "",
          emailAddress: "",
          contactNumber: "",
          organization: "",
          country: "United States",
          text:""
        });
        setErrors({}); // Clear all errors on successful submission
      }
    } catch (error) {
      console.log(error.response);
      if(error.response.status === 400) {
        setSuccess(false);
        setShowToast(true);
        setMessage(error.response.data.message);
      }
      else {
        setSuccess(false);
        setShowToast(true);
        setMessage("An unexpected error occurred. Please try again later.");
      }
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
            <label htmlFor="country">Country <span className="text-danger">*</span></label>
            <select
              id="country"
              name="country"
              className="form-select"
              onChange={handleChange}
              required
            >
             <option value="United States">United States</option>
<option value="United Kingdom">United Kingdom</option>
<option value="Australia">Australia</option>
<option value="Canada">Canada</option>
<option value="India">India</option>
<option value="Nepal">Nepal</option>
<option value="Afghanistan">Afghanistan</option>
<option value="Albania">Albania</option>
<option value="Algeria">Algeria</option>
<option value="Andorra">Andorra</option>
<option value="Angola">Angola</option>
<option value="Antigua and Barbuda">Antigua and Barbuda</option>
<option value="Argentina">Argentina</option>
<option value="Armenia">Armenia</option>
<option value="Austria">Austria</option>
<option value="Azerbaijan">Azerbaijan</option>
<option value="Bahamas">Bahamas</option>
<option value="Bahrain">Bahrain</option>
<option value="Bangladesh">Bangladesh</option>
<option value="Barbados">Barbados</option>
<option value="Belarus">Belarus</option>
<option value="Belgium">Belgium</option>
<option value="Belize">Belize</option>
<option value="Benin">Benin</option>
<option value="Bhutan">Bhutan</option>
<option value="Bolivia">Bolivia</option>
<option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
<option value="Botswana">Botswana</option>
<option value="Brazil">Brazil</option>
<option value="Brunei">Brunei</option>
<option value="Bulgaria">Bulgaria</option>
<option value="Burkina Faso">Burkina Faso</option>
<option value="Burundi">Burundi</option>
<option value="Cabo Verde">Cabo Verde</option>
<option value="Cambodia">Cambodia</option>
<option value="Cameroon">Cameroon</option>
<option value="Central African Republic">Central African Republic</option>
<option value="Chad">Chad</option>
<option value="Chile">Chile</option>
<option value="China">China</option>
<option value="Colombia">Colombia</option>
<option value="Comoros">Comoros</option>
<option value="Congo (Congo-Brazzaville)">Congo (Congo-Brazzaville)</option>
<option value="Costa Rica">Costa Rica</option>
<option value="Croatia">Croatia</option>
<option value="Cuba">Cuba</option>
<option value="Cyprus">Cyprus</option>
<option value="Czech Republic (Czechia)">Czech Republic (Czechia)</option>
<option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
<option value="Denmark">Denmark</option>
<option value="Djibouti">Djibouti</option>
<option value="Dominica">Dominica</option>
<option value="Dominican Republic">Dominican Republic</option>
<option value="Ecuador">Ecuador</option>
<option value="Egypt">Egypt</option>
<option value="El Salvador">El Salvador</option>
<option value="Equatorial Guinea">Equatorial Guinea</option>
<option value="Eritrea">Eritrea</option>
<option value="Estonia">Estonia</option>
<option value="Eswatini">Eswatini</option>
<option value="Ethiopia">Ethiopia</option>
<option value="Fiji">Fiji</option>
<option value="Finland">Finland</option>
<option value="France">France</option>
<option value="Gabon">Gabon</option>
<option value="Gambia">Gambia</option>
<option value="Georgia">Georgia</option>
<option value="Germany">Germany</option>
<option value="Ghana">Ghana</option>
<option value="Greece">Greece</option>
<option value="Grenada">Grenada</option>
<option value="Guatemala">Guatemala</option>
<option value="Guinea">Guinea</option>
<option value="Guinea-Bissau">Guinea-Bissau</option>
<option value="Guyana">Guyana</option>
<option value="Haiti">Haiti</option>
<option value="Honduras">Honduras</option>
<option value="Hungary">Hungary</option>
<option value="Iceland">Iceland</option>
<option value="Indonesia">Indonesia</option>
<option value="Iran">Iran</option>
<option value="Iraq">Iraq</option>
<option value="Ireland">Ireland</option>
<option value="Israel">Israel</option>
<option value="Italy">Italy</option>
<option value="Ivory Coast">Ivory Coast</option>
<option value="Jamaica">Jamaica</option>
<option value="Japan">Japan</option>
<option value="Jordan">Jordan</option>
<option value="Kazakhstan">Kazakhstan</option>
<option value="Kenya">Kenya</option>
<option value="Kiribati">Kiribati</option>
<option value="Kuwait">Kuwait</option>
<option value="Kyrgyzstan">Kyrgyzstan</option>
<option value="Laos">Laos</option>
<option value="Latvia">Latvia</option>
<option value="Lebanon">Lebanon</option>
<option value="Lesotho">Lesotho</option>
<option value="Liberia">Liberia</option>
<option value="Libya">Libya</option>
<option value="Liechtenstein">Liechtenstein</option>
<option value="Lithuania">Lithuania</option>
<option value="Luxembourg">Luxembourg</option>
<option value="Madagascar">Madagascar</option>
<option value="Malawi">Malawi</option>
<option value="Malaysia">Malaysia</option>
<option value="Maldives">Maldives</option>
<option value="Mali">Mali</option>
<option value="Malta">Malta</option>
<option value="Marshall Islands">Marshall Islands</option>
<option value="Mauritania">Mauritania</option>
<option value="Mauritius">Mauritius</option>
<option value="Mexico">Mexico</option>
<option value="Micronesia">Micronesia</option>
<option value="Moldova">Moldova</option>
<option value="Monaco">Monaco</option>
<option value="Mongolia">Mongolia</option>
<option value="Montenegro">Montenegro</option>
<option value="Morocco">Morocco</option>
<option value="Mozambique">Mozambique</option>
<option value="Myanmar (Burma)">Myanmar (Burma)</option>
<option value="Namibia">Namibia</option>
<option value="Nauru">Nauru</option>
<option value="Netherlands">Netherlands</option>
<option value="New Zealand">New Zealand</option>
<option value="Nicaragua">Nicaragua</option>
<option value="Niger">Niger</option>
<option value="Nigeria">Nigeria</option>
<option value="North Korea">North Korea</option>
<option value="North Macedonia">North Macedonia</option>
<option value="Norway">Norway</option>
<option value="Oman">Oman</option>
<option value="Pakistan">Pakistan</option>
<option value="Palau">Palau</option>
<option value="Palestine State">Palestine State</option>
<option value="Panama">Panama</option>
<option value="Papua New Guinea">Papua New Guinea</option>
<option value="Paraguay">Paraguay</option>
<option value="Peru">Peru</option>
<option value="Philippines">Philippines</option>
<option value="Poland">Poland</option>
<option value="Portugal">Portugal</option>
<option value="Qatar">Qatar</option>
<option value="Romania">Romania</option>
<option value="Russia">Russia</option>
<option value="Rwanda">Rwanda</option>
<option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
<option value="Saint Lucia">Saint Lucia</option>
<option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
<option value="Samoa">Samoa</option>
<option value="San Marino">San Marino</option>
<option value="Sao Tome and Principe">Sao Tome and Principe</option>
<option value="Saudi Arabia">Saudi Arabia</option>
<option value="Senegal">Senegal</option>
<option value="Serbia">Serbia</option>
<option value="Seychelles">Seychelles</option>
<option value="Sierra Leone">Sierra Leone</option>
<option value="Singapore">Singapore</option>
<option value="Slovakia">Slovakia</option>
<option value="Slovenia">Slovenia</option>
<option value="Solomon Islands">Solomon Islands</option>
<option value="Somalia">Somalia</option>
<option value="South Africa">South Africa</option>
<option value="South Korea">South Korea</option>
<option value="South Sudan">South Sudan</option>
<option value="Spain">Spain</option>
<option value="Sri Lanka">Sri Lanka</option>
<option value="Sudan">Sudan</option>
<option value="Suriname">Suriname</option>
<option value="Sweden">Sweden</option>
<option value="Switzerland">Switzerland</option>
<option value="Syria">Syria</option>
<option value="Tajikistan">Tajikistan</option>
<option value="Tanzania">Tanzania</option>
<option value="Thailand">Thailand</option>
<option value="Timor-Leste">Timor-Leste</option>
<option value="Togo">Togo</option>
<option value="Tonga">Tonga</option>
<option value="Trinidad and Tobago">Trinidad and Tobago</option>
<option value="Tunisia">Tunisia</option>
<option value="Turkey">Turkey</option>
<option value="Turkmenistan">Turkmenistan</option>
<option value="Tuvalu">Tuvalu</option>
<option value="Uganda">Uganda</option>
<option value="Ukraine">Ukraine</option>
<option value="United Arab Emirates">United Arab Emirates</option>
<option value="Uruguay">Uruguay</option>
<option value="Uzbekistan">Uzbekistan</option>
<option value="Vanuatu">Vanuatu</option>
<option value="Vatican City">Vatican City</option>
<option value="Venezuela">Venezuela</option>
<option value="Vietnam">Vietnam</option>
<option value="Yemen">Yemen</option>
<option value="Zambia">Zambia</option>
<option value="Zimbabwe">Zimbabwe</option>

            </select>
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
          <button type="submit" className="my-3 btn btn-sakchha-primary" disabled={loading}>
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
