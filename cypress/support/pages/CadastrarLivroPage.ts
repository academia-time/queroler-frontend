/// <reference types="cypress" />

import { CadastrarLivroElements } from '../elements/CadastrarLivroElements';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { Fixtures } from '../utils/fixtures';
import { DadosLivro, GeradorDadosLivro } from '../utils/geradorDadosLivro';
import { ResultadosPesquisaLivrosMsg } from '../types/pesquisa/mensagem';

const TIMEOUT = 30000;
export class CadastrarLivroPage {
  private dadosLivro!: DadosLivro;

  acessarPaginaCadastrarLivro(texto: string): this {
    cy.get(CadastrarLivroElements.buscarLivroInput)
      .should('be.visible')
      .type(texto);
    cy.get(CadastrarLivroElements.modalSimButton).should('be.visible').click();
    return this;
  }

  verificarPaginaCarregada(): this {
    const elementos = [
      CadastrarLivroElements.logoQueroler,
      CadastrarLivroElements.tituloIncrementeANossaBibliotecaText,
      CadastrarLivroElements.subtituloCadastreUmLivroText,
      CadastrarLivroElements.isbnInput,
      CadastrarLivroElements.tituloDoLivroInput,
      CadastrarLivroElements.autorInput,
      CadastrarLivroElements.editoraInput,
      CadastrarLivroElements.anoDePublicacaoInput,
      CadastrarLivroElements.numeroDePaginasInput,
      CadastrarLivroElements.idiomaComboBox,
      CadastrarLivroElements.sinopseInput,
      CadastrarLivroElements.textoSecundarioLabel,
      CadastrarLivroElements.cadastrarLivroButton,
      CadastrarLivroElements.cancelarCadastroButton,
    ];

    elementos.forEach((elemento) => {
      cy.get(elemento).should('be.visible');
    });

    return this;
  }

  private selecionarIdiomaAleatorio(): void {
    cy.get(CadastrarLivroElements.idiomaComboBox)
      .find('option')
      .then((options) => {
        const valores = [...options]
          .map((o) => o.value)
          .filter((v) => v !== '');
        const idiomaAleatorio = faker.helpers.arrayElement(valores);
        cy.get(CadastrarLivroElements.idiomaComboBox).select(idiomaAleatorio);
      });
  }

  fecharToast(): this {
    cy.get(CadastrarLivroElements.fechaToastButton)
      .should('be.visible')
      .eq(0)
      .click();
    return this;
  }

  verificarToastErro(msg: string): this {
    cy.get(CadastrarLivroElements.mensagemErrorToastLabel)
      .should('be.visible')
      .and('contain.text', msg);
    return this;
  }

  verificarToastSucesso(msg: string): this {
    cy.get(CadastrarLivroElements.mensagemSucessoToastLabel)
      .should('be.visible', { timeout: TIMEOUT })
      .and('contain.text', msg);
    return this;
  }

  preencherFormularioObrigatorio(
    msg: string,
    dadosCustomizados: DadosLivro = {}
  ): this {
    this.dadosLivro = GeradorDadosLivro.criar(dadosCustomizados);

    if (this.dadosLivro.isbn) {
      cy.get(CadastrarLivroElements.isbnInput)
        .should('be.visible')
        .type(this.dadosLivro.isbn);
      this.fecharToast();
      cy.pressionarTab();
      this.verificarToastErro(msg);
    }
    if (this.dadosLivro.titulo) {
      cy.get(CadastrarLivroElements.tituloDoLivroInput)
        .should('be.visible')
        .type(this.dadosLivro.titulo);
    }
    if (this.dadosLivro.autor) {
      cy.get(CadastrarLivroElements.autorInput)
        .should('be.visible')
        .type(this.dadosLivro.autor);
    }
    if (this.dadosLivro.editora) {
      cy.get(CadastrarLivroElements.editoraInput)
        .should('be.visible')
        .type(this.dadosLivro.editora);
    }
    if (this.dadosLivro.ano) {
      cy.get(CadastrarLivroElements.anoDePublicacaoInput)
        .should('be.visible')
        .type(this.dadosLivro.ano);
    }
    if (this.dadosLivro.paginas) {
      cy.get(CadastrarLivroElements.numeroDePaginasInput)
        .should('be.visible')
        .type(this.dadosLivro.paginas);
    }
    if (this.dadosLivro.sinopse) {
      this.selecionarIdiomaAleatorio();
      cy.get(CadastrarLivroElements.sinopseInput)
        .should('be.visible')
        .type(this.dadosLivro.sinopse);
    }

    return this;
  }

  getIsbnCadastrado(): string {
    if (!this.dadosLivro.isbn) {
      throw new Error(
        'ISBN não foi gerado ainda. Chame preencherFormularioObrigatorio() antes.'
      );
    }
    return this.dadosLivro.isbn;
  }

  preencherISBNJaCadastrado(isbn: string): this {
    cy.get(CadastrarLivroElements.isbnInput)
      .should('be.visible')
      .type(`${isbn}{enter}`);
    return this;
  }

