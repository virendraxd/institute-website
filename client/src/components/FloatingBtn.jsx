import React from 'react'
import { FaWhatsapp } from "react-icons/fa";

function FloatingBtn() {
    return (
        <div>
            <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className=" fixed  z-50 flex items-center justify-center rounded-full bg-[#2DB640] shadow-lg hover:scale-110 transition-all duration-300
bottom-4 right-4 sm:bottom-6 sm:right-6 
w-12 h-12 sm:w-14 sm:h-14 
                rounded-5xl
                "
            >
                <FaWhatsapp className="text-white text-3xl sm:text-4xl" />
            </a>
        </div>
    )
}

export default FloatingBtn
