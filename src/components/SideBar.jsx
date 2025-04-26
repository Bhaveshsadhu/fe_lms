import React from 'react'
import { Stack } from "react-bootstrap"
import { Link } from 'react-router-dom'

const SideBar = () => {
    return (
        <Stack gap={3}>
            <div className="p-2">
                <Link className='nav-link' to="user-profile" >Profile</Link>
            </div>
            <div className="p-2">
                <Link className='nav-link' to="user-alluser" >All User</Link>
            </div>
            <div className="p-2">
                <Link className='nav-link' to="user-booksborrows" >Borrow History</Link>
            </div>
            <div className="p-2">
                <Link className='nav-link' to="user-books" >Books</Link>
            </div>
        </Stack>
    )
}

export default SideBar