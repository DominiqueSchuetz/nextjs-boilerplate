/// <reference types="cypress" />
import { Then } from 'cypress-cucumber-preprocessor/steps';

Then(`Error Message {string} is visible`, (errorMessage) => {
    cy.contains(errorMessage, { matchCase: false }).and('be.visible');
});
