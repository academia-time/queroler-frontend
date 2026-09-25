/// <reference types="cypress" />

import { CadastrarLivroPage } from '../../../../support/pages/CadastrarLivroPage';
import { GeradorDadosLivro } from '../../../../support/utils/geradorDadosLivro';
import { gerarESalvarImagemPesado } from '../../../../support/utils/geradorImagem';
import { LivroData } from '../../../../support/types/cadastrar/livros/testdata';
import {
  LivroMensagem,
  UploadImagem,
} from '../../../../support/types/cadastrar/livros/mensagem';

type UploadImagemMensagem = LivroMensagem & UploadImagem;

let dados: LivroData;
let msg: UploadImagemMensagem;

const cadastrarLivroPage = new CadastrarLivroPage();

describe('Cadastrar Livro', () => {
  before(() => {
    gerarESalvarImagemPesado();
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

  it('Deve exibir mensagem de aviso ao tentar upload de uma imagem mais 10 MB', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Upload de imagem')
      .severity('normal');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.preencherFormularioObrigatorio(
      msg.mensagemToastNoCadastraLivro.ISBNNaoEncontrado,
      { isbn: GeradorDadosLivro.criar().isbn }
    );
    cadastrarLivroPage.selecionarImagemLivro('pesado');
    cadastrarLivroPage.verificarSeExisteMensagemDeErro(
      msg.avisoErro.imagemMaiorQue10MB
    );
  });
});
