import React from 'react'
import Divider from './Divider'
import { faculties } from '../data/faculty'

function Faculty() {
    return (
        <>
            <section className="section-padding" id="faculty">
                <h2 className="section-heading">Our Faculty</h2>

                <Divider />

                <div className="flex flex-wrap justify-center items-center gap-8">
                    {faculties.map((faculty, index) => (
                        <div
                            key={index}
                            className="bg-(--bg-secondary) w-full max-w-72 rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                        >
                            <img
                                src={faculty.image}
                                alt={faculty.name}
                                className="w-full h-84 object-cover"
                            />

                            <div className="px-3 py-4">
                                <h3 className="text-2xl font-bold text-(--primary-accent)">
                                    {faculty.name}
                                </h3>

                                <p className="font-semibold text-(--secondary-accent)">
                                    {faculty.subject}
                                </p>

                                <p className="text-gray-600 mt-2">
                                    {faculty.designation}
                                </p>

                                <p className="text-gray-600">
                                    Experience: {faculty.experience}
                                </p>

                                <p className="text-gray-600">
                                    {faculty.qualification}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Faculty
