import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Menu, Trash2, ShieldCheck, ChevronRight, CheckCircle2, RotateCcw } from 'lucide-react';

const TITULOS_ABAS = {
  'dashboard': {
    titulo: 'Visão Geral da Clínica',
    subtitulo: 'Painel executivo de monitoramento clínico e indicadores ergonômicos',
    crumb: 'Dashboard'
  },
  'cad-paciente': {
    titulo: 'Cadastro de Paciente',
    subtitulo: 'Abertura de prontuário (6 campos: text, date, tel, email, radio, switch)',
    crumb: 'Novo Paciente'
  },
  'cad-medico': {
    titulo: 'Cadastro de Profissional de Saúde',
    subtitulo: 'Credenciamento clínico (5 campos: text, select, number, color, file)',
    crumb: 'Novo Especialista'
  },
  'cad-agendamento': {
    titulo: 'Agendamento & Triagem Clínica',
    subtitulo: 'Marcação de consulta (5 campos: select, time, url, range, textarea)',
    crumb: 'Nova Consulta'
  },
  'registros': {
    titulo: 'Banco de Registros Cadastrados',
    subtitulo: 'Consulta detalhada, busca instantânea e gerenciamento dos registros em memória',
    crumb: 'Banco de Dados'
  },
  'ihc-info': {
    titulo: 'Mapeamento IHC • ISO 9241-17',
    subtitulo: 'Inventário completo dos 16 campos e 14 tipos de controles HTML5 distintos',
    crumb: 'Norma ISO 9241-17'
  }
};

export default function Header() {
  const { activeTab, resetAllData, toggleMobileMenu, pacientes, medicos, agendamentos } = useClinic();
  const info = TITULOS_ABAS[activeTab] || TITULOS_ABAS['dashboard'];
  const totalRegistros = pacientes.length + medicos.length + agendamentos.length;

  return (
    <header className="topbar">
      <div className="topbar-left">
        {/* Botão de Menu para Smartphone / Tablet */}
        <button
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Abrir menu de navegação"
        >
          <Menu size={22} />
        </button>

        <div className="topbar-title-block">
          {/* Breadcrumb Moderno */}
          <div className="topbar-breadcrumb">
            <span className="crumb-root">MedFlow Clinic</span>
            <ChevronRight size={13} className="crumb-separator" />
            <span className="current-crumb">{info.crumb}</span>
          </div>
          <h1>{info.titulo}</h1>
          <p>{info.subtitulo}</p>
        </div>
      </div>

      <div className="topbar-right">
        {/* Pill de Status do Sistema */}
        <div className="status-chip hidden-mobile">
          <span className="pulse-indicator">
            <span className="pulse-dot"></span>
            <span className="pulse-ring"></span>
          </span>
          <span className="status-text">Online • 14 Tipos HTML5</span>
        </div>

        {/* Contador Rápido de Registros */}
        <div className="records-count-chip hidden-mobile">
          <span className="count-label">Registros:</span>
          <span className="count-number">{totalRegistros}</span>
        </div>

        {/* Botão de Limpeza com Confirmação */}
        <button
          onClick={resetAllData}
          className="btn-outline-danger"
          title="Zerar dados locais salvos no navegador"
        >
          <Trash2 size={15} />
          <span>Resetar</span>
        </button>
      </div>
    </header>
  );
}
