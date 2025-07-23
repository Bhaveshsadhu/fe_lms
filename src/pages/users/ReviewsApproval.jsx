import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Badge } from 'react-bootstrap';

// Sample review requests data - replace with API integration
const sampleReviews = [
    { id: 1, member: 'Alice Johnson', book: '1984', rating: 4, comment: 'Great read!', date: '2025-07-15', status: 'Pending' },
    { id: 2, member: 'Bob Smith', book: 'Brave New World', rating: 5, comment: 'Loved the themes.', date: '2025-07-16', status: 'Pending' },
    { id: 3, member: 'Charlie Lee', book: 'The Great Gatsby', rating: 3, comment: 'Good but complex.', date: '2025-07-17', status: 'Approved' },
];

export default function ReviewsApproval() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // TODO: fetch review requests from API
        setReviews(sampleReviews);
    }, []);

    const handleApprove = (id) => {
        // TODO: call API to approve review
        setReviews(reviews.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
    };

    const handleDecline = (id) => {
        // TODO: call API to decline review
        setReviews(reviews.map(r => r.id === id ? { ...r, status: 'Declined' } : r));
    };

    return (
        <Container className="py-4">
            <Card>
                <Card.Header>
                    <h3>Review Approvals</h3>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Member</th>
                                <th>Book</th>
                                <th>Rating</th>
                                <th>Comment</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((rev, idx) => (
                                <tr key={rev.id}>
                                    <td>{idx + 1}</td>
                                    <td>{rev.member}</td>
                                    <td>{rev.book}</td>
                                    <td>{rev.rating} ★</td>
                                    <td>{rev.comment}</td>
                                    <td>{rev.date}</td>
                                    <td>
                                        <Badge bg={
                                            rev.status === 'Pending' ? 'warning' :
                                                rev.status === 'Approved' ? 'success' :
                                                    'danger'
                                        }>
                                            {rev.status}
                                        </Badge>
                                    </td>
                                    <td>
                                        {rev.status === 'Pending' && (
                                            <>
                                                <Button size="sm" variant="success" className="me-2" onClick={() => handleApprove(rev.id)}>
                                                    Approve
                                                </Button>
                                                <Button size="sm" variant="danger" onClick={() => handleDecline(rev.id)}>
                                                    Decline
                                                </Button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
}
