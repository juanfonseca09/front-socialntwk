import React from "react";

export const Home = () => {
  return (
    <section>
      <div className="container py-5">
        <div className="d-flex">
          <div className="card bg-dark text-white">
            <div className="card-body p-5 pb-5">
              <div className=" px-5 text-center">
                <div className="mt-3 mb-4">
                  <h1>
                    <strong>SOCIAL-NETWORK</strong>
                  </h1>
                </div>
                <h4>
                  Es un proyecto realizado desde cero que busca imitar el
                  funcionamiento de una red social.
                </h4>
                <h5 className="mt-3 mb-3">
                  Este proyecto cuenta con algunas funcionalidades tales como:
                </h5>
              </div>
              <ul className="mb-5">
                <li className="mb-1">
                  Una seccion de registro y login para crear o entrar a tu
                  cuenta.
                </li>
                <li className="mb-1">
                  Un perfil para cada usuario que contiene informacion del
                  mismo, las publicaciones que este realiza y una funcionalidad
                  distinta dependiendo si es un perfil propio o de alguien mas.
                </li>
                <li className="mb-1">
                  Un slidebar que en todo momento muestra tu foto de perfil, la
                  informacion del usuario y un apartado para realizar posteos.
                </li>
                <li className="mb-1">
                  Un feed que permite ver en tiempo real publicaciones de las
                  persona a las que sigues.
                </li>
                <li className="mb-1">
                  Una seccion de seguir que permite ver todos los usuarios que
                  esten registrados en la red con el fin de seguirlos y tambien
                  poder ingresar a su perfil.
                </li>
                <li className="mb-1">
                  Una seccion de configuracion que permite modificar toda la
                  informacion que tenga el usuario.
                </li>
                <li className="mb-1">
                  Un boton para cerrar sesion y volver a el apartado de login y
                  registro.
                </li>
              </ul>

              <h5>Backend:</h5>
              <h6>
                A nivel de Backend, el proyecto esta montado sobre una Api
                desarrollada con JavaScript y NodeJs, ademas del uso de algunas
                dependecias tales como express, mongoose, jwt, mliter, bcrypt y
                demas.
              </h6>
              <h5 className="mt-4">Frontend:</h5>
              <h6>
                A nivel de Frontend, el proyecto fue desarrollado en React
                utilizando tambien Bootstrap para todo lo que viene siendo el
                diseño del mismo.
              </h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
