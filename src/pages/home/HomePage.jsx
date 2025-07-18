import DisplayCards from '@/components/DisplayCards'
import Hero from '@/components/Hero'
import React, { useEffect, useState } from 'react'
import thumbimg from '@/assets/pbooks.jpeg'
import Stat from '@/components/Stat'
import AboutUs from '@/components/AboutUs'
import LibraryBenefits from '@/components/BenefitList'
import { getAllBooksToDisplay } from '@/axio/axioHelper'


const HomePage = () => {
    // const bookObj = Array(8).fill().map(() => ({
    //     thumbimg,
    //     title: "Java Programming",
    //     description:
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque dolores accusamus ratione consequuntur placeat temporibus ab laudantium quae nulla nostrum?",
    //     rating: "*****",
    //     author: "Bhavesh",
    // }))
    const [bookObj, setBookObj] = useState([])

    const fetchBooks = async () => {
        try {
            const { books } = await getAllBooksToDisplay()
            // compute one-month-ago
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

            // keep only books created after that date
            const recentBooks = books.filter(book =>
                new Date(book.createdAt) >= oneMonthAgo
            );
            setBookObj(recentBooks)
            console.log(recentBooks)

        } catch (error) {
        }
    }

    useEffect(() => {
        fetchBooks()

    }, [])
    return (
        <div>
            <Hero></Hero>
            {/* New Added Books */}
            <DisplayCards title="New Added Books" bookObj={bookObj} />
            <Stat></Stat>
            <AboutUs></AboutUs>
            <LibraryBenefits></LibraryBenefits>
        </div>
    )
}

export default HomePage