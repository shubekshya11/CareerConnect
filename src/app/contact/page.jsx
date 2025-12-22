"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <>
      <Header />
      <main>
        <section id="contact-hero" className="p-0">
          <div className="box-container text-white">
            <div className="container py-5">
              <div className="row align-items-center">
                <div className="col-lg-7">
                  <div className="breadcrumb">
                    <a href="/">Home</a>
                    <i className="material-icons">chevron_right</i>
                    <span>Contact</span>
                  </div>
                  <h1 className="mb-3">Get in Touch</h1>
                  <p className="fw-light mb-4">
                    Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact-us-page-form" className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <ContactForm />
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

