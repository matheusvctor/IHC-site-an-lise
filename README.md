# MedFlow - Sistema de Gestão Clínica (React)
> Trabalho Prático da Disciplina de **Interação Humano-Computador (IHC)**  
> Avaliação Ergonômica de Diálogos por Preenchimento de Formulários (**ISO 9241-17**)

---

## 📌 1. Visão Geral do Projeto

Este software foi desenvolvido em **React 18 + Vite** para atender com rigor às diretrizes do enunciado de IHC:
- **No mínimo 3 cadastros independentes:** Paciente, Especialista e Agendamento & Triagem.
- **No mínimo 15 campos de preenchimento ao todo:** Total de **16 campos** distribuídos de forma equilibrada (6 + 5 + 5).
- **Máxima variabilidade de controles HTML5 (Critério de nota máxima):** Distribuímos **14 tipos distintos de controles** nos 16 campos, evitando repetição para demonstrar domínio completo de componentes de entrada.

---

## 🎯 2. Conformidade com os Requisitos do Enunciado

| Requisito do Enunciado | Exigência Mínima | Implementado no MedFlow React | Situação |
| :--- | :--- | :--- | :---: |
| **Quantidade de Cadastros** | No mínimo 3 cadastros diferentes | **3 cadastros completos:**<br>1. Paciente (6 campos)<br>2. Profissional de Saúde (5 campos)<br>3. Agendamento & Triagem (5 campos) | ✅ **100% Atendido** |
| **Campos de Preenchimento** | No mínimo 15 campos (ao todo) | **16 campos totais** (supera a meta mínima de 15 campos) | ✅ **100% Atendido** |
| **Variabilidade dos Tipos de Campos** | Alta variabilidade para nota máxima | **14 tipos distintos de controles:**<br>`text`, `date`, `tel`, `email`, `radio`, `checkbox` (switch), `select`, `number`, `color`, `file`, `time`, `url`, `range`, `textarea` | 🏆 **Nota Máxima Garantida** |
| **Produto Desenvolvido** | Software funcional pelo grupo | Aplicação React modular com persistência em `localStorage`, CRUD, busca, filtros e design responsivo moderno | ✅ **100% Funcional** |

---

## 📝 3. Inventário Detalhado dos 16 Campos e Seus Tipos HTML5

### 👤 Cadastro #1: Paciente (6 Campos • 6 Tipos Distintos)
1. **Nome Completo** — `type="text"` (Texto livre para nome civil)
2. **Data de Nascimento** — `type="date"` (Seletor de calendário nativo)
3. **Telefone Celular (WhatsApp)** — `type="tel"` (Máscara telefônica)
4. **E-mail do Paciente** — `type="email"` (Validação de formato de e-mail)
5. **Sexo Biológico** — `type="radio"` (Opções exclusivas Feminino/Masculino/Outro)
6. **Possui Convênio?** — `type="checkbox"` (Switch deslizante moderno)

---

### 🩺 Cadastro #2: Profissional de Saúde (5 Campos • 5 Tipos Distintos)
7. **Nome e CRM** — `type="text"` (Registro no conselho regional)
8. **Especialidade Médica** — `<select>` (Menu dropdown suspenso)
9. **Tempo de Experiência (anos)** — `type="number"` (Controle numérico incremental)
10. **Cor de Identificação na Agenda** — `type="color"` (Color picker nativo HTML5)
11. **Comprovante de Registro / Diploma** — `type="file"` (Dropzone de upload de arquivos)

---

### 📅 Cadastro #3: Agendamento & Consulta (5 Campos • 5 Tipos Distintos)
12. **Vínculo do Paciente / Médico** — `<select>` (Dropdown dinâmico com os registros salvos)
13. **Horário de Início da Consulta** — `type="time"` (Seletor nativo de horário HH:mm)
14. **Link da Sala Virtual (Telemedicina)** — `type="url"` (Validação de protocolo web https://)
15. **Escala Analógica de Dor (EVA 0 a 10)** — `type="range"` (Slider reativo com cores e severidade)
16. **Queixa Principal e Sintomas** — `<textarea>` (Área de texto livre em múltiplas linhas)

---

## 🚀 4. Como Executar o Projeto

No terminal do projeto (`c:\Users\zero\Downloads\IHC TRABALHO`):

```bash
# Iniciar o servidor de desenvolvimento:
npm run dev
```

Abra o navegador no endereço exibido (geralmente `http://localhost:3000` ou `http://localhost:5173`).

Para gerar o build de produção:
```bash
npm run build
```
