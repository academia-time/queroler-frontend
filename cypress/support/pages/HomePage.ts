/// <reference types="cypress" />

import { HomeElements } from '../elements/HomeElements';

const TIMEOUT = 30000;
export class HomePage {
  verificarPaginaCarregada(): this {
    cy.get(HomeElements.logoQueroLer, { timeout: TIMEOUT }).should(
      'be.visible'
    );
    return this;
  }

  fecharToast(): this {
    cy.get(HomeElements.fechaToastButton).should('be.visible').click();
    return this;
  }

  verificarToast(mensagem: string): this {
    cy.get(HomeElements.toast)
      .should('be.visible')
      .and('contain.text', mensagem);
    return this;
  }

  abrirMenuUsuario(): this {
    cy.get(HomeElements.menuUsuarioTriggerButton, { timeout: TIMEOUT })
      .should('be.visible')
      .click({ force: true });
    return this;
  }

  clicarEmMeuPerfil(): this {
    cy.get(HomeElements.meuPerfilButton)
      .should('be.visible', { timeout: TIMEOUT })
      .click({ force: true });
    return this;
  }

  clicarEmSair(): this {
    cy.get(HomeElements.logoutButton).should('be.visible').click();
    return this;
  }

  verificarLogoVisivel(): this {
    cy.get(HomeElements.logoQueroLer).should('be.visible');
    return this;
  }

  verificarSinoVisivel(): this {
    cy.get(HomeElements.sinoIconButton).should('be.visible');
    return this;
  }

  verificarFotoDoUsuarioVisivel(): this {
    cy.get(HomeElements.fotoDoUsuarioIcon).should('be.visible');
    return this;
  }

  verificarNomeDoUsuarioVisivel(nome: string): this {
    cy.get(HomeElements.nomeDoUsuarioText)
      .should('be.visible')
      .and('contain.text', nome);
    return this;
  }

  pesquisar(texto: string | undefined): this {
    cy.get(HomeElements.barraDePesquisa)
      .should('be.visible')
      .type(texto || '');
    return this;
  }
  pesquisaPorAutor(): this {
    cy.get(HomeElements.pesquisaCombobox).should('be.visible').click();
    cy.get(HomeElements.caixaPesquisaCombobox)
      .should('be.visible')
      .find('button')
      .contains('Autor')
      .click();
    return this;
  }
  verificarQuantidadeExataDeLivros(quantidade: number): this {
    cy.get(HomeElements.livrosPesquisados)
      .should('be.visible')
      .should('have.length', quantidade);
    return this;
  }

  verificarQuantidadeDeLivrosMenorQue(quantidade: number): this {
    cy.get(HomeElements.livrosPesquisados)
      .should('be.visible')
      .should('have.length.lessThan', quantidade);
    return this;
  }

  verificarQuantidadeDeLivrosMaiorQue(quantidade: number): this {
    cy.get(HomeElements.livrosPesquisados)
      .should('be.visible')
      .should('have.length.greaterThan', quantidade);
    return this;
  }

  selecionarBotaoVerTodosOsResultados(): this {
    cy.get(HomeElements.botaoVerTodosOsResultados)
      .should('be.visible', { timeout: TIMEOUT })
      .click();
    return this;
  }

  selecionarBotaoPaginacao(numero: string): this {
    cy.get(HomeElements.botaoPaginacao)
      .should('be.visible')
      .find('button')
      .contains(numero)
      .click();
    return this;
  }

  verificarOrdemDecrescenteDosLivros(tituloDoLivro: string | undefined): this {
    cy.get(HomeElements.ate5LivrosPesquisados)
      .contains(tituloDoLivro || '')
      .first();
    return this;
  }

  pesquisarEVerificarBotaoVerTodosOsResultados(texto: string): this {
    this.pesquisaPorAutor();
    this.pesquisar(texto);
    this.selecionarBotaoVerTodosOsResultados();
    return this;
  }

  contarMaisDe5LivrosDeAutor(texto: string): this {
    this.pesquisarEVerificarBotaoVerTodosOsResultados(texto);
    this.verificarQuantidadeDeLivrosMaiorQue(5);
    return this;
  }
  contar15LivrosDeAutor(texto: string): this {
    this.pesquisarEVerificarBotaoVerTodosOsResultados(texto);
    this.verificarQuantidadeExataDeLivros(15);
    return this;
  }
  contarMaisDe15LivrosDeAutor(texto: string): this {
    this.contar15LivrosDeAutor(texto);
    this.selecionarBotaoPaginacao('2');
    this.verificarQuantidadeDeLivrosMaiorQue(0);
    return this;
  }
  verificarOrdemDecrescenteDosLivrosPorAutor(
    autor: string,
    titulo: string
  ): this {
    this.pesquisaPorAutor();
    this.pesquisar(autor);
    this.verificarOrdemDecrescenteDosLivros(titulo);
    return this;
  }

  abrirPerfil() {
    this.abrirMenuUsuario().fecharToast().clicarEmMeuPerfil();
  }
}
