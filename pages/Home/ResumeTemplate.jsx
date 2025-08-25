"use client";

import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "../../components/buttonUIComponent";
// Import your resume template images
import resume1 from "../../public/assets/Resume-templates-swiper_1.png";
import resume2 from "../../public/assets/Resume-templates-swiper_2.png";
import resume3 from "../../public/assets/Resume-templates-swiper_3.png";
import resume4 from "../../public/assets/Resume-templates-swiper_4.png";
import resume5 from "../../public/assets/Resume-templates-swiper_5.png";

const templates = [
  { id: 1, name: "Alex Snyder", image: resume1 },
  { id: 2, name: "Vince Murray", image: resume2 },
  { id: 3, name: "Elsa Williams", image: resume3 },
  { id: 4, name: "Daniel James", image: resume4 },
  { id: 5, name: "Alex Ellison", image: resume5 },
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

export default function ResumeTemplate() {
  const router = useRouter();
  const [centerSlide, setCenterSlide] = useState(0);

  const handleClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push(`/dashboard/resume-builder`);
    } else {
      router.push("/login2");
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
    <div className="bg-brandBlue py-20 overflow-hidden relative">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-[42px] font-bold text-white leading-tight mb-4">
          Explore Our Collection of Modern Resume Templates
        </h2>
        <p className="text-white/80 text-lg">
          Professionally designed, ATS-friendly, and tailored to impress
          recruiters across industries.
        </p>
      </div>

      <div className="max-w-7xl mx-auto relative px-4">
        <Slider {...settings}>
          {templates.map((template, index) => {
            // let styleClass = "scale-100 z-10";
            // if (index === centerSlide) {
            //   styleClass = "scale-100 z-30 shadow-2xl border-2 border-blue-500";
            // } else if (index === centerSlide - 1 || index === centerSlide + 1) {
            //   styleClass = "scale-95 translate-y-4 z-10";
            // } else {
            //   styleClass = "scale-90 translate-y-10 z-0";
            // }
            let styleClass = "scale-100 z-10";
            if (index === centerSlide) {
              styleClass = "scale-100 z-30 shadow-2xl border-2 border-blue-500";
            } else if (index === centerSlide - 1 || index === centerSlide + 1) {
              styleClass = "scale-95 translate-y-10 z-20";
            } else {
              styleClass = "scale-95 translate-y-10 z-0";
            }
            return (
              <div key={template.id} className="">
                <div
                  className={`w-[380px] relative transition-all duration-500 transform bg-white rounded-xl overflow-hidden ${styleClass}`}
                  style={{ transformOrigin: "center center" }}
                >
                  <Image
                    src={template.image}
                    alt={template.name}
                    width={380}
                    height={500}
                    className="w-full h-auto object-cover rounded-xl"
                    priority={index === 0}
                  />
                  <Button
                    onClick={() => handleClick()}
                    className={`absolute bottom-4 left-1/2 -translate-x-1/2 font-medium py-2 px-4 rounded shadow-lg transition-all duration-500 bg-brandBlue text-white hover:bg-darkBlue ${
                      index === centerSlide
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    Use this template
                  </Button>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
