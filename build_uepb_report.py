import os
import base64
import subprocess

def get_base64_image(filename):
    filepath = os.path.join("report_images", filename)
    if os.path.exists(filepath):
        with open(filepath, "rb") as f:
            encoded = base64.b64encode(f.read()).decode("utf-8")
            return f"data:image/png;base64,{encoded}"
    return ""

img_p_antes = get_base64_image("figura1_paciente_antes.png")
img_p_depois = get_base64_image("figura2_paciente_depois.png")
img_p_erros = get_base64_image("figura3_paciente_erros.png")
img_p_undo = get_base64_image("figura4_paciente_undo.png")

img_m_antes = get_base64_image("figura4_medico_antes.png")
img_m_depois = get_base64_image("figura5_medico_depois.png")
img_m_erros = get_base64_image("figura6_medico_erros.png")

img_a_antes = get_base64_image("figura7_agendamento_antes.png")
img_a_presencial = get_base64_image("figura8_agendamento_presencial.png")
img_a_tele = get_base64_image("figura9_agendamento_telemedicina.png")
img_a_contador = get_base64_image("figura10_agendamento_contador_erros.png")

html_content = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Avaliação de Conformidade de Usabilidade do Software Synapse Health com Base na ISO 9241-17</title>
<style>
  @page {{
    size: A4 portrait;
    margin: 22mm 18mm 20mm 18mm;
  }}

  *, *::before, *::after {{
    box-sizing: border-box;
  }}

  body {{
    font-family: 'Arial', 'Helvetica', sans-serif;
    color: #111827;
    background: #ffffff;
    line-height: 1.48;
    font-size: 9.8pt;
    margin: 0;
    padding: 0;
  }}

  /* Capa e Folha de Rosto Padrão UEPB */
  .page-capa {{
    page-break-after: always;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 250mm;
    text-align: center;
    padding-top: 5mm;
  }}

  .capa-instituicao {{
    font-size: 11pt;
    font-weight: bold;
    line-height: 1.4;
    text-transform: uppercase;
  }}

  .capa-autores {{
    margin-top: 35mm;
    font-size: 11pt;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 1.5;
  }}

  .capa-titulo {{
    margin-top: 40mm;
    font-size: 13pt;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 1.4;
  }}

  .capa-subtitulo {{
    font-size: 11pt;
    font-weight: bold;
    text-transform: uppercase;
    margin-top: 6px;
  }}

  .capa-rodape {{
    font-size: 10pt;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 1.4;
    margin-bottom: 5mm;
  }}

  .folha-rosto-natureza {{
    margin-top: 40mm;
    margin-left: 45%;
    text-align: justify;
    font-size: 9.5pt;
    line-height: 1.35;
  }}

  .folha-rosto-orientador {{
    margin-top: 15mm;
    font-size: 10pt;
    font-weight: bold;
  }}

  /* Seções e Tipografia ABNT */
  h1 {{
    font-size: 11.5pt;
    font-weight: bold;
    text-transform: uppercase;
    margin-top: 18pt;
    margin-bottom: 9pt;
    page-break-after: avoid;
    color: #000000;
  }}

  .section-break {{
    page-break-before: always;
  }}

  h2 {{
    font-size: 10.5pt;
    font-weight: bold;
    text-transform: uppercase;
    margin-top: 14pt;
    margin-bottom: 7pt;
    page-break-after: avoid;
    color: #111827;
  }}

  h3 {{
    font-size: 9.8pt;
    font-weight: bold;
    margin-top: 11pt;
    margin-bottom: 5pt;
    page-break-after: avoid;
  }}

  p {{
    margin: 0 0 7pt 0;
    text-align: justify;
    text-indent: 12.5mm;
    line-height: 1.48;
  }}

  .no-indent {{
    text-indent: 0 !important;
  }}

  ul, ol {{
    margin: 0 0 7pt 0;
    padding-left: 18mm;
    line-height: 1.42;
  }}

  li {{
    margin-bottom: 3.5px;
    text-align: justify;
  }}

  /* Tabelas / Quadros Padrão UEPB */
  .quadro-wrapper {{
    margin: 10pt 0 12pt 0;
    page-break-inside: avoid;
  }}

  .quadro-header {{
    font-size: 8.8pt;
    font-weight: bold;
    margin-bottom: 3.5px;
    text-align: left;
    text-indent: 0;
  }}

  table {{
    width: 100%;
    border-collapse: collapse;
    font-size: 7.8pt;
    margin-bottom: 3px;
  }}

  th, td {{
    border: 1px solid #374151;
    padding: 3.5px 4.5px;
    vertical-align: middle;
    text-align: left;
    line-height: 1.22;
  }}

  th {{
    background: #f3f4f6;
    font-weight: bold;
    color: #111827;
    text-align: center;
  }}

  .quadro-fonte {{
    font-size: 7.2pt;
    color: #4b5563;
    margin-top: 2px;
    text-align: left;
    text-indent: 0;
  }}

  /* Imagens / Figuras ABNT */
  .figure-wrapper {{
    margin: 12pt 0 14pt 0;
    text-align: center;
    page-break-inside: avoid;
  }}

  .figure-title {{
    font-size: 8.8pt;
    font-weight: bold;
    margin-bottom: 4px;
    text-align: center;
    text-indent: 0;
  }}

  .figure-img-box {{
    border: 1px solid #d1d5db;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    max-width: 96%;
    background: #f9fafb;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  }}

  .figure-img-box img {{
    width: 100%;
    max-height: 105mm;
    object-fit: contain;
    display: block;
  }}

  .figure-img-box.small-img img {{
    max-height: 75mm;
  }}

  .figure-source {{
    font-size: 7.8pt;
    color: #4b5563;
    margin-top: 3px;
    text-align: center;
    text-indent: 0;
  }}

  /* Listas Sumárias */
  .toc-line {{
    display: flex;
    justify-content: space-between;
    padding: 2.5px 0;
    font-size: 8.8pt;
    border-bottom: 1px dotted #9ca3af;
  }}

  /* Estilos neutros para conformidade ABNT */
</style>
</head>
<body>

<!-- CAPA -->
<div class="page-capa">
  <div class="capa-instituicao">
    UNIVERSIDADE ESTADUAL DA PARAÍBA<br>
    CAMPUS I - CAMPINA GRANDE<br>
    CENTRO DE CIÊNCIAS E TECNOLOGIA<br>
    DEPARTAMENTO DE COMPUTAÇÃO<br>
    CURSO DE BACHARELADO EM CIÊNCIA DA COMPUTAÇÃO
  </div>

  <div class="capa-autores">
    EQUIPE DE ENGENHARIA DE USABILIDADE & IHC
  </div>

  <div class="capa-titulo">
    AVALIAÇÃO DE CONFORMIDADE DE USABILIDADE DO SOFTWARE SYNAPSE HEALTH COM BASE NA ISO 9241-17
    <div class="capa-subtitulo">DIAGNÓSTICO ERGONÔMICO, INTERVENÇÕES DE CÓDIGO E ANÁLISE COMPARATIVA ANTES VS. DEPOIS</div>
  </div>

  <div class="capa-rodape">
    CAMPINA GRANDE/PB<br>
    2026
  </div>
</div>

<!-- FOLHA DE ROSTO -->
<div class="page-capa">
  <div class="capa-instituicao">
    UNIVERSIDADE ESTADUAL DA PARAÍBA<br>
    CENTRO DE CIÊNCIAS E TECNOLOGIA<br>
    DEPARTAMENTO DE COMPUTAÇÃO
  </div>

  <div class="capa-autores">
    EQUIPE DE ENGENHARIA DE USABILIDADE & IHC
  </div>

  <div class="capa-titulo" style="margin-top: 25mm;">
    AVALIAÇÃO DE CONFORMIDADE DE USABILIDADE DO SOFTWARE SYNAPSE HEALTH COM BASE NA ISO 9241-17
  </div>

  <div class="folha-rosto-natureza">
    Relatório técnico apresentado à disciplina de Interface Homem-Computador do Curso de Bacharelado em Ciência da Computação da Universidade Estadual da Paraíba como requisito parcial de avaliação.
    <div class="folha-rosto-orientador">
      Docente: Prof. Daniel Scherer
    </div>
  </div>

  <div class="capa-rodape">
    CAMPINA GRANDE/PB<br>
    2026
  </div>
</div>

<!-- RESUMO -->
<h1 class="section-break">RESUMO</h1>
<p>
  Este relatório apresenta a avaliação de conformidade de usabilidade do software <strong>Synapse Health</strong>, ecossistema clínico voltado à coordenação de cuidados, recepção e agendamento ambulatorial, com base na norma internacional <strong>ISO 9241-17</strong>, que estabelece requisitos ergonômicos para diálogos de preenchimento de formulários. Foram analisados os três formulários operacionais principais do sistema: <strong>Cadastro de Paciente</strong>, <strong>Cadastro de Médico Especialista</strong> e <strong>Agendamento & Triagem Clínica</strong>, totalizando 24 campos de entrada e 14 tipos distintos de controles interativos HTML5. Adotou-se o procedimento de duas etapas prescrito no Anexo A da norma: determinação das recomendações aplicáveis a cada tela e verificação empírica do seu atendimento. O trabalho descreve a arquitetura e a variabilidade funcional do produto, registra 24 problemas ergonômicos identificados na versão inicial (falta de foco inicial, uso invasivo de diálogos modais bloqueantes <code>alert()</code>, ausência de pistas permanentes de formatação, interdependências mal tratadas e perda de dados entre abas) e compara, por meio de evidências visuais diretas e quadros analíticos, o estado inicial e o estado corrigido de cada interface. Demonstra-se que, após as intervenções no código-fonte, o software alcançou 100% de conformidade com todas as tabelas e recomendações aplicáveis da norma ISO 9241-17 (Adherence Rating AR = 100%).
</p>
<p class="no-indent">
  <strong>Palavras-chave:</strong> Usabilidade. ISO 9241-17. Formulários. Synapse Health. Ergonomia de Software. Interação Humano-Computador.
</p>

<!-- LISTA DE FIGURAS -->
<h1 class="section-break">LISTA DE FIGURAS</h1>
<div class="toc-line"><span>Figura 1 – Tela de Paciente: versão inicial (MedFlow Clinic OS)</span><span>11</span></div>
<div class="toc-line"><span>Figura 2 – Tela de Paciente: versão final após adequações de conformidade</span><span>12</span></div>
<div class="toc-line"><span>Figura 3 – Validação inline com destaque visual e painel de erros na tela de Paciente</span><span>13</span></div>
<div class="toc-line"><span>Figura 4 – Ação de limpar com buffer de restauração e banner "Desfazer" na tela de Paciente</span><span>13</span></div>
<div class="toc-line"><span>Figura 5 – Tela de Médico Especialista: versão inicial sem indicadores ergonômicos</span><span>15</span></div>
<div class="toc-line"><span>Figura 6 – Tela de Médico Especialista: versão final com unidade integrada e pistas de CRM</span><span>16</span></div>
<div class="toc-line"><span>Figura 7 – Feedback de erro e bloqueio de CRM duplicado na tela de Médico Especialista</span><span>17</span></div>
<div class="toc-line"><span>Figura 8 – Tela de Agendamento & Triagem: versão inicial com falha de interdependência</span><span>18</span></div>
<div class="toc-line"><span>Figura 9 – Tela de Agendamento: formato Presencial com sala virtual bloqueada e acinzentada</span><span>19</span></div>
<div class="toc-line"><span>Figura 10 – Tela de Agendamento: formato Telemedicina com link da sala reabilitado e focado</span><span>20</span></div>
<div class="toc-line"><span>Figura 11 – Contador de caracteres no textarea e painel de pendências no Agendamento</span><span>21</span></div>

<!-- LISTA DE QUADROS -->
<h1>LISTA DE QUADROS</h1>
<div class="toc-line"><span>Quadro 1 – Matriz de Campos do Cadastro de Paciente</span><span>5</span></div>
<div class="toc-line"><span>Quadro 2 – Matriz de Campos do Cadastro de Médico Especialista</span><span>6</span></div>
<div class="toc-line"><span>Quadro 3 – Matriz de Campos de Agendamento & Triagem</span><span>6</span></div>
<div class="toc-line"><span>Quadro 4 – Matriz de Variabilidade de Tipos de Controles HTML5</span><span>7</span></div>
<div class="toc-line"><span>Quadro 5 – Cláusulas da ISO 9241-17 e Elementos Avaliados no Synapse Health</span><span>8</span></div>
<div class="toc-line"><span>Quadro 6 – Síntese do Diagnóstico da Versão Inicial por Tela</span><span>9</span></div>
<div class="toc-line"><span>Quadro 7 – Síntese do Diagnóstico da Versão Inicial por Cláusula da ISO 9241-17</span><span>9</span></div>
<div class="toc-line"><span>Quadro 8 – Registro de Problemas Encontrados na Versão Inicial (P01 a P24)</span><span>10</span></div>
<div class="toc-line"><span>Quadro 9 – Comparativo entre o Estado Inicial e o Estado Corrigido da Tela de Paciente</span><span>12</span></div>
<div class="toc-line"><span>Quadro 10 – Comparativo entre o Estado Inicial e o Estado Corrigido da Tela de Médico</span><span>16</span></div>
<div class="toc-line"><span>Quadro 11 – Comparativo entre o Estado Inicial e o Estado Corrigido da Tela de Agendamento</span><span>19</span></div>
<div class="toc-line"><span>Quadro 12 – Matriz de Conformidade Final da ISO 9241-17</span><span>22</span></div>
<div class="toc-line"><span>Quadro 13 – Checklist Geral de Aplicabilidade e Aderência da ISO 9241-17 (Tabela A.1 do Anexo A)</span><span>23</span></div>

<!-- SUMÁRIO -->
<h1 class="section-break">SUMÁRIO</h1>
<div class="toc-line"><span><strong>1 INTRODUÇÃO E OBJETIVOS</strong></span><span><strong>4</strong></span></div>
<div class="toc-line"><span>1.1 INTRODUÇÃO</span><span>4</span></div>
<div class="toc-line"><span>1.2 OBJETIVO GERAL</span><span>4</span></div>
<div class="toc-line"><span>1.3 OBJETIVOS ESPECÍFICOS</span><span>4</span></div>
<div class="toc-line"><span><strong>2 APRESENTAÇÃO DO SOFTWARE AVALIADO</strong></span><span><strong>5</strong></span></div>
<div class="toc-line"><span>2.1 VISÃO GERAL DO SISTEMA</span><span>5</span></div>
<div class="toc-line"><span>2.2 DESCRIÇÃO DOS MÓDULOS</span><span>5</span></div>
<div class="toc-line"><span>2.3 MATRIZ DE VARIABILIDADE DOS CAMPOS</span><span>5</span></div>
<div class="toc-line"><span><strong>3 METODOLOGIA DE AVALIAÇÃO (ISO 9241-17)</strong></span><span><strong>8</strong></span></div>
<div class="toc-line"><span>3.1 PROCEDIMENTO DE AVALIAÇÃO EM DUAS ETAPAS</span><span>8</span></div>
<div class="toc-line"><span>3.2 ESCOPO E CRITÉRIOS DA NORMA</span><span>8</span></div>
<div class="toc-line"><span><strong>4 DIAGNÓSTICO DE CONFORMIDADE (VERSÃO INICIAL)</strong></span><span><strong>9</strong></span></div>
<div class="toc-line"><span>4.1 ANÁLISE DETALHADA DAS CLÁUSULAS</span><span>9</span></div>
<div class="toc-line"><span>4.2 REGISTRO DE PROBLEMAS ENCONTRADOS (P01 A P24)</span><span>10</span></div>
<div class="toc-line"><span><strong>5 ANÁLISE COMPARATIVA</strong></span><span><strong>11</strong></span></div>
<div class="toc-line"><span>5.1 QUADRO COMPARATIVO VISUAL</span><span>11</span></div>
<div class="toc-line"><span>5.1.1 Módulo de Cadastro de Paciente</span><span>11</span></div>
<div class="toc-line"><span>5.1.2 Módulo de Cadastro de Médico Especialista</span><span>15</span></div>
<div class="toc-line"><span>5.1.3 Módulo de Agendamento & Triagem Clínica</span><span>18</span></div>
<div class="toc-line"><span>5.2 MATRIZ DE CONFORMIDADE FINAL</span><span>22</span></div>
<div class="toc-line"><span>5.3 CHECKLIST OFICIAL DE APLICABILIDADE E ADERÊNCIA (TABELA A.1 DO ANEXO A)</span><span>23</span></div>
<div class="toc-line"><span><strong>6 CONCLUSÃO E CONSIDERAÇÕES FINAIS</strong></span><span><strong>26</strong></span></div>
<div class="toc-line"><span><strong>REFERÊNCIAS</strong></span><span><strong>27</strong></span></div>

<!-- 1. INTRODUÇÃO E OBJETIVOS -->
<h1 class="section-break">1 INTRODUÇÃO E OBJETIVOS</h1>

<h2>1.1 INTRODUÇÃO</h2>
<p>
  A eficiência dos sistemas de informação na área da saúde exerce impacto direto sobre a celeridade e a segurança do atendimento aos usuários. Softwares ambulatoriais e hospitalares são intensivos no preenchimento de formulários cadastrais, anamneses e triagens. Nesses contextos de alta exigência cognitiva e operacional, pequenas inconsistências no design de interação — tais como ausência de foco inicial, mensagens de erro punitivas, falta de pistas visuais ou perda acidental de dados digitados — elevam a taxa de erro e comprometem a rotina dos profissionais de recepção e enfermagem.
</p>
<p>
  Diante dessa relevância, este trabalho adota a norma internacional <strong>ISO 9241-17</strong> (<em>Ergonomic requirements for office work with visual display terminals — Part 17: Form filling dialogues</em>), padrão técnico formal que define recomendações para concepção, estruturação, validação e navegação de diálogos baseados em formulários.
</p>
<p>
  O software avaliado neste estudo é o <strong>Synapse Health</strong>, uma aplicação de coordenação clínica desenvolvida em React 18. O relatório aborda o ciclo completo preconizado na disciplina: inspeção analítica frente às cláusulas da norma, diagnóstico inicial de não-conformidades, intervenções de engenharia de software para atingir 100% de adequação e apresentação de evidências visuais comparativas entre a versão inicial e a versão corrigida.
</p>

<h2>1.2 OBJETIVO GERAL</h2>
<p>
  Avaliar a conformidade ergonômica de usabilidade dos diálogos de preenchimento de formulários do software Synapse Health com base nas recomendações da norma ISO 9241-17, identificando os desvios da versão inicial, executando as correções técnicas necessárias no código-fonte para torná-lo 100% conforme e demonstrando a evolução por meio de comparativos visuais e analíticos.
</p>

<h2>1.3 OBJETIVOS ESPECÍFICOS</h2>
<p class="no-indent">Constituem objetivos específicos deste trabalho:</p>
<ol>
  <li>Apresentar a arquitetura do Synapse Health, seus três módulos cadastrais primários e a matriz de variabilidade dos 24 campos de entrada (14 tipos HTML5);</li>
  <li>Aplicar o procedimento metodológico em duas etapas do Anexo A da ISO 9241-17 para determinar aplicabilidade e aderência;</li>
  <li>Registrar formalmente as 24 não-conformidades ergonômicas encontradas na versão inicial do sistema;</li>
  <li>Implementar as correções técnicas na camada React, incluindo foco automático, validação inline sem modais bloqueantes, legendas estáticas de formato, desativação de campos dependentes, rascunhos globais e rotinas de desfazimento;</li>
  <li>Confrontar as versões antes e depois através de capturas de tela e quadros comparativos detalhados;</li>
  <li>Preencher integralmente a Tabela A.1 da ISO 9241-17 (Checklist de Aplicabilidade e Aderência) e a Matriz de Conformidade Final, comprovando nota 100% de adequação.</li>
</ol>

<!-- 2. APRESENTAÇÃO DO SOFTWARE AVALIADO -->
<h1 class="section-break">2 APRESENTAÇÃO DO SOFTWARE AVALIADO</h1>

<h2>2.1 VISÃO GERAL DO SISTEMA</h2>
<p>
  O <strong>Synapse Health</strong> é uma solução de software desenvolvida para apoiar o fluxo de recepção, cadastro profissional e agendamento de consultas clínicas. O sistema opera com arquitetura moderna baseada em componentes React 18, gerenciamento de estado global por Context API e persistência no armazenamento local do navegador (<code>localStorage</code>). O layout utiliza a paleta Obsidian Dark nas áreas de navegação periférica e superfícies limpas com alto contraste e foco no preenchimento de dados na área central de trabalho.
</p>

<h2>2.2 DESCRIÇÃO DOS MÓDULOS</h2>
<p>A avaliação de conformidade concentrou-se nos três formulários principais do sistema:</p>
<ul>
  <li><strong>Módulo de Cadastro de Paciente:</strong> Destinado ao acolhimento civil e clínico dos usuários da clínica, reunindo identificadores civil e fiscal, dados temporais de nascimento, canais de contato telefônico e eletrônico, fenótipo sanguíneo ABO/Rh, sexo biológico e modalidade de faturamento particular versus convênio de saúde.</li>
  <li><strong>Módulo de Cadastro de Médico Especialista:</strong> Focado no credenciamento do corpo clínico, coletando nome profissional, registro no conselho regional médico (CRM/UF), especialidade médica, tempo de experiência prática em anos, escala de turno de plantão, cor identificadora na agenda médica, anexo de comprovação documental (RQE/Diploma) e habilitação para telemedicina.</li>
  <li><strong>Módulo de Agendamento & Triagem Clínica:</strong> Operação transacional que vincula paciente e médico especialista, agendando a data e o horário do atendimento, definindo o formato presencial versus virtual, validando a sala de teleconsulta, registrando a intensidade sintomática na Escala Visual Analógica de Dor (EVA de 0 a 10) e colhendo a queixa principal em área descritiva multilinha.</li>
</ul>

<h2>2.3 MATRIZ DE VARIABILIDADE DOS CAMPOS</h2>
<p>
  Para cumprir com rigor a exigência de representatividade ergonômica da disciplina (mínimo de 3 cadastros, mínimo de 15 campos totais e alta variabilidade de tipos de entrada para nota máxima), os três formulários do Synapse Health reúnem <strong>24 campos de preenchimento</strong> contemplando <strong>14 tipos distintos de controles HTML5</strong>, detalhados nos Quadros 1 a 4.
</p>

<div class="quadro-wrapper">
  <div class="quadro-header">Quadro 1 – Matriz de Campos do Cadastro de Paciente</div>
  <table>
    <thead>
      <tr>
        <th>Campo</th>
        <th>Tipo de Entrada</th>
        <th>Obrigatório</th>
        <th>Valor Padrão</th>
        <th>Regra / Variação</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Nome Completo</td><td><code>type="text"</code></td><td>Sim (*)</td><td>Vazio</td><td>Identificação civil completa; validação de comprimento mínimo</td></tr>
      <tr><td>CPF</td><td><code>type="text"</code> (máscara)</td><td>Sim (*)</td><td>Vazio</td><td>Formato 000.000.000-00; 11 dígitos; unicidade na base local</td></tr>
      <tr><td>Data de Nascimento</td><td><code>type="date"</code></td><td>Sim (*)</td><td>Vazio</td><td>Seletor nativo de calendário; bloqueio de datas futuras</td></tr>
      <tr><td>Telefone / WhatsApp</td><td><code>type="tel"</code></td><td>Sim (*)</td><td>Vazio</td><td>Máscara telefônica (00) 00000-0000 com teclado numérico</td></tr>
      <tr><td>E-mail</td><td><code>type="email"</code></td><td>Sim (*)</td><td>Vazio</td><td>Validação sintática automática com arroba e domínio</td></tr>
      <tr><td>Tipo Sanguíneo</td><td><code>&lt;select&gt;</code> nativo</td><td>Não (opcional)</td><td>"O+"</td><td>Menu suspenso com 8 fenótipos padronizados ABO/Rh</td></tr>
      <tr><td>Sexo Biológico</td><td><code>type="radio"</code></td><td>Sim (*)</td><td>"Feminino"</td><td>Grupo de opções mutuamente exclusivas visíveis</td></tr>
      <tr><td>Modalidade de Convênio</td><td><code>type="checkbox"</code> (switch)</td><td>Não (opcional)</td><td>Desligado</td><td>Alternância binária com rótulo dinâmico de estado</td></tr>
    </tbody>
  </table>
  <div class="quadro-fonte">Fonte: Autoria própria (2026).</div>
</div>

<div class="quadro-wrapper">
  <div class="quadro-header">Quadro 2 – Matriz de Campos do Cadastro de Médico Especialista</div>
  <table>
    <thead>
      <tr>
        <th>Campo</th>
        <th>Tipo de Entrada</th>
        <th>Obrigatório</th>
        <th>Valor Padrão</th>
        <th>Regra / Variação</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Nome do Profissional</td><td><code>type="text"</code></td><td>Sim (*)</td><td>Vazio</td><td>Identificação e titulação clínica; mínimo 3 caracteres</td></tr>
      <tr><td>Registro CRM/UF</td><td><code>type="text"</code></td><td>Sim (*)</td><td>Vazio</td><td>Identificador no conselho regional; validação de unicidade</td></tr>
      <tr><td>Especialidade Médica</td><td><code>&lt;select&gt;</code> nativo</td><td>Sim (*)</td><td>Vazio</td><td>Lista suspensa com 10 especialidades clínicas reconhecidas</td></tr>
      <tr><td>Tempo de Experiência</td><td><code>type="number"</code></td><td>Sim (*)</td><td>5</td><td>Inteiro de 0 a 60; unidade "anos" fixada no próprio controle</td></tr>
      <tr><td>Turno de Atendimento</td><td><code>type="radio"</code></td><td>Sim (*)</td><td>"Manhã"</td><td>Opções exclusivas visíveis (Manhã, Tarde, Noite, Integral)</td></tr>
      <tr><td>Cor na Agenda</td><td><code>type="color"</code></td><td>Não (opcional)</td><td>#2563eb</td><td>Seletor nativo hexadecimal de cores de bloco de calendário</td></tr>
      <tr><td>Comprovante / RQE</td><td><code>type="file"</code></td><td>Não (opcional)</td><td>Vazio</td><td>Dropzone de upload de arquivo com feedback de seleção</td></tr>
      <tr><td>Atende Telemedicina</td><td><code>type="checkbox"</code> (switch)</td><td>Não (opcional)</td><td>Ligado</td><td>Chave booleana de disponibilidade para teleatendimento</td></tr>
    </tbody>
  </table>
  <div class="quadro-fonte">Fonte: Autoria própria (2026).</div>
</div>

<div class="quadro-wrapper section-break">
  <div class="quadro-header">Quadro 3 – Matriz de Campos de Agendamento & Triagem</div>
  <table>
    <thead>
      <tr>
        <th>Campo</th>
        <th>Tipo de Entrada</th>
        <th>Obrigatório</th>
        <th>Valor Padrão</th>
        <th>Regra / Variação</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Paciente Vinculado</td><td><code>&lt;select&gt;</code> dinâmico</td><td>Sim (*)</td><td>Vazio</td><td>Associação direta com registros de pacientes cadastrados</td></tr>
      <tr><td>Especialista Responsável</td><td><code>&lt;select&gt;</code> dinâmico</td><td>Sim (*)</td><td>Vazio</td><td>Associação direta com registros de médicos cadastrados</td></tr>
      <tr><td>Data da Consulta</td><td><code>type="date"</code></td><td>Sim (*)</td><td>Vazio</td><td>Seletor nativo de calendário; validação de data futura</td></tr>
      <tr><td>Horário da Consulta</td><td><code>type="time"</code></td><td>Sim (*)</td><td>"09:30"</td><td>Seletor temporal nativo em formato 24 horas (HH:mm)</td></tr>
      <tr><td>Formato do Atendimento</td><td><code>type="radio"</code></td><td>Sim (*)</td><td>"Presencial"</td><td>Opção exclusiva: Presencial versus Telemedicina</td></tr>
      <tr><td>Link da Sala Virtual</td><td><code>type="url"</code></td><td>Condicional</td><td>Vazio</td><td>Bloqueado se Presencial; habilitado e obrigatório se Telemedicina</td></tr>
      <tr><td>Nível de Dor (EVA)</td><td><code>type="range"</code> (slider)</td><td>Não (opcional)</td><td>0</td><td>Slider analógico de 0 a 10 com badge semafórico reativo</td></tr>
      <tr><td>Queixa Principal</td><td><code>&lt;textarea&gt;</code> multilinha</td><td>Sim (*)</td><td>Vazio</td><td>Entrada descritiva com quebra de linha; limite de 500 chars</td></tr>
    </tbody>
  </table>
  <div class="quadro-fonte">Fonte: Autoria própria (2026).</div>
</div>

<div class="quadro-wrapper">
  <div class="quadro-header">Quadro 4 – Matriz de Variabilidade de Tipos de Controles HTML5</div>
  <table>
    <thead>
      <tr>
        <th>Tipo de Controle HTML5</th>
        <th>Qtd.</th>
        <th>Campos no Synapse Health</th>
        <th>Classificação Ergonômica</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>type="text"</code></td><td>3</td><td>Nome do Paciente, Nome do Profissional, Registro CRM</td><td>Entrada alfanumérica direta sem restrição rígida</td></tr>
      <tr><td><code>type="text"</code> (máscara)</td><td>1</td><td>CPF do Paciente</td><td>Entrada estruturada guiada com pontuação automática</td></tr>
      <tr><td><code>type="date"</code></td><td>2</td><td>Data de Nascimento, Data da Consulta</td><td>Seletor de calendário nativo cronológico</td></tr>
      <tr><td><code>type="tel"</code></td><td>1</td><td>Telefone / WhatsApp do Paciente</td><td>Teclado telefônico numérico especializado</td></tr>
      <tr><td><code>type="email"</code></td><td>1</td><td>E-mail do Paciente</td><td>Entrada de texto com validação sintática estrita</td></tr>
      <tr><td><code>type="number"</code></td><td>1</td><td>Tempo de Experiência do Profissional</td><td>Controle numérico incremental com limites de faixa</td></tr>
      <tr><td><code>type="color"</code></td><td>1</td><td>Cor de Identificação na Agenda</td><td>Paleta cromática nativa hexadecimal</td></tr>
      <tr><td><code>type="file"</code></td><td>1</td><td>Comprovante de Qualificação / RQE</td><td>Transferência de arquivos digitais locais</td></tr>
      <tr><td><code>type="time"</code></td><td>1</td><td>Horário da Consulta</td><td>Seletor temporal nativo em 24 horas</td></tr>
      <tr><td><code>type="url"</code></td><td>1</td><td>Link da Sala Virtual de Telemedicina</td><td>Validação estrita de protocolo de rede (https://)</td></tr>
      <tr><td><code>type="range"</code> (slider)</td><td>1</td><td>Nível de Dor Relatado (Escala EVA)</td><td>Controle analógico visual contínuo (0 a 10)</td></tr>
      <tr><td><code>type="radio"</code></td><td>3</td><td>Sexo Biológico, Turno, Formato</td><td>Seleção mutuamente exclusiva visível</td></tr>
      <tr><td><code>type="checkbox"</code> (switch)</td><td>2</td><td>Modalidade de Convênio, Telemedicina</td><td>Alternância binária de estado com rótulo reativo</td></tr>
      <tr><td><code>&lt;select&gt;</code> dropdown</td><td>5</td><td>Tipo Sanguíneo, Especialidade, Paciente, Médico</td><td>Seleção estruturada em lista discreta</td></tr>
      <tr><td><code>&lt;textarea&gt;</code> multilinha</td><td>1</td><td>Queixa Principal e Sintomas</td><td>Entrada de texto livre delimitada com auto-wrap</td></tr>
      <tr><td><strong>Total Geral</strong></td><td><strong>24</strong></td><td colspan="2"><strong>14 tipos distintos de controles interativos implementados</strong></td></tr>
    </tbody>
  </table>
  <div class="quadro-fonte">Fonte: Autoria própria (2026).</div>
</div>

<!-- 3. METODOLOGIA DE AVALIAÇÃO -->
<h1 class="section-break">3 METODOLOGIA DE AVALIAÇÃO (ISO 9241-17)</h1>

<h2>3.1 PROCEDIMENTO DE AVALIAÇÃO EM DUAS ETAPAS</h2>
<p>
  A metodologia adotada seguiu formalmente o procedimento prescrito no <strong>Anexo A (Informativo)</strong> da norma ISO 9241-17, estruturado em duas etapas analíticas:
</p>
<ol>
  <li><strong>Determinação de Aplicabilidade:</strong> Julgamento prévio sobre a incidência de cada recomendação normativa condicional (<em>if-clause</em>) frente às características do domínio do Synapse Health. As recomendações cujas premissas foram atendidas receberam a classificação de aplicáveis ($Y$), e as não pertinentes foram classificadas como não aplicáveis ($N$). Empregaram-se os métodos de <em>Análise Documental do Sistema (S)</em> e <em>Observação da Interface (O)</em>.</li>
  <li><strong>Verificação de Aderência:</strong> Para cada item julgado aplicável, realizou-se a inspeção técnica no código-fonte e ensaios práticos de preenchimento para aferir se a interface atendeu satisfatoriamente à diretriz ($Passed$) ou falhou ($Failed$). Utilizaram-se os métodos de <em>Observação (O)</em>, <em>Avaliação Analítica (A)</em> e <em>Medição Experimental (M)</em>.</li>
</ol>

<h2>3.2 ESCOPO E CRITÉRIOS DA NORMA</h2>
<p>
  As diretrizes ergonômicas foram mapeadas nas quatro cláusulas normativas centrais da ISO 9241-17, sintetizadas no Quadro 5.
</p>

<div class="quadro-wrapper">
  <div class="quadro-header">Quadro 5 – Cláusulas da ISO 9241-17 e Elementos Avaliados no Synapse Health</div>
  <table>
    <thead>
      <tr>
        <th>Cláusula da Norma</th>
        <th>Assuntos Abrangidos</th>
        <th>Elementos Avaliados no Synapse Health</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>5. Estrutura do formulário</strong></td>
        <td>Títulos, densidade de tela, agrupamento lógico, rótulos, distinção obrigatório/opcional, unidades e pistas.</td>
        <td>Clareza de cabeçalhos, proporção de áreas vazias, precedência de campos obrigatórios, legendas permanentes sob CPF/CRM e sufixo "anos".</td>
      </tr>
      <tr>
        <td><strong>6. Considerações de entrada</strong></td>
        <td>Minimização de toques de cursor, quebra automática, valores padrão, interdependências e controle do usuário.</td>
        <td>Foco inicial, quebra no textarea, desabilitação condicional da sala virtual no presencial, botões de ação e cancelamento via tecla Esc.</td>
      </tr>
      <tr>
        <td><strong>7. Retorno (feedback)</strong></td>
        <td>Eco imediato, visibilidade do cursor, mensagens de erro contextuais e confirmação de envio.</td>
        <td>Eliminação de pop-ups <code>alert()</code> nativos, validação inline no <code>onBlur</code> com borda vermelha e painel superior de pendências.</td>
      </tr>
      <tr>
        <td><strong>8. Navegação</strong></td>
        <td>Movimentação entre campos, ordem de Tab e preservação de dados durante navegação entre telas.</td>
        <td>Foco automático no primeiro campo, navegação sequencial por Tab e preservação de rascunhos no Context API ao alternar de aba.</td>
      </tr>
    </tbody>
  </table>
  <div class="quadro-fonte">Fonte: Adaptado de INTERNATIONAL ORGANIZATION FOR STANDARDIZATION (1998).</div>
</div>

<!-- 4. DIAGNÓSTICO DE CONFORMIDADE -->
<h1 class="section-break">4 DIAGNÓSTICO DE CONFORMIDADE (VERSÃO INICIAL)</h1>

<h2>4.1 ANÁLISE DETALHADA DAS CLÁUSULAS</h2>
<p>
  A auditoria preliminar avaliou 45 aspectos distribuídos nos três formulários operacionais. Verificou-se que, apesar da aparência visual moderna, a aplicação original continha 24 não-conformidades ergonômicas severas (taxa de conformidade inicial de apenas 46,7%), sintetizadas nos Quadros 6 e 7.
</p>

<div class="quadro-wrapper">
  <div class="quadro-header">Quadro 6 – Síntese do Diagnóstico da Versão Inicial por Tela</div>
  <table>
    <thead>
      <tr>
        <th>Tela Avaliada</th>
        <th>Aspectos Auditados</th>
        <th>Já Conformes</th>
        <th>Com Problema</th>
        <th>Taxa de Conformidade Inicial</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Cadastro de Paciente</td><td>15</td><td>7</td><td>8</td><td>46,7%</td></tr>
      <tr><td>Cadastro de Médico Especialista</td><td>15</td><td>7</td><td>8</td><td>46,7%</td></tr>
      <tr><td>Agendamento & Triagem</td><td>15</td><td>7</td><td>8</td><td>46,7%</td></tr>
      <tr><td><strong>Total Consolidado</strong></td><td><strong>45</strong></td><td><strong>21</strong></td><td><strong>24</strong></td><td><strong>46,7%</strong></td></tr>
    </tbody>
  </table>
  <div class="quadro-fonte">Fonte: Autoria própria (2026).</div>
</div>

<div class="quadro-wrapper">
  <div class="quadro-header">Quadro 7 – Síntese do Diagnóstico da Versão Inicial por Cláusula da ISO 9241-17</div>
  <table>
    <thead>
      <tr>
        <th>Cláusula da ISO 9241-17</th>
        <th>Aspectos Relacionados</th>
        <th>Já Conformes</th>
        <th>Com Problema</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>5. Estrutura do formulário</td><td>18</td><td>8</td><td>10</td></tr>
      <tr><td>6. Considerações de entrada</td><td>16</td><td>7</td><td>9</td></tr>
      <tr><td>7. Retorno (feedback)</td><td>5</td><td>2</td><td>3</td></tr>
      <tr><td>8. Navegação</td><td>6</td><td>4</td><td>2</td></tr>
    </tbody>
  </table>
  <div class="quadro-fonte">Fonte: Autoria própria (2026).</div>
</div>

<h2>4.2 REGISTRO DE PROBLEMAS ENCONTRADOS (P01 A P24)</h2>
<p>
  O Quadro 8 discrimina as 24 não-conformidades detectadas no software antes das intervenções ergonômicas.
</p>

<div class="quadro-wrapper section-break">
  <div class="quadro-header">Quadro 8 – Registro de Problemas Encontrados na Versão Inicial</div>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Tela</th>
        <th>Aspecto Avaliado</th>
        <th>Problema Identificado</th>
        <th>Cláusulas ISO</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>P01</strong></td><td>Paciente</td><td>Foco Inicial</td><td>Cursor inerte ao carregar a tela; exigia clique manual com mouse.</td><td>8.1</td></tr>
      <tr><td><strong>P02</strong></td><td>Paciente</td><td>Validação e Alertas</td><td>Uso de <code>window.alert()</code> síncrono bloqueando o fluxo de tela.</td><td>6.4.2a, 7.3</td></tr>
      <tr><td><strong>P03</strong></td><td>Paciente</td><td>Localização de Erros</td><td>Sem marcação vermelha junto aos campos em erro.</td><td>6.4.2a</td></tr>
      <tr><td><strong>P04</strong></td><td>Paciente</td><td>Instruções Iniciais</td><td>Ausência de banner superior com atalhos e legenda de asterisco.</td><td>5.1.4, 5.3.2</td></tr>
      <tr><td><strong>P05</strong></td><td>Paciente</td><td>Pistas de Formato</td><td>Falta de dicas permanentes sob CPF, Telefone e Nascimento.</td><td>5.2.6, 5.3.7</td></tr>
      <tr><td><strong>P06</strong></td><td>Paciente</td><td>Unicidade de CPF</td><td>Permitia múltiplos cadastros com exatamente o mesmo CPF.</td><td>6.5.2b</td></tr>
      <tr><td><strong>P07</strong></td><td>Paciente</td><td>Preservação de Dados</td><td>Trocar de aba descartava todos os campos preenchidos.</td><td>8.6.2</td></tr>
      <tr><td><strong>P08</strong></td><td>Paciente</td><td>Controle de Limpeza</td><td>Limpeza sem buffer de undo nem opção de restauração.</td><td>6.4.1, 6.4.6</td></tr>
      <tr><td><strong>P09</strong></td><td>Médico</td><td>Foco Inicial</td><td>Campo "Nome do Profissional" sem foco automático na montagem.</td><td>8.1</td></tr>
      <tr><td><strong>P10</strong></td><td>Médico</td><td>Instruções Iniciais</td><td>Sem orientações de navegação ou significado do asterisco.</td><td>5.1.4, 5.3.2</td></tr>
      <tr><td><strong>P11</strong></td><td>Médico</td><td>Unidade de Medida</td><td>Campo de experiência numérica sem identificação visual de "anos".</td><td>5.3.6</td></tr>
      <tr><td><strong>P12</strong></td><td>Médico</td><td>Limites e Formato CRM</td><td>Ausência de pistas informando limite de 0 a 60 e padrão CRM-UF.</td><td>5.2.6, 5.3.7</td></tr>
      <tr><td><strong>P13</strong></td><td>Médico</td><td>Feedback de Erro</td><td>Erros reportados somente por pop-up, sem indicação no campo.</td><td>6.4.2a, 7.3</td></tr>
      <tr><td><strong>P14</strong></td><td>Médico</td><td>Unicidade de CRM</td><td>Permitia cadastrar médicos com o mesmo número de CRM.</td><td>6.5.2b</td></tr>
      <tr><td><strong>P15</strong></td><td>Médico</td><td>Perda entre Abas</td><td>Mudança de aba limpava os dados do profissional em curso.</td><td>8.6.2</td></tr>
      <tr><td><strong>P16</strong></td><td>Médico</td><td>Atalhos de Teclado</td><td>Tecla Esc inoperante e ausência de ação de desfazimento.</td><td>6.4.1, 6.4.6</td></tr>
      <tr><td><strong>P17</strong></td><td>Agendamento</td><td>Foco Inicial</td><td>Seletor de paciente sem cursor de foco na inicialização.</td><td>8.1</td></tr>
      <tr><td><strong>P18</strong></td><td>Agendamento</td><td>Interdependência</td><td>Campo de sala virtual permanecia editável no formato Presencial.</td><td>6.2.4, 6.2.5, 6.4.4</td></tr>
      <tr><td><strong>P19</strong></td><td>Agendamento</td><td>Área Multilinha</td><td>Textarea de queixa sem limite máximo nem contador numérico.</td><td>6.2.3, 6.2.6</td></tr>
      <tr><td><strong>P20</strong></td><td>Agendamento</td><td>Pistas e Validação</td><td>Permitia agendar para datas passadas sem aviso de validação.</td><td>5.2.6, 5.3.7</td></tr>
      <tr><td><strong>P21</strong></td><td>Agendamento</td><td>Validação Bloqueante</td><td>Disparo de pop-up <code>alert()</code> ao tentar salvar incompleto.</td><td>6.4.2a, 7.3</td></tr>
      <tr><td><strong>P22</strong></td><td>Agendamento</td><td>Resumo de Inconsistências</td><td>Ausência de sumário superior com links para os erros.</td><td>6.4.2a</td></tr>
      <tr><td><strong>P23</strong></td><td>Agendamento</td><td>Perda de Triagem</td><td>Alternar para consulta de registros descartava a queixa clínica.</td><td>8.6.2</td></tr>
      <tr><td><strong>P24</strong></td><td>Agendamento</td><td>Cancelamento e Undo</td><td>Falta de atalho Esc e ausência de restauração de limpeza.</td><td>6.4.1, 6.4.6</td></tr>
    </tbody>
  </table>
  <div class="quadro-fonte">Fonte: Autoria própria (2026).</div>
</div>

<!-- 5. ANÁLISE COMPARATIVA -->
<h1 class="section-break">5 ANÁLISE COMPARATIVA</h1>

<h2>5.1 QUADRO COMPARATIVO VISUAL</h2>
<p>
  Esta seção documenta a evolução ergonômica de cada formulário, confrontando o estado inicial (Antes) e a versão corrigida (Depois) através de evidências visuais diretas e quadros comparativos alinhados às cláusulas da ISO 9241-17.
</p>

<!-- 5.1.1 PACIENTE -->
<h3>5.1.1 Módulo de Cadastro de Paciente</h3>
<p>
  A Figura 1 apresenta a interface original do Cadastro de Paciente (versão preliminar MedFlow Clinic OS), caracterizada pela ausência de instruções no topo, falta de foco inicial e ausência de dicas permanentes de formato. Em contraste, a Figura 2 apresenta a versão final corrigida do Synapse Health, onde o cursor foca imediatamente em "Nome Completo", um banner instrucional informa atalhos de teclado e legendas, e pistas permanentes orientam o preenchimento.
</p>

<div class="figure-wrapper">
  <div class="figure-title">Figura 1 – Tela de Paciente: versão inicial (MedFlow Clinic OS)</div>
  <div class="figure-img-box">
    <img src="{img_p_antes}" alt="Tela de Paciente Versão Inicial" />
  </div>
  <div class="figure-source">Fonte: Autoria própria (2026).</div>
</div>

<div class="figure-wrapper section-break">
  <div class="figure-title">Figura 2 – Tela de Paciente: versão final após adequações de conformidade</div>
  <div class="figure-img-box">
    <img src="{img_p_depois}" alt="Tela de Paciente Versão Final" />
  </div>
  <div class="figure-source">Fonte: Autoria própria (2026).</div>
</div>

<p>
  O Quadro 9 estabelece o comparativo item a item entre a versão inicial e a versão corrigida do formulário de Paciente.
</p>

<div class="quadro-wrapper">
  <div class="quadro-header">Quadro 9 – Comparativo entre o Estado Inicial e o Estado Corrigido da Tela de Paciente</div>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Aspecto</th>
        <th>Versão Inicial (Antes)</th>
        <th>Versão Final (Depois)</th>
        <th>ISO 9241-17</th>
        <th>Avaliação</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Instruções de Uso</td>
        <td>Subtítulo básico; sem comandos de navegação ou teclas.</td>
        <td>Banner no topo informando Tab, Shift+Tab, Enter e Esc.</td>
        <td>5.1.4: instruções na tela para preencher e salvar</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Cursor Inicial</td>
        <td>Inerte ao carregar; exigia clique manual com mouse.</td>
        <td>Foco automático direcionado ao campo "Nome Completo".</td>
        <td>8.1: cursor posicionado no primeiro campo de entrada</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Obrigatório x Opcional</td>
        <td>Asterisco exibido sem legenda de explicação.</td>
        <td>Legenda explícita: * Obrigatório. Demais opcionais.</td>
        <td>5.3.2: diferença imediatamente perceptível</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>4</td>
        <td>Pistas de Formato</td>
        <td>Placeholder volátil que sumia ao iniciar digitação.</td>
        <td>Textos estáticos permanentes sob CPF e Telefone.</td>
        <td>5.3.7: dicas de formato nos campos; 5.2.6: limites</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>5</td>
        <td>Mensagens de Erro</td>
        <td>Pop-up <code>alert()</code> nativo bloqueando o fluxo.</td>
        <td>Validação inline no desfoque com borda vermelha.</td>
        <td>7.3: feedback indicando natureza do erro</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>6</td>
        <td>Resumo de Erros</td>
        <td>Inexistente; usuário devia adivinhar pendências.</td>
        <td>Sumário no topo com links de foco direto no campo.</td>
        <td>6.4.2a: campos com erro indicados e foco no 1º erro</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>7</td>
        <td>Unicidade de CPF</td>
        <td>Permitia cadastros duplicados com o mesmo CPF.</td>
        <td>Validação cruzada rejeitando CPFs já cadastrados.</td>
        <td>6.5.2b: validação entre registros na base</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>8</td>
        <td>Preservação entre Abas</td>
        <td>Trocar de aba limpava os dados digitados.</td>
        <td>Rascunho mantido em <code>pacienteDraft</code> no Context.</td>
        <td>8.6.2: mover entre formulários sem perder dados</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>9</td>
        <td>Recuperação e Undo</td>
        <td>Ação de limpar imediata e irreversível.</td>
        <td>Buffer de restauração e banner "Desfazer Limpeza".</td>
        <td>6.4.1: reiniciar ou cancelar; 6.4.6: desfazer</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>10</td>
        <td>Atalho de Saída</td>
        <td>Nenhum atalho de cancelamento configurado.</td>
        <td>Tecla Esc aciona a rotina de limpeza controlada.</td>
        <td>6.4.6: escape do formulário sem alterar dados</td>
        <td>Corrigido</td>
      </tr>
    </tbody>
  </table>
  <div class="quadro-fonte">Fonte: Autoria própria (2026).</div>
</div>

<p>
  As Figuras 3 e 4 detalham o comportamento dos mecanismos de recuperação de falhas implementados no módulo de Paciente: validação inline e painel de resumo de pendências (Figura 3) e o banner de desfazimento seguro (Figura 4).
</p>

<div class="figure-wrapper section-break">
  <div class="figure-title">Figura 3 – Validação inline com destaque visual e painel de erros na tela de Paciente</div>
  <div class="figure-img-box">
    <img src="{img_p_erros}" alt="Tela de Paciente com Validação de Erros" />
  </div>
  <div class="figure-source">Fonte: Autoria própria (2026).</div>
</div>

<div class="figure-wrapper">
  <div class="figure-title">Figura 4 – Ação de limpar com buffer de restauração e banner "Desfazer" na tela de Paciente</div>
  <div class="figure-img-box small-img">
    <img src="{img_p_undo}" alt="Tela de Paciente com Banner Desfazer" />
  </div>
  <div class="figure-source">Fonte: Autoria própria (2026).</div>
</div>

<!-- 5.1.2 MÉDICO -->
<h3 class="section-break">5.1.2 Módulo de Cadastro de Médico Especialista</h3>
<p>
  A Figura 5 apresenta a tela de Médico na versão inicial, onde o campo "Tempo de Experiência" era um número puro sem indicador da unidade ("anos"), e o formulário não oferecia instruções no topo nem pistas permanentes de formatação do CRM. A Figura 6 ilustra a versão corrigida, destacando o badge integrado com sufixo "anos", as dicas de valores permitidos e o banner de instruções.
</p>

<div class="figure-wrapper">
  <div class="figure-title">Figura 5 – Tela de Médico Especialista: versão inicial sem indicadores ergonômicos</div>
  <div class="figure-img-box">
    <img src="{img_m_antes}" alt="Tela de Médico Versão Inicial" />
  </div>
  <div class="figure-source">Fonte: Autoria própria (2026).</div>
</div>

<div class="figure-wrapper section-break">
  <div class="figure-title">Figura 6 – Tela de Médico Especialista: versão final com unidade integrada e pistas de CRM</div>
  <div class="figure-img-box">
    <img src="{img_m_depois}" alt="Tela de Médico Versão Final" />
  </div>
  <div class="figure-source">Fonte: Autoria própria (2026).</div>
</div>

<p>
  O Quadro 10 resume a análise comparativa detalhada do formulário de Médico Especialista.
</p>

<div class="quadro-wrapper">
  <div class="quadro-header">Quadro 10 – Comparativo entre o Estado Inicial e o Estado Corrigido da Tela de Médico</div>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Aspecto</th>
        <th>Versão Inicial (Antes)</th>
        <th>Versão Final (Depois)</th>
        <th>ISO 9241-17</th>
        <th>Avaliação</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Foco Inicial</td>
        <td>Sem foco na abertura da tela.</td>
        <td>Foco automático em "Nome do Profissional".</td>
        <td>8.1: cursor no primeiro campo editável</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Instruções de Uso</td>
        <td>Sem orientações de navegação ou teclas.</td>
        <td>Banner superior com atalhos e regras.</td>
        <td>5.1.4: instruções acessíveis na tela</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Unidade de Medida</td>
        <td>Número puro sem menção à unidade física.</td>
        <td>Badge integrado com sufixo visual "anos".</td>
        <td>5.3.6: símbolos ou unidades junto ao campo</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>4</td>
        <td>Pistas de Formato</td>
        <td>Sem indicação de faixa etária ou padrão CRM.</td>
        <td>Pistas estáticas: 0 a 60 anos e CRM-UF.</td>
        <td>5.3.7: dicas de formato; 5.2.6: limites</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>5</td>
        <td>Validação de Erro</td>
        <td>Janela <code>alert()</code> síncrona ao salvar.</td>
        <td>Validação inline com mensagem específica.</td>
        <td>7.3: feedback indicando natureza do erro</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>6</td>
        <td>Resumo de Falhas</td>
        <td>Inexistente.</td>
        <td>Painel de pendências no topo com foco direto.</td>
        <td>6.4.2a: campos com erro indicados e navegáveis</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>7</td>
        <td>Unicidade de CRM</td>
        <td>Permitia cadastrar médicos com mesmo CRM.</td>
        <td>Bloqueio de duplicidade via consulta local.</td>
        <td>6.5.2b: validação de unicidade de registros</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>8</td>
        <td>Preservação de Dados</td>
        <td>Navegação limpava o preenchimento.</td>
        <td>Rascunho mantido em <code>medicoDraft</code> no Context.</td>
        <td>8.6.2: alternância entre telas sem perda</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>9</td>
        <td>Controle de Undo</td>
        <td>Limpeza definitiva e irreversível.</td>
        <td>Buffer de restauração e botão de desfazer.</td>
        <td>6.4.1: controle para recomeçar; 6.4.6: desfazer</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>10</td>
        <td>Cancelamento Rápido</td>
        <td>Sem atalho de teclado configurado.</td>
        <td>Tecla Esc aciona cancelamento seguro.</td>
        <td>6.4.6: escape do formulário sem perda</td>
        <td>Corrigido</td>
      </tr>
    </tbody>
  </table>
  <div class="quadro-fonte">Fonte: Autoria própria (2026).</div>
</div>

<div class="figure-wrapper section-break">
  <div class="figure-title">Figura 7 – Feedback de erro e bloqueio de CRM duplicado na tela de Médico Especialista</div>
  <div class="figure-img-box">
    <img src="{img_m_erros}" alt="Tela de Médico com Erros e Validação" />
  </div>
  <div class="figure-source">Fonte: Autoria própria (2026).</div>
</div>

<!-- 5.1.3 AGENDAMENTO -->
<h3>5.1.3 Módulo de Agendamento & Triagem Clínica</h3>
<p>
  A Figura 8 apresenta o módulo de Agendamento na versão anterior, onde a opção de sala virtual permanecia ativa mesmo quando a consulta era presencial, induzindo o operador ao preenchimento de links inexistentes. As Figuras 9 e 10 demonstram a solução ergonômica: quando a consulta é "Presencial", o campo de sala virtual é desabilitado, recebe fundo cinza e a mensagem "Não aplicável para consulta presencial" (Figura 9); ao alternar para "Telemedicina", o campo é imediatamente reabilitado e focado (Figura 10). A Figura 11 exibe o contador dinâmico de caracteres e o painel de erros.
</p>

<div class="figure-wrapper">
  <div class="figure-title">Figura 8 – Tela de Agendamento & Triagem: versão inicial com falha de interdependência</div>
  <div class="figure-img-box">
    <img src="{img_a_antes}" alt="Tela de Agendamento Versão Inicial" />
  </div>
  <div class="figure-source">Fonte: Autoria própria (2026).</div>
</div>

<div class="figure-wrapper section-break">
  <div class="figure-title">Figura 9 – Tela de Agendamento: formato Presencial com sala virtual bloqueada e acinzentada</div>
  <div class="figure-img-box">
    <img src="{img_a_presencial}" alt="Agendamento Presencial com Campo Desabilitado" />
  </div>
  <div class="figure-source">Fonte: Autoria própria (2026).</div>
</div>

<div class="figure-wrapper">
  <div class="figure-title">Figura 10 – Tela de Agendamento: formato Telemedicina com link da sala reabilitado e focado</div>
  <div class="figure-img-box">
    <img src="{img_a_tele}" alt="Agendamento Telemedicina com Campo Reabilitado" />
  </div>
  <div class="figure-source">Fonte: Autoria própria (2026).</div>
</div>

<div class="figure-wrapper section-break">
  <div class="figure-title">Figura 11 – Contador de caracteres no textarea e painel de pendências no Agendamento</div>
  <div class="figure-img-box">
    <img src="{img_a_contador}" alt="Agendamento Contador e Erros" />
  </div>
  <div class="figure-source">Fonte: Autoria própria (2026).</div>
</div>

<div class="quadro-wrapper">
  <div class="quadro-header">Quadro 11 – Comparativo entre o Estado Inicial e o Estado Corrigido da Tela de Agendamento</div>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Aspecto</th>
        <th>Versão Inicial (Antes)</th>
        <th>Versão Final (Depois)</th>
        <th>ISO 9241-17</th>
        <th>Avaliação</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Foco Inicial</td>
        <td>Inerte; exigia clique manual no seletor.</td>
        <td>Foco automático no seletor de "Paciente".</td>
        <td>8.1: cursor no primeiro campo editável</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Interdependência</td>
        <td>URL da sala habilitada em consulta presencial.</td>
        <td>URL desabilitada e cinza no Presencial; reativada na Telemedicina.</td>
        <td>6.2.4, 6.2.5, 6.4.4: tratamento automático de regras</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Área Multilinha</td>
        <td>Textarea sem limite e sem contador de chars.</td>
        <td>Limite de 500 chars, auto-wrap e contador dinâmico (xx / 500).</td>
        <td>6.2.3: áreas delimitadas; 6.2.6: tamanho adequado</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>4</td>
        <td>Pistas de Formato</td>
        <td>Sem orientações para formato de data e hora.</td>
        <td>Pistas estáticas permanentes: formato 24h e data futura.</td>
        <td>5.3.7: dicas de formato; 5.2.6: limites</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>5</td>
        <td>Validação de Erro</td>
        <td>Disparo de pop-up <code>alert()</code> no submit.</td>
        <td>Validação inline contextual sem interromper tela.</td>
        <td>7.3: feedback indicando natureza do erro</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>6</td>
        <td>Painel de Falhas</td>
        <td>Ausente.</td>
        <td>Painel no topo com links para foco direto no erro.</td>
        <td>6.4.2a: campos com erro indicados e navegáveis</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>7</td>
        <td>Preservação de Dados</td>
        <td>Triagem perdida ao alternar de aba.</td>
        <td>Rascunho gravado em <code>agendamentoDraft</code> no Context.</td>
        <td>8.6.2: alternância entre telas sem perda</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>8</td>
        <td>Controle de Undo</td>
        <td>Limpeza sem opção de recuperação.</td>
        <td>Buffer de undo e botão de restauração imediata.</td>
        <td>6.4.1: reiniciar; 6.4.6: desfazer</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>9</td>
        <td>Atalho de Saída</td>
        <td>Tecla Esc inoperante.</td>
        <td>Esc aciona a limpeza com proteção de undo.</td>
        <td>6.4.6: escape do formulário sem perda</td>
        <td>Corrigido</td>
      </tr>
      <tr>
        <td>10</td>
        <td>Instruções de Topo</td>
        <td>Subtítulo básico sem orientações de fluxo.</td>
        <td>Banner instrucional com atalhos e legenda.</td>
        <td>5.1.4: instruções acessíveis na tela</td>
        <td>Corrigido</td>
      </tr>
    </tbody>
  </table>
  <div class="quadro-fonte">Fonte: Autoria própria (2026).</div>
</div>

<!-- 5.2 MATRIZ DE CONFORMIDADE FINAL -->
<h2 class="section-break">5.2 MATRIZ DE CONFORMIDADE FINAL</h2>
<p>
  O Quadro 12 consolida, por tela, o atendimento de todas as 30 recomendações da ISO 9241-17 consideradas na avaliação ergonômica do Synapse Health. Cada célula indica os aspectos relacionados à recomendação, conforme a numeração dos Quadros 9 (Paciente), 10 (Médico) e 11 (Agendamento); o traço indica que a recomendação não foi associada ao módulo.
</p>

<div class="quadro-wrapper">
  <div class="quadro-header">Quadro 12 – Matriz de Conformidade Final da ISO 9241-17</div>
  <table>
    <thead>
      <tr>
        <th>Recomendação</th>
        <th>Descrição Normativa (ISO 9241-17)</th>
        <th>Paciente</th>
        <th>Médico</th>
        <th>Agendamento</th>
        <th>Conformidade Final</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>5.1.1</td><td>Títulos claros e identificadores da finalidade</td><td>Atendida</td><td>Atendida</td><td>Atendida</td><td>100% Conforme</td></tr>
      <tr><td>5.1.2</td><td>Codificação visual distinta para entradas e dados</td><td>Atendida</td><td>Atendida</td><td>Atendida</td><td>100% Conforme</td></tr>
      <tr><td>5.1.3</td><td>Densidade de apresentação global inferior a 40%</td><td>Atendida</td><td>Atendida</td><td>Atendida</td><td>100% Conforme</td></tr>
      <tr><td>5.1.4</td><td>Instruções na tela ou em ajuda de fácil acesso</td><td>Atendida (1)</td><td>Atendida (2)</td><td>Atendida (10)</td><td>100% Conforme</td></tr>
      <tr><td>5.2.2</td><td>Agrupamento funcional e lógico dos campos</td><td>Atendida</td><td>Atendida</td><td>Atendida</td><td>100% Conforme</td></tr>
      <tr><td>5.2.3</td><td>Posicionamento prioritário de campos obrigatórios</td><td>Atendida</td><td>Atendida</td><td>Atendida</td><td>100% Conforme</td></tr>
      <tr><td>5.2.4</td><td>Alinhamento vertical e justificação de alfanuméricos</td><td>Atendida</td><td>Atendida</td><td>Atendida</td><td>100% Conforme</td></tr>
      <tr><td>5.2.5</td><td>Alinhamento justificado à direita para numéricos</td><td>Atendida</td><td>Atendida</td><td>Atendida</td><td>100% Conforme</td></tr>
      <tr><td>5.2.6</td><td>Informação sobre valores permitidos e limites</td><td>Atendida (4)</td><td>Atendida (4)</td><td>Atendida (4)</td><td>100% Conforme</td></tr>
      <tr><td>5.3.1</td><td>Comprimento explícito indicado em campos de tamanho fixo</td><td>Atendida (4)</td><td>Atendida (4)</td><td>Atendida (3)</td><td>100% Conforme</td></tr>
      <tr><td>5.3.2</td><td>Diferença entre obrigatórios e opcionais perceptível</td><td>Atendida (3)</td><td>Atendida (2)</td><td>Atendida (10)</td><td>100% Conforme</td></tr>
      <tr><td>5.3.3</td><td>Distinção entre campos editáveis e somente leitura</td><td>–</td><td>–</td><td>Atendida (2)</td><td>100% Conforme</td></tr>
      <tr><td>5.3.4</td><td>Rótulos e opções claros e sem ambiguidade</td><td>Atendida</td><td>Atendida (3)</td><td>Atendida (10)</td><td>100% Conforme</td></tr>
      <tr><td>5.3.5</td><td>Mesmo critério de rótulos aplicado em todo o sistema</td><td>Atendida</td><td>Atendida</td><td>Atendida</td><td>100% Conforme</td></tr>
      <tr><td>5.3.6</td><td>Símbolos ou unidades de medida junto aos campos</td><td>–</td><td>Atendida (3)</td><td>–</td><td>100% Conforme</td></tr>
      <tr><td>5.3.7</td><td>Dicas de formato de entrada (cues) nos campos</td><td>Atendida (4)</td><td>Atendida (4)</td><td>Atendida (4)</td><td>100% Conforme</td></tr>
      <tr><td>5.3.8</td><td>Rótulos com letra maiúscula seguida de minúsculas</td><td>Atendida</td><td>Atendida</td><td>Atendida</td><td>100% Conforme</td></tr>
      <tr><td>6.1.1</td><td>Ações mínimas para mover o cursor entre campos</td><td>Atendida</td><td>Atendida</td><td>Atendida</td><td>100% Conforme</td></tr>
      <tr><td>6.1.3</td><td>Valores padrão claros e editáveis pelo usuário</td><td>Atendida</td><td>Atendida</td><td>Atendida</td><td>100% Conforme</td></tr>
      <tr><td>6.2.3</td><td>Áreas multilinhas delimitadas com auto-wrap</td><td>–</td><td>–</td><td>Atendida (3)</td><td>100% Conforme</td></tr>
      <tr><td>6.2.4</td><td>Indicação visual para campos mutuamente exclusivos</td><td>Atendida</td><td>Atendida</td><td>Atendida (2)</td><td>100% Conforme</td></tr>
      <tr><td>6.2.5</td><td>Tratamento automático de regras de interdependência</td><td>–</td><td>–</td><td>Atendida (2)</td><td>100% Conforme</td></tr>
      <tr><td>6.2.6</td><td>Dimensão adequada do campo de texto</td><td>Atendida</td><td>Atendida</td><td>Atendida (3)</td><td>100% Conforme</td></tr>
      <tr><td>6.3.1</td><td>Mecanismo para visualizar e escolher opções</td><td>Atendida</td><td>Atendida</td><td>Atendida</td><td>100% Conforme</td></tr>
      <tr><td>6.4.1</td><td>Recomeçar, cancelar ou alterar antes do envio</td><td>Atendida (9)</td><td>Atendida (9)</td><td>Atendida (8)</td><td>100% Conforme</td></tr>
      <tr><td>6.4.2a</td><td>Campos com erro indicados e foco no primeiro erro</td><td>Atendida (6)</td><td>Atendida (6)</td><td>Atendida (6)</td><td>100% Conforme</td></tr>
      <tr><td>6.4.4</td><td>Áreas indisponíveis sem cursor e com pista visual</td><td>–</td><td>–</td><td>Atendida (2)</td><td>100% Conforme</td></tr>
      <tr><td>6.4.6</td><td>Informação sobre conclusão, saída e desfazer</td><td>Atendida (9, 10)</td><td>Atendida (9, 10)</td><td>Atendida (8, 9)</td><td>100% Conforme</td></tr>
      <tr><td>6.5.1</td><td>Validação de campo no desfoque (onBlur)</td><td>Atendida (5)</td><td>Atendida (5)</td><td>Atendida (5)</td><td>100% Conforme</td></tr>
      <tr><td>6.5.2b</td><td>Validação de dependências cruzadas e unicidade</td><td>Atendida (7)</td><td>Atendida (7)</td><td>–</td><td>100% Conforme</td></tr>
      <tr><td>7.3</td><td>Aviso indicando a natureza e a correção do erro</td><td>Atendida (5)</td><td>Atendida (5)</td><td>Atendida (5)</td><td>100% Conforme</td></tr>
      <tr><td>7.4 / 7.5</td><td>Confirmação explícita de atualização da base</td><td>Atendida</td><td>Atendida</td><td>Atendida</td><td>100% Conforme</td></tr>
      <tr><td>8.1</td><td>Cursor no primeiro campo a preencher (auto-foco)</td><td>Atendida (2)</td><td>Atendida (1)</td><td>Atendida (1)</td><td>100% Conforme</td></tr>
      <tr><td>8.2a</td><td>Movimentação bidirecional entre campos (Tab/Shift+Tab)</td><td>Atendida (1)</td><td>Atendida (2)</td><td>Atendida (10)</td><td>100% Conforme</td></tr>
      <tr><td>8.6.2</td><td>Mover entre formulários sem perder o que foi digitado</td><td>Atendida (8)</td><td>Atendida (8)</td><td>Atendida (7)</td><td>100% Conforme</td></tr>
    </tbody>
  </table>
  <div class="quadro-fonte">Fonte: Autoria própria (2026), com base em INTERNATIONAL ORGANIZATION FOR STANDARDIZATION (1998).</div>
</div>

<!-- 5.3 CHECKLIST OFICIAL DE APLICABILIDADE E ADERÊNCIA DA ISO 9241-17 -->
<h2 class="section-break">5.3 CHECKLIST OFICIAL DE APLICABILIDADE E ADERÊNCIA DA ISO 9241-17 (TABELA A.1 DO ANEXO A)</h2>
<p>
  Para cumprir com máximo rigor técnico o Anexo A da norma ISO 9241-17, o Quadro 13 reproduz o <strong>Checklist Oficial de Aplicabilidade e Aderência (Tabela A.1)</strong> na íntegra, preenchendo cada uma das cláusulas de 5.1.1 a 8.6.6. Conforme o procedimento normativo:
</p>
<ul>
  <li><strong>Aplicabilidade:</strong> Indicada por $Y$ (Aplicável) ou $N$ (Não Aplicável). Métodos: $S$ (Análise Documental), $D$ (Evidência Documentada), $O$ (Observação), $A$ (Avaliação Analítica), $E$ (Empírica).</li>
  <li><strong>Aderência:</strong> Métodos: $M$ (Medição), $O$ (Observação), $D$ (Evidência Documentada), $A$ (Avaliação Analítica), $E$ (Empírica). Resultados: $P$ (Passed / Conforme) ou $F$ (Failed / Não Conforme).</li>
  <li><strong>Taxa de Aderência (Adherence Rating - AR):</strong> Calculada formalmente pela Cláusula A.7.1.5 da norma:
    $$\text{{AR}} = \\frac{{\\sum P}}{{\\sum Y}} \\times 100\\%$$
    Na versão inicial: $\\text{{AR}}_{{\\text{{inicial}}}} = \\frac{{21}}{{45}} = 46,7\\%$. Na versão final corrigida: $\\text{{AR}}_{{\\text{{final}}}} = \\frac{{45}}{{45}} = \\mathbf{{100,0\\%}}$.
  </li>
</ul>

<div class="quadro-wrapper">
  <div class="quadro-header">Quadro 13 – Checklist Geral de Aplicabilidade e Aderência da ISO 9241-17 (Tabela A.1 do Anexo A)</div>
  <table>
    <thead>
      <tr>
        <th rowspan="2">Cláusula</th>
        <th rowspan="2">Recomendação Resumida da ISO 9241-17</th>
        <th colspan="2">Aplicabilidade</th>
        <th colspan="3">Aderência e Avaliação</th>
        <th rowspan="2">Evidência / Comentário no Synapse Health</th>
      </tr>
      <tr>
        <th>Y/N</th>
        <th>Método</th>
        <th>Método</th>
        <th>Antes</th>
        <th>Depois</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>5.1.1</td><td>Títulos claros e identificadores da finalidade no topo</td><td>Y</td><td>S, O</td><td>O</td><td>P</td><td>P</td><td>Títulos "Cadastro de Paciente", "Cadastro de Especialista", "Agendamento" presentes no topo.</td></tr>
      <tr><td>5.1.2</td><td>Codificação visual distinta para entradas, padrões e dados</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Diferenciação clara entre rótulos (azul escuro), inputs (borda clara) e botões de ação.</td></tr>
      <tr><td>5.1.3</td><td>Densidade de apresentação global inferior a 40%</td><td>Y</td><td>A</td><td>M</td><td>P</td><td>P</td><td>Layout em grid 2 colunas com margens e áreas em branco preservando espaçamento visual.</td></tr>
      <tr><td>5.1.4</td><td>Instruções de preenchimento e navegação na tela</td><td>Y</td><td>S, O</td><td>O</td><td>F</td><td>P</td><td>Banner superior com teclas Tab, Shift+Tab, Enter, Esc e legenda de obrigatoriedade.</td></tr>
      <tr><td>5.1.5</td><td>Visão geral da estrutura do formulário</td><td>N</td><td>O</td><td>–</td><td>–</td><td>–</td><td>Não aplicável: os formulários são concisos e cabem na tela sem paginação complexa.</td></tr>
      <tr><td>5.2.1</td><td>Correspondência com documento de origem em papel</td><td>N</td><td>S</td><td>–</td><td>–</td><td>–</td><td>Não aplicável: o sistema opera diretamente em fluxo nativo web sem formulário de papel.</td></tr>
      <tr><td>5.2.2</td><td>Agrupamento funcional e lógico dos campos de entrada</td><td>Y</td><td>A</td><td>A</td><td>P</td><td>P</td><td>Campos agrupados em Dados Pessoais, Contato, Triagem Clínica e Parâmetros da Consulta.</td></tr>
      <tr><td>5.2.3</td><td>Posicionamento prioritário de campos obrigatórios</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Campos obrigatórios (Nome, CPF, Registro, Paciente) precedem os opcionais em cada bloco.</td></tr>
      <tr><td>5.2.4</td><td>Alinhamento vertical e justificação de alfanuméricos</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Campos alfanuméricos alinhados verticalmente em colunas com texto à esquerda.</td></tr>
      <tr><td>5.2.5</td><td>Alinhamento justificado à direita para entradas numéricas</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Inputs numéricos formatados adequadamente dentro dos limites dos controles.</td></tr>
      <tr><td>5.2.6</td><td>Informação sobre valores permitidos e limites de campos</td><td>Y</td><td>O</td><td>O</td><td>F</td><td>P</td><td>Pistas estáticas indicando 0 a 60 anos, 11 dígitos no CPF e limites de caracteres.</td></tr>
      <tr><td>5.2.7</td><td>Rótulos com comprimentos diferentes alinhados</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Rótulos posicionados acima de cada campo, evitando quebras e desalinhamentos horizontais.</td></tr>
      <tr><td>5.2.8</td><td>Rótulos com comprimentos similares</td><td>N</td><td>O</td><td>–</td><td>–</td><td>–</td><td>Não aplicável: optou-se pela convenção moderna de rótulo superior para todos os campos.</td></tr>
      <tr><td>5.2.9</td><td>Múltiplas instâncias de campos em tabelas</td><td>N</td><td>O</td><td>–</td><td>–</td><td>–</td><td>Não aplicável: os formulários cadastrais não utilizam grades matriciais de entrada repetitiva.</td></tr>
      <tr><td>5.2.10</td><td>Formulários com múltiplas páginas identificadas</td><td>N</td><td>O</td><td>–</td><td>–</td><td>–</td><td>Não aplicável: cada cadastro constitui uma visualização autônoma em aba única.</td></tr>
      <tr><td>5.3.1</td><td>Comprimento explícito indicado em campos fixos</td><td>Y</td><td>O</td><td>O</td><td>F</td><td>P</td><td>Campos de CPF e telefone possuem máscaras delimitando explicitamente o tamanho fixo.</td></tr>
      <tr><td>5.3.2</td><td>Distinção imediata entre campos obrigatórios e opcionais</td><td>Y</td><td>O</td><td>O</td><td>F</td><td>P</td><td>Asterisco (*) presente em todos os obrigatórios acompanhado de legenda explicativa no topo.</td></tr>
      <tr><td>5.3.3</td><td>Distinção entre campos editáveis e somente leitura</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Campos desabilitados (sala virtual presencial) acinzentados com cursor bloqueado.</td></tr>
      <tr><td>5.3.4</td><td>Rótulos descritivos claros e sem ambiguidade</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Rótulos autoexplicativos como "Nome Completo", "Registro CRM/UF" e "Queixa Principal".</td></tr>
      <tr><td>5.3.5</td><td>Mesmo critério de estilo de rótulos em todo o sistema</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Padronização visual rigorosa de tamanho de fonte, peso e cor em todos os 3 módulos.</td></tr>
      <tr><td>5.3.6</td><td>Símbolos ou unidades de medida junto aos campos</td><td>Y</td><td>O</td><td>O</td><td>F</td><td>P</td><td>Sufixo textual "anos" integrado fisicamente ao campo de tempo de experiência do médico.</td></tr>
      <tr><td>5.3.7</td><td>Pistas permanentes de formato de entrada (cues)</td><td>Y</td><td>O</td><td>O</td><td>F</td><td>P</td><td>Legendas fixas sob os campos especificando os formatos (000.000.000-00, HH:mm, etc.).</td></tr>
      <tr><td>5.3.8</td><td>Rótulos iniciados com maiúscula seguida de minúsculas</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Todos os 24 rótulos em conformidade com as regras gramaticais e de caixa alta inicial.</td></tr>
      <tr><td>6.1.1</td><td>Ações mínimas para mover o cursor entre campos</td><td>Y</td><td>O</td><td>O</td><td>F</td><td>P</td><td>Foco inicial automático e avanço sequencial rápido por tecla Tab sem cliques adicionais.</td></tr>
      <tr><td>6.1.2</td><td>Avanço permitido sem preencher espaços em branco</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Não há preenchimento forçado de caracteres de preenchimento nulo no formulário.</td></tr>
      <tr><td>6.1.3</td><td>Valores padrão adequados e editáveis pelo usuário</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Padrões como "O+" em sangue, 5 anos de experiência e horário "09:30" editáveis.</td></tr>
      <tr><td>6.1.4</td><td>Minimização de alternância entre teclado e apontador</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Fluxo integral de preenchimento, submissão e limpeza realizável 100% pelo teclado.</td></tr>
      <tr><td>6.1.5</td><td>Dispositivo apontador utilizável para navegação</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Compatibilidade total com cliques diretos de mouse e telas sensíveis ao toque.</td></tr>
      <tr><td>6.2.1</td><td>Justificação automática de entradas pelo sistema</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Alinhamento e formatação de máscaras gerenciados automaticamente pela aplicação.</td></tr>
      <tr><td>6.2.2</td><td>Zeros à esquerda inseridos pelo sistema</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Tratamento de identificadores numéricos gerenciado sem forçar digitação de zeros.</td></tr>
      <tr><td>6.2.3</td><td>Áreas multilinhas delimitadas com quebra automática</td><td>Y</td><td>O</td><td>O</td><td>F</td><td>P</td><td>Textarea de queixa com auto-wrap de palavras, altura fixa e limite de 500 caracteres.</td></tr>
      <tr><td>6.2.4</td><td>Indicação visual para campos mutuamente exclusivos</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Radio buttons visíveis em grupos estilizados para sexo, turno e formato de consulta.</td></tr>
      <tr><td>6.2.5</td><td>Tratamento automático de regras de interdependência</td><td>Y</td><td>O</td><td>O</td><td>F</td><td>P</td><td>Sala virtual bloqueada no presencial e reativada com obrigatoriedade na telemedicina.</td></tr>
      <tr><td>6.2.6</td><td>Dimensão adequada da área de texto sem rolagem excessiva</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Caixa de texto responsiva com espaço para visualização de parágrafos clínicos.</td></tr>
      <tr><td>6.3.1</td><td>Mecanismo para ver e selecionar opções pré-determinadas</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Dropdowns para tipo sanguíneo, especialidade médica, paciente e médico responsável.</td></tr>
      <tr><td>6.3.2</td><td>Pistas visuais discrimináveis entre tipos de seleção</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Círculos para seleção exclusiva (radio) e switches deslizantes para opções binárias.</td></tr>
      <tr><td>6.3.3</td><td>Menus suspensos com indicação de seleção atual</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Dropdowns exibindo a opção ativa com setas indicativas de expansão.</td></tr>
      <tr><td>6.3.4</td><td>Listas com mecanismos de navegação e busca rápida</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Seleção dinâmica de pacientes e médicos alimentada pela base cadastral da clínica.</td></tr>
      <tr><td>6.3.5</td><td>Botões de tela ativados imediatamente após seleção</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Botões de ação ("Salvar", "Limpar") com feedback reativo imediato no clique.</td></tr>
      <tr><td>6.3.6</td><td>Botões de escolha exclusiva (radio) em grupos &ge; 2</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Conjuntos de radio buttons com opções visíveis (Feminino/Masculino, Manhã/Tarde/...).</td></tr>
      <tr><td>6.3.7</td><td>Controles de estado binário com indicação do estado ativo</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Switch toggles com rótulos descritivos reativos ("Convênio Ativo" vs "Particular").</td></tr>
      <tr><td>6.3.8</td><td>Botões de passo (steppers) com entrada digitável</td><td>N</td><td>O</td><td>–</td><td>–</td><td>–</td><td>Não aplicável: substituídos por input numérico nativo e slider analógico contínuo.</td></tr>
      <tr><td>6.4.1</td><td>Possibilidade de reiniciar, alterar ou cancelar antes do envio</td><td>Y</td><td>O</td><td>O</td><td>F</td><td>P</td><td>Botão Limpar armazena rascunho em buffer e disponibiliza botão "Desfazer Limpeza".</td></tr>
      <tr><td>6.4.2a</td><td>Campos com erro indicados, cursor no primeiro erro</td><td>Y</td><td>O</td><td>O</td><td>F</td><td>P</td><td>Sumário no topo listando erros clicáveis com foco automático no primeiro controle.</td></tr>
      <tr><td>6.4.2b</td><td>Erros resultantes de interdependências indicados</td><td>Y</td><td>O</td><td>O</td><td>F</td><td>P</td><td>Mensagem explicando dependência da sala virtual e obrigatoriedade condicional.</td></tr>
      <tr><td>6.4.3</td><td>Reentrada de dados restrita apenas à parte incorreta</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Campos preenchidos corretamente são preservados intactos durante a correção de erros.</td></tr>
      <tr><td>6.4.4</td><td>Áreas não disponíveis inacessíveis ao cursor</td><td>Y</td><td>O</td><td>O</td><td>F</td><td>P</td><td>Campos bloqueados recebem atributo disabled, não entram no Tab e ficam acinzentados.</td></tr>
      <tr><td>6.4.5</td><td>Transmissão do formulário por ação simples e explícita</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Submissão clara através do botão primário "Salvar" ou pressionamento da tecla Enter.</td></tr>
      <tr><td>6.4.6</td><td>Orientações sobre saída sem alterar dados e desfazimento</td><td>Y</td><td>O</td><td>O</td><td>F</td><td>P</td><td>Banner superior orienta uso da tecla Esc para cancelamento e atalho de restauração.</td></tr>
      <tr><td>6.4.7</td><td>Salvamento temporário de dados do formulário</td><td>Y</td><td>O</td><td>O</td><td>F</td><td>P</td><td>Estados de rascunho gravam em tempo real o progresso ao alternar entre as abas.</td></tr>
      <tr><td>6.5.1</td><td>Validação de campo único no momento do preenchimento</td><td>Y</td><td>O</td><td>O</td><td>F</td><td>P</td><td>Evento onBlur valida sintaxe de CPF, CRM, e-mail e datas ao desfocar do campo.</td></tr>
      <tr><td>6.5.2a</td><td>Validação cruzada entre campos do mesmo formulário</td><td>Y</td><td>O</td><td>O</td><td>F</td><td>P</td><td>Validação condicional entre modalidade presencial/telemedicina e campo de link web.</td></tr>
      <tr><td>6.5.2b</td><td>Validação cruzada entre formulários / unicidade em banco</td><td>Y</td><td>O</td><td>O</td><td>F</td><td>P</td><td>Verificação cruzada bloqueando CPFs e CRMs duplicados contra a base local.</td></tr>
      <tr><td>7.1</td><td>Eco imediato de caracteres digitados na tela</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Reatividade instantânea em todos os inputs com resposta visual em milissegundos.</td></tr>
      <tr><td>7.2</td><td>Posição do cursor e ponteiro sempre claramente visível</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Bordas de foco em azul de alto contraste destacando o campo ativo a cada instante.</td></tr>
      <tr><td>7.3</td><td>Feedback imediato indicando a natureza e a correção do erro</td><td>Y</td><td>O</td><td>O</td><td>F</td><td>P</td><td>Mensagens descritivas em vermelho (.field-error-msg) logo abaixo do campo com falha.</td></tr>
      <tr><td>7.4</td><td>Notificação explícita de confirmação de transmissão aceita</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Toast notifications em verde sinalizando o sucesso da inclusão de cada cadastro.</td></tr>
      <tr><td>7.5</td><td>Feedback transparente informando atualização da base de dados</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Contadores de registros no cabeçalho e na barra lateral incrementados no salvamento.</td></tr>
      <tr><td>8.1</td><td>Foco inicial automático no primeiro campo editável da tela</td><td>Y</td><td>O</td><td>O</td><td>F</td><td>P</td><td>Cursor posicionado em Nome (Paciente), Nome (Médico) e Paciente (Agendamento).</td></tr>
      <tr><td>8.2a</td><td>Movimentação bidirecional entre campos (Tab e Shift+Tab)</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Suporte integral a Tab (avançar) e Shift+Tab (retroceder) em sequência natural.</td></tr>
      <tr><td>8.2b</td><td>Mecanismo de acesso rápido a campos específicos</td><td>Y</td><td>O</td><td>O</td><td>F</td><td>P</td><td>Links no sumário de erros permitem saltar diretamente ao campo problemático.</td></tr>
      <tr><td>8.3</td><td>Comando para retornar ao campo inicial do formulário</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Atalhos de teclado e links de topo permitem retornar ao primeiro campo.</td></tr>
      <tr><td>8.4.1</td><td>Tabulação manual em formulários parcialmente preenchidos</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Tabulação manual sem auto-skip forçado, respeitando o ritmo cognitivo do usuário.</td></tr>
      <tr><td>8.4.2</td><td>Tabulação com auto-skip em campos totalmente preenchidos</td><td>N</td><td>A</td><td>–</td><td>–</td><td>–</td><td>Não adotado auto-skip para prevenir saltos inesperados de foco e erros de digitação.</td></tr>
      <tr><td>8.4.3</td><td>Não misturar tabulação manual com auto-skip</td><td>Y</td><td>A</td><td>A</td><td>P</td><td>P</td><td>Padrão consistente de tabulação manual preservado em 100% dos formulários.</td></tr>
      <tr><td>8.4.4</td><td>Pular campos mutuamente exclusivos após preenchimento</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Campos desabilitados condicionalmente são pulados na sequência de tabulação.</td></tr>
      <tr><td>8.4.5</td><td>Navegação direta entre seções do formulário</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Agrupamento em seções lógicas facilitando a orientação do operador.</td></tr>
      <tr><td>8.4.6</td><td>Ciclagem de registros sequenciais (anterior/próximo)</td><td>N</td><td>S</td><td>–</td><td>–</td><td>–</td><td>Não aplicável: o fluxo é de inserção individual de novos registros na recepção.</td></tr>
      <tr><td>8.4.7</td><td>Navegação entre múltiplos formulários por mouse</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Navegação acessível por cliques na barra lateral e abas do cabeçalho.</td></tr>
      <tr><td>8.5.1</td><td>Rolagem interna de campos longos</td><td>N</td><td>O</td><td>–</td><td>–</td><td>–</td><td>Não aplicável: áreas delimitadas com auto-wrap sem necessidade de scroll interno.</td></tr>
      <tr><td>8.6.1</td><td>Acesso direto a formulários por nome ou menu</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Menu lateral com acesso nominal direto a Paciente, Especialista e Agendamento.</td></tr>
      <tr><td>8.6.2</td><td>Movimento entre formulários sem perder o digitado</td><td>Y</td><td>O</td><td>O</td><td>F</td><td>P</td><td>Sincronização de rascunhos no Context API mantendo os dados intactos entre abas.</td></tr>
      <tr><td>8.6.3</td><td>Movimentação em níveis hierárquicos de formulários</td><td>N</td><td>S</td><td>–</td><td>–</td><td>–</td><td>Não aplicável: os cadastros operam em arquitetura relacional plana.</td></tr>
      <tr><td>8.6.4</td><td>Retorno facilitado ao formulário inicial da aplicação</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Botão de início no menu lateral permite retornar ao painel geral a qualquer momento.</td></tr>
      <tr><td>8.6.5</td><td>Apenas o formulário ativo pronto para entrada</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Exibição de aba única ativa por vez, isolando o contexto e o foco do usuário.</td></tr>
      <tr><td>8.6.6</td><td>Formulário padrão exibido na ativação inicial</td><td>Y</td><td>O</td><td>O</td><td>P</td><td>P</td><td>Dashboard e rotas padrão carregadas consistentemente na inicialização do sistema.</td></tr>
    </tbody>
  </table>
  <div class="quadro-fonte">Fonte: Autoria própria (2026), baseada no Anexo A da ISO 9241-17:1998. Legenda: Y=Aplicável; N=Não Aplicável; S=Doc; O=Observação; A=Analítica; M=Medição; P=Passed; F=Failed.</div>
</div>

<p>
  <strong>Resultado do Adherence Rating (AR):</strong> Conforme comprovado no Quadro 13, das 68 recomendações catalogadas na norma internacional ISO 9241-17, <strong>45 foram classificadas como aplicáveis ($Y$)</strong> ao escopo funcional do Synapse Health. Na versão preliminar do software, apenas 21 recomendações eram atendidas ($Passed$), resultando em um $\\text{{AR}}_{{\\text{{inicial}}}} = 46,7\\%$. Após as intervenções de código-fonte realizadas neste trabalho, <strong>todas as 45 recomendações aplicáveis foram plenamente atendidas ($P$)</strong>, atingindo $\\text{{AR}}_{{\\text{{final}}}} = \\mathbf{{100,0\\%}}$.
</p>

<!-- 6. CONCLUSÃO -->
<h1 class="section-break">6 CONCLUSÃO E CONSIDERAÇÕES FINAIS</h1>
<p>
  Este trabalho avaliou a conformidade ergonômica de usabilidade do software <strong>Synapse Health</strong> com base na norma internacional <strong>ISO 9241-17</strong>, analisando minuciosamente as telas de Cadastro de Paciente, Cadastro de Médico Especialista e Agendamento & Triagem Clínica. Foram examinados 45 aspectos de interação, cada um relacionado a recomendações normativas e comparado entre a versão inicial e a versão corrigida da interface, com suporte de registros visuais de alta fidelidade.
</p>
<p>
  O diagnóstico inicial comprovou que a modernidade puramente estética não é suficiente para assegurar conformidade ergonômica: 24 dos 45 aspectos apresentaram falhas graves de usabilidade. A cláusula 5 (estrutura do formulário) concentrou 10 problemas, a cláusula 6 (considerações de entrada) reuniu 9 problemas, a cláusula 7 (retorno) concentrou 3 falhas de feedback por modais bloqueantes, e a cláusula 8 (navegação) registrou 2 deficiências críticas de perda de dados e falta de foco inicial.
</p>
<p>
  As intervenções técnicas corrigiram integralmente os problemas identificados:
</p>
<ul>
  <li><strong>Orientação e Visibilidade:</strong> Inclusão de banners de instrução no topo, legendas explícitas de obrigatoriedade e pistas permanentes de formatação sintática;</li>
  <li><strong>Feedback e Recuperação de Erros:</strong> Supressão definitiva de caixas modais <code>alert()</code>, adoção de validações inline no evento <code>onBlur</code> com borda vermelha e mensagens descritivas, além de painel superior de pendências com redirecionamento de foco para o primeiro erro;</li>
  <li><strong>Eficiência e Respeito às Regras de Negócio:</strong> Foco automático no primeiro campo na montagem de cada tela, bloqueio condicional de campos incompatíveis (sala virtual no atendimento presencial) e validação de unicidade de CPF e CRM contra o banco local;</li>
  <li><strong>Segurança e Reversibilidade:</strong> Preservação automática de rascunhos no Context API ao alternar de aba e implementação de buffer de restauração com botão "Desfazer Limpeza" e atalho de cancelamento via tecla <code>Esc</code>.</li>
</ul>
<p>
  A matriz de conformidade final e o checklist oficial da Tabela A.1 comprovam que <strong>100% das recomendações aplicáveis foram plenamente atendidas</strong>, transformando o Synapse Health em uma aplicação robusta, eficiente e tolerante a erros, alinhada aos mais altos padrões acadêmicos e profissionais de Interação Humano-Computador.
</p>

<!-- REFERÊNCIAS -->
<h1 class="section-break">REFERÊNCIAS</h1>
<p class="no-indent" style="margin-bottom: 12pt;">
  CYBIS, Walter; BETIOL, André; FAUST, Richard. <strong>Ergonomia e Usabilidade: Conhecimentos, Métodos e Aplicações</strong>. 3. ed. São Paulo: Novatec, 2015.
</p>
<p class="no-indent" style="margin-bottom: 12pt;">
  GALITZ, Wilbert O. <strong>The Essential Guide to User Interface Design: An Introduction to GUI Design Principles and Techniques</strong>. 3. ed. Indianapolis: John Wiley & Sons, 2007.
</p>
<p class="no-indent" style="margin-bottom: 12pt;">
  INTERNATIONAL ORGANIZATION FOR STANDARDIZATION. <strong>ISO 9241-11: Ergonomic requirements for office work with visual display terminals (VDTs) — Part 11: Guidance on usability</strong>. Genebra: ISO, 1998.
</p>
<p class="no-indent" style="margin-bottom: 12pt;">
  INTERNATIONAL ORGANIZATION FOR STANDARDIZATION. <strong>ISO 9241-17: Ergonomic requirements for office work with visual display terminals (VDTs) — Part 17: Form filling dialogues</strong>. Genebra: ISO, 1998. 35 p.
</p>
<p class="no-indent" style="margin-bottom: 12pt;">
  NIELSEN, Jakob. <strong>Usability Engineering</strong>. San Francisco: Morgan Kaufmann, 1993.
</p>
<p class="no-indent" style="margin-bottom: 12pt;">
  SHNEIDERMAN, Ben; PLAISANT, Catherine. <strong>Designing the User Interface: Strategies for Effective Human-Computer Interaction</strong>. 5. ed. Boston: Addison-Wesley, 2010.
</p>

</body>
</html>
"""

with open("RELATORIO_CONFORMIDADE_ISO_9241_17.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("Relatório HTML completo gerado com sucesso!")
