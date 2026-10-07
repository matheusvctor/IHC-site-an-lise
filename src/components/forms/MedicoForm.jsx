import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  Save,
  RotateCcw,
  Stethoscope,
  Award,
  Palette,
  Upload,
  FileCheck,
  CheckCircle2
} from 'lucide-react';

export default function MedicoForm() {
  const { addMedico } = useClinic();

  const [formData, setFormData] = useState({
    nome: '',
    registro: '',
    especialidade: '',
    experiencia: 5,
    corAgenda: '#2563eb',
    documento: ''
  });

  const [fileName, setFileName] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nome.trim() || !formData.registro.trim() || !formData.especialidade) {
      alert('Por favor, preencha todos os campos obrigatórios marcados com (*).');
      return;
    }

    addMedico({
      ...formData,
      experiencia: parseInt(formData.experiencia) || 0,
      documento: fileName || 'Comprovante não anexado'
    });

    handleReset();
  };

  const handleReset = () => {
    setFormData({
      nome: '',
      registro: '',
      especialidade: '',
      experiencia: 5,
      corAgenda: '#2563eb',
      documento: ''
    });
    setFileName('');
  };

  return (
    <div className="tab-pane active">
      <div className="form-container">
        {/* Cabeçalho */}
        <div className="form-header">
          <div className="form-header-badge">
            <span className="badge-dot"></span>
            <span>Cadastro 02 de 03 • 5 Campos (Variabilidade Máxima)</span>
          </div>
          <h2>Cadastro de Profissional de Saúde</h2>
          <p>
            Credenciamento clínico demonstrando variabilidade de controles:
            campos dos tipos <code>text</code>, <code>select</code>, <code>number</code>, <code>color</code> e <code>file</code>.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-section-card">
            <div className="form-section-title">
              <div className="section-icon-box bg-emerald-subtle text-emerald-600">
                <Stethoscope size={20} />
              </div>
              <div className="section-title-text">
                <h3>Credenciamento, Especialidade & Visual da Agenda</h3>
                <span>Registro no conselho profissional, área de atuação e parâmetros visuais</span>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 1: Nome Completo (type="text") */}
              <div className="form-group">
                <label htmlFor="medNome" className="form-label">
                  Nome do Profissional <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="medNome"
                  className="form-control"
                  placeholder="Ex: Dr. Roberto Alcântara"
                  value={formData.nome}
                  onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  required
                />
                <small className="form-help">Nome de apresentação na escala e nos laudos.</small>
              </div>

              {/* Campo 2: CRM / Registro (type="text" com máscara/padrão) */}
              <div className="form-group">
                <label htmlFor="medRegistro" className="form-label">
                  Registro Profissional (CRM/UF) <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="medRegistro"
                  className="form-control font-mono"
                  placeholder="Ex: CRM-SP 148920"
                  value={formData.registro}
                  onChange={(e) => setFormData(prev => ({ ...prev, registro: e.target.value }))}
                  required
                />
                <small className="form-help">Inscrição ativa no conselho regional correspondente.</small>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 3: Especialidade Médica (tag <select>) */}
              <div className="form-group">
                <label htmlFor="medEspecialidade" className="form-label">
                  Especialidade Médica Principal <span className="required">*</span>
                </label>
                <select
                  id="medEspecialidade"
                  className="form-control"
                  value={formData.especialidade}
                  onChange={(e) => setFormData(prev => ({ ...prev, especialidade: e.target.value }))}
                  required
                >
                  <option value="">Selecione a especialidade médica...</option>
                  {especialidades.map(esp => (
                    <option key={esp} value={esp}>{esp}</option>
                  ))}
                </select>
                <small className="form-help">Menu suspenso de seleção de área de atuação clínica.</small>
              </div>

              {/* Campo 4: Anos de Experiência (type="number") */}
              <div className="form-group">
                <label htmlFor="medExperiencia" className="form-label">
                  Tempo de Experiência (em anos) <span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="medExperiencia"
                  className="form-control font-mono"
                  min="0"
                  max="60"
                  step="1"
                  value={formData.experiencia}
                  onChange={(e) => setFormData(prev => ({ ...prev, experiencia: e.target.value }))}
                  required
                />
                <small className="form-help">Controle numérico com incremento e limites (min=0 e max=60).</small>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 5: Cor de Identificação na Agenda (type="color") */}
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
                    <span className="text-xs text-slate-500">Seletor de cor nativo HTML5</span>
                  </div>
                </div>
                <small className="form-help">Paleta visual para diferenciação dos horários no calendário.</small>
              </div>

              {/* Campo 6: Comprovante de Registro / Diploma (type="file") */}
              <div className="form-group">
                <label htmlFor="medDocumento" className="form-label">
                  Comprovante de Registro / Diploma (RQE)
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
                      {fileName ? <FileCheck size={20} className="text-emerald-600" /> : <Upload size={20} />}
                    </div>
                    <div className="file-text-box">
                      <span className="file-title">
                        {fileName ? fileName : 'Clique para anexar arquivo'}
                      </span>
                      <span className="file-subtitle">Controle de upload (PDF, JPG, PNG até 10MB)</span>
                    </div>
                    {fileName && (
                      <span className="file-selected-badge">Anexado</span>
                    )}
                  </label>
                </div>
                <small className="form-help">Envio de arquivo comprobatório de titulação.</small>
              </div>
            </div>
          </div>

          {/* Barra de Ações */}
          <div className="form-actions-bar">
            <button type="submit" className="btn-primary">
              <Save size={18} />
              <span>Salvar Especialista</span>
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
