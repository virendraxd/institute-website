import React from 'react'
import { facilities } from '../data/institute.js'
import Divider from './Divider'

function Facilities() {
  return (
    <section id="facilities" className="section-padding bg-white">
      <h2 className="section-heading">Our Facilities</h2>
      <Divider />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {facilities.map((facility, index) => (
          <div 
            key={index} 
            className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500"
          >
            <div className="aspect-video overflow-hidden">
              <img 
                src={facility.image} 
                alt={facility.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 bg-white">
              <h3 className="text-xl font-bold text-(--primary-accent) mb-2">
                {facility.title}
              </h3>
              <p className="text-gray-600">
                {facility.description}
              </p>
            </div>

            {/* Hover Overlay */}
            {/* <div className="absolute inset-0 bg-linear-to-t from-(--primary-accent)/80 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex items-end p-6 pointer-events-none">
              <span className="text-white font-medium">Read More →</span>
            </div> */}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Facilities
