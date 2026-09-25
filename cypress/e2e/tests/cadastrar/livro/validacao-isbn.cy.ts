/// <reference types="cypress" />

import { CadastrarLivroPage } from '../../../../support/pages/CadastrarLivroPage';
import { GeradorDadosLivro } from '../../../../support/utils/geradorDadosLivro';
import {
  LivroData,
  ValidacaoIsbn,
} from '../../../../support/types/cadastrar/livros/testdata';
import { LivroMensagem } from '../../../../support/types/cadastrar/livros/mensagem';

type ValidacaoIsbnData = LivroData & ValidacaoIsbn;

let dados: ValidacaoIsbnData;
let msg: LivroMensagem;

const cadastrarLivroPage = new CadastrarLivroPage();

describe('Cadastrar Livro', () => {
  before(() => {
    cy.fixture('cadastrar/livro/testdata').then((fixture) => {
      dados = fixture;
    });
    cy.fixture('cadastrar/livro/mensagem').then((fixture) => {
      msg = fixture;
    });
  });

  beforeEach(() => {
    cy.login();
  });

  it('Deve exibir a mensagem de aviso o ISBN não encontrado', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('ISBN não encontrado')
      .severity('normal');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.preencherFormularioObrigatorio(
      msg.mensagemToastNoCadastraLivro.ISBNNaoEncontrado,
      { isbn: GeradorDadosLivro.criar().isbn }
    );
  });

  it('Deve exibir a mensagem de aviso o ISBN encontrado', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('ISBN encontrado')
      .severity('normal');
    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.preencherISBNJaCadastrado(dados.isbnCadastrado);
    cadastrarLivroPage.fecharToast();
    cadastrarLivroPage.verificarToastSucesso(
      msg.mensagemToastNoCadastraLivro.ISBNEncontrado
    );
  });
});
