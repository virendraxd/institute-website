import React from 'react'
import { announcemet } from '../data/institute'

function Annoucement({ openModal }) {
    return (
        <>
            <section
                id="announcement-bar"
                className="flex flex-row bg-(--primary-accent) items-center justify-start md:justify-center p-1.5 sm:p-2 font-semibold border-b border-(--secondary-accent)/20"
            >
                <div
                    id="announcement-track"
                    className="flex w-max items-center text-xs whitespace-nowrap"
                >
                    {/* ITEM 1 */}
                    <div
                        id="announcement-item-1"
                        className="flex items-center gap-4 pr-8"
                    >
                        <span className="text-white  tracking-widest font-medium">
                            {announcemet.toUpperCase()}
                        </span>

                        <span className="text-gray-200">
                            &bull;
                        </span>

                        <button
                            className="text-(--secondary-accent) uppercase hover:text-(--btn-secondary) cursor-pointer text-xs tracking-wider"
                            onClick={() => openModal("apply")}
                        >
                            Apply Now
                        </button>
                    </div>

                    {/* ITEM 2 (duplicate for mobile loop) */}
                    <div
                        id="announcement-item-2"
                        className="flex items-center gap-4 pr-8"
                    >
                        <span className="text-(--text-primary)/90 text-sm tracking-widest font-medium">
                            {announcemet.toUpperCase()}
                        </span>

                        <span className="text-(--secondary-accent)">
                            &bull;
                        </span>

                        <button
                            className="text-(--secondary-accent) uppercase hover:text-(--btn-secondary) cursor-pointer text-xs tracking-wider"
                            onClick={() => openModal("apply")}
                        >
                            Apply Now
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Annoucement
