/// <reference types="cypress" />

import { LoginPage } from '../../../support/pages/LoginPage';
import { HomePage } from '../../../support/pages/HomePage';
import { HomeData } from '../../../support/types/home/testdata';
import { HomeMensagem } from '../../../support/types/home/mensagem';

let msg: HomeMensagem;
let dados: HomeData;

const loginPage = new LoginPage();
const homePage = new HomePage();

describe('Tela Inicial', () => {
  before(() => {
    cy.fixture('home/mensagem').then((fixture) => {
      msg = fixture;
    });
    cy.fixture('home/testdata').then((fixture) => {
      dados = fixture;
    });
  });

  beforeEach(() => {
    cy.login();
  });

  it('Deve exibir toast de sucesso após login realizado com sucesso', () => {
    cy.allure()
      .feature('Tela Inicial')
      .story('Login válido')
      .severity('critical');

    homePage.verificarToast(msg.mensagemToast.toastLoginSucesso);
  });

  it('Deve exibir o logo da aplicação', () => {
    cy.allure()
      .feature('Tela Inicial')
      .story('Logo visível')
      .severity('normal');

    homePage.fecharToast().verificarLogoVisivel();
  });

  it('Deve exibir o ícone de notificação', () => {
    cy.allure()
      .feature('Tela Inicial')
      .story('Sino visível')
      .severity('normal');

    homePage.fecharToast().verificarSinoVisivel();
  });

  it('Deve realizar logout com sucesso e retornar à tela de login', () => {
    cy.allure().feature('Tela Inicial').story('Logout').severity('critical');

    homePage
      .fecharToast()
      .abrirMenuUsuario()
      .clicarEmSair()
      .verificarToast(msg.mensagemToast.toastLogoutSucesso);

    loginPage.verificarPaginaCarregada();
  });

  it('Deve validar tela inicial e realizar logout com sucesso', () => {
    cy.allure()
      .feature('Tela Inicial')
      .story('Acesso com autenticação')
      .severity('critical');

    homePage
      .fecharToast()
      .verificarPaginaCarregada()
      .verificarSinoVisivel()
      .verificarFotoDoUsuarioVisivel()
      .verificarNomeDoUsuarioVisivel(dados.usuarioCadastrado.nomeUsuario)
      .abrirMenuUsuario()
      .clicarEmSair()
      .verificarToast(msg.mensagemToast.toastLogoutSucesso);

    loginPage.verificarPaginaCarregada();
  });
});
