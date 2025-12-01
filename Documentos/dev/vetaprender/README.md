# 🎓 VetAprender

<div align="center">
  <img src="public/logo.png" alt="VetAprender Logo" width="200"/>
  
  ### Gamificando o ensino de medicina veterinária
  
  [![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF.svg)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC.svg)](https://tailwindcss.com/)
</div>

---

## 📋 Sobre o Projeto

**VetAprender** é uma plataforma educacional interativa desenvolvida como projeto de TCC, com o objetivo de facilitar o aprendizado de **Medicina Veterinária** através de gamificação.

A aplicação transforma o estudo de anatomia e outros conteúdos complexos em uma experiência dinâmica e envolvente, utilizando:
- 🎮 Quizzes interativos com imagens
- ⭐ Sistema de pontuação e feedback personalizado
- 🤖 IA para geração de dicas e análise de desempenho
- 📱 Interface responsiva e intuitiva

### 🎯 Objetivo

Aumentar a motivação e retenção de conhecimento dos estudantes através de recursos lúdicos, atividades práticas e desafios educativos, sem perder a profundidade acadêmica.

---

## ✨ Funcionalidades

- **Quiz Dinâmico**: Perguntas com imagens de anatomia veterinária
- **Sistema de Dicas**: Orientação visual para ajudar na identificação
- **Validação Inteligente**: Ignora acentos e diferença entre maiúsculas/minúsculas
- **Feedback com IA**: Análise personalizada do desempenho usando Google Gemini
- **Compartilhamento**: Compartilhe seus resultados com colegas
- **Design Responsivo**: Funciona perfeitamente em dispositivos móveis e desktop

---

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Estilização**: TailwindCSS
- **Ícones**: Lucide React
- **IA**: Google Gemini API
- **Package Manager**: Bun / npm

---

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior) ou Bun
- Conta Google Cloud com acesso à API Gemini

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/vetaprender.git
   cd vetaprender
   ```

2. **Instale as dependências**
   ```bash
   # Usando bun
   bun install
   
   # Ou usando npm
   npm install
   ```

3. **Configure a API Key do Gemini**
   - Crie um arquivo `.env.local` na raiz do projeto
   - Adicione sua chave da API Gemini:
   ```env
   VITE_GEMINI_API_KEY=sua_chave_aqui
   ```

4. **Execute o projeto**
   ```bash
   # Usando bun
   bun run dev
   
   # Ou usando npm
   npm run dev
   ```

5. **Acesse no navegador**
   ```
   http://localhost:3000
   ```

---

## 🏗️ Estrutura do Projeto

```
vetaprender/
├── public/
│   ├── logo.png              # Logo do projeto
│   ├── image-preview.png     # Imagem de preview para compartilhamento
│   └── questoes/             # Imagens das questões
├── screens/
│   ├── HomeScreen.tsx        # Tela inicial
│   ├── GameScreen.tsx        # Tela do quiz
│   ├── ResultScreen.tsx      # Tela de resultados
│   └── AboutScreen.tsx       # Sobre o projeto
├── components/
│   └── Button.tsx            # Componente de botão reutilizável
├── services/
│   └── QuestionsService.ts   # Lógica de geração de perguntas e IA
├── App.tsx                   # Componente principal
├── types.ts                  # Definições TypeScript
└── index.html                # HTML base
```

---

## 🎮 Como Usar

1. **Tela Inicial**: Clique em "Começar Desafio" para iniciar
2. **Durante o Jogo**: 
   - Observe a imagem e a dica fornecida
   - Digite as letras para completar a palavra
   - Use Backspace para corrigir
   - Clique em "Confirmar" quando terminar ou "Pular" para avançar
3. **Resultado**: 
   - Veja sua pontuação e feedback personalizado
   - Receba dicas de estudo baseadas no seu desempenho
   - Compartilhe seus resultados

---

## 👥 Equipe

- **Ana Luísa Bagot** - Graduanda em Medicina Veterinária
- **Raissa Sawada Cutrim Gutierrez** - Graduanda em Medicina Veterinária

---

## 📄 Licença

Este projeto foi desenvolvido como Trabalho de Conclusão de Curso (TCC) em Medicina Veterinária.

© 2025 VetAprender. Todos os direitos reservados.

---

## 🤝 Contribuições

Este é um projeto acadêmico, mas sugestões e feedbacks são bem-vindos! Sinta-se à vontade para abrir issues ou entrar em contato.

---

<div align="center">
  <strong>Gamificando o ensino de medicina veterinária 🦴✨</strong>
</div>
