import React from 'react'
import { Container, Table, Button, Card } from 'react-bootstrap';
const borrowRecords = [
    { id: 1, book: '1984', member: 'Alice Johnson', issueDate: '2025-07-01', dueDate: '2025-07-15', returnDate: '2025-07-14' },
    { id: 2, book: 'Brave New World', member: 'Bob Smith', issueDate: '2025-07-05', dueDate: '2025-07-19', returnDate: null },
    { id: 3, book: 'The Great Gatsby', member: 'Charlie Lee', issueDate: '2025-07-10', dueDate: '2025-07-24', returnDate: null },
];
const BorrowHistory = () => {
    return (
        <Container className="py-4">
            <Card>
                <Card.Header >
                    <h3>Borrow History</h3>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Book Title</th>
                                <th>Member</th>
                                <th>Issue Date</th>
                                <th>Due Date</th>
                                <th>Return Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {borrowRecords.map(record => {
                                const isReturned = Boolean(record.returnDate);
                                return (
                                    <tr key={record.id}>
                                        <td>{record.id}</td>
                                        <td>{record.book}</td>
                                        <td>{record.member}</td>
                                        <td>{record.issueDate}</td>
                                        <td>{record.dueDate}</td>
                                        <td>{record.returnDate || '-'}</td>
                                        <td>
                                            <span className={`badge bg-${isReturned ? 'success' : 'warning'}`}>
                                                {isReturned ? 'Returned' : 'Pending'}
                                            </span>
                                        </td>
                                        <td>
                                            {!isReturned && (
                                                <Button size="sm" variant="outline-primary">
                                                    Mark Returned
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default BorrowHistory