import React, { useState } from "react";
import "./NavBar.css";
import { Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Navbar
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
            <Dropdown.Menu className="dropdown-menu dropdown-menu-dark dropdown-menu-md-end bg-darker shadow-lg">
              <Dropdown.Item
                onClick={() => {
                  setIsExpanded(false);
                }}
                className="nav-dropdown-link py-3 py-lg-2"
              >
                <Link
                  to={"/search-by-title"}
                  className="text-decoration-none text-orange nav-dropdown-link py-3 py-lg-2"
                >
                  Search by title
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setIsExpanded(false);
                }}
                className="nav-dropdown-link py-3 py-lg-2"
              >
                <Link
                  to={"/search-by-rating"}
                  className="text-decoration-none text-orange nav-dropdown-link"
                >
                  Search by rating
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
