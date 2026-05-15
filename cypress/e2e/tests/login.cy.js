/// <reference types="cypress" />

import LoginPage from '../pages/login-page.cy';
import TelaInicialPage from '../pages/tela-inicial-page.cy';

const loginPage = new LoginPage();
const telaInicialPage = new TelaInicialPage();

let mensagem;
let dados;

before(() => {
  cy.fixture('mensagem').then((fixture) => {
    mensagem = fixture;
  });
  cy.fixture('testData').then((fixture) => {
    dados = fixture;
  });
});

describe('Tela Inicial', () => {
  const url = Cypress.config('baseUrl');

  beforeEach(() => {
    cy.visit(url);
    loginPage.bemVindoTexto();
    loginPage.email(Cypress.env('user_email'));
    loginPage.senha(Cypress.env('user_senha'));
    loginPage.entrar();
  });

  it('Deve exibir toast de sucesso ao acessar a tela inicial', () => {
    cy.allure()
      .feature('Tela Inicial')
      .story('Login válido')
      .severity('critical');

    telaInicialPage.validaToastMensagem(mensagem.toastLoginSucesso);
  });

  it('Deve realizar logout com sucesso', () => {
    cy.allure().feature('Tela Inicial').story('Logout').severity('critical');

    telaInicialPage.abreMenuUsuario();
    telaInicialPage.realizaLogout(mensagem.toastLogoutSucesso);
    loginPage.bemVindoTexto();
  });

  it('Deve exibir o logo da aplicação', () => {
    cy.allure()
      .feature('Tela Inicial')
      .story('Logo visível')
      .severity('normal');

    telaInicialPage.abreMenuUsuario();
    telaInicialPage.validaLogoVisivel();
  });

  it('Deve exibir o ícone de notificação desabilitado', () => {
    cy.allure()
      .feature('Tela Inicial')
      .story('Sino desabilitado')
      .severity('normal');

    telaInicialPage.validaSinoVisivel();
  });
});

describe('Login - Validações', () => {
  const url = Cypress.config('baseUrl');

  it('Deve exibir mensagem de erro para e-mail inválido', () => {
    cy.allure()
      .feature('Autenticação')
      .story('Login inválido')
      .severity('critical');

    cy.visit(url);
    loginPage.email(dados.emailInvalido);
    loginPage.senha(dados.senhaInvalida);
    loginPage.mensagemInvalidoEmail(mensagem.emailInvalido);
  });
});
