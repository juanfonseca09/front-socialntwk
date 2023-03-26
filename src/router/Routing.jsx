import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { PrivateLayout } from "../components/layout/private/PrivateLayout";
import { PublicLayout } from "../components/layout/public/PublicLayout";
import { Login } from "../components/user/Login";
import { Register } from "../components/user/Register";
import { Feed } from "../components/publication/Feed";
import { AuthProvider } from "../context/AuthProvider";
import { Logout } from "../components/user/Logout";
import { People } from "../components/user/People";
import { Config } from "../components/user/Config";
import { Home } from "../components/layout/private/Home";
import { Following } from "../components/follow/Following";
import { Followers } from "../components/follow/Followers";
import { Profile } from "../components/user/Profile";

export const Routing = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Register />} />
        </Route>

        <Route path="/social" element={<PrivateLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="feed" element={<Feed />} />
          <Route path="logout" element={<Logout />} />
          <Route path="people" element={<People />} />
          <Route path="settings" element={<Config />} />
          <Route path="following/:userId" element={<Following />} />
          <Route path="followers/:userId" element={<Followers />} />
        </Route>

        <Route
          path="*"
          element={
            <>
              <p>
                <h1>Error 404</h1>
                <Link to="/">Volver a Inicio</Link>
              </p>
            </>
          }
        />
      </Routes>
    </AuthProvider>
  );
};
