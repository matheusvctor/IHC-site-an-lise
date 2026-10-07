import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  Users,
  Stethoscope,
  Calendar,
  Sparkles,
  UserPlus,
  CalendarPlus,
  ArrowRight,
  Database
} from 'lucide-react';

export default function Dashboard() {
  const { pacientes, medicos, agendamentos, setActiveTab } = useClinic();

  const cardsMetricas = [
    {
      titulo: 'Pacientes Cadastrados',
      valor: pacientes.length,
      icon: Users,
      cor: 'blue'
    },
    {
      titulo: 'Especialistas Ativos',
      valor: medicos.length,
      icon: Stethoscope,
      cor: 'emerald'
    },
    {
      titulo: 'Consultas Marcadas',
      valor: agendamentos.length,
      icon: Calendar,
      cor: 'purple'
    },
    {
      titulo: 'Controles HTML5 Distintos',
      valor: '14 Tipos',
      icon: Sparkles,
      cor: 'amber'
    }
  ];

  return (
    <div className="tab-pane active">
      {/* Grade de Métricas Limpa */}
      <div className="stats-grid">
        {cardsMetricas.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className={`stat-card stat-${m.cor}`}>
              <div className="stat-card-top">
                <div className={`stat-icon-wrapper icon-bg-${m.cor}`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="stat-details">
                <span className="stat-label">{m.titulo}</span>
                <h3 className="stat-number">{m.valor}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ações Rápidas */}
      <div className="quick-actions-section">
        <div className="section-header-row">
          <h3>Acesso Rápido aos Formulários</h3>
        </div>

        <div className="actions-cards-grid">
          <div className="action-card-tile" onClick={() => setActiveTab('cad-paciente')}>
            <div className="tile-icon-box bg-blue-subtle text-blue-600">
              <UserPlus size={20} />
            </div>
            <div className="tile-info">
              <h4>Novo Paciente</h4>
              <p>Cadastre identificação e contato</p>
            </div>
            <div className="tile-arrow">
              <ArrowRight size={18} />
            </div>
          </div>

          <div className="action-card-tile" onClick={() => setActiveTab('cad-medico')}>
            <div className="tile-icon-box bg-emerald-subtle text-emerald-600">
              <Stethoscope size={20} />
            </div>
            <div className="tile-info">
              <h4>Novo Especialista</h4>
              <p>Credenciamento de profissionais</p>
            </div>
            <div className="tile-arrow">
              <ArrowRight size={18} />
            </div>
          </div>

          <div className="action-card-tile" onClick={() => setActiveTab('cad-agendamento')}>
            <div className="tile-icon-box bg-purple-subtle text-purple-600">
              <CalendarPlus size={20} />
            </div>
            <div className="tile-info">
              <h4>Novo Agendamento</h4>
              <p>Marcação e triagem preliminar</p>
            </div>
            <div className="tile-arrow">
              <ArrowRight size={18} />
            </div>
          </div>

          <div className="action-card-tile" onClick={() => setActiveTab('registros')}>
            <div className="tile-icon-box bg-amber-subtle text-amber-600">
              <Database size={20} />
            </div>
            <div className="tile-info">
              <h4>Banco de Registros</h4>
              <p>Consulte todos os dados gravados</p>
            </div>
            <div className="tile-arrow">
              <ArrowRight size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
