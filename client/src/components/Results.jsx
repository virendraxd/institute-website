import React from 'react'
import { results } from '../data/results.js'
import { useState } from 'react'
import Divider from './Divider'
import maleStudent from '../assets/students/student-male.png'
import femaleStudent from '../assets/students/student-female.png'
import AnimateCounter from './AnimatedCounter.jsx'

function Results() {

  const [year, setYear] = useState("2025-2026");
  const [selectedClass, setSelectedClass] = useState("12th");

  const tempImages = {
    tempImage1: maleStudent,
    tempImage2: femaleStudent,
  }

  const students =
    year && selectedClass
      ? results[year][selectedClass]
      : [];

  const sortedStudents = [...students].sort(
    (a, b) => parseFloat(b.marks) - parseFloat(a.marks)
  );

  const resultStats = [
    { label: "Pass Rate", value: 98, suffix: "%" },
    { label: "Students", value: 450, suffix: "+" },
    { label: "Distinctions", value: 120, suffix: "+" },
    { label: "School Toppers", value: 15, suffix: "+" }
  ]

  return (
    <section id="results" className="section-padding bg-(--bg-secondary)">
      <h2 className="section-heading">Results & Achievements</h2>
      <Divider />

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100 w-full sm:w-auto">
          <label className="text-gray-500 font-medium whitespace-nowrap text-sm">Batch:</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="bg-transparent focus:outline-none font-bold text-(--primary-accent) cursor-pointer w-full"
          >
            {Object.keys(results).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100 w-full sm:w-auto">
          <label className="text-gray-500 font-medium whitespace-nowrap text-sm">Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-transparent focus:outline-none font-bold text-(--primary-accent) cursor-pointer w-full"
          >
            <option value="10th">Class 10</option>
            <option value="12th">Class 12</option>
          </select>
        </div>
      </div>
      {/* Student Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
        {sortedStudents.map((student) => (
          <div
            key={student.image}
            className="bg-white overflow-hidden border rounded-xl border-(--secondary-accent)"
          >
            <div className="relative overflow-hidden aspect-square">
              <img
                src={
                  (student.name.length) % 2
                    ? tempImages.tempImage1
                    : tempImages.tempImage2
                }
                alt={student.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="px-3 py-1 text-center">
              <h3 className="text-sm md:text-base font-bold text-gray-800 mb-1 truncate opacity-[0.6]">
                {student.name}
              </h3>
              <p className="text-2xl md:text-3xl font-black text-(--primary-accent)">
                {student.marks}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-20 bg-white px-2 py-8 sm:p-20 lg:p-10">
        <h3 className="text-center opacity-[0.87] font-bold text-2xl sm:text-3xl md:text-4xl text-(--primary-accent) mb-12">
          Batch {year} Overview
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {resultStats.map((stat, i) => {
            const statMaxValue = stat.value;

            return (
              <div key={i} className="bg-(--bg-secondary) p-2 sm:p-4 md:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 text-center hover:border-(--secondary-accent) transition-colors group flex flex-col justify-center">
                <h3 className="text-4xl md:text-5xl font-black text-(--primary-accent) mb-2 ">
                  <AnimateCounter end={statMaxValue} suffix={stat.suffix} />
                </h3>

                <p className="text-sm md:text-base text-gray-400 font-bold uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>)
          })}
        </div>
      </div>
    </section>
  )
}
export default Results
