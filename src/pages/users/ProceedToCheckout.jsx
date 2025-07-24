import { borrowBooks } from '@/axio/axioHelper';
import { clearCart } from '@/redux/cart/cartSlice';
import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Form, Row, Col, Modal } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



export default function ProceedToCheckout() {
    const location = useLocation()
    // reading books items from cart
    const selectedBooks = location.state;
    const [books, setBooks] = useState([]);
    const [loanPeriod, setLoanPeriod] = useState(14);
    // const [showSuccess, setShowSuccess] = useState(false);
    const { user } = useSelector((state) => state.userInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setBooks(selectedBooks);
    }, []);

    const handleCheckout = async () => {

        // TODO: call API to process checkout with member.id, books, and loanPeriod
        console.log('Processing checkout:', { user, books, loanPeriod });
        const userId = user._id


        const obj = {
            userId,
            books,
            loanPeriod
        }

        const result = await borrowBooks(obj)
        // Show success confirmation

        if (result.status === "success") {
            toast.success("Borrowed Success")
            // setShowSuccess(true)
            dispatch(clearCart());
            navigate("/user/thank-you");


        }
        else {
            toast.error("Something Went Wrong")

        }


    };

    return (
        <Container className="py-4">
            <Card>
                <Card.Header>
                    <h3>Proceed to Checkout</h3>
                    {user && <p>Member: <strong>{user.fname}</strong> (Role: {user.role})</p>}
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive className="mb-4">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Author</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books?.map((b, idx) => (
                                <tr key={b._id}>
                                    <td>{idx + 1}</td>
                                    <td>{b.title}</td>
                                    <td>{b.author}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Form>
                        <Row className="align-items-center">
                            <Col md={4}>
                                <Form.Group controlId="loanPeriod">
                                    <Form.Label>Loan Period (days)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={loanPeriod}
                                        onChange={(e) => setLoanPeriod(Number(e.target.value))}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4} className="mt-4 mt-md-0">
                                <Button variant="success" onClick={handleCheckout}>
                                    Confirm Checkout
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>

            {/* Success Modal */}
            {/* <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered>
                <Modal.Body className="text-center">
                    <FaCheckCircle size={48} className="text-success mb-3" />
                    <h4>Checkout Successful!</h4>
                    <p>Your books have been checked out successfully.</p>
                    <Button variant="primary" onClick={() => setShowSuccess(false)}>
                        Close
                    </Button>
                </Modal.Body>
            </Modal> */}
        </Container>
    );
}
