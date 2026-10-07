import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  LayoutDashboard,
  UserPlus,
  Stethoscope,
  CalendarPlus,
  Database,
  FileSpreadsheet,
  Activity,
  RotateCcw,
  X,
  Sparkles
} from 'lucide-react';

export default function Sidebar() {
  const {
    activeTab,
    setActiveTab,
    pacientes,
    medicos,
    agendamentos,
    loadDemoData,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useClinic();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Visão Geral',
      icon: LayoutDashboard,
      desc: 'Métricas e atalhos'
    },
    {
      id: 'cad-paciente',
      label: 'Novo Paciente',
      icon: UserPlus,
      badge: '17 campos',
      desc: 'Identificação e saúde'
    },
    {
      id: 'cad-medico',
      label: 'Novo Especialista',
      icon: Stethoscope,
      badge: '17 campos',
      desc: 'Corpo clínico e escala'
    },
    {
      id: 'cad-agendamento',
      label: 'Novo Agendamento',
      icon: CalendarPlus,
      badge: '16 campos',
      desc: 'Consultas e triagem'
    },
    {
      id: 'registros',
      label: 'Banco de Registros',
      icon: Database,
      badge: `${pacientes.length + medicos.length + agendamentos.length}`,
      desc: 'Consulta e gestão local'
    },
    {
      id: 'ihc-info',
      label: 'Mapeamento ISO 9241-17',
      icon: FileSpreadsheet,
      badge: '50 campos',
      desc: 'Inventário da norma'
    }
  ];

  return (
    <>
      {isMobileMenuOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand-logo">
            <div className="logo-icon-box">
              <Activity size={22} className="text-cyan-400" />
            </div>
            <div className="brand-info">
              <h2>MedFlow</h2>
              <span className="badge-ihc">IHC • ISO 9241-17</span>
            </div>
          </div>

          <button
            className="mobile-close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">Menu Principal</div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <div className="nav-item-icon-wrapper">
                  <Icon size={18} />
                </div>
                <div className="nav-item-text">
                  <span className="nav-label">{item.label}</span>
                  <span className="nav-desc">{item.desc}</span>
                </div>
                {item.badge && <span className="field-count">{item.badge}</span>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="student-info-card">
            <div className="student-info-header">
              <Sparkles size={14} className="text-cyan-400" />
              <span>Requisitos IHC Atendidos</span>
            </div>
            <p><strong>Disciplina:</strong> IHC</p>
            <p><strong>Total Geral:</strong> 50 campos (14 tipos)</p>
            <p><strong>Mínimo:</strong> 15+ campos em CADA formulário</p>
            <button
              onClick={loadDemoData}
              className="btn-secondary-sm flex items-center justify-center gap-1.5"
              title="Restaurar dados de teste demonstrativos"
            >
              <RotateCcw size={13} />
              Carregar Dados Exemplo
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
