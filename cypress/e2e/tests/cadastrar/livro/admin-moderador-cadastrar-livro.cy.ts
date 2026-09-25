/// <reference types="cypress" />

import { CadastrarLivroPage } from '../../../../support/pages/CadastrarLivroPage';
import { GeradorDadosLivro } from '../../../../support/utils/geradorDadosLivro';
import { gerarEsalvarImagemLeve } from '../../../../support/utils/geradorImagem';
import { LivroData } from '../../../../support/types/cadastrar/livros/testdata';
import { LivroMensagem } from '../../../../support/types/cadastrar/livros/mensagem';
import { Perfil } from '../../../../support/types/perfil';

let dados: LivroData;
let mensagens: LivroMensagem;
let dadosPerfil: Perfil;

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
    cy.fixture('perfil').then((fixture) => {
      dadosPerfil = fixture;
    });
  });

  beforeEach(() => {
    cy.login(
      dadosPerfil.perfilAdministrador2.email,
      dadosPerfil.perfilAdministrador2.senha
    );
  });

  describe('Cadastrar de livro com perfil Administrador', () => {
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
    });

    it('Deve exibir mensagem de sucesso ao cadastrar um livro com imagem', () => {
      cy.allure()
        .feature('Cadastrar Livro')
        .story('Cadastro com imagem até 10mb')
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
    });
  });
});
