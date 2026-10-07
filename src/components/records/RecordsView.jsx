import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { formatDateBR } from '../../utils/formatters';
import {
  Search,
  Eye,
  Trash2,
  UserPlus,
  Stethoscope,
  CalendarPlus,
  Users,
  Calendar,
  AlertCircle,
  Video,
  X,
  FileCheck
} from 'lucide-react';

export default function RecordsView() {
  const {
    pacientes,
    medicos,
    agendamentos,
    activeSubtab,
    setActiveSubtab,
    setSelectedDetail,
    deletePaciente,
    deleteMedico,
    deleteAgendamento,
    setActiveTab
  } = useClinic();

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPacientes = pacientes.filter(p =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.telefone.includes(searchTerm)
  );

  const filteredMedicos = medicos.filter(m =>
    m.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.registro.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.especialidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAgendamentos = agendamentos.filter(a =>
    a.pacienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.medicoNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.hora.includes(searchTerm)
  );

  const getInitials = (name) => {
    if (!name) return '??';
    const parts = name.replace(/^(Dr\.|Dra\.)\s*/i, '').trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="tab-pane active">
      <div className="records-container">
        {/* Cabeçalho da Lista */}
        <div className="records-header">
          <div className="records-title-group">
            <span className="form-header-badge">
              <span className="badge-dot"></span>
              Banco Local • Sincronizado com Formulários
            </span>
            <h2>Banco de Registros Cadastrados</h2>
            <p>Gerencie dados clínicos armazenados localmente com busca instantânea e filtros por categoria.</p>
          </div>

          <div className="records-controls-row">
            {/* Campo de Busca Rápida */}
            <div className="search-box-wrapper">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Buscar por nome, CRM ou contato..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button
                  className="search-clear-btn"
                  onClick={() => setSearchTerm('')}
                  aria-label="Limpar busca"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sub-abas de Alternância em Segmented Control */}
            <div className="records-filter-tabs">
              <button
                className={`subtab-btn ${activeSubtab === 'pacientes' ? 'active' : ''}`}
                onClick={() => setActiveSubtab('pacientes')}
              >
                <Users size={15} />
                <span>Pacientes</span>
                <span className="tab-counter-badge">{pacientes.length}</span>
              </button>
              <button
                className={`subtab-btn ${activeSubtab === 'medicos' ? 'active' : ''}`}
                onClick={() => setActiveSubtab('medicos')}
              >
                <Stethoscope size={15} />
                <span>Especialistas</span>
                <span className="tab-counter-badge">{medicos.length}</span>
              </button>
              <button
                className={`subtab-btn ${activeSubtab === 'agendamentos' ? 'active' : ''}`}
                onClick={() => setActiveSubtab('agendamentos')}
              >
                <Calendar size={15} />
                <span>Consultas</span>
                <span className="tab-counter-badge">{agendamentos.length}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TABELA 1: PACIENTES */}
        {/* ============================================================ */}
        {activeSubtab === 'pacientes' && (
          <div className="subtab-content active">
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Paciente</th>
                    <th>Nascimento</th>
                    <th>Contato (Telefone / E-mail)</th>
                    <th>Sexo</th>
                    <th>Plano / Convênio</th>
                    <th className="text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPacientes.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="empty-state">
                        <div className="empty-state-box">
                          <AlertCircle size={38} className="text-slate-300 mx-auto mb-2" />
                          <p className="font-semibold text-slate-700">Nenhum paciente localizado</p>
                          <span className="text-sm text-slate-500">
                            {searchTerm ? 'Tente refazer a busca com outro termo.' : 'Adicione o primeiro paciente preenchendo a ficha cadastral.'}
                          </span>
                          {!searchTerm && (
                            <button
                              onClick={() => setActiveTab('cad-paciente')}
                              className="btn-primary mt-3 inline-flex items-center gap-1.5"
                            >
                              <UserPlus size={15} /> <span>Cadastrar Paciente</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredPacientes.map(p => (
                      <tr key={p.id}>
                        <td>
                          <div className="user-avatar-cell">
                            <div className="avatar-circle avatar-blue">
                              {getInitials(p.nome)}
                            </div>
                            <div className="user-name-block">
                              <span className="font-bold text-slate-900">{p.nome}</span>
                              <span className="text-xs text-slate-500 font-mono">ID: {p.id}</span>
                            </div>
                          </div>
                        </td>
                        <td>{formatDateBR(p.dataNasc)}</td>
                        <td>
                          <div className="contact-cell">
                            <span className="font-medium text-slate-800 font-mono">{p.telefone}</span>
                            <span className="text-xs text-slate-500">{p.email}</span>
                          </div>
                        </td>
                        <td>
                          <span className="badge-tag badge-purple">
                            {p.sexo}
                          </span>
                        </td>
                        <td>
                          <span className={`badge-tag ${p.temConvenio ? 'badge-green' : 'badge-yellow'}`}>
                            {p.temConvenio ? 'Convênio Ativo' : 'Particular'}
                          </span>
                        </td>
                        <td className="text-right">
                          <div className="actions-cell">
                            <button
                              className="table-btn-action"
                              onClick={() => setSelectedDetail({ type: 'paciente', data: p })}
                              title="Ver ficha completa do paciente"
                            >
                              <Eye size={14} />
                              <span>Ficha</span>
                            </button>
                            <button
                              className="table-btn-action btn-danger-action"
                              onClick={() => {
                                if (window.confirm(`Tem certeza que deseja excluir o paciente "${p.nome}"?`)) {
                                  deletePaciente(p.id);
                                }
                              }}
                              title="Excluir paciente"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TABELA 2: MÉDICOS / ESPECIALISTAS */}
        {/* ============================================================ */}
        {activeSubtab === 'medicos' && (
          <div className="subtab-content active">
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Profissional</th>
                    <th>CRM / Registro</th>
                    <th>Especialidade</th>
                    <th>Experiência</th>
                    <th>Cor Agenda</th>
                    <th>Comprovante</th>
                    <th className="text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedicos.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="empty-state">
                        <div className="empty-state-box">
                          <AlertCircle size={38} className="text-slate-300 mx-auto mb-2" />
                          <p className="font-semibold text-slate-700">Nenhum profissional localizado</p>
                          <span className="text-sm text-slate-500">
                            {searchTerm ? 'Tente refazer a busca com outro termo.' : 'Cadastre um especialista para liberar a marcação de consultas.'}
                          </span>
                          {!searchTerm && (
                            <button
                              onClick={() => setActiveTab('cad-medico')}
                              className="btn-primary mt-3 inline-flex items-center gap-1.5"
                            >
                              <Stethoscope size={15} /> <span>Cadastrar Especialista</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredMedicos.map(m => (
                      <tr key={m.id}>
                        <td>
                          <div className="user-avatar-cell">
                            <div
                              className="avatar-circle"
                              style={{ backgroundColor: `${m.corAgenda}20`, color: m.corAgenda, borderColor: m.corAgenda }}
                            >
                              {getInitials(m.nome)}
                            </div>
                            <div className="user-name-block">
                              <span className="font-bold text-slate-900">{m.nome}</span>
                              <span className="text-xs text-slate-500 font-mono">ID: {m.id}</span>
                            </div>
                          </div>
                        </td>
                        <td><code className="code-badge">{m.registro}</code></td>
                        <td>
                          <span className="badge-tag badge-blue">
                            {m.especialidade}
                          </span>
                        </td>
                        <td>{m.experiencia} anos</td>
                        <td>
                          <div className="flex items-center gap-1.5">
                            <span className="color-dot" style={{ backgroundColor: m.corAgenda }}></span>
                            <span className="text-xs text-slate-500 font-mono">{m.corAgenda}</span>
                          </div>
                        </td>
                        <td>
                          <span className="badge-tag badge-gray">
                            {m.documento || 'Sem anexo'}
                          </span>
                        </td>
                        <td className="text-right">
                          <div className="actions-cell">
                            <button
                              className="table-btn-action"
                              onClick={() => setSelectedDetail({ type: 'medico', data: m })}
                              title="Ver ficha completa do médico"
                            >
                              <Eye size={14} />
                              <span>Ficha</span>
                            </button>
                            <button
                              className="table-btn-action btn-danger-action"
                              onClick={() => {
                                if (window.confirm(`Tem certeza que deseja excluir o profissional "${m.nome}"?`)) {
                                  deleteMedico(m.id);
                                }
                              }}
                              title="Excluir especialista"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TABELA 3: AGENDAMENTOS & CONSULTAS */}
        {/* ============================================================ */}
        {activeSubtab === 'agendamentos' && (
          <div className="subtab-content active">
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Horário</th>
                    <th>Paciente</th>
                    <th>Profissional</th>
                    <th>Teleconsulta (URL)</th>
                    <th>Dor (EVA)</th>
                    <th className="text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAgendamentos.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="empty-state">
                        <div className="empty-state-box">
                          <AlertCircle size={38} className="text-slate-300 mx-auto mb-2" />
                          <p className="font-semibold text-slate-700">Nenhum agendamento agendado</p>
                          <span className="text-sm text-slate-500">
                            {searchTerm ? 'Nenhum resultado com esse filtro.' : 'Agende a primeira consulta vinculando paciente e médico.'}
                          </span>
                          {!searchTerm && (
                            <button
                              onClick={() => setActiveTab('cad-agendamento')}
                              className="btn-primary mt-3 inline-flex items-center gap-1.5"
                            >
                              <CalendarPlus size={15} /> <span>Agendar Consulta</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredAgendamentos.map(a => (
                      <tr key={a.id}>
                        <td>
                          <strong className="text-slate-900 font-mono text-base">{a.hora}</strong>
                        </td>
                        <td>
                          <strong className="text-slate-800">{a.pacienteNome}</strong>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <span className="color-dot" style={{ backgroundColor: a.corMedico }}></span>
                            <div>
                              <span className="font-medium text-slate-800 block leading-tight">{a.medicoNome}</span>
                              <span className="text-xs text-slate-500">{a.especialidade}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <a
                            href={a.linkTeleconsulta}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline font-mono"
                          >
                            <Video size={13} />
                            <span>Acessar Sala</span>
                          </a>
                        </td>
                        <td>
                          <span className="font-bold text-slate-800 font-mono">
                            {a.nivelDor} / 10
                          </span>
                        </td>
                        <td className="text-right">
                          <div className="actions-cell">
                            <button
                              className="table-btn-action"
                              onClick={() => setSelectedDetail({ type: 'agendamento', data: a })}
                              title="Ver detalhes da consulta"
                            >
                              <Eye size={14} />
                              <span>Detalhes</span>
                            </button>
                            <button
                              className="table-btn-action btn-danger-action"
                              onClick={() => {
                                if (window.confirm(`Tem certeza que deseja cancelar o agendamento #${a.id}?`)) {
                                  deleteAgendamento(a.id);
                                }
                              }}
                              title="Cancelar agendamento"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
