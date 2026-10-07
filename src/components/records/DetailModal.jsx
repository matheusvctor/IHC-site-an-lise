import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { formatDateBR } from '../../utils/formatters';
import { X, FileText, User, Stethoscope, Calendar, CheckCircle2 } from 'lucide-react';

export default function DetailModal() {
  const { selectedDetail, setSelectedDetail } = useClinic();

  if (!selectedDetail) return null;

  const { type, data } = selectedDetail;

  let title = 'Ficha Completa do Registro';
  let badgeText = 'Registro Local';
  let IconComponent = FileText;
  let rows = [];

  if (type === 'paciente') {
    title = `Ficha do Paciente: ${data.nome}`;
    badgeText = 'Prontuário de Paciente';
    IconComponent = User;
    rows = [
      { label: 'Nome Completo', value: data.nome },
      { label: 'Nome Social / Preferencial', value: data.nomeSocial || 'Não informado' },
      { label: 'CPF do Paciente', value: <code className="code-badge">{data.cpf}</code> },
      { label: 'Data de Nascimento', value: formatDateBR(data.dataNasc) },
      { label: 'Sexo Biológico', value: data.sexo },
      { label: 'Estado Civil', value: data.estadoCivil || 'Não informado' },
      { label: 'E-mail de Contato', value: data.email },
      { label: 'Telefone Celular / WhatsApp', value: data.telefone },
      { label: 'Telefone de Emergência', value: data.telEmergencia || 'Não informado' },
      { label: 'Contato de Emergência', value: data.contatoEmergencia || 'Não informado' },
      { label: 'Endereço Residencial', value: data.endereco || 'Não informado' },
      { label: 'Tipo Sanguíneo & Fator RH', value: <span className="badge-tag badge-purple font-mono">{data.tipoSanguineo || 'N/I'}</span> },
      {
        label: 'Plano de Saúde / Convênio',
        value: (
          <span className={`badge-tag ${data.temConvenio ? 'badge-green' : 'badge-yellow'}`}>
            {data.temConvenio ? 'Convênio Ativo' : 'Atendimento Particular'}
          </span>
        )
      },
      { label: 'Carteirinha do Convênio', value: data.numCarteirinha ? <code className="code-badge">{data.numCarteirinha}</code> : 'Não se aplica' },
      {
        label: 'Condições / Alergias',
        value: Array.isArray(data.condicoes)
          ? (data.condicoes.length ? data.condicoes.join(', ') : 'Nenhuma relatada')
          : (data.condicoes || 'Nenhuma')
      },
      { label: 'Documento Anexado', value: data.documento || 'Nenhum documento' },
      { label: 'Observações do Prontuário', value: data.observacoesGerais || 'Sem anotações complementares.' },
      { label: 'Data do Cadastro', value: data.criadoEm || '-' }
    ];
  } else if (type === 'medico') {
    title = `Ficha do Especialista: ${data.titulacao || 'Dr.'} ${data.nome}`;
    badgeText = 'Corpo Clínico';
    IconComponent = Stethoscope;
    rows = [
      { label: 'Nome Completo', value: data.nome },
      { label: 'Titulação Oficial', value: data.titulacao || 'Dr.' },
      { label: 'Registro de Conselho (CRM)', value: <code className="code-badge">{data.registro} ({data.ufConselho || 'SP'})</code> },
      { label: 'Especialidade Principal', value: <span className="badge-tag badge-blue">{data.especialidade}</span> },
      { label: 'Subespecialidade / Foco', value: data.subespecialidade || 'Clínica Geral' },
      { label: 'E-mail Institucional', value: data.email },
      { label: 'Telefone / Ramal Interno', value: data.telefone || 'Não informado' },
      { label: 'Experiência Clínica', value: typeof data.experiencia === 'number' ? `${data.experiencia} anos` : data.experiencia },
      { label: 'Disponibilidade de Plantão', value: typeof data.disponibilidade === 'number' ? `Nível ${data.disponibilidade}` : data.disponibilidade },
      {
        label: 'Cor na Agenda',
        value: (
          <div className="flex items-center gap-2">
            <span className="color-dot" style={{ backgroundColor: data.corAgenda }}></span>
            <code className="font-mono text-xs">{data.corAgenda}</code>
          </div>
        )
      },
      { label: 'Dias de Atendimento Presencial', value: Array.isArray(data.dias) ? data.dias.join(', ') : data.dias },
      { label: 'Turno Principal', value: data.turno || 'Integral' },
      { label: 'Valor da Consulta', value: <strong className="font-mono">R$ {data.valorConsulta}</strong> },
      {
        label: 'Habilitado para Telemedicina',
        value: (
          <span className={`badge-tag ${data.aceitaTeleconsulta ? 'badge-green' : 'badge-gray'}`}>
            {data.aceitaTeleconsulta ? 'Sim (Teleconsulta Ativa)' : 'Não (Apenas Presencial)'}
          </span>
        )
      },
      { label: 'Comprovante / Certificado RQE', value: data.documentoRegistro || 'Não anexado' },
      { label: 'Resumo Curricular / Mini-bio', value: data.biografia || 'Sem biografia informada.' },
      { label: 'Data de Cadastro', value: data.criadoEm || '-' }
    ];
  } else if (type === 'agendamento') {
    title = `Ficha do Agendamento: #${data.id}`;
    badgeText = 'Consulta & Triagem';
    IconComponent = Calendar;
    rows = [
      { label: 'Paciente', value: <strong>{data.pacienteNome}</strong> },
      { label: 'Profissional Responsável', value: `${data.medicoNome} (${data.especialidade})` },
      { label: 'Data e Horário de Início', value: `${formatDateBR(data.data)} às ${data.hora}` },
      { label: 'Duração Estimada', value: `${data.duracaoMin || 30} minutos` },
      { label: 'Modalidade do Atendimento', value: <span className="badge-tag badge-blue">{data.tipo}</span> },
      { label: 'Formato da Sessão', value: data.formato || 'Presencial no Consultório' },
      { label: 'Sala / Consultório Designado', value: data.consultorio || 'Consultório 101' },
      { label: 'Nível de Dor (Escala EVA)', value: <strong className="font-mono">{data.nivelDor} / 10</strong> },
      { label: 'Classificação Manchester', value: <span className="badge-tag badge-yellow">{data.prioridade}</span> },
      { label: 'Pressão Arterial Aferida', value: data.pressaoArterial ? `${data.pressaoArterial} mmHg` : 'Não aferida' },
      { label: 'Temperatura Corporal', value: data.temperatura ? `${data.temperatura} °C` : 'Não aferida' },
      { label: 'Forma de Pagamento', value: data.formaPagamento || 'Não informada' },
      { label: 'Confirmação por WhatsApp/SMS', value: data.notificar ? 'Sim (Ativada)' : 'Não' },
      { label: 'Encaminhamento / Exame Prévio', value: data.anexo || 'Nenhum' },
      { label: 'Queixa Principal do Paciente', value: data.observacoes },
      { label: 'Data de Registro', value: data.criadoEm || '-' }
    ];
  }

  return (
    <div className="modal-backdrop" onClick={() => setSelectedDetail(null)}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <IconComponent size={20} className="text-blue-600" />
            </div>
            <div>
              <span className="modal-badge-subtitle">{badgeText}</span>
              <h3>{title}</h3>
            </div>
          </div>
          <button
            onClick={() => setSelectedDetail(null)}
            className="modal-close"
            aria-label="Fechar janela"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="detail-rows-container">
            {rows.map((row, idx) => (
              <div key={idx} className="detail-row">
                <div className="detail-label">{row.label}</div>
                <div className="detail-value">{row.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={() => setSelectedDetail(null)} className="btn-primary">
            <span>Concluir Leitura</span>
          </button>
        </div>
      </div>
    </div>
  );
}
