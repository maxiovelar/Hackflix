// Create unit test for Layout component with jest
// Create unit test for Layout component with react-testing-library

import React from "react";
import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const renderNavBar = (isOnline) => {
  render(
    <MemoryRouter>
      <NavBar isOnline={isOnline} />
    </MemoryRouter>
  );
};

describe("Navbar test cases", () => {
  it("should renders Navbar component", () => {
    // Act
    renderNavBar(true);
    // Assert
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("should renders with correct props", () => {
    // Act
    renderNavBar(true);
    // Assert
    expect(screen.getByTestId("navbar")).toHaveClass(
      "navbar-dark py-3 px-4 shadow nav-position"
    );
    expect(screen.getByText("HACK")).toBeInTheDocument();
    expect(screen.getByText("FLIX")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Search by")).toBeInTheDocument();
    expect(screen.getByTestId("online")).toBeInTheDocument();
    expect(screen.getByTestId("online")).toHaveAttribute("title", "Online");
  });

  it("should renders Navbar component with isOnline false", () => {
    // Act
    renderNavBar(false);
    // Assert
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Search by")).toBeInTheDocument();
    expect(screen.getByTestId("offline")).toHaveAttribute("title", "Offline");
  });

  it("should Home link navigates to home", () => {
    // Arrange
    renderNavBar(true);
    const homeLink = screen.getByText("Home");
    // Act
    userEvent.click(homeLink);
    // Assert
    expect(window.location.pathname).toBe("/");
  });

  it("should HACKFLIX link navigates to home", () => {
    // Arrange
    renderNavBar(true);
    const hackflixLink = screen.getByText(/hack/i);
    // Act
    userEvent.click(hackflixLink);
    // Assert
    expect(window.location.pathname).toBe("/");
  });

  it("should collapses navbar when toggle clicked", () => {
    // Arrange
    renderNavBar(true);
    const toggleButton = screen.getByTestId("navbar-toggle");
    // Act
    userEvent.click(toggleButton);
    // Assert
    expect(toggleButton).not.toHaveClass("collapsed");
  });

  it("should links navigate to correct routes", () => {
    // Arrange
    renderNavBar(true);
    const dropdownToggle = screen.getByText("Search by");
    // Act
    userEvent.click(dropdownToggle);
    const dropdownMenu = screen.getByTestId("dropdown-menu");
    const searchByTitleLink = screen.getByText("Search by title");
    const searchByRatingLink = screen.getByText("Search by rating");
    // Assert
    expect(dropdownMenu).toHaveClass("show");
    expect(searchByTitleLink).toHaveAttribute("href", "/search-by-title");  
    expect(searchByRatingLink).toHaveAttribute("href", "/search-by-rating");
  });

  it("should closes dropdown menu when link clicked", () => {
    // Arrange
    renderNavBar(true);
    const dropdownToggle = screen.getByText("Search by");
    userEvent.click(dropdownToggle);
    const dropdownMenu = screen.getByTestId("dropdown-menu");
    const searchByTitleLink = screen.getByText("Search by title");
    // Act
    userEvent.click(searchByTitleLink);
    // Assert
    expect(dropdownMenu).not.toHaveClass("show");
  });
});
