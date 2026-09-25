/// <reference types="cypress" />

import { LoginElements } from '../elements/LoginElements';

const TIMEOUT = 30000;
export class LoginPage {
  visitarPagina(): this {
    cy.visit('/');
    return this;
  }

  verificarPaginaCarregada(): this {
    cy.get(LoginElements.tituloBemVindoText, { timeout: 30000 }).should(
      'be.visible'
    );
    cy.get(LoginElements.emailInput).should('be.visible');
    cy.get(LoginElements.senhaInput).should('be.visible');
    cy.get(LoginElements.entrarButton).should('be.visible');
    cy.get(LoginElements.esqueceuSenhaLink).should('be.visible');
    cy.get(LoginElements.cadastreSeLink).should('be.visible');
    return this;
  }

  preencherEmail(email: string): this {
    cy.get(LoginElements.emailInput).clear().type(email);
    return this;
  }

  preencherSenha(senha: string): this {
    cy.get(LoginElements.senhaInput).clear().type(senha);
    return this;
  }

  clicarEmEntrar(): this {
    cy.get(LoginElements.entrarButton).should('be.visible').click();
    return this;
  }

  verificarBotaoDesabilitado(): this {
    cy.get(LoginElements.entrarButton).should('be.disabled');
    return this;
  }

  verificarBotaoHabilitado(): this {
    cy.get(LoginElements.entrarButton).should('not.be.disabled');
    return this;
  }

  tocarCampoEmailESair(): this {
    cy.get(LoginElements.emailInput).should('be.visible').click();
    cy.get(LoginElements.senhaInput).should('be.visible').click();
    return this;
  }

  tocarCampoSenhaESair(): this {
    cy.get(LoginElements.senhaInput).should('be.visible').click();
    cy.get(LoginElements.emailInput).should('be.visible').click();
    return this;
  }

  verificarErroEmail(mensagem: string): this {
    cy.get(LoginElements.erroMensagem).first().should('contain.text', mensagem);
    return this;
  }

  verificarErroSenha(mensagem: string): this {
    cy.get(LoginElements.erroMensagem).last().should('contain.text', mensagem);
    return this;
  }

  clicarEmEsqueciSenha(): this {
    cy.get(LoginElements.esqueceuSenhaLink).click();
    return this;
  }

  clicarEmCadastreSe(): this {
    cy.get(LoginElements.cadastreSeLink).click();
    return this;
  }

  alternarVisibilidadeSenha(): this {
    cy.get(LoginElements.mostrarSenhaButton).click();
    return this;
  }

  ocultarSenha(): this {
    cy.get(LoginElements.ocultarSenhaButton).click();
    return this;
  }

  verificarSenhaVisivel(): this {
    cy.get(LoginElements.senhaInput).should('have.attr', 'type', 'text');
    return this;
  }

  verificarSenhaOculta(): this {
    cy.get(LoginElements.senhaInput).should('have.attr', 'type', 'password');
    return this;
  }

  verificarToastError(): this {
    cy.get(LoginElements.toastErrorLabel).should('be.visible', {
      timeout: TIMEOUT,
    });
    return this;
  }

  clicarEmEntrarDesativa(): this {
    cy.get(LoginElements.entrarButton).should('be.disabled');
    return this;
  }

  verificarToast(mensagem: string): this {
    cy.get(LoginElements.toast)
      .should('be.visible')
      .and('contain.text', mensagem);
    return this;
  }
}
