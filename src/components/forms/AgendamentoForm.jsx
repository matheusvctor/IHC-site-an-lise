import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  Save,
  RotateCcw,
  CalendarCheck,
  UserCheck,
  Clock,
  Link,
  Activity,
  FileText,
  Video
} from 'lucide-react';

export default function AgendamentoForm() {
  const { pacientes, medicos, addAgendamento, setActiveTab } = useClinic();

  const [formData, setFormData] = useState({
    pacienteId: '',
    medicoId: '',
    hora: '09:30',
    linkTeleconsulta: 'https://meet.clinicamedflow.com.br/sala-virtual',
    nivelDor: 0,
    observacoes: ''
  });

  const getPainBadgeInfo = (val) => {
    if (val === 0) return { text: 'Nível 0 • Ausência de dor', className: 'pain-0', emoji: '🟢' };
    if (val <= 3) return { text: `Nível ${val} • Dor leve e tolerável`, className: 'pain-0', emoji: '🟢' };
    if (val <= 6) return { text: `Nível ${val} • Dor moderada (interfere na rotina)`, className: 'pain-1', emoji: '🟡' };
    if (val <= 8) return { text: `Nível ${val} • Dor intensa e incapacitante`, className: 'pain-2', emoji: '🟠' };
    return { text: `Nível ${val} • Dor extrema / Emergencial`, className: 'pain-2', emoji: '🔴' };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.pacienteId || !formData.medicoId || !formData.hora || !formData.observacoes.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios marcados com (*).');
      return;
    }

    addAgendamento(formData);
    handleReset();
  };

  const handleReset = () => {
    setFormData({
      pacienteId: '',
      medicoId: '',
      hora: '09:30',
      linkTeleconsulta: 'https://meet.clinicamedflow.com.br/sala-virtual',
      nivelDor: 0,
      observacoes: ''
    });
  };

  const painInfo = getPainBadgeInfo(Number(formData.nivelDor));

  return (
    <div className="tab-pane active">
      <div className="form-container">
        {/* Cabeçalho */}
        <div className="form-header">
          <div className="form-header-badge">
            <span className="badge-dot"></span>
            <span>Cadastro 03 de 03 • 5 Campos (Variabilidade Máxima)</span>
          </div>
          <h2>Agendamento de Consulta & Triagem</h2>
          <p>
            Marcação de atendimento demonstrando variabilidade de controles:
            campos dos tipos <code>select</code>, <code>time</code>, <code>url</code>, <code>range</code> e <code>textarea</code>.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-section-card">
            <div className="form-section-title">
              <div className="section-icon-box bg-purple-subtle text-purple-600">
                <CalendarCheck size={20} />
              </div>
              <div className="section-title-text">
                <h3>Vínculo de Atendimento, Horário e Triagem Sintomática</h3>
                <span>Selecione os participantes, defina o horário, link virtual, dor relatada e queixa</span>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 1: Paciente e Médico (tag <select>) */}
              <div className="form-group">
                <label htmlFor="agdPaciente" className="form-label">
                  Paciente Cadastrado <span className="required">*</span>
                </label>
                <select
                  id="agdPaciente"
                  className="form-control"
                  value={formData.pacienteId}
                  onChange={(e) => setFormData(prev => ({ ...prev, pacienteId: e.target.value }))}
                  required
                >
                  <option value="">Selecione o paciente cadastrado...</option>
                  {pacientes.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.nome} (Tel: {p.telefone})
                    </option>
                  ))}
                </select>
                {pacientes.length === 0 ? (
                  <small className="form-help text-amber-600">
                    Nenhum paciente cadastrado.{' '}
                    <button type="button" onClick={() => setActiveTab('cad-paciente')} className="underline font-semibold">
                      Cadastrar paciente agora
                    </button>.
                  </small>
                ) : (
                  <small className="form-help">Seleção dinâmica via menu suspenso.</small>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="agdMedico" className="form-label">
                  Profissional de Saúde Responsável <span className="required">*</span>
                </label>
                <select
                  id="agdMedico"
                  className="form-control"
                  value={formData.medicoId}
                  onChange={(e) => setFormData(prev => ({ ...prev, medicoId: e.target.value }))}
                  required
                >
                  <option value="">Selecione o profissional...</option>
                  {medicos.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.nome} — {m.especialidade}
                    </option>
                  ))}
                </select>
                {medicos.length === 0 ? (
                  <small className="form-help text-amber-600">
                    Nenhum médico cadastrado.{' '}
                    <button type="button" onClick={() => setActiveTab('cad-medico')} className="underline font-semibold">
                      Cadastrar profissional agora
                    </button>.
                  </small>
                ) : (
                  <small className="form-help">Especialista que conduzirá a consulta.</small>
                )}
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 2: Horário da Consulta (type="time") */}
              <div className="form-group">
                <label htmlFor="agdHora" className="form-label">
                  Horário de Início do Atendimento <span className="required">*</span>
                </label>
                <input
                  type="time"
                  id="agdHora"
                  className="form-control"
                  value={formData.hora}
                  onChange={(e) => setFormData(prev => ({ ...prev, hora: e.target.value }))}
                  required
                />
                <small className="form-help">Controle de horário nativo HTML5 (HH:mm).</small>
              </div>

              {/* Campo 3: Link da Sala Virtual (type="url") */}
              <div className="form-group">
                <label htmlFor="agdLink" className="form-label">
                  Link da Sala Virtual (Telemedicina)
                </label>
                <input
                  type="url"
                  id="agdLink"
                  className="form-control font-mono"
                  placeholder="https://meet.clinicamedflow.com.br/sala"
                  value={formData.linkTeleconsulta}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkTeleconsulta: e.target.value }))}
                />
                <small className="form-help">Controle de validação de URL com protocolo web (https://).</small>
              </div>
            </div>

            {/* Campo 4: Escala de Dor EVA (type="range") */}
            <div className="form-group mt-2">
              <label htmlFor="agdNivelDor" className="form-label">
                Escala Analógica de Dor Relatada (EVA 0 a 10)
              </label>
              <div className="pain-scale-box">
                <input
                  type="range"
                  id="agdNivelDor"
                  min="0"
                  max="10"
                  className="form-range pain-range"
                  value={formData.nivelDor}
                  onChange={(e) => setFormData(prev => ({ ...prev, nivelDor: parseInt(e.target.value) || 0 }))}
                />
                <div className="pain-indicator-pill">
                  <span className={`pain-badge ${painInfo.className}`}>
                    <span className="pain-emoji">{painInfo.emoji}</span>
                    <span>{painInfo.text}</span>
                  </span>
                </div>
              </div>
              <small className="form-help">Controle deslizante (range slider) com feedback visual reativo de severidade.</small>
            </div>

            {/* Campo 5: Queixa Principal e Sintomas (tag <textarea>) */}
            <div className="form-group mt-3">
              <label htmlFor="agdObservacoes" className="form-label">
                Queixa Principal e Sintomas do Paciente <span className="required">*</span>
              </label>
              <textarea
                id="agdObservacoes"
                rows="3"
                className="form-control"
                placeholder="Descreva detalhadamente as queixas relatadas pelo paciente, tempo de evolução e sintomas..."
                value={formData.observacoes}
                onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                required
              />
              <small className="form-help">Controle de texto em múltiplas linhas (textarea) para anotações clínicas.</small>
            </div>
          </div>

          {/* Barra de Ações */}
          <div className="form-actions-bar">
            <button type="submit" className="btn-primary">
              <Save size={18} />
              <span>Confirmar Agendamento</span>
            </button>
            <button type="button" onClick={handleReset} className="btn-secondary">
              <RotateCcw size={16} />
              <span>Limpar Formulário</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
