import { Then } from 'cypress-cucumber-preprocessor/steps';

Then(`I see {string} in the title`, (title) => {
    cy.title().should('include', title);
});

Then(`I see {string} in {string} with a {string}`, (content, target, attribute) => {
    cy.get(target).should('have.attr', attribute).and('include', content);
});
