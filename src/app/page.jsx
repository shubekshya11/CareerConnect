import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HeroSlider from "./components/HeroSlider.jsx";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSlider />

        <section id="careers-highlight" className="highlight-section py-5">
          <div className="container">
            <div className="highlight-surface">
              <div className="row align-items-center gy-4">
                <div className="col-lg-6">
                  <h1 className="display-5 fw-bold mb-2">
                    Careers
                  </h1>
                  <h2 className="display-6 fw-semibold mb-4">
                    Find your next role with us
                  </h2>
                  <p className="lead fw-normal text-body-secondary mb-4">
                    Browse live openings, learn about the roles, and apply online. The
                    careers portal lists every job we are hiring for today.
                  </p>
                  <div className="d-flex flex-wrap gap-3">
                    <a href="/careers" className="btn btn-career-primary">
                      View open roles
                    </a>
                    <a href="/job-portal" className="btn btn-career-outline">
                      Go to job portal
                    </a>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="info-panel shadow-sm">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3 className="h5 fw-semibold mb-0">Why apply through us?</h3>
                      <span className="badge text-bg-light">Guided experience</span>
                    </div>
                    <ul className="feature-list list-unstyled m-0">
                      <li className="feature-item">
                        <span className="icon-circle primary">
                          <span className="material-icons">library_books</span>
                        </span>
                        <div>
                          <p className="mb-1 fw-semibold">Detailed job briefs</p>
                          <p className="mb-0 text-muted">
                            Learn about responsibilities, growth, and benefits before applying.
                          </p>
                        </div>
                      </li>
                      <li className="feature-item">
                        <span className="icon-circle success">
                          <span className="material-icons">verified</span>
                        </span>
                        <div>
                          <p className="mb-1 fw-semibold">Transparent process</p>
                          <p className="mb-0 text-muted">
                            Track your application inside the job portal with status updates.
                          </p>
                        </div>
                      </li>
                      <li className="feature-item">
                        <span className="icon-circle info">
                          <span className="material-icons">contact_support</span>
                        </span>
                        <div>
                          <p className="mb-1 fw-semibold">Support team</p>
                          <p className="mb-0 text-muted">
                            Get help from our recruiters whenever you need clarification.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 bg-light">
          <div className="container">
            <div className="row align-items-center gy-4">
              <div className="col-lg-6">
                <h2 className="display-6 fw-semibold mb-4">
                  Your Career Journey Starts Here
                </h2>
                <p className="lead fw-normal text-body-secondary mb-4">
                  Our comprehensive job portal is designed to streamline your job search experience. 
                  Create your professional profile, browse through curated opportunities, and manage 
                  all your applications in one centralized platform.
                </p>
                <p className="text-body-secondary mb-4">
                  With search options, application tracking, and secure document 
                  management, finding your dream job has never been easier. Join professionals 
                  who have successfully landed their ideal roles through CareerConnect.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <a href="/job-portal" className="btn btn-career-primary">
                    Access Job Portal
                  </a>
                  <a href="/job-portal/profile" className="btn btn-career-outline">
                    Create Profile
                  </a>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="position-relative">
                  <img 
                    src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=80" 
                    alt="Job Portal Dashboard" 
                    className="img-fluid rounded-4 shadow-lg"
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-r from-primary/20 to-transparent rounded-4"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="job-portal-highlight" className="highlight-section inverse py-5">
          <div className="container">
            <div className="highlight-surface">
              <div className="row align-items-center gy-4">
                <div className="col-lg-6 order-lg-2">
                  
                  <h2 className="display-6 fw-semibold mb-3">
                    Manage your applications in one place
                  </h2>
                  <p className="lead fw-normal text-body-secondary mb-4">
                    The job portal is where candidates register, update profiles, and track every
                    application from submission to hiring.
                  </p>
                  <ul className="feature-bullets list-unstyled">
                    <li className="d-flex align-items-center gap-2">
                      <span className="icon-circle ghost">
                        <span className="material-icons">dashboard_customize</span>
                      </span>
                      <span>Personal dashboard with application status</span>
                    </li>
                    <li className="d-flex align-items-center gap-2">
                      <span className="icon-circle ghost">
                        <span className="material-icons">lock</span>
                      </span>
                      <span>Secure document uploads for CVs</span>
                    </li>
                  </ul>
                  <div className="d-flex flex-wrap gap-3 mt-3">
                    <a href="/job-portal" className="btn btn-career-primary">
                      Visit job portal
                    </a>
                    <a
                      href="/job-portal/profile"
                      className="btn btn-career-outline"
                    >
                      Update profile
                    </a>
                  </div>
                </div>

                <div className="col-lg-6 order-lg-1">
                  <div className="info-panel shadow-sm">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3 className="h5 fw-semibold mb-0">How it works</h3>
                      <span className="badge text-bg-light">3 simple steps</span>
                    </div>
                    <ol className="step-list list-unstyled m-0">
                      <li className="step-item">
                        <span className="step-number">01</span>
                        <p className="mb-0">Create an account or sign in to your career profile.</p>
                      </li>
                      <li className="step-item">
                        <span className="step-number">02</span>
                        <p className="mb-0">
                          Search jobs, review the details, and submit an online application.
                        </p>
                      </li>
                      <li className="step-item">
                        <span className="step-number">03</span>
                        <p className="mb-0">Upload requested files, and receive updates.</p>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}