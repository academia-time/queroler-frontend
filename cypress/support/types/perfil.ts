export type Credenciais = {
  email: string;
  senha: string;
};

export type Perfil = {
  perfilAdministrador2: Credenciais;
  perfilModerador2: Credenciais;
  perfilLeitor2: Credenciais;
};
