// This file runs before each E2E test
import "./commands.ts.EXAMPLE"; // Import custom commands (if needed)

// Cypress automatically preserves session across tests
Cypress.on("uncaught:exception", (err, _runnable) => {
  console.warn("Ignoring uncaught exception: ", err.message);
  return false;
});
