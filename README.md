
# GenPlatform - Sistema de Gerenciamento de Participantes

Um sistema moderno e responsivo para gerenciar participantes e suas notas, desenvolvido com React, TypeScript, Tailwind CSS e Firebase Authentication.

## 🚀 Funcionalidades

- ✅ **Autenticação Firebase** - Login seguro com email/senha
- ✅ **CRUD Completo** - Criar, listar, editar e excluir participantes
- ✅ **Cálculo Automático** - Média calculada automaticamente das notas
- ✅ **Tema Claro/Escuro** - Alternância de tema com suporte ao sistema
- ✅ **Persistência Local** - Dados salvos no LocalStorage
- ✅ **Design Responsivo** - Interface adaptável para mobile e desktop
- ✅ **Validação de Formulários** - Validação em tempo real
- ✅ **Feedback Visual** - Toasts e indicadores de carregamento

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Shadcn/UI
- **Estado**: Zustand + Context API
- **Autenticação**: Firebase Auth (simulado para demo)
- **Roteamento**: React Router Dom
- **Persistência**: LocalStorage
- **Icons**: Lucide React

## 📦 Instalação e Setup

### 1. Clone e instale dependências
```bash
git clone <seu-repositorio>
cd participant-pal-web-app
npm install
```

### 2. Configuração do Firebase (Opcional)
Para usar Firebase real, edite o arquivo `src/lib/firebase.ts` e substitua a configuração de teste pelas suas credenciais do Firebase:

```typescript
const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "sua-app-id"
};
```

### 3. Execute o projeto
```bash
npm run dev
```

O projeto estará disponível em: `http://localhost:8080`

## 🔐 Credenciais de Teste

Para acessar o sistema, use as seguintes credenciais:

- **Email**: `testuser@empresa.com`
- **Senha**: `Teste@1234`

## 📋 Como Usar

### 1. Login
- Acesse a página inicial
- Use as credenciais de teste ou clique em "Preencher credenciais de teste"
- Faça login para acessar o sistema

### 2. Gerenciar Participantes
- **Listar**: Visualize todos os participantes na página principal
- **Adicionar**: Clique em "Adicionar Participante" ou use o menu de navegação
- **Editar**: Clique no ícone de edição na linha do participante
- **Excluir**: Clique no ícone de lixeira (confirmação necessária)

### 3. Formulários
- **Nome**: Campo obrigatório (texto livre)
- **Idade**: Número entre 1 e 120 anos
- **Notas**: Valores decimais entre 0.0 e 10.0
- **Média**: Calculada automaticamente (Nota1 + Nota2) / 2

### 4. Tema
- Use o botão no canto superior direito para alternar entre:
  - ☀️ Claro
  - 🌙 Escuro  
  - 💻 Sistema (segue preferência do SO)

## 📊 Dados de Exemplo

O sistema vem pré-carregado com 3 participantes de exemplo:

1. **Ana Silva Santos** (25 anos) - Notas: 8.5, 9.0 → Média: 8.8
2. **João Pedro Oliveira** (30 anos) - Notas: 7.5, 8.5 → Média: 8.0
3. **Maria Fernanda Costa** (28 anos) - Notas: 9.0, 9.5 → Média: 9.3

## 🎨 Interface

### Cores das Médias
- 🟢 **Verde**: Média ≥ 9.0 (Excelente)
- 🟡 **Amarelo**: Média ≥ 7.0 (Bom)
- 🔴 **Vermelho**: Média < 7.0 (Precisa melhorar)

### Layout Responsivo
- **Desktop**: Tabela completa com todas as colunas
- **Mobile**: Layout adaptado com informações essenciais
- **Navegação**: Menu responsivo com collapse em telas pequenas

## 🔄 Persistência de Dados

Os dados são armazenados no **LocalStorage** do navegador:
- **Chave**: `participants` - Lista de todos os participantes
- **Chave**: `mockUser` - Dados do usuário logado
- **Chave**: `theme` - Preferência de tema

### Backup e Restauração
Para fazer backup dos dados:
1. Abra o DevTools (F12)
2. Vá para Application/Storage → LocalStorage
3. Copie o valor da chave `participants`

Para restaurar:
1. Cole o JSON no LocalStorage com a chave `participants`
2. Recarregue a página

## 🚧 Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run preview      # Preview do build

# Code Quality
npm run lint         # Executa ESLint
```

## 🔧 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes Shadcn/UI (read-only)
│   ├── Navigation.tsx   # Barra de navegação
│   ├── ParticipantForm.tsx # Formulário de participante
│   └── ProtectedRoute.tsx  # Proteção de rotas
├── contexts/           # Contextos React
│   └── AuthContext.tsx # Contexto de autenticação
├── hooks/              # Hooks customizados
│   ├── useTheme.ts     # Hook de tema
│   └── use-toast.ts    # Hook de toast (Shadcn)
├── lib/                # Configurações e utilitários
│   ├── firebase.ts     # Configuração Firebase
│   └── utils.ts        # Utilitários gerais
├── pages/              # Páginas da aplicação
│   ├── Login.tsx       # Página de login
│   ├── Participants.tsx # Lista de participantes
│   ├── NewParticipant.tsx # Novo participante
│   ├── EditParticipant.tsx # Editar participante
│   └── NotFound.tsx    # Página 404
├── store/              # Estado global
│   └── participantsStore.ts # Store Zustand
└── main.tsx           # Ponto de entrada
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar problemas ou tiver dúvidas:

1. Verifique se todas as dependências foram instaladas: `npm install`
2. Limpe o cache do navegador e LocalStorage se necessário
3. Verifique o console do navegador para erros
4. Certifique-se de estar usando as credenciais de teste corretas

---

**Desenvolvido com ❤️ usando React + TypeScript + Tailwind CSS**
