// Create unit tests with jest
// Create unit test for Layout component with react-testing-library

const { render, screen } = require("@testing-library/react");
const { Footer } = require("./Footer");

describe("Footer test cases", () => {
  it("should render the footer", () => {
    // Act
    render(<Footer />);
    // Assert
    const footer = screen.getByTestId("footer");
    // Assert
    expect(footer).toBeInTheDocument();
  });
  it("should render the footer image", () => {
    // Arrange
    const altText = "the movie db logo";
    // Act
    render(<Footer />);
    const footerImage = screen.getByAltText(altText);
    // Assert
    expect(footerImage).toBeInTheDocument();
    expect(footerImage).toHaveAttribute("src", "tmdb-logo.svg");
  });

  it("should show the current year", () => {
    // Arrange
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(2022, 6, 11));
    const currentDate = new Date();
    const currentYear = String(currentDate.getFullYear());
    // Act
    render(<Footer />);
    const copyrightText = screen.getByText(/copyright/i);
    // Assert
    expect(currentYear).toBe("2022");
    expect(copyrightText).toHaveTextContent(currentYear);
  });
});
