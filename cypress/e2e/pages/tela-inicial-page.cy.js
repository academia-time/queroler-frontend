/// <reference types="cypress" />

import TelaInicialElemento from '../elements/tela-inicial-elemento.cy';

const telaInicialElemento = new TelaInicialElemento();

class TelaInicialPage {
  abreMenuUsuario() {
    cy.get(telaInicialElemento.menuUsuarioBotao(), { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });
  }

  realizaLogout(mensagem) {
    cy.get(telaInicialElemento.fechaToastBotao()).should('be.visible').click();
    cy.get(telaInicialElemento.sairBotao()).should('be.visible').click();
    cy.get(telaInicialElemento.toastNotificacao())
      .should('be.visible')
      .contains(mensagem);
  }

  validaToastMensagem(mensagem) {
    cy.get(telaInicialElemento.toastNotificacao())
      .should('be.visible')
      .contains(mensagem);
  }

  validaLogoVisivel() {
    cy.get(telaInicialElemento.logoQueroLerImagem()).should('be.visible');
  }

  validaSinoVisivel() {
    cy.get(telaInicialElemento.fechaToastBotao()).should('be.visible').click();
    cy.get(telaInicialElemento.notificacaoSinoBotao()).should('be.visible');
  }
}

export default TelaInicialPage;
