import React, { useState } from 'react'
import { Stack } from "react-bootstrap"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SideBar = () => {
    const { user } = useSelector((state) => state.userInfo)

    const [isBooksOpen, setIsBooksOpen] = useState(false);
    const toggleBooks = () => {
        setIsBooksOpen(!isBooksOpen);
    };
    return (
        <>
            <div>Welcome</div>
            <div><strong>{user.fname}</strong></div>
            <hr></hr>
            {
                // If user is admin
                user?.role?.toLowerCase() === "admin" ?
                    <Stack gap={3}>
                        <div className="p-2">
                            <Link className='nav-link' to="user-profile" >Profile</Link>
                        </div>
                        <div className="p-2">
                            <Link className='nav-link' to="user-alluser" >All User</Link>
                        </div>

                        <div className="p-2">
                            {/* Books Main Link */}
                            <div className="nav-link fw-bold" onClick={toggleBooks} style={{ cursor: 'pointer' }}>
                                📚 Books {isBooksOpen ? '▾' : '▸'}
                            </div>

                            {/* Sub-menu */}
                            {isBooksOpen && (
                                <div className="ms-3 ps-2">
                                    <Link className="d-block nav-link" to="books/add">➕ Add New Book</Link>
                                    <Link className="d-block nav-link" to="books/borrow">📖 All Borrowed Book</Link>
                                    <Link className="d-block nav-link" to="books/edit">📖 All Books</Link>
                                </div>
                            )}
                        </div>

                    </Stack>
                    :
                    // If user is Not Admin
                    <Stack gap={3}>
                        <div className="p-2">
                            <Link className='nav-link' to="user-profile" >Profile</Link>
                        </div>
                        <div className="p-2">
                            <Link className='nav-link' to="user-alluser" >Borrow History</Link>
                        </div>
                        <div className="p-2">
                            <Link className='nav-link' to="user-alluser" >Submit Review</Link>
                        </div>



                    </Stack>
            }

        </>

    )
}

export default SideBar