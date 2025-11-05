# 📋 Estrutura Completa do Sistema Truck Lider

## 🎯 Visão Geral

Sistema dividido em **duas áreas principais**:

1. **Área Pública** - Cadastro de propostas pelos caminhoneiros
2. **Área Administrativa** - Dashboard com login para gerenciar propostas

---

## 🗺️ Fluxo do Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    USUÁRIOS DO SISTEMA                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ├─────────────────────┐
                            │                     │
                  ┌─────────▼─────────┐  ┌────────▼────────┐
                  │  CAMINHONEIROS    │  │  ADMINISTRADOR  │
                  │   (Área Pública)  │  │  (Área Privada) │
                  └─────────┬─────────┘  └────────┬────────┘
                            │                     │
                  ┌─────────▼─────────┐  ┌────────▼────────┐
                  │  Formulário 3     │  │  Login Firebase │
                  │  Etapas           │  │  (Email/Senha)  │
                  └─────────┬─────────┘  └────────┬────────┘
                            │                     │
                            │                     │
                  ┌─────────▼─────────┐  ┌────────▼────────┐
                  │  Salvar Proposta  │  │   Dashboard     │
                  │  no Firebase      │  │   Completo      │
                  └─────────┬─────────┘  └────────┬────────┘
                            │                     │
                            └─────────┬───────────┘
                                      │
                            ┌─────────▼─────────┐
                            │   CLOUD FIRESTORE │
                            │   (Banco de Dados)│
                            └───────────────────┘
```

---

## 📂 Estrutura de Pastas Detalhada

```
truck-lider/
│
├── public/                          # Arquivos estáticos
│
├── src/
│   ├── components/                  # Componentes reutilizáveis
│   │   ├── steps/                   # Etapas do formulário
│   │   │   ├── Step1DadosParceiro.vue    # Etapa 1: Dados pessoais
│   │   │   ├── Step2Rotas.vue            # Etapa 2: Rotas preferidas
│   │   │   └── Step3Valores.vue          # Etapa 3: Valores propostos
│   │   │
│   │   ├── ui/                      # Componentes de interface
│   │   │   ├── AppHeader.vue             # Cabeçalho principal
│   │   │   ├── AppFooter.vue             # Rodapé
│   │   │   ├── BadgesSection.vue         # Badges informativos
│   │   │   ├── CtaBanner.vue             # Banner de chamada
│   │   │   ├── StepHeader.vue            # Cabeçalho de etapa
│   │   │   └── ProposalCard.vue          # Card de proposta
│   │   │
│   │   ├── AndersonInsideSystem.vue      # Sistema principal público
│   │   ├── SuccessScreen.vue             # Tela de sucesso
│   │   └── ProposalsList.vue             # Lista de propostas
│   │
│   ├── views/                       # Páginas/Views do sistema
│   │   ├── admin/                   # Views administrativas
│   │   │   └── DashboardView.vue         # Dashboard principal
│   │   ├── HomeView.vue                  # Página inicial (pública)
│   │   └── LoginView.vue                 # Página de login
│   │
│   ├── composables/                 # Lógica reutilizável (Composition API)
│   │   ├── useAuth.js                    # Autenticação Firebase
│   │   ├── useFirestore.js               # Operações Firestore (CRUD)
│   │   ├── useFormData.js                # Gerenciamento formulário
│   │   └── useProposals.js               # Gerenciamento propostas
│   │
│   ├── utils/                       # Funções utilitárias
│   │   ├── calculations.js               # Cálculo de distâncias
│   │   ├── exportData.js                 # Exportação Excel/CSV
│   │   ├── formatters.js                 # Formatação moeda/data
│   │   └── whatsapp.js                   # Envio WhatsApp
│   │
│   ├── constants/                   # Constantes do sistema
│   │   └── index.js                      # Tipos de veículos, etc.
│   │
│   ├── firebase/                    # Configuração Firebase
│   │   └── config.js                     # Credenciais e inicialização
│   │
│   ├── router/                      # Sistema de rotas
│   │   └── index.js                      # Definição de rotas
│   │
│   ├── App.vue                      # Componente raiz
│   ├── main.js                      # Entry point
│   └── style.css                    # Estilos Tailwind
│
├── .env.example                     # Exemplo de variáveis de ambiente
├── .gitignore                       # Arquivos ignorados pelo Git
├── FIREBASE_SETUP.md                # Guia de configuração Firebase
├── ESTRUTURA_SISTEMA.md             # Este arquivo
├── README.md                        # Documentação principal
├── index.html                       # HTML base
├── package.json                     # Dependências do projeto
├── postcss.config.js                # Configuração PostCSS
├── tailwind.config.js               # Configuração Tailwind
└── vite.config.js                   # Configuração Vite
```

---

## 🔄 Fluxo de Dados

### 1. Cadastro de Proposta (Área Pública)

```
Caminhoneiro
    │
    ▼
