# AGENTE.md — Diretrizes, Arquitetura e Regras do Projeto (`code-connect`)

Este documento é a **fonte única de verdade** para agentes de IA e desenvolvedores que atuam no projeto **Code Connect**. Todas as implementações, refatorações e revisões de código devem seguir estritamente as regras de **Clean Code**, **Atomic Design** e **Clean Architecture / Hexagonal** definidas abaixo.

---

## 1. Visão Geral e Arquitetura do Monorepo

O **Code Connect** é um **Monorepo** baseado em **NPM Workspaces** (`apps/*` e `packages/*`), isolando cliente, servidor e contratos compartilhados:

- **Gerenciador de Pacotes:** `npm` (com workspaces nativos na raiz).
- **Orquestração em Desenvolvimento:** `concurrently` na raiz para levantar backend e frontend simultaneamente.

### 1.1. Regra de Compartilhamento (`packages/shared`)
- `apps/frontend` e `apps/backend` **nunca** devem importar arquivos diretamente um do outro.
- Todo contrato de dados compartilhado — **DTOs**, **Interfaces de Request/Response**, **Schemas de Validação (ex.: Zod)** e **Constantes de Domínio** — deve residir no pacote compartilhado `packages/shared` (importado como `@code-connect/shared`).

### 1.2. Estrutura Alvo do Monorepo

```text
code-connect/
├── apps/
│   ├── backend/                  # API REST (Node.js + Express + TS + Clean/Hexagonal Arch)
│   │   ├── src/
│   │   │   ├── domain/           # Entidades, Value Objects e Erros de Domínio puros
│   │   │   ├── application/      # Use Cases (Interactors), Ports (Interfaces) e DTOs
│   │   │   ├── infrastructure/   # Repositórios concretos, Banco de Dados, Providers e DI
│   │   │   ├── presentation/     # Controllers HTTP, Rotas Express e Middlewares
│   │   │   └── index.ts          # Bootstrap do servidor
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── frontend/                 # SPA (React 18 + Vite 6 + TS + Tailwind CSS + Atomic Design)
│       ├── src/
│       │   ├── components/
│       │   │   ├── atoms/        # Nível 1: Blocos indivisíveis (Button, Input, Badge...)
│       │   │   ├── molecules/    # Nível 2: Composições simples (FormField, StatusItem...)
│       │   │   ├── organisms/    # Nível 3: Seções completas (Header, HealthStatusCard...)
│       │   │   └── templates/    # Nível 4: Layouts estruturais de página sem dados reais
│       │   ├── pages/            # Nível 5: Páginas concretas que conectam dados aos templates
│       │   ├── hooks/            # Custom Hooks globais/compartilhados (use*.ts)
│       │   ├── services/         # Clientes HTTP e comunicação com a API (/api/*)
│       │   ├── types/            # Tipos exclusivos da camada de UI
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   └── index.css         # Diretivas do Tailwind CSS e estilos base globais
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
├── packages/
│   └── shared/                   # Contratos compartilhados (@code-connect/shared)
│       ├── src/
│       │   ├── dtos/             # Tipos de payload e resposta entre Front e Back
│       │   ├── schemas/          # Schemas de validação (ex.: Zod)
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
├── package.json                  # Configuração de workspaces e scripts globais
└── AGENTE.md                     # Regras e contexto do projeto para agentes
```

---

## 2. Stack Tecnológica e Comandos

### 2.1. Backend (`apps/backend`)
- **Runtime & Módulos:** Node.js com ES Modules (`"type": "module"`).
- **TypeScript:** `^5.7.2` com `module: "NodeNext"`, `target: "ES2022"` e `strict: true`.
- **Servidor HTTP:** Express (`^4.21.2`) com `cors`, `express.json()` e variáveis via `dotenv` (porta padrão: `3001`).
- **Dev Runner:** `tsx watch`.

