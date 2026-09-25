/// <reference types="cypress" />

import { CadastrarLivroPage } from '../../../../support/pages/CadastrarLivroPage';
import { GeradorDadosLivro } from '../../../../support/utils/geradorDadosLivro';
import { LivroData } from '../../../../support/types/cadastrar/livros/testdata';
import {
  LivroMensagem,
  EstruturaMensagem,
} from '../../../../support/types/cadastrar/livros/mensagem';

type MensagemEstrutura = LivroMensagem & EstruturaMensagem;
let dados: LivroData;
let msg: MensagemEstrutura;

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

  it('Deve exibir todos os elementos do formulário de cadastro de livro', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Estrutura da tela')
      .severity('normal');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.verificarPaginaCarregada();
    cadastrarLivroPage.verificaSeExistemOsCamposLabels([
      msg.labelsCadastrarLivro.isbn,
      msg.labelsCadastrarLivro.tituloDoLivro,
      msg.labelsCadastrarLivro.autores,
      msg.labelsCadastrarLivro.editora,
      msg.labelsCadastrarLivro.anoDePublicacao,
      msg.labelsCadastrarLivro.numeroDePaginas,
      msg.labelsCadastrarLivro.idioma,
      msg.labelsCadastrarLivro.sinopse,
    ]);
    cadastrarLivroPage.verificarLabelDaCapaDoLivro(
      msg.labelsCadastrarLivro.capaDoLivro
    );
  });

  it('Deve preencher o formulário de cadastro de livro com os dados obrigatórios', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Preenchimento do formulário')
      .severity('critical');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.preencherFormularioObrigatorio(
      msg.mensagemToastNoCadastraLivro.ISBNNaoEncontrado,
      GeradorDadosLivro.criarCompleto()
    );
    cadastrarLivroPage.selecionarImagemLivro();
  });
});
