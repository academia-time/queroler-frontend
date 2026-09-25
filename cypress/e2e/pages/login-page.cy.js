/// <reference types="cypress" />

import LoginElemento from '../elements/login-elemento.cy';

const loginElemento = new LoginElemento();

class LoginPage {
  bemVindoTexto() {
    cy.get(loginElemento.bemVindoTexto()).should('be.visible');
  }

  email(email) {
    cy.get(loginElemento.emailCampo())
      .should('be.visible')
      .type(email)
      .should('have.value', email);
  }

  senha(senha) {
    cy.get(loginElemento.senhaCampo()).should('be.visible').type(senha);
  }

  entrar() {
    cy.get(loginElemento.entrarBotao()).should('be.visible').click();
  }

  mensagemInvalidoEmail(mensagem) {
    cy.get(loginElemento.erroMensagem()).contains(mensagem);
  }

  cadastreSe() {
    cy.get(loginElemento.cadastreSeLink()).should('be.visible').click();
  }
}

export default LoginPage;
