import React from 'react'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CustomeInputs } from '../CustomeInputs'
import { bookFormFields } from '@/assets/customeInputes/addNewBookFields.js'
import useForm from '@/hooks/useForm';
import { addNewBook, getBooks } from '@/axio/axioHelper';
import { useDispatch, useSelector } from 'react-redux'
import { setBook } from '@/redux/books/bookSlice';
const initialState = { coverImage: null }
const AddNewBook = () => {
    const dispatch = useDispatch()
    const { form, setForm, handleOnChange } = useForm(initialState);


    const handleFileChange = (e) => {
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
        setForm({ ...form, coverImage: files }); // or coverImages if multiple
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Text fields
        formData.append("title", form.title);
        formData.append("author", form.author);
        formData.append("isbn", form.isbn);
        formData.append("category", form.category);
        formData.append("description", form.description || "");
        formData.append("quantity", form.quantity);
        formData.append("available", form.available);
        formData.append("ExpectedDateAvailable", form.ExpectedDateAvailable);

        // Image files
        form.coverImage.forEach((file) => {
            formData.append("uploadedFiles", file); // Field name must match in multer
        });
        // console.log(formData)
        const result = await addNewBook(formData)
        if (result.status === "success") {
            // get all books and add into redux store
            const books = await getBooks()
            console.log(books)
            if (books.status === "success") {
                dispatch(setBook([books.books]))
            }
        }
    }
    return (
        <div className='main'>
            <h2>Add New Book</h2>
            <hr></hr>
            <div>
                <Form onSubmit={handleOnSubmit} encType="multipart/form-data">
                    {
                        bookFormFields.map((input) =>
                            <CustomeInputs
                                key={input.name}
                                {...input}
                                value={form[input.name] || ''}
                                onChange={handleOnChange}>
                            </CustomeInputs>
                        )
                    }
                    <Form.Group className="mb-3" controlId="bookImage">
                        <Form.Label>Book Image</Form.Label>
                        <Form.Control type="file" multiple accept="image/png,image/jpeg,image/jpg" onChange={handleFileChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default AddNewBook