import React from 'react'

function LeadSidebar({ selectedLead, leadFields, noLeadSelected, updateStatus, deleteLead, closeSidebar }) {
    return (
        <aside className={noLeadSelected
            ? "hidden lg:flex w-full xl:w-96 shrink-0 my-5  flex-col justify-center sm:justify-start items-center align-middle"
            : "flex fixed inset-0 z-50 bg-black/50 p-4 justify-center items-center lg:static lg:bg-transparent lg:p-0 lg:flex w-full xl:w-96 shrink-0 flex-col lg:justify-start align-middle"}>
            <div className="bg-(--bg-page) px-4 sm:px-6 py-6 sm:py-8 w-full sm:max-w-md border border-(--admin-border) shadow-sm relative">

                {/* Close Button for Mobile */}
                <button
                    onClick={closeSidebar}
                    className="lg:hidden absolute top-4 right-4 text-(--admin-border) hover:text-gray-800 text-xl font-bold cursor-pointer"
                >
                    ✕
                </button>

                <h3 className="text-center font-bold text-xl text-(--brand-primary)">Student Info</h3>

                <table className="bg-(--bg-page) w-full shadow-sm mt-4">
                    <thead className="bg-(--admin-label) border-b-2 border-gray-400">
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
                                <th className="px-4 py-2 text-left font-semibold text-(--brand-primary)">{label}</th>
                                <td className="text-left text-(--brand-primary)/80" >{value || "-"}</td>
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
                        {selectedLead?.status === "contacted"
                            ? "✓ Contacted"
                            : "Mark Contacted"
                        }
                    </button>

                    <button
                        onClick={() => updateStatus("admitted")}
                        className="flex-1 bg-blue-500 text-white py-2 rounded-lg cursor-pointer"
                    >
                        {selectedLead?.status === "admitted"
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
    )
}

export default LeadSidebar
