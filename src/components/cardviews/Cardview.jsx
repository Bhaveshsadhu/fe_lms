import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { decreaseQuantity, increaseQuantity, removeFromCart } from '@/redux/cart/cartSlice';

// import {
//     removeFromCart,
//     decrementQuantity,
//     incrementQuantity
// } from '../slices/cartSlice'

export default function Cardview() {
    const dispatch = useDispatch()
    const { items } = useSelector(state => state.cartInfo)

    if (items.length === 0) {
        return <p className="text-center my-5">Your cart is empty.</p>
    }

    return (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {items.map(item => (
                <Col key={item._id}>
                    <Card className="h-100 p-2">
                        <Card.Img
                            variant="top"
                            src={import.meta.env.VITE_API_URL_IMG + item.coverImage}

                            alt={item.title}
                            style={{ objectFit: 'cover', height: '200px' }}
                        />
                        <Card.Body className="d-flex flex-column">
                            <Card.Title className="fs-5 mb-1">{item.title}</Card.Title>
                            <Card.Text className="text-muted mb-1">by {item.author}</Card.Text>
                            <Card.Text className="mb-2"><strong>Category:</strong> {item.category}</Card.Text>
                            <Card.Text className="text-success mb-3">{item.status}</Card.Text>

                            <div className="mt-auto">
                                <div className="d-flex align-items-center mb-3">
                                    <Button
                                        variant="light"
                                        size="sm"
                                        onClick={() => dispatch(removeFromCart(item._id))}
                                    >
                                        <FaTrash />
                                    </Button>
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        className="mx-2"
                                        onClick={() => dispatch(decreaseQuantity(item._id))}
                                    >
                                        <AiOutlineMinus />
                                    </Button>
                                    <span className="px-2">{item.quantity}</span>
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        className="ms-2"
                                        onClick={() => dispatch(increaseQuantity(item._id))}
                                    >
                                        <AiOutlinePlus />
                                    </Button>
                                </div>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}