### 2.2. Frontend (`apps/frontend`)
- **UI & Bundler:** React 18 (`^18.3.1`) + Vite 6 (`^6.0.5`).
- **Estilização:** **Tailwind CSS** (classes utilitárias diretamente nos componentes).
- **TypeScript:** `^5.7.2` com `strict: true`, `noUnusedLocals: true` e `noUnusedParameters: true`.
- **Porta e Proxy:** Porta `5173`, redirecionando `/api/*` para `http://localhost:3001`.

### 2.3. Comandos na Raiz
- `npm run dev` — Inicia backend (`:3001`) e frontend (`:5173`) simultaneamente.
- `npm run dev:backend` — Inicia apenas o backend em modo watch.
- `npm run dev:frontend` — Inicia apenas o servidor Vite do frontend.
- `npm run build` — Compila todos os workspaces (`--workspaces`).
- `npm run start` — Inicia o build de produção do backend (`dist/index.js`).

> **Regra de Instalação de Pacotes:** Sempre instale dependências no workspace específico usando `--workspace=backend`, `--workspace=frontend` ou `--workspace=@code-connect/shared`. Na raiz (`-D`), instale apenas ferramentas globais ao monorepo.

---

## 3. Regras Obrigatórias de Clean Code (Frontend & Backend)

Todas as contribuições devem obedecer aos seguintes princípios:

### 3.1. Limites de Tamanho e Responsabilidade Única (SRP)
1. **Funções e Métodos Curtos:** Cada função ou método deve fazer **apenas uma coisa** e ter no máximo **~20 linhas**. Se passar disso, extraia funções auxiliares privadas com nomes semânticos.
2. **Arquivos Enxutos:** Nenhum arquivo deve ultrapassar **~150 a 200 linhas**. Quando um arquivo crescer demais, divida-o em subcomponentes, hooks, casos de uso ou módulos menores.

### 3.2. Early Return (Guard Clauses) e Controle de Fluxo
1. **Use Guard Clauses:** Valide condições de erro, nulos ou casos de borda no topo da função e retorne/lance imediatamente.
2. **Proibido `else` Desnecessário:** Nunca utilize `else` após um `if` que contenha `return`, `throw`, `continue` ou `break`.
3. **Limite de Indentação:** O nível máximo de aninhamento de blocos (`if`, `for`, `try`) dentro de uma função é de **2 níveis**.

```typescript
// ❌ ERRADO: Aninhamento profundo e else desnecessário
function getStatusLabel(response: HealthResponse | null): string {
  if (response) {
    if (response.status === 'ok') {
      return 'Sistema Operacional';
    } else {
      return 'Sistema Instável';
    }
  } else {
    return 'Sem resposta';
  }
}

// ✅ CORRETO: Guard Clauses e fluxo plano
function getStatusLabel(response: HealthResponse | null): string {
  if (!response) return 'Sem resposta';
  if (response.status !== 'ok') return 'Sistema Instável';

  return 'Sistema Operacional';
}
```

### 3.3. Assinatura e Parâmetros de Função
1. **Máximo de 2 a 3 Parâmetros:** Se uma função precisar de mais de 3 argumentos, agrupe-os em um único objeto tipado (`interface` ou `DTO`).
2. **Proibido Boolean Flags em Parâmetros:** Nunca passe um booleano (ex.: `fetchUsers(true)`) para mudar o fluxo interno de uma função. Crie duas funções com nomes explícitos (ex.: `fetchActiveUsers()` e `fetchAllUsers()`) ou passe um objeto de opções/union type claro.

### 3.4. Nomenclatura Semântica Estrita
1. **Variáveis Booleanas:** Devem sempre começar com prefixos afirmativos como `is`, `has`, `can` ou `should` (ex.: `isLoading`, `hasError`, `canSubmit`, `shouldRetry`).
2. **Funções e Métodos:** Sempre no formato `verbo + substantivo` indicando claramente a ação e o alvo (ex.: `calculateTotalOrder`, `validateUserEmail`, `fetchHealthStatus`).
3. **Proibido Abreviações:** Escreva nomes completos e legíveis (`user` em vez de `usr`, `button` em vez de `btn`, `error` em vez de `err` em contextos públicos, `response` em vez de `res` fora de assinaturas padrão Express).
4. **Proibido Magic Numbers e Magic Strings:** Qualquer número ou string literal com significado de regra de negócio, tempo ou limite deve ser extraído para uma constante em `UPPER_SNAKE_CASE` (ex.: `const DEFAULT_TIMEOUT_MS = 5000;`).

