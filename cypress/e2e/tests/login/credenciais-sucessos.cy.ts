/// <reference types="cypress" />

import { LoginPage } from '../../../support/pages/LoginPage';
import { CredenciaisSucessosData } from '../../../support/types/login/testdata';
import { ToastMensagem } from '../../../support/types/login/mensagem';

let dados: CredenciaisSucessosData;
let msg: ToastMensagem;

const loginPage = new LoginPage();

describe('Login', () => {
  before(() => {
    cy.fixture('perfil').then((fixture) => {
      dados = fixture;
    });
    cy.fixture('login/mensagem').then((fixture) => {
      msg = fixture;
    });
  });

  beforeEach(() => {
    loginPage.visitarPagina();
  });

  describe('Autenticação com credenciais', () => {
    it('Deve exibir toast de sucesso login com credenciais', () => {
      cy.allure()
        .feature('Autenticação')
        .story('Login sucesso')
        .severity('critical');

      loginPage
        .preencherEmail(dados.perfilLeitor.email)
        .preencherSenha(dados.perfilLeitor.senha)
        .clicarEmEntrar();

      loginPage.verificarToast(msg.mensagemToast.toastLoginSucesso);
    });
  });
});
