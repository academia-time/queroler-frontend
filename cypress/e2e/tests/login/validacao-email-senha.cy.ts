/// <reference types="cypress" />

import { LoginPage } from '../../../support/pages/LoginPage';
import { ValidacaoEmailSenhaData } from '../../../support/types/login/testdata';
import { ValidacaoEmailSenhaMsg } from '../../../support/types/login/mensagem';

let msg: ValidacaoEmailSenhaMsg;
let dados: ValidacaoEmailSenhaData;

const loginPage = new LoginPage();

describe('Login', () => {
  before(() => {
    cy.fixture('login/mensagem').then((fixture) => {
      msg = fixture;
    });
    cy.fixture('login/testdata').then((fixture) => {
      dados = fixture;
    });
  });

  beforeEach(() => {
    loginPage.visitarPagina();
  });

  describe('Validações do campo de e-mail', () => {
    it('Deve exibir erro ao deixar o campo de e-mail em branco e sair', () => {
      cy.allure()
        .feature('Autenticação')
        .story('Validação de e-mail')
        .severity('critical');

      loginPage.tocarCampoEmailESair();
      loginPage.verificarErroEmail(msg.campoLogin.emailObrigatorio);
    });

    it('Deve exibir erro para e-mail com formato inválido', () => {
      cy.allure()
        .feature('Autenticação')
        .story('Validação de e-mail')
        .severity('critical');

      loginPage
        .preencherEmail(dados.campoInvalido.emailInvalido)
        .tocarCampoSenhaESair()
        .verificarErroEmail(msg.campoLogin.emailInvalido);
    });

    it('Deve exibir erro para e-mail sem arroba', () => {
      cy.allure()
        .feature('Autenticação')
        .story('Validação de e-mail')
        .severity('critical');

      loginPage
        .preencherEmail(dados.campoInvalido.emailSemArroba)
        .tocarCampoSenhaESair()
        .verificarErroEmail(msg.campoLogin.emailInvalido);
    });
  });

  describe('Validações do campo de senha', () => {
    it('Deve exibir erro ao deixar o campo de senha em branco e sair', () => {
      cy.allure()
        .feature('Autenticação')
        .story('Validação de senha')
        .severity('critical');

      loginPage.tocarCampoSenhaESair();
      loginPage.verificarErroSenha(msg.campoLogin.senhaMinimaObrigatoria);
    });

    it('Deve exibir erro para senha com menos de 8 caracteres', () => {
      cy.allure()
        .feature('Autenticação')
        .story('Validação de senha')
        .severity('critical');

      loginPage
        .preencherSenha(dados.campoInvalido.senhaCurta)
        .tocarCampoEmailESair()
        .verificarErroSenha(msg.campoLogin.senhaMuitoCurta);
    });

    it('Deve habilitar o botão Entrar somente com e-mail e senha válidos', () => {
      cy.allure()
        .feature('Autenticação')
        .story('Validação de senha')
        .severity('critical');

      loginPage
        .verificarBotaoDesabilitado()
        .preencherEmail('usuario.valido@teste.com')
        .preencherSenha('senha1234')
        .verificarBotaoHabilitado();
    });
  });

  describe('Visibilidade da senha', () => {
    it('Deve exibir a senha em texto ao clicar no ícone de mostrar senha', () => {
      cy.allure()
        .feature('Autenticação')
        .story('Toggle de senha')
        .severity('normal');

      loginPage
        .preencherSenha('minhasenha')
        .verificarSenhaOculta()
        .alternarVisibilidadeSenha()
        .verificarSenhaVisivel();
    });

    it('Deve ocultar a senha ao clicar novamente no ícone', () => {
      cy.allure()
        .feature('Autenticação')
        .story('Toggle de senha')
        .severity('normal');

      loginPage
        .preencherSenha('minhasenha')
        .alternarVisibilidadeSenha()
        .verificarSenhaVisivel()
        .ocultarSenha()
        .verificarSenhaOculta();
    });
  });
});
