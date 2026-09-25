/// <reference types="cypress" />

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { LoginElements } from './elements/LoginElements';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<void>;
      logout(): Chainable<void>;
      pressionarTab(): Chainable<void>;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

Cypress.Commands.add(
  'login',
  (
    email: string = Cypress.env('user_email') as string,
    password: string = Cypress.env('user_senha') as string
  ) => {
    if (!email || !password) {
      throw new Error(
        'cy.login() requer credenciais. Crie o arquivo cypress.env.json baseado em cypress.env.json.example com user_email e user_senha.'
      );
    }
    cy.visit('/');
    cy.get(LoginElements.emailInput).type(email);
    cy.get(LoginElements.senhaInput).type(password);
    cy.get(LoginElements.entrarButton).click();
  }
);

Cypress.Commands.add('logout', () => {
  cy.get('.Toastify__close-button').should('be.visible').click();
  cy.get('[data-testid="user-menu-trigger"]', { timeout: 10000 })
    .should('be.visible')
    .click({ force: true });
  cy.get('[data-testid="logout-button"]').should('be.visible').click();
});

Cypress.Commands.add('pressionarTab', () => {
  cy.press(Cypress.Keyboard.Keys.TAB);
});
