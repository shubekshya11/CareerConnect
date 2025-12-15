"use client"
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade"; // Import effect-specific CSS

const slides = [
  {
    kicker: "Your Career Journey Starts Here",
    title: "Find Your Dream Job Today.",
    description:
      "Connect with top employers and discover opportunities that match your skills. Browse hundreds of job openings, apply seamlessly, and track your applications all in one place.",
    background:
      "linear-gradient(135deg, #00a9e0 0%, #008bb8 45%, #005f7a 100%)",
    showCTA: true,
    secondaryCTA: {
      label: "Browse Jobs",
      href: "/careers",
    },
  },
  {
    kicker: "Streamlined Job Portal",
    title: "Manage Your Career Applications.",
    description:
      "Create your profile, upload your CV, and apply to multiple positions with ease. Track application status, receive updates, and take control of your career path.",
    background:
      "linear-gradient(135deg, #005f7a 0%, #0077a3 45%, #00a9e0 100%)",
    showCTA: true,
    secondaryCTA: {
      label: "Go to Job Portal",
      href: "/job-portal",
    },
  },
];

const HeroSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, EffectFade, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 8500 }}
      loop
      effect="fade"
      className="hero-swiper"
    >
      {slides.map((slide) => {
        const hasImage = Boolean(slide.imageSrc);
        const image400 = hasImage ? slide.imageSrc.replace(/-1400w/, "-400w") : null;
        const image800 = hasImage ? slide.imageSrc.replace(/-1400w/, "-800w") : null;

        return (
          <SwiperSlide key={slide.title}>
            <div
              className="hero-slide"
              id="hero"
              style={{
                background: slide.background,
              }}
            >
              <div className="hero-overlay" />
              {hasImage && (
                <div className="hero-image-wrapper">
                  <img
                    src={slide.imageSrc}
                    srcSet={`
                    ${image400} 450w,
                    ${image800} 850w,
                    ${slide.imageSrc} 1400w,
                    ${slide.imageSrc} 1920w
                  `}
                    sizes="100vw"
                    alt={slide.title}
                    className="hero-image"
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                </div>
              )}
              <div className="container">
                <div className="row">
                  <div className="col-md-6 col-12">
                    {slide.kicker && (
                      <div className="badge text-uppercase mb-3 fw-semibold hero-badge">
                        {slide.kicker}
                      </div>
                    )}
                    <div className="display">{slide.title}</div>
                    <p className="normal-lg fw-lighter pe-5">{slide.description}</p>
                    {slide.eventDetails && (
                      <div className="event-details border-top border-white py-4 me-5">
                        {slide.eventDetails.date && (
                          <p className="normal-lg pb-0">{slide.eventDetails.date}</p>
                        )}
                        {slide.eventDetails.location && (
                          <p className="normal-lg color-secondary">{slide.eventDetails.location}</p>
                        )}
                      </div>
                    )}

                    {slide.showCTA && (
                      <div className="d-flex gap-3 flex-wrap">
                        <a
                          href={slide.secondaryCTA?.href || "/job-portal"}
                          className="btn btn-career-outline"
                        >
                          {slide.secondaryCTA?.label || "Explore job portal"}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeroSlider;
