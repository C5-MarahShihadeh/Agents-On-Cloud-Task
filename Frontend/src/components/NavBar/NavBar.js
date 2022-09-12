import Container from "react-bootstrap/Container";
import React, { useContext, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/reducers/auth";
import { AiOutlineUser } from "react-icons/ai";
import { BsCart,BsHeartFill } from "react-icons/bs";


function CollapsibleExample() {
  const [view, setView] = useState(false);
  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  const favoriteState = useSelector((state) => {
    return {
      favorite: state.favorite.favorite,
    };
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Second Hand Books</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {isLoggedIn !== true ? (
              <div>
                <NavDropdown
                  title={<AiOutlineUser />}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item href="/login">login</NavDropdown.Item>
                  <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                </NavDropdown>
              </div>
            ) : (
              <>
                
                <Nav.Link eventKey={2} href="/favorite">
                  Favorite <BsHeartFill/>
                </Nav.Link>
                <Nav.Link eventKey={2} href="/cart">
                  Cart <BsCart/>
                </Nav.Link>
                <Nav.Link eventKey={2} href="/sell">
                  Sell Books
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
