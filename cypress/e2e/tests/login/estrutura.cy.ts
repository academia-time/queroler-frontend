/// <reference types="cypress" />

import { LoginPage } from '../../../support/pages/LoginPage';

const loginPage = new LoginPage();

describe('Login', () => {
  beforeEach(() => {
    loginPage.visitarPagina();
  });

  describe('Estrutura da tela', () => {
    it('Deve exibir todos os elementos do formulário de login', () => {
      cy.allure().feature('Autenticação').story('Estrutura').severity('normal');

      loginPage.verificarPaginaCarregada();
    });

    it('Deve exibir o botão Entrar desabilitado com campos vazios', () => {
      cy.allure().feature('Autenticação').story('Estrutura').severity('normal');

      loginPage.verificarBotaoDesabilitado();
    });
  });
});
