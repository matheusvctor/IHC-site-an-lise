import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { formatDateBR } from '../../utils/formatters';
import { X, FileText, User, Stethoscope, Calendar, Video, CheckCircle2 } from 'lucide-react';

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
    badgeText = 'Cadastro 01 • Paciente (6 Campos)';
    IconComponent = User;
    rows = [
      { label: 'Nome Completo (text)', value: data.nome },
      { label: 'Data de Nascimento (date)', value: formatDateBR(data.dataNasc) },
      { label: 'Telefone Celular (tel)', value: <span className="font-mono">{data.telefone}</span> },
      { label: 'E-mail de Contato (email)', value: data.email },
      { label: 'Sexo Biológico (radio)', value: <span className="badge-tag badge-purple">{data.sexo}</span> },
      {
        label: 'Plano / Convênio (checkbox)',
        value: (
          <span className={`badge-tag ${data.temConvenio ? 'badge-green' : 'badge-yellow'}`}>
            {data.temConvenio ? 'Convênio Ativo' : 'Atendimento Particular'}
          </span>
        )
      },
      { label: 'Data do Cadastro', value: data.criadoEm || '-' }
    ];
  } else if (type === 'medico') {
    title = `Ficha do Profissional: ${data.nome}`;
    badgeText = 'Cadastro 02 • Especialista (5 Campos)';
    IconComponent = Stethoscope;
    rows = [
      { label: 'Nome do Especialista (text)', value: data.nome },
      { label: 'Registro de Conselho (text)', value: <code className="code-badge">{data.registro}</code> },
      { label: 'Especialidade Médica (select)', value: <span className="badge-tag badge-blue">{data.especialidade}</span> },
      { label: 'Experiência Clínica (number)', value: `${data.experiencia} anos` },
      {
        label: 'Cor na Agenda (color)',
        value: (
          <div className="flex items-center gap-2">
            <span className="color-dot" style={{ backgroundColor: data.corAgenda }}></span>
            <code className="font-mono text-xs">{data.corAgenda}</code>
          </div>
        )
      },
      { label: 'Comprovante / RQE (file)', value: data.documento || 'Sem anexo' },
      { label: 'Data de Cadastro', value: data.criadoEm || '-' }
    ];
  } else if (type === 'agendamento') {
    title = `Ficha do Agendamento: #${data.id}`;
    badgeText = 'Cadastro 03 • Consulta & Triagem (5 Campos)';
    IconComponent = Calendar;
    rows = [
      { label: 'Paciente (select)', value: <strong>{data.pacienteNome}</strong> },
      { label: 'Profissional Responsável (select)', value: `${data.medicoNome} (${data.especialidade})` },
      { label: 'Horário de Início (time)', value: <strong className="font-mono text-base">{data.hora}</strong> },
      {
        label: 'Sala Virtual (url)',
        value: (
          <a
            href={data.linkTeleconsulta}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-mono text-xs"
          >
            {data.linkTeleconsulta}
          </a>
        )
      },
      { label: 'Nível de Dor EVA (range)', value: <strong className="font-mono">{data.nivelDor} / 10</strong> },
      { label: 'Queixa Principal (textarea)', value: data.observacoes },
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
                <div className="detail-label">{row.label}:</div>
                <div className="detail-value">{row.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={() => setSelectedDetail(null)} className="btn-primary">
            <span>Fechar Visualização</span>
          </button>
        </div>
      </div>
    </div>
  );
}
