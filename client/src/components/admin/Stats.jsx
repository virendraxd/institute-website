import React from 'react'

function Stats({ leads }) {
    const stats = [
        {
            label: "Total Leads",
            value: leads.length,
        },
        {
            label: "New",
            value: leads.filter(
                lead => lead.status === "new"
            ).length,
        },
        {
            label: "Contacted",
            value: leads.filter(
                lead => lead.status === "contacted"
            ).length,
        },
        {
            label: "Admitted",
            value: leads.filter(
                lead => lead.status === "admitted"
            ).length,
        },
    ];

    return (
        <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="border border-(--admin-border) rounded-xl p-4 font-medium bg-(--bg-card)"
                    >
                        <p className="text-sm lg:text-lg text-(--brand-primary)/85">{stat.label}</p>
                        <h3 className="text-3xl lg:text-4xl font-bold text-(--brand-primary)/95">
                            {stat.value}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Stats