  selecionarImagemLivro(tipo: 'leve' | 'pesado' = 'leve'): this {
    cy.get(CadastrarLivroElements.textoSecundarioLabel).should('be.visible');
    cy.get(CadastrarLivroElements.imagemLivroInput).selectFile(
      Fixtures.imagens[tipo],
      { force: true }
    );
    return this;
  }

  salvarCadastro(msg: string): this {
    this.fecharToast();
    cy.get(CadastrarLivroElements.cadastrarLivroButton).click();
    this.verificarToastSucesso(msg);
    return this;
  }

  salvarCadastroDuplicado(msg: string): this {
    this.fecharToast();
    cy.get(CadastrarLivroElements.cadastrarLivroButton).click();
    this.verificarToastErro(msg);
    return this;
  }

  cancelarCadastro(msg: string): this {
    this.fecharToast();
    cy.get(CadastrarLivroElements.cancelarCadastroButton).click();
    this.verificarToastSucesso(msg);
    return this;
  }

  validarOCampoISBNObrigatorio(msg: string): this {
    this.dadosLivro = GeradorDadosLivro.criar();
    const isbn = this.dadosLivro.isbn!;

    cy.get(CadastrarLivroElements.isbnInput).should('be.visible').type(isbn);
    cy.get(CadastrarLivroElements.fechaToastButton).click();
    cy.get(CadastrarLivroElements.isbnInput).clear();
    cy.get(CadastrarLivroElements.avisoErroLabel)
      .should('be.visible')
      .and('contain.text', msg);
    cy.get(CadastrarLivroElements.isbnInput).should('be.visible').type(isbn);

    return this;
  }

  clicaOsCampos(): this {
    const campos = [
      CadastrarLivroElements.tituloDoLivroInput,
      CadastrarLivroElements.autorInput,
      CadastrarLivroElements.editoraInput,
      CadastrarLivroElements.anoDePublicacaoInput,
      CadastrarLivroElements.numeroDePaginasInput,
      CadastrarLivroElements.sinopseInput,
      CadastrarLivroElements.anoDePublicacaoInput,
    ];

    campos.forEach((campo) => {
      cy.get(campo).click();
    });

    return this;
  }

  verificarCampoObrigatorio(...mensagens: string[]): this {
    mensagens.forEach((msg) => {
      cy.get(CadastrarLivroElements.avisoErroLabel)
        .should('be.visible')
        .and('contain.text', msg);
    });
    return this;
  }

  verificaSeExistemOsCamposLabels(msg: string[]): this {
    msg.forEach((txt) => {
      cy.get(CadastrarLivroElements.camposLabel)
        .should('be.visible')
        .and('contain.text', txt);
    });
    return this;
  }

  verificarLabelDaCapaDoLivro(msg: string): this {
    cy.get(CadastrarLivroElements.capaDoLivroLabel)
      .should('be.visible')
      .and('contain.text', msg);
    return this;
  }

  botaoSalvarDesativa(): this {
    cy.get(CadastrarLivroElements.cadastrarLivroButton).should('be.disabled');
    return this;
  }

  camposDesabilitados(): this {
    const campos = [
      CadastrarLivroElements.tituloDoLivroInput,
      CadastrarLivroElements.autorInput,
      CadastrarLivroElements.editoraInput,
      CadastrarLivroElements.anoDePublicacaoInput,
      CadastrarLivroElements.numeroDePaginasInput,
      CadastrarLivroElements.sinopseInput,
      CadastrarLivroElements.anoDePublicacaoInput,
    ];

    campos.forEach((campo) => {
      cy.get(campo).should('be.disabled');
    });

    return this;
  }

  verificarSeExisteMensagemDeErro(msg: string): this {
    cy.get(CadastrarLivroElements.avisoErroLabel)
      .should('be.visible')
      .and('contain.text', msg);
    return this;
  }

  campoIsbnComPressTab(txt: string): this {
    cy.get(CadastrarLivroElements.isbnInput)
      .should('be.visible')
      .type(txt)
      .pressionarTab();
    return this;
  }

  clicaESair(): this {
    cy.get(CadastrarLivroElements.editoraInput).click();
    return this;
  }

  selecionarArquivoPdf(): this {
    cy.get(CadastrarLivroElements.imagemLivroInput).selectFile(
      Fixtures.documentos.pdf,
      { force: true }
    );
    return this;
  }

  preencherFormularioCompleto(
    texto: string,
    mensagem: ResultadosPesquisaLivrosMsg
  ): DadosLivro {
    const dadosLivroCompleto = GeradorDadosLivro.criarCompleto();
    this.acessarPaginaCadastrarLivro(texto);
    this.preencherFormularioObrigatorio(
      mensagem.mensagemToastNoCadastraLivro.ISBNNaoEncontrado,
      dadosLivroCompleto
    );
    this.salvarCadastro(
      mensagem.mensagemToastNoCadastraLivro.registroDeLivroSucesso
    );
    return dadosLivroCompleto;
  }
}
