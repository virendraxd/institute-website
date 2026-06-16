import React, { useEffect } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";

function EnquiryModal({ isOpen, onClose, modalType, selectedCourse, }) {
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

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Autofill course if selectedCourse is provided
    useEffect(() => {
        if (selectedCourse?.title) {
            setFormData(prev => ({
                ...prev,
                course: selectedCourse.title
            }));
        }
    }, [selectedCourse, isOpen]);

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

    const validateForm = () => {
        const newErrors = {};

        // Name validation (min 2 chars)
        if (!formData.name.trim() || formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        // Phone validation (exactly 10 digits)
        const phone = formData.phone.replace(/\D/g, "");
        if (phone.length !== 10) {
            newErrors.phone = "Phone number must be exactly 10 digits";
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Course validation
        if ((modalType === "admission" || modalType === "apply" || modalType === "demo") && !formData.course) {
            newErrors.course = "Please select a course/class";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/admissions`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...formData,
                        formType: modalType
                    }),
                }
            );

            if (response.ok) {
                setIsSuccess(true);
                // Keep the success state for 2 seconds then close
                setTimeout(() => {
                    setIsSuccess(false);
                    onClose();
                    setFormData({
                        name: "",
                        phone: "",
                        parentName: "",
                        email: "",
                        course: "",
                        school: "",
                        batchTiming: "",
                        message: "",
                    });
                }, 4000);
            }
        } catch (error) {
            console.error(error);
        } finally {
            // Keep button disabled for 2 seconds after the response
            setTimeout(() => {
                setIsSubmitting(false);
            }, 2000);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null,
            });
        }
    };

    const getInputClass = (fieldName) => {
        return `w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition-all ${errors[fieldName]
            ? "border-red-500 focus:ring-red-200 bg-red-50"
            : "border-gray-300 focus:ring-(--primary-accent)/20 focus:border-(--primary-accent)"
            }`;
    };

    return createPortal(
        <div
            className="fixed inset-0 z-999 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl w-full max-w-2xl py-6 px-4 md:p-8 max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Success Overlay */}
                {isSuccess && (
                    <div className="absolute inset-0 bg-white/95 z-10 flex flex-col items-center justify-center text-center p-6 rounded-3xl">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Submission Successful!</h3>
                        <p className="text-gray-600">Thank you for your interest. We will contact you shortly.</p>
                    </div>
                )}

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-(--primary-accent)">
                        {getTitle()}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-3xl text-gray-500 hover:text-black cursor-pointer transition-colors"
                    >
                        ×
                    </button>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    {(modalType === "admission" ||
                        modalType === "apply" ||
                        modalType === "enroll" ||
                        modalType === "demo") && (
                            <>
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Student Name *"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={getInputClass("name")}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number (10 digits) *"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={getInputClass("phone")}
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
                                </div>
                            </>
                        )}

                    {(modalType === "admission" ||
                        modalType === "apply") && (
                            <>
                                <div>
                                    <input
                                        type="text"
                                        name="parentName"
                                        placeholder="Parent Name"
                                        value={formData.parentName}
                                        onChange={handleChange}
                                        className={getInputClass("parentName")}
                                    />
                                </div>

                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={getInputClass("email")}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                                </div>
                            </>
                        )}

                    {/* Course / Class Selection */}
                    {(modalType === "admission" ||
                        modalType === "apply" ||
                        (modalType === "demo" && !selectedCourse?.title)) && (
                            <div>
                                <select
                                    className={getInputClass("course")}
                                    name="course"
                                    required
                                    value={formData.course}
                                    onChange={handleChange}>
                                    <option value="" disabled>Select Course / Class *</option>
                                    <option value="Class 10">Class 10</option>
                                    <option value="Class 11">Class 11</option>
                                    <option value="Class 12">Class 12</option>
                                    <option value="Dropper">Dropper</option>
                                    <option value="JEE Preparation">JEE Preparation</option>
                                    <option value="NEET Coaching">NEET Coaching</option>
                                </select>
                                {errors.course && <p className="text-red-500 text-xs mt-1 ml-1">{errors.course}</p>}
                            </div>
                        )}

                    {(modalType === "enroll" || (modalType === "demo" && selectedCourse?.title)) && (
                        <div>
                            <input
                                name="course"
                                placeholder="Course"
                                readOnly
                                value={formData.course}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                            />
                        </div>
                    )}

                    {modalType === "enroll" && (
                        <div className="mt-4">
                            <input
                                type="text"
                                name="school"
                                placeholder="Current School"
                                value={formData.school}
                                onChange={handleChange}
                                className={getInputClass("school")}
                            />
                        </div>
                    )}

                    {modalType === "demo" && (
                        <div className="mt-4">
                            <select className={getInputClass("batchTiming")}
                                name="batchTiming"
                                required
                                value={formData.batchTiming}
                                onChange={handleChange}>
                                <option value="" disabled>Select Batch Timing *</option>
                                <option>Morning</option>
                                <option>Evening</option>
                            </select>
                        </div>
                    )}

                    {modalType === "enquiry" && (
                        <>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Student Name *"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={getInputClass("name")}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
                            </div>

                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number *"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={getInputClass("phone")}
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address *"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={getInputClass("email")}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                            </div>

                            <div>
                                <textarea
                                    rows="4"
                                    name="message"
                                    placeholder="How can we help you? *"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={getInputClass("message")}
                                />
                            </div>
                        </>
                    )}

                    {(modalType === "admission" ||
                        modalType === "apply") && (
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Additional Message
                                </label>

                                <textarea
                                    rows="3"
                                    name="message"
                                    placeholder="Any specific requirements or questions?"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={getInputClass("message")}
                                />
                            </div>
                        )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`
                            w-full
                            py-4
                            rounded-xl
                            bg-(--primary-accent)
                            text-white
                            font-bold
                            text-lg
                            transition-all
                            ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-lg hover:shadow-xl"}
                        `}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            modalType === "demo"
                                ? "Book Demo Class"
                                : modalType === "enquiry"
                                    ? "Send Enquiry"
                                    : "Submit Application"
                        )}
                    </button>
                </form>
            </div>
        </div>,
        document.body
    );
}

export default EnquiryModal;