export class CadastrarLivroElements {
  static readonly buscarLivroInput = '[data-testid="search-input"]';
  static readonly modalSimButton = '.flex-1.py-2.text-sm.text-white';
  static readonly logoQueroler = '.w-full.flex.items-center.justify-between';
  static readonly tituloIncrementeANossaBibliotecaText =
    '.text-text-primary.text-2xl';
  static readonly subtituloCadastreUmLivroText = '.text-text-subtitle.text-sm';
  static readonly textoSecundarioLabel = '.text-text-secondary.text-sm';
  static readonly imagemLivroInput = 'input[type="file"]';
  static readonly isbnInput = '[data-testid="input-isbn"]';
  static readonly tituloDoLivroInput = '[data-testid="input-titulo"]';
  static readonly autorInput = '[data-testid="input-autor"]';
  static readonly editoraInput = '[data-testid="input-editora"]';
  static readonly anoDePublicacaoInput = '[data-testid="input-ano"]';
  static readonly numeroDePaginasInput = '[data-testid="input-paginas"]';
  static readonly idiomaComboBox = '[data-testid="select-idioma"]';
  static readonly sinopseInput = '[data-testid="input-sinopse"]';
  static readonly cadastrarLivroButton = '[data-testid="btn-salvar"]';
  static readonly cancelarCadastroButton = '[data-testid="btn-cancelar"]';
  static readonly fechaToastButton = '[aria-label="close"]';
  static readonly mensagemErrorToastLabel =
    '.Toastify__toast.Toastify__toast--error';
  static readonly mensagemSucessoToastLabel =
    '.Toastify__toast.Toastify__toast--success';
  static readonly avisoErroLabel = '.mt-1.text-xs.text-red-400';
  static readonly camposLabel = '.text-text-primary.text-xs.tracking-widest';
  static readonly capaDoLivroLabel = '.text-brand.text-xs.tracking-widest';
}
