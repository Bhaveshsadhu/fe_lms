import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from "react-router"

const DefaultLayout = () => {
    return (
        <div>
            {/* Header */}
            <Header></Header>

            {/* Main sections */}
            <main className='main-section'>
                <Outlet />
            </main>
            {/* Footer */}
            <Footer></Footer>
        </div>
    )
}

export default DefaultLayout