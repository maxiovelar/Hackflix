// Create unit test for Layout component with jest
// Create unit test for Layout component with react-testing-library

import React from "react";

import { render, screen } from "@testing-library/react";
import Layout from "./Layout";
import { MemoryRouter } from "react-router-dom";
import { useIsOnline } from "../../hooks/useIsOnline";

jest.mock("../../hooks/useIsOnline");

describe("Layout component test cases", () => {
  it("should render without crashing", () => {
    // Act
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    // Assert
    expect(screen.getByTestId("layout")).toBeInTheDocument();
  });

  it("should render with children", () => {
    // Arrange
    const children = <div>Hello World</div>;
    // Act
    render(
      <MemoryRouter>
        <Layout>{children}</Layout>
      </MemoryRouter>
    );
    // Assert
    expect(screen.getByTestId("layout")).toBeInTheDocument();
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("should render with online status", () => {
    // Arrange
    useIsOnline.mockImplementation(() => true);
    // Act
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    // Assert
    expect(useIsOnline).toHaveBeenCalled();
    expect(screen.getByTestId("online")).toBeInTheDocument();
    expect(screen.getByTestId("layout")).toBeInTheDocument();
  });

  it("should render with offline status", () => {
    // Arrange
    useIsOnline.mockImplementation(() => false);
    // Act
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    // Assert
    expect(useIsOnline).toHaveBeenCalled();
    expect(screen.getByTestId("offline")).toBeInTheDocument();
    expect(screen.getByTestId("layout")).toBeInTheDocument();
  });

  it("should render with null children", () => {
    // Arrange
    const children = null;
    // Act
    render(
      <MemoryRouter>
        <Layout>{children}</Layout>
      </MemoryRouter>
    );
    // Assert
    expect(screen.getByTestId("layout")).toBeInTheDocument();
  });

  it("should render with undefined children", () => {
    // Arrange
    const children = undefined;
    // Act
    render(
      <MemoryRouter>
        <Layout>{children}</Layout>
      </MemoryRouter>
    );
    // Assert
    expect(screen.getByTestId("layout")).toBeInTheDocument();
  });
});
