/// <reference types="cypress" />

import { LoginPage } from '../../../support/pages/LoginPage';
import { CredenciaisInvalidasData } from '../../../support/types/login/testdata';

let dados: CredenciaisInvalidasData;

const loginPage = new LoginPage();

describe('Login', () => {
  before(() => {
    cy.fixture('login/testdata').then((fixture) => {
      dados = fixture;
    });
  });

  beforeEach(() => {
    loginPage.visitarPagina();
  });

  describe('Autenticação com credenciais inválidas', () => {
    it('Deve exibir toast de erro ao tentar login com credenciais incorretas', () => {
      cy.allure()
        .feature('Autenticação')
        .story('Login inválido')
        .severity('critical');

      loginPage
        .preencherEmail(dados.credenciaisInvalidas.email)
        .preencherSenha(dados.credenciaisInvalidas.senha)
        .clicarEmEntrar();

      loginPage.verificarToastError();
    });

    it('Deve impedir o acesso sem o preenchimento das credenciais', () => {
      cy.allure()
        .feature('Autenticação')
        .story('Sem o preenchimento das credenciais')
        .severity('critical');

      loginPage.clicarEmEntrarDesativa();
    });
  });
});
