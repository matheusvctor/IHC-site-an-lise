import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { formatDateBR } from '../../utils/formatters';
import { X, FileText, User, Stethoscope, Calendar } from 'lucide-react';

export default function DetailModal() {
  const { selectedDetail, setSelectedDetail } = useClinic();

  if (!selectedDetail) return null;

  const { type, data } = selectedDetail;

  let title = 'Ficha do Registro';
  let IconComponent = FileText;
  let rows = [];

  if (type === 'paciente') {
    title = `Paciente: ${data.nome}`;
    IconComponent = User;
    rows = [
      { label: 'Nome Completo', value: data.nome },
      { label: 'Data de Nascimento', value: formatDateBR(data.dataNasc) },
      { label: 'Telefone Celular', value: <span className="font-mono">{data.telefone}</span> },
      { label: 'E-mail', value: data.email },
      { label: 'Sexo Biológico', value: <span className="badge-tag badge-purple">{data.sexo}</span> },
      {
        label: 'Plano / Convênio',
        value: (
          <span className={`badge-tag ${data.temConvenio ? 'badge-green' : 'badge-yellow'}`}>
            {data.temConvenio ? 'Convênio Ativo' : 'Particular'}
          </span>
        )
      },
      { label: 'Data do Cadastro', value: data.criadoEm || '-' }
    ];
  } else if (type === 'medico') {
    title = `Especialista: ${data.nome}`;
    IconComponent = Stethoscope;
    rows = [
      { label: 'Nome do Especialista', value: data.nome },
      { label: 'Registro de Conselho', value: <code className="code-badge">{data.registro}</code> },
      { label: 'Especialidade', value: <span className="badge-tag badge-blue">{data.especialidade}</span> },
      { label: 'Experiência', value: `${data.experiencia} anos` },
      {
        label: 'Cor na Agenda',
        value: (
          <div className="flex items-center gap-2">
            <span className="color-dot" style={{ backgroundColor: data.corAgenda }}></span>
            <code className="font-mono text-xs">{data.corAgenda}</code>
          </div>
        )
      },
      { label: 'Comprovante / RQE', value: data.documento || 'Sem anexo' },
      { label: 'Data de Cadastro', value: data.criadoEm || '-' }
    ];
  } else if (type === 'agendamento') {
    title = `Consulta #${data.id}`;
    IconComponent = Calendar;
    rows = [
      { label: 'Paciente', value: <strong>{data.pacienteNome}</strong> },
      { label: 'Especialista', value: `${data.medicoNome} (${data.especialidade})` },
      { label: 'Horário', value: <strong className="font-mono text-base">{data.hora}</strong> },
      {
        label: 'Sala Virtual',
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
      { label: 'Dor Relatada', value: <strong className="font-mono">{data.nivelDor} / 10</strong> },
      { label: 'Queixa Principal', value: data.observacoes },
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
            <span>Fechar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
