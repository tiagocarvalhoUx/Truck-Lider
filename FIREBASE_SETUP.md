# 🔥 Configuração do Firebase

## 1. Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Nomeie o projeto como "truck-lider" (ou nome de sua preferência)
4. Siga os passos e crie o projeto

## 2. Ativar Autenticação

1. No menu lateral, clique em "Authentication"
2. Clique em "Começar"
3. Na aba "Sign-in method", ative:
   - **Email/Password** (método principal)
4. Salve as alterações

## 3. Criar Primeiro Usuário Admin

### Opção A: Pelo Console Firebase
1. Vá em Authentication > Users
2. Clique em "Add user"
3. Preencha:
   - Email: `admin@andersoninside.com`
   - Password: `[escolha uma senha forte]`
4. Clique em "Add user"

### Opção B: Usando o próprio sistema (temporário)
1. Descomente a função `register` no `LoginView.vue`
2. Adicione um botão de registro temporário
3. Crie sua conta
4. Remova o código de registro após criar o admin

## 4. Configurar Firestore Database

1. No menu lateral, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha o modo:
   - **Teste** (para desenvolvimento - dados públicos por 30 dias)
   - **Produção** (requer regras de segurança)
4. Escolha a localização: `southamerica-east1` (São Paulo)
5. Clique em "Ativar"

### Regras de Segurança Recomendadas

Após criar o banco, vá em "Regras" e cole:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Propostas: qualquer um pode criar, apenas admins podem ler/editar/deletar
    match /proposals/{proposalId} {
      allow create: if true; // Permite que qualquer um crie propostas
      allow read, update, delete: if request.auth != null; // Apenas usuários autenticados (admins)
    }
  }
}
```

## 5. Obter Credenciais do Firebase

1. No menu lateral, clique no ícone de engrenagem ⚙️ > "Configurações do projeto"
2. Em "Seus apps", clique no ícone Web `</>`
3. Dê um apelido ao app (ex: "Truck Lider Web")
4. **NÃO** marque "Configurar Firebase Hosting"
5. Clique em "Registrar app"
6. Copie o objeto `firebaseConfig` que aparecerá

## 6. Configurar no Projeto

1. Abra o arquivo `src/firebase/config.js`
2. Substitua o objeto `firebaseConfig` com suas credenciais:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "truck-lider.firebaseapp.com",
  projectId: "truck-lider",
  storageBucket: "truck-lider.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
}
```

## 7. Testar a Integração

1. Inicie o servidor de desenvolvimento: `npm run dev`
2. Acesse a página inicial e tente criar uma proposta
3. Verifique se a proposta aparece no Firestore Console
4. Acesse `/login` e faça login com o usuário admin criado
5. Verifique se consegue visualizar as propostas no dashboard

## 8. Índices do Firestore (Opcional)

Se você receber erros sobre índices ausentes:

1. O Firebase mostrará um link no console do navegador
2. Clique no link para criar o índice automaticamente
3. Aguarde alguns minutos para o índice ser criado

## 🔒 Segurança

### Em Produção:

1. **Remova as credenciais do código**:
   - Crie um arquivo `.env` (já está no .gitignore)
   - Use variáveis de ambiente (veja `.env.example`)

2. **Atualize as regras de segurança**:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /proposals/{proposalId} {
         allow create: if request.time < timestamp.date(2025, 12, 31); // Limite temporal
         allow read, update, delete: if request.auth != null &&
                                       request.auth.token.email.matches('.*@andersoninside.com');
       }
     }
   }
   ```

3. **Adicione domínios autorizados**:
   - Vá em Authentication > Settings > Authorized domains
   - Adicione seu domínio de produção

## 📊 Monitoramento

- **Authentication**: Monitore logins e usuários ativos
- **Firestore**: Verifique uso de leituras/escritas (grátis até 50k/dia)
- **Budget Alerts**: Configure alertas de cobrança

## 🆘 Problemas Comuns

### Erro: "Missing or insufficient permissions"
- Verifique as regras do Firestore
- Certifique-se de estar autenticado

### Erro: "API key not valid"
- Verifique se as credenciais estão corretas
- Confira se a API do Firestore está ativada

### Propostas não aparecem no dashboard
- Verifique o console do navegador
- Confira se o usuário está autenticado
- Verifique as regras do Firestore

## 📞 Suporte

- [Documentação Firebase](https://firebase.google.com/docs)
- [Stack Overflow - Firebase](https://stackoverflow.com/questions/tagged/firebase)
