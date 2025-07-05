import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaFacebookF, FaTwitter, FaGooglePlusG } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer className="footer py-5">
            <Container>
                <Row className="gy-4">

                    {/* Brand + Social */}
                    <Col md={4}>
                        <h4 className="fw-bold">LMS</h4>
                        <p className="mb-3">Library Management Software</p>

                        <div className="mb-3">
                            <a href="#facebook" className="btn btn-outline-light btn-sm me-2">
                                <FaFacebookF />
                            </a>
                            <a href="#twitter" className="btn btn-outline-light btn-sm me-2">
                                <FaTwitter />
                            </a>
                            <a href="#google" className="btn btn-outline-light btn-sm">
                                <FaGooglePlusG />
                            </a>
                        </div>

                        <small className="d-block">&copy; 2025 lms.com, All rights reserved.</small>
                    </Col>

                    {/* Links Column 1 */}
                    <Col md={4}>
                        <h6 className="text-uppercase">About LMS</h6>
                        <ul className="list-unstyled">
                            <li><a href="#iphone" className="text-light text-decoration-none">iPhone app</a></li>
                            <li><a href="#contact" className="text-light text-decoration-none">Contact us</a></li>
                            <li><a href="#terms" className="text-light text-decoration-none">Terms of use</a></li>
                            <li><a href="#privacy" className="text-light text-decoration-none">Privacy policy</a></li>
                        </ul>
                    </Col>

                    {/* Links Column 2 */}
                    <Col md={4}>
                        <h6 className="text-uppercase">Plans</h6>
                        <ul className="list-unstyled">
                            <li><a href="#discover" className="text-light text-decoration-none">Discover</a></li>
                            <li><a href="#articles" className="text-light text-decoration-none">Articles</a></li>
                            <li><a href="#faqs" className="text-light text-decoration-none">FAQs</a></li>
                            <li><a href="#help" className="text-light text-decoration-none">Help</a></li>
                        </ul>
                    </Col>

                </Row>
            </Container>
        </footer>
    )
}
