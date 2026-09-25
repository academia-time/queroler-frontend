/// <reference types="cypress" />

import { faker } from '@faker-js/faker/locale/pt_BR';
import { gerarCpf } from '../../../support/utils/geradorCpf';
import { gerarSenha } from '../../../support/utils/geradorSenha';
import { gerarDataNascimento } from '../../../support/utils/geradorData';
import { CadastrarLeitorPage } from '../../../support/pages/CadastrarLeitorPage';
import { HomePage } from '../../../support/pages/HomePage';
import { PerfilPage } from '../../../support/pages/PerfilPage';
import { LoginPage } from '../../../support/pages/LoginPage';
import { ExcluirPerfilData } from '../../../support/types/meu-perfil/testdata';
import {
  CadastrarSucessoMsg,
  MeuPerfilMensagem,
  ExcluirPerfilMsg,
} from '../../../support/types/meu-perfil/mensagem';

let login: ExcluirPerfilData;
let msg: CadastrarSucessoMsg & MeuPerfilMensagem & ExcluirPerfilMsg;

const cadastrarLeitorPage = new CadastrarLeitorPage();
const homePage = new HomePage();
const loginPage = new LoginPage();
const perfilPage = new PerfilPage();
const senha = gerarSenha();

const dadosCadastro = {
  nome: faker.person.firstName(),
  email: faker.internet.email(),
  senha: senha,
  confirmacaoSenha: senha,
  cpf: gerarCpf(),
  dataNascimento: gerarDataNascimento(),
};

function acessarMeuPerfilLogado(): void {
  loginPage
    .preencherEmail(login.usuarioCadastrado.email)
    .preencherSenha(login.usuarioCadastrado.senha)
    .clicarEmEntrar();
  homePage.abrirMenuUsuario().fecharToast().clicarEmMeuPerfil();
  perfilPage.verificarPaginaCarregada(msg.meuPerfil.tituloPagina);
}

describe('Excluir Perfil', () => {
  before(() => {
    cy.fixture('perfil/testdata').then((fixture) => {
      login = fixture;
    });
    cy.fixture('perfil/mensagem').then((fixture) => {
      msg = fixture;
    });
  });

  beforeEach(() => {
    loginPage.visitarPagina();
  });

  it('Deve cadastrar leitor com sucesso', () => {
    cy.allure()
      .feature('Cadastro de Leitor')
      .story('Cadastro com sucesso')
      .severity('critical');

    perfilPage.acessaCadastrarLeitor();

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

    login.usuarioCadastrado.email = dadosCadastro.email;
    login.usuarioCadastrado.senha = dadosCadastro.senha;

    perfilPage.pularDadosPessoais();
  });

  it('Deve exibir modal de confirmação ao excluir o perfil do usuário autenticado', () => {
    cy.allure()
      .feature('Excluir Perfil')
      .story('Exibir modal de confirmação')
      .severity('normal');

    acessarMeuPerfilLogado();

    perfilPage
      .clicarEmExcluirPerfil()
      .verificarSeModalExcluirPerfilEstaVisivel(msg.excluirPerfil.tituloModal);
  });

  it('Deve excluir o perfil do usuário autenticado', () => {
    cy.allure()
      .feature('Excluir Perfil')
      .story('Excluir o meu perfil com credenciais')
      .severity('critical');

    acessarMeuPerfilLogado();

    perfilPage
      .clicarEmExcluirPerfil()
      .clicarEmConfirmarExcluir()
      .validarPaginaDeLogin();
  });
});
