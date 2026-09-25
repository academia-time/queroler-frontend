/// <reference types="cypress" />

import { CadastrarLivroPage } from '../../../../support/pages/CadastrarLivroPage';
import { GeradorDadosLivro } from '../../../../support/utils/geradorDadosLivro';
import { gerarESalvarPdf } from '../../../../support/utils/geradorArquivo';
import { LivroData } from '../../../../support/types/cadastrar/livros/testdata';
import {
  LivroMensagem,
  UploadFormatoInvalido,
} from '../../../../support/types/cadastrar/livros/mensagem';

type UploadInvalido = LivroMensagem & UploadFormatoInvalido;

let dados: LivroData;
let msg: UploadInvalido;

const cadastrarLivroPage = new CadastrarLivroPage();

describe('Cadastrar Livro', () => {
  before(() => {
    gerarESalvarPdf();
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

  it('Não deve permitir upload de arquivo PDF', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Upload de arquivo inválido')
      .severity('normal');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.preencherFormularioObrigatorio(
      msg.mensagemToastNoCadastraLivro.ISBNNaoEncontrado,
      { isbn: GeradorDadosLivro.criar().isbn }
    );
    cadastrarLivroPage.selecionarArquivoPdf();
    cadastrarLivroPage.verificarSeExisteMensagemDeErro(
      msg.avisoErro.formatoArquivoInvalido
    );
  });
});
