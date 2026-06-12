import React, { useRef } from 'react'
import { useState } from "react";
import Hero from '../components/Hero'
import About from '../components/About'
import WhyChooseUs from '../components/WhyChooseUs'
import Courses from '../components/Courses'
import Results from '../components/Results'
import Facilities from '../components/Facilities'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import Annoucement from '../components/Annoucement'
import Reveal from '../components/Reveal'
import FloatingBtn from '../components/FloatingBtn'
import EnquiryModal from '../components/EnquiryModal'
import '../styles/Home.css'

function Home() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedCourse, setSelectedCourse] = useState(null);

    const openModal = (type, course = null) => {
        setModalType(type);
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    return (
        <>

            <Nav
                openModal={openModal}
            />

            <div className="pt-14.5 lg:pt-16">
                <Annoucement
                    openModal={openModal}
                />

                <Hero
                    openModal={openModal}
                />
            </div>

            <Reveal>
                <About />
            </Reveal>

            <Reveal>
                <WhyChooseUs />
            </Reveal>

            <Reveal>
                <Courses
                    openModal={openModal}
                />
            </Reveal>

            <Reveal>
                <Results />
            </Reveal>

            <Reveal>
                <Facilities />
            </Reveal>

            <Reveal>
                <Testimonials />
            </Reveal>

            <Reveal>
                <Contact />
            </Reveal>

            <FloatingBtn />

            <Footer
                openModal={openModal}
            />

            <EnquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                modalType={modalType}
                selectedCourse={selectedCourse}
            />
        </>
    )
}
export default Home