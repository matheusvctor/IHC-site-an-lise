import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { formatDateBR } from '../../utils/formatters';
import { X, FileText, CheckCircle2 } from 'lucide-react';

export default function DetailModal() {
  const { selectedDetail, setSelectedDetail } = useClinic();

  if (!selectedDetail) return null;

  const { type, data } = selectedDetail;

  let title = 'Ficha Completa do Registro';
  let rows = [];

  if (type === 'paciente') {
    title = `Ficha do Paciente: ${data.nome}`;
    rows = [
      { label: 'Nome Completo', value: data.nome },
      { label: 'Nome Social', value: data.nomeSocial || 'Não informado' },
      { label: 'CPF', value: data.cpf },
      { label: 'Data de Nascimento', value: formatDateBR(data.dataNasc) },
      { label: 'Sexo Biológico', value: data.sexo },
      { label: 'Estado Civil', value: data.estadoCivil || 'Não informado' },
      { label: 'E-mail', value: data.email },
      { label: 'Telefone Celular', value: data.telefone },
      { label: 'Telefone de Emergência', value: data.telEmergencia || 'Não informado' },
      { label: 'Contato de Emergência', value: data.contatoEmergencia || 'Não informado' },
      { label: 'Endereço Residencial', value: data.endereco || 'Não informado' },
      { label: 'Tipo Sanguíneo & RH', value: data.tipoSanguineo || 'Não informado' },
      { label: 'Plano de Saúde', value: data.temConvenio ? 'Sim (Convênio Ativo)' : 'Não (Particular)' },
      { label: 'Carteirinha do Convênio', value: data.numCarteirinha || 'Não se aplica' },
      {
        label: 'Condições / Alergias',
        value: Array.isArray(data.condicoes)
          ? (data.condicoes.length ? data.condicoes.join(', ') : 'Nenhuma relatada')
          : (data.condicoes || 'Nenhuma')
      },
      { label: 'Documento Anexado', value: data.documento || 'Nenhum' },
      { label: 'Observações do Prontuário', value: data.observacoesGerais || 'Sem observações especiais.' },
      { label: 'Data do Cadastro', value: data.criadoEm || '-' }
    ];
  } else if (type === 'medico') {
    title = `Ficha do Profissional: ${data.titulacao || 'Dr.'} ${data.nome}`;
    rows = [
      { label: 'Nome Completo', value: data.nome },
      { label: 'Titulação', value: data.titulacao || 'Dr.' },
      { label: 'Registro de Conselho', value: `${data.registro} (${data.ufConselho || 'SP'})` },
      { label: 'Especialidade Principal', value: data.especialidade },
      { label: 'Subespecialidade / Foco', value: data.subespecialidade || 'Geral' },
      { label: 'E-mail Institucional', value: data.email },
      { label: 'Telefone / Ramal', value: data.telefone || 'Não informado' },
      { label: 'Experiência Clínica', value: typeof data.experiencia === 'number' ? `${data.experiencia} anos` : data.experiencia },
      { label: 'Disponibilidade Plantão', value: typeof data.disponibilidade === 'number' ? `Nível ${data.disponibilidade}` : data.disponibilidade },
      {
        label: 'Cor na Agenda',
        value: (
          <span className="flex items-center gap-2">
            <span className="color-dot" style={{ backgroundColor: data.corAgenda }}></span>
            <code className="font-mono text-xs">{data.corAgenda}</code>
          </span>
        )
      },
      { label: 'Dias de Atendimento', value: Array.isArray(data.dias) ? data.dias.join(', ') : data.dias },
      { label: 'Turno Principal', value: data.turno || 'Integral' },
      { label: 'Valor da Consulta', value: `R$ ${data.valorConsulta}` },
      { label: 'Atendimento por Telemedicina', value: data.aceitaTeleconsulta ? 'Sim (Habilitado)' : 'Não (Apenas Presencial)' },
      { label: 'Comprovante / RQE', value: data.documentoRegistro || 'Não anexado' },
      { label: 'Resumo Curricular', value: data.biografia || 'Sem biografia informada.' },
      { label: 'Data de Cadastro', value: data.criadoEm || '-' }
    ];
  } else if (type === 'agendamento') {
    title = `Ficha de Agendamento: #${data.id}`;
    rows = [
      { label: 'Paciente', value: data.pacienteNome },
      { label: 'Profissional Responsável', value: `${data.medicoNome} (${data.especialidade})` },
      { label: 'Data e Horário', value: `${formatDateBR(data.data)} às ${data.hora}` },
      { label: 'Duração da Sessão', value: `${data.duracaoMin || 30} minutos` },
      { label: 'Modalidade', value: data.tipo },
      { label: 'Formato da Consulta', value: data.formato || 'Presencial no Consultório' },
      { label: 'Sala / Consultório', value: data.consultorio || 'Consultório 101' },
      { label: 'Nível de Dor (Escala EVA)', value: `${data.nivelDor} / 10` },
      { label: 'Classificação Manchester', value: data.prioridade },
      { label: 'Pressão Arterial (Triagem)', value: data.pressaoArterial ? `${data.pressaoArterial} mmHg` : 'Não aferida' },
      { label: 'Temperatura Corporal', value: data.temperatura ? `${data.temperatura} °C` : 'Não aferida' },
      { label: 'Forma de Pagamento', value: data.formaPagamento || 'Não informada' },
      { label: 'Lembrete Automático', value: data.notificar ? 'Sim (SMS + WhatsApp)' : 'Não' },
      { label: 'Anexo de Exame', value: data.anexo || 'Nenhum' },
      { label: 'Queixa Principal / Motivo', value: data.observacoes },
      { label: 'Data do Agendamento', value: data.criadoEm || '-' }
    ];
  }

  return (
    <div className="modal-backdrop" onClick={() => setSelectedDetail(null)}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-blue-600" />
            <h3>{title}</h3>
          </div>
          <button
            onClick={() => setSelectedDetail(null)}
            className="modal-close"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {rows.map((row, idx) => (
            <div key={idx} className="detail-row">
              <div className="detail-label">{row.label}:</div>
              <div className="detail-value">{row.value}</div>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button onClick={() => setSelectedDetail(null)} className="btn-primary">
            Fechar Visualização
          </button>
        </div>
      </div>
    </div>
  );
}
