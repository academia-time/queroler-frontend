/// <reference types="cypress" />

import { CadastrarLeitorElements } from '../elements/CadastrarLeitorElements';

type DadosLeitor = {
  nome?: string;
  email?: string;
  confirmarEmail?: string;
  senha?: string;
  confirmarSenha?: string;
  cpf?: string;
  dataNascimento?: string;
};

const TIMEOUT = 30000;

export class CadastrarLeitorPage {
  visitarPaginaCadastrarDeLeitor(): this {
    cy.visit('/register');
    return this;
  }

  verificarPaginaCarregada(): this {
    const elementos = [
      CadastrarLeitorElements.logoQueroLer,
      CadastrarLeitorElements.tituloCrieSuaConta,
      CadastrarLeitorElements.nomeInput,
      CadastrarLeitorElements.emailInput,
      CadastrarLeitorElements.confirmaEmailInput,
      CadastrarLeitorElements.senhaInput,
      CadastrarLeitorElements.confirmaSenhaInput,
      CadastrarLeitorElements.cpfUsuarioInput,
      CadastrarLeitorElements.dataDeNascimentoInput,
      CadastrarLeitorElements.aceitoOsTermosCheckbox,
      CadastrarLeitorElements.osTermosEPoliticaLabel,
      CadastrarLeitorElements.cadastrarButton,
    ];

    elementos.forEach((elemento) => {
      cy.get(elemento).should('be.visible');
    });

    return this;
  }

  clicarEmCadastreSe(): this {
    cy.get(CadastrarLeitorElements.registrarButton)
      .should('be.visible')
      .click();
    return this;
  }

  preencherFormulario(dados: DadosLeitor): this {
    if (dados.nome) {
      cy.get(CadastrarLeitorElements.nomeInput)
        .should('be.visible')
        .type(dados.nome);
    }
    if (dados.email) {
      cy.get(CadastrarLeitorElements.emailInput)
        .should('be.visible')
        .type(dados.email);
    }
    if (dados.confirmarEmail) {
      cy.get(CadastrarLeitorElements.confirmaEmailInput)
        .should('be.visible')
        .type(dados.confirmarEmail);
    }
    if (dados.senha) {
      cy.get(CadastrarLeitorElements.senhaInput)
        .should('be.visible')
        .type(dados.senha);
    }
    if (dados.confirmarSenha) {
      cy.get(CadastrarLeitorElements.confirmaSenhaInput)
        .should('be.visible')
        .type(dados.confirmarSenha);
    }
    if (dados.cpf) {
      cy.get(CadastrarLeitorElements.cpfUsuarioInput)
        .should('be.visible')
        .type(dados.cpf);
    }
    if (dados.dataNascimento) {
      cy.get(CadastrarLeitorElements.dataDeNascimentoInput)
        .should('be.visible')
        .type(dados.dataNascimento);
    }
    return this;
  }

  verificarOsTermosDeServico(msg: string[]): this {
    msg.forEach((txt) => {
      cy.get(CadastrarLeitorElements.osTermosEPoliticaLabel).should(
        'contain.text',
        txt
      );
    });

    return this;
  }

  clicarEmAceitarTermosDeUso(): this {
    cy.get(CadastrarLeitorElements.aceitoOsTermosCheckbox)
      .should('be.visible')
      .click();
    return this;
  }

  clicarEmCadastrar(): this {
    cy.get(CadastrarLeitorElements.cadastrarButton)
      .should('be.visible')
      .click();
    return this;
  }

  verificarMensagemJaCadastrado(msg: string): this {
    cy.get(CadastrarLeitorElements.erroMensagemToastLabel)
      .should('be.visible', { timeout: TIMEOUT })
      .and('contain.text', msg);
    return this;
  }

  verificarMensagemCadastroSucesso(msg: string): this {
    cy.get(CadastrarLeitorElements.sucessoMensagemToastLabel)
      .should('be.visible', { timeout: TIMEOUT })
      .and('contain.text', msg);
    return this;
  }

  clicaOsCamposObrigatorios(): this {
    const campos = [
      CadastrarLeitorElements.nomeInput,
      CadastrarLeitorElements.emailInput,
      CadastrarLeitorElements.confirmaEmailInput,
      CadastrarLeitorElements.senhaInput,
      CadastrarLeitorElements.confirmaSenhaInput,
      CadastrarLeitorElements.cpfUsuarioInput,
      CadastrarLeitorElements.dataDeNascimentoInput,
    ];

    campos.forEach((campo) => {
      cy.get(campo).click();
    });

    cy.get(CadastrarLeitorElements.aceitoOsTermosCheckbox).dblclick();
    cy.get(CadastrarLeitorElements.confirmaSenhaInput).click();

    return this;
  }

  verificarMensagensCamposObrigatorios(...mensagens: string[]): this {
    mensagens.forEach((msg) => {
      cy.get(CadastrarLeitorElements.campoObrigatorioLabel)
        .should('be.visible')
        .and('contain.text', msg);
    });
    return this;
  }

  verificarOBotaoCadastrarInativo(): this {
    cy.get(CadastrarLeitorElements.cadastrarButton).should('be.disabled');
    return this;
  }

  verificaAcessaOModalOsTermosEPolitica(txt: string): this {
    cy.contains('button', new RegExp(`^${txt}$`))
      .should('be.visible')
      .click();
    cy.get(CadastrarLeitorElements.modalTermosEPolitica).should('be.visible');
    cy.get(CadastrarLeitorElements.tituloModal)
      .should('be.visible')
      .and('contain.text', txt);

    this.scrollModalAteOFinal();

    cy.get(CadastrarLeitorElements.fechaModal).should('be.visible').click();
    return this;
  }

  private scrollModalAteOFinal(): void {
    cy.get(CadastrarLeitorElements.textoModal)
      .should('be.visible')
      .scrollTo('bottom')
      .then(($el) => {
        const scrollTop = $el[0].scrollTop;
        expect(scrollTop).to.be.greaterThan(0);
      });
  }

  verificarLabelsDosCampos(msg: string[]): this {
    msg.forEach((txt) => {
      cy.get(CadastrarLeitorElements.campoLabel).should('contain.text', txt);
    });
    return this;
  }

  visibilidadeDaSenha(): this {
    cy.get(CadastrarLeitorElements.mostrarSenhaButton)
      .first()
      .should('be.visible')
      .click();
    return this;
  }

  ocultarSenha(): this {
    cy.get(CadastrarLeitorElements.ocultarSenhaButton)
      .first()
      .should('be.visible')
      .click();
    return this;
  }

  visibilidadeConfirmarSenha(): this {
    cy.get(CadastrarLeitorElements.mostrarSenhaButton)
      .eq(1)
      .should('be.visible')
      .click();
    return this;
  }

  ocultaConfirmarSenha(): this {
    cy.get(CadastrarLeitorElements.ocultarSenhaButton)
      .eq(0)
      .should('be.visible')
      .click();
    return this;
  }
}
