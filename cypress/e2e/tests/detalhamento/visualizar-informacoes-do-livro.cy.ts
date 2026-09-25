/// <reference types="cypress" />

import { DetalhamentoPage } from '../../../support/pages/DetalhamentoPage';
import { SecaoMensagem } from '../../../support/types/detalhamento/mensagem';
import { Perfil } from '../../../support/types/perfil';

let msg: SecaoMensagem;
let dadosPerfil: Perfil;

const detalhamentoPage = new DetalhamentoPage();

describe('Exibir detalhamento do livro', () => {
  before(() => {
    cy.fixture('detalhamento/mensagem').then((fixture) => {
      msg = fixture.SecaoMensagem;
    });
    cy.fixture('perfil').then((fixture) => {
      dadosPerfil = fixture;
    });
  });

  beforeEach(() => {
    cy.allure()
      .feature('Visualizar detalhamento do livro')
      .story('E02H04CA01 - Visualizar informações do livro selecionado')
      .severity('normal');
  });

  const perfis = [
    {
      nome: 'Administrador',
      credenciais: () => dadosPerfil.perfilAdministrador2,
    },
    {
      nome: 'Moderador',
      credenciais: () => dadosPerfil.perfilModerador2,
    },
    {
      nome: 'Leitor',
      credenciais: () => dadosPerfil.perfilLeitor2,
    },
  ];

  perfis.forEach(({ nome, credenciais }) => {
    describe(`Perfil ${nome}`, () => {
      beforeEach(() => {
        const { email, senha } = credenciais();
        cy.login(email, senha);
      });

      it(`Estrutura de tela para exibir detalhes de um livro com o perfil ${nome}`, () => {
        cy.allure()
          .feature('Detalhamento do livro')
          .story('Selecionar um livro no home')
          .severity('normal');

        detalhamentoPage.selecionarLivroNoHome();
        detalhamentoPage.verificarSeJaEstaNaPaginaDeDetalhamento();
        detalhamentoPage.verificarPaginaCarregada();
        detalhamentoPage.verificarSecoesDoDetalhamento([
          msg.secoes.sinopse,
          msg.secoes.estatísticas,
          msg.secoes.resenhas,
        ]);
      });

      it(`Deve exibir as informações do livro selecionado para o perfil ${nome}`, () => {
        cy.allure()
          .feature('Detalhamento do livro')
          .story('Selecionar um livro no home')
          .severity('normal');

        detalhamentoPage.selecionarLivroNoHome();
        detalhamentoPage.verificarSeJaEstaNaPaginaDeDetalhamento();
        detalhamentoPage.verificarPaginaCarregada();
        detalhamentoPage.verificarInfomacoesDoLivro();
      });
    });
  });
});
