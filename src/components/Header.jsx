import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { SlLogin } from "react-icons/sl";
import { SiGnuprivacyguard } from "react-icons/si";
import { TbLockPassword } from "react-icons/tb";
import logo from '@/assets/LMS.png'
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDashboard } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
import { logoutUser } from '../axio/axioHelper';
import { setUser } from '../redux/user/userSlice';


const Header = () => {
    const { user } = useSelector((state) => state.userInfo)
    const dispatch = useDispatch()
    const handleLogout = async (e) => {
        e.preventDefault();

        // LOGOUT FROM API
        const resLogout = await logoutUser();

        // LOGOUT FROM FRONT-END
        sessionStorage.removeItem('accessJWT')
        localStorage.removeItem('refreshJWT')

        // WIPED OUT DATA FROM GLOBAL STATE
        dispatch(setUser({}))

    }
    return (
        <Navbar expand="md" className="bg-dark" variant='dark'>
            <Container>
                <Navbar.Brand>
                    <Link to="/" ><img src={logo} className='border rounded' width="50px" alt="LMS"></img></Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {
                            user?._id ?
                                (<>
                                    <Link className="nav-link" to="/user"> <AiFillDashboard /> Dashboard</Link>
                                    <Link className="nav-link" to="/" onClick={handleLogout}><TbLogout /> Logout</Link >
                                    {/* <Link className="nav-link" to="/forgetpassword"><TbLockPassword /> ForgetPassword</Link> */}
                                </>)
                                :
                                (<>
                                    <Link className="nav-link" to="/login"><SlLogin /> Login</Link>
                                    <Link className="nav-link" to="/signup"><SiGnuprivacyguard /> SignUp</Link >
                                    <Link className="nav-link" to="/forgetpassword"><TbLockPassword /> ForgetPassword</Link>
                                </>)
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header