/// <reference types="cypress" />

import { DetalhamentoElements } from '../elements/DetalhamentoElements';

const TIMEOUT = 30000;

export class DetalhamentoPage {
  selecionarLivroNoHome(): this {
    cy.get(DetalhamentoElements.selecionaLivroButton, { timeout: TIMEOUT })
      .should('have.length.at.least', 1)
      .first()
      .scrollIntoView()
      .should('be.visible')
      // wait necessário: o layout renderiza antes do React finalizar a hidratação
      // e vincular o onClick real, então o elemento aparece "pronto" mas ainda não responde a cliques
      .wait(400)
      .click();
    return this;
  }

  verificarSeJaEstaNaPaginaDeDetalhamento(): this {
    cy.url().should('include', '/detalhamento');
    return this;
  }

  verificarPaginaCarregada(): this {
    cy.get(DetalhamentoElements.tituloDoLivroText, { timeout: TIMEOUT }).should(
      'be.visible'
    );
    cy.get(DetalhamentoElements.autorDoLivroText).should('be.visible');
    cy.get(DetalhamentoElements.informacoesLivroText).should('be.visible');
    cy.get(DetalhamentoElements.secaoDetalhesLivro).should('be.visible');
    return this;
  }

  verificarInfomacoesDoLivro(): this {
    cy.get(DetalhamentoElements.informacoesLivroText).then(($elemento) => {
      const texto = $elemento.text();
      cy.get(DetalhamentoElements.informacoesLivroText).should(
        'contain.text',
        texto
      );
    });
    return this;
  }

  verificarSecoesDoDetalhamento(textos: string[]): this {
    const secoes = [
      DetalhamentoElements.secaoDetalhesLivro,
      DetalhamentoElements.secaoDetalhesLivro,
      DetalhamentoElements.secaoDetalhesLivro,
    ];

    textos.forEach((texto, index) => {
      const elementoAlvo = secoes[index];
      cy.get(elementoAlvo).contains(texto).should('be.visible');
    });

    return this;
  }
}
