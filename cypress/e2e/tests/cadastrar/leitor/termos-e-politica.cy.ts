/// <reference types="cypress" />

import { CadastrarLeitorPage } from '../../../../support/pages/CadastrarLeitorPage';
import { EstruturaMensagem } from '../../../../support/types/cadastrar/leitor/mensagem';

let msg: EstruturaMensagem;

const cadastrarLeitorPage = new CadastrarLeitorPage();

describe('Cadastro de Leitor', () => {
  before(() => {
    cy.fixture('cadastrar/leitor/mensagem').then((fixture) => {
      msg = fixture;
    });
  });

  beforeEach(() => {
    cadastrarLeitorPage.visitarPaginaCadastrarDeLeitor();
  });

  describe('Validação dos Termos de Serviço e Política de Privacidade', () => {
    it('Deve exibir os Termos de Serviço', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('Exibição dos Termos de Serviço')
        .severity('normal');

      cadastrarLeitorPage.verificaAcessaOModalOsTermosEPolitica(
        msg.termosEPolitica.termosDeServico
      );
    });

    it('Deve exibir a Política de Privacidade', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('Exibição da Política de Privacidade')
        .severity('normal');

      cadastrarLeitorPage.verificaAcessaOModalOsTermosEPolitica(
        msg.termosEPolitica.politicaDePrivacidade
      );
    });
  });
});
