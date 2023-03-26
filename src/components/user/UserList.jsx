import React from "react";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/img/user.png";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import ReactTimeAgo from "react-time-ago";

export const UserList = ({
  users,
  getUsers,
  following,
  setFollowing,
  more,
  loading,
  page,
  setPage,
}) => {
  const { auth } = useAuth();

  const navigate = useNavigate();
  const redirect = (url) => {
    navigate(url);
  };

  const nextPage = () => {
    let next = page + 1;
    setPage(next);
    getUsers(next);
    console.log(page, next);
  };

  const follow = async (userId) => {
    const request = await fetch(Global.url + "follow/save", {
      method: "POST",
      body: JSON.stringify({ followed: userId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await request.json();
    if (data.status == "success") {
      setFollowing([...following, userId]);
    }
  };

  const unfollow = async (userId) => {
    const request = await fetch(Global.url + "follow/unfollow/" + userId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await request.json();
    if (data.status == "success") {
      let filterFollowing = following.filter(
        (followingUserId) => userId != followingUserId
      );
      setFollowing(filterFollowing);
    }
  };

  return (
    <>
      {users.map((user) => {
        if (user._id != auth._id)
          return (
            <div className="d-flex row col-10">
              <div className="feed p-2">
                <div className="bg-white border mb-2 feed-card">
                  <div>
                    <div
                      className="d-flex flex-row justify-content-between p-3 mb-1"
                      key={user._id}
                    >
                      <div className="d-flex flex-row align-items-center feed-text px-2">
                        {user.image != "default.png" ? (
                          <img
                            alt="profile-image"
                            type="button"
                            className="people-end__img"
                            onClick={() =>
                              redirect("/social/profile/" + user._id)
                            }
                            src={Global.url + "user/avatar/" + user.image}
                          />
                        ) : (
                          <img
                            alt="profile-image"
                            type="button"
                            className="people-end__img"
                            onClick={() =>
                              redirect("/social/profile/" + user._id)
                            }
                            src={avatar}
                          />
                        )}
                        <div className="d-flex flex-column flex-wrap ml-2">
                          <span
                            type="button"
                            onClick={() =>
                              redirect("/social/profile/" + user._id)
                            }
                            className="text-nowrap px-2 h5 mb-0"
                          >
                            {user.name} {user.surname}
                          </span>
                          <span className="text-black-50 px-2">
                            ||{" "}
                            <ReactTimeAgo
                              date={user.created_at}
                              locale="es-ES"
                            />
                          </span>
                        </div>
                      </div>

                      <div className="d-flex px-2 align-items-center">
                        {!following.includes(user._id) && (
                          <div className="feed-icon">
                            <FaUserPlus
                              onClick={() => follow(user._id)}
                              color="green"
                              size={25}
                            />
                          </div>
                        )}
                        {following.includes(user._id) && (
                          <div className="feed-icon">
                            <FaUserMinus
                              onClick={() => unfollow(user._id)}
                              color="red"
                              size={25}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {user.bio && (
                    <div class="border-top p-3">
                      <span>{user.bio}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
      })}
      {more && (
        <div className="d-flex justify-content-center mb-5 mt-2 col-10">
          <button onClick={nextPage} className="btn btn-outline-dark lx-3">
            Ver mas usuarios
          </button>
        </div>
      )}
    </>
  );
};
