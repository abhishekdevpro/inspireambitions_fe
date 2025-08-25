// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import createmyresume from "./Images/createmyresume.png";
// import Link from "next/link";

// const Home_step = () => {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleStep = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // Check for the token (you can adjust based on where the token is stored)
//     const token = localStorage.getItem("token");
//     setIsAuthenticated(!!token);
//   }, []);
//   const steps = [
//     {
//       title: "1. Choose a Template",
//       description: [
//         "Pick a professional resume template that suits your industry and role.",
//         "20+ ATS-compliant templates selected by experts.",
//       ],
//     },
//     {
//       title: "2. Add Your Information",
//       description: [
//         "Contact details",
//         "Summary or objective",
//         "Work experience",
//         "Education",
//         "Skills and certifications",
//       ],
//     },
//     {
//       title: "3. Customize & Design",
//       description: [
//         "Adjust fonts, colors, and layout",
//         "Add photo and links where required",
//         "Highlight important achievements",
//       ],
//     },
//     {
//       title: "4. Review, Run AI & Export",
//       description: [
//         "Run AI Assist",
//         "Auto-check and fix using AI",
//         "Export as PDF",
//         "Create unlimited resumes & cover letters",
//       ],
//     },
//   ];

//   return (
//     <div className="flex flex-col md:flex-row items-start gap-8 bg-gray-50 p-8">

//       <div className="w-full md:w-1/2 mb-6 md:mb-0">
//         <Image
//           src={createmyresume}
//           alt="Resume Builder Tutorial"
//           className="w-full h-auto rounded-lg shadow-lg max-h-[500px] "
//         />
//       </div>

//       <div className="w-full md:w-1/2">
//         <h1 className="text-4xl font-bold text-gray-900 mb-8">
//           How to Make a Resume — In 4 Simple Steps
//         </h1>

//         <div className="space-y-4">
//           {steps.map((step, index) => (
//             <div
//               key={index}
//               className="border-l-4 border-teal-700 bg-white p-4 rounded-lg shadow-sm cursor-pointer"
//               onClick={() => toggleStep(index)}
//             >
//               <div className="flex justify-between items-center">
//                 <h3 className="font-semibold text-lg text-gray-900">
//                   {step.title}
//                 </h3>
//                 <span className="text-xl text-gray-600">
//                   {openIndex === index ? "▲" : "▼"}
//                 </span>
//               </div>

//               {openIndex === index && (
//                 <ul className="text-gray-600 mt-2 list-disc list-inside space-y-1">
//                   {step.description.map((item, idx) => (
//                     <li key={idx}>{item}</li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           ))}
//         </div>
//         <Link href={isAuthenticated ? "/dashboard/resume-builder" : "/login2"}>
//           <button className="mt-8 bg-teal-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-800 transition-colors">
//             Build my resume
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Home_step;

"use client";

import Image from "next/image";
import Get_hired_iocn1 from "../../public/assets/Get_hired_iocn1.png";
import Get_hired_iocn2 from "../../public/assets/Get_hired_iocn2.png";
import Get_hired_iocn3 from "../../public/assets/Get_hired_iocn3.png";
import Get_hired_iocn4 from "../../public/assets/Get_hired_iocn4.png";
import Get_hired_iocn5 from "../../public/assets/Get_hired_iocn5.png";
import Get_hired_iocn6 from "../../public/assets/Get_hired_iocn6.png";
import ResumeTemplate from "./ResumeTemplate";
import Blogs from "./Blogs";
import Testimonials from "./Testimonials";
import Home_five from "./Home_five";

const features = [
  {
    icon: Get_hired_iocn1,
    title: "A Better Resume In Minutes",
    desc: "Replace Your Old Resume In A Few Simple Clicks. Our Builder Gives Recruiters What They Want.",
  },
  {
    icon: Get_hired_iocn2,
    title: "ATS-Friendly Templates",
    desc: "Tick Every Box And Make Sure Your Resume Is Never Filtered Out By The Hiring Software.",
  },
  {
    icon: Get_hired_iocn3,
    title: "Pre-Written Content",
    desc: "Stop Worrying About Words. Save Time By Adding Pre-Approved, Tested Content From Certified Writers.",
  },
  {
    icon: Get_hired_iocn4,
    title: "Easy With AI",
    desc: "Quickly Generate Formal Phrases And Summaries. Sound Professional, Faster.",
  },
  {
    icon: Get_hired_iocn5,
    title: "Beat The Competition",
    desc: "Our Tested Resume Templates Are Designed To Make You More Attractive To Recruiters.",
  },
  {
    icon: Get_hired_iocn6,
    title: "Get Paid More",
    desc: "A Higher Salary Begins With A Strong Resume. Our Salary Analyzer Tells You If Your Job Offer Is Competitive (Or Not).",
  },
];

export default function Home_step() {
  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-[42px] font-bold text-center mb-12">
            Get Hired Fast{" "}
            <span className="text-brandBlue">With A Powerful Resume</span>
          </h2>

          <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="border rounded-lg p-8 shadow-sm hover:shadow-md transition bg-white"
              >
                <Image src={f.icon} alt="icons" height={80} width={80} />
                <h3 className="font-bold text-lg mb-2 mt-2">{f.title}</h3>
                <p className="text-gray-600 text-sm mt-4">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ResumeTemplate />
      <Blogs />
      <Testimonials />
      <Home_five />
    </>
  );
}