[HomeView.vue]
    │
    ▼
[AndersonInsideSystem.vue]
    │
    ├── [Step1DadosParceiro] → Coleta dados pessoais
    │
    ├── [Step2Rotas] → Coleta rotas e calcula distâncias
    │        │
    │        └── calcularDistancia() [utils/calculations.js]
    │
    ├── [Step3Valores] → Coleta valores e forma de pagamento
    │
    └── handleEnviarProposta()
            │
            ▼
        useProposals.saveProposal()
            │
            ▼
        useFirestore.addDocument()
            │
            ▼
        Firebase Firestore ✓
            │
            ▼
        [SuccessScreen]
            │
            ├── Enviar WhatsApp
            └── Nova Proposta
```

### 2. Dashboard Administrativo

```
Administrador
    │
    ▼
[LoginView.vue]
    │
    ▼
useAuth.login(email, password)
    │
    ▼
Firebase Authentication ✓
    │
    ▼
Router Guard → Verificação
    │
    ▼
[DashboardView.vue]
    │
    ├── 📊 Estatísticas
    │   ├── Total de propostas
    │   ├── Propostas da semana
    │   ├── Caminhoneiros únicos
    │   └── Tipos de veículos
    │
    ├── 🔍 Filtros & Busca
    │   ├── Por tipo de veículo
    │   └── Por texto (nome, empresa, whatsapp)
    │
    ├── 📋 Tabela de Propostas
    │   ├── Paginação
    │   └── Ações (Ver, Excluir)
    │
    └── 📥 Exportação
        ├── Excel (.xlsx)
        └── CSV (.csv)
```

---

## 🔐 Sistema de Autenticação

```
┌──────────────────────┐
│  Firebase Auth       │
│  (Email/Password)    │
└──────────┬───────────┘
           │
           ├─── useAuth.js (Composable)
           │    ├── login()
           │    ├── logout()
           │    ├── register()
           │    └── isAuthenticated
           │
           └─── Router Guard
                ├── Verifica autenticação
                └── Redireciona se necessário
