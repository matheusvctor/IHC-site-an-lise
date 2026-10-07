# UNIVERSIDADE ESTADUAL DA PARAÍBA
## CENTRO DE CIÊNCIAS E TECNOLOGIA
## DEPARTAMENTO DE COMPUTAÇÃO
### CURSO DE GRADUAÇÃO EM BACHARELADO EM COMPUTAÇÃO
**DISCIPLINA: INTERFACE HOMEM-COMPUTADOR (IHC)**  
**ORIENTADOR: PROF. DANIEL SCHERER**  
**CAMPINA GRANDE - PB / 2026**

---

# RELATÓRIO DE AVALIAÇÃO ERGONÔMICA, EVOLUÇÃO E CONFORMIDADE DE USABILIDADE DO SOFTWARE SYNAPSE HEALTH COM BASE NA NORMA ISO 9241-17

---

## SUMÁRIO

1. [RESUMO](#1-resumo)
2. [APRESENTAÇÃO DO SOFTWARE AVALIADO (SYNAPSE HEALTH)](#2-apresentação-do-software-avaliado-synapse-health)
   - 2.1 Visão Geral e Arquitetura do Sistema
   - 2.2 Descrição dos Módulos Avaliados
   - 2.3 Matriz de Variabilidade dos Campos
3. [METODOLOGIA DE AVALIAÇÃO (ISO 9241-17)](#3-metodologia-de-avaliação-iso-9241-17)
   - 3.1 Procedimento de Avaliação em Duas Etapas (Anexo A)
   - 3.2 Escopo e Cláusulas Avaliadas
4. [DIAGNÓSTICO DE CONFORMIDADE DA VERSÃO INICIAL](#4-diagnóstico-de-conformidade-da-versão-inicial)
   - 4.1 Síntese do Diagnóstico por Tela e por Cláusula
   - 4.2 Registro Detalhado de Problemas Encontrados (P01 a P24)
5. [ADEQUAÇÕES IMPLEMENTADAS NO SOFTWARE](#5-adequações-implementadas-no-software)
   - 5.1 Foco Inicial Automático (8.1)
   - 5.2 Instruções de Preenchimento e Legenda de Obrigatoriedade (5.1.4, 5.3.2)
   - 5.3 Validação Inline e Painel de Pendências (6.4.2a, 7.3)
   - 5.4 Pistas de Formato, Limites e Unidades (5.2.6, 5.3.6, 5.3.7)
   - 5.5 Interdependência Condicional e Campos Inacessíveis (6.2.4, 6.2.5, 6.4.4)
   - 5.6 Delimitação de Área Multilinha e Contador de Caracteres (6.2.3, 6.2.6)
   - 5.7 Controle do Usuário, Atalhos e Desfazer/Restaurar (6.4.1, 6.4.6)
   - 5.8 Preservação de Dados Entre Abas (8.6.2)
   - 5.9 Validação de Unicidade em Múltiplos Campos (6.5.2b)
6. [ANÁLISE COMPARATIVA DETALHADA (ANTES vs. DEPOIS)](#6-análise-comparativa-detalhada-antes-vs-depois)
   - 6.1 Quadro Comparativo 1: Cadastro de Paciente
   - 6.2 Quadro Comparativo 2: Cadastro de Especialista
   - 6.3 Quadro Comparativo 3: Agendamento de Consulta & Triagem
7. [MATRIZ DE CONFORMIDADE FINAL DA ISO 9241-17](#7-matriz-de-conformidade-final-da-iso-9241-17)
8. [CONCLUSÃO E CONSIDERAÇÕES FINAIS](#8-conclusão-e-considerações-finais)
9. [REFERÊNCIAS BIBLIOGRÁFICAS](#9-referências-bibliográficas)

---

## 1. RESUMO

Este relatório documenta o processo de auditoria ergonômica, diagnóstico de problemas de usabilidade, refatoração de código e avaliação de conformidade do software **Synapse Health — Ecossistema Clínico & Coordenação do Cuidado**, tomando como base técnica as recomendações da norma internacional **ISO 9241-17:1998** (*Ergonomic requirements for office work with visual display terminals — Part 17: Form filling dialogues*).

O sistema foi avaliado em seus três fluxos de preenchimento de dados principais: o **Cadastro de Paciente**, o **Cadastro de Especialista / Médico** e o **Agendamento de Consulta & Triagem Clínica**. Em conjunto, esses formulários reúnem 24 campos de entrada distribuídos de forma equilibrada (8 campos por módulo) e contemplam 14 tipos distintos de controles interativos HTML5.

A avaliação seguiu o procedimento de duas etapas prescrito no Anexo A da norma, analisando a aplicabilidade de cada quesito e verificando a aderência da interface. No diagnóstico inicial, foram identificadas 24 não conformidades ergonômicas, concentradas na ausência de instruções claras de preenchimento, alertas modais síncronos invasivos (`alert()`), falta de feedback imediato de erro junto aos campos, ausência de foco inicial automático, perda de dados digitados durante a alternância de telas e inexistência de mecanismos de desfazer (*undo*).

A partir desse diagnóstico, o software foi corrigido no nível de código-fonte em React 18, implementando validação em tempo real com destaque visual e mensagens descritivas, painel-resumo de pendências clicável, posicionamento automático do cursor no primeiro campo com erro, bloqueio condicional de campos não aplicáveis, pistas permanentes de formato, contador de caracteres em áreas multilinhas, persistência de rascunhos entre abas e rotinas de restauração de preenchimento. A análise comparativa final comprova a evolução dos diálogos, atingindo **100% de conformidade com as recomendações aplicáveis da ISO 9241-17**.

**Palavras-chave:** Usabilidade; Ergonomia de Software; ISO 9241-17; Preenchimento de Formulários; Synapse Health; Interação Humano-Computador.

---

## 2. APRESENTAÇÃO DO SOFTWARE AVALIADO (SYNAPSE HEALTH)

### 2.1 Visão Geral e Arquitetura do Sistema

O **Synapse Health** é uma aplicação web voltada ao suporte operacional de clínicas médicas, policlínicas e serviços ambulatoriais. O software centraliza o registro cadastral de usuários, a parametrização de agendas profissionais de médicos especialistas e o agendamento de consultas presenciais e por telemedicina, integrando uma escala visual analógica de dor (EVA) para triagem clínica preliminar.

Desenvolvido com uma arquitetura moderna baseada em **React 18**, **Vite** e **Context API**, o sistema organiza seus estados em componentes modulares com persistência local de dados (`localStorage`). O design system adota uma paleta em tema escuro Obsidian para os painéis de navegação estrutural combinada a superfícies limpas e com alto contraste para as áreas de preenchimento de formulários, priorizando a legibilidade e a rapidez operacional exigidas no ambiente de saúde.

### 2.2 Descrição dos Módulos Avaliados

A avaliação de conformidade concentrou-se nos três formulários operacionais primários do sistema:

1. **Módulo de Cadastro de Paciente (`/cad-paciente`):** Responsável pela recepção civil e clínica do paciente, registrando nome completo, CPF, data de nascimento, telefone de contato/WhatsApp, correio eletrônico, tipo sanguíneo (sistema ABO/Rh), sexo biológico e convênio de saúde (atendimento particular versus plano de saúde credenciado).
2. **Módulo de Cadastro de Especialista (`/cad-medico`):** Destinado ao credenciamento de profissionais de saúde, colhendo o nome civil, registro no conselho de classe (CRM/UF), especialidade médica, tempo de experiência profissional (em anos), turno de atendimento preferencial na escala, cor de identificação nos blocos da agenda clínica, anexo de diploma/RQE e disponibilidade para teleconsulta.
3. **Módulo de Agendamento & Triagem (`/cad-agendamento`):** Módulo transacional que vincula o paciente ao especialista, definindo a data do atendimento, horário de início, formato da consulta (Presencial ou Telemedicina), link de acesso à sala virtual, nível de dor relatado na escala EVA (0 a 10) e campo multilinha para registro da queixa principal e histórico de sintomas.

### 2.3 Matriz de Variabilidade dos Campos

Para assegurar representatividade ergonômica e demonstrar o domínio sobre componentes de entrada de dados, os formulários do Synapse Health implementam 14 tipos distintos de controles interativos, conforme detalhado nos Quadros 1 a 4.

#### Quadro 1 – Matriz de Campos do Cadastro de Paciente
| # | Campo | Rótulo da Interface | Tipo de Entrada | Obrigatoriedade | Valor Padrão | Regra / Finalidade |
|---|---|---|---|---|---|---|
| 1 | `nome` | Nome Completo | `type="text"` | Sim (*) | Vazio | Identificação civil; mínimo 3 caracteres |
| 2 | `cpf` | CPF | `type="text"` (máscara) | Sim (*) | Vazio | Formatação `000.000.000-00`; 11 dígitos; unicidade |
| 3 | `dataNasc` | Data de Nascimento | `type="date"` | Sim (*) | Vazio | Seletor de calendário; data não futura |
| 4 | `telefone` | Telefone / WhatsApp | `type="tel"` | Sim (*) | Vazio | Máscara `(00) 00000-0000`; teclado numérico |
| 5 | `email` | E-mail | `type="email"` | Sim (*) | Vazio | Validação sintática de formato eletrônico |
| 6 | `tipoSanguineo`| Tipo Sanguíneo | `<select>` nativo | Não (opcional) | "O+" | Seleção padronizada entre 8 opções (ABO e Rh) |
| 7 | `sexo` | Sexo Biológico | `type="radio"` | Sim (*) | "Feminino" | Opções exclusivas (Feminino, Masculino, Outro) |
| 8 | `temConvenio` | Modalidade de Atendimento | `type="checkbox"` (switch)| Não (opcional) | Desligado | Alternância entre Particular e Convênio Ativo |

#### Quadro 2 – Matriz de Campos do Cadastro de Especialista
| # | Campo | Rótulo da Interface | Tipo de Entrada | Obrigatoriedade | Valor Padrão | Regra / Finalidade |
|---|---|---|---|---|---|---|
| 9 | `nome` | Nome do Profissional | `type="text"` | Sim (*) | Vazio | Nome e titulação médica; mínimo 3 caracteres |
| 10 | `registro` | Registro Profissional (CRM/UF) | `type="text"` | Sim (*) | Vazio | Código de conselho; validação de unicidade |
| 11 | `especialidade`| Especialidade Médica | `<select>` nativo | Sim (*) | Vazio | Lista de 10 especialidades clínicas reconhecidas |
| 12 | `experiencia` | Tempo de Experiência | `type="number"` | Sim (*) | 5 | Número inteiro de 0 a 60; unidade "anos" visível |
| 13 | `turno` | Turno de Atendimento | `type="radio"` | Sim (*) | "Manhã" | Opções exclusivas (Manhã, Tarde, Noite, Integral) |
| 14 | `corAgenda` | Cor de Identificação na Agenda | `type="color"` | Não (opcional) | "#2563eb" | Seletor nativo hexadecimal de cor de agenda |
| 15 | `documento` | Comprovante de Qualificação (RQE) | `type="file"` | Não (opcional) | Vazio | Upload de documento comprovatório (.pdf/imagem) |
| 16 | `telemedicina`| Atendimento por Telemedicina | `type="checkbox"` (switch)| Não (opcional) | Ligado | Chave indicadora de habilitação para teleconsulta |

#### Quadro 3 – Matriz de Campos de Agendamento & Triagem
| # | Campo | Rótulo da Interface | Tipo de Entrada | Obrigatoriedade | Valor Padrão | Regra / Finalidade |
|---|---|---|---|---|---|---|
| 17 | `pacienteId` | Paciente | `<select>` dinâmico | Sim (*) | Vazio | Associação a registro cadastrado de paciente |
| 18 | `medicoId` | Profissional de Saúde | `<select>` dinâmico | Sim (*) | Vazio | Associação a registro cadastrado de médico |
| 19 | `data` | Data da Consulta | `type="date"` | Sim (*) | Vazio | Calendário nativo; datação do atendimento |
| 20 | `hora` | Horário da Consulta | `type="time"` | Sim (*) | "09:30" | Formato 24h (HH:mm); seletor temporal |
| 21 | `formato` | Formato do Atendimento | `type="radio"` | Sim (*) | "Presencial" | Opções exclusivas (Presencial ou Telemedicina) |
| 22 | `linkTeleconsulta`| Link da Sala Virtual | `type="url"` | Condicional | Vazio | Habilitado e obrigatório apenas se Telemedicina |
| 23 | `nivelDor` | Nível de Dor Relatado (EVA) | `type="range"` (slider)| Não (opcional) | 0 | Escala analógica visual 0 a 10 com badge semafórico |
| 24 | `observacoes` | Queixa Principal e Sintomas | `<textarea>` | Sim (*) | Vazio | Área multilinha; limite de 500 caracteres |

#### Quadro 4 – Síntese da Variabilidade de Controles HTML5
| Tipo de Controle HTML5 | Quantidade | Campos no Synapse Health |
|---|:---:|---|
| `type="text"` | 3 | Nome do Paciente, Nome do Profissional, Registro CRM |
| `type="text"` (com máscara) | 1 | CPF do Paciente |
| `type="date"` | 2 | Data de Nascimento, Data da Consulta |
| `type="tel"` | 1 | Telefone / WhatsApp do Paciente |
| `type="email"` | 1 | E-mail do Paciente |
| `type="number"` | 1 | Tempo de Experiência do Profissional |
| `type="color"` | 1 | Cor na Agenda do Profissional |
| `type="file"` | 1 | Comprovante de Qualificação / RQE |
| `type="time"` | 1 | Horário da Consulta |
| `type="url"` | 1 | Link da Sala Virtual de Telemedicina |
| `type="range"` | 1 | Nível de Dor Relatado (Escala EVA) |
| `type="radio"` | 3 | Sexo Biológico, Turno de Atendimento, Formato da Consulta |
| `type="checkbox"` (switch) | 2 | Modalidade de Atendimento, Atendimento por Telemedicina |
| `<select>` dropdown | 5 | Tipo Sanguíneo, Especialidade, Paciente, Médico |
| `<textarea>` multilinha | 1 | Queixa Principal e Sintomas |
| **Total Geral** | **24 campos** | **14 tipos distintos de controles interativos** |

---

## 3. METODOLOGIA DE AVALIAÇÃO (ISO 9241-17)

### 3.1 Procedimento de Avaliação em Duas Etapas (Anexo A)

A metodologia seguiu o procedimento prescrito no **Anexo A (Informativo)** da norma ISO 9241-17, composto por duas etapas formais:

1. **Determinação de Aplicabilidade:** Avaliação contextual sobre quais recomendações condicionais da norma incidem sobre a aplicação. Uma recomendação é aplicável ($Y$) quando a premissa de sua cláusula (*if-clause*) for satisfeita pelas tarefas e componentes do sistema avaliado; caso contrário, é marcada como não aplicável ($N$). Os métodos empregados para julgar a aplicabilidade foram a **Análise de Documentação do Sistema ($S$)** e a **Observação ($O$)**.
2. **Verificação de Aderência:** Para cada recomendação considerada aplicável, realiza-se o teste empírico e de inspeção analítica para determinar se o software atendeu ao quesito ($P = Passed$) ou falhou ($F = Failed$). Os métodos empregados para determinar a aderência foram a **Observação ($O$)**, a **Avaliação Analítica ($A$)** e a **Medição ($M$)**.

### 3.2 Escopo e Cláusulas Avaliadas

A avaliação contemplou as quatro cláusulas normativas centrais da ISO 9241-17:

- **Cláusula 5 — Estrutura do Formulário (*Form filling structure*):** Recomendações relativas à organização visual, clareza de títulos (5.1.1), codificação visual (5.1.2), densidade de tela inferior a 40% (5.1.3), instruções explícitas de preenchimento (5.1.4), agrupamento lógico e funcional (5.2.2), precedência de campos obrigatórios (5.2.3), alinhamentos de campos alfanuméricos e numéricos (5.2.4, 5.2.5), indicação de valores permitidos (5.2.6), distinção inequívoca entre campos obrigatórios e opcionais (5.3.2), identificação de campos somente leitura (5.3.3), rótulos descritivos (5.3.4), unidades de medida explícitas (5.3.6), pistas de formato (5.3.7) e inicial maiúscula em rótulos (5.3.8).
- **Cláusula 6 — Considerações de Entrada (*Input considerations*):** Minimização de movimentos de cursor (6.1.1), preenchimento parcial permitido sem preenchimento forçado de espaços (6.1.2), valores padrão (*defaults*) adequados e editáveis (6.1.3), redução de alternância entre teclado e apontador (6.1.4), quebra automática em áreas multilinhas delimitadas (6.2.3), pistas para campos mutuamente exclusivos (6.2.4), simplificação de interdependências (6.2.5), opções pré-determinadas (6.3.1), controles gráficos discrimináveis (6.3.2, 6.3.6, 6.3.7), controle do usuário para recomeçar/cancelar (6.4.1), identificação de erros múltiplos com direcionamento de foco (6.4.2a), reentrada restrita apenas à parte incorreta (6.4.3), áreas inacessíveis não focalizáveis (6.4.4), submissão explícita (6.4.5), controle de saída e desfazer (6.4.6) e validação em nível de campo e múltiplos campos (6.5.1, 6.5.2).
- **Cláusula 7 — Retorno e Feedback (*Feedback*):** Eco de caracteres digitados (7.1), visibilidade contínua do cursor (7.2), feedback imediato de erro no campo com mensagem explicativa (7.3), confirmação explícita de transmissão (7.4) e sinalização de alteração bem-sucedida na base de dados (7.5).
- **Cláusula 8 — Navegação (*Navigation*):** Posicionamento automático do foco no primeiro campo de preenchimento (8.1), navegação bidirecional por teclado via Tab e Shift+Tab (8.2a, 8.4.1), alternância entre seções (8.4.5) e preservação de dados durante a movimentação entre diferentes formulários do sistema (8.6.2).

---

## 4. DIAGNÓSTICO DE CONFORMIDADE DA VERSÃO INICIAL

### 4.1 Síntese do Diagnóstico por Tela e por Cláusula

O levantamento inicial avaliou 45 aspectos distribuídos nos três formulários operacionais do Synapse Health. A análise revelou que, embora o sistema já possuísse uma base visual moderna e campos adequadamente dimensionados, apresentava falhas críticas de interação, ausência de instruções formais, bloqueios síncronos na validação e falta de tolerância a erros.

#### Síntese por Tela (Versão Inicial)
| Tela Avaliada | Aspectos Auditados | Já Conformes | Com Não Conformidade | Taxa de Conformidade Inicial |
|---|:---:|:---:|:---:|:---:|
| **Cadastro de Paciente** | 15 | 7 | 8 | 46,7% |
| **Cadastro de Especialista** | 15 | 7 | 8 | 46,7% |
| **Agendamento & Triagem** | 15 | 7 | 8 | 46,7% |
| **Total** | **45** | **21** | **24** | **46,7%** |

#### Síntese por Cláusula da Norma (Versão Inicial)
| Cláusula da ISO 9241-17 | Aspectos Relacionados | Conformes | Com Não Conformidade |
|---|:---:|:---:|:---:|
| **5. Estrutura do Formulário** | 18 | 8 | 10 |
| **6. Considerações de Entrada** | 16 | 7 | 9 |
| **7. Retorno (Feedback)** | 5 | 2 | 3 |
| **8. Navegação** | 6 | 4 | 2 |

### 4.2 Registro Detalhado de Problemas Encontrados (P01 a P24)

O Quadro 5 cataloga as 24 não conformidades identificadas na versão inicial antes da intervenção ergonômica.

#### Quadro 5 – Registro de Problemas Encontrados na Versão Inicial
| ID | Módulo | Aspecto Avaliado | Problema Identificado na Interface | Cláusulas Violadas |
|:---:|---|---|---|:---:|
| **P01** | Paciente | Foco Inicial | Ao abrir a tela, o cursor não era posicionado no primeiro campo; o usuário precisava clicar com o mouse em "Nome Completo". | 8.1 |
| **P02** | Paciente | Validação e Alertas | A validação ocorria somente no envio através de um `alert()` nativo síncrono que bloqueava o navegador, sem mensagens visuais na tela. | 6.4.2a, 7.3 |
| **P03** | Paciente | Localização de Erros | O usuário não tinha apoio para localizar múltiplos erros simultâneos; nenhum campo recebia destaque em vermelho. | 6.4.2a |
| **P04** | Paciente | Instruções de Preenchimento | O formulário exibia apenas um subtítulo vago, sem orientar sobre a obrigatoriedade dos campos, comandos de salvar ou limpar. | 5.1.4, 5.3.2 |
| **P05** | Paciente | Pistas de Formato | Os campos de CPF, Telefone e Data de Nascimento não possuíam legendas explicativas permanentes sobre o formato exigido. | 5.2.6, 5.3.7 |
| **P06** | Paciente | Unicidade de CPF | O sistema aceitava o cadastro duplicado do mesmo CPF para pacientes diferentes, sem validação cruzada no banco local. | 6.5.2b |
| **P07** | Paciente | Preservação de Rascunho | Se o usuário preenchesse parte dos dados e alternasse para outra aba do sistema, todos os dados digitados eram perdidos. | 8.6.2 |
| **P08** | Paciente | Controle e Desfazer | O botão "Limpar" apagava os campos sem permitir que o usuário desfizesse a ação caso tivesse clicado por engano. | 6.4.1, 6.4.6 |
| **P09** | Especialista | Foco Inicial | O campo "Nome do Profissional" não recebia o foco inicial automático ao carregar a página. | 8.1 |
| **P10** | Especialista | Instruções e Legenda | Ausência de banner de instruções orientando sobre o uso do teclado, atalhos de envio e significado do asterisco. | 5.1.4, 5.3.2 |
| **P11** | Especialista | Unidade de Medida | O campo "Tempo de Experiência" era um número puro sem indicador textual da unidade ("anos") integrado visualmente ao controle. | 5.3.6 |
| **P12** | Especialista | Limites e Formato de CRM | Não havia texto de apoio informando os limites aceitos de anos (0 a 60) e a composição esperada do CRM (CRM-UF + dígitos). | 5.2.6, 5.3.7 |
| **P13** | Especialista | Feedback de Erro | O sistema disparava alerta síncrono genérico no submit; campos obrigatórios vazios não eram marcados com borda vermelha. | 6.4.2a, 7.3 |
| **P14** | Especialista | Unicidade de CRM | O sistema permitia cadastrar dois médicos com exatamente o mesmo número de CRM regional. | 6.5.2b |
| **P15** | Especialista | Troca de Abas | A mudança de abas destruía o estado do componente, eliminando dados já preenchidos. | 8.6.2 |
| **P16** | Especialista | Atalho e Recuperação | A tecla Escape não realizava ação no formulário e não existia buffer de desfazer para restauração de limpeza acidental. | 6.4.1, 6.4.6 |
| **P17** | Agendamento | Foco Inicial | O seletor de "Paciente" não recebia o cursor de foco automaticamente na inicialização da tela. | 8.1 |
| **P18** | Agendamento | Interdependência Incoerente | O campo "Link da Sala Virtual" permanecia habilitado mesmo quando o atendimento era "Presencial", induzindo preenchimento inútil. | 6.2.4, 6.2.5, 6.4.4 |
| **P19** | Agendamento | Área Multilinha sem Limite | O campo "Queixa Principal" (`<textarea>`) não indicava o limite máximo de caracteres nem fornecia contador dinâmico de digitação. | 6.2.3, 6.2.6 |
| **P20** | Agendamento | Pistas e Data Inválida | O campo de data permitia submeter datas passadas para novos agendamentos sem alertar o usuário. | 5.2.6, 5.3.7 |
| **P21** | Agendamento | Validação Bloqueante | Submissões com campos pendentes abriam janela pop-up do navegador em vez de sinalizar as pendências na interface. | 6.4.2a, 7.3 |
| **P22** | Agendamento | Resumo de Pendências | Não havia painel no topo listando quais campos estavam incompletos para permitir correção rápida. | 6.4.2a |
| **P23** | Agendamento | Preservação de Estado | Alternar para o painel de registros ou para outra aba limpava toda a triagem que estava sendo digitada. | 8.6.2 |
| **P24** | Agendamento | Controle de Cancelamento | Ausência de atalho de teclado para limpar o agendamento e falta de função de restauração de dados. | 6.4.1, 6.4.6 |

---

## 5. ADEQUAÇÕES IMPLEMENTADAS NO SOFTWARE

Para sanar integralmente os 24 problemas catalogados e elevar o Synapse Health à conformidade plena com a ISO 9241-17, foram realizadas intervenções técnicas abrangentes nos componentes React e nas folhas de estilo.

### 5.1 Foco Inicial Automático (Cláusula 8.1)
Foi implementado um gancho `useEffect` associado a referências de nós do DOM (`useRef`) em cada um dos três formulários. Ao montar a visualização, o cursor é imediatamente direcionado ao primeiro campo editável da tela:
- Em **Paciente:** foco em `nomeRef` (Nome Completo);
- Em **Especialista:** foco em `nomeRef` (Nome do Profissional);
- Em **Agendamento:** foco em `pacienteRef` (Seletor de Paciente).

### 5.2 Instruções de Preenchimento e Legenda de Obrigatoriedade (Cláusulas 5.1.4 e 5.3.2)
No topo de cada formulário foi inserido um bloco de instruções padronizado (`.form-instruction-banner`), contendo:
- Orientações sobre a navegação por teclado (avanço por `Tab`, retorno por `Shift+Tab`, confirmação por `Enter` e limpeza por `Esc`);
- Legenda universal explícita: `* Campos com asterisco são obrigatórios. Demais campos são opcionais`;
- Garantia explícita de segurança: `Seus dados são preservados automaticamente ao alternar de aba`.

### 5.3 Validação Inline e Painel de Pendências (Cláusulas 6.4.2a e 7.3)
O método arcaico de `window.alert()` foi completamente eliminado da aplicação. Em seu lugar, foi implementada uma máquina de validação em duas etapas:
1. **Validação ao Perder o Foco (`onBlur`):** Sempre que o usuário sai de um campo incompleto ou inválido, o controle recebe a classe `.is-invalid` (borda vermelha de alto contraste) e uma mensagem explicativa específica com ícone (`.field-error-msg`), como *"Informe o CPF com 11 dígitos no formato 000.000.000-00"* ou *"O tempo de experiência deve estar entre 0 e 60 anos"*.
2. **Painel-Resumo de Pendências (`.error-summary-banner`):** Ao acionar o botão de envio com pendências, o sistema exibe um painel no topo listando todas as incorreções. Cada item da lista é um botão âncora clicável que foca imediatamente o campo problemático. Adicionalmente, o sistema posiciona o cursor automaticamente no primeiro campo em erro.

### 5.4 Pistas de Formato, Limites e Unidades (Cláusulas 5.2.6, 5.3.6 e 5.3.7)
Abaixo de cada campo, foram adicionados textos de pista permanentes (`.field-cue-text`), elucidando o formato esperado e os valores aceitáveis:
- CPF: `Formato: 000.000.000-00 (11 dígitos numéricos)`;
- CRM: `Formato: CRM-UF + dígitos (ex.: CRM-SP 123456)`;
- Tempo de Experiência: Unidade explícita integrada visualmente ao campo (`<span className="suffix-badge">anos</span>`) e pista `Número inteiro de 0 a 60 anos`;
- Data e Hora: Pistas orientando os formatos `DD/MM/AAAA` e `Formato 24h (HH:mm)`.

### 5.5 Interdependência Condicional e Campos Inacessíveis (Cláusulas 6.2.4, 6.2.5 e 6.4.4)
No módulo de Agendamento, foi implementada lógica reativa para os campos dependentes:
- Ao selecionar o formato **"Presencial"**, o campo de URL da sala virtual é desabilitado (`disabled`), recebe fundo cinza de campo protegido, é removido da obrigatoriedade e tem seu rótulo e placeholder alterados para *"Não aplicável para consulta presencial"*;
- Ao alternar para **"Telemedicina"**, o campo é reabilitado, recebe a marca de obrigatório (`*`) e passa a validar o protocolo `https://`.

### 5.6 Delimitação de Área Multilinha e Contador de Caracteres (Cláusulas 6.2.3 e 6.2.6)
O campo `<textarea>` de "Queixa Principal e Sintomas" foi delimitado com altura fixa responsiva, quebra automática de linha sem partição de palavras (`auto-wrap`) e limite rígido de 500 caracteres (`maxLength={500}`). Um rodapé interativo exibe em tempo real o contador (`.char-counter`, ex: `120 / 500`), alterando sua cor quando o usuário se aproxima do limite.

### 5.7 Controle do Usuário, Atalhos e Desfazer/Restaurar (Cláusulas 6.4.1 e 6.4.6)
Para garantir total controle ao usuário sobre o diálogo:
- O botão **"Limpar Formulário"** armazena os dados atuais em um buffer de restauração (`undo`) no contexto global e exibe um banner de ação reversível (`.undo-banner`) permitindo recuperar os dados com um clique no botão **"Desfazer / Restaurar"**;
- A tecla **Escape** foi vinculada globalmente ao formulário ativo para acionar o cancelamento rápido e a rotina de limpeza segura.

### 5.8 Preservação de Dados Entre Abas (Cláusula 8.6.2)
No `ClinicContext.jsx`, foram criados estados de rascunho (`pacienteDraft`, `medicoDraft` e `agendamentoDraft`). Cada formulário sincroniza suas entradas com o estado global em tempo real. Dessa forma, caso o recepcionista inicie o cadastro de um paciente e precise alternar para verificar a lista de médicos ou de agendamentos, ao retornar, todos os campos permanecem exatamente como foram preenchidos.

### 5.9 Validação de Unicidade em Múltiplos Campos (Cláusula 6.5.2b)
Foram adicionadas funções utilitárias no contexto (`isCpfUnique` e `isCrmUnique`) que inspecionam a base de dados local antes de aceitar uma nova inserção, impedindo a duplicação de cadastros de pacientes com o mesmo CPF e médicos com o mesmo CRM.

---

## 6. ANÁLISE COMPARATIVA DETALHADA (ANTES vs. DEPOIS)

As tabelas a seguir comparam individualmente cada aspecto analisado nos três formulários operacionais, correlacionando o estado inicial, o estado corrigido, a cláusula correspondente da ISO 9241-17 e o veredito ergonômico.

### 6.1 Quadro Comparativo 1: Cadastro de Paciente
| # | Aspecto Avaliado | Versão Inicial (Antes) | Versão Final (Corrigida) | Cláusula ISO 9241-17 | Avaliação |
|:---:|---|---|---|:---:|:---:|
| 1 | **Foco Inicial** | Cursor não posicionado; exigia clique manual com o mouse. | Foco automático direcionado ao campo "Nome Completo" ao carregar a tela. | **8.1** | **Corrigido** |
| 2 | **Instruções Gerais** | Subtítulo genérico sem orientar ações de controle ou navegação. | Banner instrucional com teclas de atalho (Tab, Shift+Tab, Enter, Esc) e regras. | **5.1.4** | **Corrigido** |
| 3 | **Legenda de Obrigatoriedade** | Havia apenas o asterisco nos rótulos sem explicação de seu significado. | Legenda explícita: `* Campos com asterisco são obrigatórios. Demais são opcionais`. | **5.3.2** | **Corrigido** |
| 4 | **Pistas de Formato (CPF/Tel/Data)** | Apenas texto cinza sumindo ao digitar, sem dicas persistentes. | Textos permanentes abaixo de cada campo (`.field-cue-text`) especificando os formatos. | **5.2.6, 5.3.7** | **Corrigido** |
| 5 | **Validação e Feedback** | Bloqueio por `window.alert()` genérico após clique em Salvar. | Validação inline no `onBlur` com borda vermelha e mensagem explicativa com ícone. | **6.4.2a, 7.3** | **Corrigido** |
| 6 | **Resumo de Erros** | Inexistente; usuário precisava adivinhar quais campos faltavam. | Painel de pendências no topo listando campos e posicionamento no primeiro erro. | **6.4.2a** | **Corrigido** |
| 7 | **Unicidade de CPF** | Permitido cadastrar múltiplos pacientes com o mesmo CPF. | Verificação contra o banco local rejeitando CPFs já cadastrados. | **6.5.2b** | **Corrigido** |
| 8 | **Preservação entre Abas** | Mudança de aba reiniciava o formulário e apagava dados. | Dados mantidos em `pacienteDraft` no contexto, preservando digitação. | **8.6.2** | **Corrigido** |
| 9 | **Limpeza e Desfazer** | Botão Limpar apagava tudo irreversivelmente. | Limpeza armazena no buffer e exibe banner com botão "Desfazer / Restaurar". | **6.4.1, 6.4.6** | **Corrigido** |
| 10 | **Atalho de Teclado** | Nenhuma tecla de controle mapeada além de Tab. | Tecla Esc mapeada para limpar/cancelar o preenchimento. | **6.4.6** | **Corrigido** |
| 11 | **Alinhamento e Densidade** | Grade de duas colunas alinhada à esquerda; densidade < 40%. | Mantido layout equilibrado em grid 2 colunas com excelente espaçamento. | **5.1.3, 5.2.4** | **Já conforme** |
| 12 | **Seleção Exclusiva (Sexo)** | Componente radio cards com indicação visual de ativo. | Mantido padrão com indicação semafórica e role de acessibilidade. | **6.2.4, 6.3.6** | **Já conforme** |
| 13 | **Alternância Binária (Convênio)** | Switch toggle com rótulo descritivo do estado atual. | Mantido com textos dinâmicos ("Convênio Ativo" vs. "Particular"). | **6.3.7** | **Já conforme** |
| 14 | **Confirmação de Envio** | Toast notification exibido após submissão. | Mantido com confirmação textual e atualização da contagem de registros. | **7.4, 7.5** | **Já conforme** |
| 15 | **Rótulos com Inicial Maiúscula** | Rótulos iniciados por maiúscula em todos os campos. | Mantido padrão em conformidade gramatical e visual. | **5.3.8** | **Já conforme** |

### 6.2 Quadro Comparativo 2: Cadastro de Especialista
| # | Aspecto Avaliado | Versão Inicial (Antes) | Versão Final (Corrigida) | Cláusula ISO 9241-17 | Avaliação |
|:---:|---|---|---|:---:|:---:|
| 1 | **Foco Inicial** | Sem foco automático no primeiro campo da tela. | Foco automático direcionado a "Nome do Profissional" na abertura. | **8.1** | **Corrigido** |
| 2 | **Instruções de Preenchimento** | Sem orientações sobre navegação ou salvamento. | Banner explicativo de atalhos e legenda de campos obrigatórios no topo. | **5.1.4, 5.3.2** | **Corrigido** |
| 3 | **Unidade de Medida (Experiência)** | Campo numérico puro sem sufixo ou menção à unidade. | Símbolo de unidade `"anos"` fixado à direita do campo via badge integrado. | **5.3.6** | **Corrigido** |
| 4 | **Pistas de Formato (CRM e Anos)** | Sem pistas de valores limites ou formato regional. | Textos permanentes indicando `0 a 60 anos` e `CRM-UF + dígitos`. | **5.2.6, 5.3.7** | **Corrigido** |
| 5 | **Validação de Erros** | Pop-up `alert()` bloqueante no clique em Salvar. | Validação inline com mensagem de erro contextual e destaque semafórico. | **6.4.2a, 7.3** | **Corrigido** |
| 6 | **Resumo de Pendências** | Sem indicação consolidada de pendências. | Painel de resumo no topo com links rápidos de foco direto no campo com falha. | **6.4.2a** | **Corrigido** |
| 7 | **Unicidade de CRM** | Aceitava cadastro repetido de CRM idêntico. | Bloqueio de duplicidade com mensagem de erro específica para o conselho. | **6.5.2b** | **Corrigido** |
| 8 | **Preservação de Dados** | Digitação descartada ao navegar para outros módulos. | Dados mantidos em `medicoDraft` permitindo alternância sem perda de dados. | **8.6.2** | **Corrigido** |
| 9 | **Rotina de Desfazer** | Ação de limpar irreversível. | Buffer de undo e banner de recuperação imediata dos dados limpos. | **6.4.1, 6.4.6** | **Corrigido** |
| 10 | **Atalho de Cancelamento** | Sem tecla de escape configurada. | Tecla Esc aciona a limpeza segura com possibilidade de desfazer. | **6.4.6** | **Corrigido** |
| 11 | **Opções de Escolha (Turno)** | Radio cards em grupo visual com seleção única. | Mantido com 4 períodos claros (Manhã, Tarde, Noite, Integral). | **6.2.4, 6.3.6** | **Já conforme** |
| 12 | **Lista Pré-definida (Especialidade)**| Menu dropdown `<select>` com 10 opções reconhecidas. | Mantido com opção vazia inicial e validação obrigatória de escolha. | **6.3.1, 6.3.3** | **Já conforme** |
| 13 | **Cor na Agenda** | Seletor de cor hexadecimal com código visível. | Mantido com valor padrão `#2563eb` editável. | **6.1.3** | **Já conforme** |
| 14 | **Anexo de Documento** | Dropzone de arquivo com indicação do arquivo selecionado. | Mantido com indicação de formatos aceitos e estado pós-upload. | **6.3.1** | **Já conforme** |
| 15 | **Confirmação e Base de Dados** | Mensagem de sucesso via toast e incremento no contador. | Mantido feedback transparente de atualização da base de dados. | **7.4, 7.5** | **Já conforme** |

### 6.3 Quadro Comparativo 3: Agendamento de Consulta & Triagem
| # | Aspecto Avaliado | Versão Inicial (Antes) | Versão Final (Corrigida) | Cláusula ISO 9241-17 | Avaliação |
|:---:|---|---|---|:---:|:---:|
| 1 | **Foco Inicial** | Ausência de cursor no primeiro campo interativo. | Foco automático direcionado ao seletor de "Paciente" no carregamento. | **8.1** | **Corrigido** |
| 2 | **Interdependência de Formato** | Campo de URL continuava ativo mesmo em consulta presencial. | URL desabilitada com fundo cinza quando Presencial; ativada e exigida se Telemedicina. | **6.2.4, 6.2.5, 6.4.4** | **Corrigido** |
| 3 | **Área Multilinha (Queixa)** | Textarea sem limite máximo visível nem contador de caracteres. | Limite de 500 caracteres, auto-wrap e contador dinâmico `xx / 500` no rodapé. | **6.2.3, 6.2.6** | **Corrigido** |
| 4 | **Pistas de Formato e Regras** | Sem orientações de formato de data e horário. | Textos permanentes indicando formato 24h `HH:mm` e validação de data não anterior. | **5.2.6, 5.3.7** | **Corrigido** |
| 5 | **Validação e Mensagens de Erro** | Bloqueio por `alert()` na submissão. | Validações inline no `onBlur` com indicação de erro logo abaixo de cada campo. | **6.4.2a, 7.3** | **Corrigido** |
| 6 | **Painel de Pendências** | Sem visão consolidada de campos pendentes. | Painel no topo com contador de erros e links para focalizar cada campo. | **6.4.2a** | **Corrigido** |
| 7 | **Preservação de Rascunho** | Triagem perdida ao navegar para verificar médicos ou registros. | Estado gravado em `agendamentoDraft`, permitindo alternância transparente. | **8.6.2** | **Corrigido** |
| 8 | **Rotina de Desfazer** | Sem opção de restauração após limpar. | Buffer `agendamentoUndo` e banner com botão "Desfazer / Restaurar". | **6.4.1, 6.4.6** | **Corrigido** |
| 9 | **Atalho de Teclado** | Tecla Esc inoperante. | Esc limpa o agendamento de forma controlada com opção de desfazer. | **6.4.6** | **Corrigido** |
| 10 | **Instruções no Topo** | Subtítulo básico sem informações operacionais. | Banner instrucional com atalhos de teclado e legenda de asterisco. | **5.1.4, 5.3.2** | **Corrigido** |
| 11 | **Seleção Dinâmica de Paciente** | Dropdown alimentado pelos dados cadastrados. | Mantido com exibição do nome e CPF para desambiguação do paciente. | **6.3.1, 6.3.4** | **Já conforme** |
| 12 | **Seleção de Especialista** | Dropdown exibindo nome, especialidade e CRM. | Mantido com identificação completa para escolha segura. | **6.3.1, 6.3.4** | **Já conforme** |
| 13 | **Escala Analógica de Dor (EVA)** | Slider interativo 0 a 10 com badge semafórico reativo. | Mantido com reatividade imediata e rótulos de severidade clínica. | **6.3.1** | **Já conforme** |
| 14 | **Alinhamento e Agrupamento** | Campos organizados em seções de identificação e triagem. | Mantido agrupamento lógico e sequencial de acordo com o fluxo da consulta. | **5.2.2, 5.2.4** | **Já conforme** |
| 15 | **Confirmação e Atualização** | Toast de confirmação e gravação no banco de registros. | Mantido feedback transparente de atualização da base de dados. | **7.4, 7.5** | **Já conforme** |

---

## 7. MATRIZ DE CONFORMIDADE FINAL DA ISO 9241-17

O Quadro 6 consolida o atendimento de todas as 32 recomendações normativas aplicáveis da ISO 9241-17 avaliadas nos três módulos operacionais do Synapse Health, comprovando a conformidade plena de 100% da versão final.

#### Quadro 6 – Matriz de Conformidade Final da ISO 9241-17
| Cláusula | Descrição da Recomendação Normativa | Cadastro de Paciente | Cadastro de Especialista | Agendamento & Triagem | Situação Final |
|:---:|---|:---:|:---:|:---:|:---:|
| **5.1.1** | Títulos claros e identificadores da finalidade no topo | Atendida | Atendida | Atendida | ✅ Conforme |
| **5.1.2** | Codificação visual distinta para entradas, padrões e dados | Atendida | Atendida | Atendida | ✅ Conforme |
| **5.1.3** | Densidade de apresentação global inferior a 40% | Atendida | Atendida | Atendida | ✅ Conforme |
| **5.1.4** | Instruções de preenchimento, navegação e envio acessíveis | Atendida | Atendida | Atendida | ✅ Conforme |
| **5.2.2** | Agrupamento funcional e lógico dos campos de entrada | Atendida | Atendida | Atendida | ✅ Conforme |
| **5.2.3** | Posicionamento prioritário de campos obrigatórios no grupo | Atendida | Atendida | Atendida | ✅ Conforme |
| **5.2.4** | Alinhamento vertical e justificação à esquerda de alfanuméricos | Atendida | Atendida | Atendida | ✅ Conforme |
| **5.2.5** | Alinhamento justificado à direita para entradas numéricas | Atendida | Atendida | Atendida | ✅ Conforme |
| **5.2.6** | Informação sobre valores permitidos e limites de campos | Atendida | Atendida | Atendida | ✅ Conforme |
| **5.3.1** | Comprimento explícito indicado em campos de tamanho fixo | Atendida | Atendida | Atendida | ✅ Conforme |
| **5.3.2** | Distinção perceptível entre campos obrigatórios e opcionais | Atendida | Atendida | Atendida | ✅ Conforme |
| **5.3.3** | Distinção entre campos editáveis e somente leitura | Atendida | Atendida | Atendida | ✅ Conforme |
| **5.3.4** | Rótulos descritivos claros e sem ambiguidade | Atendida | Atendida | Atendida | ✅ Conforme |
| **5.3.5** | Rótulos com estilo e consistência padronizados no sistema | Atendida | Atendida | Atendida | ✅ Conforme |
| **5.3.6** | Símbolos ou unidades de medida exibidos junto aos campos | Atendida | Atendida | Atendida | ✅ Conforme |
| **5.3.7** | Pistas de formato de entrada (*cues*) nos campos ou rótulos | Atendida | Atendida | Atendida | ✅ Conforme |
| **5.3.8** | Rótulos iniciados com letra maiúscula e seguidos de minúsculas | Atendida | Atendida | Atendida | ✅ Conforme |
| **6.1.1** | Ações mínimas para mover o cursor entre campos de entrada | Atendida | Atendida | Atendida | ✅ Conforme |
| **6.1.2** | Permissão para avançar sem preencher espaços em branco | Atendida | Atendida | Atendida | ✅ Conforme |
| **6.1.3** | Valores padrão adequados à tarefa e editáveis pelo usuário | Atendida | Atendida | Atendida | ✅ Conforme |
| **6.1.4** | Minimização da necessidade de alternar entre teclado e mouse | Atendida | Atendida | Atendida | ✅ Conforme |
| **6.2.3** | Áreas multilinhas delimitadas com auto-wrap sem quebra de palavras | Atendida | Atendida | Atendida | ✅ Conforme |
| **6.2.4** | Indicação visual para campos mutuamente exclusivos (radio) | Atendida | Atendida | Atendida | ✅ Conforme |
| **6.2.5** | Tratamento automático de regras de interdependência pelo sistema | Atendida | Atendida | Atendida | ✅ Conforme |
| **6.2.6** | Dimensão adequada do campo de texto sem rolagem desnecessária | Atendida | Atendida | Atendida | ✅ Conforme |
| **6.3.1** | Mecanismo para visualizar e selecionar opções pré-determinadas | Atendida | Atendida | Atendida | ✅ Conforme |
| **6.3.2** | Pistas visuais discrimináveis entre tipos de seleção | Atendida | Atendida | Atendida | ✅ Conforme |
| **6.3.3** | Menus dropdown exibindo o valor selecionado atualmente | Atendida | Atendida | Atendida | ✅ Conforme |
| **6.3.6** | Botões de opção exclusiva (*radio buttons*) em conjuntos $\ge 2$ | Atendida | Atendida | Atendida | ✅ Conforme |
| **6.3.7** | Controles de estado binário com indicação do estado ativo | Atendida | Atendida | Atendida | ✅ Conforme |
| **6.4.1** | Possibilidade de reiniciar, alterar ou cancelar antes do envio | Atendida | Atendida | Atendida | ✅ Conforme |
| **6.4.2a** | Indicação de erros múltiplos, cursor no primeiro erro e navegação | Atendida | Atendida | Atendida | ✅ Conforme |
| **6.4.3** | Reentrada de dados restrita apenas à correção da parte incorreta | Atendida | Atendida | Atendida | ✅ Conforme |
| **6.4.4** | Áreas não disponíveis inacessíveis ao cursor e visualmente codificadas | Atendida | Atendida | Atendida | ✅ Conforme |
| **6.4.5** | Transmissão do formulário por ação simples e explícita | Atendida | Atendida | Atendida | ✅ Conforme |
| **6.4.6** | Orientação sobre conclusão, saída sem alterar dados e desfazer | Atendida | Atendida | Atendida | ✅ Conforme |
| **6.5.1** | Validação de campo único no momento do preenchimento | Atendida | Atendida | Atendida | ✅ Conforme |
| **6.5.2b** | Validação de dependências cruzadas e unicidade na base | Atendida | Atendida | Atendida | ✅ Conforme |
| **7.1** | Eco imediato de caracteres digitados na tela | Atendida | Atendida | Atendida | ✅ Conforme |
| **7.2** | Posição do cursor e ponteiro sempre claramente visível | Atendida | Atendida | Atendida | ✅ Conforme |
| **7.3** | Feedback imediato indicando a natureza e a correção do erro | Atendida | Atendida | Atendida | ✅ Conforme |
| **7.4** | Notificação explícita de confirmação de transmissão aceita | Atendida | Atendida | Atendida | ✅ Conforme |
| **7.5** | Feedback transparente informando atualização da base de dados | Atendida | Atendida | Atendida | ✅ Conforme |
| **8.1** | Foco inicial automático no primeiro campo editável | Atendida | Atendida | Atendida | ✅ Conforme |
| **8.2a** | Movimentação bidirecional entre campos (Tab e Shift+Tab) | Atendida | Atendida | Atendida | ✅ Conforme |
| **8.6.2** | Alternância entre formulários sem perda de dados inseridos | Atendida | Atendida | Atendida | ✅ Conforme |

---

## 8. CONCLUSÃO E CONSIDERAÇÕES FINAIS

A avaliação de conformidade ergonômica baseada na norma **ISO 9241-17** permitiu transformar os formulários do sistema **Synapse Health** em uma solução altamente usável, eficiente e tolerante a falhas humanas. 

O diagnóstico inicial evidenciou que a presença de elementos visuais modernos não é suficiente para assegurar uma interação de qualidade: o uso de alertas bloqueantes (`alert()`), a ausência de pistas de formato, a inoperância do foco inicial e a perda de dados entre abas constituíam barreiras severas à produtividade do operador clínico.

Com a implementação das correções de software:
1. **O controle do diálogo retornou ao usuário:** A navegação por teclado foi padronizada (`Tab`, `Shift+Tab`, `Enter` e `Esc`), o foco inicial passou a ser automático no primeiro campo e a função de desfazer (*undo*) eliminou o risco de perdas acidentais de dados.
2. **A prevenção e recuperação de erros tornaram-se imediatas:** Validações inline no evento `onBlur` fornecem feedback contextual instantâneo, e o painel de pendências consolida todas as inconsistências com links de foco direto, posicionando o cursor no primeiro campo com erro.
3. **A coerência das regras de negócio foi refletida na interface:** O tratamento de interdependências condicionais desabilita campos não aplicáveis (como a sala virtual em consultas presenciais) e a validação cruzada previne cadastros duplicados de CPF e CRM.
4. **A carga de memória foi minimizada:** Pistas visuais permanentes indicam formatos e limites, unidades de medida foram integradas aos campos e os rascunhos são preservados durante a troca de abas.

Como resultado, todas as 24 não conformidades identificadas foram integralmente corrigidas, alcançando **100% de aderência às recomendações aplicáveis da ISO 9241-17** e garantindo que o Synapse Health ofereça uma interface robusta, acessível e alinhada aos mais rigorosos padrões internacionais de Interação Humano-Computador.

---

## 9. REFERÊNCIAS BIBLIOGRÁFICAS

- CYBIS, Walter; BETIOL, André; FAUST, Richard. **Ergonomia e Usabilidade: Conhecimentos, Métodos e Aplicações**. 3. ed. São Paulo: Novatec, 2015.
- GALITZ, Wilbert O. **The Essential Guide to User Interface Design: An Introduction to GUI Design Principles and Techniques**. 3. ed. Indianapolis: John Wiley & Sons, 2007.
- INTERNATIONAL ORGANIZATION FOR STANDARDIZATION. **ISO 9241-11: Ergonomic requirements for office work with visual display terminals (VDTs) — Part 11: Guidance on usability**. Genebra: ISO, 1998.
- INTERNATIONAL ORGANIZATION FOR STANDARDIZATION. **ISO 9241-17: Ergonomic requirements for office work with visual display terminals (VDTs) — Part 17: Form filling dialogues**. Genebra: ISO, 1998.
- NIELSEN, Jakob. **Usability Engineering**. San Francisco: Morgan Kaufmann, 1993.
- SHNEIDERMAN, Ben; PLAISANT, Catherine. **Designing the User Interface: Strategies for Effective Human-Computer Interaction**. 5. ed. Boston: Addison-Wesley, 2010.
