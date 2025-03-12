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

  it('should start the quiz when the Start Quiz button is clicked', () => {
    // Start quiz by clicking the button
    cy.contains('Start Quiz').click();
    
    // Wait for the questions to be fetched
    cy.wait('@getQuestions').then((interception) => {
      // Log interception to see the response
      console.log(interception);
    });
    
    // Ensure the first question is displayed
    cy.get('.card h2').should('be.visible');
  });

  it('should allow answering questions and completing the quiz', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    
    // Answer all questions in the quiz
    cy.get('.btn-primary').each(($button, index, $list) => {
      if (index < $list.length - 1) {
        cy.wrap($button).click();
      }
    });
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

  it('should allow restarting the quiz', () => {
    // Start the quiz
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
  
    // Answer the first question
    cy.get('.btn-primary').first().click();
  
    // Ensure the quiz is still active (not completed)
    cy.contains('Quiz Completed').should('not.exist');
  
  });  
  
});
