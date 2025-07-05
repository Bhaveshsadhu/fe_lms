import DisplayCards from '@/components/DisplayCards'
import Hero from '@/components/Hero'
import React from 'react'
import thumbimg from '@/assets/pbooks.jpeg'
import Stat from '@/components/Stat'
import AboutUs from '@/components/AboutUs'
import LibraryBenefits from '@/components/BenefitList'


const HomePage = () => {
    const bookObj = Array(8).fill().map(() => ({
        thumbimg,
        title: "Java Programming",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque dolores accusamus ratione consequuntur placeat temporibus ab laudantium quae nulla nostrum?",
        rating: "*****",
        author: "Bhavesh",
    }))
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