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
        <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="border rounded-xl p-4 font-medium"
                    >
                        <p className="text-sm lg:text-lg">{stat.label}</p>
                        <h3 className="text-3xl lg:text-4xl font-bold">
                            {stat.value}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Stats
