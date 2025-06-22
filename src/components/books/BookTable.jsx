import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { addNewBook, getBooks, updateBookByID } from '@/axio/axioHelper';
import { setBook } from '@/redux/books/bookSlice';
import Modal from 'react-bootstrap/Modal';
import { CustomeInputs } from '../CustomeInputs';

const BookTable = () => {
    const { books } = useSelector((state) => state.bookInfo);
    const { user } = useSelector((state) => state.userInfo);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [selectedBook, setSelectedBook] = useState({});
    const [images, setImages] = useState([]);
    const [thumbnailImg, setThumbnailImg] = useState("");
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
    const handleImageUpload = (e) => {

        const files = Array.from(e.target.files); // Convert FileList to Array
        if (!files.length) return;

        const allowed = ['image/png', 'image/jpeg', 'image/jpg'];

        // Validate each file
        for (let file of files) {
            if (!allowed.includes(file.type)) {
                alert('Only PNG, JPEG, or JPG images are allowed.');
                return;
            }

            if (file.size > 2 * 1024 * 1024) {
                alert('Each image must be less than 2MB.');
                return;
            }
        }

        // Save files to form state
        // setImages(prev => [...prev, ...files]);
        setImages(files);

    };

    // Handle form change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedBook(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    // handleThumbnailImg
    const handleThumbnailImg = (item) => {
        setThumbnailImg(item)
        setSelectedBook((prev) => ({
            ...prev,
            coverImage: item,
        }));

    }
    // Handle form submit
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            // Append text fields
            formData.append("_id", selectedBook._id);
            formData.append("title", selectedBook.title);
            formData.append("author", selectedBook.author);
            formData.append("isbn", selectedBook.isbn);
            formData.append("category", selectedBook.category);
            formData.append("description", selectedBook.description || "");
            formData.append("quantity", selectedBook.quantity);
            formData.append("available", selectedBook.available);
            formData.append("ExpectedDateAvailable", selectedBook.ExpectedDateAvailable);
            formData.append("coverImage", thumbnailImg || selectedBook.coverImage);

            // Append existing image paths (important!)
            (selectedBook.uploadedFiles || []).forEach((existingPath) => {
                formData.append("existingImages", existingPath); // custom key to handle on backend
            });

            // Append new image files
            images.forEach((file) => {
                formData.append("uploadedFiles", file);
            });

            // Call your backend
            const { status, message } = await updateBookByID(formData);

            if (status === "success") {
                fetchBooks();
                toast.success(message);
                handleClose();
            } else {
                toast.error(message || "Update failed");
            }
        } catch (error) {
            toast.error(error.message || "Error while updating");
        }
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
                                        <img
                                            src={import.meta.env.VITE_API_URL_IMG + book.coverImage}
                                            alt={book.title}
                                            width="100"
                                            style={{ objectFit: "cover", borderRadius: "4px" }}
                                        />
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
                <Form onSubmit={handleUpdate} encType="multipart/form-data">
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
                            <Form.Select aria-label="Default select example" onChange={handleChange}>
                                <option value="available">Available</option>
                                <option value="borrowed">Borrowed</option>
                                <option value="unavailable">Unavailable</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Upload Images</Form.Label>
                            <Form.Control type="file" multiple accept="image/png,image/jpeg,image/jpg" onChange={handleImageUpload} />
                        </Form.Group>

                        <div className='d-flex'>
                            {
                                selectedBook?.uploadedFiles?.map((item, id) => (
                                    <div key={id} className='border m-1 p-2'>

                                        <Form.Check
                                            type="radio"
                                            name="thumbnail"
                                            label="Make Thumbnail"
                                            className="mt-1"
                                            checked={thumbnailImg === item}
                                            onChange={() => handleThumbnailImg(item)}
                                        />
                                        <img
                                            src={import.meta.env.VITE_API_URL_IMG + item}
                                            alt={selectedBook.title}
                                            className='img-thumbnail border rounded '
                                            width="100"
                                            style={{ objectFit: "cover", borderRadius: "4px" }}
                                        />
                                    </div>
                                ))
                            }

                        </div>

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