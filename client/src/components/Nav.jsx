import React, { useState, useEffect } from 'react'
import { navLinks } from '../data/navLinks.js'
import Logo from '/knight_academy-logo.png'

function Nav({ openModal }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-100 w-full">
      <nav
        className=" bg-(--bg-secondary)
            w-full  
            px-4 md:px-20 lg:px-16 xl:px-20 py-2 
            flex justify-between items-center
            border-slate-300 border-b-3"
      >

        {/* Logo */}
        <div className="flex items-center gap-1 sm:gap-3  text-(--primary-accent) text-shadow-2xs font-bold text-2xl md:text-4xl font-montserrat tracking-tight">
          <img
            src={Logo}
            alt="Knight Academy Logo"
            className="h-10 w-10 md:h-14 md:w-14 object-contain drop-shadow-sm"
          />

          <h1 className="text-(--primary-accent) font-bold text-2xl md:text-4xl font-montserrat tracking-tight">
            Knight
            <span className="text-(--secondary-accent)"> Academy</span>
          </h1>
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-8 lg:gap-6 text-(--text-primary) font-medium">

          {navLinks.map((link) => (
            <li
              key={link.name}
              className="relative group"
            >
              <a
                href={link.href}
                className="hover:text-(--secondary-accent) transition-colors duration-200 text-shadow-xs"
              >
                {link.name}
              </a>

              {/* <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-(--secondary-accent) transition-all duration-300 group-hover:w-full"></span> */}
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
          className="lg:hidden text-(--text-primary) p-1 focus:outline-none"
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
              absolute top-full right-1 mt-1 lg:hidden 
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
    </header>
  )
}

export default Nav
