import React from 'react'
import { useState } from 'react'
import { scrollToSection } from '../utils/scrollToSection'
import { courses } from '../data/institute.js'
import Divider from './Divider'

function Courses({ openModal }) {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <section id="courses" className="section-padding bg-(--bg-primary)">
      <h2 className="section-heading">Courses Offered</h2>
      <Divider />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
        {
          courses.map((course) => (
            <article
              id={course.id}
              key={course.title}
              className="bg-(--bg-secondary) rounded-3xl px-4 py-6 sm:px-8 sm:py-10 md:px-12 md:py-16 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
            >
              <div className="">
                <h3 className="text-[28px] font-semibold text-center sm:text-3xl lg:text-4xl mb-5 font-(family-name:--font-amethysta) text-(--primary-accent)" >
                  {course.title}
                </h3>

                <p className="text-base sm:text-xl  text-gray-400 mb-6 flex items-center gap-2 ">
                  <span className="w-6 h-0.5 bg-(--secondary-accent)"></span>
                  {course.target}
                </p>

                <ul className="space-y-3 mb-6">
                  {
                    course.subjects.map(subject => (
                      <li key={subject} className="text-lg/[0.1]  font-semibold md:text-xl text-gray-600 flex items-center gap-3 ">
                        <svg className="w-5 h-5 text-(--secondary-accent)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        {subject}
                      </li>
                    ))
                  }
                </ul>

                <p className="text-base sm:text-xl text-gray-500 leading-relaxed italic">
                  {course.description}
                </p>
              </div>

              <button
                className="mt-8 w-full md:w-max px-8 py-3 bg-(--primary-accent) text-white rounded-xl font-bold cursor-pointer transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
                onClick={() => setSelectedCourse(course)}>
                Learn More
              </button>
            </article>
          ))
        }
      </div>

      {/* Course Modal */}
      {
        selectedCourse && (
          <div className="
            fixed inset-0
            bg-black/60
            backdrop-blur-sm
            z-50
            flex items-center justify-center
            p-4
          ">
            <div className="
              bg-white
              rounded-3xl
              p-8
              max-w-2xl
              w-full
              relative
            ">
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 cursor-pointer"
              >
                ✕
              </button>

              {/* Main Content */}
              <h2 className="flex justify-center font-(family-name:--font-amethysta) text-3xl sm:text-4xl mb-4">
                {selectedCourse.title}
              </h2>

              <p className="text-gray-500 mb-6">
                {selectedCourse.target}
              </p>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="space-y-8">
                  <div>
                    <h3 className="font-semibold mb-2 sm:text-lg">
                      Subjects Covered
                    </h3>

                    <ul className="mb-6 sm:text-base">
                      {selectedCourse.subjects.map(subject => (
                        <li key={subject}>
                          • {subject}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4 sm:text-lg">
                      <h3 className="font-semibold ">
                        Duration:
                      </h3>

                      <p className="sm:text-base">{selectedCourse.duration}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="font-semibold mb-2 sm:text-lg">
                      Course Features
                    </h3>

                    <ul className="mb-6 sm:text-base">
                      {selectedCourse.features?.map(feature => (
                        <li key={feature}>
                          ✓ {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 sm:text-lg">
                      Batch Timings
                    </h3>

                    <ul className="mb-6 sm:text-base">
                      {selectedCourse.batchTiming.map((timing) => (
                        <li key={timing}>
                          • {timing}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <Divider />

              <div className="flex flex-col gap-4 mt-8 sm:flex-row">
                <button
                  onClick={() => {
                    openModal("enroll", selectedCourse);
                    setSelectedCourse(null);
                  }}
                  className="
                bg-(--primary-accent)
                text-white
                px-6 py-3
                rounded-xl
                w-full
                font-semibold
                cursor-pointer
                duration-300
                shadow-lg hover:scale-105
                active:scale-95
                "
                >
                  Enroll Now
                </button>

                <button
                  onClick={() => {
                    openModal("demo")
                    setSelectedCourse(null)
                  }
                  }
                  className="
                    border-2 border-(--primary-accent)
                    text-(--primary-accent)
                    px-6 py-3
                    rounded-xl
                    w-full
                    font-semibold
                    hover:bg-(--primary-accent)
                    hover:text-white
                    transition-all
                    cursor-pointer
                    "
                >
                  Get a Demo
                </button>
              </div>
            </div>
          </div>
        )
      }
    </section >
  )
}

export default Courses
