export type CredenciaisInvalidasData = {
  credenciaisInvalidas: {
    email: string;
    senha: string;
  };
};

export type CredenciaisSucessosData = {
  perfilLeitor: {
    email: string;
    senha: string;
  };
  perfilAdministrador: {
    email: string;
    senha: string;
  };
  perfilModerador: {
    email: string;
    senha: string;
  };
};

export type ValidacaoEmailSenhaData = {
  campoInvalido: {
    emailInvalido: string;
    emailSemArroba: string;
    senhaCurta: string;
  };
};
