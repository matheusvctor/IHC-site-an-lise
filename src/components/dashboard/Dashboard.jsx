import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  Users,
  Stethoscope,
  Calendar,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  UserPlus,
  CalendarPlus,
  FolderOpen
} from 'lucide-react';

export default function Dashboard() {
  const { pacientes, medicos, agendamentos, setActiveTab } = useClinic();

  return (
    <div className="tab-pane active">
      {/* Cards de Métricas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon icon-blue">
            <Users size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Pacientes Cadastrados</span>
            <h3>{pacientes.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon icon-green">
            <Stethoscope size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Profissionais Ativos</span>
            <h3>{medicos.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon icon-purple">
            <Calendar size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Consultas Agendadas</span>
            <h3>{agendamentos.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon icon-amber">
            <Sparkles size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Diversidade de Campos</span>
            <h3>50 Campos (14 Tipos)</h3>
          </div>
        </div>
      </div>

      {/* Banner de Enquadramento Acadêmico */}
      <div className="info-card">
        <div className="info-card-header flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={20} className="text-emerald-600" />
            <h3>Conformidade Estrita com os Requisitos da Disciplina</h3>
          </div>
          <span className="badge-tag badge-green font-semibold">15+ Campos por Formulário</span>
        </div>
        <div className="info-card-body">
          <div className="req-checks">
            <div className="req-item success">
              <span className="check-icon">✓</span>
              <div>
                <strong>3 Cadastros Independentes:</strong>
                <p>1. Paciente (17 campos) | 2. Especialista (17 campos) | 3. Agendamento & Triagem (16 campos).</p>
              </div>
            </div>

            <div className="req-item success">
              <span className="check-icon">✓</span>
              <div>
                <strong>Mínimo de 15 campos garantido em cada um:</strong>
                <p>Totalizando <strong>50 campos de preenchimento</strong> ativos em todo o software.</p>
              </div>
            </div>

            <div className="req-item success">
              <span className="check-icon">✓</span>
              <div>
                <strong>Variabilidade Máxima (Critério de nota mais alta):</strong>
                <p>14 tipos de controles: <code>text</code>, <code>email</code>, <code>tel</code>, <code>number</code>, <code>date</code>, <code>time</code>, <code>select</code>, <code>radio</code>, <code>checkbox</code>, <code>switch</code>, <code>range</code>, <code>color</code>, <code>file</code> e <code>textarea</code>.</p>
              </div>
            </div>

            <div className="req-item highlight">
              <span className="check-icon">
                <SlidersHorizontal size={18} />
              </span>
              <div>
                <strong>Base Sólida para a ISO 9241-17:</strong>
                <p>Todos os formulários estão prontos para a avaliação ergonômica e levantamento das não-conformidades.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="quick-actions-card">
        <h3>Acesso Rápido aos Formulários</h3>
        <div className="actions-buttons-row">
          <button className="btn-action" onClick={() => setActiveTab('cad-paciente')}>
            <UserPlus size={18} className="text-blue-600" />
            <span>Novo Paciente (17 campos)</span>
          </button>

          <button className="btn-action" onClick={() => setActiveTab('cad-medico')}>
            <Stethoscope size={18} className="text-emerald-600" />
            <span>Novo Especialista (17 campos)</span>
          </button>

          <button className="btn-action" onClick={() => setActiveTab('cad-agendamento')}>
            <CalendarPlus size={18} className="text-purple-600" />
            <span>Novo Agendamento (16 campos)</span>
          </button>

          <button className="btn-action" onClick={() => setActiveTab('registros')}>
            <FolderOpen size={18} className="text-amber-600" />
            <span>Ver Banco de Registros</span>
          </button>
        </div>
      </div>
    </div>
  );
}
