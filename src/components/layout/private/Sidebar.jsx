import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import avatar from "../../../assets/img/user.png";
import { Global } from "../../../helpers/Global";
import Alert from "react-bootstrap/Alert";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "../../../hooks/useForm";

export const Sidebar = () => {
  const [alert, setAlert] = useState("");
  const [message, setMessage] = useState("");
  const { form, changed } = useForm({});
  const { auth, counters } = useAuth();

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const redirect = (url) => {
    navigate(url);
  };

  const savePublication = async (e) => {
    e.preventDefault();
    let newPublication = form;
    newPublication.user = auth._id;
    const request = await fetch(Global.url + "publication/save", {
      method: "POST",
      body: JSON.stringify(newPublication),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await request.json();
    if (data.status == "success") {
      setAlert("success");
      setMessage("Publicado exitosamente!");
    } else {
      setAlert("danger");
      setMessage("No fue posible realizar la publicación");
    }
    const fileInput = document.querySelector("#file");
    if (data.status == "success" && fileInput.files[0]) {
      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);
      const uploadRequest = await fetch(
        Global.url + "publication/upload/" + data.publicationStored._id,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: token,
          },
        }
      );
      const uploadData = await uploadRequest.json();

      if (uploadData.status == "success") {
        setAlert("success");
        setMessage("Publicado exitosamente!");
      } else {
        setAlert("danger");
        setMessage("No fue posible realizar la publicación.");
      }
    }
    const getForm = document.querySelector("#post-form");
    getForm.reset();
  };

  return (
    <div className=" bg-surface-secondary ">
      <div className=" mt-4 mb-5 d-flex row">
        <div className="mx-auto">
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex justify-content-center">
                <p className="avatar avatar-xl rounded-circle mb-2">
                  {auth.image != "default.png" ? (
                    <img
                      alt="profile-image"
                      className="container-avatar"
                      src={Global.url + "user/avatar/" + auth.image}
                    />
                  ) : (
                    <img
                      alt="profile-image"
                      className="container-avatar"
                      src={avatar}
                    />
                  )}
                </p>
              </div>
              <div className="text-center my-6">
                <p className="d-block h5 mb-0">{auth.name}</p>
                <span className="d-block text-sm text-muted mb-3">
                  {auth.nick}
                </span>
              </div>
              <div className="d-flex">
                <div
                  className="col-4 text-center"
                  onClick={() => redirect("/social/profile/" + auth._id)}
                >
                  <p className="h4 font-bolder mb-0" type="button">
                    {counters.publications}
                  </p>
                  <span type="button" className="d-block text-sm">
                    Posts
                  </span>
                </div>
                <div
                  type="button"
                  className="col-4 text-center"
                  onClick={() => redirect("/social/following/" + auth._id)}
                >
                  <p className="h4 font-bolder mb-0">{counters.following}</p>
                  <span className="d-block text-sm">Following</span>
                </div>
                <div
                  type="button"
                  className="col-4 text-center"
                  onClick={() => redirect("/social/followers/" + auth._id)}
                >
                  <p className="h4 font-bolder mb-0">{counters.followed}</p>
                  <span className="d-block text-sm">Followers</span>
                </div>
              </div>
              <hr className="mb-0" />
              {auth.bio && (
                <div className="card-body info mt-2">
                  <FaQuoteLeft />
                  <p className="d-flex px-3 h6 ">{auth.bio}</p>
                  <FaQuoteRight className="float-end" />
                </div>
              )}
            </div>
          </div>

          <div className="card shadow my-3">
            <div className="card-body">
              <div className="d-flex justify-content-center">
                <Form id="post-form" onSubmit={savePublication}>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label">
                      Que estas pensando?
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      type="text"
                      name="text"
                      onChange={changed}
                      autoComplete="off"
                      placeholder="Publica un estado para que tus seguidores lo vean!"
                    />
                  </Form.Group>
                  <Form.Group className="mb-1">
                    <Form.Label className="form-label">
                      Sube una foto:
                    </Form.Label>
                    <Form.Control type="file" name="file0" id="file" />
                  </Form.Group>
                  <Alert className="mb-1" key={alert} variant={alert}>
                    {message}
                  </Alert>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-outline-success px-3 mb-2"
                      type="submit"
                    >
                      Publicar
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
