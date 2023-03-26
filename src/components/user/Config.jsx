import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Global } from "../../helpers/Global";
import Alert from "react-bootstrap/Alert";
import useAuth from "../../hooks/useAuth";
import { SerializeForm } from "../../helpers/SerializeForm";
import avatar from "../../assets/img/user.png";

export const Config = () => {
  const [validated, setValidated] = useState(false);
  const [alert, setAlert] = useState("");
  const [message, setMessage] = useState("");
  const { auth, setAuth } = useAuth();
  const token = localStorage.getItem("token");

  const updateUser = async (e) => {
    const formData = e.currentTarget;

    if (formData.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    e.preventDefault();
    let newUserData = SerializeForm(e.target);
    delete newUserData.file0;
    const request = await fetch(Global.url + "user/update", {
      method: "PUT",
      body: JSON.stringify(newUserData),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await request.json();
    if (data.status == "success" && data.user) {
      delete data.user.password;
      setAuth(data.user);
      setAlert("success");
      setMessage("Datos actualizados correctamente!");
    } else if (data.message === "El usuario ya existe") {
      setAlert("danger");
      setMessage("Este usuario ya existe, intentelo nuevamente!");
    } else {
      setAlert("danger");
      setMessage(
        "Hubo un problema al actualizar los datos, intentelo nuevamente!"
      );
    }
    console.log(data);

    const fileInput = document.querySelector("#file");
    if (data.status == "success" && fileInput.files[0]) {
      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);
      const uploadRequest = await fetch(Global.url + "user/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: token,
        },
      });
      const uploadData = await uploadRequest.json();
      if (uploadData.status == "success" && uploadData.user) {
        delete uploadData.user.password;
        setAuth(uploadData.user);
      }
    }
  };

  return (
    <section>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="card bg-dark text-white">
            <div className="card-body p-5 text-center">
              <div className="mb-md-5 mt-md-4 pb-5 px-5">
                <div className="mb-5">
                  <h1>Ajustes de Usuario</h1>
                </div>

                <Form noValidate validated={validated} onSubmit={updateUser}>
                  <Form.Group className="px-5 mb-3">
                    <Form.Label className="form-label">
                      Modificar Nombre
                    </Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={auth.name}
                      name="name"
                      autocomplete="off"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingrese un nombre valido!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="px-5 mb-3">
                    <Form.Label className="form-label">
                      Modificar Apellido
                    </Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={auth.surname}
                      name="surname"
                      autocomplete="off"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingrese un Apellido valido!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="px-5 mb-3">
                    <Form.Label className="form-label">
                      Modificar Nombre De Usuario
                    </Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">
                        @
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        defaultValue={auth.nick}
                        aria-describedby="inputGroupPrepend"
                        name="nick"
                        autocomplete="off"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Ingrese un nombre de usuario valido!
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="px-5 mb-3">
                    <Form.Label className="form-label">
                      Modificar Bio
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      defaultValue={auth.bio}
                      name="bio"
                      autocomplete="off"
                    />
                  </Form.Group>
                  <Form.Group className="px-5 mb-3">
                    <Form.Label className="form-label">
                      Modificar E-mail
                    </Form.Label>
                    <Form.Control
                      type="email"
                      defaultValue={auth.email}
                      name="email"
                      autocomplete="off"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingrese un correo electronico valido!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="px-5 mb-3">
                    <Form.Label className="form-label">
                      Modificar Contraseña
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      autocomplete="off"
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingrese una contraseña valida!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="px-5 mb-3">
                    <Form.Label>Modificar Imagen de Perfil</Form.Label>
                    <p className="avatar avatar-xl rounded-circle mb-3 mt-2 ">
                      {auth.image != "default.png" ? (
                        <img
                          alt="profile-image"
                          className="config-avatar"
                          src={Global.url + "user/avatar/" + auth.image}
                        />
                      ) : (
                        <img
                          alt="profile-image"
                          className="config-avatar"
                          src={avatar}
                        />
                      )}
                    </p>
                    <div className="col-8">
                      <Form.Control type="file" name="file0" id="file" />
                    </div>
                  </Form.Group>
                  <Alert className="" key={alert} variant={alert}>
                    {message}
                  </Alert>
                  <button
                    className="btn  btn-outline-light px-5 mb-0"
                    type="submit"
                  >
                    Modificar
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
