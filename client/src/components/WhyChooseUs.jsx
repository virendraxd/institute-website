import React from 'react'
import { features } from '../data/institute.js'
import Divider from './Divider'

function WhyChooseUs() {
  return (
    <section className="section-padding bg-(--bg-secondary)">
      <h2 className="section-heading">Why Choose Us</h2>
      
      <Divider />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {
          features.map((feature, index) => (
            <div
              key={index}
              className="shadow-sm flex flex-col justify-center items-center px-4 py-6 sm:px-6 sm:py-8 bg-(--bg-primary) rounded-2xl border border-gray-100 hover:border-(--secondary-accent) hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-14 h-14 flex justify-center items-center bg-(--bg-secondary) rounded-xl mb-6 group-hover:bg-(--secondary-accent) transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-(--primary-accent) group-hover:text-white transition-colors duration-300 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={feature.icon}
                  />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-(--primary-accent) mb-4 opacity-[0.87]">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed text-center">
                {feature.description}
              </p>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default WhyChooseUs
