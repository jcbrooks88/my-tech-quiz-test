import React from "react";
import Quiz from "../../client/src/components/Quiz";
import { mount } from "cypress/react";

describe("Quiz Component", () => {
  it("renders correctly", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").should("exist");
  });

  it("displays the first question after starting", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").click();
    cy.get(".question-text").should("be.visible");
  });
});
