import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';

// Sample members data - replace with API integration
const sampleMembers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', joinedDate: '2025-01-15' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', joinedDate: '2025-02-20' },
    { id: 3, name: 'Charlie Lee', email: 'charlie@example.com', joinedDate: '2025-03-05' },
];

export default function ManageMembers() {
    const [members, setMembers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '' });

    useEffect(() => {
        // TODO: fetch members from API
        setMembers(sampleMembers);
    }, []);

    const openAddModal = () => {
        setEditingMember(null);
        setFormData({ name: '', email: '' });
        setShowModal(true);
    };

    const openEditModal = (member) => {
        setEditingMember(member);
        setFormData({ name: member.name, email: member.email });
        setShowModal(true);
    };

    const handleDelete = (memberId) => {
        // TODO: call API to delete member
        setMembers(members.filter(m => m.id !== memberId));
    };

    const handleSubmit = () => {
        if (editingMember) {
            // TODO: call API to update member
            setMembers(members.map(m => m.id === editingMember.id ? { ...m, ...formData } : m));
        } else {
            // TODO: call API to add member
            const newMember = { id: Date.now(), joinedDate: new Date().toLocaleDateString(), ...formData };
            setMembers([newMember, ...members]);
        }
        setShowModal(false);
    };

    return (
        <Container className="py-4">
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h3>Manage Members</h3>
                    <Button variant="primary" onClick={openAddModal}>Add Member</Button>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Joined Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member, idx) => (
                                <tr key={member.id}>
                                    <td>{idx + 1}</td>
                                    <td>{member.name}</td>
                                    <td>{member.email}</td>
                                    <td>{member.joinedDate}</td>
                                    <td>
                                        <Row className="g-1">
                                            <Col>
                                                <Button size="sm" variant="outline-secondary" onClick={() => openEditModal(member)}>
                                                    Edit
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button size="sm" variant="outline-danger" onClick={() => handleDelete(member.id)}>
                                                    Delete
                                                </Button>
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editingMember ? 'Edit Member' : 'Add Member'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="memberName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="memberEmail" className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit} disabled={!formData.name || !formData.email}>
                        {editingMember ? 'Update' : 'Create'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
