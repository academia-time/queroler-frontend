export type CampoInvalidosData = {
  cadastrarLeitorInvalidos: {
    nome: string;
    email: string;
    emailNaoCoincidem: string;
    senhaInvalida: string;
    senhaNaoCoincidem: string;
    cpfCurto: string;
    senhaSemCaracteresEspecial: string;
    senhaSemNumero: string;
    emailInvalido: string;
  };
};

export type DuplicidadeData = {
  usuarioCadastrado: {
    email: string;
    cpf: string;
  };
};
