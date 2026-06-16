import React from 'react'
import { testimonials } from '../data/institute.js'
import Divider from './Divider'
import { useState, useEffect } from 'react'

function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const carouselTestimonials =
    testimonials.length >= 3
      ? [...testimonials, ...testimonials, ...testimonials]
      : testimonials;

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentTestimonial(
        (prev) => (prev + 1) % testimonials.length
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="px-0 py-16 md:py-24 lg:py-32  bg-(--bg-primary)">
      <h2 className="section-heading">Testimonials</h2>

      <Divider />

      <div className="overflow-hidden mt-12">
        <div
          className={`flex h-full py-2 gap-6 w-max ${testimonials.length >= 3 ? "animate-testimonials" : ""
            }`}
          style={{
            animationDuration: `${Math.max(
              testimonials.length * 6,
              18
            )}s`,
          }}
        >
          {(testimonials.length >= 3
            ? [...testimonials, ...testimonials]
            : testimonials
          ).map((testimonial, index) => (
            <div
              key={index}
              className=" w-[320px] sm:w-95 lg:w-105 bg-(--bg-secondary) p-8 rounded-2xl shadow-md flex flex-col justify-between shrink-0"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 
                        ${i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                        }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-600 italic mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>

              <div>
                <h4 className="font-bold text-(--primary-accent)">
                  {testimonial.name}
                </h4>

                <p className="text-sm text-(--text-primary)/75">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
