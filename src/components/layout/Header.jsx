import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Menu, Trash2, ChevronRight } from 'lucide-react';

const TITULOS_ABAS = {
  'dashboard': {
    titulo: 'Visão Geral',
    crumb: 'Dashboard'
  },
  'cad-paciente': {
    titulo: 'Cadastro de Paciente',
    crumb: 'Novo Paciente'
  },
  'cad-medico': {
    titulo: 'Cadastro de Especialista',
    crumb: 'Novo Especialista'
  },
  'cad-agendamento': {
    titulo: 'Agendamento de Consulta',
    crumb: 'Nova Consulta'
  },
  'registros': {
    titulo: 'Banco de Registros',
    crumb: 'Registros'
  },
  'ihc-info': {
    titulo: 'Mapeamento ISO 9241-17',
    crumb: 'Norma ISO'
  }
};

export default function Header() {
  const { activeTab, resetAllData, toggleMobileMenu, pacientes, medicos, agendamentos } = useClinic();
  const info = TITULOS_ABAS[activeTab] || TITULOS_ABAS['dashboard'];
  const totalRegistros = pacientes.length + medicos.length + agendamentos.length;

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          <Menu size={20} />
        </button>

        <div className="topbar-title-block">
          <div className="topbar-breadcrumb">
            <span className="crumb-root">MedFlow</span>
            <ChevronRight size={13} className="crumb-separator" />
            <span className="current-crumb">{info.crumb}</span>
          </div>
          <h1>{info.titulo}</h1>
        </div>
      </div>

      <div className="topbar-right">
        <div className="status-chip hidden-mobile">
          <span className="pulse-indicator">
            <span className="pulse-dot"></span>
            <span className="pulse-ring"></span>
          </span>
          <span className="status-text">Online</span>
        </div>

        <div className="records-count-chip hidden-mobile">
          <span className="count-label">Salvos:</span>
          <span className="count-number">{totalRegistros}</span>
        </div>

        <button
          onClick={resetAllData}
          className="btn-outline-danger"
          title="Zerar dados"
        >
          <Trash2 size={15} />
          <span>Limpar</span>
        </button>
      </div>
    </header>
  );
}
