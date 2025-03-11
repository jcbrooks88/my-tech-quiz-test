describe("Tech Quiz App", () => {
    beforeEach(() => {
      cy.intercept("GET", "/api/questions/random", { fixture: "questions.json" }).as("getQuestions");
      cy.visit("http://localhost:3001");
    });
  
    it("Starts the quiz when the Start Quiz button is clicked", () => {
      cy.contains("Start Quiz").should("be.visible"); // Ensure the button is on screen
      cy.get('[data-cy="start-quiz"]').click(); // Click the start button
      cy.wait("@getQuestions"); // Wait for mock API response
  
      cy.get("h2").should("be.visible"); // A question should appear
    });
  
    it("Displays quiz questions and answers", () => {
      cy.get('[data-cy="start-quiz"]').click();
      cy.wait("@getQuestions");
  
      cy.get("h2").should("not.be.empty"); // Ensure a question is displayed
      cy.get('[data-cy="answer-option"]').should("have.length", 3); // Expect three answer options
    });
  
    it("Advances to the next question when an answer is clicked", () => {
      cy.get('[data-cy="start-quiz"]').click();
      cy.wait("@getQuestions");
  
      cy.get("h2").invoke("text").then((firstQuestion) => {
        cy.get('[data-cy="answer-option"]').eq(2).click(); // Click an answer
        cy.get("h2").should("not.have.text", firstQuestion); // Ensure question changes
      });
    });

    });