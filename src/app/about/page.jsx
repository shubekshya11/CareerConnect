// import React from "react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import videos from "/video.config"; // ✅ Static import

// export const metadata = {
//   title: "About Us | Sakchha",
//   description: "Sakchha is a global outsourcing service provider based in Nepal, offering expert business solutions tailored to your needs.",
//   keywords: "Sakchha board of directors, Sakchha core team, Sakchha founding members, Sakchha team members, Sakchha benefits of choosing Nepal, Sakchha why Nepal, Sakchha about us",
// };


// function About() {
//   return (
//     <>
//       <Header />
//       <main>
//         <section id="about-hero" className="p-0">
//           <div className="box-container m-3 text-white">
//             <div className="container">
//               <div className="row align-items-center">
//                 <div className="col-md-12 col-lg-6 col-12">
//                   <div className="content pe-5">
//                     <div className="breadcrumb">
//                       <a href="/">Home</a>{" "}
//                       <i className="material-icons">chevron_right</i>
//                       <span>About Sakchha</span>
//                     </div>
//                     <h1>
//                       We don't just Outsource,
//                       <br />
//                       We Outperform!
//                     </h1>
//                     <p className="fw-light">
//                       We specialize in optimizing efficiency by offering you
//                       quality outsourcing solutions to manage and streamline
//                       your business operations.
//                     </p>
//                     <div className="cta pt-4">
//                       <a
//                         href="/contact"
//                         className="btn btn-sakchha-outline-white"
//                       >
//                         Connect With Us
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-12 col-lg-6 col-12">
//                   <div className="video-container">
//                     <iframe
//                       width="540"
//                       height="350"
//                       src={videos.intro}
//                       title="YouTube video player"
//                       frameBorder="0"
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                     ></iframe>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section id="why-nepal">
//           <div className="container">
//             <div className="row align-items-center">
//               <div className="col-lg-7 col-md-12 col-12">
//                 <div className="section-title pb-2">
//                   <h1 className="pb-3">WHY NEPAL?</h1>
//                   <h2 className="fw-light">Skilled, Reliable & Confident</h2>
//                 </div>
//                 <p className="normal-lg fw-light pt-2 pb-5">
//                   Nepal is emerging as a top outsourcing destination, offering a
//                   dynamic and skilled workforce with a culture of dedication and
//                   reliability. Here’s why businesses around the world are
//                   choosing Nepal:
//                 </p>
//                 {/* why-nepal-list-group */}
//                 <div className="why-nepal-list-group row">
//                   {/* list-item */}
//                   <div className="col-md-6 why-nepal-list-item">
//                     <div className="d-flex gap-2">
//                       <div className="icon">
//                         <img
//                           src="/images/about-skilled-workforce.svg"
//                           alt="Skilled Workforce"
//                         />
//                       </div>
//                       <div className="content">
//                         <h5>Skilled Workforce</h5>
//                         <p>
//                           Skilled and young workforce in different sectors from
//                           Accounting, finance, design to software development.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   {/* list-item */}
//                   <div className="col-md-6 why-nepal-list-item">
//                     <div className="d-flex gap-2">
//                       <div className="icon">
//                         <img
//                           src="/images/about-cost-effective.svg"
//                           alt="Cost Effective"
//                         />
//                       </div>
//                       <div className="content">
//                         <h5>Cost-Effective</h5>
//                         <p>
//                           Not only compared to western countries but
//                           cost-effective compared to many other emerging
//                           destinations like India, Philippines.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   {/* list-item */}
//                   <div className="col-md-6 why-nepal-list-item">
//                     <div className="d-flex gap-2">
//                       <div className="icon">
//                         <img
//                           src="/images/about-english-speaking.svg"
//                           alt="English Speaking"
//                         />
//                       </div>
//                       <div className="content">
//                         <h5>Strong Communication Skills</h5>
//                         <p>
//                           Nepal has a large, young population with strong
//                           English proficiency, particularly in IT, finance, and
//                           customer support roles.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   {/* list-item */}
//                   <div className="col-md-6 why-nepal-list-item">
//                     <div className="d-flex gap-2">
//                       <div className="icon">
//                         <img src="/images/about-humble.svg" alt="Humble" />
//                       </div>
//                       <div className="content">
//                         <h5>Humble</h5>
//                         <p>
//                           Nepal possesses culture of humility and loyalty which
//                           has made Nepalese workforce favorite of the world.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* why-nepal-list-group-end */}
//               </div>
//               <div className="col-lg-5 col-md-12 col-12">
//                 <div className="d-flex justify-content-end align-items-end about-why-nepal-images w-100">
//                   <div className="collage w-100">
//                     <div className="top-row w-100">
//                       <div className="about-why-nepal-img-1 w-100">
//                         <img
//                           src="/images/about-why-nepal-1.webp"
//                           alt="why-nepal-1"
//                           loading="lazy"
//                         />
//                       </div>
//                     </div>

