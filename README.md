# MedFlow — Sistema de Gestão Clínica & Telemedicina

[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![CSS Moderno](https://img.shields.io/badge/Design-Obsidian_Glass-0ea5e9)](https://developer.mozilla.org/css)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

O **MedFlow** é uma aplicação web moderna e intuitiva voltada para a administração clínica, gestão de prontuários de pacientes, credenciamento de profissionais de saúde e agendamento de consultas presenciais e por telemedicina.

Construído com foco em **ergonomia visual, alta usabilidade e clareza de dados**, o sistema proporciona uma experiência fluida para recepcionistas, profissionais de saúde e gestores de clínicas médicas.

---

## 🌟 Principais Funcionalidades

### 1. 👥 Gestão de Pacientes
- Cadastro completo de identificação civil com máscaras automáticas (CPF e Telefone/WhatsApp).
- Registro de data de nascimento, e-mail e sexo biológico.
- Informações clínicas essenciais como **Tipo Sanguíneo** e modalidade de atendimento (Plano de Saúde vs. Atendimento Particular).

### 2. 🩺 Credenciamento de Especialistas
- Cadastro formal de médicos e especialistas com registro profissional (CRM/UF).
- Seleção de especialidade médica e tempo de experiência profissional.
- Parametrização de agenda: definição de turno de atendimento (Manhã, Tarde, Noite, Integral) e cor temática personalizada.
- Anexo de documentos comprobatórios (diplomas, certificados e RQE) e ativação de disponibilidade para telemedicina.

### 3. 📅 Agendamento & Triagem Clínica
- Associação dinâmica e intuitiva entre pacientes e especialistas cadastrados.
- Agendamento com seleção precisa de data e horário.
- Suporte a consultas **Presenciais** e **Telemedicina** (com link direto para sala virtual).
- Triagem preliminar de dor baseada na **Escala Visual Analógica (EVA de 0 a 10)** com indicadores semafóricos reativos.
- Registro detalhado da queixa principal e histórico sintomático do paciente.

### 4. 🗄️ Central de Registros & Busca Rápida
- Painel centralizado com abas de navegação rápida para Pacientes, Especialistas e Consultas.
- Busca instantânea inteligente por nome, CPF, CRM, especialidade, contato ou data.
- Fichas cadastrais completas exibidas em modais com layout estruturado.
- Persistência de dados local segura (`localStorage`) com suporte a restauração e limpeza de dados.

---

## 🛠️ Tecnologias Utilizadas

- **React 18:** Arquitetura baseada em componentes funcionais e hooks modernos.
- **Vite:** Ferramenta de build de alta performance com Hot Module Replacement (HMR).
- **Lucide React:** Biblioteca de ícones vetoriais modernos e consistentes.
- **Context API:** Gerenciamento de estado global reativo para sincronização em tempo real entre módulos.
- **CSS3 Design System:** Tema escuro Obsidian na navegação lateral, acabamentos em glassmorphism, tipografia JetBrains Mono / Inter e responsividade completa para desktop, tablets e smartphones.

---

## 📂 Estrutura do Projeto

```text
├── src/
│   ├── assets/              # Assets estáticos
│   ├── components/
│   │   ├── dashboard/       # Métricas gerais e atalhos rápidos
│   │   ├── forms/           # Formulários de Paciente, Especialista e Agendamento
│   │   ├── layout/          # Sidebar, Topbar, Toasts e estrutura da aplicação
│   │   └── records/         # Listagens tabulares e modal de ficha detalhada
│   ├── context/             # ClinicContext (provedor de estado global)
│   ├── data/                # Dados mockados e dados iniciais
│   ├── utils/               # Formatadores (CPF, Telefone, Datas)
│   ├── App.jsx              # Componente raiz com navegação de abas
│   ├── main.jsx             # Ponto de entrada da aplicação
│   └── index.css            # Sistema de estilos e design tokens
├── index.html               # Documento base HTML5
├── package.json             # Dependências e scripts npm
└── vite.config.js           # Configurações do Vite
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) (versão 18 ou superior) e o **npm** instalados.

### 1. Clonar o repositório
```bash
git clone https://github.com/matheusvctor/IHC-site-an-lise.git
cd IHC-site-an-lise
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
Abra o navegador no endereço exibido no terminal (geralmente `http://localhost:5173` ou `http://localhost:3000`).

### 4. Gerar build de produção
```bash
npm run build
```
Os arquivos otimizados para produção serão gerados no diretório `dist/`.

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).
