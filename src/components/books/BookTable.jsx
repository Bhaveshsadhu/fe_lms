import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { getBooks, updateBookByID } from '@/axio/axioHelper';
import { setBook } from '@/redux/books/bookSlice';
import Modal from 'react-bootstrap/Modal';
import { CustomeInputs } from '../CustomeInputs';

const BookTable = () => {
    const { books } = useSelector((state) => state.bookInfo);
    const { user } = useSelector((state) => state.userInfo);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [selectedBook, setSelectedBook] = useState({});
    const fetchBooks = async () => {
        try {
            const result = await getBooks();
            if (result.status === "success") {
                dispatch(setBook(result.books));
            }
        } catch (error) {
            toast.error(error.message || "Failed to fetch books");
        }
    };
    useEffect(() => {


        fetchBooks();
    }, [dispatch]);

    // Handle modal open
    const handleEdit = (book) => {

        setSelectedBook(book);
        setShow(true);

    };
    // Handle modal close
    const handleClose = () => {
        setShow(false);
        setSelectedBook({});
    };
    // Handle form change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedBook(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    // Handle form submit
    const handleUpdate = async (e) => {
        e.preventDefault();
        const { status, message, book } = await updateBookByID(selectedBook)
        if (status === "success") {
            fetchBooks();
            toast.success(message);
        }

        // console.log("updated data", selectedBook)
        // You can call your update API here
        handleClose();
    };
    return (
        <div className='p-5'>

            <div className='d-flex justify-content-between'>
                <h2>All Books</h2>
                <div>
                    <Form className='d-flex justify-content-between'>
                        <Form.Group className="mx-3">
                            <Form.Control type="email" placeholder="Search Books By Name" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Search
                        </Button>
                    </Form>
                </div>
            </div>
            <hr></hr>
            <div className="table-responsive">
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>Cover Image</th>
                            <th>Title</th>
                            <th>Categoery</th>
                            <th>description</th>
                            <th>Available</th>
                            {
                                // ONLY ADMIN CAN EDIT THE BOOKS
                                user?.role === "admin" && <th>Edit</th>
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {
                            books?.map((book) => (
                                <tr key={book._id} className="align-middle text-center">
                                    <td>
                                        <img src="https://eloquentjavascript.net/img/cover.jpg" alt="Eloquent JavaScript" width="100" />
                                    </td>
                                    <td>{book.title}</td>
                                    <td>{book.category}</td>
                                    <td>{book.description}</td>
                                    <td>{book.available}</td>
                                    {
                                        // ONLY ADMIN CAN EDIT THE BOOKS
                                        user?.role === "admin" && <td>
                                            <Button variant="warning" onClick={() => handleEdit(book)}>Edit</Button>
                                        </td>
                                    }

                                </tr>

                            ))
                        }
                    </tbody>
                </Table>
            </div>
            {/* Modal */}
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-2">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={selectedBook.title || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="category"
                                value={selectedBook.category || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={selectedBook.description || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Available</Form.Label>
                            <Form.Control
                                type="number"
                                name="available"
                                value={selectedBook.available || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                name="author"
                                value={selectedBook.author || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control
                                type="number"
                                name="isbn"
                                value={selectedBook.isbn || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={selectedBook.quantity || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option value="available">Available</option>
                                <option value="borrowed">Borrowed</option>
                                <option value="unavailable">Unavailable</option>
                            </Form.Select>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="success" type="submit">Update</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

export default BookTable