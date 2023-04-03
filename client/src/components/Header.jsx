import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutAction} from "../redux/actions/userAction";
import {NavDropdown} from "react-bootstrap";

function Header() {

    const user = useSelector(state => state.user);
    const {userInfo} = user;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logoutAction());
        navigate("/login");
    }

    return (
        <Navbar bg="dark" expand="sm">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className={"d-flex justify-content-around"}>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link className={"nav-link"} to={"/"}>Home</Link>
                        <Link className={"nav-link"} to={"/about"}>About</Link>
                        <Link className={"nav-link"} to={"/"}>Products</Link>
                        <Link className={"nav-link"} to={"/cart"}>Cart</Link>
                        {
                            userInfo ? (
                                <>
                                    <NavDropdown title={userInfo.name} id="navbarScrollingDropdown">
                                        <NavDropdown.Item onClick={() => navigate("/profile")}>My Profile</NavDropdown.Item>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) :
                                (
                                    <>
                                        <Link className={"nav-link"} to={"/login"}>Login</Link>
                                        <Link className={"nav-link"} to={"/register"}>Register</Link>
                                    </>
                                )

                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Header;