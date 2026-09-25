/// <reference types="cypress" />

import { CadastrarLivroPage } from '../../../../support/pages/CadastrarLivroPage';
import { GeradorDadosLivro } from '../../../../support/utils/geradorDadosLivro';
import { LivroData } from '../../../../support/types/cadastrar/livros/testdata';
import { LivroMensagem } from '../../../../support/types/cadastrar/livros/mensagem';

let dados: LivroData;
let mensagens: LivroMensagem;
let isbnCadastrado: string;

const cadastrarLivroPage = new CadastrarLivroPage();

describe('Cadastrar Livro', () => {
  before(() => {
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

  describe('Sem upload de imagem', () => {
    it('Deve exibir mensagem de sucesso ao cadastrar um livro sem imagem', () => {
      cy.allure()
        .feature('Cadastrar Livro')
        .story('Cadastro sem imagem')
        .severity('normal');

      cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
      cadastrarLivroPage.preencherFormularioObrigatorio(
        mensagens.mensagemToastNoCadastraLivro.ISBNNaoEncontrado,
        GeradorDadosLivro.criarCompleto()
      );
      cadastrarLivroPage.salvarCadastro(
        mensagens.mensagemToastNoCadastraLivro.registroDeLivroSucesso
      );

      isbnCadastrado = cadastrarLivroPage.getIsbnCadastrado();
    });

    it('Não deve permitir cadastro com ISBN já existente', () => {
      cy.allure()
        .feature('Cadastrar Livro')
        .story('ISBN duplicado - Cadastro sem imagem')
        .severity('critical');

      cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
      cadastrarLivroPage.preencherISBNJaCadastrado(isbnCadastrado);
      cadastrarLivroPage.salvarCadastroDuplicado(
        mensagens.mensagemToastNoCadastraLivro.ISBNJaCadastrado
      );
      cadastrarLivroPage.verificarToastSucesso(
        mensagens.mensagemToastNoCadastraLivro.ISBNEncontrado
      );
    });

    it('Deve exibir mensagem ao cancelar o cadastro de um livro sem imagem', () => {
      cy.allure()
        .feature('Cadastrar Livro')
        .story('Cancelar cadastro sem imagem')
        .severity('normal');

      cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
      cadastrarLivroPage.preencherFormularioObrigatorio(
        mensagens.mensagemToastNoCadastraLivro.ISBNNaoEncontrado,
        GeradorDadosLivro.criarCompleto()
      );
      cadastrarLivroPage.cancelarCadastro(
        mensagens.mensagemToastNoCadastraLivro.registroDeLivroCancelado
      );
    });
  });
});
