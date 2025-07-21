import DisplayCards from '@/components/DisplayCards'
import Hero from '@/components/Hero'
import React, { useEffect, useState } from 'react'
import thumbimg from '@/assets/pbooks.jpeg'
import Stat from '@/components/Stat'
import AboutUs from '@/components/AboutUs'
import LibraryBenefits from '@/components/BenefitList'
import { getAllBooksToDisplay } from '@/axio/axioHelper'
import { useDispatch } from 'react-redux'
import { setBook } from '@/redux/books/bookSlice'


const HomePage = () => {

    const [recentBookObj, setrecentBookObj] = useState([])
    const [allBookObj, setAllBookObj] = useState([])
    const dispatch = useDispatch();


    const fetchBooks = async () => {
        try {
            const { books, status } = await getAllBooksToDisplay()
            if (status === "success") {
                setAllBookObj(books)
                dispatch(setBook(books));
                // compute one-month-ago
                const oneMonthAgo = new Date();
                oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

                // keep only books created after that date
                const recentBooks = books.filter(book =>
                    new Date(book.createdAt) >= oneMonthAgo
                );
                setrecentBookObj(recentBooks)
                // console.log(recentBooks)
            }

        } catch (error) {
            toast.error(error.message || "Failed to fetch books");

        }
    }

    useEffect(() => {
        fetchBooks()

    }, [])
    return (
        <div>
            <Hero></Hero>
            {/* New Added Books */}
            <DisplayCards title="New Added Books" bookObj={recentBookObj} />
            <DisplayCards title="All Books" bookObj={allBookObj} />
            <Stat></Stat>
            <AboutUs></AboutUs>
            <LibraryBenefits></LibraryBenefits>
        </div>
    )
}

export default HomePage