/// <reference types="cypress"/>

import { CadastrarLivroPage } from '../../../support/pages/CadastrarLivroPage';
import { HomePage } from '../../../support/pages/HomePage';
import { ResultadosPesquisaLivrosMsg } from '../../../support/types/pesquisa/mensagem';
import { ResultadosPesquisaLivrosData } from '../../../support/types/pesquisa/testdata';

type Credenciais = {
  email: string;
  senha: string;
};

type Perfil = {
  perfilAdministrador2: Credenciais;
  perfilModerador2: Credenciais;
  perfilLeitor2: Credenciais;
};

let dados: ResultadosPesquisaLivrosData;
let mensagens: ResultadosPesquisaLivrosMsg;
let dadosPerfil: Perfil;
let nomeDoLivro: string;

const homePage = new HomePage();
const cadastrarLivroPage = new CadastrarLivroPage();

describe('Pesquisa de Livros por Perfil', () => {
  before(() => {
    cy.fixture('perfil').then((fixture) => {
      dadosPerfil = fixture;
    });

    cy.fixture('pesquisa/testdata').then((fixture) => {
      dados = fixture;
      nomeDoLivro = dados.nomeDoLivro;
    });

    cy.fixture('pesquisa/mensagem').then((fixture) => {
      mensagens = fixture;
    });
  });

  beforeEach(() => {
    cy.allure()
      .feature('Visualizar todos os resultados da pesquisa de livros')
      .story('E02H03 - Pesquisar os livros cadastrados')
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

      it(`Deve retornar mais de 5 resultados na busca por autor ${nome}`, () => {
        homePage.contarMaisDe5LivrosDeAutor('testeAutor');
      });

      it(`Deve retornar 15 resultados na busca por autor ${nome}`, () => {
        homePage.contar15LivrosDeAutor('org');
      });

      it(`Deve retornar mais de 15 resultados na busca por autor ${nome}`, () => {
        homePage.contarMaisDe15LivrosDeAutor('ma');
      });

      it(`Deve visualizar livros ordenados por data de cadastro decrescente do perfil ${nome}`, () => {
        const { autor, titulo } = buscarDadosLivro();

        homePage.verificarOrdemDecrescenteDosLivrosPorAutor(autor, titulo);
      });
    });
  });

  function buscarDadosLivro(): { autor: string; titulo: string } {
    const dadosLivro = cadastrarLivroPage.preencherFormularioCompleto(
      nomeDoLivro,
      mensagens
    );
    return {
      autor: dadosLivro.autor ?? '',
      titulo: dadosLivro.titulo ?? '',
    };
  }
});
