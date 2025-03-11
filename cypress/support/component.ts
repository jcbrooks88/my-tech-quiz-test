import "./commands.ts.EXAMPLE";
import { mount } from "cypress/react";

// Extend Cypress Chainable interface to include mount
declare global {
  namespace Cypress {
	interface Chainable {
	  mount: typeof mount;
	}
  }
}

// Make mount available globally for React components
Cypress.Commands.add("mount", mount);
