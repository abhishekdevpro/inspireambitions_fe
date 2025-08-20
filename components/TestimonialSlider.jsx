"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import max1 from "../public/assets/testimonial1.png";
import max2 from "../public/assets/testimonial2.png";
import max3 from "../public/assets/testimonial1.png";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

const testimonials = [
  {
    name: "Max",
    location: "Denver",
    image: max1,
    text: "The feedback on my skills section was invaluable. Love this AI service!",
  },
  {
    name: "Sarah",
    location: "Seattle",
    image: max2,
    text: "This Website made finding jobs so much easier! I love how simple it is to filter my search and set up alerts. Landed two interviews in my first week.",
  },
  {
    name: "Alex",
    location: "Chicago",
    image: max3,
    text: "I felt lost before finding this site. The resume builder helped me craft a much stronger document, and the practice interview questions were a lifesaver.",
  },
  {
    name: "Max",
    location: "Denver",
    image: max1,
    text: "The feedback on my skills section was invaluable. Love this AI service!",
  },
  {
    name: "Sarah",
    location: "Seattle",
    image: max2,
    text: "This Website made finding jobs so much easier! I love how simple it is to filter my search and set up alerts. Landed two interviews in my first week.",
  },
];

export default function TestimonialSlider() {
  return (
    <div className="bg-gray-900 text-white py-16 relative">
      <h2 className="text-3xl font-bold text-center mb-10">Testimonials</h2>
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-6xl mx-auto"
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white text-gray-900 p-6 rounded-xl shadow-lg relative">
              <p className="italic mb-6">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-4">
                {/* <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full border-2 border-[#00b38d]"
                /> */}
                <Image
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full border-2 border-[#00b38d]"
                  width={56}
                  height={56}
                />
                <div>
                  <h4 className="font-bold">{t.name}</h4>
                  <p className="text-sm text-gray-600">{t.location}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
