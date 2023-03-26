import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

export const Register = () => {
  const { form, changed } = useForm({});
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const formData = e.currentTarget;
    let newUser = form;
    if (formData.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    e.preventDefault();
    setValidated(true);
    const request = await fetch(Global.url + "user/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await request.json();
    if (data.message === "Usuario registrado correctamente") {
      setAlert("success");
      setMessage(
        "Usuario registrado correctamente, bienvenido " +
          data.user.name +
          "! Redirigiendo..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    }
    if (data.message === "El usuario ya existe") {
      setAlert("danger");
      setMessage("El usuario ya se encuentra registrado!");
    }
    console.log(data);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section className="gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white">
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase mb-5">
                    Registrate
                  </h2>
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <Form.Group className="form-outline form-white mb-4">
                      <Form.Label className="form-label">Nombre</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Ingrese su Nombre"
                        name="name"
                        autocomplete="off"
                        onChange={changed}
                      />
                      <Form.Control.Feedback type="invalid">
                        Ingrese un nombre valido!
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="form-outline form-white mb-4">
                      <Form.Label className="form-label">Apellido</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Ingrese su correo electronico"
                        name="surname"
                        autocomplete="off"
                        onChange={changed}
                      />
                      <Form.Control.Feedback type="invalid">
                        Ingrese un Apellido valido!
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="form-outline form-white mb-4">
                      <Form.Label className="form-label">
                        Nombre De Usuario
                      </Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">
                          @
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="Ingrese su nombre de usuario"
                          aria-describedby="inputGroupPrepend"
                          name="nick"
                          required
                          autocomplete="off"
                          onChange={changed}
                        />
                        <Form.Control.Feedback type="invalid">
                          Ingrese un nombre de usuario valido!
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="form-outline form-white mb-4">
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
                    <Form.Group className="form-outline form-white mb-4">
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
                    <Form.Group className="form-outline form-white mb-4 p-4">
                      <Form.Check
                        required
                        label="Acepto los terminos y condiciones."
                        feedback="Debes aceptarlos antes de continuar."
                        feedbackType="invalid"
                      />
                      <a
                        onClick={handleShow}
                        type="button"
                        className="text-white-50 fw-bold"
                      >
                        (ver terminos y condiciones)
                      </a>
                    </Form.Group>
                    <Alert key={alert} variant={alert}>
                      {message}
                    </Alert>
                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Registrarse
                    </button>
                  </Form>
                </div>
                <div>
                  <p className="mb-0">
                    Ya estas Registrado?{" "}
                    <Link to="/login" className="text-white-50 fw-bold">
                      Log-in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Terminos y Condiciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque velit
          eaque aspernatur nam eveniet fugit culpa provident molestias
          architecto sit vitae soluta libero nihil dolores dolorem, vero commodi
          est perspiciatis.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};
