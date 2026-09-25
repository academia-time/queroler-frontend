export type MeuPerfilMensagem = {
  meuPerfil: {
    tituloPagina: string;
  };
};

export type CadastrarSucessoMsg = {
  cadastradoComSucesso: {
    usuarioCadastradoSucesso: string;
  };
};

export type ExcluirPerfilMsg = {
  excluirPerfil: {
    tituloModal: string;
    mensagemModal: string;
    botaoNao: string;
    botaoConfirmar: string;
  };
};
