import React, { useEffect, useState } from 'react'
import { Container, Card, Table, Button, Form, Modal } from 'react-bootstrap';
const returnedBooks = [
    { id: 1, title: '1984', member: 'Alice Johnson' },
    { id: 2, title: 'Brave New World', member: 'Bob Smith' },
    { id: 3, title: 'The Great Gatsby', member: 'Charlie Lee' },
];
const SubmitReview = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        // TODO: fetch returned books from API
        setBooks(returnedBooks);
    }, []);

    const handleOpenModal = (book) => {
        setSelectedBook(book);
        setRating(0);
        setComment('');
        setShowModal(true);
    };

    const handleSubmit = () => {
        // TODO: POST review for selectedBook.id with rating and comment
        console.log('Submitting review:', { bookId: selectedBook.id, rating, comment });
        setShowModal(false);
    };
    return (
        <Container className="py-4">
            <Card>
                <Card.Header ><h3>Submit Book Review</h3></Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Book Title</th>
                                <th>Member</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, idx) => (
                                <tr key={book.id}>
                                    <td>{idx + 1}</td>
                                    <td>{book.title}</td>
                                    <td>{book.member}</td>
                                    <td>
                                        <Button variant="outline-primary" size="sm" onClick={() => handleOpenModal(book)}>
                                            Review
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Review: {selectedBook?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="ratingSelect">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control as="select" value={rating} onChange={e => setRating(e.target.value)}>
                                <option value={0}>Select rating</option>
                                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="commentText" className="mt-3">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control as="textarea" rows={4} value={comment} onChange={e => setComment(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit} disabled={rating === 0}>Submit Review</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default SubmitReview