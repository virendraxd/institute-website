import React from 'react'
import { useState, useEffect } from 'react';
import '../../styles/Home.css'
import '../../App.css'
import Navbar from '../../components/admin/Header'

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
        }, 3000);
    };

    const [visibleLeads, setVisibleLeads] = useState(10);
    const noLeadSelected = selectedLead === null;

    const updateStatus = async (status) => {
        if (!selectedLead) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admissions/${selectedLead._id}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status }),

                });

            const result = await res.json();

            if (result.success) {
                setSelectedLead(result.data);

                setLeads((prev) =>
                    prev.map((lead) =>
                        lead._id === result.data._id
                            ? result.data
                            : lead
                    )
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteLead = async () => {
        if (!selectedLead) return;

        const confirmed = window.confirm(`Delete ${selectedLead.name}'s lead?`);

        if (!confirmed) return;

        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/admissions/${selectedLead._id}`,
                {
                    method: "DELETE",
                }
            );

            setLeads((prev) =>
                prev.filter(
                    (lead) => lead._id !== selectedLead._id
                )
            );

            setSelectedLead(null);
        } catch (error) {
            console.error(error);
        }
    };

    const statusColors = {
        new: "bg-fuchsia-100 text-fuchsia-700",
        contacted: "bg-yellow-100 text-yellow-700",
        admitted: "bg-green-100 text-green-700",
    };

    return (
        <>
            <Navbar />

            <section className='px-2 py-8 sm:px-12 sm:y-16 bg-(--bg-secondary)'>
                <h2 className='section-heading'>Leads</h2>

                <div className="flex gap-6 flex-col xl:flex-row mt-4">
                    <div className="flex flex-col gap-6 ">

                        {/* Table */}
                        <div className="flex-1 overflow-x-auto border-2 rounded-xl border-gray-200 shadow-sm">
                            <table border="1" className="bg-(--bg-color) w-full border-collapse">
                                <thead className="bg-blue-100 border-b-2 border-gray-400">
                                    <tr>
                                        <th className="px-3 sm:px-6 py-2 sm:py-4 text-left font-semibold">Sno.</th>
                                        <th className="px-3 sm:px-6 py-2 sm:py-4 text-left font-semibold">Name</th>
                                        <th className="px-3 sm:px-6 py-2 sm:py-4 text-left font-semibold">Course</th>
                                        <th className="px-3 sm:px-6 py-2 sm:py-4 text-left font-semibold">Contact</th>
                                        <th className="px-3 sm:px-6 py-2 sm:py-4 text-left font-semibold">Status</th>
                                        <th className="px-3 sm:px-6 py-2 sm:py-4 text-left font-semibold">Date</th>
                                        <th className="px-3 sm:px-6 py-2 sm:py-4 font-semibold">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {leads.slice(0, visibleLeads).map((lead) => (
                                        <tr
                                            key={lead._id}
                                            className="border-b border-gray-200 hover:bg-gray-300/30 transition-colors"
                                        >
                                            <td className="px-3 sm:px-6 py-2 sm:py-4">{leads.indexOf(lead) + 1}</td>
                                            <td className="px-3 sm:px-6 py-2 sm:py-4 font-extrabold">{lead.name}</td>
                                            <td className="px-3 sm:px-6 py-2 sm:py-4">{lead.course}</td>
                                            <td className="px-3 sm:px-6 py-2 sm:py-4">{lead.phone}</td>

                                            <td className="px-3 sm:px-6 py-2 sm:py-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium
                                                    ${statusColors[lead.status] ||
                                                    "bg-gray-100 text-gray-700"
                                                    }`}
                                                >
                                                    {lead.status}
                                                </span>
                                            </td>

                                            <td className="px-3 sm:px-6 py-2 sm:py-4">{new Date(lead.createdAt).toLocaleDateString()}</td>

                                            <td className="px-3 sm:px-6 py-2 sm:py-4 text-center">
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

                        {/* Buttons */}
                        <div className="flex justify-center gap-4">
                            {visibleLeads < leads.length && (
                                <button
                                    onClick={() => setVisibleLeads(visibleLeads + 10)}
                                    className="px-3 sm:px-6 py-2 sm:py-4 rounded-lg bg-(--primary-accent) text-white cursor-pointer"
                                >
                                    Show More
                                </button>
                            )}

                            {visibleLeads > 10 && (
                                <button
                                    onClick={() => setVisibleLeads(10)}
                                    className="px-3 sm:px-6 py-2 sm:py-4 rounded-lg border cursor-pointer "
                                >
                                    Show Less
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="">
                        {/* Sidebar */}
                        <aside className="sticky top-6 w-full xl:w-96 shrink-0 flex flex-col justify-center sm:justify-start items-center align-middle">
                            <div className="bg-(--bg-color) px-4 sm:px-6 py-6 sm:py-8 w-full sm:max-w-md border-2 border-gray-200 shadow-sm">
                                <h3 className="text-center font-bold text-2xl">Student Info</h3>

                                <table className="bg-(--bg-color) w-full shadow-sm mt-4">
                                    <thead className="bg-blue-100 border-b-2 border-gray-400">
                                        <tr>
                                            <th colSpan="2" className="text-left px-4 py-2 font-bold">
                                                {selectedLead?.name || "Select a Lead First"}
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className={
                                        noLeadSelected ? "opacity-40" : ""
                                    }
                                    >
                                        {leadFields.map(([label, value]) => (
                                            <tr key={label}>
                                                <th className="px-4 py-2 text-left font-semibold">{label}</th>
                                                <td className="text-left" >{value || "-"}</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>

                                <div className={`grid grid-cols-2 gap-3 mt-6
                                        ${noLeadSelected
                                        ? "opacity-40 pointer-events-none"
                                        : ""
                                    }`}
                                >
                                    <a
                                        href={`https://wa.me/${selectedLead?.phone}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-green-600 text-white py-2 rounded-lg text-center cursor-pointer"
                                    >
                                        WhatsApp
                                    </a>

                                    <button
                                        onClick={() => updateStatus("contacted")}
                                        className="flex-1 bg-yellow-500 text-white py-2 rounded-lg cursor-pointer"
                                    >
                                        {selectedLead?.status === "Contacted"
                                            ? "✓ Contacted"
                                            : "Mark Contacted"
                                        }
                                    </button>

                                    <button
                                        onClick={() => updateStatus("admitted")}
                                        className="flex-1 bg-blue-500 text-white py-2 rounded-lg cursor-pointer"
                                    >
                                        {selectedLead?.status === "Admitted"
                                            ? "✓ Admitted"
                                            : "Mark Admitted"
                                        }
                                    </button>

                                    <button
                                        onClick={deleteLead}
                                        className="flex-1 bg-red-600 text-white py-2 rounded-lg cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Leads
