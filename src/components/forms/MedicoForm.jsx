import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { formatTelefone } from '../../utils/formatters';
import {
  Save,
  RotateCcw,
  Stethoscope,
  Award,
  Calendar,
  Clock,
  DollarSign,
  Palette,
  Upload,
  Mail,
  Phone,
  Video,
  FileCheck
} from 'lucide-react';

export default function MedicoForm() {
  const { addMedico } = useClinic();

  const [formData, setFormData] = useState({
    nome: '',
    titulacao: 'Dr.',
    registro: '',
    ufConselho: 'SP',
    especialidade: '',
    subespecialidade: '',
    email: '',
    telefone: '',
    experiencia: 5,
    disponibilidade: 3,
    corAgenda: '#2563eb',
    dias: ['Segunda', 'Quarta', 'Sexta'],
    turno: 'Manhã',
    valorConsulta: '250.00',
    aceitaTeleconsulta: true,
    documentoRegistro: '',
    biografia: ''
  });

  const [fileName, setFileName] = useState('');

  const titulacoes = ['Dr.', 'Dra.', 'Prof. Dr.', 'Me.', 'Esp.'];

  const ufs = [
    'SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'PE', 'CE', 'DF', 'GO', 'ES'
  ];

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

  const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  const turnos = ['Manhã', 'Tarde', 'Noite', 'Integral'];

  const textosDisp = {
    1: 'Disponibilidade 1 • Sob demanda pontual',
    2: 'Disponibilidade 2 • Carga horária parcial (1 a 2 turnos)',
    3: 'Disponibilidade 3 • Carga regular (3 a 4 turnos)',
    4: 'Disponibilidade 4 • Turno integral padrão',
    5: 'Disponibilidade 5 • Dedicação exclusiva e plantão'
  };

  const handleTelChange = (e) => {
    setFormData(prev => ({ ...prev, telefone: formatTelefone(e.target.value) }));
  };

  const handleCheckboxDia = (dia) => {
    setFormData(prev => {
      const exists = prev.dias.includes(dia);
      const novosDias = exists
        ? prev.dias.filter(d => d !== dia)
        : [...prev.dias, dia];
      return { ...prev, dias: novosDias };
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFormData(prev => ({ ...prev, documentoRegistro: file.name }));
    } else {
      setFileName('');
      setFormData(prev => ({ ...prev, documentoRegistro: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nome.trim() || !formData.registro.trim() || !formData.especialidade || !formData.valorConsulta || !formData.email.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios marcados com (*).');
      return;
    }

    addMedico({
      ...formData,
      experiencia: formData.experiencia ? `${formData.experiencia} anos` : 'Não informada',
      disponibilidade: `Nível ${formData.disponibilidade}`,
      dias: formData.dias.length > 0 ? formData.dias.join(', ') : 'Sob agendamento',
      valorConsulta: parseFloat(formData.valorConsulta).toFixed(2),
      documentoRegistro: fileName || 'Comprovante não anexado',
      biografia: formData.biografia.trim() || 'Sem biografia informada.'
    });

    handleReset();
  };

  const handleReset = () => {
    setFormData({
      nome: '',
      titulacao: 'Dr.',
      registro: '',
      ufConselho: 'SP',
      especialidade: '',
      subespecialidade: '',
      email: '',
      telefone: '',
      experiencia: 5,
      disponibilidade: 3,
      corAgenda: '#2563eb',
      dias: ['Segunda', 'Quarta', 'Sexta'],
      turno: 'Manhã',
      valorConsulta: '250.00',
      aceitaTeleconsulta: true,
      documentoRegistro: '',
      biografia: ''
    });
    setFileName('');
  };

  return (
    <div className="tab-pane active">
      <div className="form-container">
        {/* Cabeçalho */}
        <div className="form-header">
          <div className="form-header-badge">Cadastro #2 • 17 Campos</div>
          <h2>Cadastro de Profissional de Saúde</h2>
          <p>Credenciamento completo de especialistas, registros de conselho, escala de plantão, agenda e qualificações.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* SEÇÃO 1: Credenciamento e Formação (6 campos) */}
          <div className="form-section-card">
            <div className="form-section-title">
              <Award size={18} className="text-emerald-600" />
              <div>
                <h3>1. Credenciamento & Especialidade Clínica</h3>
                <span>Registro profissional e titulação acadêmica</span>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 1: Nome Completo */}
              <div className="form-group">
                <label htmlFor="medNome" className="form-label">
                  Nome Completo do Profissional <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="medNome"
                  className="form-control"
                  placeholder="Ex: Roberto Alcântara"
                  value={formData.nome}
                  onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  required
                />
                <small className="form-help">Nome de apresentação na escala e prontuário.</small>
              </div>

              {/* Campo 2: Titulação */}
              <div className="form-group">
                <label htmlFor="medTitulacao" className="form-label">
                  Titulação / Pronome de Tratamento
                </label>
                <select
                  id="medTitulacao"
                  className="form-control"
                  value={formData.titulacao}
                  onChange={(e) => setFormData(prev => ({ ...prev, titulacao: e.target.value }))}
                >
                  {titulacoes.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <small className="form-help">Forma de tratamento acadêmico.</small>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 3: Registro de Conselho */}
              <div className="form-group">
                <label htmlFor="medRegistro" className="form-label">
                  Registro Profissional (CRM/COREN/CRO) <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="medRegistro"
                  className="form-control"
                  placeholder="Ex: CRM 123456"
                  value={formData.registro}
                  onChange={(e) => setFormData(prev => ({ ...prev, registro: e.target.value }))}
                  required
                />
                <small className="form-help">Número oficial de inscrição ativa.</small>
              </div>

              {/* Campo 4: UF do Conselho */}
              <div className="form-group">
                <label htmlFor="medUfConselho" className="form-label">
                  UF do Conselho Regional <span className="required">*</span>
                </label>
                <select
                  id="medUfConselho"
                  className="form-control"
                  value={formData.ufConselho}
                  onChange={(e) => setFormData(prev => ({ ...prev, ufConselho: e.target.value }))}
                  required
                >
                  {ufs.map(uf => (
                    <option key={uf} value={uf}>{uf} - Conselho Regional</option>
                  ))}
                </select>
                <small className="form-help">Estado da federação de emissão do registro.</small>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 5: Especialidade Principal */}
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
                <small className="form-help">Área de atuação na clínica.</small>
              </div>

              {/* Campo 6: Segunda Especialidade */}
              <div className="form-group">
                <label htmlFor="medSubespecialidade" className="form-label">
                  Subespecialidade / Área de Foco
                </label>
                <input
                  type="text"
                  id="medSubespecialidade"
                  className="form-control"
                  placeholder="Ex: Ecocardiografia / Medicina Fetal"
                  value={formData.subespecialidade}
                  onChange={(e) => setFormData(prev => ({ ...prev, subespecialidade: e.target.value }))}
                />
                <small className="form-help">Área de pós-graduação ou fellowship complementar.</small>
              </div>
            </div>
          </div>

          {/* SEÇÃO 2: Contatos e Agenda (6 campos) */}
          <div className="form-section-card">
            <div className="form-section-title">
              <Calendar size={18} className="text-blue-600" />
              <div>
                <h3>2. Contato Profissional & Parametrização de Agenda</h3>
                <span>Canais internos, escala semanal, turnos e cor no calendário</span>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 7: Email Institucional */}
              <div className="form-group">
                <label htmlFor="medEmail" className="form-label">
                  E-mail Institucional <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="medEmail"
                  className="form-control"
                  placeholder="medico@clinicamedflow.com.br"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
                <small className="form-help">Para recebimento de avisos de novas consultas.</small>
              </div>

              {/* Campo 8: Telefone / Ramal */}
              <div className="form-group">
                <label htmlFor="medTelefone" className="form-label">
                  Telefone Profissional / Ramal do Consultório
                </label>
                <input
                  type="tel"
                  id="medTelefone"
                  className="form-control"
                  placeholder="(11) 3000-0000"
                  maxLength={15}
                  value={formData.telefone}
                  onChange={handleTelChange}
                />
                <small className="form-help">Contato direto para a recepção e enfermagem.</small>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 9: Tempo de Experiência */}
              <div className="form-group">
                <label htmlFor="medExperiencia" className="form-label">
                  Tempo de Experiência Clínica (em anos)
                </label>
                <input
                  type="number"
                  id="medExperiencia"
                  className="form-control"
                  min="0"
                  max="60"
                  value={formData.experiencia}
                  onChange={(e) => setFormData(prev => ({ ...prev, experiencia: parseInt(e.target.value) || 0 }))}
                />
                <small className="form-help">Anos de prática clínica ativa.</small>
              </div>

              {/* Campo 10: Disponibilidade Slider */}
              <div className="form-group">
                <label htmlFor="medDisponibilidade" className="form-label">
                  Disponibilidade de Plantão e Encaixes
                </label>
                <div className="range-container-modern">
                  <input
                    type="range"
                    id="medDisponibilidade"
                    min="1"
                    max="5"
                    className="form-range"
                    value={formData.disponibilidade}
                    onChange={(e) => setFormData(prev => ({ ...prev, disponibilidade: parseInt(e.target.value) || 1 }))}
                  />
                  <div className="range-badge-pill">
                    {textosDisp[formData.disponibilidade]}
                  </div>
                </div>
                <small className="form-help">Ajuste de 1 (pontual) a 5 (plantão contínuo).</small>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 11: Cor na Agenda */}
              <div className="form-group">
                <label htmlFor="medCorAgenda" className="form-label">
                  Cor Visual de Identificação na Agenda
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
                    <span className="text-xs text-slate-500">Cor exibida nas marcações da agenda</span>
                  </div>
                </div>
              </div>

              {/* Campo 12: Turno Preferencial (Radio) */}
              <div className="form-group">
                <label className="form-label">
                  Turno Principal de Atendimento
                </label>
                <div className="radio-group-2x2">
                  {turnos.map(t => (
                    <label key={t} className={`radio-card ${formData.turno === t ? 'selected' : ''}`}>
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
            </div>

            {/* Campo 13: Dias de Atendimento (Chips) */}
            <div className="form-group mt-3">
              <label className="form-label">
                Dias da Semana de Atendimento Presencial
              </label>
              <div className="days-chip-grid">
                {diasSemana.map(dia => {
                  const isChecked = formData.dias.includes(dia);
                  return (
                    <label
                      key={dia}
                      className={`day-chip ${isChecked ? 'active' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckboxDia(dia)}
                      />
                      <span>{dia}</span>
                    </label>
                  );
                })}
              </div>
              <small className="form-help">Selecione todos os dias em que o especialista atende na clínica.</small>
            </div>
          </div>

          {/* SEÇÃO 3: Faturamento, Telemedicina e Bio (5 campos) */}
          <div className="form-section-card">
            <div className="form-section-title">
              <DollarSign size={18} className="text-amber-600" />
              <div>
                <h3>3. Honorários, Modalidades & Perfil</h3>
                <span>Valor de consulta, atendimento remoto e biografia curricular</span>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 14: Valor Consulta */}
              <div className="form-group">
                <label htmlFor="medValorConsulta" className="form-label">
                  Valor Padrão da Consulta <span className="required">*</span>
                </label>
                <div className="input-prefix-wrapper">
                  <span className="prefix-badge">R$</span>
                  <input
                    type="number"
                    id="medValorConsulta"
                    className="form-control"
                    min="50"
                    step="10"
                    placeholder="250.00"
                    value={formData.valorConsulta}
                    onChange={(e) => setFormData(prev => ({ ...prev, valorConsulta: e.target.value }))}
                    required
                  />
                </div>
                <small className="form-help">Preço base de referência para atendimentos particulares.</small>
              </div>

              {/* Campo 15: Telemedicina (Toggle Switch) */}
              <div className="form-group flex-center-vertical">
                <label className="form-label">
                  Atendimento Remoto (Teleconsulta)
                </label>
                <div className="toggle-container-modern">
                  <label className="switch">
                    <input
                      type="checkbox"
                      id="medTeleconsulta"
                      checked={formData.aceitaTeleconsulta}
                      onChange={(e) => setFormData(prev => ({ ...prev, aceitaTeleconsulta: e.target.checked }))}
                    />
                    <span className="slider round"></span>
                  </label>
                  <div className="toggle-text-block">
                    <strong>{formData.aceitaTeleconsulta ? 'Habilitado para Telemedicina' : 'Apenas Presencial'}</strong>
                    <span>{formData.aceitaTeleconsulta ? 'Realiza consultas por chamada de vídeo' : 'Atendimento exclusivamente físico'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Campo 16: Comprovante de Registro (File) */}
            <div className="form-group mt-3">
              <label htmlFor="medDocRegistro" className="form-label">
                Comprovante de Registro / Certificado de Especialista (RQE)
              </label>
              <div className="file-dropzone">
                <input
                  type="file"
                  id="medDocRegistro"
                  accept="application/pdf,image/*"
                  className="file-input-hidden"
                  onChange={handleFileChange}
                />
                <label htmlFor="medDocRegistro" className="file-dropzone-label">
                  <div className="file-icon-box">
                    <Upload size={20} />
                  </div>
                  <div className="file-text-box">
                    <span className="file-title">
                      {fileName ? fileName : 'Clique para anexar diploma ou comprovante do conselho'}
                    </span>
                    <span className="file-subtitle">Formatos aceitos: PDF, JPG, PNG (máx. 10MB)</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Campo 17: Mini-biografia (Textarea) */}
            <div className="form-group mt-3">
              <label htmlFor="medBiografia" className="form-label">
                Mini-biografia & Formação Acadêmica
              </label>
              <textarea
                id="medBiografia"
                rows="3"
                className="form-control"
                placeholder="Graduação em Medicina, residência clínica, mestrado, hospitais de atuação e publicações..."
                value={formData.biografia}
                onChange={(e) => setFormData(prev => ({ ...prev, biografia: e.target.value }))}
              />
              <small className="form-help">Apresentação curricular exibida na ficha do profissional.</small>
            </div>
          </div>

          {/* Barra de Ações */}
          <div className="form-actions-bar">
            <button type="submit" className="btn-primary">
              <Save size={18} />
              Salvar Cadastro de Especialista (17 Campos)
            </button>
            <button type="button" onClick={handleReset} className="btn-secondary">
              <RotateCcw size={16} />
              Limpar Formulário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
