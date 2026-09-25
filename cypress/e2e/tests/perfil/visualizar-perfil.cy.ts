/// <reference types="cypress" />

import { HomePage } from '../../../support/pages/HomePage';
import { PerfilPage } from '../../../support/pages/PerfilPage';
import { VisualizarPerfil } from '../../../support/types/meu-perfil/testdata';

let data: VisualizarPerfil;

const homePage = new HomePage();
const perfilPage = new PerfilPage();

describe('Visualizar o Perfil', () => {
  before(() => {
    cy.fixture('perfil/testdata').then((fixture) => {
      data = fixture;
    });
  });

  beforeEach(() => {
    cy.login();
  });

  it('Deve verificar os dados do meu perfil', () => {
    cy.allure()
      .feature('Meu Perfil')
      .story('Visualizar o meu perfil com credenciais')
      .severity('normal');

    homePage.abrirMenuUsuario().fecharToast().clicarEmMeuPerfil();
    perfilPage
      .verificarNome(data.meuPerfil.nome)
      .verificarEmail(data.meuPerfil.email)
      .verificarCpf(data.meuPerfil.cpf)
      .verificarDataNascimento(data.meuPerfil.dataDeNascimento)
      .verificarCidade(data.meuPerfil.cidade)
      .verificarEstado(data.meuPerfil.estado)
      .verificarPais(data.meuPerfil.pais)
      .verificarFotoDePerfilVisivel();
  });
});
