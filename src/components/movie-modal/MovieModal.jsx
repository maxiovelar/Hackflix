import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "./MovieModal.css";
import cinema from "../../assets/cinema.jpg";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import cn from "classnames";

function MovieModal({ setModalShow, movieSelected, modalShow }) {
  const handleClose = () => setModalShow(false);
  const is4K = Number(movieSelected?.release_date?.slice(0, 4)) >= 2016;

  return (
    <Modal
      show={modalShow}
      onHide={handleClose}
      scrollable={true}
      animation={true}
      aria-labelledby="contained-modal-title-vcenter"
      backdropClassName="modal-backdrop"
      contentClassName="modal-z-index modal-shadow rounded-4 bg-dark border border-0"
      centered
    >
      <Modal.Header className="border-0 pb-0 pt-0 position-relative">
        <Button
          variant="transparent"
          className="rounded-circle position-absolute top-0 end-0"
          onClick={handleClose}
        >
          <i className="bi bi-x-circle-fill drop-shadow text-orange fs-2 hover"></i>
        </Button>
        <div className="d-flex justify-content-center w-100 mt-0 rounded-top">
          {movieSelected.backdrop_path ? (
            <img
              className="object-fit-cover rounded-top"
              src={`${process.env.REACT_APP_API_IMAGE_BASE_URL}/w500/${movieSelected.backdrop_path}`}
              alt={movieSelected.title}
            />
          ) : (
            <img
              className="object-fit-cover rounded-top"
              src={cinema}
              width="500px"
              alt={movieSelected.title}
            />
          )}
        </div>
      </Modal.Header>
      <Modal.Body className="mb-0 pb-0 px-2 px-sm-4">
        <div className="d-flex flex-column text-white px-3">
          <Modal.Title id="contained-modal-title-vcenter">
            <p className="fw-bold h3 text-center mb-4 modal-sm-title">
              {movieSelected.title}
              {
                <i
                  className={cn("bi fs-5 ms-2 text-orange", {
                    "bi-badge-hd": !is4K,
                    "bi-badge-4k": is4K,
                  })}
                ></i>
              }
            </p>
          </Modal.Title>
          <div>
            <span className="h5 d-block mb-2 modal-sm-subtitle">Overview:</span>
            <article className="modal-sm-text fs-7 lh-lg overflow-auto">
              {movieSelected.overview}
            </article>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0 mt-0 ps-2 pe-4 px-sm-4">
        <div className="w-100 d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between px-3">
          <span className="text-orange text-shadow modal-sm-subtitle">
            Votes count:
            <span className="text-white text-shadow fs-5 ms-1 modal-sm-subtitle">
              {movieSelected.vote_count}
            </span>
          </span>
          <div className="d-flex align-items-center">
            <span className="text-orange text-shadow me-1 modal-sm-subtitle mb-0">
              Rating:
            </span>
            <Rating
              emptySymbol="bi bi-star text-orange"
              fullSymbol="bi bi-star-fill text-orange"
              quiet={false}
              readonly={true}
              initialRating={movieSelected.vote_average / 2}
            />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-end justify-content-sm-center w-100 pt-5 mb-4">
          <Link
            to={`/movie/${movieSelected.id}`}
            className="text-decoration-none orange-hover text-orange fs-5 fw-bold"
          >
            <i className="bi bi-play-btn-fill me-2"></i>View more
          </Link>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default MovieModal;
