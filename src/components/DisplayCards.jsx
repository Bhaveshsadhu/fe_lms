import React, { useRef, useEffect } from 'react'
import Cards from '@components/Cards'

const DisplayCards = ({ title, bookObj }) => {


    const containerRef = useRef(null)
    const interval = 3000

    useEffect(() => {
        const container = containerRef.current
        if (!container || bookObj.length <= 4) return  // no scroll if 4 or fewer

        let idx = 0
        const slideCount = bookObj.length
        const cardWidth = () => container.clientWidth / 4

        const scrollOnce = () => {
            idx = (idx + 1) % slideCount
            container.scrollTo({
                left: idx * cardWidth(),
                behavior: "smooth",
            })
        }

        const timer = setInterval(scrollOnce, interval)
        return () => clearInterval(timer)
    }, [bookObj.length])

    return (
        <section className="p-1 py-3">
            <h2 className='cards-title d-flex justify-content-center align-items-center title-main mt-4 mb-3 delius-unicase-bold '>{title}</h2>

            <div className="cards-carousel" ref={containerRef}>
                {bookObj.map((card, i) => (
                    <div className="cards-carousel-item" key={i}>
                        <Cards {...card} />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default DisplayCards
