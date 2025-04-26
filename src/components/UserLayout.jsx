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

            <Container fluid>
                <Row>
                    <Col md={3} xl={2} className='bg-dark text-white p-3'>
                        <div>Welcome</div>
                        <div><strong>Bhavesh Sadhu</strong></div>
                        <hr></hr>
                        <SideBar></SideBar>
                    </Col>
                    <Col md={9} xl={10}>
                        {/* Main sections */}
                        <main className='main-section'>
                            <Outlet />
                        </main></Col>
                </Row>
            </Container>


            {/* Footer */}
            <Footer></Footer>
        </AuthRoutes>
    )
}

export default UsertLayout