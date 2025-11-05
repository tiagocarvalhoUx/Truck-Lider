# 🚚 Truck Lider - Anderson Inside

Sistema completo de gerenciamento de propostas de frete com painel administrativo.

## 🌟 Funcionalidades

### Para Caminhoneiros (Área Pública)
- ✅ Cadastro de propostas de frete
- ✅ Formulário em 3 etapas intuitivo
- ✅ Cálculo automático de distâncias
- ✅ Envio de proposta via WhatsApp
- ✅ Visualização de propostas anteriores

### Para Administradores (Painel Admin)
- 🔐 Sistema de login seguro com Firebase
- 📊 Dashboard com estatísticas em tempo real
- 👥 Gerenciamento completo de propostas
- 🔍 Filtros e busca avançada
- 📥 Exportação para Excel e CSV
- 🗑️ Exclusão de propostas
- 👁️ Visualização detalhada de cada proposta
- 📱 Interface responsiva

## 🛠️ Tecnologias

- **Vue.js 3** - Framework JavaScript progressivo
- **Vite** - Build tool rápida
- **Tailwind CSS** - Framework CSS utility-first
- **Firebase Authentication** - Autenticação de usuários
- **Cloud Firestore** - Banco de dados NoSQL em tempo real
- **Vue Router** - Sistema de rotas
- **XLSX** - Exportação para Excel
- **Lucide Icons** - Ícones modernos

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── steps/          # Componentes de cada etapa do formulário
│   ├── ui/             # Componentes de UI
│   ├── AndersonInsideSystem.vue
│   ├── SuccessScreen.vue
│   └── ProposalsList.vue
├── views/              # Páginas/Views
│   ├── admin/          # Views administrativas
│   │   └── DashboardView.vue
│   ├── HomeView.vue
│   └── LoginView.vue
├── composables/        # Lógica reutilizável
│   ├── useAuth.js      # Autenticação
│   ├── useFirestore.js # Operações Firestore
│   ├── useFormData.js  # Dados do formulário
│   └── useProposals.js # Gerenciamento de propostas
├── utils/              # Utilitários
│   ├── calculations.js # Cálculos
│   ├── exportData.js   # Exportação de dados
│   ├── formatters.js   # Formatadores
│   └── whatsapp.js     # Integração WhatsApp
├── constants/          # Constantes
│   └── index.js
├── firebase/           # Configuração Firebase
│   └── config.js
├── router/             # Configuração de rotas
│   └── index.js
├── App.vue
├── main.js
└── style.css
```

## 🚀 Como Usar

### 1. Instalação

```bash
# Clonar repositório
cd truck-lider

# Instalar dependências
npm install
```

### 2. Configurar Firebase

Siga o guia completo em [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

**Resumo rápido:**
1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative Authentication (Email/Password)
3. Ative Firestore Database
4. Crie um usuário admin
5. Copie as credenciais para `src/firebase/config.js`

### 3. Iniciar Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### 4. Build para Produção

```bash
npm run build
```

## 🔑 Rotas

- `/` - Página inicial (formulário público)
- `/login` - Login administrativo
- `/admin` - Dashboard administrativo (requer autenticação)

## 📊 Estrutura de Dados

### Proposta (Firestore)

```javascript
{
  nome: String,              // Nome do caminhoneiro
  whatsapp: String,          // WhatsApp
  empresa: String,           // Empresa (opcional)
  tipoVeiculo: String,       // Tipo de veículo
  origemPrincipal: String,   // Cidade de origem
  destinoPrincipal: String,  // Cidade de destino
  origem2: String,           // Rota alternativa 2 (opcional)
  destino2: String,
  origem3: String,           // Rota alternativa 3 (opcional)
  destino3: String,
  distancias: {
    principal: Number,       // Distância em km
    rota2: Number,
    rota3: Number
  },
  valorTonelada: Number,     // Valor por tonelada
  valorM3: Number,           // Valor por m³
  valorKM: Number,           // Valor por km
  valorFechado: Number,      // Valor fechado
  pagamento: String,         // 'entrega' ou 'adiantamento'
  timestamp: String,         // Data/hora ISO
  createdAt: Timestamp       // Timestamp do Firestore
}
```

## 🎨 Temas e Cores

```css
Verde Principal: #047857 (green-700)
Verde Escuro: #065f46 (green-800)
Laranja: #ea580c (orange-600)
Azul: #2563eb (blue-600)
```

## 📱 Funcionalidades do Dashboard

### Estatísticas
- Total de propostas
- Propostas da semana
- Caminhoneiros únicos
- Tipos de veículos ativos

### Filtros
- Por tipo de veículo
- Busca por nome, empresa ou WhatsApp
- Paginação (20 itens por página)

### Exportação
- **Excel (.xlsx)**: Formato completo com formatação
- **CSV (.csv)**: Formato compatível com planilhas

### Ações
- Visualizar detalhes completos
- Excluir proposta
- Atualizar lista em tempo real

## 🔒 Segurança

### Regras do Firestore (Recomendadas)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /proposals/{proposalId} {
      // Qualquer um pode criar propostas (formulário público)
      allow create: if true;

      // Apenas usuários autenticados podem ler/atualizar/deletar
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## 🐛 Solução de Problemas

### Firebase não conecta
- Verifique as credenciais em `src/firebase/config.js`
- Certifique-se de que Authentication e Firestore estão ativados

### Propostas não aparecem
- Verifique as regras do Firestore
- Abra o console do navegador para ver erros
- Verifique se há índices pendentes

### Erro ao exportar
- Verifique se há propostas selecionadas
- Verifique permissões de download do navegador

## 📞 Contato

**Anderson Inside**
- WhatsApp: +55 18 98114-2927
- Email: contato@andersoninside.com

## 📝 Licença

© 2024 Anderson Inside - Todos os direitos reservados

---

Desenvolvido com ❤️ para otimizar a gestão de fretes
