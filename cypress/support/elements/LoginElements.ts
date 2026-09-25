export class LoginElements {
  static readonly tituloBemVindoText = '[data-testid="login-header"]';
  static readonly formularioLogin = '[data-testid="login-form"]';
  static readonly cabecalhoLogin = '[data-testid="login-header"]';

  static readonly emailInput = '[data-testid="input-email"]';
  static readonly senhaInput = '[data-testid="input-senha"]';
  static readonly entrarButton = '[data-testid="login-submit-button"]';

  static readonly esqueceuSenhaLink = '[data-testid="forgot-password-link"]';
  static readonly cadastreSeLink = '[data-testid="register-link"]';
  static readonly cadastreSeSecao = '[data-testid="register-section"]';

  static readonly erroMensagem = '.mt-1.text-xs.text-red-400';

  static readonly mostrarSenhaButton = '[aria-label="Mostrar senha"]';
  static readonly ocultarSenhaButton = '[aria-label="Ocultar senha"]';

  static readonly toastErrorLabel = '.Toastify__toast--error';
  static readonly toast = '.Toastify__toast';
}
