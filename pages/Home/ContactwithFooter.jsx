"use client";
import Image from "next/image";
import { useState } from "react";
import checklist from "../../public/assets/contact-checklist.png";
import contactImg from "../../public/assets/contact_form_img.png";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function ContactFooter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    phone: "",
    project: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* Left Side */}
        <div>
          <h2 className="text-3xl font-bold leading-snug mb-6">
            Get Real Estimates And Ideal Solutions For Your Project.
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center gap-2">
              <Image src={checklist} alt="checklist" height={20} width={20} />
              <span>We will respond to you within 24 hours.</span>
            </li>
            <li className="flex items-center gap-2">
              <Image src={checklist} alt="checklist" height={20} width={20} />{" "}
              <span>We’ll sign an NDA if requested.</span>
            </li>
            <li className="flex items-center gap-2">
              <Image src={checklist} alt="checklist" height={20} width={20} />{" "}
              <span>Access to dedicated product specialists.</span>
            </li>
          </ul>
          <div className="mt-6 flex items-center gap-4">
            <Image
              src={contactImg}
              alt="Support"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="text-gray-500 text-sm">Inquires.</p>
              <a
                href="mailto:sales@CFResume.com"
                className="text-brandBlue font-semibold"
              >
                sales@CFResume.com
              </a>
            </div>
          </div>
        </div>

        {/* Right Side (Form) */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-8 space-y-6"
        >
          <div>
            <p className="font-semibold mb-3">1. Tell us about your company</p>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mb-3"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mb-3"
            />
            <div className="flex gap-3">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-1/2 p-3 border rounded-lg"
              >
                <option value="">Country</option>
                <option value="india">India</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
              </select>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-1/2 p-3 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <p className="font-semibold mb-3">
              2. Tell us more about your project
            </p>
            <textarea
              name="project"
              placeholder="Describe your project briefly"
              value={formData.project}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg h-28"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full p-3 rounded-full border border-black hover:bg-brandBlue hover:text-white transition"
          >
            Submit <span>📞</span>
          </button>
          <p className="text-xs text-gray-500 mt-2">
            By Sending This Form I Confirm That I Have Read And Accept The{" "}
            <a href="#" className="text-brandBlue underline">
              Privacy Policy
            </a>
          </p>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10">
          {/* Logo and About */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="text-blue-500">CF</span>Resume
            </h3>
            <p className="text-sm leading-relaxed">
              There Are Many Variations Of Passages Of Lorem Ipsum Available,
              But The Majority Have Suffered Alteration In Some Form, By
              Injected Humour, Or Randomised Words Which Don’t Look Even
              Slightly Believable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Testimonials</a>
              </li>
              <li>
                <a href="#">Career</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Scope & Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">Scope & Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#">AI Resume Builder</a>
              </li>
              <li>
                <a href="#">AI Skill Tests</a>
              </li>
              <li>
                <a href="#">AI CV Parsing</a>
              </li>
            </ul>
          </div>

          {/* AI Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">AI Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#">AI Resume Accuracy</a>
              </li>
              <li>
                <a href="#">AI Resume Enhancer</a>
              </li>
              <li>
                <a href="#">AI Job Match & Apply</a>
              </li>
            </ul>
            <p className="mt-4 text-sm">info@example.com</p>
            <div className="flex gap-2 mt-3">
              <input
                type="email"
                placeholder="Enter Your Email..."
                className="p-2 rounded-l-lg text-gray-900 w-full"
              />
              <button className="bg-brandBlue px-4 rounded-r-lg text-white">
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-6">
          <p className="text-sm">
            © 2025 Inspireambitions.In All Rights Reserved
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-blue-500">
              <FaFacebookF />
            </a>
            <a href="#" className="text-sky-400">
              <FaTwitter />
            </a>
            <a href="#" className="text-red-500">
              <FaYoutube />
            </a>
            <a href="#" className="text-pink-500">
              <FaInstagram />
            </a>
            <a href="#" className="text-blue-700">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
