/// <reference types="cypress" />

import { faker } from '@faker-js/faker/locale/pt_BR';
import { CadastrarLeitorPage } from '../../../../support/pages/CadastrarLeitorPage';
import { PerfilPage } from '../../../../support/pages/PerfilPage';
import { LoginPage } from '../../../../support/pages/LoginPage';
import { CadastrarSucessoMsg } from '../../../../support/types/meu-perfil/mensagem';
import { gerarEsalvarImagemLeve } from '../../../../support/utils/geradorImagem';
import { GeradorDadosLeitor } from '../../../../support/utils/geradorDadosLeitor';

let msg: CadastrarSucessoMsg;

const cadastrarLeitorPage = new CadastrarLeitorPage();
const loginPage = new LoginPage();
const perfilPage = new PerfilPage();

const dadosOpcionais = {
  cidade: faker.location.city(),
  estado: faker.location.state(),
  pais: faker.location.country(),
};

describe('Cadastrar informações opcionais com perfil de leitor', () => {
  before(() => {
    gerarEsalvarImagemLeve();
    cy.fixture('perfil/mensagem').then((fixture) => {
      msg = fixture;
    });
  });

  beforeEach(() => {
    loginPage.visitarPagina();
    perfilPage.acessaCadastrarLeitor();

    const dadosCadastro = GeradorDadosLeitor.gerarDadosCadastro();

    cadastrarLeitorPage.preencherFormulario({
      nome: dadosCadastro.nome,
      email: dadosCadastro.email,
      confirmarEmail: dadosCadastro.email,
      senha: dadosCadastro.senha,
      confirmarSenha: dadosCadastro.confirmacaoSenha,
      cpf: dadosCadastro.cpf,
      dataNascimento: dadosCadastro.dataNascimento,
    });

    cadastrarLeitorPage.clicarEmAceitarTermosDeUso();
    cadastrarLeitorPage.clicarEmCadastrar();
    cadastrarLeitorPage.verificarMensagemCadastroSucesso(
      msg.cadastradoComSucesso.usuarioCadastradoSucesso
    );
  });

  it('Deve cadastrar informações opcionais com sucesso', () => {
    cy.allure()
      .feature('Cadastrar Informações Opcionais')
      .story('Cadastrar informações com sucesso')
      .severity('normal');

    perfilPage
      .preencherCampoCidade(dadosOpcionais.cidade)
      .preencherCampoEstado(dadosOpcionais.estado)
      .preencherCampoPais(dadosOpcionais.pais)
      .selecionarImagem()
      .clicarEmAvancar();
  });

  it('Deve impedir o cadastro de informações opcionais sem preencher todos os campos', () => {
    cy.allure()
      .feature('Cadastrar Informações Opcionais')
      .story('Cadastrar informações sem preencher todos os campos')
      .severity('normal');

    perfilPage.clicarEmAvancarDesabilitado();
  });
});
