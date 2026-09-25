/// <reference types="cypress" />

import { HomePage } from '../../../support/pages/HomePage';
import { PerfilPage } from '../../../support/pages/PerfilPage';
import { PerfilEditadoData } from '../../../support/types/meu-perfil/testdata';

type Credenciais = {
  email: string;
  senha: string;
};

type Perfil = {
  perfilAdministradorEditado: Credenciais;
  perfilModeradorEditado: Credenciais;
  perfilLeitor2: Credenciais;
};

let editarUsuario: PerfilEditadoData;
let dadosPerfil: Perfil;

const homePage = new HomePage();
const perfilPage = new PerfilPage();

describe('Editar o Perfil', () => {
  before(() => {
    cy.fixture('perfil/testdata').then((fixture) => {
      editarUsuario = fixture;
    });

    cy.fixture('perfil').then((fixture) => {
      dadosPerfil = fixture;
    });
  });

  beforeEach(() => {
    cy.allure()
      .feature('E1_HU 06 – Disponibilizar acessando via menu a tela de perfil')
      .story('CA02 – Editar os dados de perfil')
      .severity('normal');
  });

  const perfis = [
    {
      nome: 'Administrador',
      credenciais: () => dadosPerfil.perfilAdministradorEditado,
      dados: () => editarUsuario.perfilAdministradorEditado,
    },
    {
      nome: 'Moderador',
      credenciais: () => dadosPerfil.perfilModeradorEditado,
      dados: () => editarUsuario.perfilModeradorEditado,
    },
    {
      nome: 'Leitor',
      credenciais: () => dadosPerfil.perfilLeitor2,
      dados: () => editarUsuario.perfilLeitor2,
    },
  ];

  perfis.forEach(({ nome, credenciais, dados }) => {
    describe(`Perfil ${nome}`, () => {
      beforeEach(() => {
        const { email, senha } = credenciais();
        cy.login(email, senha);
        cy.wait(10000);
        homePage.abrirMenuUsuario().clicarEmMeuPerfil();
        cy.wait(7000);
      });

      it(`01 - Validar campo cpf desabilitado para perfil ${nome}`, () => {
        perfilPage.verificarCpfDesabilitado('', dados().cpf);
      });

      it(`02 - Validar botão salvar habilitado após editar o campo obrigatório data de nascimento do perfil ${nome}`, () => {
        perfilPage
          .editarDataNascimento(dados().dataDeNascimento)
          .verifificarBotaoSalvarHabilitado();
      });

      it(`03 - Validar botão salvar habilitado após editar o campo obrigatório nome do perfil ${nome}`, () => {
        perfilPage.editarNome(dados().nome).verifificarBotaoSalvarHabilitado();
      });

      it(`04 - Validar botão salvar habilitado após editar o campo obrigatório email do perfil ${nome}`, () => {
        perfilPage.editarNome(dados().email).verifificarBotaoSalvarHabilitado();
      });

      it(`05 - Validar botão salvar habilitado após editar o campo opcional cidade (com campos obrigatórios) do perfil ${nome}`, () => {
        perfilPage
          .editarCidade(dados().cidade)
          .verifificarBotaoSalvarHabilitado();
      });

      it(`06 - Validar botão salvar habilitado após editar o campo opcional estado (com campos obrigatórios) do perfil ${nome}`, () => {
        perfilPage
          .editarEstado(dados().nome)
          .verifificarBotaoSalvarHabilitado();
      });

      it(`07 - Validar botão salvar habilitado após editar o campo opcional pais (com campos obrigatórios) do perfil ${nome}`, () => {
        perfilPage.editarPais(dados().pais).verifificarBotaoSalvarHabilitado();
      });

      it(`08 - Validar botão salvar desabilitado após editar perfil removendo um campo obrigatório e preenchendo todos os campos opicionais do perfil ${nome}`, () => {
        perfilPage
          .limparNome()
          .editarCidade(dados().cidade)
          .editarEstado(dados().estado)
          .editarPais(dados().pais)
          .verifificarBotaoSalvarDesabilitado();
      });

      it(`09 - Validar mensagem 'campo obrigatório' e botão salvar desabilitado para campo nome em branco após editar perfil (sem campos opicionais preenchidos) do perfil ${nome}`, () => {
        perfilPage
          .limparNome()
          .clicarForaDoCampo()
          .verificarMensagemCampoObrigatório()
          .verifificarBotaoSalvarDesabilitado();
      });

      it(`10 - Validar mensagem 'campo obrigatório' e botão salvar desabilitado para campo data de nascimento após editar perfil removendo um campo obrigatório (sem campos opicionais preenchidos) do perfil ${nome}`, () => {
        perfilPage
          .limparDataDeNascimento()
          .clicarForaDoCampo()
          .verificarMensagemCampoObrigatório()
          .verifificarBotaoSalvarDesabilitado();
      });

      it(`11 - Validar mensagem 'campo obrigatório' e botão salvar desabilitado para campo email após editar perfil removendo um campo obrigatório (sem campos opicionais preenchidos) do perfil ${nome}`, () => {
        perfilPage
          .limparEmail()
          .clicarForaDoCampo()
          .verificarMensagemCampoObrigatório()
          .verifificarBotaoSalvarDesabilitado();
      });

      it(`12 - Validar botão salvar após editar nome do perfil  ${nome}`, () => {
        perfilPage.salvarNomeEditado(dados().nome, true);
      });

      it(`13 - Validar botão salvar após editar data de nascimento do perfil  ${nome}`, () => {
        perfilPage.salvarDataNascimentoEditado(dados().dataDeNascimento, true);
      });

      it(`14 - Validar botão salvar após editar email do perfil  ${nome}`, () => {
        perfilPage.salvarEmailEditado(dados().email, true);
      });

      it(`15 - Validar botão salvar após editar cidade do perfil  ${nome}`, () => {
        perfilPage.salvarCidadeEditado(dados().cidade, true);
      });

      it(`16 - Validar botão salvar após editar estado do perfil  ${nome}`, () => {
        perfilPage.salvarEstadoEditado(dados().estado, true);
      });

      it(`17 - Validar botão salvar após editar país do perfil  ${nome}`, () => {
        perfilPage.salvarPaisEditado(dados().pais, true);
      });

      //DADOS INVÁLIDOS ABAIXO:
      // NOME DE CIDADE QUE NÃO EXISTE
      // E ESTADO QUE NÃO EXISTE
      // E DATA DE NASCIMENTO =NOME

      it(`18 - Validar não salvar após editar email do perfil  ${nome} inválido`, () => {
        perfilPage
          .editarEmail('emailinvalido')
          .clicarForaDoCampo()
          .verificarMensagemCampoObrigatório()
          .verifificarBotaoSalvarDesabilitado();
      });

      it(`19 - Validar não salvar após editar data de nascimento do perfil  ${nome} inválido`, () => {
        perfilPage
          .editarDataNascimento('datainvalida')
          .clicarForaDoCampo()
          .verificarMensagemCampoObrigatório()
          .verifificarBotaoSalvarDesabilitado();
      });

      it(`20 - Validar não salvar após editar cidade do perfil  ${nome}`, () => {
        perfilPage
          .editarCidade('CidadeInvalida')
          .clicarForaDoCampo()
          .verificarMensagemCampoObrigatório()
          .verifificarBotaoSalvarDesabilitado();
      });

      it(`21 - Validar não salvar após editar estado do perfil  ${nome}`, () => {
        perfilPage
          .editarEstado('EstadoInvalido')
          .clicarForaDoCampo()
          .verificarMensagemCampoObrigatório()
          .verifificarBotaoSalvarDesabilitado();
      });

      it(`22 - Validar não salvar após editar país do perfil  ${nome}`, () => {
        perfilPage
          .editarPais('PaisInvalido')
          .clicarForaDoCampo()
          .verificarMensagemCampoObrigatório()
          .verifificarBotaoSalvarDesabilitado();
      });

      it(`18 - Validar não salvar após editar email inválido do perfil  ${nome}`, () => {
        perfilPage.salvarEmailEditado('emailinvalido', false);
      });

      it(`19 - Validar não salvar após editar data de nascimento inválida do perfil  ${nome} `, () => {
        perfilPage.salvarDataNascimentoEditado('datainvalida', false);
      });

      it(`20 - Validar não salvar após editar cidade inválida do perfil  ${nome}`, () => {
        perfilPage.salvarCidadeEditado('CidadeInvalida', false);
      });

      it(`21 - Validar não salvar após editar estado inválido do perfil  ${nome}`, () => {
        perfilPage.salvarEstadoEditado('EstadoInvalido', false);
      });

      it(`22 - Validar não salvar após editar país inválido do perfil  ${nome}`, () => {
        perfilPage.salvarPaisEditado('PaisInvalido', false);
      });

      it(`23 - Validar não salvar após editar cidade inválida do perfil  ${nome}`, () => {
        perfilPage.salvarCidadeEditado('Xx@xxxxx1258496xxxx::xxxxxxx', false);
      });

      it(`24 - Validar não salvar após editar estado inválido do perfil  ${nome}`, () => {
        perfilPage.salvarEstadoEditado('Xx@xxxxx1258496xxxx::xxxxxxx', false);
      });

      it(`25 - Validar não salvar após editar país inválido do perfil  ${nome}`, () => {
        perfilPage.salvarPaisEditado('Xx@xxxxx1258496xxxx::xxxxxxx', false);
      });
    });
  });
});
