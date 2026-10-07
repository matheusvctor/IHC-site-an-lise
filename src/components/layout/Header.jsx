import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Menu, Trash2, ShieldCheck, ChevronRight } from 'lucide-react';

const TITULOS_ABAS = {
  'dashboard': {
    titulo: 'Visão Geral da Clínica',
    subtitulo: 'Painel de controle e status geral dos atendimentos clínicos',
    crumb: 'Dashboard'
  },
  'cad-paciente': {
    titulo: 'Cadastro de Paciente',
    subtitulo: 'Abertura de prontuário, identificação civil e cobertura médica',
    crumb: 'Novo Paciente'
  },
  'cad-medico': {
    titulo: 'Cadastro de Profissional de Saúde',
    subtitulo: 'Credenciamento, especialidade clínica e agenda de plantão',
    crumb: 'Novo Especialista'
  },
  'cad-agendamento': {
    titulo: 'Agendamento & Triagem Clínica',
    subtitulo: 'Marcação de consultas com escala de dor e prioridade Manchester',
    crumb: 'Nova Consulta'
  },
  'registros': {
    titulo: 'Banco de Registros Cadastrados',
    subtitulo: 'Consulta, busca instantânea e gerenciamento dos dados gravados',
    crumb: 'Registros'
  },
  'ihc-info': {
    titulo: 'Mapeamento IHC • ISO 9241-17',
    subtitulo: 'Inventário completo dos 29 campos e preparação para avaliação ergonômica',
    crumb: 'Norma ISO'
  }
};

export default function Header() {
  const { activeTab, resetAllData, toggleMobileMenu } = useClinic();
  const info = TITULOS_ABAS[activeTab] || TITULOS_ABAS['dashboard'];

  return (
    <header className="topbar">
      <div className="topbar-left">
        {/* Botão Hambúrguer para telas menores */}
        <button
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Abrir menu de navegação"
        >
          <Menu size={22} />
        </button>

        <div className="topbar-title-block">
          {/* Breadcrumb Elegante */}
          <div className="topbar-breadcrumb">
            <span>MedFlow</span>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="current-crumb">{info.crumb}</span>
          </div>
          <h1>{info.titulo}</h1>
          <p>{info.subtitulo}</p>
        </div>
      </div>

      <div className="topbar-right">
        {/* Status Chip */}
        <div className="status-chip hidden-mobile">
          <span className="status-dot"></span>
          <span>Prontuário Ativo</span>
        </div>

        {/* Ação de Limpeza de Dados */}
        <button
          onClick={resetAllData}
          className="btn-outline-danger"
          title="Resetar todos os registros de teste"
        >
          <Trash2 size={15} />
          <span>Resetar</span>
        </button>
      </div>
    </header>
  );
}
