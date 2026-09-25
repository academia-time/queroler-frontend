/// <reference types="cypress" />

import { LoginPage } from '../../../support/pages/LoginPage';
import {
  CredenciaisInvalidasData,
  CredenciaisSucessosData,
} from '../../../support/types/login/testdata';

let dados: CredenciaisInvalidasData;
let dadosPerfil: CredenciaisSucessosData;

const loginPage = new LoginPage();

describe('Login', () => {
  before(() => {
    cy.fixture('login/testdata').then((fixture) => {
      dados = fixture;
    });
    cy.fixture('perfil').then((fixture) => {
      dadosPerfil = fixture;
    });
  });

  beforeEach(() => {
    loginPage.visitarPagina();
  });

  describe('Login com perfil administrador e moderador', () => {
    beforeEach(() => {
      cy.allure()
        .feature('Login com perfil administrador')
        .story(
          'E1_HU01 - Disponibilizar acesso aos usuários com perfil administrador e moderador'
        )
        .severity('critical');
    });

    it('Deve fazer login com a conta administrador pré-cadastrada', () => {
      loginPage
        .preencherEmail(dadosPerfil.perfilAdministrador.email)
        .preencherSenha(dadosPerfil.perfilAdministrador.senha)
        .clicarEmEntrar();
    });

    it('Não deve fazer login com a conta administrador se a senha for incorreta', () => {
      loginPage
        .preencherEmail(dadosPerfil.perfilAdministrador.email)
        .preencherSenha(dados.credenciaisInvalidas.senha)
        .clicarEmEntrar();
    });

    it('Deve fazer login com a conta moderador pré-cadastrada', () => {
      loginPage
        .preencherEmail(dadosPerfil.perfilModerador.email)
        .preencherSenha(dadosPerfil.perfilModerador.senha)
        .clicarEmEntrar();
    });

    it('Não deve fazer login com a conta moderador se a senha for incorreta', () => {
      loginPage
        .preencherEmail(dadosPerfil.perfilModerador.email)
        .preencherSenha(dados.credenciaisInvalidas.senha)
        .clicarEmEntrar();
    });

    it('Não deve fazer login com email inexistente e senha correta', () => {
      loginPage
        .preencherEmail(dados.credenciaisInvalidas.email)
        .preencherSenha(dadosPerfil.perfilAdministrador.senha)
        .clicarEmEntrar();
    });

    it('Não deve fazer login sem email e senha preenchidos', () => {
      loginPage.verificarBotaoDesabilitado();
    });
  });
});
