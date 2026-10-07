import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  Save,
  RotateCcw,
  CalendarCheck
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
    if (val === 0) return { text: 'Nível 0 • Sem dor', className: 'pain-0', emoji: '🟢' };
    if (val <= 3) return { text: `Nível ${val} • Leve`, className: 'pain-0', emoji: '🟢' };
    if (val <= 6) return { text: `Nível ${val} • Moderada`, className: 'pain-1', emoji: '🟡' };
    if (val <= 8) return { text: `Nível ${val} • Intensa`, className: 'pain-2', emoji: '🟠' };
    return { text: `Nível ${val} • Extrema`, className: 'pain-2', emoji: '🔴' };
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
          <h2>Agendamento de Consulta</h2>
          <p>Marque o atendimento e registre a triagem preliminar do paciente.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-section-card">
            <div className="form-section-title">
              <div className="section-icon-box bg-purple-subtle text-purple-600">
                <CalendarCheck size={18} />
              </div>
              <div className="section-title-text">
                <h3>Dados do Agendamento & Triagem</h3>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 1: Paciente (select) */}
              <div className="form-group">
                <label htmlFor="agdPaciente" className="form-label">
                  Paciente <span className="required">*</span>
                </label>
                <select
                  id="agdPaciente"
                  className="form-control"
                  value={formData.pacienteId}
                  onChange={(e) => setFormData(prev => ({ ...prev, pacienteId: e.target.value }))}
                  required
                >
                  <option value="">Selecione o paciente...</option>
                  {pacientes.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.nome}
                    </option>
                  ))}
                </select>
                {pacientes.length === 0 && (
                  <small className="form-help text-amber-600">
                    Nenhum paciente cadastrado.{' '}
                    <button type="button" onClick={() => setActiveTab('cad-paciente')} className="underline font-semibold">
                      Cadastrar agora
                    </button>.
                  </small>
                )}
              </div>

              {/* Campo 2: Médico (select) */}
              <div className="form-group">
                <label htmlFor="agdMedico" className="form-label">
                  Profissional de Saúde <span className="required">*</span>
                </label>
                <select
                  id="agdMedico"
                  className="form-control"
                  value={formData.medicoId}
                  onChange={(e) => setFormData(prev => ({ ...prev, medicoId: e.target.value }))}
                  required
                >
                  <option value="">Selecione o médico...</option>
                  {medicos.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.nome} — {m.especialidade}
                    </option>
                  ))}
                </select>
                {medicos.length === 0 && (
                  <small className="form-help text-amber-600">
                    Nenhum médico cadastrado.{' '}
                    <button type="button" onClick={() => setActiveTab('cad-medico')} className="underline font-semibold">
                      Cadastrar agora
                    </button>.
                  </small>
                )}
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 3: Horário (time) */}
              <div className="form-group">
                <label htmlFor="agdHora" className="form-label">
                  Horário da Consulta <span className="required">*</span>
                </label>
                <input
                  type="time"
                  id="agdHora"
                  className="form-control"
                  value={formData.hora}
                  onChange={(e) => setFormData(prev => ({ ...prev, hora: e.target.value }))}
                  required
                />
              </div>

              {/* Campo 4: Link (url) */}
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
              </div>
            </div>

            {/* Campo 5: Escala de Dor (range) */}
            <div className="form-group mt-2">
              <label htmlFor="agdNivelDor" className="form-label">
                Nível de Dor Relatado (Escala EVA 0 a 10)
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
            </div>

            {/* Campo 6: Queixa Principal (textarea) */}
            <div className="form-group mt-3">
              <label htmlFor="agdObservacoes" className="form-label">
                Queixa Principal e Sintomas <span className="required">*</span>
              </label>
              <textarea
                id="agdObservacoes"
                rows="3"
                className="form-control"
                placeholder="Descreva brevemente os sintomas relatados pelo paciente..."
                value={formData.observacoes}
                onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Barra de Ações */}
          <div className="form-actions-bar">
            <button type="submit" className="btn-primary">
              <Save size={17} />
              <span>Confirmar Agendamento</span>
            </button>
            <button type="button" onClick={handleReset} className="btn-secondary">
              <RotateCcw size={15} />
              <span>Limpar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
