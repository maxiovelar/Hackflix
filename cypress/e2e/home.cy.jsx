/// <reference types="cypress" />

describe("Homepage test cases", () => {
  it("should visit homepage", () => {
    cy.visit("http://localhost:3000");
  });
});
