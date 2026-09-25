class LoginElemento {
  emailCampo = () => '#email';
  senhaCampo = () => '#senha';
  entrarBotao = () => '[data-testid="login-submit-button"]';
  cadastreSeLink = () => 'a[href="/register"]';
  erroMensagem = () => '[role="alert"]';
  bemVindoTexto = () => '.mb-8';
}

export default LoginElemento;
