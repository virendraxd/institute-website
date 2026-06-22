import React, { useEffect, useState } from 'react'
import Divider from './Divider'
import { faculties } from '../data/faculty'

function Faculty() {
    const [currentFaculty, setCurrentFaculty] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const faculty = faculties[currentFaculty];

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentFaculty((prev) => (prev + 1) % faculties.length);

        }, 6000);

        return () => clearInterval(interval);
    }, [isPaused, faculty.length]);

    return (
        <>
            <section className="section-padding" id="faculty">
                <h2 className="section-heading">Our Faculty</h2>

                <Divider />

                <div
                    className="grid sm:grid-cols-2 gap-8 mt-12 items-center justify-center min-h-125 hover:cursor-pointer"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="overflow-hidden rounded-3xl xl:w-md xl:mx-auto">
                        <img
                            key={faculty.image}
                            src={faculty.image}
                            alt={faculty.name}
                            className="w-72 sm:w-full  h-90 sm:h-125 object-cover animate-fade"
                        />
                    </div>

                    <div
                        key={faculty.name}
                        className="animate-slide-left"
                    >
                        <p className="text-(--brand-secondary) font-bold uppercase tracking-widest">
                            {faculty.subject}
                        </p>

                        <h3 className="text-4xl md:text-5xl font-black text-(--brand-primary) mt-2">
                            {faculty.name}
                        </h3>

                        <p className="text-xl text-gray-600 mt-4">
                            {faculty.designation}
                        </p>

                        <div className="space-y-3 mt-8">
                            <p>
                                <strong>Experience:</strong> {faculty.experience}
                            </p>

                            <p><strong>Qualification:</strong> {faculty.qualification}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-3 mt-8">
                    {faculties.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentFaculty(index)}
                            className={`h-3 w-3 rounded-full transition-all cursor-pointer
                                ${currentFaculty === index
                                    ? "bg-gray-300/80 w-8"
                                    : "bg-gray-200"
                                }`
                            }
                        />
                    ))}
                </div>
            </section>
        </>
    )
}

export default Faculty
