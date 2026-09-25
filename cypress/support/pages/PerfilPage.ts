/// <reference types="cypress" />

import { PerfilElements } from '../elements/PerfilElements';
import { HomePage } from '../../support/pages/HomePage';
import { Fixtures } from '../utils/fixtures';

const TIMEOUT = 30000;
const homePage = new HomePage();

export class PerfilPage {
  verificarPaginaCarregada(txt: string): this {
    cy.visit('/perfil');
    cy.get(PerfilElements.tituloMeuPerfil)
      .should('be.visible', { timeout: TIMEOUT })
      .and('contain.text', txt);
    cy.get(PerfilElements.subtituloMeuPerfil).should('be.visible', {
      timeout: TIMEOUT,
    });
    return this;
  }

  verificarNome(txt: string): this {
    cy.get(PerfilElements.nomeInput).should('have.value', txt);
    return this;
  }

  verificarEmail(txt: string): this {
    cy.get(PerfilElements.emailInput).should('have.value', txt);
    return this;
  }

  verificarCpf(txt: string): this {
    cy.get(PerfilElements.cpfInput).should('have.value', txt);
    return this;
  }

  verificarDataNascimento(txt: string): this {
    cy.get(PerfilElements.dataNascimentoInput).should('have.value', txt);
    return this;
  }

  verificarCidade(txt: string): this {
    cy.get(PerfilElements.cidadeInput).should('have.value', txt);
    return this;
  }

  verificarEstado(txt: string): this {
    cy.get(PerfilElements.estadoInput).should('have.value', txt);
    return this;
  }

  verificarPais(txt: string): this {
    cy.get(PerfilElements.paisInput).should('have.value', txt);
    return this;
  }

  verificarFotoDePerfilVisivel(): this {
    cy.get(PerfilElements.fotoDePerfil).should('exist').and('be.visible');
    return this;
  }

  editarNome(novoTxt: string): this {
    this.limparNome();
    cy.get(PerfilElements.nomeInput).type(novoTxt);
    return this;
  }

  editarEmail(novoTxt: string): this {
    this.limparEmail();
    cy.get(PerfilElements.emailInput).type(novoTxt);
    return this;
  }

  editarDataNascimento(novoTxt: string): this {
    this.limparDataDeNascimento();
    cy.get(PerfilElements.dataNascimentoInput).type(novoTxt);

    return this;
  }

  editarCidade(novoTxt: string): this {
    this.limparCidade();
    cy.get(PerfilElements.cidadeInput).type(novoTxt);
    return this;
  }

  editarEstado(novoTxt: string): this {
    this.limparEstado();
    cy.get(PerfilElements.estadoInput).type(novoTxt);
    return this;
  }

  editarPais(novoTxt: string): this {
    this.limparPais();
    cy.get(PerfilElements.paisInput).type(novoTxt);
    return this;
  }

  verificarCpfDesabilitado(cpfOriginal: string, novoCpf: string): this {
    cy.get(PerfilElements.cpfInput)
      .should('have.text', cpfOriginal)
      .type(novoCpf, { force: true })
      .should('have.text', cpfOriginal);

    return this;
  }

  verifificarBotaoSalvarHabilitado(): this {
    cy.get(PerfilElements.salvarButton).should('not.be.disabled');
    return this;
  }

  salvar(): this {
    cy.get(PerfilElements.salvarButton).click();
    return this;
  }

  verifificarBotaoSalvarDesabilitado(): this {
    cy.get(PerfilElements.salvarButton).should('be.disabled');
    return this;
  }

  limparNome() {
    cy.get(PerfilElements.nomeInput).should('be.enabled').clear();
    return this;
  }

  limparEmail(): this {
    cy.get(PerfilElements.emailInput).should('be.enabled').clear();
    return this;
  }

  limparDataDeNascimento(): this {
    cy.get(PerfilElements.dataNascimentoInput).should('be.enabled').clear();
    return this;
  }

  limparCidade(): this {
    cy.get(PerfilElements.cidadeInput).should('be.enabled').clear();
    return this;
  }

  limparEstado(): this {
    cy.get(PerfilElements.estadoInput).should('be.enabled').clear();
    return this;
  }

  limparPais(): this {
    cy.get(PerfilElements.paisInput).should('be.enabled').clear();
    return this;
  }

  verificarMensagemCampoObrigatório(): this {
    cy.get(PerfilElements.mensagemCampoObrigatorio).should('be.visible');

    return this;
  }

  abrirPaginaPerfil(): this {
    homePage.abrirPerfil();
    return this;
  }

  verificarESalvar(salvar: boolean): this {
    if (salvar) {
      this.verifificarBotaoSalvarHabilitado();
      this.salvar();
    } else {
      this.verifificarBotaoSalvarDesabilitado();
    }
    return this;
  }

