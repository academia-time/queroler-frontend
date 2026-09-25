export class HomeElements {
  static readonly menuUsuarioTriggerButton =
    '[data-testid="user-menu-trigger"]';
  static readonly logoutButton = '[data-testid="logout-button"]';
  static readonly logoQueroLer = '[alt="Quero Ler"]';
  static readonly sinoIconButton = '[data-testid="bell-icon"]';
  static readonly meuPerfilButton = '[data-testid="profile-button"]';
  static readonly toast = '.Toastify__toast';
  static readonly fechaToastButton = '.Toastify__close-button';

  static readonly fotoDoUsuarioIcon =
    '.w-8.h-8.rounded-full.bg-brand.flex.items-center.justify-center';
  static readonly nomeDoUsuarioText =
    '[data-testid="user-menu-trigger"] [class="text-text-primary text-sm hidden lg:block"]';

  static readonly barraDePesquisa = '[data-testid="search-input"]';
  static readonly pesquisaCombobox = '[class="relative w-[20px] lg:w-[110px]"]';
  static readonly tipoPesquisaCombobox =
    '[class="w-full text-left px-4 py-2 text-sm rounded-lg flex items-center justify-between text-text-primary hover:opacity-80"]';
  static readonly caixaPesquisaCombobox =
    '[class="absolute right-0 mt-2 w-[110px] bg-card-bg border border-border rounded-lg shadow-lg z-50 flex flex-col p-1 flex flex-col p-1"]';
  static readonly livrosPesquisados =
    '[class="text-text-primary text-base font-bold truncate group-hover:text-text-primary/90 transition-colors"]';
  static readonly botaoVerTodosOsResultados =
    '[class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-text-primary bg-search-border border border-border rounded-md hover:opacity-90 transition-all cursor-pointer shadow-xs"]';
  static readonly botaoPaginacao = '[class="flex items-center gap-1"]';
  static readonly ate5LivrosPesquisados =
    '[class="text-text-primary text-base font-semibold truncate group-hover:text-text-primary/90 transition-colors"]';
}
