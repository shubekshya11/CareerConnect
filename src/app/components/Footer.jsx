"use client"
import React, { useEffect, useState } from 'react';

const Footer = () => {
    const [currentYear, setCurrentYear] = useState(null);

    useEffect(() => {
        // Set the current year only on the client side
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <>
            <div className="container">
                <div className="content-wrapper">
                    <div className="company-details">
                        <div className="logo">
                        <img src="/images/sakchha-footer-logo.svg" alt="Sakchha Technology" />
                        <div className='pt-2 fw-light'><i>We’re the Sherpas for your business. Let us do the heavy lifting for you.</i></div>
                        </div>
                        <div className="company-info">
                            <div className="address">
                            <i className="material-icons">location_on</i>
                            <span>Dhobighat Road, Lalitpur 44600, Nepal</span>
                            </div>
                            <div className="phone"><i className="material-icons">phone</i> +977-9802304960</div>
                            <div className="email"><i className="material-icons">email</i>
                            <span>info@sakchha.com</span>
                            </div>
                        </div>
                        <div className="small-text">Strengthen your team with talented professionals from Nepal who can help increase your capacity more efficiently than local hires.</div>
                    </div>

                        <div className="quick-links">
                            <h5>Quick Access</h5>
                            <ul className="borderBottom">
                                <li><i className="material-icons">arrow_outward</i><a href="/">Home</a></li>
                                <li><i className="material-icons">arrow_outward</i><a href="/about">About Us</a></li>
                                <li><i className="material-icons">arrow_outward</i><a href="/marketplace">Marketplace</a></li>
                                <li><i className="material-icons">arrow_outward</i><a href="/blogs">Blogs</a></li>
                                <li><i className="material-icons">arrow_outward</i><a href="/contact">Contact</a></li>
                            </ul>
                        </div>


                        <div className="quick-links">
                            <h5>Useful Links</h5>
                            <ul>
                                <li><a href="/distributors">Distributors</a></li>
                                <li><a href="/privacy">Privacy Policy</a></li>
                                <li><a href="/copyright">Copyright Infringement Policy</a></li>
                                <li><a href="/terms-and-conditions">Terms and Conditions</a></li>
                            </ul>
                        </div>


                        <div className="quick-links useful-links">
                        <h5>Get In Touch</h5>
                        <ul>
                            <li><a href="/contact">Get an Inquiry</a></li>
                            <li><a href="https://app.sakchha.com/account/register">Join Our Platform</a></li>
                        </ul>
                        <ul className="borderBottom">
                        <li><i className="material-icons">arrow_outward</i><a href="https://app.sakchha.com/account/register?type=Buyer" target='_blank'>Register As a Buyer</a></li>
                                <li><i className="material-icons">arrow_outward</i><a href="https://app.sakchha.com/account/register?type=Provider" target='_blank'>Register As a Provider</a></li>
                        </ul>

                        </div>

                </div>
            </div>
            <div className="row mt-5 py-4 copy-right">
                    <div className="col-md-12">
                        <p className="mb-0 fw-light text-center">
                            &copy; {currentYear || ''} Sakchha Technology Pvt. Ltd. All rights reserved.
                        </p>
                    </div>
                </div>
        </>
    );
};

export default Footer;
