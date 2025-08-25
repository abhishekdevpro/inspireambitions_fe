"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import blogSection1 from "../../public/assets/Blog_sec_img1.png";
import blogSection2 from "../../public/assets/Blog_sec_img2.png";
import blogSection3 from "../../public/assets/Blog_sec_img3.png";
import avatar1 from "../../public/assets/Blog_client_img1.png";
import avatar2 from "../../public/assets/Blog_client_img2.png";
import avatar3 from "../../public/assets/Blog_client_img3.png";
// Blog data
const blogPosts = [
  {
    id: 1,
    image: blogSection1, // You'll need to add these images
    category: "Design",
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    author: "Olivia Rhye",
    date: "20 Jan 2022",
    avatar: avatar1,
  },
  {
    id: 2,
    image: blogSection2,
    category: "Product",
    title: "Migrating to Linear 101",
    description:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
    author: "Phoenix Baker",
    date: "19 Jan 2022",
    avatar: avatar2,
  },
  {
    id: 3,
    image: blogSection3,
    category: "Software Engineering",
    title: "Building your API Stack",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    author: "Lana Steiner",
    date: "18 Jan 2022",
    avatar: avatar3,
  },
];

export default function Blogs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-black">From</span>{" "}
            <span className="text-brandBlue">The Blog</span>
          </h2>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Blog Image */}
              <div className="relative h-80 overflow-hidden ">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Blog Content */}
              <div className="p-6">
                {/* Category */}
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 text-sm font-medium text-purple-600  bg-purple-100 rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Title with Arrow */}
                <div className="mb-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-gray-900 pr-4">
                      {post.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {post.description}
                </p>

                {/* Author and Date */}
                <div className="flex items-center mt-12">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src={post.avatar}
                      alt={post.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {post.author}
                    </p>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
