import React from 'react'

function Stats() {
    const stats = [
        {
            label: "Total Leads",
            value: 125,
        },
        {
            label: "New",
            value: 38,
        },
        {
            label: "Contacted",
            value: 57,
        },
        {
            label: "Admitted",
            value: 30,
        },
    ];


    return (
        <section className="section-padding ">
            <div className="grid grid-cols-2 gap-4 ">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="border rounded-xl p-6"
                    >
                        <p className="text-sm">{stat.label}</p>
                        <h3 className="text-3xl font-bold">
                            {stat.value}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Stats
