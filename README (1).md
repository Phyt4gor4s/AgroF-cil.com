# Agro Fácil

Sistema web de gestão de documentos dos cooperados para cooperativas agropecuárias. Desenvolvido para monitorar vencimentos e notificações dos documentos dos cooperados.

---

## Estrutura do projeto

```
coopavel/
├── index.html          # Tela inicial – seleção da cooperativa
├── login.html          # Tela de login
├── painel.html         # Painel de gerenciamento de cooperados
├── README.md           # Este arquivo
├── assets/
│   ├── logo-coopavel.png   # Logo oficial Coopavel
│   └── logo-coopavel.svg   # Logo em SVG (fallback)
├── css/
│   └── style.css       # Estilos globais e IDV
└── js/
    ├── app.js          # Autenticação, sessão e navegação
    └── painel.js       # Dados e renderização do painel (tabela, resumo, notificações)
```

---

## Documentação do site

### Tecnologias

- **HTML5** – estrutura das páginas  
- **CSS3** – layout, responsividade e identidade visual  
- **JavaScript (vanilla)** – autenticação, sessão e lógica do painel  
- **Google Fonts** – tipografia Poppins  

### Identidade visual (IDV)

- **Tipografia:** Poppins (400, 500, 600, 700)  
- **Cor de destaque:** `#bff400` (verde-limão)  
- **Logo:** Coopavel (vermelho e branco) nas telas iniciais e no painel  

### Páginas e fluxo

| Página       | Arquivo     | Descrição |
|-------------|-------------|-----------|
| **Inicial** | `index.html` | Exibe o logo da cooperativa e um card para selecionar a Coopavel. Ao clicar no card, redireciona para o login. |
| **Login**   | `login.html` | Campos de usuário e senha. Após login válido, redireciona para o painel. Em modo demonstração, qualquer usuário/senha é aceito. |
| **Painel**  | `painel.html` | Visão para a cooperativa: resumo de documentos (vencidos x em dia), notificação de irregularidades e tabela de cooperados com status. Requer login. |

### Funcionalidades por tela

#### 1. Tela inicial
- Logo Coopavel e marca Agro Fácil no header.
- Card “Coopavel” com link para a tela de login (`login.html?cooperativa=coopavel`).
- Footer com créditos.

#### 2. Tela de login
- Formulário com usuário e senha.
- Botão “Entrar” e mensagem de erro em caso de falha.
- Link “Voltar” para a tela inicial.
- Nome da cooperativa exibido conforme parâmetro da URL.

#### 3. Painel de cooperados
- **Header:** logo Coopavel, título “Agro Fácil – Painel de Cooperados”, nome do usuário logado e botão “Sair”.
- **Notificação:** alerta amarelo quando existem cooperados com documentos vencidos (ex.: “Atenção! Existem X cooperado(s) com documentos vencidos.”).
- **Resumo:** dois cards com totais de “Documentos vencidos” e “Documentos em dia”.
- **Tabela:** lista de cooperados com colunas Nome e Status do documento (badge “Vencido” ou “Em dia”).

### Autenticação e sessão

- **Armazenamento:** `sessionStorage` (chaves `agroFacil_user` e `agroFacil_cooperativa`).
- **Login:** em modo demo, qualquer usuário e senha são aceitos; em produção deve ser substituído por chamada a API.
- **Proteção do painel:** se não houver usuário na sessão, o visitante é redirecionado para a tela de login.
- **Logout:** botão “Sair” limpa a sessão e redireciona para a tela inicial.

### Dados do painel

- Os cooperados e o status dos documentos estão definidos em `js/painel.js` (array `cooperados`).
- Estrutura de cada item: `{ nome: string, statusDocumento: 'vencido' | 'em_dia' }`.
- Para produção, esse array deve ser trocado por dados vindos de um backend (API REST, etc.).

### Responsividade

- Layout adaptável para desktop e mobile.
- Tabela do painel com rolagem horizontal em telas pequenas.
- Headers e botões ajustados para uso em diferentes tamanhos de tela.

---

## Próximos passos (produção)

- Integrar login com API/backend real.  
- Substituir dados estáticos do painel por consumo de API.  
- Incluir mais cooperativas na tela inicial (cards adicionais).  
- Adicionar filtros e busca na tabela de cooperados.  

---

## Licença e créditos

Projeto desenvolvido para fins de hackathon / demonstração.  
Logo Coopavel: uso conforme identidade da cooperativa.  
Agro Fácil – Gestão de documentos dos cooperados.
