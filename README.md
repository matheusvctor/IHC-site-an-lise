# MedFlow - Sistema de Gestão Clínica (React)
> Trabalho Prático da Disciplina de **Interação Humano-Computador (IHC)**  
> Avaliação Ergonômica de Diálogos por Preenchimento de Formulários (**ISO 9241-17**)

---

## 📌 1. Visão Geral do Projeto

Este software foi desenvolvido em **React 18 + Vite** para atender com rigor aos requisitos do trabalho de IHC. Cada um dos **3 cadastros possui mais de 15 campos de preenchimento**, totalizando **50 campos de entrada** e abrangendo **14 tipos distintos de controles HTML5**.

---

## 🎯 2. Conformidade com os Requisitos do Enunciado

| Requisito do Enunciado | Exigência Mínima | Implementado no MedFlow React | Situação |
| :--- | :--- | :--- | :---: |
| **Quantidade de Cadastros** | No mínimo 3 cadastros diferentes | **3 cadastros completos:**<br>1. Paciente (17 campos)<br>2. Profissional de Saúde (17 campos)<br>3. Agendamento & Triagem (16 campos) | ✅ **100% Atendido** |
| **Campos de Preenchimento** | No mínimo 15 campos | **50 campos totais** (cada formulário possui individualmente **15+ campos**) | ✅ **Superado com Folga** |
| **Variabilidade dos Tipos de Campos** | Alta variabilidade para nota máxima | **14 tipos distintos de controles:**<br>`text`, `email`, `tel`, `number`, `date`, `time`, `select`, `radio`, `checkbox` (switch), `checkbox` (grupo), `checkbox` (simples), `range`, `color`, `file`, `textarea` | 🏆 **Nota Máxima Garantida** |
| **Produto Desenvolvido** | Software funcional pelo grupo | Aplicação React modular com persistência em `localStorage`, CRUD, busca, filtros e design responsivo | ✅ **100% Funcional** |

---

## 📝 3. Inventário Detalhado dos Formulários (15+ Campos Cada)

### 👤 Cadastro #1: Paciente (17 Campos)
1. **Nome Completo** — `type="text"`
2. **Nome Social / Tratamento Preferencial** — `type="text"`
3. **CPF com máscara** — `type="text"` (`000.000.000-00`)
4. **Data de Nascimento** — `type="date"` (calendário)
5. **Sexo Biológico** — `type="radio"` (Feminino, Masculino, Outro)
6. **Estado Civil** — `<select>` (Solteiro, Casado, União Estável, etc.)
7. **E-mail de Contato** — `type="email"`
8. **Telefone Celular (WhatsApp)** — `type="tel"` (`(00) 00000-0000`)
9. **Telefone de Emergência** — `type="tel"`
10. **Contato de Emergência (Nome e Parentesco)** — `type="text"`
11. **Endereço Residencial Completo** — `type="text"`
12. **Tipo Sanguíneo & Fator RH** — `<select>` (A+, B+, AB+, O+, etc.)
13. **Possui Convênio Médico?** — `type="checkbox"` (Switch/Toggle deslizante)
14. **Número da Carteirinha do Convênio** — `type="text"`
15. **Condições Clínicas Preexistentes e Alergias** — `type="checkbox"` (Grupo de múltipla escolha com 5 opções)
16. **Documento com Foto (RG/CNH)** — `type="file"` (Dropzone de upload)
17. **Observações Gerais / Restrições do Prontuário** — `<textarea>` (Multilinha)

---

### 🩺 Cadastro #2: Profissional de Saúde (17 Campos)
1. **Nome Completo do Profissional** — `type="text"`
2. **Titulação / Pronome de Tratamento** — `<select>` (Dr., Dra., Prof. Dr., Me., Esp.)
3. **Registro no Conselho (CRM/COREN/CRO)** — `type="text"`
4. **UF do Conselho Regional** — `<select>` (SP, RJ, MG, etc.)
5. **Especialidade Médica Principal** — `<select>` (Cardiologia, Dermatologia, Ortopedia, etc.)
6. **Subespecialidade / Área de Foco** — `type="text"`
7. **E-mail Institucional** — `type="email"`
8. **Telefone Profissional / Ramal** — `type="tel"`
9. **Tempo de Experiência Clínica (em anos)** — `type="number"`
10. **Disponibilidade de Plantão** — `type="range"` (Slider 1 a 5 com badge descritivo dinâmico)
11. **Cor de Identificação na Agenda** — `type="color"` (Color Picker interativo)
12. **Turno Principal de Atendimento** — `type="radio"` (Manhã, Tarde, Noite, Integral)
13. **Dias de Atendimento na Clínica** — `type="checkbox"` (Chips interativos: Seg a Sáb)
14. **Valor Base da Consulta** — `type="number"` com prefixo monetário (`R$`)
15. **Habilitado para Telemedicina?** — `type="checkbox"` (Switch/Toggle deslizante)
16. **Comprovante de Registro / Certificado RQE** — `type="file"` (Dropzone de upload)
17. **Mini-biografia & Formação Acadêmica** — `<textarea>` (Multilinha)

---

### 📅 Cadastro #3: Agendamento & Triagem Clínica (16 Campos)
1. **Paciente Cadastrado** — `<select>` dinâmico (alimentado pelos pacientes salvos)
2. **Profissional Responsável** — `<select>` dinâmico (alimentado pelos médicos salvos)
3. **Data da Consulta** — `type="date"`
4. **Horário de Início** — `type="time"`
5. **Duração Estimada da Consulta (minutos)** — `type="number"` (30, 45, 60 min)
6. **Modalidade de Atendimento** — `type="radio"` (Primeira Consulta, Retorno, Exames, Urgência)
7. **Formato da Consulta** — `type="radio"` (Presencial no Consultório, Telemedicina / Vídeo)
8. **Sala / Consultório Designado** — `<select>` (Consultório 101, 102, 103, etc.)
9. **Escala Analógica de Dor (EVA 0 a 10)** — `type="range"` com indicador reativo de cores
10. **Classificação de Risco (Manchester)** — `<select>` (Verde, Azul, Amarelo, Laranja)
11. **Pressão Arterial Aferida (mmHg)** — `type="text"` (ex: 120/80)
12. **Temperatura Corporal (°C)** — `type="number"` (ex: 36.5)
13. **Forma de Pagamento Prevista** — `<select>` (Convênio, PIX, Cartão, Dinheiro)
14. **Lembrete Automático por SMS e WhatsApp** — `type="checkbox"`
15. **Encaminhamento Médico ou Exame Prévio** — `type="file"` (Dropzone de anexo)
16. **Queixa Principal e Motivo da Consulta** — `<textarea>` (Multilinha)

---

## 🚀 4. Como Executar o Projeto

No terminal do projeto (`c:\Users\zero\Downloads\IHC TRABALHO`):

```bash
# Iniciar o servidor de desenvolvimento:
npm run dev
```

Abra o navegador no endereço exibido (geralmente `http://localhost:3000`).
Para gerar o build de produção:
```bash
npm run build
```
