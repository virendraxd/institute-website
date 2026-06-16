import React from 'react'
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { scrollToSection } from '../utils/scrollToSection';
import { instituteData } from '../data/institute';
import { socialLinks } from '../data/socialinks';
import { courses } from '../data/courses';

function Footer({ openModal }) {
  return (
    <footer className="px-5 md:px-28 pt-16 pb-12 bg-(--primary-accent) text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-12 space-y-4 ">

        {/* About */}
        <div className="space-y-1">
          <h3 className="text-2xl font-bold font-montserrat tracking-tight">
            Knight <span className="text-(--secondary-accent)">Academy</span>

          </h3>
          <p className="text-gray-400 leading-relaxed pr-6">
            Empowering students with quality education and expert guidance to achieve their academic goals and excel in competitive exams.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-lg font-bold">Quick Links</h4>

          <ul className="space-y-2 text-gray-400">
            <li><a href="#about" className="hover:text-(--secondary-accent) transition-colors">About Us</a></li>
            <li><a href="#courses" className="hover:text-(--secondary-accent) transition-colors">Our Courses</a></li>
            <li><a href="#results" className="hover:text-(--secondary-accent) transition-colors">Results</a></li>
            <li><a href="#facilities" className="hover:text-(--secondary-accent) transition-colors">Facilities</a></li>
            <li><a href="#contact" className="hover:text-(--secondary-accent) transition-colors">Contact</a></li>
            <li><button onClick={() => openModal("enquiry")} className="hover:text-(--secondary-accent) transition-colors cursor-pointer">Enquiry</button></li>
          </ul>
        </div>

        {/* Courses */}
        <div className="space-y-3">
          <h4 className="text-lg font-bold">Our Courses</h4>

          <ul className="space-y-2 text-gray-400">
            {
              courses.map(course => (
                <li key={course.id}>
                  <a href={`#${course.id}`}
                    className="hover:text-(--secondary-accent) transition-colors">
                    {course.title}
                  </a>
                </li>
              ))
            }
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h4 className="text-lg font-bold">Contact Info</h4>

          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="https://maps.google.com/?q=Gwalior+Fort"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-row flex gap-3 hover:text-(--secondary-accent) transition-colors">
                <FiMapPin className="w-5 h-5 text-(--secondary-accent) shrink-0 mt-1 " />
                <span>
                  123, Education Hub, Near Knowledge Park,
                  City - 400001
                </span>
              </a>
            </li>

            <li className="flex items-center gap-3">
              <a href="tel:+91 98765 43210" className="flex-row flex gap-3 hover:text-(--secondary-accent) transition-colors">
                <FiPhone className="w-5 h-5 text-(--secondary-accent) shrink-0 " />
                <span>+91 98765 43210</span>
              </a>
            </li>

            <li className="flex  items-center gap-3">
              <a href="mailto:info@knightacademy.com" className="flex-row flex gap-3 hover:text-(--secondary-accent) transition-colors">
                <FiMail className="w-5 h-5 text-(--secondary-accent) shrink-0 " />
                <span>info@knightacademy.com</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex gap-6 justify-center mb-12">
        {
          socialLinks.map((link) => {
            const Icon = link.icon;

            return (

              <a key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-(--secondary-accent) transition-colors"
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </a>
            );
          })
        }
      </div>

      <div className="border-t border-gray-600 pt-10 flex flex-col-reverse  items-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} {instituteData[0].name}. All rights reserved.
        </p>
      </div>
    </footer >
  )
}

export default Footer
