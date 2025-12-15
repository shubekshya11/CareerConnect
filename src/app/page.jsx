import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HeroSlider from "./components/HeroSlider.jsx";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSlider />
        <section id="value-props" className="py-5">
          <div className="container">
            <div className="row align-items-end mb-4">
              <div className="col-lg-7">
                <p className="text-primary fw-semibold mb-2">Why Career Connect?</p>
                <h2 className="display-6 fw-semibold">Built for fast-moving teams</h2>
                <p className="lead fw-light">
                  We combine vetted talent from Nepal with reliable processes so you get consistent delivery, predictable costs, and a partner that scales when you do.
                </p>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-lg-4">
                <div className="card h-100 shadow-sm border-0 value-card">
                  <div className="card-body">
                    <div className="icon-circle bg-primary-subtle mb-3">
                      <span className="material-icons">group_work</span>
                    </div>
                    <h4 className="mb-2">Dedicated pods</h4>
                    <p className="text-muted">
                      Cross-functional pods that plug into your workflows and stay with you for the long run.
                    </p>
                    <ul className="list-unstyled small text-muted mb-0">
                      <li className="d-flex align-items-center gap-2 mb-2">
                        <span className="material-icons text-primary">check_circle</span>
                        Daily standups and clear SLAs
                      </li>
                      <li className="d-flex align-items-center gap-2">
                        <span className="material-icons text-primary">check_circle</span>
                        Shared dashboards for visibility
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card h-100 shadow-sm border-0 value-card">
                  <div className="card-body">
                    <div className="icon-circle bg-secondary mb-3">
                      <span className="material-icons">payments</span>
                    </div>
                    <h4 className="mb-2">Predictable costs</h4>
                    <p className="text-muted">
                      Transparent pricing with flexible ramp-up and ramp-down as priorities change.
                    </p>
                    <ul className="list-unstyled small text-muted mb-0">
                      <li className="d-flex align-items-center gap-2 mb-2">
                        <span className="material-icons text-primary">check_circle</span>
                        Fixed monthly pods
                      </li>
                      <li className="d-flex align-items-center gap-2">
                        <span className="material-icons text-primary">check_circle</span>
                        No surprise add-ons
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card h-100 shadow-sm border-0 value-card">
                  <div className="card-body">
                    <div className="icon-circle bg-dark text-white mb-3">
                      <span className="material-icons">verified_user</span>
                    </div>
                    <h4 className="mb-2">Reliable delivery</h4>
                    <p className="text-muted">
                      ISO-inspired playbooks, QA gates, and bilingual talent to keep communication crisp.
                    </p>
                    <ul className="list-unstyled small text-muted mb-0">
                      <li className="d-flex align-items-center gap-2 mb-2">
                        <span className="material-icons text-primary">check_circle</span>
                        QA checklists every sprint
                      </li>
                      <li className="d-flex align-items-center gap-2">
                        <span className="material-icons text-primary">check_circle</span>
                        Secure file handling baked in
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="careers-highlight" className="py-5">
          <div className="container py-4">
            <div className="row align-items-center gy-4">
              <div className="col-lg-6">
                <p className="text-primary fw-semibold mb-2">Careers</p>
                <h2 className="display-6 fw-semibold">
                  Find your next role with us
                </h2>
                <p className="lead fw-light">
                  Browse live openings, learn about the roles, and apply online.
                  The careers portal lists every job we are hiring for today.
                </p>
                <div className="d-flex gap-3">
                  <a href="/careers" className="btn btn-career-primary">
                    View open roles
                  </a>
                  <a href="/job-portal" className="btn btn-career-outline">
                    Go to job portal
                  </a>
                </div>
              </div>
              <div className="col-lg-5 offset-lg-1">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <h3 className="h5 fw-semibold mb-3">Why apply through us?</h3>
                    <ul className="list-unstyled m-0">
                      <li className="d-flex gap-3 mb-3">
                        <span className="material-icons text-primary">library_books</span>
                        <div>
                          <p className="mb-1 fw-semibold">Detailed job briefs</p>
                          <p className="mb-0 text-muted">
                            Learn about responsibilities, growth, and benefits before applying.
                          </p>
                        </div>
                      </li>
                      <li className="d-flex gap-3 mb-3">
                        <span className="material-icons text-primary">verified</span>
                        <div>
                          <p className="mb-1 fw-semibold">Transparent process</p>
                          <p className="mb-0 text-muted">
                            Track your application inside the job portal with status updates.
                          </p>
                        </div>
                      </li>
                      <li className="d-flex gap-3">
                        <span className="material-icons text-primary">contact_support</span>
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

        <section id="job-portal-highlight" className="py-5 bg-light">
          <div className="container">
            <div className="row align-items-center gy-4">
              <div className="col-lg-6">
                <p className="text-primary fw-semibold mb-2">Job Portal</p>
                <h2 className="display-6 fw-semibold">
                  Manage your applications in one place
                </h2>
                <p className="lead fw-light">
                  The job portal is where candidates register, update profiles,
                  and track every application from submission to hiring.
                </p>
                <ul className="list-unstyled text-muted">
                  <li className="d-flex align-items-center mb-2">
                    <span className="material-icons me-2 text-primary">
                      dashboard_customize
                    </span>
                    Personal dashboard with application status
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <span className="material-icons me-2 text-primary">
                      lock
                    </span>
                    Secure document uploads for CVs and certificates
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <span className="material-icons me-2 text-primary">
                      notifications
                    </span>
                    Instant alerts for interview and offer updates
                  </li>
                </ul>
                <div className="d-flex gap-3 mt-3">
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
              <div className="col-lg-5 offset-lg-1">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <h3 className="h5 fw-semibold mb-3">How it works</h3>
                    <ol className="list-group list-group-numbered list-group-flush">
                      <li className="list-group-item px-0">
                        Create an account or sign in to your career profile.
                      </li>
                      <li className="list-group-item px-0">
                        Search jobs, review the details, and submit an online application.
                      </li>
                      <li className="list-group-item px-0">
                        Track progress, upload requested files, and receive updates.
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section id="process" className="py-5">
          <div className="container">
            <div className="row align-items-start">
              <div className="col-lg-6">
                <p className="text-primary fw-semibold mb-2">Our Approach</p>
                <h2 className="display-6 fw-semibold">A clear path from brief to delivery</h2>
                <p className="lead fw-light pe-lg-5">
                  We structure every engagement with checkpoints so you always know what’s shipped, what’s next, and what support you can count on.
                </p>
                <div className="d-flex flex-wrap gap-3 mt-3">
                  <span className="pill">Back office support</span>
                  <span className="pill">Finance ops</span>
                  <span className="pill">Creative &amp; CX</span>
                  <span className="pill">Tech &amp; data</span>
                </div>
              </div>
              <div className="col-lg-5 offset-lg-1">
                <div className="timeline">
                  <div className="timeline-step">
                    <div className="step-icon">
                      <span className="material-icons">lightbulb</span>
                    </div>
                    <div>
                      <h5 className="mb-1">01. Scope &amp; playbook</h5>
                      <p className="text-muted mb-0">
                        We map the workflows, define SLAs, and align on tools to mirror your way of working.
                      </p>
                    </div>
                  </div>
                  <div className="timeline-step">
                    <div className="step-icon">
                      <span className="material-icons">school</span>
                    </div>
                    <div>
                      <h5 className="mb-1">02. Onboard talent</h5>
                      <p className="text-muted mb-0">
                        Pods are trained on your processes with sample tasks and QA gates before going live.
                      </p>
                    </div>
                  </div>
                  <div className="timeline-step">
                    <div className="step-icon">
                      <span className="material-icons">monitor_heart</span>
                    </div>
                    <div>
                      <h5 className="mb-1">03. Ship &amp; iterate</h5>
                      <p className="text-muted mb-0">
                        Weekly reviews, dashboard reporting, and a success manager to keep the work on track.
                      </p>
                    </div>
                  </div>
                  <div className="timeline-step">
                    <div className="step-icon">
                      <span className="material-icons">auto_graph</span>
                    </div>
                    <div>
                      <h5 className="mb-1">04. Scale with confidence</h5>
                      <p className="text-muted mb-0">
                        Add new roles or time zones as you grow with the same quality bar and governance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

      </main>
      <Footer />
    </>
  );
}