import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  Save,
  RotateCcw,
  Upload,
  CalendarCheck,
  UserCheck,
  Activity,
  AlertTriangle,
  Clock,
  Bell,
  Thermometer,
  CreditCard,
  Building,
  Video
} from 'lucide-react';

export default function AgendamentoForm() {
  const { pacientes, medicos, addAgendamento, setActiveTab } = useClinic();

  const [formData, setFormData] = useState({
    pacienteId: '',
    medicoId: '',
    data: '',
    hora: '',
    duracaoMin: 45,
    consultorio: 'Consultório 101 (Cardiologia & Clínica)',
    tipo: 'Primeira Consulta',
    formato: 'Presencial no Consultório',
    nivelDor: 0,
    prioridade: 'Verde - Pouco Urgente',
    pressaoArterial: '120/80',
    temperatura: '36.5',
    formaPagamento: 'Convênio / Plano de Saúde',
    notificar: true,
    anexo: '',
    observacoes: ''
  });

  const [fileName, setFileName] = useState('');

  const tiposAtendimento = [
    { label: 'Primeira Consulta', desc: 'Avaliação inicial e anamnese' },
    { label: 'Retorno de Rotina', desc: 'Acompanhamento de conduta' },
    { label: 'Avaliação de Exames', desc: 'Análise de laudos e resultados' },
    { label: 'Urgência Ambulatorial', desc: 'Atendimento prioritário imediato' }
  ];

  const consultorios = [
    'Consultório 101 (Cardiologia & Clínica)',
    'Consultório 102 (Dermatologia & Procedimentos)',
    'Consultório 103 (Ortopedia & Traumatologia)',
    'Consultório 104 (Pediatria & Puericultura)',
    'Sala 201 (Triagem Rápida & Emergência)'
  ];

  const prioridades = [
    { valor: 'Verde - Pouco Urgente', label: 'Verde • Pouco Urgente (Padrão Ambulatorial)' },
    { valor: 'Azul - Não Urgente', label: 'Azul • Não Urgente (Consulta Eletiva)' },
    { valor: 'Amarelo - Urgente', label: 'Amarelo • Urgente (Atendimento Rápido)' },
    { valor: 'Laranja - Muito Urgente', label: 'Laranja • Muito Urgente (Imediato)' }
  ];

  const formasPagamento = [
    'Convênio / Plano de Saúde',
    'Cartão de Crédito',
    'Cartão de Débito',
    'PIX / Transferência Instantânea',
    'Dinheiro em Espécie'
  ];

  const getPainBadgeInfo = (val) => {
    if (val === 0) return { text: 'Nível 0 • Sem dor ou desconforto', className: 'pain-0' };
    if (val <= 3) return { text: `Nível ${val} • Dor leve e tolerável`, className: 'pain-0' };
    if (val <= 6) return { text: `Nível ${val} • Dor moderada (interfere em atividades)`, className: 'pain-1' };
    if (val <= 8) return { text: `Nível ${val} • Dor intensa e incapacitante`, className: 'pain-2' };
    return { text: `Nível ${val} • Dor extrema / Emergencial`, className: 'pain-2' };
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFormData(prev => ({ ...prev, anexo: file.name }));
    } else {
      setFileName('');
      setFormData(prev => ({ ...prev, anexo: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.pacienteId || !formData.medicoId || !formData.data || !formData.hora || !formData.observacoes.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios marcados com (*).');
      return;
    }

    addAgendamento({
      ...formData,
      anexo: fileName || 'Nenhum exame anexado'
    });

    handleReset();
  };

  const handleReset = () => {
    setFormData({
      pacienteId: '',
      medicoId: '',
      data: '',
      hora: '',
      duracaoMin: 45,
      consultorio: 'Consultório 101 (Cardiologia & Clínica)',
      tipo: 'Primeira Consulta',
      formato: 'Presencial no Consultório',
      nivelDor: 0,
      prioridade: 'Verde - Pouco Urgente',
      pressaoArterial: '120/80',
      temperatura: '36.5',
      formaPagamento: 'Convênio / Plano de Saúde',
      notificar: true,
      anexo: '',
      observacoes: ''
    });
    setFileName('');
  };

  const painInfo = getPainBadgeInfo(Number(formData.nivelDor));

  return (
    <div className="tab-pane active">
      <div className="form-container">
        {/* Cabeçalho */}
        <div className="form-header">
          <div className="form-header-badge">Cadastro #3 • 16 Campos</div>
          <h2>Agendamento de Consulta & Triagem Clínica</h2>
          <p>Associe paciente e médico, defina data, sala, modalidade, formato e realize a triagem sintomática completa.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* SEÇÃO 1: Vinculação, Horários e Sala (6 campos) */}
          <div className="form-section-card">
            <div className="form-section-title">
              <UserCheck size={18} className="text-blue-600" />
              <div>
                <h3>1. Participantes, Horários & Local de Atendimento</h3>
                <span>Selecione paciente, médico, data, hora, duração e consultório</span>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 1: Paciente */}
              <div className="form-group">
                <label htmlFor="agdPaciente" className="form-label">
                  Paciente Cadastrado <span className="required">*</span>
                </label>
                <select
                  id="agdPaciente"
                  className="form-control"
                  value={formData.pacienteId}
                  onChange={(e) => setFormData(prev => ({ ...prev, pacienteId: e.target.value }))}
                  required
                >
                  <option value="">Selecione o paciente cadastrado...</option>
                  {pacientes.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.nome} (CPF: {p.cpf})
                    </option>
                  ))}
                </select>
                {pacientes.length === 0 ? (
                  <small className="form-help text-amber-600">
                    Nenhum paciente cadastrado.{' '}
                    <button type="button" onClick={() => setActiveTab('cad-paciente')} className="underline font-semibold">
                      Cadastrar paciente agora
                    </button>.
                  </small>
                ) : (
                  <small className="form-help">Lista sincronizada dinamicamente com os pacientes do sistema.</small>
                )}
              </div>

              {/* Campo 2: Médico */}
              <div className="form-group">
                <label htmlFor="agdMedico" className="form-label">
                  Profissional de Saúde Responsável <span className="required">*</span>
                </label>
                <select
                  id="agdMedico"
                  className="form-control"
                  value={formData.medicoId}
                  onChange={(e) => setFormData(prev => ({ ...prev, medicoId: e.target.value }))}
                  required
                >
                  <option value="">Selecione o profissional...</option>
                  {medicos.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.nome} — {m.especialidade} ({m.registro})
                    </option>
                  ))}
                </select>
                {medicos.length === 0 ? (
                  <small className="form-help text-amber-600">
                    Nenhum médico cadastrado.{' '}
                    <button type="button" onClick={() => setActiveTab('cad-medico')} className="underline font-semibold">
                      Cadastrar profissional agora
                    </button>.
                  </small>
                ) : (
                  <small className="form-help">Especialista que conduzirá a consulta médica.</small>
                )}
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 3: Data */}
              <div className="form-group">
                <label htmlFor="agdData" className="form-label">
                  Data da Consulta <span className="required">*</span>
                </label>
                <input
                  type="date"
                  id="agdData"
                  className="form-control"
                  value={formData.data}
                  onChange={(e) => setFormData(prev => ({ ...prev, data: e.target.value }))}
                  required
                />
                <small className="form-help">Data agendada no calendário clínico.</small>
              </div>

              {/* Campo 4: Hora */}
              <div className="form-group">
                <label htmlFor="agdHora" className="form-label">
                  Horário de Início <span className="required">*</span>
                </label>
                <input
                  type="time"
                  id="agdHora"
                  className="form-control"
                  value={formData.hora}
                  onChange={(e) => setFormData(prev => ({ ...prev, hora: e.target.value }))}
                  required
                />
                <small className="form-help">Horário de abertura do atendimento.</small>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 5: Duração da Sessão */}
              <div className="form-group">
                <label htmlFor="agdDuracaoMin" className="form-label">
                  Duração Estimada da Consulta (em minutos)
                </label>
                <input
                  type="number"
                  id="agdDuracaoMin"
                  className="form-control"
                  min="15"
                  max="180"
                  step="15"
                  value={formData.duracaoMin}
                  onChange={(e) => setFormData(prev => ({ ...prev, duracaoMin: parseInt(e.target.value) || 30 }))}
                />
                <small className="form-help">Tempo de reserva na sala (ex: 30, 45 ou 60 minutos).</small>
              </div>

              {/* Campo 6: Sala / Consultório (Select) */}
              <div className="form-group">
                <label htmlFor="agdConsultorio" className="form-label">
                  Sala / Consultório Designado
                </label>
                <select
                  id="agdConsultorio"
                  className="form-control"
                  value={formData.consultorio}
                  onChange={(e) => setFormData(prev => ({ ...prev, consultorio: e.target.value }))}
                >
                  {consultorios.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <small className="form-help">Espaço reservado na estrutura da clínica.</small>
              </div>
            </div>
          </div>

          {/* SEÇÃO 2: Modalidade e Formato (2 campos com layout amplo e espaçoso) */}
          <div className="form-section-card">
            <div className="form-section-title">
              <Building size={18} className="text-emerald-600" />
              <div>
                <h3>2. Modalidade & Formato de Atendimento</h3>
                <span>Definição do tipo de sessão e canal (físico presencial ou telemedicina online)</span>
              </div>
            </div>

            {/* Campo 7: Modalidade (Radio Cards) */}
            <div className="form-group">
              <label className="form-label">
                Modalidade de Atendimento <span className="required">*</span>
              </label>
              <div className="radio-cards-grid">
                {tiposAtendimento.map((tipoObj) => {
                  const isChecked = formData.tipo === tipoObj.label;
                  return (
                    <label
                      key={tipoObj.label}
                      className={`radio-card-detailed ${isChecked ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="agdTipo"
                        value={tipoObj.label}
                        checked={isChecked}
                        onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value }))}
                      />
                      <div className="radio-card-content">
                        <strong>{tipoObj.label}</strong>
                        <span>{tipoObj.desc}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Campo 8: Formato (Cards com ícones dedicados e sem aperto de espaço) */}
            <div className="form-group mt-4">
              <label className="form-label">
                Formato da Consulta <span className="required">*</span>
              </label>
              <div className="format-cards-grid">
                <label className={`format-option-card ${formData.formato === 'Presencial no Consultório' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="agdFormato"
                    value="Presencial no Consultório"
                    checked={formData.formato === 'Presencial no Consultório'}
                    onChange={(e) => setFormData(prev => ({ ...prev, formato: e.target.value }))}
                  />
                  <div className="format-option-content">
                    <div className="format-icon-pill">
                      <Building size={20} />
                    </div>
                    <div>
                      <strong>Presencial no Consultório</strong>
                      <span>Atendimento físico presencial na clínica</span>
                    </div>
                  </div>
                </label>

                <label className={`format-option-card ${formData.formato === 'Telemedicina / Chamada de Vídeo' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="agdFormato"
                    value="Telemedicina / Chamada de Vídeo"
                    checked={formData.formato === 'Telemedicina / Chamada de Vídeo'}
                    onChange={(e) => setFormData(prev => ({ ...prev, formato: e.target.value }))}
                  />
                  <div className="format-option-content">
                    <div className="format-icon-pill">
                      <Video size={20} />
                    </div>
                    <div>
                      <strong>Telemedicina (Vídeo)</strong>
                      <span>Consulta remota por videoconferência segura</span>
                    </div>
                  </div>
                </label>
              </div>
              <small className="form-help">Escolha se o paciente comparecerá à unidade ou será atendido online.</small>
            </div>
          </div>

          {/* SEÇÃO 3: Triagem Clínica e Sinais Vitais (4 campos) */}
          <div className="form-section-card">
            <div className="form-section-title">
              <Activity size={18} className="text-purple-600" />
              <div>
                <h3>3. Triagem de Enfermagem & Sinais Vitais</h3>
                <span>Escala analógica de dor, classificação Manchester e aferições</span>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 9: Escala de Dor EVA (Range) */}
              <div className="form-group">
                <label htmlFor="agdNivelDor" className="form-label">
                  Escala Analógica de Dor Relatada (EVA 0 a 10)
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
                      {painInfo.text}
                    </span>
                  </div>
                </div>
                <small className="form-help">Indicador visual da intensidade de dor relatada pelo paciente.</small>
              </div>

              {/* Campo 10: Manchester (Select) */}
              <div className="form-group">
                <label htmlFor="agdPrioridade" className="form-label">
                  Classificação de Risco (Protocolo Manchester) <span className="required">*</span>
                </label>
                <select
                  id="agdPrioridade"
                  className="form-control"
                  value={formData.prioridade}
                  onChange={(e) => setFormData(prev => ({ ...prev, prioridade: e.target.value }))}
                  required
                >
                  {prioridades.map(prio => (
                    <option key={prio.valor} value={prio.valor}>
                      {prio.label}
                    </option>
                  ))}
                </select>
                <small className="form-help">Diretriz internacional para prioridade na fila de atendimento.</small>
              </div>
            </div>

            <div className="form-grid-2 mt-3">
              {/* Campo 11: Pressão Arterial */}
              <div className="form-group">
                <label htmlFor="agdPressao" className="form-label">
                  Pressão Arterial Aferida (mmHg)
                </label>
                <input
                  type="text"
                  id="agdPressao"
                  className="form-control"
                  placeholder="Ex: 120/80"
                  value={formData.pressaoArterial}
                  onChange={(e) => setFormData(prev => ({ ...prev, pressaoArterial: e.target.value }))}
                />
                <small className="form-help">Aferição prévia realizada na triagem de enfermagem.</small>
              </div>

              {/* Campo 12: Temperatura */}
              <div className="form-group">
                <label htmlFor="agdTemperatura" className="form-label">
                  Temperatura Corporal (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="34"
                  max="43"
                  id="agdTemperatura"
                  className="form-control"
                  placeholder="Ex: 36.5"
                  value={formData.temperatura}
                  onChange={(e) => setFormData(prev => ({ ...prev, temperatura: e.target.value }))}
                />
                <small className="form-help">Temperatura axilar em graus Celsius.</small>
              </div>
            </div>
          </div>

          {/* SEÇÃO 4: Faturamento, Avisos e Queixa (4 campos) */}
          <div className="form-section-card">
            <div className="form-section-title">
              <CalendarCheck size={18} className="text-amber-600" />
              <div>
                <h3>4. Faturamento, Anexo & Queixa Principal</h3>
                <span>Forma de pagamento, notificações, laudos prévios e sintomas</span>
              </div>
            </div>

            <div className="form-grid-2">
              {/* Campo 13: Forma de Pagamento */}
              <div className="form-group">
                <label htmlFor="agdFormaPagamento" className="form-label">
                  Forma de Pagamento Prevista
                </label>
                <select
                  id="agdFormaPagamento"
                  className="form-control"
                  value={formData.formaPagamento}
                  onChange={(e) => setFormData(prev => ({ ...prev, formaPagamento: e.target.value }))}
                >
                  {formasPagamento.map(fp => (
                    <option key={fp} value={fp}>{fp}</option>
                  ))}
                </select>
                <small className="form-help">Modalidade acordada para liquidação do atendimento.</small>
              </div>

              {/* Campo 14: Checkbox Notificação */}
              <div className="form-group flex-center-vertical">
                <label className="form-label">
                  Lembretes e Avisos Automáticos
                </label>
                <div className="notification-card-toggle">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="agdNotificar"
                      className="checkbox-custom"
                      checked={formData.notificar}
                      onChange={(e) => setFormData(prev => ({ ...prev, notificar: e.target.checked }))}
                    />
                    <label htmlFor="agdNotificar" className="notification-label">
                      <Bell size={18} className="text-emerald-600 flex-shrink-0" />
                      <div>
                        <strong>Enviar confirmação imediata por SMS e WhatsApp</strong>
                        <p>Dispara mensagem com data, horário, preparo e endereço.</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Campo 15: Anexo de Exame (File) */}
            <div className="form-group mt-3">
              <label htmlFor="agdAnexoExame" className="form-label">
                Encaminhamento Médico ou Exame Prévio (Opcional)
              </label>
              <div className="file-dropzone">
                <input
                  type="file"
                  id="agdAnexoExame"
                  accept=".pdf,image/*"
                  className="file-input-hidden"
                  onChange={handleFileChange}
                />
                <label htmlFor="agdAnexoExame" className="file-dropzone-label">
                  <div className="file-icon-box">
                    <Upload size={20} />
                  </div>
                  <div className="file-text-box">
                    <span className="file-title">
                      {fileName ? fileName : 'Clique para anexar arquivo de exame ou encaminhamento'}
                    </span>
                    <span className="file-subtitle">Formatos aceitos: PDF, JPG, PNG (laudos anteriores, raio-x, ecografia)</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Campo 16: Queixa Principal (Textarea) */}
            <div className="form-group mt-3">
              <label htmlFor="agdObservacoes" className="form-label">
                Queixa Principal e Motivo da Consulta <span className="required">*</span>
              </label>
              <textarea
                id="agdObservacoes"
                rows="3"
                className="form-control"
                placeholder="Descreva detalhadamente os sintomas relatados pelo paciente, tempo de evolução e queixas prévias..."
                value={formData.observacoes}
                onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                required
              />
              <small className="form-help">Informações clínicas lidas pelo médico antes do início da consulta.</small>
            </div>
          </div>

          {/* Barra de Ações */}
          <div className="form-actions-bar">
            <button type="submit" className="btn-primary">
              <Save size={18} />
              Confirmar e Agendar Consulta (16 Campos)
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
