import React from 'react'
import { useState, useEffect } from 'react';
import '../../styles/Home.css'
import '../../App.css'

function Leads() {
    const [leads, setLeads] = useState([])
    const [selectedLead, setSelectedLead] = useState(null)

    useEffect(() => {
        fetch("http://localhost:5000/api/admissions")
            .then(res => res.json())
            .then(data => setLeads(data));
    }, []);

    const leadFields = [
        ["Phone", selectedLead?.phone],
        ["Course", selectedLead?.course],
        ["Parent", selectedLead?.parentName],
        ["School", selectedLead?.school],
        ["Status", selectedLead?.status],
        ["Email", selectedLead?.email],
        ["Batch", selectedLead?.batchTiming],
        ["Message", selectedLead?.message],
    ];

    return (
        <>
            <section className='section-padding bg-(--bg-secondary)' >
                <h2 className='section-heading'>Leads</h2>

                <div className="overflow-x-auto border-2 rounded-2xl border-gray-200 shadow-sm">
                    <table border="1" className="bg-(--bg-color) w-full border-collapse">
                        <thead className="bg-blue-100 border-b-2 border-gray-400">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">Name</th>
                                <th className="px-6 py-4 text-left font-semibold">Course</th>
                                <th className="px-6 py-4 text-left font-semibold">Contact</th>
                                <th className="px-6 py-4 text-left font-semibold">Status</th>
                                <th className="px-6 py-4 text-left font-semibold">Date</th>
                                <th className="px-6 py-4 text-left font-semibold">Action</th>
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

                                    <td>{new Date(lead.createdAt).toLocaleDateString()}</td>

                                    <td>
                                        <button
                                            className="px-4 py-2 rounded-lg bg-(--primary-accent) text-white cursor-pointer"
                                            onClick={() => setSelectedLead(lead)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="bg-(--bg-color) px-6 py-8 w-96 border-2 rounded-r-2xl border-gray-200 shadow-sm">
                    <h3 className="text-center font-bold text-2xl">Side Panel</h3>

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
                                    <th className="text-left px-4 py-2 font-semibold">{label}</th>
                                    <td>{value || "-"}</td>
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
            </section >
        </>
    )
}

export default Leads
