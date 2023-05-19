import React from "react";
import "./Footer.css";
import tmdbLogo from "../../assets/tmdb-logo.svg";

export const Footer = () => {
  return (
    <footer
      data-testid="footer"
      className="container-fluid d-flex flex-column justify-content-center align-items-center shadow-lg bg-dark py-4"
    >
      <p className="text-white footer-text text-center mb-2">
        The data on this app is provided by{" "}
      </p>
      <img src={tmdbLogo} width="100px" alt="the movie db logo" />
      <p className="copyright mt-4 mb-0 text-center">
        Copyright © {new Date().getFullYear()} Maxi Ovelar. All Rights Reserved
      </p>
    </footer>
  );
};
