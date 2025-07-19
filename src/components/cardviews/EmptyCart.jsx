import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { GiShoppingCart } from "react-icons/gi";
import { Link } from 'react-router-dom'




const EmptyCart = () => {
    return (
        <div className="cart py-5">
            <Container className="py-5 bg-light rounded ">
                <Row className="align-items-center">
                    <Col md={6} className="text-center mb-4 mb-md-0 ">
                        <div>
                            <GiShoppingCart size={250} />

                        </div>
                    </Col>
                    <Col md={6}>
                        <h2 className="mb-3">Your Cart is empty</h2>

                        <div>
                            <Link to="/login">
                                <Button variant="warning" className="me-2 px-4">
                                    Sign in to your account
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button variant="outline-secondary" className="px-4">
                                    Sign up now
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default EmptyCart