### 3.5. Tipagem Estrita e Comentários
1. **Proibido `any`:** O uso de `any` é proibido. Utilize tipos concretos, generics ou `unknown` com *type narrowing*.
2. **Zero Variáveis Órfãs:** Respeite `noUnusedLocals` e `noUnusedParameters`. Parâmetros posicionais obrigatórios não utilizados (como `_req` no Express) devem ser prefixados com `_`.
3. **Código Autodocumentado:** Não escreva comentários explicando *"o quê"* o código faz (o nome da função e das variáveis já deve dizer isso). Use comentários apenas para explicar *"o porquê"* de uma decisão arquitetural ou restrição externa não óbvia.

---

## 4. Regras de Arquitetura Frontend: Atomic Design + Tailwind CSS

O Frontend (`apps/frontend`) segue estritamente a metodologia **Atomic Design em 5 níveis**, estilizada com **Tailwind CSS** e com separação total entre **Apresentação (JSX)** e **Lógica (Custom Hooks)**.

### 4.1. Os 5 Níveis do Atomic Design

| Nível | Diretório | O que é | Regras Estritas |
| :--- | :--- | :--- | :--- |
| **1. Atoms** | `src/components/atoms/` | Menores elementos indivisíveis da interface (`Button`, `Input`, `Badge`, `Spinner`, `Typography`, `Icon`). | **100% Stateless (burros).** Recebem dados e callbacks exclusivamente via `props`. Não conhecem regras de negócio, rotas nem fazem chamadas de API. |
| **2. Molecules** | `src/components/molecules/` | Combinação simples de 2 ou mais átomos com propósito único (`FormField`, `SearchBar`, `StatusMetricItem`). | Reutilizáveis e focados em UI. Não podem fazer chamadas HTTP nem acessar estado de negócio global. |
| **3. Organisms** | `src/components/organisms/` | Seções completas e distintas da interface (`Navbar`, `HealthStatusCard`, `UserForm`). | Compõem átomos e moléculas. Podem receber handlers e dados complexos, mas **não fazem `fetch` direto no componente** (toda lógica vem das Pages ou de Custom Hooks). |
| **4. Templates** | `src/components/templates/` | Esqueletos de layout de página (`MainLayoutTemplate`, `DashboardTemplate`). | Definem apenas posicionamento, grids, espaçamentos e regiões (`children` ou slots tipados). **Nunca contêm dados reais ou chamadas de API.** |
| **5. Pages** | `src/pages/` | Telas finais da aplicação (`HomePage`, `NotFoundPage`). | **Único nível** que conecta os **Custom Hooks de dados/API** aos **Templates** e **Organisms**. |

> **Regra de Dependência entre Níveis:** Um nível inferior **nunca** pode importar um nível superior (ex.: uma `molecule` só pode importar `atoms`; um `organism` só pode importar `molecules` e `atoms`).

### 4.2. Estrutura de Pasta Obrigatória por Componente
Todo componente (de `atoms` até `pages`) deve possuir sua própria pasta em `PascalCase` contendo o arquivo do componente, um barrel file `index.ts` e, quando houver lógica associada, seu próprio Custom Hook:

```text
src/components/organisms/HealthStatusCard/
├── HealthStatusCard.tsx      # Apenas JSX declarativo e tipagem de Props
├── useHealthStatusCard.ts    # (Opcional) Hook local se o organismo tiver lógica de UI própria
└── index.ts                  # export { HealthStatusCard } from './HealthStatusCard';
                              # export type { HealthStatusCardProps } from './HealthStatusCard';
```

- **Named Exports:** Prefira `export function ComponentName(...)` em vez de `export default`, facilitando refatorações e autocomplete consistente.

