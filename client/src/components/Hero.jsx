import React, { useEffect, useRef, useState } from 'react';
import { scrollToSection } from "../utils/scrollToSection";

function Hero({ openModal }) {
  const slideImages = [
    "https://imgs.search.brave.com/Ev0JgjJxD1BJwh3TrJdI_cEJ0RGVHa8ujrij0GLO9Ck/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNzUv/MzIyLzc4Ni9zbWFs/bC9lbXB0eS1jbGFz/c3Jvb20td2l0aC1k/ZXNrcy1hbmQtYS13/aGl0ZWJvYXJkLXJl/YWR5LWZvci1sZWFy/bmluZy1mcmVlLXBo/b3RvLmpwZw",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1920",
  ];

  const slides = [
    {
      title: "Building Future Toppers",
      subtitle:
        "Empowering students with the knowledge, discipline and confidence to achieve academic excellence."
    },

    {
      title: "Proven Results",
      subtitle:
        "Trusted for consistent board results and competitive exam success."
    },

    {
      title: "Where Learning Meets Success",
      subtitle:
        "Modern classrooms, expert mentors and a growth-focused environment designed for future achievers."
    }
  ];

  const sliderRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const goToSlide = (index) => {
    const slider = sliderRef.current;

    if (!slider) return;

    slider.scrollTo({
      left: index * slider.clientWidth,
      behavior: "smooth",
    });

    setCurrent(index);
  };

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const interval = setInterval(() => {
      setCurrent(prev => {
        const next = (prev + 1) % slides.length;
        const slideWidth = slider.firstElementChild.clientWidth;
        slider.scrollTo({
          left: next * slideWidth,
          behavior: "smooth",
        });

        return next;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section>
      <div className="relative">
        <ul
          className=" flex overflow-x-hidden scroll-smooth snap-x snap-mandatory"
          ref={sliderRef}
        >
          {slides.map((slide, index) => (
            <li
              key={index}
              className="relative snap-center flex-[0_0_100%] h-auto min-h-142 bg-gray-200"
            >
              <img
                // key={`${current}-content`}
                src={slideImages[index]}
                alt=""
                className="absolute inset-0 w-full h-full  object-cover animate-hero-image"
              />

              <div className="absolute inset-0 bg-black/40 flex items-center align-middle justify-center z-10">
                <div className="flex items-center flex-col text-center">
                  <p className="text-(--text-on-dark) font-(family-name:--font-amethysta) 
                    text-4xl/[0.95] sm:text-6xl md:text-6xl lg:text-8xl   
                    max-w-75 sm:max-w-110 md:max-w-160 lg:max-w-190 animate-title"
                  >
                    {slide.title}
                  </p>

                  <p className="text-(--text-on-dark)/70 font-(family-name:--font-roboto) 
                    text-base md:text-xl  
                    max-w-60 sm:max-w-75 md:max-w-100 lg:max-w-150
                    my-6 animate-subtitle"
                  >
                    {slide.subtitle}
                  </p>

                  <div className="flex gap-6 mt-8 items-center justify-center animate-buttons">
                    <button
                      className="bg-(--primary-accent) cursor-pointer text-(--text-on-dark) px-6 sm:px-8 border border-(--secondary-accent) hover:bg-(--primary-light) shadow-lg hover:shadow-xl
                    rounded-lg transition-colors duration-300 text-shadow-lg
                    font-semibold lg:font-bold 
                      text-sm lg:text-lg
                      py-2 sm:py-3 
                    "
                      onClick={() => openModal("apply")}
                    >
                      Apply Now
                    </button>

                    <button className="bg-transparent cursor-pointer text-(--text-on-dark) px-6 sm:px-8 border border-(--secondary-accent) hover:bg-(--primary-light) shadow-lg hover:shadow-xl
                    rounded-lg transition-colors duration-300 text-shadow-lg
                    font-semibold lg:font-bold 
                      text-sm lg:text-lg
                      py-2 sm:py-3 
                    "
                      onClick={() =>
                        scrollToSection("#results")
                      }>
                      View Results
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              className={current === index ? "dot active" : "dot"}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section >
  );
}

export default Hero;