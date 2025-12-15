"use client"
import React, { useEffect, useState } from 'react';

const Footer = () => {
    const [currentYear, setCurrentYear] = useState(null);

    useEffect(() => {
        // Set the current year only on the client side
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="pt-4">
            <div className="container">
                <div className="content-wrapper">
                    <div className="company-details">
                        <div className="logo">
                            <img src="/images/WhiteNormal.png" alt="CareerConnect" width="200" />
                        </div>
                        <div className="company-info">
                            <div className="email">
                                <i className="material-icons">email</i>
                                <span>info@careerconnect.com</span>
                            </div>
                            <div className="phone">
                                <i className="material-icons">phone</i> +977-1234567890
                            </div>
                        </div>
                    </div>

                    <div className="quick-links">
                        <h5>Quick Links</h5>
                        <ul>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/about">About</a>
                            </li>
                            <li>
                                <a href="/careers">Careers</a>
                            </li>
                            <li>
                                <a href="/job-portal">Job Portal</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row mt-3 py-3 copy-right">
                <div className="col-md-12">
                    <p className="mb-0 fw-light text-center">
                        &copy; {currentYear || ""} Career Connect Pvt. Ltd. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
