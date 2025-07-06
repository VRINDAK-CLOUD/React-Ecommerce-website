import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BsCart } from 'react-icons/bs';
import { useUser } from './UserContext'; 
import { ProductCountContext } from "./ProductCountContext";
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './Firebase'; 
import './Navhead.css'; 

const Navhead = () => {
  const user = useUser(); 
  const { productCount } = useContext(ProductCountContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Navbar className="navbar-custom" expand="lg">
      <Container className="navbar-container">
        <Navbar.Brand as={Link} to="/home">
          <img
            src="/background.png"
            width="70"
            height="70"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>

        <Nav className="align-items-center">
          <Nav.Link as={Link} to="/home" className="nav-link-custom">
            HOME
          </Nav.Link>
          <Nav.Link as={Link} to="/home" className="nav-link-custom">
            ABOUT
          </Nav.Link>
          <Nav.Link as={Link} to="/cart" className="cart-link">
            <BsCart size={32} />
            {productCount > 0 && (
              <span className="cart-badge">{productCount}</span>
            )}
          </Nav.Link>

          {user ? (
            <>
              <span className="user-greeting me-3">
                Hello, {user.firstName}
              </span>
              <Nav.Link onClick={handleLogout} className="nav-link-custom logout-link">
                LOGOUT
              </Nav.Link>
            </>
          ) : (
            <Nav.Link as={Link} to="/login" className="nav-link-custom">
              LOGIN
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navhead;
