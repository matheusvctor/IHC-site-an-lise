import React, { useState, useEffect, useRef } from 'react';
import { useClinic, DEFAULT_AGENDAMENTO_FORM } from '../../context/ClinicContext';
import {
  Save,
  RotateCcw,
  CalendarCheck,
  Info,
  AlertCircle,
  Undo2,
  Video,
  Building2
} from 'lucide-react';

export default function AgendamentoForm() {
  const {
    pacientes,
    medicos,
    addAgendamento,
    setActiveTab,
    agendamentoDraft,
    setAgendamentoDraft,
    agendamentoUndo,
    setAgendamentoUndo
  } = useClinic();

  const [formData, setFormData] = useState(agendamentoDraft);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showUndoBanner, setShowUndoBanner] = useState(false);

  const pacienteRef = useRef(null);
  const medicoRef = useRef(null);
  const dataRef = useRef(null);
  const horaRef = useRef(null);
  const linkRef = useRef(null);
  const queixaRef = useRef(null);

  const fieldRefs = {
    pacienteId: pacienteRef,
    medicoId: medicoRef,
    data: dataRef,
    hora: horaRef,
    linkTeleconsulta: linkRef,
    observacoes: queixaRef
  };

  // ISO 9241-17, Cláusula 8.1: Foco inicial no primeiro campo
  useEffect(() => {
    pacienteRef.current?.focus();
  }, []);

  // ISO 9241-17, Cláusula 8.6.2: Preservação de dados entre abas
  useEffect(() => {
    setAgendamentoDraft(formData);
  }, [formData, setAgendamentoDraft]);

  // ISO 9241-17, Cláusula 6.4.6: Atalho de teclado Esc para limpar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleReset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [formData]);

  const getPainBadgeInfo = (val) => {
    if (val === 0) return { text: 'Nível 0 • Sem dor relatada', className: 'pain-0', emoji: '🟢' };
    if (val <= 3) return { text: `Nível ${val} • Dor leve e tolerável`, className: 'pain-0', emoji: '🟢' };
    if (val <= 6) return { text: `Nível ${val} • Dor moderada / incômodo`, className: 'pain-1', emoji: '🟡' };
    if (val <= 8) return { text: `Nível ${val} • Dor intensa / aguda`, className: 'pain-2', emoji: '🟠' };
    return { text: `Nível ${val} • Dor extrema e incapacitante`, className: 'pain-2', emoji: '🔴' };
  };

  const validateField = (field, value, allData = formData) => {
    let error = '';
    switch (field) {
      case 'pacienteId':
        if (!value) error = 'Selecione o paciente que será atendido.';
        break;
      case 'medicoId':
        if (!value) error = 'Selecione o médico / especialista responsável.';
        break;
      case 'data':
        if (!value) error = 'Selecione a data da consulta.';
        break;
      case 'hora':
        if (!value) error = 'Informe o horário de início da consulta.';
        break;
      case 'linkTeleconsulta':
        // ISO 9241-17, Cláusulas 6.2.4 e 6.2.5: Interdependência condicional
        if (allData.formato === 'Telemedicina') {
          if (!value.trim()) error = 'Informe o link da sala virtual para consultas de telemedicina.';
          else if (!/^https?:\/\/.+/i.test(value.trim())) error = 'O link da sala virtual deve começar com https://.';
        }
        break;
      case 'observacoes':
        if (!value.trim()) error = 'Descreva a queixa principal e os sintomas do paciente.';
        else if (value.trim().length < 10) error = 'A descrição da queixa deve ter no mínimo 10 caracteres.';
        else if (value.length > 500) error = 'A queixa não pode exceder o limite de 500 caracteres.';
        break;
      default:
        break;
    }
    return error;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors(prev => {
      const updated = { ...prev };
      if (error) updated[field] = error;
      else delete updated[field];
      return updated;
    });
  };

  const handleFormatoChange = (newFormato) => {
    const updated = {
      ...formData,
      formato: newFormato,
      linkTeleconsulta: newFormato === 'Telemedicina'
        ? (formData.linkTeleconsulta || 'https://meet.synapsehealth.com.br/sala-virtual')
        : ''
    };
    setFormData(updated);

    // Valida link condicionalmente
    if (touched.linkTeleconsulta) {
      const err = validateField('linkTeleconsulta', updated.linkTeleconsulta, updated);
      setErrors(prev => {
        const u = { ...prev };
        if (err) u.linkTeleconsulta = err;
        else delete u.linkTeleconsulta;
        return u;
      });
    }
  };

  const validateAll = () => {
    const newErrors = {};
    const fieldsToValidate = ['pacienteId', 'medicoId', 'data', 'hora', 'observacoes'];
    if (formData.formato === 'Telemedicina') {
      fieldsToValidate.push('linkTeleconsulta');
    }

    fieldsToValidate.forEach(field => {
      const err = validateField(field, formData[field], formData);
      if (err) newErrors[field] = err;
    });

    setErrors(newErrors);
    setTouched({
      pacienteId: true,
      medicoId: true,
      data: true,
      hora: true,
      linkTeleconsulta: formData.formato === 'Telemedicina',
      observacoes: true
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateAll();
    const errorFields = Object.keys(validationErrors);

    if (errorFields.length > 0) {
      // ISO 9241-17, Cláusula 6.4.2a: Coloca o cursor no primeiro erro
      const firstErrorField = errorFields[0];
      if (fieldRefs[firstErrorField]?.current) {
        fieldRefs[firstErrorField].current.focus();
      }
      return;
    }

    addAgendamento(formData);
    setFormData(DEFAULT_AGENDAMENTO_FORM);
    setAgendamentoDraft(DEFAULT_AGENDAMENTO_FORM);
    setErrors({});
    setTouched({});
    setShowUndoBanner(false);
  };

  const handleReset = () => {
    const hasData = formData.pacienteId || formData.medicoId || formData.data || formData.observacoes.trim() !== '';
    if (hasData) {
      setAgendamentoUndo(formData);
      setShowUndoBanner(true);
    }
    setFormData(DEFAULT_AGENDAMENTO_FORM);
    setAgendamentoDraft(DEFAULT_AGENDAMENTO_FORM);
    setErrors({});
    setTouched({});
    pacienteRef.current?.focus();
  };

  const handleUndo = () => {
    if (agendamentoUndo) {
      setFormData(agendamentoUndo);
      setAgendamentoDraft(agendamentoUndo);
      setShowUndoBanner(false);
      setErrors({});
      setTouched({});
    }
  };

  const focusField = (field) => {
    if (fieldRefs[field]?.current) {
      fieldRefs[field].current.focus();
    }
  };

  const painInfo = getPainBadgeInfo(Number(formData.nivelDor));
  const errorCount = Object.keys(errors).length;
  const maxQueixaChars = 500;
  const queixaCharsLeft = maxQueixaChars - formData.observacoes.length;

  return (
    <div className="tab-pane active">
      <div className="form-container">
        {/* Cabeçalho */}
        <div className="form-header">
          <h2>Agendamento de Consulta</h2>
          <p>Marcação de consulta clínica, formato de atendimento e triagem preliminar.</p>
        </div>

        {/* ISO 9241-17, Cláusulas 5.1.4 e 5.3.2: Instruções Gerais e Legenda */}
        <div className="form-instruction-banner">
          <Info size={18} className="instruction-icon" />
          <div className="instruction-content">
            <div>
              Selecione o paciente e o especialista desejados. Use <strong>Tab</strong> para avançar e <strong>Shift+Tab</strong> para voltar.
              Pressione <strong>Enter</strong> para confirmar ou <strong>Esc</strong> para limpar.
            </div>
            <div className="instruction-legend">
              <span><strong className="text-red-500">*</strong> Campos obrigatórios</span>
              <span>Demais campos são opcionais</span>
              <span>Dados preservados ao trocar de aba</span>
            </div>
          </div>
        </div>

        {/* ISO 9241-17, Cláusulas 6.4.1 e 6.4.6: Opção de Desfazer */}
        {showUndoBanner && (
          <div className="undo-banner">
            <div className="undo-banner-left">
              <RotateCcw size={16} />
              <span>Agendamento limpo. Deseja recuperar os dados digitados anteriormente?</span>
            </div>
            <button type="button" onClick={handleUndo} className="undo-banner-btn">
              <Undo2 size={14} />
              <span>Desfazer / Restaurar</span>
            </button>
          </div>
        )}

        {/* ISO 9241-17, Cláusula 6.4.2a: Painel-Resumo de Pendências */}
        {errorCount > 0 && (
          <div className="error-summary-banner" role="alert">
            <div className="error-summary-header">
              <AlertCircle size={18} />
              <span>Revise os campos com pendências antes de salvar ({errorCount}):</span>
            </div>
            <ul className="error-summary-list">
              {Object.entries(errors).map(([field, msg]) => (
                <li key={field}>
                  <button
                    type="button"
                    onClick={() => focusField(field)}
                    className="error-summary-link"
                  >
                    • {msg}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

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
                  ref={pacienteRef}
                  id="agdPaciente"
                  className={`form-control ${errors.pacienteId ? 'is-invalid' : ''}`}
                  value={formData.pacienteId}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, pacienteId: e.target.value }));
                    if (touched.pacienteId) {
                      const err = validateField('pacienteId', e.target.value);
                      setErrors(prev => {
                        const u = { ...prev };
                        if (err) u.pacienteId = err;
                        else delete u.pacienteId;
                        return u;
                      });
                    }
                  }}
                  onBlur={() => handleBlur('pacienteId')}
                  required
                >
                  <option value="">Selecione o paciente cadastrado...</option>
                  {pacientes.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.nome} (CPF: {p.cpf || 'Não informado'})
                    </option>
                  ))}
                </select>
                {errors.pacienteId ? (
                  <span className="field-error-msg">
                    <AlertCircle size={13} /> {errors.pacienteId}
                  </span>
                ) : (
                  <span className="field-cue-text">Paciente ativo na base clínica</span>
                )}
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
                  ref={medicoRef}
                  id="agdMedico"
                  className={`form-control ${errors.medicoId ? 'is-invalid' : ''}`}
                  value={formData.medicoId}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, medicoId: e.target.value }));
                    if (touched.medicoId) {
                      const err = validateField('medicoId', e.target.value);
                      setErrors(prev => {
                        const u = { ...prev };
                        if (err) u.medicoId = err;
                        else delete u.medicoId;
                        return u;
                      });
                    }
                  }}
                  onBlur={() => handleBlur('medicoId')}
                  required
                >
                  <option value="">Selecione o especialista...</option>
                  {medicos.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.nome} — {m.especialidade} ({m.registro})
                    </option>
                  ))}
                </select>
                {errors.medicoId ? (
                  <span className="field-error-msg">
                    <AlertCircle size={13} /> {errors.medicoId}
                  </span>
                ) : (
                  <span className="field-cue-text">Especialista responsável pelo atendimento</span>
                )}
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
              {/* Campo 3: Data da Consulta (date) */}
              <div className="form-group">
                <label htmlFor="agdData" className="form-label">
                  Data da Consulta <span className="required">*</span>
                </label>
                <input
                  ref={dataRef}
                  type="date"
                  id="agdData"
                  className={`form-control ${errors.data ? 'is-invalid' : ''}`}
                  value={formData.data}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, data: e.target.value }));
                    if (touched.data) {
                      const err = validateField('data', e.target.value);
                      setErrors(prev => {
                        const u = { ...prev };
                        if (err) u.data = err;
                        else delete u.data;
                        return u;
                      });
                    }
                  }}
                  onBlur={() => handleBlur('data')}
                  required
                />
                {errors.data ? (
                  <span className="field-error-msg">
                    <AlertCircle size={13} /> {errors.data}
                  </span>
                ) : (
                  <span className="field-cue-text">Formato: DD/MM/AAAA pelo seletor ou teclado</span>
                )}
              </div>

              {/* Campo 4: Horário (time) */}
              <div className="form-group">
                <label htmlFor="agdHora" className="form-label">
                  Horário da Consulta <span className="required">*</span>
                </label>
                <input
                  ref={horaRef}
                  type="time"
                  id="agdHora"
                  className={`form-control font-mono ${errors.hora ? 'is-invalid' : ''}`}
                  value={formData.hora}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, hora: e.target.value }));
                    if (touched.hora) {
                      const err = validateField('hora', e.target.value);
                      setErrors(prev => {
                        const u = { ...prev };
                        if (err) u.hora = err;
                        else delete u.hora;
                        return u;
                      });
                    }
                  }}
                  onBlur={() => handleBlur('hora')}
                  required
                />
                {errors.hora ? (
                  <span className="field-error-msg">
                    <AlertCircle size={13} /> {errors.hora}
                  </span>
                ) : (
                  <span className="field-cue-text">Formato 24h (HH:mm)</span>
                )}
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 5: Formato do Atendimento (radio) */}
              <div className="form-group">
                <label className="form-label">
                  Formato do Atendimento <span className="required">*</span>
                </label>
                <div className="radio-group-modern" role="radiogroup" aria-label="Formato do Atendimento">
                  {[
                    { id: 'Presencial', label: 'Presencial', icon: Building2 },
                    { id: 'Telemedicina', label: 'Telemedicina', icon: Video }
                  ].map((fmt) => (
                    <label
                      key={fmt.id}
                      className={`radio-card ${formData.formato === fmt.id ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="agdFormato"
                        value={fmt.id}
                        checked={formData.formato === fmt.id}
                        onChange={() => handleFormatoChange(fmt.id)}
                      />
                      <span>{fmt.label}</span>
                    </label>
                  ))}
                </div>
                <span className="field-cue-text">Define se a consulta ocorre na clínica física ou virtualmente</span>
              </div>

              {/* Campo 6: Link da Sala Virtual (url) com ISO 9241-17, Cláusulas 6.2.4 e 6.4.4 (Desabilitado quando Presencial) */}
              <div className="form-group">
                <label htmlFor="agdLink" className="form-label">
                  Link da Sala Virtual {formData.formato === 'Telemedicina' ? <span className="required">*</span> : '(Opcional)'}
                </label>
                <input
                  ref={linkRef}
                  type="url"
                  id="agdLink"
                  disabled={formData.formato !== 'Telemedicina'}
                  className={`form-control font-mono ${errors.linkTeleconsulta ? 'is-invalid' : ''}`}
                  placeholder={formData.formato === 'Telemedicina' ? 'https://meet.synapsehealth.com.br/sala' : 'Não aplicável para consulta presencial'}
                  value={formData.linkTeleconsulta}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, linkTeleconsulta: e.target.value }));
                    if (touched.linkTeleconsulta) {
                      const err = validateField('linkTeleconsulta', e.target.value);
                      setErrors(prev => {
                        const u = { ...prev };
                        if (err) u.linkTeleconsulta = err;
                        else delete u.linkTeleconsulta;
                        return u;
                      });
                    }
                  }}
                  onBlur={() => handleBlur('linkTeleconsulta')}
                />
                {errors.linkTeleconsulta ? (
                  <span className="field-error-msg">
                    <AlertCircle size={13} /> {errors.linkTeleconsulta}
                  </span>
                ) : (
                  <span className="field-cue-text">
                    {formData.formato === 'Telemedicina'
                      ? 'Obrigatório para telemedicina (protocolo https://)'
                      : 'Desabilitado automaticamente: atendimento presencial no consultório'}
                  </span>
                )}
              </div>
            </div>

            {/* Campo 7: Escala de Dor (range) */}
            <div className="form-group mt-2">
              <label htmlFor="agdNivelDor" className="form-label">
                Nível de Dor Relatado (Escala Analógica EVA 0 a 10)
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
              <span className="field-cue-text">Avaliação subjetiva da intensidade dolorosa na triagem inicial</span>
            </div>

            {/* Campo 8: Queixa Principal (textarea) com ISO 9241-17, Cláusulas 6.2.3 e 6.2.6 (Área delimitada e contador) */}
            <div className="form-group mt-3">
              <label htmlFor="agdObservacoes" className="form-label">
                Queixa Principal e Sintomas <span className="required">*</span>
              </label>
              <textarea
                ref={queixaRef}
                id="agdObservacoes"
                rows="3"
                maxLength={maxQueixaChars}
                className={`form-control ${errors.observacoes ? 'is-invalid' : ''}`}
                placeholder="Descreva detalhadamente os sintomas clínicos relatados pelo paciente..."
                value={formData.observacoes}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, observacoes: e.target.value }));
                  if (touched.observacoes) {
                    const err = validateField('observacoes', e.target.value);
                    setErrors(prev => {
                      const u = { ...prev };
                      if (err) u.observacoes = err;
                      else delete u.observacoes;
                      return u;
                    });
                  }
                }}
                onBlur={() => handleBlur('observacoes')}
                required
              />
              <div className="textarea-footer">
                {errors.observacoes ? (
                  <span className="field-error-msg">
                    <AlertCircle size={13} /> {errors.observacoes}
                  </span>
                ) : (
                  <span className="field-cue-text">Mínimo de 10 caracteres para descrição clínica adequada</span>
                )}
                <span className={`char-counter ${queixaCharsLeft < 50 ? 'limit-near' : ''}`}>
                  {formData.observacoes.length} / {maxQueixaChars}
                </span>
              </div>
            </div>
          </div>

          {/* Barra de Ações */}
          <div className="form-actions-bar">
            <button type="submit" className="btn-primary">
              <Save size={17} />
              <span>Confirmar Agendamento</span>
            </button>
            <button type="button" onClick={handleReset} className="btn-secondary" title="Pressione Esc para limpar">
              <RotateCcw size={15} />
              <span>Limpar Formulário (Esc)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
