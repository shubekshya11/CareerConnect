"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";

const stats = [
  { label: "Clients partnered", value: "40+", icon: "handshake" },
  { label: "Candidates supported", value: "2.5k+", icon: "groups" },
  { label: "Avg. response", value: "24 hrs", icon: "schedule" },
];

const values = [
  {
    icon: "verified_user",
    title: "Trust first",
    copy: "Clear communication, secure handling, and predictable delivery on every engagement.",
  },
  {
    icon: "psychology",
    title: "Process-driven",
    copy: "Playbooks, QA gates, and continuous feedback loops keep quality consistent.",
  },
  {
    icon: "rocket_launch",
    title: "Progress together",
    copy: "We grow with you—adding roles, time zones, and capabilities as your needs scale.",
  },
];

const focusAreas = [
  "Back office and finance ops",
  "Customer support and CX",
  "Creative, content, and design",
  "Tech, data, and product support",
];

export default function About() {
  return (
    <>
      <Header />
      <main>
        <section id="about-hero" className="p-0">
          <div className="box-container text-white">
            <div className="container py-5">
              <div className="row align-items-center">
                <div className="col-lg-7">
                  <div className="breadcrumb">
                    <a href="/">Home</a>
                    <i className="material-icons">chevron_right</i>
                    <span>About</span>
                  </div>
                  <h1 className="mb-3">We connect talent and teams to ship reliable work.</h1>
                  <p className="fw-light mb-4">
                    CareerConnect is based in Nepal, combining vetted talent with clear processes so
                    both candidates and employers get a predictable, transparent experience.
                  </p>
                  <div className="d-flex flex-wrap gap-3">
                    <a href="/careers" className="btn btn-sakchha-outline-white">
                      Explore open roles
                    </a>
                    <a href="/job-portal" className="btn btn-sakchha-primary">
                      Visit job portal
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about-overview" className="py-5">
          <div className="container">
            <div className="row gy-4 align-items-center">
              <div className="col-lg-6">
                <p className="text-primary fw-semibold mb-2">Who we are</p>
                <h2 className="h3 fw-semibold mb-3">A partner for fast-moving teams</h2>
                <p className="fw-light text-muted">
                  We blend domain specialists, bilingual communication, and ISO-inspired playbooks
                  to make offshoring simple. Whether you are hiring talent or looking for your next
                  role, we keep the journey transparent from first hello to onboarding.
                </p>
                <div className="d-flex flex-wrap gap-2 mt-3">
                  {focusAreas.map((item) => (
                    <span key={item} className="badge bg-light text-primary border">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row g-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="col-sm-6">
                      <div className="card shadow-sm border-0 h-100">
                        <div className="card-body">
                          <div className="d-flex align-items-center gap-3 mb-2">
                            <span className="material-icons text-primary">{stat.icon}</span>
                            <div className="h4 mb-0">{stat.value}</div>
                          </div>
                          <p className="text-muted mb-0">{stat.label}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about-values" className="py-5 bg-light">
          <div className="container">
            <div className="row mb-4">
              <div className="col-lg-7">
                <p className="text-primary fw-semibold mb-2">How we work</p>
                <h2 className="h3 fw-semibold">Principles that guide every engagement</h2>
                <p className="fw-light text-muted">
                  We keep both candidates and employers aligned with the same communication cadence,
                  QA steps, and secure file handling baked into the process.
                </p>
              </div>
            </div>
            <div className="row g-3">
              {values.map((item) => (
                <div key={item.title} className="col-lg-4">
                  <div className="card h-100 shadow-sm border-0">
                    <div className="card-body">
                      <div className="icon-circle bg-primary-subtle mb-3">
                        <span className="material-icons text-primary">{item.icon}</span>
                      </div>
                      <h4 className="h5 mb-2">{item.title}</h4>
                      <p className="text-muted mb-0">{item.copy}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about-contact" className="pb-5">
          <div className="container">
            <div className="card professional-contact-form">
              <div className="card-body py-4 px-4 px-lg-5">
                <div className="row align-items-center gy-3">
                  <div className="col-lg-9">
                    <h3 className="h4 mb-1">Let’s build together</h3>
                    <p className="text-muted mb-0">
                      Reach out to discuss hiring, partnerships, or how to get started as a
                      candidate.
                    </p>
                  </div>
                  <div className="col-lg-3 text-lg-end">
                    <a href="/contact" className="btn btn-sakchha-primary">
                      Contact us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

