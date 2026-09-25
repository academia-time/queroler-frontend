# Quero Ler Frontend

Aplicação frontend moderna para a plataforma Quero Ler, construída com as tecnologias mais recentes do ecossistema React/Next.js.

## Objetivo

A plataforma Quero Ler é uma aplicação social dedicada a usuários que desejam adquirir e manter o hábito de leitura. Os principais recursos incluem:

### Para Leitores

- **Adicionar livros** que deseja ler
- **Metas de leitura** personalizadas
- **Avaliação** dos livros lidos
- **Comentários** sobre a leitura com controle de privacidade:
  - 🔒 Privado
  - 👥 Apenas grupo de amigos
  - 🌐 Público

### Clubes de Leitura

- Criar clubes de leitura
- Leitura conjunta de um mesmo livro
- Marcar encontros presenciais ou online

### Perfis Administrativos

- **Administrador**: Incluir documentos e excluir usuários
- **Moderador**: Excluir comentários que não estão de acordo com as diretrizes

## 🚀 Tecnologias

- **Next.js** 16.2.1 - Framework React com SSR e otimizações
- **React** 19.2.4 - Biblioteca UI
- **TypeScript** 5 - Tipagem estática e segurança de código
- **Tailwind CSS** 4 - Utility-first CSS framework
- **Jest** 30.3.0 - Framework de testes
- **Testing Library** 16.3.2 - Testes de componentes React
- **Cypress** 15.13.0 - Testes end-to-end (E2E)
- **ESLint** 9 - Análise estática de código
- **Prettier** 3.8.1 - Formatação de código
- **CommitLint** 20.5.0 - Validação de mensagens de commit
- **Lefthook** 2.1.4 - Git hooks manager
- **Lucide React** 1.6.0 - Biblioteca de ícones

## 📋 Requisitos

- **Node.js**: 20.12.2 ou superior
- **npm**: 10.5.0 ou superior

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd queroler-frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure os Git hooks (Lefthook):

```bash
npx lefthook install
```

## 📊 Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev        # Inicia servidor de desenvolvimento (localhost:3000)
npm run build      # Build de produção
npm start          # Inicia servidor de produção
```

### Qualidade de Código

```bash
npm run lint       # Executa ESLint
npm run format     # Formata código com Prettier
npm run typecheck  # Verifica tipos TypeScript
```

### Testes

```bash
npm test           # Executa testes com Jest
npm run test:coverage  # Executa testes com coverage
npm run test:e2e   # Executa testes E2E em modo headless
npm run test:e2e:open  # Abre Cypress em modo interativo
```

## 📁 Estrutura do Projeto

```
src/
├── app/                           # Camada de entrada do Next.js (rotas, layouts e server actions)
│   ├── actions/                   # Actions server-side usadas pelos fluxos da UI
│   ├── api/                       # Rotas de API do Next.js, quando necessário
│   ├── layout.tsx                 # Layout raiz e providers globais
│   └── page.tsx                   # Página inicial
├── core/                          # Regras de negócio e contratos do domínio
│   ├── application/               # Casos de uso e DTOs
│   └── domain/                    # Entidades, enums e interfaces de repositório
├── infra/                         # Implementações concretas de integração externa
│   ├── http/                      # Cliente HTTP compartilhado
│   └── repositories/              # Implementação dos repositórios que falam com o backend
├── presentation/                  # Camada de UI
│   ├── pages/                     # Páginas/fluxos de tela
│   ├── shared/                    # Componentes, hooks, context e utilitários de UI
│   └── ui-model/                  # Modelos usados pela apresentação
├── styles/                        # Estilos globais
└── tests/                         # Testes unitários e mocks

