// "use client";
// import React from "react";

// const roles = [
//   { title: "Salesforce Developer", department: "Information Technology" },
//   { title: "Finance Associate", department: "Finance Operations" },
//   { title: "Creative Designer", department: "Design & CX" },
//   { title: "Customer Success Specialist", department: "Support" },
// ];

// const Vacancy = () => {
//   return (
//     <section id="skills-in-demand">
//       <div className="container">
//         <div className="row pb-5 align-items-center">
//           <div className="section-title col-md-6 col-12">
//             <h1 className="pb-3">SKILLS IN DEMAND</h1>
//             <h2 className="fw-light pb-3">We’re Always Looking For Skilled Professionals</h2>
//             <p className="pt-3 normal-lg fw-light">
//               Our mission is to connect talented individuals with exciting opportunities. If you’re an experienced professional we have roles that suit your expertise.
//             </p>
//             <p className="pt-3 normal-lg fw-light">
//               Explore new challenges, grow your skills, and make a meaningful impact in your field.
//             </p>
//             <div className="cta pt-5 d-flex gap-3 flex-wrap">
//               <a href="/careers" className="btn btn-career-outline">
//                 Browse More Jobs
//               </a>
//               <a href="/job-portal" className="btn btn-career-primary">
//                 Apply via portal
//               </a>
//             </div>
//           </div>
//           <div className="col-md-6 col-12">
//             <div className="ps-lg-5 vacancy-list">
//               {roles.map((role) => (
//                 <div key={role.title} className="list-item d-flex gap-3 align-items-start">
//                   <div className="icon-circle text-primary">
//                     <span className="material-icons">person</span>
//                   </div>
//                   <div className="post-content">
//                     <div className="vacant-position normal-lg fw-medium">{role.title}</div>
//                     <div className="department fw-light">{role.department}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Vacancy;