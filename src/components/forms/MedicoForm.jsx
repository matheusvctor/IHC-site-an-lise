import React, { useState, useEffect, useRef } from 'react';
import { useClinic, DEFAULT_MEDICO_FORM } from '../../context/ClinicContext';
import {
  Save,
  RotateCcw,
  Stethoscope,
  Upload,
  FileCheck,
  Info,
  AlertCircle,
  Undo2
} from 'lucide-react';

export default function MedicoForm() {
  const {
    addMedico,
    medicoDraft,
    setMedicoDraft,
    medicoUndo,
    setMedicoUndo,
    isCrmUnique
  } = useClinic();

  const [formData, setFormData] = useState(medicoDraft);
  const [fileName, setFileName] = useState(medicoDraft.documento || '');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showUndoBanner, setShowUndoBanner] = useState(false);

  const nomeRef = useRef(null);
  const registroRef = useRef(null);
  const especialidadeRef = useRef(null);
  const experienciaRef = useRef(null);

  const fieldRefs = {
    nome: nomeRef,
    registro: registroRef,
    especialidade: especialidadeRef,
    experiencia: experienciaRef
  };

  const especialidades = [
    'Cardiologia',
    'Clínica Geral',
    'Dermatologia',
    'Ginecologia e Obstetrícia',
    'Neurologia',
    'Ortopedia e Traumatologia',
    'Pediatria',
    'Psiquiatria',
    'Endocrinologia',
    'Oftalmologia'
  ];

  // ISO 9241-17, Cláusula 8.1: Foco inicial automático no primeiro campo
  useEffect(() => {
    nomeRef.current?.focus();
  }, []);

  // ISO 9241-17, Cláusula 8.6.2: Preservação de dados entre abas
  useEffect(() => {
    setMedicoDraft(formData);
  }, [formData, setMedicoDraft]);

  // ISO 9241-17, Cláusula 6.4.6: Atalho Esc para cancelar/limpar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleReset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [formData]);

  const validateField = (field, value) => {
    let error = '';
    switch (field) {
      case 'nome':
        if (!value.trim()) error = 'Informe o nome do profissional.';
        else if (value.trim().length < 3) error = 'O nome deve ter no mínimo 3 caracteres.';
        break;
      case 'registro':
        if (!value.trim()) error = 'Informe o registro profissional (CRM/UF).';
        else if (value.trim().length < 5) error = 'Informe a sigla do conselho e os dígitos (ex.: CRM-SP 123456).';
        else if (!isCrmUnique(value)) error = 'Este registro CRM já está cadastrado para outro profissional.';
        break;
      case 'especialidade':
        if (!value) error = 'Selecione uma especialidade médica na lista.';
        break;
      case 'experiencia':
        const num = parseInt(value);
        if (isNaN(num) || num < 0) error = 'O tempo de experiência deve ser maior ou igual a zero.';
        else if (num > 60) error = 'Informe um tempo de experiência válido (máximo 60 anos).';
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

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFormData(prev => ({ ...prev, documento: file.name }));
    } else {
      setFileName('');
      setFormData(prev => ({ ...prev, documento: '' }));
    }
  };

  const validateAll = () => {
    const newErrors = {};
    ['nome', 'registro', 'especialidade', 'experiencia'].forEach(field => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });
    setErrors(newErrors);
    setTouched({
      nome: true,
      registro: true,
      especialidade: true,
      experiencia: true
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateAll();
    const errorFields = Object.keys(validationErrors);

    if (errorFields.length > 0) {
      // ISO 9241-17, Cláusula 6.4.2a: Cursor no primeiro erro
      const firstErrorField = errorFields[0];
      if (fieldRefs[firstErrorField]?.current) {
        fieldRefs[firstErrorField].current.focus();
      }
      return;
    }

    addMedico({
      ...formData,
      experiencia: parseInt(formData.experiencia) || 0,
      documento: fileName || 'Comprovante não anexado'
    });

    setFormData(DEFAULT_MEDICO_FORM);
    setMedicoDraft(DEFAULT_MEDICO_FORM);
    setFileName('');
    setErrors({});
    setTouched({});
    setShowUndoBanner(false);
  };

  const handleReset = () => {
    const hasData = Object.values(formData).some(val => typeof val === 'string' && val.trim() !== '');
    if (hasData) {
      setMedicoUndo({ ...formData, documento: fileName });
      setShowUndoBanner(true);
    }
    setFormData(DEFAULT_MEDICO_FORM);
    setMedicoDraft(DEFAULT_MEDICO_FORM);
    setFileName('');
    setErrors({});
    setTouched({});
    nomeRef.current?.focus();
  };

  const handleUndo = () => {
    if (medicoUndo) {
      setFormData(medicoUndo);
      setMedicoDraft(medicoUndo);
      setFileName(medicoUndo.documento || '');
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

  const errorCount = Object.keys(errors).length;

  return (
    <div className="tab-pane active">
      <div className="form-container">
        {/* Cabeçalho */}
        <div className="form-header">
          <h2>Cadastro de Especialista</h2>
          <p>Credenciamento de profissionais de saúde e parametrização de agenda.</p>
        </div>

        {/* ISO 9241-17, Cláusulas 5.1.4 e 5.3.2: Instruções Gerais e Legenda */}
        <div className="form-instruction-banner">
          <Info size={18} className="instruction-icon" />
          <div className="instruction-content">
            <div>
              Preencha os dados do profissional de saúde. Use <strong>Tab</strong> para avançar e <strong>Shift+Tab</strong> para voltar.
              Pressione <strong>Enter</strong> para salvar ou <strong>Esc</strong> para limpar.
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
              <span>Formulário limpo. Deseja recuperar os dados digitados anteriormente?</span>
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
              <div className="section-icon-box bg-emerald-subtle text-emerald-600">
                <Stethoscope size={18} />
              </div>
              <div className="section-title-text">
                <h3>Dados Profissionais & Especialidade</h3>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 1: Nome (text) */}
              <div className="form-group">
                <label htmlFor="medNome" className="form-label">
                  Nome do Profissional <span className="required">*</span>
                </label>
                <input
                  ref={nomeRef}
                  type="text"
                  id="medNome"
                  className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                  placeholder="Ex: Dr. Roberto Alcântara"
                  value={formData.nome}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, nome: e.target.value }));
                    if (touched.nome) {
                      const err = validateField('nome', e.target.value);
                      setErrors(prev => {
                        const u = { ...prev };
                        if (err) u.nome = err;
                        else delete u.nome;
                        return u;
                      });
                    }
                  }}
                  onBlur={() => handleBlur('nome')}
                  required
                />
                {errors.nome ? (
                  <span className="field-error-msg">
                    <AlertCircle size={13} /> {errors.nome}
                  </span>
                ) : (
                  <span className="field-cue-text">Nome e titulação profissional</span>
                )}
              </div>

              {/* Campo 2: CRM (text) */}
              <div className="form-group">
                <label htmlFor="medRegistro" className="form-label">
                  Registro Profissional (CRM/UF) <span className="required">*</span>
                </label>
                <input
                  ref={registroRef}
                  type="text"
                  id="medRegistro"
                  className={`form-control font-mono ${errors.registro ? 'is-invalid' : ''}`}
                  placeholder="CRM-SP 123456"
                  value={formData.registro}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, registro: e.target.value }));
                    if (touched.registro) {
                      const err = validateField('registro', e.target.value);
                      setErrors(prev => {
                        const u = { ...prev };
                        if (err) u.registro = err;
                        else delete u.registro;
                        return u;
                      });
                    }
                  }}
                  onBlur={() => handleBlur('registro')}
                  required
                />
                {errors.registro ? (
                  <span className="field-error-msg">
                    <AlertCircle size={13} /> {errors.registro}
                  </span>
                ) : (
                  <span className="field-cue-text">Formato: CRM-UF + dígitos (ex.: CRM-SP 123456)</span>
                )}
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 3: Especialidade (select) */}
              <div className="form-group">
                <label htmlFor="medEspecialidade" className="form-label">
                  Especialidade Médica <span className="required">*</span>
                </label>
                <select
                  ref={especialidadeRef}
                  id="medEspecialidade"
                  className={`form-control ${errors.especialidade ? 'is-invalid' : ''}`}
                  value={formData.especialidade}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, especialidade: e.target.value }));
                    if (touched.especialidade) {
                      const err = validateField('especialidade', e.target.value);
                      setErrors(prev => {
                        const u = { ...prev };
                        if (err) u.especialidade = err;
                        else delete u.especialidade;
                        return u;
                      });
                    }
                  }}
                  onBlur={() => handleBlur('especialidade')}
                  required
                >
                  <option value="">Selecione uma especialidade...</option>
                  {especialidades.map(esp => (
                    <option key={esp} value={esp}>{esp}</option>
                  ))}
                </select>
                {errors.especialidade ? (
                  <span className="field-error-msg">
                    <AlertCircle size={13} /> {errors.especialidade}
                  </span>
                ) : (
                  <span className="field-cue-text">Área principal de atuação clínica</span>
                )}
              </div>

              {/* Campo 4: Experiência (number) com ISO 9241-17, Cláusula 5.3.6 (Unidade explícita) */}
              <div className="form-group">
                <label htmlFor="medExperiencia" className="form-label">
                  Tempo de Experiência <span className="required">*</span>
                </label>
                <div className="input-suffix-wrapper">
                  <input
                    ref={experienciaRef}
                    type="number"
                    id="medExperiencia"
                    className={`form-control font-mono ${errors.experiencia ? 'is-invalid' : ''}`}
                    min="0"
                    max="60"
                    step="1"
                    value={formData.experiencia}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      setFormData(prev => ({ ...prev, experiencia: val }));
                      if (touched.experiencia) {
                        const err = validateField('experiencia', val);
                        setErrors(prev => {
                          const u = { ...prev };
                          if (err) u.experiencia = err;
                          else delete u.experiencia;
                          return u;
                        });
                      }
                    }}
                    onBlur={() => handleBlur('experiencia')}
                    required
                  />
                  <span className="suffix-badge">anos</span>
                </div>
                {errors.experiencia ? (
                  <span className="field-error-msg">
                    <AlertCircle size={13} /> {errors.experiencia}
                  </span>
                ) : (
                  <span className="field-cue-text">Número inteiro de 0 a 60 anos</span>
                )}
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 5: Turno de Atendimento (radio) */}
              <div className="form-group">
                <label className="form-label">
                  Turno de Atendimento <span className="required">*</span>
                </label>
                <div className="radio-group-modern" role="radiogroup" aria-label="Turno de Atendimento">
                  {['Manhã', 'Tarde', 'Noite', 'Integral'].map((t) => (
                    <label
                      key={t}
                      className={`radio-card ${formData.turno === t ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="medTurno"
                        value={t}
                        checked={formData.turno === t}
                        onChange={(e) => setFormData(prev => ({ ...prev, turno: e.target.value }))}
                      />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
                <span className="field-cue-text">Período preferencial de escala de trabalho</span>
              </div>

              {/* Campo 6: Cor na Agenda (color) */}
              <div className="form-group">
                <label htmlFor="medCorAgenda" className="form-label">
                  Cor de Identificação na Agenda
                </label>
                <div className="color-picker-box">
                  <input
                    type="color"
                    id="medCorAgenda"
                    className="form-color-circle"
                    value={formData.corAgenda}
                    onChange={(e) => setFormData(prev => ({ ...prev, corAgenda: e.target.value }))}
                  />
                  <div className="color-info-text">
                    <span className="font-mono text-sm font-semibold">{formData.corAgenda}</span>
                  </div>
                </div>
                <span className="field-cue-text">Código hexadecimal atribuído aos blocos de consulta</span>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 7: Comprovante / RQE (file) */}
              <div className="form-group">
                <label htmlFor="medDocumento" className="form-label">
                  Comprovante de Qualificação (RQE / Diploma)
                </label>
                <div className="file-dropzone">
                  <input
                    type="file"
                    id="medDocumento"
                    accept=".pdf,image/*"
                    className="file-input-hidden"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="medDocumento" className={`file-dropzone-label ${fileName ? 'has-file' : ''}`}>
                    <div className="file-icon-box">
                      {fileName ? <FileCheck size={18} className="text-emerald-600" /> : <Upload size={18} />}
                    </div>
                    <div className="file-text-box">
                      <span className="file-title">
                        {fileName ? fileName : 'Anexar documento (PDF ou imagem)'}
                      </span>
                    </div>
                  </label>
                </div>
                <span className="field-cue-text">Opcional. Formatos aceitos: PDF, JPG, PNG (máx. 10MB)</span>
              </div>

              {/* Campo 8: Telemedicina Habilitada (checkbox switch) */}
              <div className="form-group flex-center-vertical">
                <label className="form-label">
                  Atendimento por Telemedicina
                </label>
                <div className="toggle-container-modern">
                  <label className="switch">
                    <input
                      type="checkbox"
                      id="medTelemedicina"
                      checked={formData.telemedicina}
                      onChange={(e) => setFormData(prev => ({ ...prev, telemedicina: e.target.checked }))}
                    />
                    <span className="slider round"></span>
                  </label>
                  <div className="toggle-text-block">
                    <strong>{formData.telemedicina ? 'Habilitado para Teleconsulta' : 'Apenas Presencial'}</strong>
                  </div>
                </div>
                <span className="field-cue-text">Disponibiliza o profissional para consultas virtuais</span>
              </div>
            </div>
          </div>

          {/* Barra de Ações */}
          <div className="form-actions-bar">
            <button type="submit" className="btn-primary">
              <Save size={17} />
              <span>Salvar Especialista</span>
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
