"use client"
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/effect-fade"; // Import effect-specific CSS

const slides = [
  // {
  //   title: "Sakchha at SSOW Conference 2025",
  //   description:
  //     `Increase your EBITDA by at least 30% with Sakchha. We are at the SSOW Conference 2025 to help you grow your business.`,
  //   eventDetails: {
  //     date: "March 24-27, 2025 at Rosen Shingle Creek, Orlando, Florida",
  //     location: "Booth #108 and #110",
  //   },
  //     background: `linear-gradient(270deg, rgba(0, 0, 0, 0.5) 40%,  rgba(0, 0, 0, 0.95) 60%), url('/images/hero-participating-ssow-event.webp') #000 300px center / cover repeat-x`,
  //     showCTA: false,
  // },
  {
    title: "Outsource Smart, Grow Faster.",
    description: "Simplify your operations with Sakchha’s Outsourcing Solutions, tailored to your needs. We handle your tasks while you focus on growing your business.",
    imageSrc: "/images/hero-bg-1400w.webp",
    showCTA: true,
  },
];

const HeroSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, EffectFade, Autoplay]}
      // navigation
      // pagination={{ clickable: true }}
      // autoplay={{ delay: 15000 }}
      // loop
      // effect="fade"
      className="hero-swiper"
    >
      {slides.map((slide, index) => {
        // Use regex to replace -1400w with 400 and 800
        const image400 = slide.imageSrc.replace(/-1400w/, "-400w");
        const image800 = slide.imageSrc.replace(/-1400w/, "-800w");
        return (
          <SwiperSlide key={index}>
            <div className="hero-slide" id="hero">
              {/* Responsive image positioning */}
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
              <div className="container">
                <div className="row">
                  <div className="col-md-6 col-12">
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
                      <div className="d-flex gap-2">
                        <a href="/contact" className="btn btn-sakchha-outline-white">
                          Get an Inquiry
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
