import React from 'react'
import { useState, useEffect } from 'react';
import '../../styles/Home.css'
import '../../App.css'
import Navbar from './Header'

function Leads() {
    const [leads, setLeads] = useState([])
    const [selectedLead, setSelectedLead] = useState(null)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/admissions`)
            .then(res => res.json())
            .then(data => setLeads(data));
    }, []);

    const leadFields = [
        ["Phone", selectedLead?.phone],
        ["Course", selectedLead?.course],
        ["Parent", selectedLead?.parentName],
        ["School", selectedLead?.school],
        ["Email", selectedLead?.email],
        ["Batch", selectedLead?.batchTiming],
        ["Status", selectedLead?.status],
        ["Form Type", selectedLead?.formType],
        ["Message", selectedLead?.message],
    ];

    const [btnState, setBtnState] = useState(null);

    const changeInnerText = (lead) => {
        setBtnState(lead._id);

        setTimeout(() => {
            setBtnState(null);
        }, 8000);
    };

    return (
        <>
            <Navbar />
            
            <section className='px-2 py-8 sm:px-12 sm:y-16 bg-(--bg-secondary)'>
                <h2 className='section-heading'>Leads</h2>

                <div className="flex flex-col xl:flex-row gap-6 mt-4 sm:mt-10">

                    {/* Table */}
                    <div className="flex-1 overflow-x-auto border-2 rounded-xl border-gray-200 shadow-sm">
                        <table border="1" className="bg-(--bg-color) w-full border-collapse">
                            <thead className="bg-blue-100 border-b-2 border-gray-400">
                                <tr>
                                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                                    <th className="px-6 py-4 text-left font-semibold">Course</th>
                                    <th className="px-6 py-4 text-left font-semibold">Contact</th>
                                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                                    <th className="px-6 py-4 font-semibold">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {leads.map((lead) => (
                                    <tr
                                        key={lead._id}
                                        className="border-b border-gray-200 hover:bg-gray-300/30 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-extrabold">{lead.name}</td>
                                        <td className="px-6 py-4">{lead.course}</td>
                                        <td className="px-6 py-4">{lead.phone}</td>

                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                                                {lead.status}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">{new Date(lead.createdAt).toLocaleDateString()}</td>

                                        <td className="px-6 py-4 text-center">
                                            <button
                                                className="py-3 w-24 rounded-lg bg-(--primary-accent) text-white hover:text-white/80 cursor-pointer hover:bg-(--primary-light) hover:scale"
                                                onClick={() => {
                                                    setSelectedLead(lead);
                                                    changeInnerText(lead);
                                                }}
                                            >
                                                {btnState === lead._id
                                                    ? "Fetched"
                                                    : "View"
                                                }
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Sidebar */}
                    <aside className="w-full xl:w-96 shrink-0 flex flex-col justify-center sm:justify-start items-center align-middle">
                        <div className="sticky top-6  bg-(--bg-color) px-4 sm:px-6 py-6 sm:py-8 w-full sm:max-w-md border-2 border-gray-200 shadow-sm">
                            <h3 className="text-center font-bold text-2xl">Student Info</h3>

                            <table className="bg-(--bg-color) w-full shadow-sm mt-4">
                                <thead className="bg-blue-100 border-b-2 border-gray-400">
                                    <tr>
                                        <th colSpan="2" className="text-left px-4 py-2 font-bold">
                                            {selectedLead?.name || "Select a Lead"}
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {leadFields.map(([label, value]) => (
                                        <tr key={label}>
                                            <th className="px-4 py-2 text-left font-semibold">{label}</th>
                                            <td className="text-left" >{value || "-"}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>

                            <div className="grid grid-cols-2 gap-3 mt-6">
                                <a
                                    href={`https://wa.me/${selectedLead?.phone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-green-600 text-white py-2 rounded-lg text-center cursor-pointer"
                                >
                                    WhatsApp
                                </a>

                                <button
                                    className="flex-1 bg-yellow-500 text-white py-2 rounded-lg cursor-pointer"
                                >
                                    Mark Contacted
                                </button>

                                <button
                                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg cursor-pointer"
                                >
                                    Mark Admitted
                                </button>

                                <button
                                    className="flex-1 bg-red-600 text-white py-2 rounded-lg cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </section >
        </>
    )
}

export default Leads
