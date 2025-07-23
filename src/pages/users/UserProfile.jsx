import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaBook, FaUsers, FaNewspaper, FaFileAlt, FaPaperPlane, FaThumbsUp, FaThumbsDown, FaCalendarAlt } from 'react-icons/fa';
const stats = [
    { title: 'Books', count: 3, icon: <FaBook />, variant: 'primary' },
    { title: 'Members', count: 2, icon: <FaUsers />, variant: 'success' },
    { title: 'NewsPapers', count: 1, icon: <FaNewspaper />, variant: 'warning' },
    { title: 'Magazines', count: 0, icon: <FaFileAlt />, variant: 'danger' },
];

const actions = [
    { label: 'Issued', count: 2, icon: <FaPaperPlane />, variant: 'light', textVariant: 'primary' },
    { label: 'Returned', count: 1, icon: <FaThumbsUp />, variant: 'light', textVariant: 'success' },
    { label: 'Not Returned', count: 1, icon: <FaThumbsDown />, variant: 'light', textVariant: 'danger' },
    { label: 'Date Today', count: new Date().toLocaleDateString(), icon: <FaCalendarAlt />, variant: 'light', textVariant: 'warning' },
];
const UserProfile = () => {
    return (
        <Container className="py-4">
            <Row className="g-4">
                {stats.map((s) => (
                    <Col key={s.title} xs={12} md={6} lg={3}>
                        <Card bg={s.variant} text="white" className="h-100">
                            <Card.Body>
                                <Row className="align-items-center">
                                    <Col>
                                        <h2 className="mb-0">{s.count}</h2>
                                        <Card.Text className="text-uppercase">{s.title}</Card.Text>
                                    </Col>
                                    <Col xs="auto" className="fs-1 opacity-75">
                                        {s.icon}
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer className="bg-transparent border-top-0">
                                <Button variant="light" size="sm">More info</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row className="g-4 mt-2">
                {actions.map((a) => (
                    <Col key={a.label} xs={12} md={6} lg={3}>
                        <Card bg={a.variant} className="h-100">
                            <Card.Body>
                                <Row className="align-items-center">
                                    <Col xs="auto" className={`fs-2 text-${a.textVariant}`}>{a.icon}</Col>
                                    <Col>
                                        <h4 className={`text-${a.textVariant} mb-0`}>{a.count}</h4>
                                        <Card.Text className={"text-uppercase"}>{a.label}</Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default UserProfile