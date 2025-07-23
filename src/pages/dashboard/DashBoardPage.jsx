import React from 'react'
import { Container, Row, Col, Card, Nav, Table, Badge, Button } from 'react-bootstrap';
import { FaBook, FaUsers, FaClipboardList, FaCogs } from 'react-icons/fa';
const stats = [
    { title: 'Total Books', count: 120, icon: <FaBook />, variant: 'primary' },
    { title: 'Active Members', count: 45, icon: <FaUsers />, variant: 'success' },
    { title: 'Pending Requests', count: 7, icon: <FaClipboardList />, variant: 'warning' },
    { title: 'Settings', icon: <FaCogs />, variant: 'info', action: true },
];

const recentActivities = [
    { id: 1, type: 'Issued', book: '1984', member: 'Alice Johnson', date: '2025-07-22' },
    { id: 2, type: 'Returned', book: 'Brave New World', member: 'Bob Smith', date: '2025-07-21' },
    { id: 3, type: 'Review', book: 'The Great Gatsby', member: 'Charlie Lee', date: '2025-07-20' },
];
const DashBoardPage = () => {
    return (
        <Container fluid className="py-4">
            <Row>
                <Col >
                    {/* Stats Cards */}
                    <Row className="g-4 mb-4">
                        {stats.map(s => (
                            <Col key={s.title || s.variant} xs={6} md={3}>
                                <Card bg={s.variant} text="white" className="h-100">
                                    <Card.Body className="d-flex align-items-center justify-content-between">
                                        <div>
                                            {s.action ? (
                                                <Button variant="light">Go</Button>
                                            ) : (
                                                <>
                                                    <Card.Title>{s.count}</Card.Title>
                                                    <Card.Text>{s.title}</Card.Text>
                                                </>
                                            )}
                                        </div>
                                        <div className="fs-2 opacity-75">{s.icon}</div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* Recent Activities */}
                    <Card>
                        <Card.Header><h5>Recent Activities</h5></Card.Header>
                        <Card.Body>
                            <Table striped hover responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Type</th>
                                        <th>Book</th>
                                        <th>Member</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentActivities.map(act => (
                                        <tr key={act.id}>
                                            <td>{act.id}</td>
                                            <td>{act.type}</td>
                                            <td>{act.book}</td>
                                            <td>{act.member}</td>
                                            <td>{act.date}</td>
                                            <td>
                                                <Badge bg={
                                                    act.type === 'Issued' ? 'warning' :
                                                        act.type === 'Returned' ? 'success' :
                                                            'info'
                                                }>
                                                    {act.type}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default DashBoardPage