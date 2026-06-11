import React from "react";
import { useState } from "react";

function EnquiryModal({ isOpen, onClose, modalType, selectedCourse, }) {
    if (!isOpen) return null;

    const getTitle = () => {
        switch (modalType) {
            case "admission":
                return "Admission Form";

            case "apply":
                return "Apply for Admission";

            case "enroll":
                return `Enroll in ${selectedCourse?.title || "Course"}`;

            case "demo":
                return "Book a Free Demo Class";

            case "enquiry":
                return "Send an Enquiry";

            default:
                return "Contact Us";
        }
    };

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        parentName: "",
        email: "",
        course: "",
        school: "",
        batchTiming: "",
        message: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/admissions",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            console.log(data);

        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div
            className="fixed inset-0 z-999 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl w-full max-w-2xl py-6 px-2 md:p-8 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-(--primary-accent)">
                        {getTitle()}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-3xl text-gray-500 hover:text-black cursor-pointer"
                    >
                        ×
                    </button>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {(modalType === "admission" ||
                        modalType === "apply" ||
                        modalType === "enroll" ||
                        modalType === "demo") && (
                            <>
                                <div>
                                    <label className="block mb-2 font-medium">
                                        Student Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        // placeholder="Student Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-2 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium">
                                        Mobile Number
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        // placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-2 py-2"
                                    />
                                </div>
                            </>
                        )}

                    {(modalType === "admission" ||
                        modalType === "apply") && (
                            <>
                                <div>
                                    <label className="block mb-2 font-medium">
                                        Parent Name
                                    </label>

                                    <input
                                        type="text"
                                        name="parentName"
                                        // placeholder=""
                                        value={formData.parentName}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-2 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-2 py-2"
                                    />
                                </div>
                            </>
                        )}

                    {(modalType === "admission" ||
                        modalType === "apply" ||
                        modalType === "demo") && (
                            <div>
                                <label className="block mb-2 font-medium">
                                    Class
                                </label>

                                <select className="w-full border rounded-lg px-2 py-2"
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}>
                                    <option>Select Class</option>
                                    <option>Class 10</option>
                                    <option>Class 11</option>
                                    <option>Class 12</option>
                                    <option>Dropper</option>
                                </select>
                            </div>
                        )}

                    {modalType === "enroll" && (
                        <>
                            <div>
                                <label className="block mb-2 font-medium">
                                    Selected Course
                                </label>

                                <input
                                    // readOnly
                                     name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-2 py-2 bg-gray-100"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Current School
                                </label>

                                <input
                                    type="text"
                                    name="school"
                                    value={formData.school}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-2 py-2"
                                />
                            </div>
                        </>
                    )}

                    {modalType === "demo" && (
                        <>
                            <div>
                                <label className="block mb-2 font-medium">
                                    Interested Course
                                </label>

                                <select className="w-full border rounded-xl px-4 py-3"
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}>
                                    <option>JEE Preparation</option>
                                    <option>NEET Coaching</option>
                                    <option>Class 12 Board</option>
                                    <option>Class 10 Board</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Preferred Batch
                                </label>

                                <select className="w-full border rounded-lg px-2 py-2"
                                    name="batchTiming"
                                    value={formData.batchTiming}
                                    onChange={handleChange}>
                                    <option>Morning</option>
                                    <option>Evening</option>
                                </select>
                            </div>
                        </>
                    )}

                    {modalType === "enquiry" && (
                        <>
                            <div>
                                <label className="block mb-2 font-medium sm:font-semibold">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-2 py-2"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Mobile Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-2 py-2"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-2 py-2"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Message
                                </label>

                                <textarea
                                    rows="4"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-2 py-2"
                                />
                            </div>
                        </>
                    )}

                    {(modalType === "admission" ||
                        modalType === "apply") && (
                            <div>
                                <label className="block mb-2 font-medium">
                                    Message
                                </label>

                                <textarea
                                    rows="4"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-2 py-2"
                                />
                            </div>
                        )}

                    <button
                        type="submit"
                        className="
                            w-full
                            py-4
                            rounded-xl
                            bg-(--primary-accent)
                            text-white
                            font-bold
                            hover:scale-[1.02]
                            transition-all
                            cursor-pointer
                        "
                    >
                        {modalType === "demo"
                            ? "Book Demo Class"
                            : modalType === "enquiry"
                                ? "Send Enquiry"
                                : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EnquiryModal;
