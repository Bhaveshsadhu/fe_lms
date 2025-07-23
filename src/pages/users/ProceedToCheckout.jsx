import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Form, Row, Col, Modal } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';

// Sample selected books data - replace with real selection state
const selectedBooks = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'Brave New World', author: 'Aldous Huxley' },
];

export default function ProceedToCheckout({ member }) {
    const [books, setBooks] = useState([]);
    const [loanPeriod, setLoanPeriod] = useState(14);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        // TODO: fetch selected books from context or API
        setBooks(selectedBooks);
    }, []);

    const handleCheckout = () => {
        // TODO: call API to process checkout with member.id, books, and loanPeriod
        console.log('Processing checkout:', { member, books, loanPeriod });
        // Show success confirmation
        setShowSuccess(true);
    };

    return (
        <Container className="py-4">
            <Card>
                <Card.Header>
                    <h3>Proceed to Checkout</h3>
                    {member && <p>Member: <strong>{member.name}</strong> (ID: {member.id})</p>}
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
                            {books.map((b, idx) => (
                                <tr key={b.id}>
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
            <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered>
                <Modal.Body className="text-center">
                    <FaCheckCircle size={48} className="text-success mb-3" />
                    <h4>Checkout Successful!</h4>
                    <p>Your books have been checked out successfully.</p>
                    <Button variant="primary" onClick={() => setShowSuccess(false)}>
                        Close
                    </Button>
                </Modal.Body>
            </Modal>
        </Container>
    );
}
