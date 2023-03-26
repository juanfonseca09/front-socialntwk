import { FaSignInAlt, FaRegUser } from "react-icons/fa";
import React from "react";
import Container from "react-bootstrap/Container";
import { Link, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export const NavBar = () => {
  const location = useLocation();

  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="p-3">
      <Container>
        <Navbar.Brand href="#home">
          <strong>SOCIAL-NETWORK</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav className="me-auto">
          {" "}
          <Link
            className={
              splitLocation[1] === "login"
                ? "text-decoration-none text-white p-3 navbk active"
                : "text-decoration-none text-white p-3 navbk"
            }
            to="/login"
          >
            <FaSignInAlt className="mb-1" /> Login
          </Link>{" "}
          <Link
            className={
              splitLocation[1] === "registro"
                ? "text-decoration-none text-white p-3 navbk active"
                : "text-decoration-none text-white p-3 navbk"
            }
            to="/registro"
          >
            <FaRegUser className="mb-1" /> Registro
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
