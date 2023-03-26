import React, { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import Alert from "react-bootstrap/Alert";
import { FaSync } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import { PublicationList } from "./PublicationList";

export const Feed = () => {
  const [postCount, setPostCount] = useState(0);
  const [publications, setPublications] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const params = useParams();
  const { auth } = useAuth();
  const token = localStorage.getItem("token");

  useEffect(() => {
    getPublications(1, false);
  }, []);

  const navigate = useNavigate();
  const redirect = (url) => {
    navigate(url);
  };

  const getPublications = async (nextPage = 1, showNews = false) => {
    if (showNews) {
      setPublications([]);
      setPage(1);
      nextPage = 1;
    }
    const request = await fetch(Global.url + "publication/feed/" + nextPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await request.json();
    setPostCount(data.total);
    if (data.status == "success") {
      let newPublications = data.publications;

      if (!showNews && publications.length >= 1) {
        newPublications = [...publications, ...data.publications];
      }

      setPublications(newPublications);

      if (
        !showNews &&
        publications.length >= data.total - data.publications.length
      )
        setMore(false);
      if (!showNews && data.pages <= 1) setMore(false);
    } else {
      setMore(false);
    }
  };

  return (
    <div>
      {publications != "" ? (
        <div>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-outline-dark lx-3 mt-4"
              onClick={() => getPublications(1, true)}
            >
              Refrescar <FaSync />
            </button>
          </div>
          <PublicationList
            publications={publications}
            getPublications={getPublications}
            page={page}
            setPage={setPage}
            more={more}
            setMore={setMore}
          />
        </div>
      ) : (
        <div>
          <Alert className="mt-3" key="danger" variant="danger">
            No hay publicaciones para mostrar!
          </Alert>
        </div>
      )}
    </div>
  );
};
