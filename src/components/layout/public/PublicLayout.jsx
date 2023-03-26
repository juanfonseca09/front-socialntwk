import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { NavBar } from "./NavBar";

export const PublicLayout = () => {
  const { auth } = useAuth();

  return (
    <>
      <NavBar />
      {!auth._id ? <Outlet /> : <Navigate to="/social" />}
    </>
  );
};
