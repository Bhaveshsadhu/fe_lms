import React from 'react'
import Card from 'react-bootstrap/Card';
import StarRating from './StarRating';
import { Button } from 'react-bootstrap';
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/cart/cartSlice';



const Cards = (card) => {
    // { coverImage, title, description, rating, author }
    const { coverImage, title, description, rating, author } = card
    const dispatch = useDispatch()



    // utils/truncate.js
    function truncateWords(str = "", numWords = 20) {
        const words = str.split(/\s+/);
        if (words.length <= numWords) return str;
        return words.slice(0, numWords).join(" ") + "...";
    }
    const handleOnCartClick = () => {
        dispatch(addToCart(card))
    }

    return (
        <section className='cards'>
            <Card style={{ width: '18rem' }} className='p-2 d-flex justify-content-center align-items-center'>
                <Card.Img variant="top" src={coverImage} style={{ width: '90%', height: "250px" }} />
                <Card.Body>
                    <Card.Link href="/book-details" className='fw-bold card-link'>{title}</Card.Link>
                    <Card.Text>
                        {/* {description} */}
                        {truncateWords(description, 10)}
                    </Card.Text>
                    <div className="d-grid">
                        <Button className="button-color" variant="outline-primary" onClick={handleOnCartClick}>Add To Cart <BsCart3 /></Button>
                    </div>
                    <span className='fw-bold'><StarRating rating={rating} /></span>

                    <span className='fw-bold'>Author :{author}</span>
                </Card.Body>
                {/* <Card.Body className='d-flex justify-content-center align-items-center gap-1 fs-7'>
                    <span className='fw-bold'><StarRating rating={rating} /></span>

                    <span className='fw-bold'>Author :{author}</span>
                </Card.Body> */}


            </Card>
        </section>
    )
}

export default Cards