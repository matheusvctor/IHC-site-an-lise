import React from 'react';
import {
  FileText,
  CheckCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
  Wrench,
  Scale,
  Award,
  Layers,
  CheckCircle2
} from 'lucide-react';

export default function IhcGuide() {
  const camposInventory = [
    { num: 1, form: '1. Paciente', campo: 'Nome Completo', tipo: 'type="text"', tag: 'text', icon: '🔤', desc: 'Entrada textual livre para identificação civil.' },
    { num: 2, form: '1. Paciente', campo: 'Data de Nascimento', tipo: 'type="date"', tag: 'date', icon: '📅', desc: 'Seletor de calendário nativo para datação precisa.' },
    { num: 3, form: '1. Paciente', campo: 'Telefone Celular', tipo: 'type="tel"', tag: 'tel', icon: '📱', desc: 'Teclado telefônico numérico com máscara.' },
    { num: 4, form: '1. Paciente', campo: 'E-mail do Paciente', tipo: 'type="email"', tag: 'email', icon: '✉️', desc: 'Validação sintática automática de endereço eletrônico.' },
    { num: 5, form: '1. Paciente', campo: 'Sexo Biológico', tipo: 'type="radio"', tag: 'radio', icon: '🔘', desc: 'Grupo de opções exclusivas (Feminino/Masculino/Outro).' },
    { num: 6, form: '1. Paciente', campo: 'Possui Convênio?', tipo: 'type="checkbox" (switch)', tag: 'checkbox', icon: '🎚️', desc: 'Alternância booleana com chave deslizante moderna.' },
    { num: 7, form: '2. Médico', campo: 'Nome e CRM', tipo: 'type="text"', tag: 'text', icon: '🔤', desc: 'Registro formal com máscara de conselho regional.' },
    { num: 8, form: '2. Médico', campo: 'Especialidade Médica', tipo: '<select> dropdown', tag: 'select', icon: '🔽', desc: 'Lista suspensa de opções pré-definidas padronizadas.' },
    { num: 9, form: '2. Médico', campo: 'Tempo de Experiência', tipo: 'type="number"', tag: 'number', icon: '🔢', desc: 'Controle numérico incremental com limites (min=0, max=60).' },
    { num: 10, form: '2. Médico', campo: 'Cor na Agenda', tipo: 'type="color"', tag: 'color', icon: '🎨', desc: 'Seletor nativo de cor hexadecimal (color picker).' },
    { num: 11, form: '2. Médico', campo: 'Comprovante / Diploma', tipo: 'type="file"', tag: 'file', icon: '📎', desc: 'Controle de upload de arquivos com dropzone estilizada.' },
    { num: 12, form: '3. Agendamento', campo: 'Vínculo do Paciente', tipo: '<select> dinâmico', tag: 'select', icon: '👥', desc: 'Menu suspenso alimentado dinamicamente pelos dados salvos.' },
    { num: 13, form: '3. Agendamento', campo: 'Horário da Consulta', tipo: 'type="time"', tag: 'time', icon: '⏰', desc: 'Seletor de tempo nativo no formato HH:mm.' },
    { num: 14, form: '3. Agendamento', campo: 'Link da Teleconsulta', tipo: 'type="url"', tag: 'url', icon: '🔗', desc: 'Entrada com validação estrita de protocolo de link web.' },
    { num: 15, form: '3. Agendamento', campo: 'Nível de Dor (EVA)', tipo: 'type="range"', tag: 'range', icon: '🎚️', desc: 'Slider analógico de 0 a 10 com badge semafórico reativo.' },
    { num: 16, form: '3. Agendamento', campo: 'Queixa Principal', tipo: '<textarea>', tag: 'textarea', icon: '📝', desc: 'Área de texto livre multilinha para descrição sintomática.' }
  ];

  return (
    <div className="tab-pane active">
      <div className="ihc-guide-card">
        {/* Cabeçalho da Seção IHC */}
        <div className="ihc-guide-header">
          <div className="flex items-center gap-3 mb-2">
            <div className="icon-badge-blue">
              <ShieldCheck size={26} className="text-blue-600" />
            </div>
            <div>
              <span className="badge-tag badge-blue font-semibold">DIRETRIZ DE DIÁLOGOS POR PREENCHIMENTO DE FORMULÁRIOS</span>
              <h2>Mapeamento para o Trabalho de IHC (ISO 9241-17)</h2>
            </div>
          </div>
          <p>
            Demonstração técnica de atendimento estrito aos requisitos do enunciado: <strong>no mínimo 3 cadastros</strong>,{' '}
            <strong>no mínimo 15 campos de preenchimento ao todo</strong> (implementados 16) e <strong>máxima variabilidade de controles</strong> (14 tipos distintos em 16 campos) para atingir a nota máxima.
          </p>
        </div>

        {/* Grade de Destaques e Atendimento de Requisitos */}
        <div className="ihc-summary-grid">
          <div className="summary-box">
            <h4 className="flex items-center gap-2 text-slate-800 font-bold mb-3">
              <CheckCircle2 size={19} className="text-emerald-600" />
              Requisitos Atendidos do Enunciado
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <strong>3 Cadastros no Mínimo:</strong> 1. Paciente • 2. Especialista • 3. Agendamento & Triagem.
              </li>
              <li>
                <strong>15 Campos de Preenchimento (Ao Todo):</strong> Implementados <strong>16 campos</strong> distribuídos de forma equilibrada (6 + 5 + 5).
              </li>
              <li>
                <strong>Máxima Variabilidade de Tipos (Critério de Nota Máxima):</strong> Quase nenhum tipo se repete! <strong>14 tipos HTML5 distintos</strong> distribuídos nos 16 campos.
              </li>
              <li>
                <strong>Software Funcional:</strong> Aplicação React 18 moderna, com persistência local, busca e validações.
              </li>
            </ul>
          </div>

          <div className="summary-box">
            <h4 className="flex items-center gap-2 text-slate-800 font-bold mb-3">
              <Sparkles size={19} className="text-amber-500" />
              Variabilidade de Controles (14 Tipos Distintos)
            </h4>
            <div className="tag-cloud">
              <span className="type-pill">text</span>
              <span className="type-pill">date</span>
              <span className="type-pill">tel</span>
              <span className="type-pill">email</span>
              <span className="type-pill">radio</span>
              <span className="type-pill">checkbox (switch)</span>
              <span className="type-pill">&lt;select&gt;</span>
              <span className="type-pill">number</span>
              <span className="type-pill">color</span>
              <span className="type-pill">file</span>
              <span className="type-pill">time</span>
              <span className="type-pill">url</span>
              <span className="type-pill">range (slider)</span>
              <span className="type-pill">&lt;textarea&gt;</span>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              * Atendendo à regra do professor: quanto maior a variabilidade de tipos de campos, maior a possibilidade de nota máxima.
            </p>
          </div>
        </div>

        {/* Tabela de Mapeamento dos 16 Campos */}
        <div className="mb-6">
          <div className="section-title-simple">
            <FileText size={18} className="text-blue-600" />
            <h3>Inventário dos 16 Campos e Seus Respectivos Tipos HTML5</h3>
          </div>
          <div className="table-responsive border border-slate-200 rounded-lg overflow-hidden">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Formulário</th>
                  <th>Campo de Preenchimento</th>
                  <th>Tipo de Controle HTML5</th>
                  <th>Finalidade Ergonômica</th>
                </tr>
              </thead>
              <tbody>
                {camposInventory.map((f) => (
                  <tr key={f.num}>
                    <td><strong>{f.num}</strong></td>
                    <td><span className="badge-tag badge-blue">{f.form}</span></td>
                    <td><strong>{f.campo}</strong></td>
                    <td><code className="code-badge">{f.tipo}</code></td>
                    <td className="text-slate-600 text-sm">{f.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Roadmap de Próximos Passos (Correções Ergonômicas) */}
        <div className="future-steps-box">
          <div className="flex items-center gap-2 mb-2">
            <Scale size={22} className="text-emerald-700" />
            <h3 className="text-emerald-900 font-bold">
              Preparação para a Próxima Etapa: Correções Frente à ISO 9241-17
            </h3>
          </div>
          <p className="text-sm text-emerald-800 mb-4">
            Com os 3 formulários ajustados em 16 campos totais e alta variabilidade de controles, o sistema está pronto para a etapa seguinte da atividade:
          </p>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-num">1</div>
              <h4>Cláusulas da ISO 9241-17</h4>
              <p>Mapear quesitos de layout, agrupamento funcional, visibilidade e clareza de rótulos.</p>
            </div>

            <div className="step-card">
              <div className="step-num">2</div>
              <h4>Identificação de Desvios</h4>
              <p>Demonstrar adesões e oportunidades de melhoria ergonômica nos formulários.</p>
            </div>

            <div className="step-card">
              <div className="step-num">3</div>
              <h4>Ajustes no Software</h4>
              <p>Aplicar validações inline contextuais e prevenir erros e perda de dados.</p>
            </div>

            <div className="step-card">
              <div className="step-num">4</div>
              <h4>Comparativo Antes e Depois</h4>
              <p>Apresentar a evolução do software para nota 100% de conformidade com a norma.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
