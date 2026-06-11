import React, { useState, useEffect } from 'react'
import { navLinks } from '../data/navLinks.js'

function Nav({ heroRef, openModal }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [outsideHero, setOutsideHero] = useState(false);

  useEffect(() => {
    if (!heroRef?.current) return;

    const observer = new IntersectionObserver(
      ([entries]) => {
        setOutsideHero(!entries.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(heroRef.current);

    return () => observer.disconnect();

  }, [heroRef]);

  return (
    <header className="animate-bounce trns sticky top-0 z-50 w-full h-0 pointer-events-none">
      <div className="px-[5%] sm:px-[5%] lg:px-[10%] pt-3 sm:pt-4">
        <nav
          className={`
            mx-auto w-full max-w-7xl pointer-events-auto
            transition-all duration-300 ease-in-out
            shadow-[0_8px_32px_0_rgba(0,33,71,0.15)]
            rounded-2xl px-6 md:px-10 py-4
            flex justify-between items-center

            ${outsideHero
              ? `
              bg-slate-950/40 backdrop-blur-xl border border-slate-600 shadow-xl
              `
              : `
              bg-white/10 backdrop-blur-md border border-white/20`
            } 
          `}
        >

          {/* Logo */}
          <div className="text-white font-bold text-2xl md:text-3xl font-montserrat tracking-tight">
            Knight <span className="text-(--secondary-accent)">Academy</span>
          </div>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-6 text-white font-medium">

            {navLinks.map((link) => (
              <li
                key={link.name}
                className="relative group"
              >
                <a
                  href={link.href}
                  className="hover:text-(--secondary-accent) transition-colors duration-300"
                >
                  {link.name}
                </a>

                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-(--secondary-accent) transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}

            <li>
              <button
                className="bg-(--primary-accent) border border-(--primary-accent)/30 text-(--text-on-dark) font-semibold cursor-pointer  px-6 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
                onClick={() => openModal("admission")}
              >
                Admissions
              </button>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-white p-1 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>

          {/* Mobile Dropdown */}
          <div
            className={`
              absolute top-full  right-0 mt-4  lg:hidden 
              bg-(--primary-accent)/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6
              transition-all duration-300 origin-top max-w-xl
              ${isMenuOpen ? 'scale-y-100 opacity-100 visible' : 'scale-y-0 opacity-0 invisible'}
            `}
          >
            <ul className="flex flex-col gap-6 items-end text-white sm:text-lg text-lg/[1.2] font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="block w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <button className="w-full bg-(--secondary-accent) text-white py-3 px-2 rounded-xl font-bold">
                  Admission Enquiry
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Nav
