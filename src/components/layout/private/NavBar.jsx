import {
  FaHouseUser,
  FaAlignRight,
  FaUsers,
  FaCog,
  FaRegShareSquare,
} from "react-icons/fa";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import avatar from "../../../assets/img/user.png";
import useAuth from "../../../hooks/useAuth";
import { Global } from "../../../helpers/Global";

export const NavBar = () => {
  const { auth } = useAuth();
  const location = useLocation();

  const navigate = useNavigate();
  const redirect = (url) => {
    navigate(url);
  };

  const { pathname } = location;
  const splitLocation = pathname.split("/social/");

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="p-2">
      <Navbar.Brand>
        <strong>SOCIAL-NETWORK</strong>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Nav className="me-auto">
        {" "}
        <Link
          className={
            splitLocation[1] === "home" || "/"
              ? "text-decoration-none text-white p-3 navbk active"
              : "text-decoration-none text-white p-3 navbk"
          }
          to="/social/home"
        >
          <FaHouseUser className="mb-1" /> Inicio
        </Link>{" "}
        <Link
          className={
            splitLocation[1] === "feed"
              ? "text-decoration-none text-white p-3 navbk active"
              : "text-decoration-none text-white p-3 navbk"
          }
          to="/social/feed"
        >
          <FaAlignRight className="mb-1" /> Feed
        </Link>{" "}
        <Link
          className={
            splitLocation[1] === "people"
              ? "text-decoration-none text-white p-3 navbk active"
              : "text-decoration-none text-white p-3 navbk"
          }
          to="/social/people"
        >
          <FaUsers className="mb-1" /> Seguir
        </Link>
      </Nav>
      <Nav>
        <Navbar.Collapse>
          <div
            type="button"
            onClick={() => redirect("/social/profile/" + auth._id)}
          >
            {auth.image != "default.png" ? (
              <img
                alt="profile-image"
                className="list-end__img"
                src={Global.url + "user/avatar/" + auth.image}
              />
            ) : (
              <img alt="profile-image" className="list-end__img" src={avatar} />
            )}
            ;<Navbar.Text className="p-2"> {auth.nick}</Navbar.Text>
          </div>{" "}
          <Link
            className={
              splitLocation[1] === "settings"
                ? "text-decoration-none text-white p-2 navbk active"
                : "text-decoration-none text-white p-2 navbk"
            }
            to="/social/settings"
          >
            <FaCog className="mb-1" /> Ajustes
          </Link>{" "}
          <Link
            className="text-decoration-none text-white p-2 navbk"
            to="/social/logout"
          >
            <FaRegShareSquare className="mb-1" /> Cerrar Sesion
          </Link>
        </Navbar.Collapse>
      </Nav>
    </Navbar>
  );
};
