// BookDetail.jsx
import React from 'react';
import { useLocation } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/cart/cartSlice';
import ReactImageMagnify from 'react-image-magnify';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {
    Container,
    Row,
    Col,
    Badge,
    Button,
    Form,
    Card,
    ListGroup,
} from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import BreadcrumbComponent from '@/components/BreadcrumbComponent';

export default function BookDetail() {
    const location = useLocation();
    const dispatch = useDispatch()
    const { card } = location.state || {};
    const { title, author, rating, isbn13, description, reviews, pubDate, coverImage } = card
    const ratingInt = parseInt(rating, 10)
    // pubDate = '1 July 2015';
    // const title =
    //     'Computer Programming';
    // const author = 'Bhavesh Sadhu';
    // const rating = 4.6;
    // const reviews = 9225;
    // const pubDate = '1 July 2015';
    // const isbn10 = '01234567890';
    // const isbn13 = '978-10254789654';

    const handleOnCartClick = () => {
        dispatch(addToCart(card))
    }

    const renderStars = (r) => {
        console.log(r)
        const full = Math.floor(r);
        const half = r - full >= 0.5;
        const empty = 5 - full - (half ? 1 : 0);
        return (
            <>
                {Array(full)
                    .fill()
                    .map((_, i) => (
                        <FaStar key={'f' + i} className="text-warning" />
                    ))}
                {half && <FaStarHalfAlt className="text-warning" />}
                {Array(empty)
                    .fill()
                    .map((_, i) => (
                        <FaRegStar key={'e' + i} className="text-warning" />
                    ))}
            </>
        );
    };

    return (
        <Container className="py-5">
            {/* Breadcrumb trail */}
            <BreadcrumbComponent title={title}></BreadcrumbComponent>

            <Row>
                {/* Left: Zoomable Cover Image */}
                <Col md={4} className="text-center">
                    <ReactImageMagnify
                        {...{
                            smallImage: {
                                alt: title,
                                isFluidWidth: true,
                                src: import.meta.env.VITE_API_URL_IMG + coverImage,
                            },
                            largeImage: {
                                src: import.meta.env.VITE_API_URL_IMG + coverImage,
                                width: 1200,
                                height: 1800,
                            },
                            lensStyle: { backgroundColor: 'rgba(0,0,0,.2)' },
                            enlargedImageContainerDimensions: {
                                width: '150%',
                                height: '150%',
                            },
                        }}
                    />
                </Col>

                {/* Right: Details */}
                <Col md={8}>
                    <h3>{title}</h3>
                    <p>
                        by{' '}
                        <a href="#" className="text-decoration-none">
                            {author}
                        </a>
                    </p>

                    <div className="d-flex align-items-center mb-3">
                        {
                            Number.isNaN(ratingInt)
                                ?
                                <div>No Rating Yet</div>
                                :
                                <>
                                    <div>{renderStars(ratingInt)}</div>
                                    <Badge bg="warning" text="dark" className="ms-2">
                                        {ratingInt.toFixed(1)}
                                    </Badge></>

                        }

                        <small className="ms-2 text-muted">
                            ({reviews?.toLocaleString()} reviews)
                        </small>
                    </div>

                    <Row className="g-3 mb-4">
                        <Col sm={6}>
                            {/* Description */}
                            <h5>Description</h5>
                            <p>
                                {description}
                            </p>
                        </Col>
                        <Col sm={6}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <strong>Publication date:</strong> {pubDate}
                                    </ListGroup.Item>
                                    {/* <ListGroup.Item>
                                        <strong>ISBN-10:</strong> {isbn10}
                                    </ListGroup.Item> */}
                                    <ListGroup.Item>
                                        <strong>ISBN-13:</strong> {isbn13}
                                    </ListGroup.Item>
                                    {/* <ListGroup.Item>
                                        <Form.Group controlId="quantitySelect">
                                            <Form.Label className="mb-1">Quantity:</Form.Label>
                                            <Form.Select size="sm">
                                                {[1, 2, 3, 4, 5].map((n) => (
                                                    <option key={n} value={n}>
                                                        {n}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </ListGroup.Item> */}
                                    <ListGroup.Item className="d-grid gap-2">
                                        <Button onClick={handleOnCartClick} variant="warning" size="lg">
                                            Add to Cart <BsCart3 />
                                        </Button>
                                        {/* <Button variant="dark" size="lg">
                                            Buy Now
                                        </Button> */}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5>Reviews</h5>
                    <p>
                        {reviews}
                    </p>
                </Col>

            </Row>

        </Container>
    );
}
