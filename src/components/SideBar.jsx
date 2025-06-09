import React, { useState } from 'react'
import { Stack } from "react-bootstrap"
import { Link } from 'react-router-dom'

const SideBar = () => {
    const [isBooksOpen, setIsBooksOpen] = useState(false);
    const toggleBooks = () => {
        setIsBooksOpen(!isBooksOpen);
    };
    return (
        <Stack gap={3}>
            <div className="p-2">
                <Link className='nav-link' to="user-profile" >Profile</Link>
            </div>
            <div className="p-2">
                <Link className='nav-link' to="user-alluser" >All User</Link>
            </div>
            {/* <div className="p-2">
                <Link className='nav-link' to="user-booksborrows" >Borrow History</Link>
            </div> */}
            {/* <div className="p-2">
                <Link className='nav-link' to="books" >Books</Link>
            </div> */}
            <div className="p-2">
                {/* Books Main Link */}
                <div className="nav-link fw-bold" onClick={toggleBooks} style={{ cursor: 'pointer' }}>
                    📚 Books {isBooksOpen ? '▾' : '▸'}
                </div>

                {/* Sub-menu */}
                {isBooksOpen && (
                    <div className="ms-3 ps-2">
                        <Link className="d-block nav-link" to="books/add">➕ Add New Book</Link>
                        <Link className="d-block nav-link" to="books/borrow">📖 Borrow Book</Link>
                        <Link className="d-block nav-link" to="books/edit">📖 All Books</Link>
                        {/* <Link className="d-block nav-link" to="books/list">📘 Book List</Link> */}
                    </div>
                )}
            </div>

        </Stack>
    )
}

export default SideBar