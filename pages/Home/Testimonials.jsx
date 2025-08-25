// "use client";

// import { useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Image from "next/image";

// // Import testimonial images
// import testimonial1 from "../../public/assets/testimonial_img1.png";
// import testimonial2 from "../../public/assets/testimonial_img2.png";
// import testimonial3 from "../../public/assets/testimonial_img3.png";

// const testimonials = [
//   {
//     id: 1,
//     name: "Seren Whitfield",
//     title: "Writer",
//     image: testimonial1,
//     quote:
//       "There Are Many Variations Of Passages Of Lorem Ipsum Available, But The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don't Look Even Slightly Believable.",
//   },
//   {
//     id: 2,
//     name: "Alaric Bennett",
//     title: "Blogger",
//     image: testimonial2,
//     quote:
//       "There Are Many Variations Of Passages Of Lorem Ipsum Available, But The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised",
//   },
//   {
//     id: 3,
//     name: "Leona Brevard",
//     title: "Bookstore Owner",
//     image: testimonial3,
//     quote:
//       "ere Are Many Variations Of Passages Of Lorem um Available, But The Majority Have Suffered eration In Some Form, By Injected Humour, Or ndomised Words Which Don't Look Even Slightly ievable.",
//   },
//   {
//     id: 4,
//     name: "John Smith",
//     title: "Designer",
//     image: testimonial1,
//     quote:
//       "There Are Many Variations Of Passages Of Lorem Ipsum Available, But The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don't Look Even Slightly Believable.",
//   },
//   {
//     id: 5,
//     name: "Sarah Johnson",
//     title: "Developer",
//     image: testimonial2,
//     quote:
//       "There Are Many Variations Of Passages Of Lorem Ipsum Available, But The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised",
//   },
// ];

// export default function Testimonials() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const settings = {
//     centerMode: true,
//     centerPadding: "100px",
//     slidesToShow: 3,
//     infinite: true,
//     speed: 500,
//     dots: true,
//     beforeChange: (_, next) => setCurrentSlide(next),
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 1,
//           centerPadding: "0px",
//         },
//       },
//     ],
//   };

//   return (
//     <section className="py-20 bg-blue-50">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Section Title */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold">
//             What Our <span className="text-brandBlue">Clients</span> Have To Say
//           </h2>
//         </div>

//         {/* Testimonials Carousel */}
//         <div className="relative">
//           <Slider {...settings}>
//             {testimonials.map((testimonial, index) => {
//               let styleClass = "scale-100 z-10";
//               let cardStyle = "bg-white";

//               if (index === currentSlide) {
//                 styleClass = "scale-110 z-30 shadow-2xl";
//                 cardStyle = "bg-brandBlue text-white";
//               } else if (
//                 index === currentSlide - 1 ||
//                 index === currentSlide + 1
//               ) {
//                 styleClass = "scale-95 z-10";
//                 cardStyle = "bg-white";
//               } else {
//                 styleClass = "scale-90 z-0";
//                 cardStyle = "bg-white";
//               }

//               return (
//                 <div key={testimonial.id} className="px-4">
//                   <div
//                     className={`relative transition-all duration-500 transform ${styleClass}`}
//                     style={{ transformOrigin: "center center" }}
//                   >
//                     {/* Testimonial Card */}
//                     <div
//                       className={`${cardStyle} rounded-xl shadow-lg overflow-hidden`}
//                     >
//                       {/* Profile Image */}
//                       <div className="relative w-24 h-24 mx-auto mt-6 mb-4">
//                         <Image
//                           src={testimonial.image}
//                           alt={testimonial.name}
//                           fill
//                           className="object-cover rounded-lg"
//                         />
//                       </div>

//                       {/* Quote */}
//                       <div className="px-6 pb-6">
//                         <p
//                           className={`text-sm leading-relaxed mb-4 ${
//                             index === currentSlide
//                               ? "text-white"
//                               : "text-gray-600"
//                           }`}
//                         >
//                           &ldquo;{testimonial.quote}&rdquo;
//                         </p>

//                         {/* Author Info */}
//                         <div className="text-center">
//                           <h4
//                             className={`font-semibold ${
//                               index === currentSlide
//                                 ? "text-white"
//                                 : "text-gray-900"
//                             }`}
//                           >
//                             {testimonial.name}
//                           </h4>
//                           <p
//                             className={`text-sm ${
//                               index === currentSlide
//                                 ? "text-blue-100"
//                                 : "text-gray-500"
//                             }`}
//                           >
//                             {testimonial.title}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </Slider>
//         </div>
//       </div>

//       {/* Custom CSS for pagination dots */}
//       <style jsx global>{`
//         .slick-dots {
//           bottom: -40px;
//         }

