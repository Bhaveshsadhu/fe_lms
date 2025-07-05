import React from 'react'


const benefitsLeft = [
    "100% free for up to 2000 titles or records.",
    "Instant creation of your online library.",
    "Unlimited member / patron accounts.",
    "Member reservation / self-service / overdue reminders.",

]

const benefitsRight = [

    "No installation and maintenance cost.",
    "Easy, no technical skill required.",
    "Access from anywhere using any internet-enabled device.",
    "Support multiple library branches."
]

function BenefitList({ items }) {
    return (
        <ul className="list-unstyled">
            {items.map((text, idx) => (
                <li
                    key={idx}
                    className="d-flex align-items-start border-bottom py-2"
                >
                    <span className="text-success me-2" style={{ lineHeight: 1 }}>
                        ✔
                    </span>
                    <span>{text}</span>
                </li>
            ))}
        </ul>
    )
}

export default function LibraryBenefits() {
    return (
        <section className="container py-5">
            {/* <h3 className="text-center mb-4 primary">Library Benefits</h3> */}
            <h3 className="text-center mb-4 d-inline-block pb-1 border-bottom border-2 border-danger primary">Library Benefits</h3>

            <div className="row">
                <div className="col-md-6">
                    <BenefitList items={benefitsLeft} />
                </div>
                <div className="col-md-6">
                    <BenefitList items={benefitsRight} />
                </div>
            </div>
        </section>
    )
}
