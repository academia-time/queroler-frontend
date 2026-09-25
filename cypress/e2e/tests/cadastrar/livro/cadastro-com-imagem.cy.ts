/// <reference types="cypress" />

import { CadastrarLivroPage } from '../../../../support/pages/CadastrarLivroPage';
import { GeradorDadosLivro } from '../../../../support/utils/geradorDadosLivro';
import { gerarEsalvarImagemLeve } from '../../../../support/utils/geradorImagem';
import { LivroData } from '../../../../support/types/cadastrar/livros/testdata';
import { LivroMensagem } from '../../../../support/types/cadastrar/livros/mensagem';

let dados: LivroData;
let mensagens: LivroMensagem;
let isbnCadastrado: string;

const cadastrarLivroPage = new CadastrarLivroPage();

describe('Cadastrar Livro', () => {
  before(() => {
    gerarEsalvarImagemLeve();
    cy.fixture('cadastrar/livro/testdata').then((fixture) => {
      dados = fixture;
    });
    cy.fixture('cadastrar/livro/mensagem').then((fixture) => {
      mensagens = fixture;
    });
  });

  beforeEach(() => {
    cy.login();
  });

  describe('Cadastro de livro com imagem', () => {
    it('Deve exibir mensagem de sucesso ao cadastrar um livro', () => {
      cy.allure()
        .feature('Cadastrar Livro')
        .story('Cadastro bem-sucedido')
        .severity('normal');

      cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
      cadastrarLivroPage.preencherFormularioObrigatorio(
        mensagens.mensagemToastNoCadastraLivro.ISBNNaoEncontrado,
        GeradorDadosLivro.criarCompleto()
      );
      cadastrarLivroPage.selecionarImagemLivro();
      cadastrarLivroPage.salvarCadastro(
        mensagens.mensagemToastNoCadastraLivro.registroDeLivroSucesso
      );

      isbnCadastrado = cadastrarLivroPage.getIsbnCadastrado();
    });

    it('Não deve permitir cadastro com ISBN já existente', () => {
      cy.allure()
        .feature('Cadastrar Livro')
        .story('ISBN duplicado - Cadastro com imagem')
        .severity('critical');

      cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
      cadastrarLivroPage.preencherISBNJaCadastrado(isbnCadastrado);
      cadastrarLivroPage.salvarCadastro(
        mensagens.mensagemToastNoCadastraLivro.ISBNEncontrado
      );
    });

    it('Deve exibir mensagem ao cancelar o cadastro de um livro', () => {
      cy.allure()
        .feature('Cadastrar Livro')
        .story('Cancelar cadastro')
        .severity('normal');

      cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
      cadastrarLivroPage.preencherFormularioObrigatorio(
        mensagens.mensagemToastNoCadastraLivro.ISBNNaoEncontrado,
        GeradorDadosLivro.criarCompleto()
      );
      cadastrarLivroPage.selecionarImagemLivro();
      cadastrarLivroPage.cancelarCadastro(
        mensagens.mensagemToastNoCadastraLivro.registroDeLivroCancelado
      );
    });
  });
});
