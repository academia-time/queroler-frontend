export class CadastrarLeitorElements {
  static readonly logoQueroLer = '.mt-10.h-auto.w-auto.select-none.mx-auto';
  static readonly tituloCrieSuaConta = '.mb-8';
  static readonly registrarButton = '[data-testid="register-link"]';
  static readonly nomeInput = '[data-testid="input-nome"]';
  static readonly emailInput = '[data-testid="input-email"]';
  static readonly confirmaEmailInput = '[data-testid="input-confirmar-email"]';
  static readonly senhaInput = '[data-testid="input-senha"]';
  static readonly confirmaSenhaInput = '[data-testid="input-confirmarSenha"]';
  static readonly cpfUsuarioInput = '[data-testid="input-cpf"]';
  static readonly dataDeNascimentoInput =
    '[data-testid="input-data-nascimento"]';
  static readonly aceitoOsTermosCheckbox =
    '.relative.flex.items-center.justify-center';
  static readonly osTermosEPoliticaLabel = '.text-xs.text-zinc-300';
  static readonly cadastrarButton = '[data-testid="register-submit-button"]';
  static readonly erroMensagemToastLabel =
    '.Toastify__toast.Toastify__toast-theme--light.Toastify__toast--error';
  static readonly sucessoMensagemToastLabel =
    '.Toastify__toast.Toastify__toast-theme--light.Toastify__toast--success';
  static readonly campoObrigatorioLabel = '.mt-1.text-xs.text-red-400';
  static readonly modalTermosEPolitica = '.bg-card-bg.border.border-border';
  static readonly tituloModal = '.text-text-primary.mb-4';
  static readonly textoModal = '.flex-1.overflow-y-auto.whitespace-pre-line';
  static readonly fechaModal = '.bg-background-secondary.border';
  static readonly campoLabel = '.text-xs.font-medium';
  static readonly mostrarSenhaButton = '[aria-label="Mostrar senha"]';
  static readonly ocultarSenhaButton = '[aria-label="Ocultar senha"]';
}
