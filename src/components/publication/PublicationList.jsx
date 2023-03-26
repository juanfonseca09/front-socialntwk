import React from "react";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import avatar from "../../assets/img/user.png";
import ReactTimeAgo from "react-time-ago";

export const PublicationList = ({
  publications,
  getPublications,
  page,
  setPage,
  more,
  setMore,
}) => {
  const { auth } = useAuth();

  const nextPage = () => {
    let next = page + 1;
    setPage(next);
    getPublications(next);
  };

  const deletePublication = async (publicationId) => {
    const request = await fetch(
      Global.url + "publication/remove/" + publicationId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    const data = await request.json();
    setPage(1);
    setMore(true);
    getPublications(1, true);
  };

  return (
    <div>
      {publications.map((publication) => {
        return (
          <div className="d-flex row " key={publication._id}>
            <div className="feed p-2">
              <div className="bg-white border mb-4 feed-card">
                <div>
                  <div className="d-flex flex-row justify-content-between align-items-center p-2 mt-1 border-bottom">
                    <div className="d-flex flex-row align-items-center feed-text px-2">
                      {publication.user.image != "default.png" ? (
                        <img
                          type="button"
                          className="rounded-circle"
                          width="60"
                          onClick={() =>
                            redirect("/social/profile/" + publication.user._id)
                          }
                          src={
                            Global.url + "user/avatar/" + publication.user.image
                          }
                        />
                      ) : (
                        <img
                          type="button"
                          className="rounded-circle"
                          width="60"
                          onClick={() =>
                            redirect("/social/profile/" + publication.user._id)
                          }
                          src={avatar}
                        />
                      )}
                      <div className="d-flex flex-column flex-wrap ml-2">
                        <span className="text-nowrap px-1 h5">
                          {publication.user.name} {publication.user.surname}
                        </span>
                        <span className="text-black-50 time px-2">
                          {" "}
                          <ReactTimeAgo
                            date={publication.created_at}
                            locale="es-ES"
                          />
                        </span>
                      </div>
                    </div>
                    {auth._id == publication.user._id && (
                      <div className="feed-icon px-4">
                        <FaRegTrashAlt
                          type="button"
                          onClick={() => deletePublication(publication._id)}
                          color="red"
                          size={25}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-2 px-3">
                  <span>{publication.text}</span>
                </div>
                {publication.file && (
                  <div className="p-3">
                    <img
                      className="img-fluid rounded"
                      width={400}
                      src={Global.url + "publication/media/" + publication.file}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {more && (
        <div className="d-flex justify-content-center mb-5 mt-2">
          <button onClick={nextPage} className="btn btn-outline-dark lx-3">
            Ver mas Posts
          </button>
        </div>
      )}
    </div>
  );
};