### 4.3. Separação de Lógica com Custom Hooks (`use*.ts`)
1. **Componentes Limpos:** Arquivos `.tsx` não devem conter blocos de `fetch`, transformação pesada de dados ou múltiplos `useEffect` complexos.
2. **Custom Hooks:** Toda comunicação com `src/services/`, controle de estados assíncronos (`isLoading`, `error`, `data`) e efeitos colaterais devem ser encapsulados em Custom Hooks (ex.: `useHealthCheck.ts` em `src/hooks/` ou junto da Page correspondente).
3. **Três Estados Obrigatórios:** Toda interface que consome dados assíncronos deve tratar explicitamente:
   - `isLoading` (exibindo Skeleton ou Spinner)
   - `error` (exibindo feedback claro em `pt-BR`)
   - `data` (renderizando o estado de sucesso)

### 4.4. Estilização com Tailwind CSS
1. **Utilitários Tailwind:** Estilize componentes utilizando classes utilitárias do Tailwind CSS diretamente no atributo `className`.
2. **Sem CSS avulso por componente:** Não crie arquivos `.css` separados para componentes individuais. O arquivo `src/index.css` deve conter apenas as diretivas/imports do Tailwind e tokens globais de tema.
3. **Legibilidade de Classes:** Se uma string de `className` ficar muito extensa ou tiver muitas variações condicionais, extraia os estilos base e variantes para um objeto constante ou função utilitária no próprio arquivo antes do componente.

---

## 5. Regras de Arquitetura Backend: Clean Architecture / Hexagonal Estrita

O Backend (`apps/backend`) adota **Clean Architecture combinada com Ports & Adapters (Arquitetura Hexagonal)**.

### 5.1. A Regra de Dependência
As dependências de código apontam **exclusivamente para o centro (`domain`)**:

$$\text{Presentation / Infrastructure} \longrightarrow \text{Application (Use Cases \& Ports)} \longrightarrow \text{Domain}$$

1. **`domain/` (Núcleo de Negócio):**
   - Contém `entities/`, `value-objects/` e `errors/` (erros de domínio puros).
   - **Zero dependências externas:** É estritamente proibido importar `express`, drivers de banco de dados, variáveis de ambiente ou bibliotecas de infraestrutura dentro de `domain/`.
2. **`application/` (Casos de Uso e Portas):**
   - `use-cases/`: Cada caso de uso representa uma única ação do sistema (ex.: `GetSystemHealthUseCase`), contendo um método público `execute(...)`.
   - `ports/`: Interfaces puras TypeScript (ex.: `IUserRepository`, `ILoggerProvider`) que definem os contratos que a camada de aplicação exige do mundo externo.
   - Depende apenas de `domain/` e dos contratos de `packages/shared`.
3. **`infrastructure/` (Adapters Out / Detalhes Técnicos):**
   - Implementa concretamente as interfaces definidas em `application/ports/` (ex.: repositórios de banco de dados, clientes de APIs externas, configurações de ambiente).
   - Contém os *factories* ou container de **Injeção de Dependência (DI)** que instanciam os repositórios e os injetam nos casos de uso.
4. **`presentation/` (Adapters In / Camada HTTP):**
   - `http/controllers/`: Recebem os dados da requisição, validam o formato de entrada (usando schemas de `packages/shared`), executam **um único Use Case** e traduzem o retorno (ou erros de domínio) para códigos HTTP semânticos (`200`, `201`, `400`, `404`, `422`, `500`).
   - `http/routes/`: Registra os endpoints no Express, sempre sob o prefixo `/api` (ex.: `/api/health`).
   - `http/middlewares/`: Tratamento centralizado de erros (Error Handler Middleware) para evitar blocos `try/catch` repetitivos em cada controller.

### 5.2. Compatibilidade ESM no Backend (`NodeNext`)
Como o backend opera com `"type": "module"` e `"moduleResolution": "NodeNext"`, todos os imports relativos entre arquivos locais do backend devem respeitar a resolução ESM do TypeScript (incluindo a extensão `.js` nos caminhos relativos locais quando compilado pelo `tsc`).

---

## 6. Padrão de Versionamento e Git (Conventional Commits)

