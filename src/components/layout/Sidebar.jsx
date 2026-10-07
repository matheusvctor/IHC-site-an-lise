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
  X
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
      section: 'MENU PRINCIPAL',
      items: [
        { id: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard },
        { id: 'registros', label: 'Banco de Registros', icon: Database, badge: `${pacientes.length + medicos.length + agendamentos.length}` }
      ]
    },
    {
      section: 'FORMULÁRIOS',
      items: [
        { id: 'cad-paciente', label: 'Novo Paciente', icon: UserPlus },
        { id: 'cad-medico', label: 'Novo Especialista', icon: Stethoscope },
        { id: 'cad-agendamento', label: 'Novo Agendamento', icon: CalendarPlus }
      ]
    },
    {
      section: 'CONFORMIDADE',
      items: [
        { id: 'ihc-info', label: 'Norma ISO 9241-17', icon: FileSpreadsheet }
      ]
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
        {/* Identidade Visual Direta e Limpa */}
        <div className="sidebar-header">
          <div className="brand-logo" onClick={() => setActiveTab('dashboard')} style={{ cursor: 'pointer' }}>
            <div className="logo-icon-box">
              <Activity size={22} className="logo-svg" />
            </div>
            <div className="brand-info">
              <h2>MedFlow</h2>
              <span className="badge-ihc">Gestão Clínica</span>
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

        {/* Navegação Limpa */}
        <nav className="sidebar-nav">
          {navItems.map((group, gIdx) => (
            <div key={gIdx} className="nav-group">
              <div className="nav-section-title">{group.section}</div>
              {group.items.map(item => {
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
                    <span className="nav-label">{item.label}</span>
                    {item.badge && <span className="field-count">{item.badge}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Rodapé Minimalista */}
        <div className="sidebar-footer">
          <button
            onClick={loadDemoData}
            className="btn-demo-data"
            title="Recarregar dados de exemplo"
          >
            <RotateCcw size={14} />
            <span>Carregar Dados de Exemplo</span>
          </button>
        </div>
      </aside>
    </>
  );
}
