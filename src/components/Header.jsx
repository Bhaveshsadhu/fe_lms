import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { FaSearch } from 'react-icons/fa';
import { BsCart3 } from 'react-icons/bs';
import { MdLocalLibrary } from 'react-icons/md';
import { SlLogin } from 'react-icons/sl';
import { SiGnuprivacyguard } from 'react-icons/si';
import { TbLockPassword, TbLogout } from 'react-icons/tb';
import { AiFillDashboard } from 'react-icons/ai';
import { logoutUser } from '../axio/axioHelper';
import { setUser } from '../redux/user/userSlice';
import slugify from "slugify";


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.userInfo);
    const { items } = useSelector((state) => state.cartInfo);
    const { books } = useSelector((state) => state.bookInfo);

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleChange = (e) => {
        const q = e.target.value;
        setQuery(q);

        if (!q.trim()) {
            setResults([]);
            return;
        }

        setResults(
            books
                .filter((b) => b.title.toLowerCase().includes(q.toLowerCase()))
                .slice(0, 5)
        );
    };

    const handleSelect = (card) => {
        // navigate to details, passing state
        // navigate("/book-details", { state: { book } });
        const slug = slugify(card.title, { lower: true, strict: true });

        navigate(`/book-details/${slug}`, { state: { card } });

        // clear search
        setQuery("");
        setResults([]);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        await logoutUser();
        sessionStorage.removeItem('accessJWT');
        localStorage.removeItem('refreshJWT');
        dispatch(setUser({}));
    };

    return (
        <Navbar expand="md" className="main-header">
            <Container>
                <Navbar.Brand>
                    <Link to="/">
                        <MdLocalLibrary size={68} className="logo" />
                    </Link>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto mx-2 align-items-center">

                        {/* --- Search box --- */}
                        <Form className="position-relative me-5">
                            <InputGroup>
                                <Form.Control
                                    placeholder="Search Book"
                                    aria-label="Search Book"
                                    value={query}
                                    onChange={handleChange}
                                />
                                <Button variant="danger" onClick={() => handleSelect(results[0])}>
                                    <FaSearch />
                                </Button>
                            </InputGroup>

                            {/* Live dropdown */}
                            {results.length > 0 && (
                                <ul className="list-group position-absolute w-100 mt-1 z-10" style={{ maxHeight: 200, overflowY: 'auto' }}>
                                    {results.map((book) => (
                                        <li
                                            key={book.id}
                                            className="list-group-item list-group-item-action"
                                            onClick={() => handleSelect(book)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {book.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </Form>

                        {/* --- Auth Links --- */}
                        {user?._id ? (
                            <>
                                <Link className="nav-link fw-bold header-links" to="/user">
                                    <AiFillDashboard /> Dashboard
                                </Link>
                                <Link className="nav-link fw-bold header-links" to="/" onClick={handleLogout}>
                                    <TbLogout /> Logout
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link className="nav-link fw-bold header-links" to="/login">
                                    <SlLogin /> Login
                                </Link>
                                <Link className="nav-link fw-bold header-links" to="/signup">
                                    <SiGnuprivacyguard /> SignUp
                                </Link>
                                <Link className="nav-link fw-bold header-links" to="/forgetpassword">
                                    <TbLockPassword /> Forget Password
                                </Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>

                {/* --- Cart Icon --- */}
                {
                    user?.role === "admin"
                        ? <div>
                        </div>
                        :
                        <div className="position-relative">
                            <Link className="nav-link fw-bold header-links fs-1" to="/cart">
                                <BsCart3 />
                            </Link>
                            <Badge pill bg="warning" text="dark" className="position-absolute top-0 end-0">
                                {items.length}
                            </Badge>
                        </div>
                }

            </Container>
        </Navbar>
    );
};

export default Header;
