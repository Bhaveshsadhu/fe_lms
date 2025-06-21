import React from 'react'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CustomeInputs } from '../CustomeInputs'
import { bookFormFields } from '@/assets/customeInputes/addNewBookFields.js'
import useForm from '@/hooks/useForm';
import { addNewBook, getBooks } from '@/axio/axioHelper';
// import { useDispatch, useSelector } from 'react-redux'
import { setBook } from '@/redux/books/bookSlice';
const initialState = { coverImage: null }
const AddNewBook = () => {
    // const dispatch = useDispatch()
    const { form, setForm, handleOnChange } = useForm(initialState);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const allowed = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!allowed.includes(file.type)) {
            alert('Please upload only png, jpeg or jpg images.');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            alert('Image size should not exceed 2MB.');
            return;
        }
        setForm({ ...form, coverImage: file });
    };
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.log(form.ExpectedDateAvailable)
        const result = await addNewBook(form)

        if (result.status === "success") {
            // get all books and add into redux store
            const books = await getBooks()
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
                <Form onSubmit={handleOnSubmit}>
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
                        <Form.Control type="file" accept="image/png,image/jpeg,image/jpg" onChange={handleFileChange} />
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