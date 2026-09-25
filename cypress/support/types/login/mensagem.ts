export type ToastMensagem = {
  mensagemToast: {
    toastLoginSucesso: string;
    toastLogoutSucesso: string;
  };
};

export type ValidacaoEmailSenhaMsg = {
  campoLogin: {
    emailObrigatorio: string;
    emailInvalido: string;
    senhaMinimaObrigatoria: string;
    senhaMuitoCurta: string;
  };
};