Todas as mensagens de commit no repositório devem seguir estritamente a especificação **Conventional Commits**:

### 6.1. Formato Obrigatório
```text
<tipo>(<escopo opcional>): <descrição curta no imperativo>

[corpo opcional explicando o contexto e o porquê da mudança]

[rodapé(s) opcional(is), ex.: BREAKING CHANGE: ...]
```

### 6.2. Tipos Permitidos
- `feat`: Nova funcionalidade para o usuário ou novo endpoint/componente.
- `fix`: Correção de bug.
- `refactor`: Alteração de código que não corrige bug nem adiciona funcionalidade (ex.: aplicar Clean Code, extrair componente Atomic ou caso de uso).
- `docs`: Alterações exclusivas em documentação (ex.: `AGENTE.md`, `README.md`).
- `style`: Formatação, espaçamento, classes visuais sem mudança de lógica.
- `test`: Adição ou correção de testes automatizados.
- `chore`: Tarefas de manutenção, configuração de build, dependências ou scripts do monorepo.
- `perf`: Melhorias de desempenho.
- `ci`: Ajustes em pipelines de integração contínua.

### 6.3. Escopos Recomendados no Monorepo
Sempre que aplicável, indique o workspace ou camada afetada no escopo:
- `frontend` (ou sub-escopos como `atoms`, `molecules`, `organisms`, `templates`, `pages`, `hooks`)
- `backend` (ou sub-escopos como `domain`, `application`, `infra`, `presentation`)
- `shared` (contratos, DTOs e schemas em `packages/shared`)
- `repo` ou `root` (configurações globais do monorepo)

### 6.4. Regras das Mensagens
1. **Verbo no Imperativo e Minúsculas:** Escreva a descrição curta iniciando com letra minúscula, no imperativo e sem ponto final (ex.: `feat(frontend): adiciona átomo Button com variantes Tailwind`, `refactor(backend): extrai caso de uso GetSystemHealthUseCase`).
2. **Commits Atômicos:** Cada commit deve representar uma única mudança lógica coesa e deixar o projeto compilando (`npm run build` passando).

---

## 7. Fluxo de Trabalho e Checklist do Agente

Antes de concluir qualquer tarefa de código neste repositório, o agente deve seguir este checklist:

1. **Conformidade Arquitetural:**
   - [ ] O código novo no Frontend está no nível correto do **Atomic Design** (`atoms`, `molecules`, `organisms`, `templates`, `pages`) dentro de sua própria pasta com `index.ts`?
   - [ ] A lógica de estado/efeitos foi extraída do JSX para um **Custom Hook** (`use*.ts`)?
   - [ ] O código novo no Backend respeita a **Clean Architecture** (`domain` sem dependências externas, lógica no `application/use-cases`, contratos em `application/ports`, HTTP isolado em `presentation`)?
   - [ ] Contratos compartilhados entre Front e Back foram colocados ou atualizados em `packages/shared`?
2. **Conformidade com Clean Code:**
   - [ ] Todas as funções têm até ~20 linhas e os arquivos têm até ~150–200 linhas?
   - [ ] Foram usadas Guard Clauses (sem `else` desnecessário e no máximo 2 níveis de indentação)?
   - [ ] Nenhuma função recebe boolean flags ou mais de 3 parâmetros soltos?
   - [ ] Não há uso de `any`, abreviações obscuras ou *magic numbers/strings*?
3. **Verificação Técnica e Versionamento Obrigatórios:**
   - [ ] Execute `npm run build` na raiz do projeto para garantir que o TypeScript (`tsc`) e o Vite compilam sem nenhum erro de tipo ou variável não utilizada.
   - [ ] Ao criar commits, utilize estritamente o formato **Conventional Commits** (`<tipo>(<escopo>): <descrição>`).
   - [ ] Nunca altere as portas padrão (`3001` no backend, `5173` no frontend) nem o prefixo `/api` sem solicitação explícita do usuário.
   - [ ] Mantenha textos de interface e mensagens voltadas ao usuário final em **Português (`pt-BR`)**.
