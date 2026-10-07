import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { formatTelefone } from '../../utils/formatters';
import {
  Save,
  RotateCcw,
  User,
  Calendar,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function PacienteForm() {
  const { addPaciente } = useClinic();

  const [formData, setFormData] = useState({
    nome: '',
    dataNasc: '',
    telefone: '',
    email: '',
    sexo: 'Feminino',
    temConvenio: false
  });

  const handleTelChange = (e) => {
    setFormData(prev => ({ ...prev, telefone: formatTelefone(e.target.value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nome.trim() || !formData.dataNasc || !formData.telefone.trim() || !formData.email.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios marcados com (*).');
      return;
    }

    addPaciente(formData);
    handleReset();
  };

  const handleReset = () => {
    setFormData({
      nome: '',
      dataNasc: '',
      telefone: '',
      email: '',
      sexo: 'Feminino',
      temConvenio: false
    });
  };

  return (
    <div className="tab-pane active">
      <div className="form-container">
        {/* Cabeçalho do Formulário */}
        <div className="form-header">
          <div className="form-header-badge">
            <span className="badge-dot"></span>
            <span>Cadastro 01 de 03 • 6 Campos (6 Tipos Distintos)</span>
          </div>
          <h2>Ficha Cadastral do Paciente</h2>
          <p>
            Registro de prontuário inicial com foco em alta variabilidade de controles HTML5:
            campos dos tipos <code>text</code>, <code>date</code>, <code>tel</code>, <code>email</code>, <code>radio</code> e <code>checkbox</code>.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-section-card">
            <div className="form-section-title">
              <div className="section-icon-box bg-blue-subtle text-blue-600">
                <User size={20} />
              </div>
              <div className="section-title-text">
                <h3>Dados Pessoais e Identificação do Paciente</h3>
                <span>Preencha os canais de contato e parâmetros básicos do prontuário</span>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 1: Nome Completo (type="text") */}
              <div className="form-group">
                <label htmlFor="pacNome" className="form-label">
                  Nome Completo <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="pacNome"
                  className="form-control"
                  placeholder="Ex: Camila Ferreira Bastos"
                  value={formData.nome}
                  onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  required
                />
                <small className="form-help">Nome civil completo conforme documento de identificação.</small>
              </div>

              {/* Campo 2: Data de Nascimento (type="date") */}
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
              {/* Campo 3: Telefone Celular (type="tel") */}
              <div className="form-group">
                <label htmlFor="pacTelefone" className="form-label">
                  Telefone Celular (WhatsApp) <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="pacTelefone"
                  className="form-control font-mono"
                  placeholder="(11) 98765-4321"
                  maxLength={15}
                  value={formData.telefone}
                  onChange={handleTelChange}
                  required
                />
                <small className="form-help">Canal prioritário para envio de lembretes e confirmações.</small>
              </div>

              {/* Campo 4: E-mail (type="email") */}
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
                <small className="form-help">Endereço eletrônico para recebimento de receitas e laudos.</small>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 5: Sexo Biológico (type="radio") */}
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
                <small className="form-help">Definição para adequação dos parâmetros laboratoriais.</small>
              </div>

              {/* Campo 6: Possui Convênio? (type="checkbox" Switch) */}
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
                    <span>{formData.temConvenio ? 'Cobertura via operadora de saúde' : 'Faturamento particular na recepção'}</span>
                  </div>
                </div>
                <small className="form-help">Alternador booleano para modalidade de faturamento.</small>
              </div>
            </div>
          </div>

          {/* Barra de Ações */}
          <div className="form-actions-bar">
            <button type="submit" className="btn-primary">
              <Save size={18} />
              <span>Salvar Paciente</span>
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
