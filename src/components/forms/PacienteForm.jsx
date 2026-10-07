import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { formatCPF, formatTelefone } from '../../utils/formatters';
import {
  Save,
  RotateCcw,
  User
} from 'lucide-react';

export default function PacienteForm() {
  const { addPaciente } = useClinic();

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    dataNasc: '',
    telefone: '',
    email: '',
    tipoSanguineo: 'O+',
    sexo: 'Feminino',
    temConvenio: false
  });

  const handleCpfChange = (e) => {
    setFormData(prev => ({ ...prev, cpf: formatCPF(e.target.value) }));
  };

  const handleTelChange = (e) => {
    setFormData(prev => ({ ...prev, telefone: formatTelefone(e.target.value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nome.trim() || !formData.cpf.trim() || !formData.dataNasc || !formData.telefone.trim() || !formData.email.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios marcados com (*).');
      return;
    }

    addPaciente(formData);
    handleReset();
  };

  const handleReset = () => {
    setFormData({
      nome: '',
      cpf: '',
      dataNasc: '',
      telefone: '',
      email: '',
      tipoSanguineo: 'O+',
      sexo: 'Feminino',
      temConvenio: false
    });
  };

  const tiposSanguineos = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="tab-pane active">
      <div className="form-container">
        {/* Cabeçalho Limpo */}
        <div className="form-header">
          <h2>Cadastro de Paciente</h2>
          <p>Preencha os dados do paciente para abertura de prontuário.</p>
        </div>

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
                  type="text"
                  id="pacNome"
                  className="form-control"
                  placeholder="Nome do paciente"
                  value={formData.nome}
                  onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  required
                />
              </div>

              {/* Campo 2: CPF (text com máscara) */}
              <div className="form-group">
                <label htmlFor="pacCpf" className="form-label">
                  CPF <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="pacCpf"
                  className="form-control font-mono"
                  placeholder="000.000.000-00"
                  maxLength={14}
                  value={formData.cpf}
                  onChange={handleCpfChange}
                  required
                />
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 3: Data de Nascimento (date) */}
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
              </div>

              {/* Campo 4: Telefone (tel) */}
              <div className="form-group">
                <label htmlFor="pacTelefone" className="form-label">
                  Telefone / WhatsApp <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="pacTelefone"
                  className="form-control font-mono"
                  placeholder="(11) 90000-0000"
                  maxLength={15}
                  value={formData.telefone}
                  onChange={handleTelChange}
                  required
                />
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 5: E-mail (email) */}
              <div className="form-group">
                <label htmlFor="pacEmail" className="form-label">
                  E-mail <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="pacEmail"
                  className="form-control"
                  placeholder="paciente@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              {/* Campo 6: Tipo Sanguíneo (select) */}
              <div className="form-group">
                <label htmlFor="pacTipoSanguineo" className="form-label">
                  Tipo Sanguíneo
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
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 7: Sexo Biológico (radio) */}
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

              {/* Campo 8: Convênio (checkbox switch) */}
              <div className="form-group flex-center-vertical">
                <label className="form-label">
                  Plano de Saúde
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
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Barra de Ações */}
          <div className="form-actions-bar">
            <button type="submit" className="btn-primary">
              <Save size={17} />
              <span>Salvar Paciente</span>
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
