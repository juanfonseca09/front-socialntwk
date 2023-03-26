import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { NavBar } from "./NavBar";
import { Sidebar } from "./Sidebar";

export const PrivateLayout = () => {
  const { auth, loading } = useAuth();
  if (loading) {
    <h1>Cargando...</h1>;
  } else {
    return (
      <div className="private-bk">
        <NavBar />
        <Container>
          <Row>
            <Col md={8}>{auth._id ? <Outlet /> : <Navigate to="/login" />}</Col>
            <Col md={4}>
              <Sidebar />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};
