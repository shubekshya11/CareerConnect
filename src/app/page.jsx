import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HeroSlider from "./components/HeroSlider.jsx";
import Vacancy from "./components/Vacancy.jsx";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSlider />
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
                  <a href="/careers" className="btn btn-sakchha-primary">
                    View open roles
                  </a>
                  <a href="/job-portal" className="btn btn-sakchha-outline">
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
                      </li>  {/* ← THIS WAS MISSING */}
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
                  <a href="/job-portal" className="btn btn-sakchha-primary">
                    Visit job portal
                  </a>
                  <a
                    href="/job-portal/profile"
                    className="btn btn-sakchha-outline"
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

        <Vacancy />
      </main>
      <Footer />
    </>
  );
}