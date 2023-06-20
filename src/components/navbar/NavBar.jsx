import React, { useState } from "react";
import "./NavBar.css";
import { Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar({ isOnline }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Navbar
      data-testid="navbar"
      bg="dark"
      expand="lg"
      expanded={isExpanded}
      className="navbar-dark py-3 px-4 shadow nav-position"
    >
      <Link
        to={"/"}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="fw-bold navbar-brand-link text-white fs-4"
      >
        <span className="text-orange">HACK</span>FLIX
      </Link>

      <Link
        to={"/"}
        className="d-none d-lg-block text-white text-decoration-none ms-4"
      >
        Home
      </Link>
      <Navbar.Toggle
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        aria-controls="basic-navbar-nav"
        data-testid="navbar-toggle"
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Dropdown>
            <Dropdown.Toggle
              variant="transparent"
              id="dropdown-basic"
              className="text-white my-2 my-lg-0"
            >
              Search by
            </Dropdown.Toggle>
            <Dropdown.Menu
              className="dropdown-menu dropdown-menu-dark dropdown-menu-md-end bg-darker shadow-lg"
              data-testid="dropdown-menu"
            >
              <Dropdown.Item
                as={Link}
                to={"/search-by-title"}
                onClick={() => {
                  setIsExpanded(false);
                }}
                className="nav-dropdown-link text-decoration-none text-orange py-3 py-lg-2"
              >
                {/* <Link
                  to={"/search-by-title"}
                  className="text-decoration-none text-orange nav-dropdown-link py-3 py-lg-2"
                > */}
                Search by title
                {/* </Link> */}
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={"/search-by-rating"}
                onClick={() => {
                  setIsExpanded(false);
                }}
                className="nav-dropdown-link text-decoration-none text-orange py-3 py-lg-2"
              >
                {/* <Link
                  to={"/search-by-rating"}
                  className="text-decoration-none text-orange nav-dropdown-link"
                > */}
                Search by rating
                {/* </Link> */}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
      {isOnline === true ? (
        <i
          data-testid="online"
          className="d-none ms-5 text-white bi bi-wifi d-lg-block"
          title="Online"
        ></i>
      ) : (
        <i
          data-testid="offline"
          className="d-none ms-5 text-danger bi bi-wifi-off d-lg-block"
          title="Offline"
        ></i>
      )}
    </Navbar>
  );
}

export default NavBar;
