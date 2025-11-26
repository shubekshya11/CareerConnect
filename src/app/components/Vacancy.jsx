"use client"
import React from 'react'

const Vacancy = () => {
  return (
    <section id="skills-in-demand">
        <div className="container">
        <div className="row pb-5 align-items-center">
          <div className="section-title col-md-6 col-12">
            <h1 className="pb-3">SKILLS IN DEMAND</h1>
            <h2 className="fw-light pb-3">
            We’re Always Looking For Skilled Professionals
            </h2>
            <p className='pt-3 normal-lg fw-light'>
            Our mission is to connect talented individuals with exciting opportunities. If you’re an experienced professional we have roles that suit your expertise. 
            </p>
            <p className='pt-3 normal-lg fw-light'>
            Explore new challenges, grow your skills, and make a meaningful impact in your field.
            </p>
            <div className="cta pt-5">
                <a href="/careers" className="btn btn-sakchha-outline">Browse More Jobs</a>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="ps-5 vacancy-list">
                {/* vacancy list item */}
                <div className="list-item d-flex gap-3 align-items-start">
                    <div className="image">
                    <img src="/images/icons-vacancy-user.svg" alt="vacancy" />
                    </div>
                    <div className="post-content">
                        <div className="vacant-position normal-lg fw-medium">Salesforce Developer</div>
                        <div className="department fw-light">Information Technology</div>
                    </div>
                </div>
                         {/* vacancy list item */}
                <div className="list-item d-flex gap-3 align-items-start">
                    <div className="image">
                    <img src="/images/icons-vacancy-user.svg" alt="vacancy" />
                    </div>
                    <div className="post-content">
                        <div className="vacant-position normal-lg fw-medium">Salesforce Developer</div>
                        <div className="department fw-light">Information Technology</div>
                    </div>
                </div>

                {/* vacancy list item */}
                <div className="list-item d-flex gap-3 align-items-start">
                    <div className="image">
                    <img src="/images/icons-vacancy-user.svg" alt="vacancy" />
                    </div>
                    <div className="post-content">
                        <div className="vacant-position normal-lg fw-medium">Salesforce Developer</div>
                        <div className="department fw-light">Information Technology</div>
                    </div>
                </div>
                {/* vacancy list item */}
                <div className="list-item d-flex gap-3 align-items-start">
                    <div className="image">
                    <img src="/images/icons-vacancy-user.svg" alt="vacancy" />
                    </div>
                    <div className="post-content">
                        <div className="vacant-position normal-lg fw-medium">Salesforce Developer</div>
                        <div className="department fw-light">Information Technology</div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        </div>
    </section>
  )
}

export default Vacancy