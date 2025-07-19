import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'

import { useSelector } from 'react-redux';
import Listview from '@/components/cardviews/Listview';
import EmptyCart from '@/components/cardviews/EmptyCart';
import { IoCardOutline } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
import { Link } from 'react-router-dom'
import Cardview from '@/components/cardviews/Cardview';
import { BsCheckCircleFill } from 'react-icons/bs'



const Cart = () => {
    const { items } = useSelector((state) => state.cartInfo)
    const [view, setView] = useState("list-View")
    // useEffect(() => {
    //     // console.log(`Items in cart :${items.length}`)
    //     // console.log(items)
    //     console.log("selected view is ", view)
    // }, [view])


    return (
        items.length > 0 ?
            <Container className="py-4">
                <Row className="mb-3">
                    <Col>
                        <h2>Shopping Cart</h2>
                    </Col>
                    <Col className="text-end">

                        {/* <Button className='button-color'>Borrow Book(s)</Button> */}
                        <Link className='text-black' onClick={() => setView("card-view")}><IoCardOutline size={25} className='mx-2' /></Link>
                        <Link className='text-black' onClick={() => setView("list-view")}><FaListUl size={25} /></Link>

                        {/* <FaListUl size={25} /> */}

                    </Col>
                </Row>

                <Row>
                    <Col md={9}>
                        {
                            view === "list-view"
                                ?
                                <Listview></Listview>
                                :
                                <Cardview></Cardview>
                        }
                    </Col>
                    <Col md={3}>
                        <div className="border rounded p-4 bg-light" style={{ maxWidth: '320px' }}>
                            <h5 className="mb-3">Checkout</h5>
                            <p>Total Of Books: {items.length}</p>
                            <Button variant="warning" className="w-100"> Proceed to Checkout</Button>
                        </div>
                    </Col>
                </Row>


            </Container>

            :

            <EmptyCart></EmptyCart>
    )
}

export default Cart