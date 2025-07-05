import React from 'react'
import Card from 'react-bootstrap/Card';



const Cards = ({ thumbimg, title, description, rating, author }) => {
    return (
        <section className='cards'>
            <Card style={{ width: '18rem' }} className='p-2 d-flex justify-content-center align-items-center'>
                <Card.Img variant="top" src={thumbimg} style={{ width: '90%', height: "250px" }} />
                <Card.Body>
                    <Card.Link href="/book-details" className='fw-bold card-link'>{title}</Card.Link>
                    <Card.Text>
                        {description}
                    </Card.Text>
                </Card.Body>
                <Card.Body className='d-flex justify-content-center align-items-center gap-5'>
                    <span className='fw-bold'>{rating}</span>
                    <span className='fw-bold'>Author :{author}</span>
                </Card.Body>
            </Card>
        </section>
    )
}

export default Cards