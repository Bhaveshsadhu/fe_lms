import React from 'react'
import heroImg from '@/assets/hero.png'
import { Container, Row, Col, Button } from 'react-bootstrap';

const Hero = () => {
    return (
        <Container fluid className="hero">
            <Row className="justify-content-center py-2">
                <Col xs={12} lg={10}>
                    <div className="text-center mt-4">
                        <h1 className='title-main delius-unicase-bold'>Welcome to our Online LMS</h1>

                    </div>

                    <Row className="align-items-center hero-content">
                        {/* Text block */}
                        <Col xs={12} md={6} className="mb-4 mb-md-0">
                            <div>
                                {/* <h3 className="text-center text-md-start">Education Online</h3> */}
                                <h3 className="cards-title delius-unicase-bold">Education Online</h3>
                                <p className=''>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                                    adipisci ipsam fugit corrupti rem quibusdam quos eaque qui
                                    neque, impedit expedita autem, ab beatae quas similique vel
                                    ea obcaecati culpa at sed ex accusamus? Dolorum cupiditate
                                    ducimus commodi a impedit, sed blanditiis aliquid architecto
                                    deleniti voluptatem magni, delectus esse nostrum.
                                </p>
                                <Button className='button-color'>Borrow Books</Button>
                            </div>
                        </Col>

                        {/* Image block */}
                        <Col xs={12} md={6} className="text-center">
                            <img src={heroImg} className="img-fluid" alt="LMS Hero" />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Hero