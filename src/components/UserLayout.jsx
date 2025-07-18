import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Link, Outlet } from "react-router"
import { Container, Row, Col } from "react-bootstrap"
import SideBar from './SideBar'
import AuthRoutes from './auth/AuthRoutes'

const UsertLayout = () => {
    return (
        <AuthRoutes>
            {/* Header */}
            <Header></Header>

            <div className='d-flex'>
                <div className='bg-dark text-white p-3' style={{ width: "200px" }}>

                    <SideBar></SideBar>
                </div>

                {/* Main sections */}
                <main className='main-section bg-secondary'>
                    <Outlet />
                </main>

            </div>



            {/* Footer */}
            <Footer></Footer>
        </AuthRoutes>
    )
}

export default UsertLayout