//         .slick-dots li button:before {
//           font-size: 12px;
//           color: #cbd5e1;
//           opacity: 1;
//         }

//         .slick-dots li.slick-active button:before {
//           color: #3b82f6;
//         }

//         .slick-slide {
//           opacity: 0.7;
//           transition: opacity 0.3s ease;
//         }

//         .slick-slide.slick-active {
//           opacity: 1;
//         }
//       `}</style>
//     </section>
//   );
// }

"use client";

import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import Image from "next/image";
import { useRouter } from "next/router";

import testimonial1 from "../../public/assets/testimonial_img1.png";
import testimonial2 from "../../public/assets/testimonial_img2.png";
import testimonial3 from "../../public/assets/testimonial_img3.png";

const testimonials = [
  {
    id: 1,
    name: "Seren Whitfield",
    title: "Writer",
    image: testimonial1,
    quote:
      "There Are Many Variations Of Passages Of Lorem Ipsum Available, But The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don't Look Even Slightly Believable.",
  },
  {
    id: 2,
    name: "Alaric Bennett",
    title: "Blogger",
    image: testimonial2,
    quote:
      "There Are Many Variations Of Passages Of Lorem Ipsum Available, But The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised",
  },
  {
    id: 3,
    name: "Leona Brevard",
    title: "Bookstore Owner",
    image: testimonial3,
    quote:
      "ere Are Many Variations Of Passages Of Lorem um Available, But The Majority Have Suffered eration In Some Form, By Injected Humour, Or ndomised Words Which Don't Look Even Slightly ievable.",
  },
  {
    id: 4,
    name: "Seren Whitfield",
    title: "Writer",
    image: testimonial1,
    quote:
      "There Are Many Variations Of Passages Of Lorem Ipsum Available, But The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don't Look Even Slightly Believable.",
  },
  {
    id: 5,
    name: "Alaric Bennett",
    title: "Blogger",
    image: testimonial2,
    quote:
      "There Are Many Variations Of Passages Of Lorem Ipsum Available, But The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised",
  },
];

const CustomArrow = ({ direction, onClick }) => (
  <div
    className={`absolute top-1/2 transform -translate-y-1/2 z-30 cursor-pointer ${
      direction === "left" ? "left-[460px]" : "right-[390px]"
    } bg-brandBlue rounded-full shadow p-2`}
    onClick={onClick}
  >
    <span className="text-xl text-white">
      {direction === "left" ? "❮" : "❯"}
    </span>
  </div>
);

CustomArrow.propTypes = {
  direction: PropTypes.oneOf(["left", "right"]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default function Testimonials() {
  const router = useRouter();
  const [centerSlide, setCenterSlide] = useState(0);

  const handleClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      window.open(`/dashboard/resume-builder?${token}`);
    } else {
      router.push("/login");
    }
  };

  const settings = {
    centerMode: true,
    centerPadding: "160px",
    slidesToShow: 3,
    infinite: true,
    speed: 500,
    dots: true,
    beforeChange: (_, next) => setCenterSlide(next),
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <div className="bg-blue-50 py-20 overflow-hidden relative">
      <div className="text-center mb-12">
        {/* Section Title */}

        <h2 className="text-4xl md:text-5xl font-bold">
          What Our <span className="text-brandBlue">Clients</span> Have To Say
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative px-4">
        <Slider {...settings}>
          {testimonials.map((template, index) => {
            let styleClass = "scale-100 z-10";
            if (index === centerSlide) {
              styleClass =
                "scale-100 z-30 shadow-2xl border-2 border-blue-500 text-white bg-brandBlue";
            } else if (index === centerSlide - 1 || index === centerSlide + 1) {
              styleClass = "scale-95 translate-y-10 z-20 bg-white";
            } else {
              styleClass = "scale-95 translate-y-10 z-0 bg-white";
            }

            let cardStyle = "bg-white";

            return (
              <div key={template.id} className="">
                <div
                  className={`w-[380px] relative transition-all duration-500 transform  rounded-xl overflow-hidden ${styleClass}`}
                  style={{ transformOrigin: "center center" }}
                >
                  <Image
                    src={template.image}
                    alt={template.name}
                    width={480}
                    height={600}
                    className="w-full h-auto object-cover "
                    priority={index === 0}
                  />
                  <div className={`rounded-xl shadow-lg overflow-hidden`}>
                    {/* Quote */}
                    <div className="px-6 pb-6 mt-8">
                      <p className={`text-sm leading-relaxed mb-4 mt-12 `}>
                        {template.quote}
                      </p>

                      {/* Author Info */}

                      <div className="flex items-center my-8 ">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3 ">
                          <Image
                            src={template.image}
                            alt={template.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className={`font-semibold`}>{template.name}</h4>
                          <p className={`text-sm `}>{template.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
