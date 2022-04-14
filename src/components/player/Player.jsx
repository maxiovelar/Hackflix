import React from "react";
import { ProgressBar, Spinner } from "react-bootstrap";
import "./Player.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Player() {
  const notify = () =>
    toast.info("This function is beyond the scope of this project.");

  return (
    <div className="bg-dark p-4 rounded-4 player-container">
      <div className="d-flex align-items-center justify-content-center mb-4 w-100">
        <Spinner animation="grow" size="sm" variant="secondary" className="" />
        <Spinner
          animation="grow"
          size="sm"
          variant="secondary"
          className="mx-2"
        />
        <Spinner animation="grow" size="sm" variant="secondary" />
      </div>
      <div className="d-block d-xl-none">
        <ProgressBar
          animated
          variant="secondary"
          now={100}
          className="mx-2 responsive-progress-bar"
        />
      </div>
      <div className="d-flex align-items-center justify-content-between px-2 px-xl-0">
        <div className="d-flex align-items-center">
          <span className="text-white me-2">00:00</span>
          <i
            onClick={notify}
            className="bi bi-play-fill text-orange fs-4 me-0 orange-hover pointer"
          ></i>
          <i
            onClick={notify}
            className="bi bi-pause-fill text-orange fs-4 ms-0 orange-hover pointer"
          ></i>
        </div>
        <div className="w-100 d-none d-xl-block">
          <ProgressBar
            animated
            variant="secondary"
            now={100}
            className="mx-2"
          />
        </div>
        <div className="d-flex align-items-center">
          <i
            onClick={notify}
            className="bi bi-pip text-orange fs-5 me-3 orange-hover pointer"
          ></i>
          <i className="bi bi-infinity text-white fs-4"></i>
        </div>
      </div>
      <div className="row w-100 d-flex align-items-center justify-content-center mt-3 mx-auto">
        <div className="col-2 col-xl-4 d-flex justify-content-center">
          <i
            onClick={notify}
            className="bi bi-volume-mute-fill text-orange fs-1 orange-hover pointer"
          ></i>
        </div>
        <div className="col col-xl-4 d-flex align-items-center justify-content-center player-controls">
          <i
            onClick={notify}
            className="bi bi-skip-backward-circle text-orange fs-1 orange-hover pointer"
          ></i>
          <i
            onClick={notify}
            className="bi bi-play-circle text-orange display-1 mx-3 orange-hover pointer"
          ></i>
          <i
            onClick={notify}
            className="bi bi-skip-forward-circle text-orange fs-1 orange-hover pointer"
          ></i>
        </div>
        <div className="col-10 col-xl-4 d-flex align-items-center">
          <i className="bi bi-volume-down-fill text-orange fs-3"></i>
          <label for="customRange1" className="form-label visually-hidden">
            Volume range
          </label>
          <input
            type="range"
            className="form-range me-2 ms-1 me-md-4 ms-md-3"
            id="customRange1"
          ></input>
          <i className="bi bi-volume-up-fill text-orange fs-3"></i>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Player;
