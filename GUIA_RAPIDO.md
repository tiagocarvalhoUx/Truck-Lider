# 🚀 Guia Rápido - Truck Lider

## ⚡ Início Rápido em 5 Minutos

### 1️⃣ Firebase Setup (2 min)

```bash
# 1. Acesse https://console.firebase.google.com/
# 2. Crie novo projeto: "truck-lider"
# 3. Ative Authentication > Email/Password
# 4. Ative Firestore Database
# 5. Copie as credenciais
```

### 2️⃣ Configurar Projeto (1 min)

Abra `src/firebase/config.js` e cole suas credenciais:

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "SEU_PROJECT_ID.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_PROJECT_ID.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
}
```

### 3️⃣ Criar Admin (1 min)

No Firebase Console:
- Authentication > Users > Add User
- Email: `admin@andersoninside.com`
- Password: `[sua senha forte]`

### 4️⃣ Regras Firestore (1 min)

Firestore > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /proposals/{proposalId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

Clique em "Publicar"

### 5️⃣ Testar (30 seg)

```bash
# Já rodando em http://localhost:5179

# Teste o formulário público:
1. Acesse http://localhost:5179
2. Preencha uma proposta teste

# Teste o admin:
1. Acesse http://localhost:5179/login
2. Login com admin@andersoninside.com
3. Veja a proposta no dashboard
```

---

## 📋 Checklist de Funcionalidades

### ✅ Área Pública
- [x] Formulário 3 etapas
- [x] Validação de campos
- [x] Cálculo de distâncias
- [x] Envio para Firebase
- [x] Envio para WhatsApp
- [x] Lista de propostas públicas
- [x] Tela de sucesso

### ✅ Área Admin
- [x] Login seguro
- [x] Dashboard com stats
- [x] Filtros avançados
- [x] Busca por texto
- [x] Paginação
- [x] Ver detalhes
- [x] Excluir propostas
- [x] Exportar Excel
- [x] Exportar CSV
- [x] Logout

---

## 🎯 URLs Importantes

| Rota | Descrição | Acesso |
|------|-----------|--------|
| `/` | Formulário público | Público |
| `/login` | Login admin | Público |
| `/admin` | Dashboard | Requer login |

---

## 🔑 Atalhos de Teclado (Futuro)

```
Ctrl + K     → Busca rápida
Ctrl + E     → Exportar
Ctrl + /     → Ajuda
Esc          → Fechar modal
```

---

## 📊 Dados de Teste

### Proposta de Exemplo

```javascript
Nome: João Silva
WhatsApp: +55 18 99999-9999
Empresa: Silva Transportes
Veículo: Carreta (até 27 ton)
Origem: São Paulo
Destino: Rio de Janeiro
Valor/Tonelada: 95.00
Valor/M³: 140.00
Valor/KM: 3.10
Valor Fechado: 1500.00
Pagamento: 100% na entrega
```

---

## 🐛 Troubleshooting Rápido

### ❌ "Permission denied"
**Solução**: Verifique as regras do Firestore

### ❌ "Auth not configured"
**Solução**: Ative Authentication no Firebase Console

### ❌ "Network error"
**Solução**: Verifique as credenciais no config.js

### ❌ Propostas não aparecem
**Solução**: Aguarde alguns segundos, recarregue a página

### ❌ Não consegue fazer login
**Solução**: Verifique se o usuário foi criado corretamente

---

## 📱 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build produção
npm run build

# Preview build
npm run preview

# Verificar erros
npm run lint (se configurado)

# Limpar cache
rm -rf node_modules
npm install
```

---

## 🎨 Personalização Rápida

### Mudar cores principais:

**Arquivo**: `tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#047857', // verde atual
        dark: '#065f46',
      }
    }
  }
}
```

### Mudar logo/nome:

**Arquivo**: `src/components/ui/AppHeader.vue`

```vue
<span class="text-4xl">🚚</span> <!-- Mude o emoji -->
<h1>SEU NOME AQUI</h1>
```

### Mudar WhatsApp destino:

**Arquivo**: `src/utils/whatsapp.js`

```javascript
const url = `https://wa.me/5518999999999?text=...`
//                          ^^^^^^^^^^^^^^
//                          Mude o número aqui
```

---

## 📈 Monitoramento

### Firebase Console

1. **Authentication**
   - Usuários ativos
   - Logins recentes
   - Tentativas falhas

2. **Firestore**
   - Total de documentos
   - Leituras/Escritas do dia
   - Tamanho do banco

3. **Usage**
   - Gráficos de uso
   - Custos (se ultrapassar free tier)

---

## 🔄 Atualizações Futuras

Para atualizar o sistema:

```bash
# 1. Fazer backup do Firebase
# 2. Atualizar código
git pull origin main

# 3. Atualizar dependências
npm install

# 4. Testar localmente
npm run dev

# 5. Build e deploy
npm run build
```

---

## 💡 Dicas Pro

1. **Use Ctrl + Shift + R** para forçar recarga sem cache
2. **Abra Console do Navegador (F12)** para ver logs
3. **Firebase Emulator** para desenvolvimento offline
4. **Postman** para testar APIs (futuro)
5. **Vue DevTools** para debug

---

## 📞 Suporte

Se precisar de ajuda:

1. Verifique `README.md` - Documentação completa
2. Verifique `FIREBASE_SETUP.md` - Guia Firebase
3. Verifique `ESTRUTURA_SISTEMA.md` - Arquitetura
4. Console do navegador - Veja erros
5. Firebase Console - Veja logs

---

## ✨ Pronto!

Seu sistema está configurado e rodando!

**Próximos passos:**
1. Teste todas as funcionalidades
2. Cadastre propostas de teste
3. Exporte dados para Excel
4. Personalize conforme necessário
5. Deploy para produção (Vercel, Netlify, Firebase Hosting)

**Bom trabalho! 🚀**
