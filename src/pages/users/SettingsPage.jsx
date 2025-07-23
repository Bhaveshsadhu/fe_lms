import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Tabs, Tab } from 'react-bootstrap';

export default function SettingsPage() {
    const [key, setKey] = useState('hours');

    return (
        <Container className="py-4">
            <h3 className="mb-4">Admin Settings</h3>
            <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                <Tab eventKey="hours" title="Library Hours">
                    <Card>
                        <Card.Header>Library Hours & Holidays</Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                                        <Col md={6} lg={4} key={day} className="mb-3">
                                            <Form.Label>{day}</Form.Label>
                                            <Row>
                                                <Col>
                                                    <Form.Control type="time" placeholder="Open" />
                                                </Col>
                                                <Col>
                                                    <Form.Control type="time" placeholder="Close" />
                                                </Col>
                                            </Row>
                                        </Col>
                                    ))}
                                </Row>
                                <Form.Group controlId="blackoutDates">
                                    <Form.Label>Blackout Dates</Form.Label>
                                    <Form.Control type="date" multiple />
                                </Form.Group>
                                <Button className="mt-3" variant="primary">
                                    Save Hours
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Tab>

                <Tab eventKey="loan" title="Loan Policies">
                    <Card>
                        <Card.Header>Loan Policies</Card.Header>
                        <Card.Body>
                            <Form>
                                {['Books', 'Magazines', 'DVDs'].map((type) => (
                                    <Row className="align-items-center mb-3" key={type}>
                                        <Col md={3}>
                                            <Form.Label>{type} Loan Period (days)</Form.Label>
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control type="number" defaultValue={14} />
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label>Renewal Limit</Form.Label>
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control type="number" defaultValue={2} />
                                        </Col>
                                    </Row>
                                ))}
                                <Row className="align-items-center mb-3">
                                    <Col md={4}>
                                        <Form.Label>Grace Period (days)</Form.Label>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control type="number" defaultValue={2} />
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label>Max Items per Member</Form.Label>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control type="number" defaultValue={5} />
                                    </Col>
                                </Row>
                                <Button variant="primary">Save Loan Policies</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Tab>

                <Tab eventKey="fees" title="Fines & Fees">
                    <Card>
                        <Card.Header>Fine & Fee Structure</Card.Header>
                        <Card.Body>
                            <Form>
                                {['Books', 'Magazines', 'DVDs'].map((type) => (
                                    <Row className="align-items-center mb-3" key={type}>
                                        <Col md={4}>
                                            <Form.Label>{type} Overdue Fine (per day)</Form.Label>
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control type="number" defaultValue={0.5} />
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label>Replacement Fee</Form.Label>
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control type="number" defaultValue={20} />
                                        </Col>
                                    </Row>
                                ))}
                                <Row className="align-items-center mb-3">
                                    <Col md={6}>
                                        <Form.Label>Fine Cap (max)</Form.Label>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control type="number" defaultValue={50} />
                                    </Col>
                                </Row>
                                <Button variant="primary">Save Fees</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Tab>

                <Tab eventKey="membership" title="Membership Types">
                    <Card>
                        <Card.Header>Membership Types & Privileges</Card.Header>
                        <Card.Body>
                            <Form>
                                {['Student', 'Staff', 'Guest'].map((cat) => (
                                    <Card key={cat} className="mb-3">
                                        <Card.Header>{cat}</Card.Header>
                                        <Card.Body>
                                            <Row className="align-items-center mb-2">
                                                <Col md={4}>
                                                    <Form.Label>Borrow Limit</Form.Label>
                                                </Col>
                                                <Col md={2}>
                                                    <Form.Control type="number" defaultValue={cat === 'Guest' ? 2 : 5} />
                                                </Col>
                                                <Col md={4}>
                                                    <Form.Label>Membership Duration (months)</Form.Label>
                                                </Col>
                                                <Col md={2}>
                                                    <Form.Control type="number" defaultValue={12} />
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                ))}
                                <Button variant="primary">Save Membership Types</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Tab>

                <Tab eventKey="notifications" title="Notification Templates">
                    <Card>
                        <Card.Header>Notification & Reminder Templates</Card.Header>
                        <Card.Body>
                            <Form>
                                {['Due Reminder', 'Overdue Notice', 'Reservation Available'].map((temp) => (
                                    <Form.Group className="mb-3" key={temp}>
                                        <Form.Label>{temp} (Email)</Form.Label>
                                        <Form.Control as="textarea" rows={2} placeholder="Template content..." />
                                        <Form.Label className="mt-2">{temp} (SMS)</Form.Label>
                                        <Form.Control as="textarea" rows={1} placeholder="SMS content..." />
                                    </Form.Group>
                                ))}
                                <Button variant="primary">Save Templates</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Tab>

                <Tab eventKey="roles" title="User Roles">
                    <Card>
                        <Card.Header>User & Role Management</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Session Timeout (minutes)</Form.Label>
                                    <Form.Control type="number" defaultValue={30} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password Complexity</Form.Label>
                                    <Form.Select>
                                        <option>Minimum 8 chars</option>
                                        <option>Min 8 + uppercase</option>
                                        <option>Min 8 + uppercase + symbol</option>
                                    </Form.Select>
                                </Form.Group>
                                <Button variant="primary">Save User Settings</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Tab>

                <Tab eventKey="reservation" title="Reservation Rules">
                    <Card>
                        <Card.Header>Reservation & Hold Rules</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Hold Queue Limit</Form.Label>
                                    <Form.Control type="number" defaultValue={3} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Auto-Cancel Uncollected (days)</Form.Label>
                                    <Form.Control type="number" defaultValue={2} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Priority Rule</Form.Label>
                                    <Form.Select>
                                        <option>First come, first served</option>
                                        <option>Staff over students</option>
                                    </Form.Select>
                                </Form.Group>
                                <Button variant="primary">Save Reservation Rules</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Tab>

                <Tab eventKey="branches" title="Branches">
                    <Card>
                        <Card.Header>Branch & Location Configuration</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Branches</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="One branch per line" />
                                </Form.Group>
                                <Button variant="primary">Save Branch Settings</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Tab>
            </Tabs>
        </Container>
    );
}