//                     <div className="bottom-row w-100">
//                       <div className="about-why-nepal-img-2 w-100">
//                         <img
//                           src="/images/about-why-nepal-2.webp"
//                           alt="why-nepal-2"
//                           loading="lazy"
//                         />
//                       </div>
//                       <div className="about-why-nepal-img-3 w-100">
//                         <img
//                           src="/images/about-why-nepal-3.webp"
//                           alt="why-nepal-3"
//                           loading="lazy"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section id="benefits-nepal">
//           <div className="container">
//             <div className="section-title">
//               <h1>BENEFITS OF CHOOSING NEPAL</h1>
//               <h2 className="fw-light py-2">
//                 Discover skilled, young and energetic professionals.
//               </h2>
//               <div className="normal-lg fw-light pb-5">
//                 Nepal offers a dynamic talent pool with a growing workforce,
//                 making it an ideal outsourcing destination.
//               </div>
//             </div>
//             <div className="benefits-nepal-group">
//               <div className="row">
//                 <div className="col-md-6 col-12">
//                   {/* benefits-nepal-item */}
//                   <div className="benefits-nepal-group-item d-flex gap-3">
//                     <img src="./images/about-benefit-youths.svg" alt="youth" />
//                     <div className="content">
//                       <h5>500,000 p.a</h5>
//                       <p className="fw-light">
//                         Youths entering Nepalese labor market annually,
//                         providing a substantial and growing talent pool for
//                         various industries.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-6 col-12">
//                   {/* benefits-nepal-item */}
//                   <div className="benefits-nepal-group-item d-flex gap-3">
//                     <img
//                       src="./images/about-benefit-youths-2.svg"
//                       alt="youth"
//                     />
//                     <div className="content">
//                       <h5>5,000 p.a</h5>
//                       <p className="fw-light">
//                         Youths university graduates enter the IT and ITES
//                         sectors, reflecting a growing pool of tech-savvy
//                         professionals.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 {/* benefits-nepal-item */}
//                 <div className="col-md-6 col-12">
//                   <div className="benefits-nepal-group-item d-flex gap-3">
//                     <img src="./images/about-benefits-40.svg" alt="youth" />
//                     <div className="content">
//                       <h5>{">"}40%</h5>
//                       <p className="fw-light">
//                         Percentage of graduates that are proficient in English
//                         language written as well as spoken.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-6 col-12">
//                   {/* benefits-nepal-item */}
//                   <div className="benefits-nepal-group-item d-flex gap-3">
//                     <img src="./images/about-benefits-50.svg" alt="youth" />
//                     <div className="content">
//                       <h5>{"<"}40%</h5>
//                       <p className="fw-light">
//                         Nepal offers cost-effective labor solutions, with
//                         salaries ranging from NPR 15,000 to NPR 200,000 per
//                         month, depending on skill and experience.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section id="meet-our-team">
//           <div className="container">
//             <div className="row">
//               <div className="col-12">
//                 <div className="section-title pb-4">
//                   <h1>MEET OUR FOUNDING MEMBERS</h1>
//                   <h2 className="fw-light">
//                     Get to know the people behind Sakchha.
//                   </h2>
//                 </div>
//               </div>
//             </div>
//             <div className="row pt-5">
//               <div className="col-lg-4 col-12">
//                 <div className="founder d-flex flex-column gap-3 align-items-center px-3">
//                   <img
//                     src="/images/ajit-shah.png"
//                     alt="Ajit Shah"
//                     width={200}
//                   />
//                   <div className="d-flex flex-column">
//                     <h4>Ajit Shah</h4>
//                     <p>Chairman</p>
//                   </div>
//                   <p>
//                     With 20+ years of experience in Outsourcing Business, Ajit
//                     Shah is the owner of Lotus Holdings and other ventures. He
//                     actively contributes to industry growth.
//                   </p>
//                 </div>
//               </div>
//               <div className="col-lg-4 col-12">
//                 <div className="founder d-flex flex-column gap-3 align-items-center px-4">
//                   <img
//                     src="/images/samantha-shah.png"
//                     alt="Sanjay Golcha"
//                     width={200}
//                   />
//                   <div className="d-flex flex-column">
//                     <h4>Samantha Shah</h4>
//                     <p>Executive Director</p>
//                   </div>
//                   <p>
//                     Samantha Shah has 10+ years of experience in Technology
//                     Offshoring Field, working with leading multinational
//                     companies in the USA and Nepal.
//                   </p>
//                 </div>
//               </div>
//               <div className="col-lg-4 col-12">
//                 <div className="founder d-flex flex-column gap-3 align-items-center px-3">
//                   <img
//                     src="/images/sanjay-golchha.png"
//                     alt="Sanjay Golchha"
//                     width={200}
//                   />
//                   <div className="d-flex flex-column">
//                     <h4>Sanjay Golchha</h4>
//                     <p>Director</p>
//                   </div>
//                   <p>
//                     Over 25 years of experience in Technology business, Sanjay
//                     Golchha is the Chairman of Golchha Enterprises- Nepal’s
//                     largest player in IT Industry.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section id="our-core-team">
//           <div className="container">
//             <div className="row">
//               <div className="col-12">
//                 <div className="section-title pb-4">
//                   <h1>Our Core Team</h1>
//                   <h2 className="fw-light">
//                     Meet the core members who drive our success.
//                   </h2>
//                 </div>
//               </div>
//             </div>
//             <div className="core-team-members-group row mt-3">
//               {/* core-team-member */}
//               <div className="col-md-4 col-6 team-member">
//                 <div className="card">
//                   <div className="card-img-top">
//                     <img
//                       src="/images/sakchha-pratikshya-silwal.webp"
//                       alt="Pratikshya Silwal"
//                       width={180}
//                     />
//                   </div>
//                   <div className="card-body">
//                     <h3>Pratikshya Silwal</h3>
//                     <p>General Manager</p>
//                   </div>
//                 </div>
//               </div>

