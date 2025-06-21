import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CustomeInputs } from '../CustomeInputs'
import { bookFormFields } from '@/assets/customeInputes/addNewBookFields.js'
import useForm from '@/hooks/useForm';
import { addNewBook, getBooks } from '@/axio/axioHelper';
// import { useDispatch, useSelector } from 'react-redux'
import { setBook } from '@/redux/books/bookSlice';
const initialState = {}
const AddNewBook = () => {
    // const dispatch = useDispatch()
    const { form, setForm, handleOnChange } = useForm(initialState);
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
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default AddNewBook