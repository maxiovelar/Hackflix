// Create unit test for Layout component with jest
// Create unit test for Layout component with react-testing-library

import React from "react";

import { render, screen } from "@testing-library/react";
import Layout from "./Layout";
import { MemoryRouter } from "react-router-dom";
import { useIsOnline } from "../../hooks/useIsOnline";

jest.mock("../../hooks/useIsOnline");

describe("Layout component test cases", () => {
  const renderLayout = (children = null) => {
    return render(
      <MemoryRouter>
        <Layout>{children}</Layout>
      </MemoryRouter>
    );
  };

  it("should render without children", () => {
    // Act
    renderLayout();
    // Assert
    expect(screen.getByTestId("layout")).toBeInTheDocument();
  });

  it("should render with children", () => {
    // Act
    renderLayout(<div>Hello World</div>);
    // Assert
    expect(screen.getByTestId("layout")).toBeInTheDocument();
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("should render with online status", () => {
    // Arrange
    useIsOnline.mockImplementation(() => true);
    // Act
    renderLayout();
    // Assert
    expect(useIsOnline).toHaveBeenCalled();
    expect(screen.getByTestId("online")).toBeInTheDocument();
    expect(screen.getByTestId("layout")).toBeInTheDocument();
  });

  it("should render with offline status", () => {
    // Arrange
    useIsOnline.mockImplementation(() => false);
    // Act
    renderLayout();
    // Assert
    expect(useIsOnline).toHaveBeenCalled();
    expect(screen.getByTestId("offline")).toBeInTheDocument();
    expect(screen.getByTestId("layout")).toBeInTheDocument();
  });

  it("should render with undefined children", () => {
    // Act
    renderLayout(undefined);
    // Assert
    expect(screen.getByTestId("layout")).toBeInTheDocument();
  });
});