//               {/* core-team-member */}
//               <div className="col-md-4 col-6 team-member">
//                 <div className="card">
//                   <div className="card-img-top">
//                     <img
//                       src="/images/sakchha-kajal-gupta.webp"
//                       alt="Kajal Gupta"
//                       width={180}
//                     />
//                   </div>
//                   <div className="card-body">
//                     <h3>Kajal Gupta</h3>
//                     <p>HR Manager</p>
//                   </div>
//                 </div>
//               </div>

//               {/* core-team-member */}
//               <div className="col-md-4 col-6 team-member">
//                 <div className="card">
//                   <div className="card-img-top">
//                     <img
//                       src="/images/sakchha-rupesh-bhattarai.webp"
//                       alt="Rupesh Bhattarai"
//                       width={180}
//                     />
//                   </div>
//                   <div className="card-body">
//                     <h3>Rupesh Bhattarai</h3>
//                     <p>Associate Marketing Manager</p>
//                   </div>
//                 </div>
//               </div>

//               {/* core-team-member */}

//               <div className="col-md-4 col-6 team-member">
//                 <div className="card">
//                   <div className="card-img-top">
//                     <img
//                       src="/images/sakchha-anmol-thapa.webp"
//                       alt="Anmol Thapa"
//                       width={180}
//                     />
//                   </div>
//                   <div className="card-body">
//                     <h3>Anmol Thapa</h3>
//                     <p>Marketing</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="col-md-4 col-6 team-member">
//                 <div className="card">
//                   <div className="card-img-top">
//                     <img
//                       src="/images/sakchha-saujan-neupane.webp"
//                       alt="Saujan Neupane"
//                       width={180}
//                     />
//                   </div>
//                   <div className="card-body">
//                     <h3>Saujan Neupane</h3>
//                     <p>Frontend Developer</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section id="about-contact">
//           <div className="container offset-container">
//             <div className="card professional-contact-form">
//               <div className="card-body">
//                 <div className="row align-items-center">
//                   <div className="col-md-10">
//                     <div className="section-title pb-4">
//                       <h1>GET AN INQUIRY</h1>
//                       <h2>Looking For Professionals?</h2>
//                       <div className="dash"></div>
//                       <p className="lead">
//                         Reach out to us to connect with top professionals who
//                         can help your business thrive.
//                       </p>
//                     </div>
//                   </div>
//                   <div className="col-md-2">
//                     <a href="/contact" className="btn btn-sakchha-primary">
//                       Connect with us
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <footer>
//         <Footer />
//       </footer>
//     </>
//   );
// }

// export default About;
