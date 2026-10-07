import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  Save,
  RotateCcw,
  Stethoscope,
  Upload,
  FileCheck
} from 'lucide-react';

export default function MedicoForm() {
  const { addMedico } = useClinic();

  const [formData, setFormData] = useState({
    nome: '',
    registro: '',
    especialidade: '',
    experiencia: 5,
    turno: 'Manhã',
    corAgenda: '#2563eb',
    documento: '',
    telemedicina: true
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
      turno: 'Manhã',
      corAgenda: '#2563eb',
      documento: '',
      telemedicina: true
    });
    setFileName('');
  };

  return (
    <div className="tab-pane active">
      <div className="form-container">
        {/* Cabeçalho */}
        <div className="form-header">
          <h2>Cadastro de Especialista</h2>
          <p>Credenciamento de profissionais de saúde e parametrização de agenda.</p>
        </div>

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
                  type="text"
                  id="medNome"
                  className="form-control"
                  placeholder="Ex: Dr. Roberto Alcântara"
                  value={formData.nome}
                  onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  required
                />
              </div>

              {/* Campo 2: CRM (text) */}
              <div className="form-group">
                <label htmlFor="medRegistro" className="form-label">
                  Registro Profissional (CRM/UF) <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="medRegistro"
                  className="form-control font-mono"
                  placeholder="CRM-SP 123456"
                  value={formData.registro}
                  onChange={(e) => setFormData(prev => ({ ...prev, registro: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 3: Especialidade (select) */}
              <div className="form-group">
                <label htmlFor="medEspecialidade" className="form-label">
                  Especialidade Médica <span className="required">*</span>
                </label>
                <select
                  id="medEspecialidade"
                  className="form-control"
                  value={formData.especialidade}
                  onChange={(e) => setFormData(prev => ({ ...prev, especialidade: e.target.value }))}
                  required
                >
                  <option value="">Selecione...</option>
                  {especialidades.map(esp => (
                    <option key={esp} value={esp}>{esp}</option>
                  ))}
                </select>
              </div>

              {/* Campo 4: Experiência (number) */}
              <div className="form-group">
                <label htmlFor="medExperiencia" className="form-label">
                  Tempo de Experiência (anos) <span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="medExperiencia"
                  className="form-control font-mono"
                  min="0"
                  max="60"
                  step="1"
                  value={formData.experiencia}
                  onChange={(e) => setFormData(prev => ({ ...prev, experiencia: parseInt(e.target.value) || 0 }))}
                  required
                />
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 5: Turno de Atendimento (radio) */}
              <div className="form-group">
                <label className="form-label">
                  Turno de Atendimento <span className="required">*</span>
                </label>
                <div className="radio-group-modern">
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
              </div>

              {/* Campo 6: Cor na Agenda (color) */}
              <div className="form-group">
                <label htmlFor="medCorAgenda" className="form-label">
                  Cor na Agenda
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
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 7: Comprovante / RQE (file) */}
              <div className="form-group">
                <label htmlFor="medDocumento" className="form-label">
                  Comprovante / Diploma (RQE)
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
              </div>
            </div>
          </div>

          {/* Barra de Ações */}
          <div className="form-actions-bar">
            <button type="submit" className="btn-primary">
              <Save size={17} />
              <span>Salvar Especialista</span>
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