```

---

## 💾 Banco de Dados (Firestore)

### Collection: `proposals`

```javascript
Document ID (auto-gerado)
├── nome: "João Silva"
├── whatsapp: "+55 18 99999-9999"
├── empresa: "Silva Transportes"
├── tipoVeiculo: "Carreta (até 27 ton)"
├── origemPrincipal: "São Paulo"
├── destinoPrincipal: "Rio de Janeiro"
├── origem2: ""
├── destino2: ""
├── origem3: ""
├── destino3: ""
├── distancias: {
│   ├── principal: 430
│   ├── rota2: 0
│   └── rota3: 0
│   }
├── valorTonelada: 95.00
├── valorM3: 140.00
├── valorKM: 3.10
├── valorFechado: 1500.00
├── pagamento: "entrega"
├── timestamp: "2024-11-05T05:30:00.000Z"
└── createdAt: Timestamp (Firebase)
```

---

## 🎨 Componentes Principais

### 1. **AndersonInsideSystem.vue**
- Orquestra todo o fluxo do formulário
- Gerencia estado (step, formData, distancias)
- Controla navegação entre etapas

### 2. **DashboardView.vue**
- Dashboard completo administrativo
- Estatísticas em tempo real
- CRUD de propostas
- Exportação de dados

### 3. **LoginView.vue**
- Interface de login
- Validação de credenciais
- Redirecionamento pós-login

---

## 🧩 Composables (Lógica Reutilizável)

### useAuth.js
```javascript
- user          // Usuário autenticado
- loading       // Estado de carregamento
- isAuthenticated  // Booleano
- login()       // Fazer login
- logout()      // Fazer logout
- register()    // Registrar novo usuário
```

### useFirestore.js
```javascript
- documents     // Array de documentos
- loading       // Estado de carregamento
- error         // Mensagem de erro
- addDocument()    // Criar documento
- getDocuments()   // Buscar todos
- queryDocuments() // Buscar com filtro
- updateDocument() // Atualizar
- deleteDocument() // Deletar
```

### useProposals.js
```javascript
- proposals     // Array de propostas
- loading       // Estado
- error         // Erro
- loadProposals()  // Carregar todas
- saveProposal()   // Salvar nova
```

---

## 📊 Funcionalidades de Exportação

### Excel (.xlsx)
- Formatação profissional
- Larguras de coluna ajustadas
- Cabeçalhos em negrito
- Nome do arquivo com data

### CSV (.csv)
- Compatível com Google Sheets
- Compatível com Excel
- Encoding UTF-8
- Separador padrão

**Campos exportados:**
- Data/Hora
- Nome
- WhatsApp
- Empresa
- Tipo Veículo
- Origem/Destino Principal
- Distância (km)
- Valores (Tonelada, M³, KM, Fechado)
- Forma de Pagamento

---

## 🔒 Segurança

### Regras Firestore
```javascript
- CREATE: Público (qualquer um pode criar proposta)
- READ/UPDATE/DELETE: Apenas autenticados (admins)
```

### Proteção de Rotas
```javascript
/admin → Requer autenticação
/login → Público
/      → Público
```

---

## 📱 Responsividade

- **Mobile First**: Design otimizado para celular
- **Tablet**: Layout adaptado
- **Desktop**: Interface completa com tabelas

---

## 🚀 Performance

- **Code Splitting**: Componentes carregados sob demanda
- **Lazy Loading**: Views carregadas quando necessário
- **Vite HMR**: Hot Module Replacement rápido
- **Tailwind JIT**: CSS gerado sob demanda

---

## 📈 Escalabilidade

### Firestore Limits (Free Tier)
- **Leituras**: 50.000/dia
- **Escritas**: 20.000/dia
- **Exclusões**: 20.000/dia
- **Armazenamento**: 1 GB

### Sugestões para Scale
1. Implementar paginação server-side
2. Adicionar cache Redis
3. Migrar para Firestore em modo de cobrança
4. Implementar Cloud Functions para processamento

---

## 🔄 Próximas Melhorias Sugeridas

### Funcionalidades
- [ ] Notificações push para novos cadastros
- [ ] Chat integrado com caminhoneiros
- [ ] Sistema de avaliações
- [ ] Histórico de fretes realizados
- [ ] Geolocalização em tempo real
- [ ] Integração com APIs de rotas (Google Maps)
- [ ] Sistema de proposta/contra-proposta
- [ ] Calendário de disponibilidade

### Técnicas
- [ ] Testes unitários (Vitest)
- [ ] Testes E2E (Playwright)
- [ ] CI/CD (GitHub Actions)
- [ ] Monitoramento (Sentry)
- [ ] Analytics (Google Analytics)
- [ ] PWA (Service Workers)
- [ ] Internacionalização (i18n)

---

**Desenvolvido por Claude Code para Anderson Inside**
