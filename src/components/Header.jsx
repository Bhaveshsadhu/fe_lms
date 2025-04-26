import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { SlLogin } from "react-icons/sl";
import { SiGnuprivacyguard } from "react-icons/si";
import { TbLockPassword } from "react-icons/tb";
import logo from '@/assets/LMS.png'


const Header = () => {
    return (
        <Navbar expand="md" className="bg-dark" variant='dark'>
            <Container>
                <Navbar.Brand>
                    <Link to="/" ><img src={logo} className='border rounded' width="50px" alt="LMS"></img></Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link className="nav-link" to="login"><SlLogin /> Login</Link>
                        <Link className="nav-link" to="signup"><SiGnuprivacyguard /> SignUp</Link >
                        <Link className="nav-link" to="forgetpassword"><TbLockPassword /> ForgetPassword</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header