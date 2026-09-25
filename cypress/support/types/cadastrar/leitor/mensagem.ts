export type CadastrarLeitorInvalidosMensagem = {
  campoInvalidoLabel: {
    campoNomeInvalido: string;
    emailInvalido: string;
    emailsNaoCoincidem: string;
    cpfInvalido: string;
    senhaMinimoCaracteres: string;
    senhaDeveConterCaractereEspecial: string;
    senhaDeveConterNumero: string;
    senhasNaoCoincidem: string;
  };
};

export type DuplicidadeMensagem = {
  dadosJaCadastrado: {
    emailJaCadastrado: string;
    cpfJaCadastrado: string;
  };
  cadastradoComSucesso: {
    usuarioCadastradoSucesso: string;
  };
};

export type EstruturaMensagem = {
  campoObrigatorioNoCadastrarLeitor: {
    nomeObrigatorio: string;
    emailObrigatorio: string;
    confirmacaoEmailObrigatoria: string;
    senhaObrigatoria: string;
    confirmacaoSenhaObrigatoria: string;
    cpfObrigatorio: string;
    dataNascimentoObrigatoria: string;
    termosObrigatorio: string;
  };
  labelsCadastrarLeitor: {
    nome: string;
    cpf: string;
    email: string;
    confirmarEmail: string;
    senha: string;
    confirmarSenha: string;
    dataDeNascimento: string;
  };
  termosEPolitica: {
    concordaComOsTermos: string;
    termosDeServico: string;
    politicaDePrivacidade: string;
  };
};

export type DadosPessoaisMsg = {
  dadosPessoais: {
    tituloPagina: string;
    campoCidade: string;
    campoEstado: string;
    campoPais: string;
  };
};
