import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Badge } from 'react-bootstrap';

// Sample requests data - replace with API integration
const sampleRequests = [
    { id: 1, member: 'Alice Johnson', book: '1984', type: 'Issue', date: '2025-07-22', status: 'Pending' },
    { id: 2, member: 'Bob Smith', book: 'Brave New World', type: 'Issue', date: '2025-07-21', status: 'Pending' },
    { id: 3, member: 'Charlie Lee', book: 'The Great Gatsby', type: 'Return', date: '2025-07-20', status: 'Approved' },
];

export default function RequestsPage() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // TODO: fetch requests from API
        setRequests(sampleRequests);
    }, []);

    const handleApprove = (id) => {
        // TODO: call API to approve request
        setRequests(requests.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
    };

    const handleDecline = (id) => {
        // TODO: call API to decline request
        setRequests(requests.map(r => r.id === id ? { ...r, status: 'Declined' } : r));
    };

    return (
        <Container className="py-4">
            <Card>
                <Card.Header>
                    <h3>Book Requests</h3>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Member</th>
                                <th>Book</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req, idx) => (
                                <tr key={req.id}>
                                    <td>{idx + 1}</td>
                                    <td>{req.member}</td>
                                    <td>{req.book}</td>
                                    <td>{req.type}</td>
                                    <td>{req.date}</td>
                                    <td>
                                        <Badge bg={
                                            req.status === 'Pending' ? 'warning' :
                                                req.status === 'Approved' ? 'success' :
                                                    'danger'
                                        }>
                                            {req.status}
                                        </Badge>
                                    </td>
                                    <td>
                                        {req.status === 'Pending' && (
                                            <>
                                                <Button size="sm" variant="success" className="me-2" onClick={() => handleApprove(req.id)}>
                                                    Approve
                                                </Button>
                                                <Button size="sm" variant="danger" onClick={() => handleDecline(req.id)}>
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
