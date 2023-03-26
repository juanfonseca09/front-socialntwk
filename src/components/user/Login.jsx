import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export const Login = () => {
  const { form, changed } = useForm({});
  const [validated, setValidated] = useState(false);
  const [alert, setAlert] = useState("");
  const [message, setMessage] = useState("");
  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    const formData = e.currentTarget;
    let userLogin = form;
    if (formData.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    e.preventDefault();
    setValidated(true);
    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(userLogin),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await request.json();
    if (data.status === "success") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setAuth(data.user);
      setAlert("success");
      setMessage("Usuario Identificado!");
      setTimeout(window.location.reload(), 1500);
    } else {
      setAlert("danger");
      setMessage("Los datos ingrasados son incorrectos. Intentelo nuevamente!");
    }
  };

  return (
    <section className="gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white">
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Ingresa tu E-mail y Contraseña.
                  </p>
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <Form.Group
                      className="form-outline form-white mb-4"
                      controlId="validationCustom02"
                    >
                      <Form.Label className="form-label">E-mail</Form.Label>
                      <Form.Control
                        required
                        type="email"
                        placeholder="Ingrese su correo electronico"
                        name="email"
                        autocomplete="off"
                        onChange={changed}
                      />
                      <Form.Control.Feedback type="invalid">
                        Ingrese un correo electronico valido!
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      className="form-outline form-white mb-4"
                      controlId="validationCustom02"
                    >
                      <Form.Label className="form-label">Contraseña</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        placeholder="Ingrese su contraseña"
                        name="password"
                        autocomplete="off"
                        onChange={changed}
                      />
                      <Form.Control.Feedback type="invalid">
                        Ingrese una contraseña valida!
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Alert className="mt-3" key={alert} variant={alert}>
                      {message}
                    </Alert>
                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Login
                    </button>
                  </Form>
                </div>
                <div>
                  <p className="mb-0">
                    No Estas Registrado?{" "}
                    <Link to="/registro" className="text-white-50 fw-bold">
                      Registrate
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
