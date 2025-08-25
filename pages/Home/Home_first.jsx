import Link from "next/link";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "./Images/homeimage1.jpg";
import image2 from "./Images/homeimage2.jpg";
import image3 from "./Images/homeimage3.jpg";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation
import Banner from "../../public/assets/Banner_img.png";
import microsoft from "../../public/assets/microsoft.png";
import Home_step from "./Home-steps";
import Home_third from "./Home_third";
import ATSResumeSection from "./ATS-section";

import Button from "../../components/buttonUIComponent";
import { FaStar } from "react-icons/fa";

function Home_first() {
  const { t } = useTranslation(); // Initialize useTranslation hook
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for the token (you can adjust based on where the token is stored)
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [image1, image2, image3];

  return (
    <>
      <div className="bg-brandBlue pt-10 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto ">
          <div className="py-9 px-5 flex gap-3 md:gap-10 md:justify-evenly items-center flex-col md:flex-row">
            {/* Content Section */}
            <div className=" py-3 w-full md:w-[500px]">
              <div className="flex flex-col gap-4">
                <div className="font-sans  text-2xl md:text-5xl font-bold leading-tight text-white">
                  Build a Job-Winning Resume in Minutes with AI
                </div>

                <div className="text-lg font-medium text-[#f5f5f5]">
                  Join 10,000+ job seekers. Upload your resume or start from
                  scratch – AI improves it instantly.
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button className="text-black bg-white">Upload Resume</Button>

                  <Link
                    href={
                      isAuthenticated ? "/dashboard/resume-builder" : "/login2"
                    }
                  >
                    <Button className="text-white border-white border-2">
                      {t("build_resume")} {/* Use translation key */}
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center align-middle mt-8 text-white">
                  <div className="text-lg font-bold flex gap-4">
                    {t("featured_on")}
                    <div>•</div>
                    <div className="flex gap-2">
                      {" "}
                      <FaStar className="text-yellow-500 w-6 h-6" />
                      <FaStar className="text-yellow-500 w-6 h-6" />
                      <FaStar className="text-yellow-500 w-6 h-6" />
                      <FaStar className="text-yellow-500 w-6 h-6" />
                      <FaStar className="text-yellow-500 w-6 h-6" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
                  <div className="flex gap-6">
                    <div className="">
                      {" "}
                      <Image
                        src={microsoft}
                        alt="Microsoft Logo"
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="">
                      {" "}
                      <Image
                        src={microsoft}
                        alt="Microsoft Logo"
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="">
                      {" "}
                      <Image
                        src={microsoft}
                        alt="Microsoft Logo"
                        width={200}
                        height={200}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Slider Section */}
            <div className="px-6 py-3">
              <div className=" md:max-w-lg p-4">
                <Image src={Banner} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Home_step />
      {/* <ATSResumeSection /> */}
      {/* <Home_third /> */}
    </>
  );
}

export default Home_first;