  salvarEAbrirPerfilNovamente(salvar: boolean): this {
    this.verificarESalvar(salvar);
    if (salvar) {
      this.abrirPaginaPerfil();
    }
    return this;
  }

  salvarNomeEditado(txt: string, salvar: boolean): this {
    this.editarNome(txt).salvarEAbrirPerfilNovamente(salvar).verificarNome(txt);
    return this;
  }

  salvarEmailEditado(txt: string, salvar: boolean) {
    this.editarEmail(txt)
      .salvarEAbrirPerfilNovamente(salvar)
      .verificarEmail(txt);
  }

  salvarDataNascimentoEditado(txt: string, salvar: boolean) {
    this.editarDataNascimento(txt).salvarEAbrirPerfilNovamente(salvar);
    if (salvar) {
      this.verificarDataNascimento(txt);
    } else {
      this.verificarDataNascimento('');
    }
  }

  salvarCidadeEditado(txt: string, salvar: boolean) {
    this.editarCidade(txt)
      .salvarEAbrirPerfilNovamente(salvar)
      .verificarCidade(txt);
  }

  salvarEstadoEditado(txt: string, salvar: boolean) {
    this.editarEstado(txt)
      .salvarEAbrirPerfilNovamente(salvar)
      .verificarEstado(txt);
  }

  salvarPaisEditado(txt: string, salvar: boolean) {
    this.editarPais(txt).salvarEAbrirPerfilNovamente(salvar).verificarPais(txt);
  }

  clicarForaDoCampo(): this {
    cy.get(PerfilElements.tituloMeuPerfil).click();
    return this;
  }

  verificarSeExistemOsCamposLabels(txt: string[]): this {
    txt.forEach((label) => {
      cy.get(PerfilElements.campoLabel).should('contain.text', label);
    });
    return this;
  }

  verificarSeBotaoSalvarExiste(): this {
    cy.get(PerfilElements.salvarButton).should('be.visible');
    return this;
  }

  verificarSeBotaoVoltarExiste(): this {
    cy.get(PerfilElements.voltarButton).should('be.visible');
    return this;
  }

  verificarSeBotaoExculirPerfilExiste(): this {
    cy.get(PerfilElements.excluirPerfilButton).should('be.visible');
    return this;
  }

  acessaCadastrarLeitor(): this {
    cy.get(PerfilElements.cadastrarLeitorButton).should('be.visible').click();
    return this;
  }

  pularDadosPessoais(): this {
    cy.get(PerfilElements.pularDadosPessoaisButton)
      .should('be.visible')
      .click();
    return this;
  }

  clicarEmExcluirPerfil(): this {
    cy.get(PerfilElements.excluirPerfilButton)
      .should('be.visible')
      .click({ timeout: TIMEOUT });
    return this;
  }

  verificarSeModalExcluirPerfilEstaVisivel(txt: string): this {
    cy.get(PerfilElements.modalExcluirPerfil)
      .should('be.visible', { timeout: TIMEOUT })
      .and('contain.text', txt);
    return this;
  }

  fechaToast(): this {
    cy.get(PerfilElements.fechaToastButton)
      .should('be.visible')
      .click({ timeout: TIMEOUT });
    return this;
  }

  clicarEmConfirmarExcluir(): this {
    cy.get(PerfilElements.confirmarExcluirButton)
      .should('be.visible', { timeout: TIMEOUT })
      .click();
    return this;
  }

  validarPaginaDeLogin(): this {
    cy.url().should('include', '/', { timeout: TIMEOUT });
    return this;
  }

  preencherCampoCidade(cidade: string): this {
    cy.get(PerfilElements.cidadeInput)
      .should('be.visible', { timeout: TIMEOUT })
      .click({ timeout: TIMEOUT })
      .type(cidade)
      .clear({ timeout: TIMEOUT })
      .type(cidade);
    return this;
  }

  preencherCampoEstado(estado: string): this {
    cy.get(PerfilElements.estadoInput)
      .should('be.visible', { timeout: TIMEOUT })
      .click()
      .clear()
      .type(estado);
    return this;
  }

  preencherCampoPais(pais: string): this {
    cy.get(PerfilElements.paisInput)
      .should('be.visible', { timeout: TIMEOUT })
      .click()
      .clear()
      .type(pais);
    return this;
  }

  selecionarImagem(tipo: 'leve' | 'pesado' = 'leve'): this {
    cy.get(PerfilElements.fotoPerfilLabel).should('be.visible');
    cy.get(PerfilElements.imagemPerfilInput).selectFile(
      Fixtures.imagens[tipo],
      { force: true }
    );
    return this;
  }

  clicarEmAvancar(): this {
    cy.get(PerfilElements.avancarButton)
      .should('be.visible')
      .click({ timeout: TIMEOUT });
    return this;
  }

  clicarEmAvancarDesabilitado(): this {
    cy.get(PerfilElements.avancarButton).should('be.disabled', {
      timeout: TIMEOUT,
    });
    return this;
  }
}
