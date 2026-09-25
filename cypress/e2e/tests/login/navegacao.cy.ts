/// <reference types="cypress" />

import { LoginPage } from '../../../support/pages/LoginPage';

const loginPage = new LoginPage();

describe('Login', () => {
  beforeEach(() => {
    loginPage.visitarPagina();
  });

  describe('Navegação', () => {
    it('Deve navegar para a página de cadastro ao clicar em Cadastre-se', () => {
      cy.allure().feature('Autenticação').story('Navegação').severity('normal');

      loginPage.clicarEmCadastreSe();
      cy.url().should('include', '/register');
    });

    it('Deve navegar para recuperação de senha ao clicar em Esqueci minha senha', () => {
      cy.allure().feature('Autenticação').story('Navegação').severity('normal');

      loginPage.clicarEmEsqueciSenha();
      cy.url().should('include', '/esqueci-senha');
    });
  });
});
