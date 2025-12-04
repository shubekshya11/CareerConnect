"use client"
import React, { useEffect, useState, useRef } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [pathname, setPathname] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // This code will only run on the client side
    const updatePathname = () => {
      setPathname(window.location.pathname);
    };

    updatePathname(); // Initialize pathname on component mount

    window.addEventListener("popstate", updatePathname); // Update pathname on navigation

    return () => {
      window.removeEventListener("popstate", updatePathname);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Restore scrolling
    }

    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const overlay = document.getElementById("menuOverlay");
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !overlay.contains(e.target)
      ) {
        setMenuOpen(false); // Close menu if click is outside <ul>
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const getNavLinkClass = (path) => {
    return pathname === path ? "active" : "";
  };

  return (
    <header className={isScrolled ? "header sticky" : "header"}>
      <div
        id="menuOverlay"
        className={`overlayForMenu ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)} // Close on clicking the overlay
      ></div>
      <div className="company-info">
        <div className="container">
          <div className="content">
            <div className="phone-and-email">
              <span>
                <i className="material-icons">phone</i>+977-9802304960
              </span>
              <span>
                <i className="material-icons">email</i>
                <a href="mailto:info@careerconnect.com">info@careerconnect.com</a>
              </span>
            </div>
            <div className="social-icons">
              <a
                href="https://www.linkedin.com/company/careers/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/images/icons-linkedin.svg" alt="Linkedin" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <div className="content">
            <a className="navbar-brand d-flex align-items-center" href="/">
              <img src="/images/logo.svg" alt="CareerConnect" width="78" />
              {process.env.NODE_ENV == 'development' && (
                <span className="dev-mode-badge" title="Development Mode">
                  DEV MODE
                </span>
              )}
            </a>
            <div
              className="hamburger"
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>

            <ul ref={menuRef} className={`nav-links ${menuOpen ? "open" : ""}`}>
              <li className="hamburger-close-btn">
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}
                  aria-label="Close"
                ></button>
              </li>
              <li>
                <a href="/" className={getNavLinkClass("/")}>
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className={getNavLinkClass("/about")}>
                  About
                </a>
              </li>
              <li>
                <a
                  href="/marketplace"
                  className={getNavLinkClass("/marketplace")}
                >
                  Marketplace
                </a>
              </li>
              <li>
                <a href="/careers" className={getNavLinkClass("/careers")}>
                  Careers
                </a>
              </li>
              <li>
                <a href="/blogs" className={getNavLinkClass("/blogs")}>
                  Blogs
                </a>
              </li>
              {/* <li>
                <a href="/distributors" className={getNavLinkClass("/distributors")}>
                  Distributors
                </a>
              </li> */}
              <li>
                <a
                  href="/contact"
                  className="btn btn-sakchha-primary hide-btn-style-on-mobile"
                >
                  Connect With Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
