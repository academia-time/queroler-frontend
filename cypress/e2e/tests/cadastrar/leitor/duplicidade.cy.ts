/// <reference types="cypress" />

import { faker } from '@faker-js/faker/locale/pt_BR';
import { gerarCpf } from '../../../../support/utils/geradorCpf';
import { gerarSenha } from '../../../../support/utils/geradorSenha';
import { gerarDataNascimento } from '../../../../support/utils/geradorData';
import { CadastrarLeitorPage } from '../../../../support/pages/CadastrarLeitorPage';
import { DuplicidadeData } from '../../../../support/types/cadastrar/leitor/testdata';
import { DuplicidadeMensagem } from '../../../../support/types/cadastrar/leitor/mensagem';

let dados: DuplicidadeData;
let msg: DuplicidadeMensagem;

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
    cy.fixture('cadastrar/leitor/testdata').then((fixture) => {
      dados = fixture;
    });
    cy.fixture('cadastrar/leitor/mensagem').then((fixture) => {
      msg = fixture;
    });
  });

  beforeEach(() => {
    cadastrarLeitorPage.visitarPaginaCadastrarDeLeitor();
  });

  it('Deve cadastrar leitor com sucesso', () => {
    cy.allure()
      .feature('Cadastro de Leitor')
      .story('Cadastro com sucesso')
      .severity('critical');

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

    dados.usuarioCadastrado.email = dadosCadastro.email;
    dados.usuarioCadastrado.cpf = dadosCadastro.cpf;
  });

  describe('Duplicidade', () => {
    const senhaEmail = gerarSenha();
    const senhaCpf = gerarSenha();

    it('Não deve permitir cadastro com e-mail já existente', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('E-mail duplicado')
        .severity('critical');

      cadastrarLeitorPage.preencherFormulario({
        nome: faker.person.firstName(),
        email: dados.usuarioCadastrado.email,
        confirmarEmail: dados.usuarioCadastrado.email,
        senha: senhaEmail,
        confirmarSenha: senhaEmail,
        cpf: gerarCpf(),
        dataNascimento: gerarDataNascimento(),
      });

      cadastrarLeitorPage.clicarEmAceitarTermosDeUso();
      cadastrarLeitorPage.clicarEmCadastrar();
      cadastrarLeitorPage.verificarMensagemJaCadastrado(
        msg.dadosJaCadastrado.emailJaCadastrado
      );
    });

    it('Não deve permitir cadastro com CPF já existente', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('CPF duplicado')
        .severity('critical');

      const emailFaker = faker.internet.email();

      cadastrarLeitorPage.preencherFormulario({
        nome: faker.person.firstName(),
        email: emailFaker,
        confirmarEmail: emailFaker,
        senha: senhaCpf,
        confirmarSenha: senhaCpf,
        cpf: dados.usuarioCadastrado.cpf,
        dataNascimento: gerarDataNascimento(),
      });

      cadastrarLeitorPage.clicarEmAceitarTermosDeUso();
      cadastrarLeitorPage.clicarEmCadastrar();
      cadastrarLeitorPage.verificarMensagemJaCadastrado(
        msg.dadosJaCadastrado.cpfJaCadastrado
      );
    });
  });
});
