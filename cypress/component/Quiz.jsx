import { mount } from 'cypress/react'; // Import the mount function for component testing
import Quiz from '../../client/src/components/Quiz'; // Adjust path based on your project structure
import React from 'react';

describe('Quiz Component', () => {
  beforeEach(() => {
    // Intercept API call to return a mock response
    cy.intercept('GET', '/api/questions/random', {
      fixture: 'questions.json' // Ensure you have this file in cypress/fixtures
    }).as('getQuestions');

    // Mount the Quiz component
    mount(<Quiz />);
  });

  it('should display the final score when the quiz is completed', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
  
    // Answer all questions
    cy.get('[data-cy="answer-option"]').each(($button, index, $list) => {
      if (index < $list.length - 1) {
        cy.wrap($button).click();
      }
    });
  
    // Ensure the quiz completion message appears
    cy.contains('Quiz Completed').should('be.visible');
  
    // Check if the final score is displayed
    cy.contains('Your score:').should('exist');
  });
  
  it('should allow starting a new quiz after completion', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
  
    // Answer all questions to complete the quiz
    cy.get('[data-cy="answer-option"]').each(($button, index, $list) => {
      if (index < $list.length - 1) {
        cy.wrap($button).click();
      }
    });
  
    // Ensure the quiz completion message appears
    cy.contains('Quiz Completed').should('be.visible');
  
    // Click to restart the quiz
    cy.contains('Take New Quiz').click();
  
    // Ensure a new quiz starts by checking if the first question appears
    cy.get('h2').should('be.visible');
  });
  
});
