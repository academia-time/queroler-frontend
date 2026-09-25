/// <reference types="cypress" />

import { faker } from '@faker-js/faker/locale/pt_BR';
import { gerarCpf } from '../../../../support/utils/geradorCpf';
import { gerarSenha } from '../../../../support/utils/geradorSenha';
import { gerarDataNascimento } from '../../../../support/utils/geradorData';
import { CadastrarLeitorPage } from '../../../../support/pages/CadastrarLeitorPage';
import { EstruturaMensagem } from '../../../../support/types/cadastrar/leitor/mensagem';

let msg: EstruturaMensagem;

const cadastrarLeitorPage = new CadastrarLeitorPage();
const senha = gerarSenha();

const dadosCadastro = {
  nome: faker.person.firstName(),
  email: faker.internet.email(),
  senha: senha,
  confirmacaoSenha: senha,
  cpf: gerarCpf(),
  dataNascimento: gerarDataNascimento(),
};

describe('Cadastro de Leitor', () => {
  before(() => {
    cy.fixture('cadastrar/leitor/mensagem').then((fixture) => {
      msg = fixture;
    });
  });

  beforeEach(() => {
    cadastrarLeitorPage.visitarPaginaCadastrarDeLeitor();
  });

  it('Deve exibir todos os elementos do formulário de cadastro', () => {
    cy.allure()
      .feature('Cadastro de Leitor')
      .story('Estrutura da tela')
      .severity('normal');

    cadastrarLeitorPage.verificarPaginaCarregada();
    cadastrarLeitorPage.verificarLabelsDosCampos([
      msg.labelsCadastrarLeitor.nome,
      msg.labelsCadastrarLeitor.cpf,
      msg.labelsCadastrarLeitor.email,
      msg.labelsCadastrarLeitor.confirmarEmail,
      msg.labelsCadastrarLeitor.senha,
      msg.labelsCadastrarLeitor.confirmarSenha,
      msg.labelsCadastrarLeitor.dataDeNascimento,
    ]);
    cadastrarLeitorPage.verificarOsTermosDeServico([
      msg.termosEPolitica.concordaComOsTermos,
      msg.termosEPolitica.termosDeServico,
      msg.termosEPolitica.politicaDePrivacidade,
    ]);
  });

  it('Deve permitir o preenchimento do formulário de cadastro', () => {
    cy.allure()
      .feature('Cadastro de Leitor')
      .story('Preenchimento do formulário')
      .severity('normal');

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
  });

  it('Deve exibir mensagens de campos obrigatórios quando o formulário for submetido vazio', () => {
    cy.allure()
      .feature('Cadastro de Leitor')
      .story('Validação de campos obrigatórios')
      .severity('critical');

    cadastrarLeitorPage.clicaOsCamposObrigatorios();
    cadastrarLeitorPage.verificarMensagensCamposObrigatorios(
      msg.campoObrigatorioNoCadastrarLeitor.nomeObrigatorio,
      msg.campoObrigatorioNoCadastrarLeitor.emailObrigatorio,
      msg.campoObrigatorioNoCadastrarLeitor.confirmacaoEmailObrigatoria,
      msg.campoObrigatorioNoCadastrarLeitor.senhaObrigatoria,
      msg.campoObrigatorioNoCadastrarLeitor.confirmacaoSenhaObrigatoria,
      msg.campoObrigatorioNoCadastrarLeitor.cpfObrigatorio,
      msg.campoObrigatorioNoCadastrarLeitor.dataNascimentoObrigatoria,
      msg.campoObrigatorioNoCadastrarLeitor.termosObrigatorio
    );
    cadastrarLeitorPage.verificarOBotaoCadastrarInativo();
  });

  describe('Visibilidade da senha e confirmar senha', () => {
    it('Deve exibir a senha em texto ao clicar no ícone de mostrar senha', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('Visibilidade do campo senha')
        .severity('critical');

      cadastrarLeitorPage.preencherFormulario({
        senha: dadosCadastro.senha,
      });

      cadastrarLeitorPage.visibilidadeDaSenha();
    });

    it('Deve ocultar a senha ao clicar novamente no ícone', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('Ocultar o campo senha')
        .severity('critical');

      cadastrarLeitorPage.preencherFormulario({
        senha: dadosCadastro.senha,
      });

      cadastrarLeitorPage.visibilidadeDaSenha();
      cadastrarLeitorPage.ocultarSenha();
    });

    it('Deve exibir a senha em texto ao clicar no ícone de mostrar confirmar senha', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('Visibilidade do campo confirmar senha')
        .severity('critical');

      cadastrarLeitorPage.preencherFormulario({
        confirmarSenha: dadosCadastro.senha,
      });

      cadastrarLeitorPage.visibilidadeConfirmarSenha();
    });

    it('Deve ocultar a confirmar senha ao clicar novamente no ícone', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('Ocultar o campo confirmar senha')
        .severity('critical');

      cadastrarLeitorPage.preencherFormulario({
        confirmarSenha: dadosCadastro.senha,
      });

      cadastrarLeitorPage.visibilidadeConfirmarSenha();
      cadastrarLeitorPage.ocultaConfirmarSenha();
    });
  });
});
