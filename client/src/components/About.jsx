import React from 'react'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import { instituteData } from '../data/institute.js'
import Divider from './Divider'
import AnimatedCounter from "../components/AnimatedCounter";

function About() {

  return (
    <>
      <section id="about" className="section-padding">
        <h2 className="section-heading flex flex-wrap justify-center gap-2">
          About
          <span className='text-(--secondary-accent)'>
            {instituteData[0].name}
          </span>
        </h2>

        <Divider />

        <div className="flex flex-col mt-12 gap-12 lg:gap-18 ">
          <div className="flex flex-col md:flex-row justify-between gap-4 lg:gap-12 md:h-96  ">
            <div className="flex flex-col justify-center gap-2 md:max-w-96 lg:max-w-md xl:max-w-148"> 
              <p className="font-(family-name:--font-amethysta) text-3xl xl:text-4xl leading-tight text-(--primary-accent)">
                {instituteData[0].tagline}
              </p>

              <p className="text-lg sm:text-xl xl:text-2xl text-gray-600 mt-6">
                {instituteData[0].description.replace('{name}', instituteData[0].name)}
              </p>
            </div>

            <div className="flex justify-center items-center">
              <img
                src={instituteData[0].image} alt="institute-image"
                className="rounded-2xl w-auto h-auto max-w-full  lg:h-64 lg:w-124 shadow-xl mt-8 lg:mt-0 border-2 border-(--secondary-accent)"
              />
            </div>
          </div>

          <div>
            <div className="stats-grid grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 text-center">
              <div className="shadow-md stat-card p-4 md:p-6 bg-(--bg-secondary) border border-gray-100 rounded-2xl items-center">
                <h3 className="text-4xl sm:text-5xl font-bold text-(--primary-accent)">
                  <AnimatedCounter end={15} suffix="+" />
                </h3>

                <p className="text-sm md:text-base lg:text-lg text-gray-500 uppercase tracking-wider font-semibold">Years Experience</p>
              </div>

              <div className="shadow-md stat-card p-4 md:p-6 bg-(--bg-secondary) border border-gray-100 rounded-2xl items-center">
                <h3 className="text-4xl sm:text-5xl font-bold text-(--primary-accent)">
                  <AnimatedCounter end={1200} duration={1} suffix="+" />
                </h3>

                <p className="text-sm md:text-base lg:text-lg text-gray-500 uppercase tracking-wider font-semibold">Students Trained</p>
              </div>

              <div className="shadow-md stat-card p-4 md:p-6 bg-(--bg-secondary) border border-gray-100 rounded-2xl items-center">
                <h3 className="text-4xl sm:text-5xl font-bold text-(--primary-accent)">
                  <AnimatedCounter end={200} suffix="+" />
                </h3>

                <p className="text-sm md:text-base lg:text-lg text-gray-500 uppercase tracking-wider font-semibold">Selections</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
