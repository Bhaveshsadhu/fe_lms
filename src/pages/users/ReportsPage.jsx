import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { FaChartBar, FaBook, FaPaperPlane, FaThumbsUp } from 'react-icons/fa';

// Sample report data - replace with API integration
const reportStats = [
    { title: 'Monthly Issues', value: 32, icon: <FaPaperPlane />, variant: 'info' },
    { title: 'Monthly Returns', value: 28, icon: <FaThumbsUp />, variant: 'success' },
    { title: 'Active Members', value: 45, icon: <FaBook />, variant: 'primary' },
    { title: 'Total Reviews', value: 19, icon: <FaChartBar />, variant: 'warning' },
];

const topBooks = [
    { id: 1, title: '1984', issues: 12 },
    { id: 2, title: 'Brave New World', issues: 9 },
    { id: 3, title: 'The Great Gatsby', issues: 7 },
];

export default function ReportsPage() {
    const [stats, setStats] = useState([]);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // TODO: fetch report stats and top books from API
        setStats(reportStats);
        setBooks(topBooks);
    }, []);

    return (
        <Container className="py-4">
            <h3 className="mb-4">Library Reports</h3>

            {/* Summary Cards */}
            <Row className="g-4 mb-4">
                {stats.map((s, idx) => (
                    <Col key={idx} xs={12} md={6} lg={3}>
                        <Card bg={s.variant} text="white" className="h-100">
                            <Card.Body className="d-flex align-items-center justify-content-between">
                                <div>
                                    <Card.Title className="mb-0">{s.value}</Card.Title>
                                    <Card.Text>{s.title}</Card.Text>
                                </div>
                                <div className="fs-2 opacity-75">{s.icon}</div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Top Borrowed Books */}
            <Card className="mb-4">
                <Card.Header>
                    <h5>Top Borrowed Books</h5>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Book Title</th>
                                <th>Times Borrowed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((b, idx) => (
                                <tr key={b.id}>
                                    <td>{idx + 1}</td>
                                    <td>{b.title}</td>
                                    <td>{b.issues}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer className="text-end">
                    <Button variant="outline-secondary" size="sm">Export CSV</Button>
                </Card.Footer>
            </Card>

            {/* Additional report sections could go here */}
        </Container>
    );
}
