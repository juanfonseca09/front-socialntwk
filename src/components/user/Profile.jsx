import React, { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import { useNavigate, useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import { PublicationList } from "../publication/PublicationList";

export const Profile = () => {
  const [user, setUser] = useState({});
  const [counters, setCounters] = useState({});
  const [iFollow, setIFollow] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [publications, setPublications] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const params = useParams();
  const { auth } = useAuth();
  const token = localStorage.getItem("token");

  useEffect(() => {
    getDataUser();
    getCounters();
    getPublications(1, true);
  }, []);

  useEffect(() => {
    getDataUser();
    getCounters();
    setMore(true);
    getPublications(1, true);
  }, [params]);

  const navigate = useNavigate();
  const redirect = (url) => {
    navigate(url);
  };

  const getDataUser = async () => {
    const request = await fetch(Global.url + "user/profile/" + params.userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const dataUser = await request.json();
    setUser(dataUser.user);
    if (dataUser.following && dataUser.following._id) setIFollow(true);
  };

  const getCounters = async () => {
    const request = await fetch(Global.url + "user/counters/" + params.userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await request.json();

    if (data.followed) {
      setCounters(data);
    }
  };

  const follow = async (userId) => {
    const request = await fetch(Global.url + "follow/save", {
      method: "POST",
      body: JSON.stringify({ followed: userId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await request.json();
    if (data.status == "success") {
      setIFollow(true);
    }
  };

  const unfollow = async (userId) => {
    const request = await fetch(Global.url + "follow/unfollow/" + userId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await request.json();
    if (data.status == "success") {
      setIFollow(false);
    }
  };

  const getPublications = async (nextPage = 1, newProfile = false) => {
    const request = await fetch(
      Global.url + "publication/user/" + params.userId + "/" + nextPage,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    const data = await request.json();
    setPostCount(data.total);
    if (data.status == "success") {
      let newPublications = data.publications;

      if (!newProfile && publications.length >= 1) {
        newPublications = [...publications, ...data.publications];
      }
      if (newProfile) {
        newPublications = data.publications;
        setMore(true);
        setPage(1);
      }
      setPublications(newPublications);

      if (
        !newProfile &&
        publications.length >= data.total - data.publications.length
      )
        setMore(false);
      if (data.pages <= 1) setMore(false);
    } else {
      setMore(false);
    }
  };

  return (
    <section>
      <div className=" py-4">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div>
            <div className="card">
              <div className="rounded-top text-white d-flex flex-row">
                <div className="ms-4 mt-5 d-flex flex-column">
                  {user.image != "default.png" ? (
                    <img
                      alt="profile-image"
                      className="img-fluid img-thumbnail mt-4 mb-2"
                      src={Global.url + "user/avatar/" + user.image}
                    />
                  ) : (
                    <img
                      alt="profile-image"
                      className="img-fluid img-thumbnail mt-4 mb-2"
                      src={avatar}
                    />
                  )}
                  {user._id != auth._id &&
                    (iFollow ? (
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        data-mdb-ripple-color="dark"
                        onClick={() => unfollow(user._id)}
                      >
                        Dejar de Seguir
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        data-mdb-ripple-color="dark"
                        onClick={() => follow(user._id)}
                      >
                        Seguir
                      </button>
                    ))}
                </div>
                <div className="ms-3">
                  <h5>
                    {user.name} {user.surname}
                  </h5>
                  <p>{user.nick}</p>
                </div>
              </div>
              <div className="p-4 text-black data">
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <p className="mb-1 h5">{postCount}</p>
                    <p className="small text-muted mb-0">Posts</p>
                  </div>
                  <div
                    type="button"
                    onClick={() => redirect("/social/following/" + user._id)}
                    className="px-3"
                  >
                    <p className="mb-1 h5">
                      {counters.following >= 1 ? counters.following : 0}
                    </p>
                    <p className="small text-muted mb-0">Following</p>
                  </div>
                  <div
                    type="button"
                    onClick={() => redirect("/social/followers/" + user._id)}
                  >
                    <p className="mb-1 h5">
                      {counters.followed >= 1 ? counters.followed : 0}
                    </p>
                    <p className="small text-muted mb-0">Followers</p>
                  </div>
                </div>
              </div>
              <div className="card-body p-4 text-black">
                {user.bio && (
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">Bio</p>
                    <div className="p-4 info">
                      <p className="font-italic mb-1">{user.bio} </p>
                    </div>
                  </div>
                )}

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="lead fw-normal mb-0">Posts Recientes</p>
                </div>
                {publications == "" && (
                  <div>
                    <span>El usuario no tiene publicaciones.</span>
                  </div>
                )}

                <PublicationList
                  publications={publications}
                  getPublications={getPublications}
                  page={page}
                  setPage={setPage}
                  more={more}
                  setMore={setMore}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
