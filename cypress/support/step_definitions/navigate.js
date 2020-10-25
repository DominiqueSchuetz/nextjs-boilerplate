/// <reference types="cypress" />
import { Then } from 'cypress-cucumber-preprocessor/steps';

Then(`I am redirected to signin page`, () => {
    cy.url('http://127.0.0.1:3000/signin');
});

Then('I am redirected to signup page', () => {
    cy.url('http://127.0.0.1:3000/signup');
});

Then('I am redirected to todos page', () => {
    cy.url('http://127.0.0.1:3000/todos');
});
