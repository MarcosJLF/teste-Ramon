const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // Path to test files
    baseUrl: "http://localhost:8000", // Your app's URL, if applicable
  },
});