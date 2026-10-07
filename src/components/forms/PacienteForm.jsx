import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { formatCPF, formatTelefone } from '../../utils/formatters';
import {
  Save,
  RotateCcw,
  Upload,
  User,
  CreditCard,
  Calendar,
  Mail,
  Phone,
  Droplet,
  ShieldCheck,
  FileText,
  MapPin,
  HeartPulse,
  AlertTriangle
} from 'lucide-react';

export default function PacienteForm() {
  const { addPaciente } = useClinic();

  const [formData, setFormData] = useState({
    nome: '',
    nomeSocial: '',
    cpf: '',
    dataNasc: '',
    sexo: 'Feminino',
    estadoCivil: 'Solteiro(a)',
    email: '',
    telefone: '',
    telEmergencia: '',
    contatoEmergencia: '',
    endereco: '',
    tipoSanguineo: '',
    temConvenio: false,
    numCarteirinha: '',
    condicoes: [],
    documento: '',
    observacoesGerais: ''
  });

  const [fileName, setFileName] = useState('');

  const condicoesOpcoes = [
    'Hipertensão Arterial',
    'Diabetes Mellitus',
    'Asma / Bronquite',
    'Alergia a Medicamentos',
    'Cardiopatia Crônica'
  ];

  const estadosCivis = [
    'Solteiro(a)',
    'Casado(a)',
    'União Estável',
    'Divorciado(a)',
    'Viúvo(a)'
  ];

  const handleCpfChange = (e) => {
    setFormData(prev => ({ ...prev, cpf: formatCPF(e.target.value) }));
  };

  const handleTelChange = (e) => {
    setFormData(prev => ({ ...prev, telefone: formatTelefone(e.target.value) }));
  };

  const handleTelEmergenciaChange = (e) => {
    setFormData(prev => ({ ...prev, telEmergencia: formatTelefone(e.target.value) }));
  };

  const handleCheckboxCondicao = (opcao) => {
    setFormData(prev => {
      const exists = prev.condicoes.includes(opcao);
      const novasCondicoes = exists
        ? prev.condicoes.filter(item => item !== opcao)
        : [...prev.condicoes, opcao];
      return { ...prev, condicoes: novasCondicoes };
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nome.trim() || !formData.cpf.trim() || !formData.dataNasc || !formData.email.trim() || !formData.telefone.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios marcados com (*).');
      return;
    }

    addPaciente({
      ...formData,
      documento: fileName || 'Nenhum documento anexado'
    });

    handleReset();
  };

  const handleReset = () => {
    setFormData({
      nome: '',
      nomeSocial: '',
      cpf: '',
      dataNasc: '',
      sexo: 'Feminino',
      estadoCivil: 'Solteiro(a)',
      email: '',
      telefone: '',
      telEmergencia: '',
      contatoEmergencia: '',
      endereco: '',
      tipoSanguineo: '',
      temConvenio: false,
      numCarteirinha: '',
      condicoes: [],
      documento: '',
      observacoesGerais: ''
    });
    setFileName('');
  };

  return (
    <div className="tab-pane active">
      <div className="form-container">
        {/* Cabeçalho */}
        <div className="form-header">
          <div className="form-header-badge">Cadastro #1 • 17 Campos</div>
          <h2>Ficha Cadastral do Paciente</h2>
          <p>Preencha os dados completos de identificação, contato de emergência, cobertura de saúde e prontuário.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* SEÇÃO 1: Identificação Civil (6 campos) */}
          <div className="form-section-card">
            <div className="form-section-title">
              <User size={18} className="text-blue-600" />
              <div>
                <h3>1. Identificação Civil e Pessoal</h3>
                <span>Dados do paciente e registros civis oficiais</span>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 1: Nome Completo */}
              <div className="form-group">
                <label htmlFor="pacNome" className="form-label">
                  Nome Completo <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="pacNome"
                  className="form-control"
                  placeholder="Ex: Maria Eduarda Silva"
                  value={formData.nome}
                  onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  required
                />
                <small className="form-help">Nome civil completo conforme documento de identidade.</small>
              </div>

              {/* Campo 2: Nome Social */}
              <div className="form-group">
                <label htmlFor="pacNomeSocial" className="form-label">
                  Nome Social / Como prefere ser chamado(a)
                </label>
                <input
                  type="text"
                  id="pacNomeSocial"
                  className="form-control"
                  placeholder="Ex: Duda Silva (opcional)"
                  value={formData.nomeSocial}
                  onChange={(e) => setFormData(prev => ({ ...prev, nomeSocial: e.target.value }))}
                />
                <small className="form-help">Forma de tratamento preferencial no atendimento.</small>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 3: CPF */}
              <div className="form-group">
                <label htmlFor="pacCpf" className="form-label">
                  CPF <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="pacCpf"
                  className="form-control"
                  placeholder="000.000.000-00"
                  maxLength={14}
                  value={formData.cpf}
                  onChange={handleCpfChange}
                  required
                />
                <small className="form-help">Cadastro de Pessoa Física (11 dígitos).</small>
              </div>

              {/* Campo 4: Data de Nascimento */}
              <div className="form-group">
                <label htmlFor="pacDataNasc" className="form-label">
                  Data de Nascimento <span className="required">*</span>
                </label>
                <input
                  type="date"
                  id="pacDataNasc"
                  className="form-control"
                  value={formData.dataNasc}
                  onChange={(e) => setFormData(prev => ({ ...prev, dataNasc: e.target.value }))}
                  required
                />
                <small className="form-help">Utilizado para cálculo da faixa etária no prontuário.</small>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 5: Sexo Biológico */}
              <div className="form-group">
                <label className="form-label">
                  Sexo Biológico <span className="required">*</span>
                </label>
                <div className="radio-group-modern">
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
              </div>

              {/* Campo 6: Estado Civil */}
              <div className="form-group">
                <label htmlFor="pacEstadoCivil" className="form-label">
                  Estado Civil
                </label>
                <select
                  id="pacEstadoCivil"
                  className="form-control"
                  value={formData.estadoCivil}
                  onChange={(e) => setFormData(prev => ({ ...prev, estadoCivil: e.target.value }))}
                >
                  {estadosCivis.map(ec => (
                    <option key={ec} value={ec}>{ec}</option>
                  ))}
                </select>
                <small className="form-help">Registro civil do paciente.</small>
              </div>
            </div>
          </div>

          {/* SEÇÃO 2: Contatos e Endereço (5 campos) */}
          <div className="form-section-card">
            <div className="form-section-title">
              <Mail size={18} className="text-emerald-600" />
              <div>
                <h3>2. Contatos & Endereço Residencial</h3>
                <span>Canais de comunicação e contato para emergências</span>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 7: Email */}
              <div className="form-group">
                <label htmlFor="pacEmail" className="form-label">
                  E-mail do Paciente <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="pacEmail"
                  className="form-control"
                  placeholder="paciente@exemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
                <small className="form-help">Para envio de receitas, laudos e lembretes.</small>
              </div>

              {/* Campo 8: Telefone / WhatsApp */}
              <div className="form-group">
                <label htmlFor="pacTelefone" className="form-label">
                  Telefone Celular (WhatsApp) <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="pacTelefone"
                  className="form-control"
                  placeholder="(11) 90000-0000"
                  maxLength={15}
                  value={formData.telefone}
                  onChange={handleTelChange}
                  required
                />
                <small className="form-help">Contato prioritário para confirmação de agendamentos.</small>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 9: Telefone de Emergência */}
              <div className="form-group">
                <label htmlFor="pacTelEmergencia" className="form-label">
                  Telefone de Emergência
                </label>
                <input
                  type="tel"
                  id="pacTelEmergencia"
                  className="form-control"
                  placeholder="(11) 98888-7777"
                  maxLength={15}
                  value={formData.telEmergencia}
                  onChange={handleTelEmergenciaChange}
                />
                <small className="form-help">Contato secundário em casos de urgência.</small>
              </div>

              {/* Campo 10: Contato de Emergência (Nome/Parentesco) */}
              <div className="form-group">
                <label htmlFor="pacContatoEmergencia" className="form-label">
                  Nome e Parentesco do Contato de Emergência
                </label>
                <input
                  type="text"
                  id="pacContatoEmergencia"
                  className="form-control"
                  placeholder="Ex: Carlos Silva (Pai / Cônjuge)"
                  value={formData.contatoEmergencia}
                  onChange={(e) => setFormData(prev => ({ ...prev, contatoEmergencia: e.target.value }))}
                />
                <small className="form-help">Pessoa responsável em situações emergenciais.</small>
              </div>
            </div>

            {/* Campo 11: Endereço */}
            <div className="form-group mt-2">
              <label htmlFor="pacEndereco" className="form-label">
                Endereço Residencial Completo
              </label>
              <input
                type="text"
                id="pacEndereco"
                className="form-control"
                placeholder="Ex: Av. Paulista, 1500 - Apto 42, Bela Vista - São Paulo/SP"
                value={formData.endereco}
                onChange={(e) => setFormData(prev => ({ ...prev, endereco: e.target.value }))}
              />
              <small className="form-help">Logradouro, número, complemento, bairro e cidade.</small>
            </div>
          </div>

          {/* SEÇÃO 3: Cobertura, Saúde e Prontuário (6 campos) */}
          <div className="form-section-card">
            <div className="form-section-title">
              <ShieldCheck size={18} className="text-purple-600" />
              <div>
                <h3>3. Cobertura de Saúde & Informações Clínicas</h3>
                <span>Plano de saúde, alergias, tipo sanguíneo e restrições</span>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 12: Tipo Sanguíneo */}
              <div className="form-group">
                <label htmlFor="pacTipoSanguineo" className="form-label">
                  Tipo Sanguíneo & Fator RH
                </label>
                <select
                  id="pacTipoSanguineo"
                  className="form-control"
                  value={formData.tipoSanguineo}
                  onChange={(e) => setFormData(prev => ({ ...prev, tipoSanguineo: e.target.value }))}
                >
                  <option value="">Selecione o tipo sanguíneo...</option>
                  <option value="A+">A Positivo (A+)</option>
                  <option value="A-">A Negativo (A-)</option>
                  <option value="B+">B Positivo (B+)</option>
                  <option value="B-">B Negativo (B-)</option>
                  <option value="AB+">AB Positivo (AB+)</option>
                  <option value="AB-">AB Negativo (AB-)</option>
                  <option value="O+">O Positivo (O+)</option>
                  <option value="O-">O Negativo (O-)</option>
                </select>
                <small className="form-help">Fator sanguíneo registrado para segurança cirúrgica.</small>
              </div>

              {/* Campo 13: Possui Convênio? (Toggle Switch) */}
              <div className="form-group flex-center-vertical">
                <label className="form-label">
                  Possui Convênio Médico / Plano de Saúde?
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
                    <strong>{formData.temConvenio ? 'Convênio Ativo' : 'Atendimento Particular'}</strong>
                    <span>{formData.temConvenio ? 'Cobertura via operadora' : 'Faturamento particular na recepção'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Campo 14: Número da Carteirinha */}
            {formData.temConvenio && (
              <div className="form-group mt-3">
                <label htmlFor="pacNumCarteirinha" className="form-label">
                  Número da Carteirinha do Convênio <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="pacNumCarteirinha"
                  className="form-control"
                  placeholder="Ex: UNIMED-992014-00"
                  value={formData.numCarteirinha}
                  onChange={(e) => setFormData(prev => ({ ...prev, numCarteirinha: e.target.value }))}
                />
                <small className="form-help">Código de autorização impresso na carteirinha física ou digital.</small>
              </div>
            )}

            {/* Campo 15: Checkbox Múltiplo de Condições */}
            <div className="form-group mt-3">
              <label className="form-label">
                Condições Clínicas Preexistentes e Alergias
              </label>
              <div className="checkbox-pills-grid">
                {condicoesOpcoes.map((opcao) => {
                  const isChecked = formData.condicoes.includes(opcao);
                  return (
                    <label
                      key={opcao}
                      className={`checkbox-pill ${isChecked ? 'active' : ''}`}
                    >
                      <input
                        type="checkbox"
                        value={opcao}
                        checked={isChecked}
                        onChange={() => handleCheckboxCondicao(opcao)}
                      />
                      <span>{opcao}</span>
                    </label>
                  );
                })}
              </div>
              <small className="form-help">Selecione todas as condições de saúde diagnosticadas previamente.</small>
            </div>

            {/* Campo 16: Documento com Foto */}
            <div className="form-group mt-3">
              <label htmlFor="pacFotoDoc" className="form-label">
                Documento de Identidade com Foto (RG ou CNH)
              </label>
              <div className="file-dropzone">
                <input
                  type="file"
                  id="pacFotoDoc"
                  accept="image/*,application/pdf"
                  className="file-input-hidden"
                  onChange={handleFileChange}
                />
                <label htmlFor="pacFotoDoc" className="file-dropzone-label">
                  <div className="file-icon-box">
                    <Upload size={20} />
                  </div>
                  <div className="file-text-box">
                    <span className="file-title">
                      {fileName ? fileName : 'Clique para selecionar o documento'}
                    </span>
                    <span className="file-subtitle">Formatos aceitos: PDF, PNG, JPG (até 10MB)</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Campo 17: Observações Gerais / Textarea */}
            <div className="form-group mt-3">
              <label htmlFor="pacObservacoesGerais" className="form-label">
                Observações Gerais / Restrições Especiais do Paciente
              </label>
              <textarea
                id="pacObservacoesGerais"
                rows="3"
                className="form-control"
                placeholder="Descreva medicamentos de uso contínuo, mobilidade reduzida ou restrições alimentares..."
                value={formData.observacoesGerais}
                onChange={(e) => setFormData(prev => ({ ...prev, observacoesGerais: e.target.value }))}
              />
              <small className="form-help">Anotações clínicas gerais visíveis no prontuário.</small>
            </div>
          </div>

          {/* Barra de Ações */}
          <div className="form-actions-bar">
            <button type="submit" className="btn-primary">
              <Save size={18} />
              Salvar Cadastro de Paciente (17 Campos)
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