cypress/                           # Testes E2E com Cypress
└── support/                       # Comandos e setup global
```

## 🧱 Arquitetura e Integração com o Backend

O projeto segue uma organização inspirada em Clean Architecture para separar responsabilidade e facilitar manutenção.

### `app/`

- Ponto de entrada do Next.js.
- Contém layouts, páginas e server actions.
- As server actions concentram chamadas que precisam rodar no servidor, como login e criação de usuário.

### `core/`

- Onde ficam as regras de negócio.
- `application/` contém os casos de uso e os DTOs de entrada/saída.
- `domain/` define contratos, entidades e tipos que não dependem de framework.

### `infra/`

- Implementa a comunicação com recursos externos.
- `http/` centraliza o cliente Axios usado nas requisições ao backend.
- `repositories/` contém as implementações concretas dos contratos definidos no domínio.
- Exemplo: o login envia `user` e `senha` para o backend e lê o cookie `jwt` retornado em `Set-Cookie`.

### `presentation/`

- Responsável pela interface e pela experiência do usuário.
- `pages/` organiza as telas por fluxo.
- `shared/` concentra componentes reutilizáveis, contextos e utilitários visuais.
- O estado de autenticação fica exposto via Context API para uso em qualquer componente client.

### Fluxo de autenticação

1. O usuário preenche o formulário de login na camada de apresentação.
2. A action server-side chama o caso de uso em `core/application`.
3. O repositório em `infra/repositories` faz a requisição para o backend.
4. O backend responde com cookie `jwt` em `Set-Cookie`.
5. A aplicação grava esse cookie HttpOnly e propaga o estado de autenticação no Context API.
6. As próximas requisições server-side reutilizam o cookie para enviar o usuário autenticado.

## ⚙️ Configurações

### ESLint (`eslint.config.mjs`)

- Configurações Next.js (core-web-vitals e typescript)
- Plugin customizado: **no-relative-import-paths**
  - Força uso de alias `@/` em vez de imports relativos
  - `rootDir`: src
- Regras customizadas:
  - `@typescript-eslint/no-unused-vars`: Aviso para argumentos/vars não usadas (prefixo `_`)
  - `no-console`: Erro em console.log

### Prettier (`.prettierrc`)

- Formatação automática de código
- Integrado com ESLint

### CommitLint (`commitlint.config.cjs`)

- Segue padrão **Conventional Commits**
- Tipos: feat, fix, docs, style, refactor, test, chore, ci
- Validação automática via Git hook

### Jest (`jest.config.ts`)

- Ambiente: jsdom
- Setup: `jest.setup.ts` (polyfills para TextEncoder/TextDecoder e crypto)
- Module mapping: `@/*` resolvido via `<rootDir>/src/*`
- Coverage ignora: node_modules, .next, e componentes UI

### Cypress (`cypress.config.ts`)

- `baseUrl`: `http://localhost:3000`
- `specPattern`: `e2e/**/*.cy.{js,jsx,ts,tsx}`
- `supportFile`: `cypress/support/e2e.ts`

## 🪝 Git Hooks (Lefthook)

Configurado automaticamente ao instalar dependências:

### Pre-commit

- ✅ **Prettier**: Formata arquivos staged
- ✅ **ESLint**: Lint com auto-fix

### Commit-msg

- ✅ **CommitLint**: Valida mensagem de commit

### Pre-push

- ✅ **Type Check**: Verifica tipos TypeScript
- ✅ **Tests**: Executa testes com coverage

## 🧪 Testes

### Estrutura

- Testes unitários junto aos componentes (`.spec.tsx`)
- Setup customizado via `src/lib/test-utils.tsx`
- Imports utilizando `@/lib/test-utils` em vez de `@testing-library/react`
- Testes E2E na raiz em `e2e/**/*.cy.ts`

### Testes E2E (Cypress)

1. Inicie a aplicação local:

```bash
npm run dev
```

2. Em outro terminal, execute os testes E2E:

```bash
npm run test:e2e
```

Ou abra a interface do Cypress:

```bash
npm run test:e2e:open
```

### Exemplo E2E

- Arquivo: `e2e/example.cy.ts`
- Cenário atual: acessa `/` e valida o título `Login`

### Exemplo

```tsx
import { render, screen } from '@/lib/test-utils';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## 🎨 Variáveis CSS Globais

Definidas em `src/app/globals.css`:

- `--color-background`: Cor de fundo principal
- `--color-foreground`: Cor de primeiro plano
- `--color-brand`: Cor de marca
- `--color-text-primary`: Texto principal
- `--color-text-secondary`: Texto secundário
- Cores de status: desired, active, consulting, pause
- Cores temáticas: dark-purple, card-bg, border

## 📝 Utilitários

### `cn()` - Merge de classes Tailwind

```tsx
import { cn } from '@/lib/utils';

// Combina e resolve conflitos de classes Tailwind
const buttonClass = cn('px-4 py-2 rounded', isActive && 'bg-blue-500');
```

## 🚦 Como Contribuir

1. Crie uma branch para sua feature:

```bash
git checkout -b feat/minha-feature
```

2. Faça commits seguindo Conventional Commits:

```bash
git commit -m "feat(login): adicionar validação de email"
```

3. Push para a branch:

```bash
git push origin feat/minha-feature
```

4. Abra um Pull Request

## 📌 Boas Práticas

- ✅ Use alias `@/` para imports (ESLint valida)
- ✅ Escreva testes para novos componentes
- ✅ Sempre utilize o atributo `data-testid` em elementos interativos (inputs, botões, links, etc) para facilitar a seleção em testes unitários e E2E. Padronize nomes como `data-testid="input-email"`, `data-testid="login-submit-button"` etc.
- ✅ Mantenha TypeScript strict mode habilitado
- ✅ Formate código com Prettier antes de commitar
- ✅ Siga Conventional Commits para mensagens
- ✅ Evite `console.log` desnecessários (ESLint valida)

### Fluxo recomendado de atualização de branch

1. Sempre atualize sua branch a partir da master antes de subir alterações:

```bash
git checkout master
git pull origin master
git checkout sua-branch
git rebase master
# Resolva conflitos se houver
git push --f
```

2. Isso garante que seu código está atualizado com a base principal e evita conflitos no Pull Request.

## 🔍 Variáveis de Ambiente

O projeto suporta arquivo `.env.local` para variáveis de ambiente (exemplo):

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Em produção, a variável deve apontar para o backend publicado, por exemplo:

```bash
NEXT_PUBLIC_API_URL=https://queroler-backend-production.up.railway.app
```

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Jest Documentation](https://jestjs.io)
- [Figma do projeto](https://www.figma.com/design/uudHwRWGRUEJ3rFkvBB6Sm/Sem-t%C3%ADtulo?node-id=0-1&p=f&t=fOdXlUWC83veuFl8-0)

## 📑 Padrão de nomes de branch

Para garantir organização e rastreabilidade, utilize o seguinte padrão ao criar branches:

- `feat/nome-da-tarefa` – novas funcionalidades
- `fix/nome-da-tarefa` – correções de bugs
- `chore/nome-da-tarefa` – tarefas de manutenção
- `refactor/nome-da-tarefa` – refatorações
- `test/nome-da-tarefa` – testes
- `docs/nome-da-tarefa` – documentação
- `ci/nome-da-tarefa` – integração contínua
- `build/nome-da-tarefa` – ajustes de build
- `perf/nome-da-tarefa` – melhorias de performance
- `style/nome-da-tarefa` – ajustes de formatação/estilo

Exemplo válido: `feat/login-form`

Commits e pushes serão bloqueados caso o nome da branch não siga esse padrão.
