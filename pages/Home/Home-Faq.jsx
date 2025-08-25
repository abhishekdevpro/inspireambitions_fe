"use client";
import { useState } from "react";

const faqs = [
  {
    title: "Costs and Fees",
    content:
      "Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Resume Generation Process",
    content: "Details about how resumes are generated...",
  },
  {
    title: "Formatting and Download",
    content: "Information about downloading and formats...",
  },
  {
    title: "Usage and Rights",
    content: "Usage rights and licensing info...",
  },
  {
    title: "Technical Questions",
    content: "Answers to technical-related queries...",
  },
  {
    title: "Security and Data Protection",
    content: "Your data security information...",
  },
];

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        Frequently <span className="text-brandBlue">Asked Questions</span>
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            onClick={() => toggleFAQ(index)}
            className={`cursor-pointer rounded-lg p-5 transition-all ${
              openIndex === index
                ? "bg-brandBlue text-white shadow-md"
                : "bg-blue-50 text-gray-800 hover:bg-blue-100"
            }`}
          >
            <h3 className="font-semibold">{faq.title}</h3>
            {openIndex === index && (
              <p className="mt-2 text-sm leading-relaxed">{faq.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
