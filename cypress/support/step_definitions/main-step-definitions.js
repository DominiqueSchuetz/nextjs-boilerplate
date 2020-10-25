/// <reference types="cypress" />
import { Then, Before } from 'cypress-cucumber-preprocessor/steps';
import { caseInsensitive } from '../helpers';
const url = 'http://127.0.0.1:3000/todos';

Before(() => {
    cy.visit(url);
    console.log('im running');
});

Then(`I see {string} in the title`, (title) => {
    cy.title().should('include', title);
});

Then(`I see {string} in {string} with a {string}`, (content, target, attribute) => {
    cy.get(target).should('have.attr', attribute).and('include', content);
});

When(`Click Button {string}`, (buttonName) => {
    cy.contains(buttonName, { matchCase: false }).then((e) => {
        expect(e.text()).match(caseInsensitive(buttonName));
    });

    cy.get("[data-testid='button']").contains(buttonName, { matchCase: false }).click();
});

Then(`Button {string} is disabled`, () => {
    cy.get('button').should('have.attr', 'disabled');
});

When(`Enter {string} in input field with label {string}`, (inputValue, labelName) => {
    cy.get(`[data-testid='${labelName}'] input`, { matchCase: false }).first().type(inputValue);
});

Then(`Press Tab key`, () => {
    cy.focused().tab();
});

Then(`Clear input field with label {string}`, (labelName) => {
    cy.get(`[data-testid='${labelName}'] input`, { matchCase: false }).clear();
});

Then(`No error message is displayed`, () => {
    cy.get('div').should('not.have.class', 'Mui-error');
    cy.contains('error', { matchCase: false }).should('not.be.visible');
});

Then(`Toast responds with text {string}`, (messageText) => {
    cy.get('.Toastify')
        .find('.Toastify__toast-body')
        .invoke('text')
        .then((text) => {
            expect(text.trim()).equal(messageText);
        });
});

Then(`Click on Toast`, () => {
    cy.get('.Toastify')
        .find('.Toastify__toast-body')
        .click()
        .then(() => {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setInterval(() => {}, 3000);
        });
});

Then(`No Toast is visible`, () => {
    cy.get('div').should('not.have.class', 'Toastify__toast-body');
});

Then(`Click link {string}`, (linkText) => {
    cy.get('a').contains(linkText, { matchCase: false }).click();
});

after(() => {
    // TODO
    // Sign out
});
