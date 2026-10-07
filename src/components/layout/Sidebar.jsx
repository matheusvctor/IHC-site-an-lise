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
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ClipboardList
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

  const primaryNavItems = [
    {
      id: 'dashboard',
      label: 'Visão Geral',
      icon: LayoutDashboard,
      desc: 'Métricas e atalhos rápidos'
    },
    {
      id: 'registros',
      label: 'Banco de Registros',
      icon: Database,
      badge: `${pacientes.length + medicos.length + agendamentos.length}`,
      desc: 'Gerenciamento local'
    }
  ];

  const formNavItems = [
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
    }
  ];

  const complianceNavItems = [
    {
      id: 'ihc-info',
      label: 'Mapeamento ISO 9241-17',
      icon: FileSpreadsheet,
      badge: '50 campos',
      desc: 'Inventário ergonômico'
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
        {/* Topo do Menu / Identidade Visual */}
        <div className="sidebar-header">
          <div className="brand-logo" onClick={() => setActiveTab('dashboard')} style={{ cursor: 'pointer' }}>
            <div className="logo-icon-box">
              <Activity size={22} className="logo-svg" />
            </div>
            <div className="brand-info">
              <div className="brand-name-row">
                <h2>MedFlow</h2>
                <span className="brand-version-pill">CLINIC OS</span>
              </div>
              <span className="badge-ihc">IHC • ISO 9241-17</span>
            </div>
          </div>

          <button
            className="mobile-close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Fechar menu de navegação"
          >
            <X size={20} />
          </button>
        </div>

        {/* Lista de Navegação Estruturada por Seções */}
        <nav className="sidebar-nav">
          <div className="nav-section-title">PAINEL & REGISTROS</div>
          {primaryNavItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  if (isMobileMenuOpen) setIsMobileMenuOpen(false);
                }}
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

          <div className="nav-section-title mt-4">FORMULÁRIOS DE CADASTRO (15+ CAMPOS)</div>
          {formNavItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  if (isMobileMenuOpen) setIsMobileMenuOpen(false);
                }}
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

          <div className="nav-section-title mt-4">AVALIAÇÃO & CONFORMIDADE</div>
          {complianceNavItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  if (isMobileMenuOpen) setIsMobileMenuOpen(false);
                }}
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

        {/* Rodapé da Barra Lateral */}
        <div className="sidebar-footer">
          <div className="student-info-card">
            <div className="student-info-header">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>Conformidade ISO 9241-17</span>
            </div>
            <div className="student-info-body">
              <div className="metric-row">
                <span className="metric-label">Total de Campos:</span>
                <span className="metric-value">50 (14 tipos)</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Por Formulário:</span>
                <span className="metric-badge">15+ campos</span>
              </div>
            </div>
            <button
              onClick={loadDemoData}
              className="btn-demo-data"
              title="Restaurar dados de teste demonstrativos"
            >
              <RotateCcw size={13} />
              <span>Carregar Dados Demo</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
