import React, { useState, useEffect, useRef } from 'react';
import { useClinic, DEFAULT_PACIENTE_FORM } from '../../context/ClinicContext';
import { formatCPF, formatTelefone } from '../../utils/formatters';
import {
  Save,
  RotateCcw,
  User,
  Info,
  AlertCircle,
  Undo2
} from 'lucide-react';

export default function PacienteForm() {
  const {
    addPaciente,
    pacienteDraft,
    setPacienteDraft,
    pacienteUndo,
    setPacienteUndo,
    isCpfUnique
  } = useClinic();

  const [formData, setFormData] = useState(pacienteDraft);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showUndoBanner, setShowUndoBanner] = useState(false);

  const nomeRef = useRef(null);
  const cpfRef = useRef(null);
  const dataNascRef = useRef(null);
  const telefoneRef = useRef(null);
  const emailRef = useRef(null);

  const fieldRefs = {
    nome: nomeRef,
    cpf: cpfRef,
    dataNasc: dataNascRef,
    telefone: telefoneRef,
    email: emailRef
  };

  // ISO 9241-17, Cláusula 8.1: Posicionamento automático do foco inicial no primeiro campo
  useEffect(() => {
    nomeRef.current?.focus();
  }, []);

  // ISO 9241-17, Cláusula 8.6.2: Preservação de dados entre abas
  useEffect(() => {
    setPacienteDraft(formData);
  }, [formData, setPacienteDraft]);

  // ISO 9241-17, Cláusula 6.4.6: Atalhos de teclado (Esc para cancelar/limpar)
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
        if (!value.trim()) error = 'Informe o nome completo do paciente.';
        else if (value.trim().length < 3) error = 'O nome deve ter no mínimo 3 caracteres.';
        break;
      case 'cpf':
        if (!value.trim()) error = 'Informe o CPF do paciente.';
        else if (value.replace(/\D/g, '').length !== 11) error = 'O CPF deve conter exatamente 11 dígitos.';
        else if (!isCpfUnique(value)) error = 'Este CPF já está cadastrado no sistema.';
        break;
      case 'dataNasc':
        if (!value) error = 'Selecione a data de nascimento.';
        else {
          const d = new Date(value);
          const hoje = new Date();
          if (d > hoje) error = 'A data de nascimento não pode ser futura.';
        }
        break;
      case 'telefone':
        if (!value.trim()) error = 'Informe o telefone / WhatsApp para contato.';
        else if (value.replace(/\D/g, '').length < 10) error = 'Informe DDD e número válidos (mínimo 10 dígitos).';
        break;
      case 'email':
        if (!value.trim()) error = 'Informe o endereço de e-mail.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) error = 'Informe um formato de e-mail válido (ex.: paciente@dominio.com).';
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

  const handleCpfChange = (e) => {
    const formatted = formatCPF(e.target.value);
    setFormData(prev => ({ ...prev, cpf: formatted }));
    if (touched.cpf) {
      const err = validateField('cpf', formatted);
      setErrors(prev => {
        const u = { ...prev };
        if (err) u.cpf = err;
        else delete u.cpf;
        return u;
      });
    }
  };

  const handleTelChange = (e) => {
    const formatted = formatTelefone(e.target.value);
    setFormData(prev => ({ ...prev, telefone: formatted }));
    if (touched.telefone) {
      const err = validateField('telefone', formatted);
      setErrors(prev => {
        const u = { ...prev };
        if (err) u.telefone = err;
        else delete u.telefone;
        return u;
      });
    }
  };

  const validateAll = () => {
    const newErrors = {};
    ['nome', 'cpf', 'dataNasc', 'telefone', 'email'].forEach(field => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });
    setErrors(newErrors);
    setTouched({
      nome: true,
      cpf: true,
      dataNasc: true,
      telefone: true,
      email: true
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateAll();
    const errorFields = Object.keys(validationErrors);

    if (errorFields.length > 0) {
      // ISO 9241-17, Cláusula 6.4.2a: Coloca o cursor no primeiro campo com erro
      const firstErrorField = errorFields[0];
      if (fieldRefs[firstErrorField]?.current) {
        fieldRefs[firstErrorField].current.focus();
      }
      return;
    }

    addPaciente(formData);
    setFormData(DEFAULT_PACIENTE_FORM);
    setPacienteDraft(DEFAULT_PACIENTE_FORM);
    setErrors({});
    setTouched({});
    setShowUndoBanner(false);
  };

  const handleReset = () => {
    const hasData = Object.values(formData).some(val => typeof val === 'string' && val.trim() !== '');
    if (hasData) {
      setPacienteUndo(formData);
      setShowUndoBanner(true);
    }
    setFormData(DEFAULT_PACIENTE_FORM);
    setPacienteDraft(DEFAULT_PACIENTE_FORM);
    setErrors({});
    setTouched({});
    nomeRef.current?.focus();
  };

  const handleUndo = () => {
    if (pacienteUndo) {
      setFormData(pacienteUndo);
      setPacienteDraft(pacienteUndo);
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

  const tiposSanguineos = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const errorCount = Object.keys(errors).length;

  return (
    <div className="tab-pane active">
      <div className="form-container">
        {/* Cabeçalho */}
        <div className="form-header">
          <h2>Cadastro de Paciente</h2>
          <p>Abertura de prontuário e identificação clínica do paciente.</p>
        </div>

        {/* ISO 9241-17, Cláusulas 5.1.4 e 5.3.2: Instruções Gerais e Legenda de Obrigatoriedade */}
        <div className="form-instruction-banner">
          <Info size={18} className="instruction-icon" />
          <div className="instruction-content">
            <div>
              Preencha os dados do paciente. Use <strong>Tab</strong> para avançar e <strong>Shift+Tab</strong> para voltar.
              Pressione <strong>Enter</strong> para salvar ou <strong>Esc</strong> para limpar.
            </div>
            <div className="instruction-legend">
              <span><strong className="text-red-500">*</strong> Campos obrigatórios</span>
              <span>Demais campos são opcionais</span>
              <span>Dados preservados ao trocar de aba</span>
            </div>
          </div>
        </div>

        {/* ISO 9241-17, Cláusulas 6.4.1 e 6.4.6: Controle do Usuário e Opção de Desfazer */}
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
              <div className="section-icon-box bg-blue-subtle text-blue-600">
                <User size={18} />
              </div>
              <div className="section-title-text">
                <h3>Identificação e Contato</h3>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 1: Nome Completo (text) */}
              <div className="form-group">
                <label htmlFor="pacNome" className="form-label">
                  Nome Completo <span className="required">*</span>
                </label>
                <input
                  ref={nomeRef}
                  type="text"
                  id="pacNome"
                  className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                  placeholder="Nome civil do paciente"
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
                  <span className="field-cue-text">Ex.: Maria da Silva Bastos</span>
                )}
              </div>

              {/* Campo 2: CPF (text com máscara) */}
              <div className="form-group">
                <label htmlFor="pacCpf" className="form-label">
                  CPF <span className="required">*</span>
                </label>
                <input
                  ref={cpfRef}
                  type="text"
                  id="pacCpf"
                  className={`form-control font-mono ${errors.cpf ? 'is-invalid' : ''}`}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  value={formData.cpf}
                  onChange={handleCpfChange}
                  onBlur={() => handleBlur('cpf')}
                  required
                />
                {errors.cpf ? (
                  <span className="field-error-msg">
                    <AlertCircle size={13} /> {errors.cpf}
                  </span>
                ) : (
                  <span className="field-cue-text">Formato: 000.000.000-00 (11 dígitos numéricos)</span>
                )}
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 3: Data de Nascimento (date) */}
              <div className="form-group">
                <label htmlFor="pacDataNasc" className="form-label">
                  Data de Nascimento <span className="required">*</span>
                </label>
                <input
                  ref={dataNascRef}
                  type="date"
                  id="pacDataNasc"
                  className={`form-control ${errors.dataNasc ? 'is-invalid' : ''}`}
                  value={formData.dataNasc}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, dataNasc: e.target.value }));
                    if (touched.dataNasc) {
                      const err = validateField('dataNasc', e.target.value);
                      setErrors(prev => {
                        const u = { ...prev };
                        if (err) u.dataNasc = err;
                        else delete u.dataNasc;
                        return u;
                      });
                    }
                  }}
                  onBlur={() => handleBlur('dataNasc')}
                  required
                />
                {errors.dataNasc ? (
                  <span className="field-error-msg">
                    <AlertCircle size={13} /> {errors.dataNasc}
                  </span>
                ) : (
                  <span className="field-cue-text">Formato: DD/MM/AAAA pelo seletor ou teclado</span>
                )}
              </div>

              {/* Campo 4: Telefone (tel) */}
              <div className="form-group">
                <label htmlFor="pacTelefone" className="form-label">
                  Telefone / WhatsApp <span className="required">*</span>
                </label>
                <input
                  ref={telefoneRef}
                  type="tel"
                  id="pacTelefone"
                  className={`form-control font-mono ${errors.telefone ? 'is-invalid' : ''}`}
                  placeholder="(11) 90000-0000"
                  maxLength={15}
                  value={formData.telefone}
                  onChange={handleTelChange}
                  onBlur={() => handleBlur('telefone')}
                  required
                />
                {errors.telefone ? (
                  <span className="field-error-msg">
                    <AlertCircle size={13} /> {errors.telefone}
                  </span>
                ) : (
                  <span className="field-cue-text">Formato: (DDD) 90000-0000 com dígitos</span>
                )}
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 5: E-mail (email) */}
              <div className="form-group">
                <label htmlFor="pacEmail" className="form-label">
                  E-mail <span className="required">*</span>
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  id="pacEmail"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="paciente@email.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, email: e.target.value }));
                    if (touched.email) {
                      const err = validateField('email', e.target.value);
                      setErrors(prev => {
                        const u = { ...prev };
                        if (err) u.email = err;
                        else delete u.email;
                        return u;
                      });
                    }
                  }}
                  onBlur={() => handleBlur('email')}
                  required
                />
                {errors.email ? (
                  <span className="field-error-msg">
                    <AlertCircle size={13} /> {errors.email}
                  </span>
                ) : (
                  <span className="field-cue-text">Ex.: paciente@dominio.com</span>
                )}
              </div>

              {/* Campo 6: Tipo Sanguíneo (select) */}
              <div className="form-group">
                <label htmlFor="pacTipoSanguineo" className="form-label">
                  Tipo Sanguíneo (Opcional)
                </label>
                <select
                  id="pacTipoSanguineo"
                  className="form-control font-semibold"
                  value={formData.tipoSanguineo}
                  onChange={(e) => setFormData(prev => ({ ...prev, tipoSanguineo: e.target.value }))}
                >
                  {tiposSanguineos.map(tipo => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
                <span className="field-cue-text">Selecione o grupo ABO e fator Rh</span>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 7: Sexo Biológico (radio) */}
              <div className="form-group">
                <label className="form-label">
                  Sexo Biológico <span className="required">*</span>
                </label>
                <div className="radio-group-modern" role="radiogroup" aria-label="Sexo Biológico">
                  {['Feminino', 'Masculino', 'Outro'].map((sexoOpcao) => (
                    <label
                      key={sexoOpcao}
                      className={`radio-card ${formData.sexo === sexoOpcao ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="pacSexo"
                        value={sexoOpcao}
                        checked={formData.sexo === sexoOpcao}
                        onChange={(e) => setFormData(prev => ({ ...prev, sexo: e.target.value }))}
                      />
                      <span>{sexoOpcao}</span>
                    </label>
                  ))}
                </div>
                <span className="field-cue-text">Opção exclusiva para fins cadastrais de prontuário</span>
              </div>

              {/* Campo 8: Convênio (checkbox switch) */}
              <div className="form-group flex-center-vertical">
                <label className="form-label">
                  Modalidade de Atendimento
                </label>
                <div className="toggle-container-modern">
                  <label className="switch">
                    <input
                      type="checkbox"
                      id="pacConvenio"
                      checked={formData.temConvenio}
                      onChange={(e) => setFormData(prev => ({ ...prev, temConvenio: e.target.checked }))}
                    />
                    <span className="slider round"></span>
                  </label>
                  <div className="toggle-text-block">
                    <strong>{formData.temConvenio ? 'Convênio de Saúde Ativo' : 'Atendimento Particular'}</strong>
                  </div>
                </div>
                <span className="field-cue-text">Alterne se o atendimento utilizará plano credenciado</span>
              </div>
            </div>
          </div>

          {/* Barra de Ações */}
          <div className="form-actions-bar">
            <button type="submit" className="btn-primary">
              <Save size={17} />
              <span>Salvar Paciente</span>
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
