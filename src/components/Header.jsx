import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { SlLogin } from "react-icons/sl";
import { SiGnuprivacyguard } from "react-icons/si";
import { TbLockPassword } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDashboard } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
import { logoutUser } from '../axio/axioHelper';
import { setUser } from '../redux/user/userSlice';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { FaSearch } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import { MdLocalLibrary } from "react-icons/md";


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
        <Navbar expand="md" className='main-header'>
            <Container>
                <Navbar.Brand>
                    <Link to="/" ><MdLocalLibrary size={68} className='logo' /></Link>

                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="ms-auto mx-2">
                        <Form className='me-5'>
                            <InputGroup>

                                <Form.Control
                                    placeholder="Search Book"
                                    aria-label="Search Book"
                                    aria-describedby="basic-addon1"
                                />
                                <Button id="searchbook" variant="danger"><FaSearch /></Button>
                            </InputGroup>
                        </Form>

                        {
                            user?._id ?
                                (<>
                                    <Link className="nav-link fw-bold header-links" to="/user"> <AiFillDashboard /> Dashboard</Link>
                                    <Link className="nav-link fw-bold header-links" to="/" onClick={handleLogout}><TbLogout /> Logout</Link >
                                    {/* <Link className="nav-link" to="/forgetpassword"><TbLockPassword /> ForgetPassword</Link> */}
                                </>)
                                :
                                (<>
                                    <Link className="nav-link fw-bold header-links" to="/login"><SlLogin /> Login</Link>
                                    <Link className="nav-link fw-bold header-links" to="/signup"><SiGnuprivacyguard /> SignUp</Link >
                                    <Link className="nav-link fw-bold header-links" to="/forgetpassword"><TbLockPassword /> ForgetPassword</Link>
                                </>)
                        }

                    </Nav>
                </Navbar.Collapse>

            </Container>

        </Navbar>
    )
}

export default Header