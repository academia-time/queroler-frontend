export type EstruturaData = {
  camposDoMeuPerfil: {
    nomeCompleto: string;
    email: string;
    cpf: string;
    dataDeNascimento: string;
    cidade: string;
    estado: string;
    pais: string;
  };
};

export type VisualizarPerfil = {
  meuPerfil: {
    nome: string;
    email: string;
    cpf: string;
    dataDeNascimento: string;
    cidade: string;
    estado: string;
    pais: string;
  };
};

export type ExcluirPerfilData = {
  usuarioCadastrado: {
    email: string;
    senha: string;
  };
};

export type PerfilEditadoData = {
  perfilAdministradorEditado: {
    nome: string;
    email: string;
    cpf: string;
    dataDeNascimento: string;
    cidade: string;
    estado: string;
    pais: string;
  };
  perfilModeradorEditado: {
    nome: string;
    email: string;
    cpf: string;
    dataDeNascimento: string;
    cidade: string;
    estado: string;
    pais: string;
  };
  perfilLeitor2: {
    nome: string;
    email: string;
    cpf: string;
    dataDeNascimento: string;
    cidade: string;
    estado: string;
    pais: string;
  };
};
