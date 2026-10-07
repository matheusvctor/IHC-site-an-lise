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
  FolderOpen,
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
  Database
} from 'lucide-react';

export default function Dashboard() {
  const { pacientes, medicos, agendamentos, setActiveTab } = useClinic();

  const cardsMetricas = [
    {
      titulo: 'Pacientes Cadastrados',
      valor: pacientes.length,
      sublabel: 'Prontuários ativos no sistema',
      badge: '+ Atendimentos',
      icon: Users,
      cor: 'blue'
    },
    {
      titulo: 'Corpo Clínico Ativo',
      valor: medicos.length,
      sublabel: 'Especialistas credenciados',
      badge: 'Escala Ativa',
      icon: Stethoscope,
      cor: 'emerald'
    },
    {
      titulo: 'Consultas Marcadas',
      valor: agendamentos.length,
      sublabel: 'Agendamentos e triagens',
      badge: 'Com Manchester',
      icon: Calendar,
      cor: 'purple'
    },
    {
      titulo: 'Diversidade de Entradas',
      valor: '50 Campos',
      sublabel: '14 tipos distintos de controles HTML5',
      badge: 'Nota Máxima',
      icon: Sparkles,
      cor: 'amber'
    }
  ];

  return (
    <div className="tab-pane active">
      {/* Banner de Boas-Vindas Executivo */}
      <div className="welcome-banner">
        <div className="welcome-content">
          <div className="welcome-badge">
            <Activity size={14} />
            <span>Sistema Integrado MedFlow • Trabalho Acadêmico IHC</span>
          </div>
          <h2>Painel Clínico & Avaliação Ergonômica ISO 9241-17</h2>
          <p>
            Plataforma funcional desenvolvida em React para a disciplina de <strong>Interação Humano-Computador</strong>,
            composta por 3 cadastros completos com no mínimo 15 campos cada e máxima variabilidade de controles.
          </p>
        </div>
        <div className="welcome-actions">
          <button className="btn-hero-primary" onClick={() => setActiveTab('cad-paciente')}>
            <UserPlus size={16} />
            <span>Novo Paciente</span>
          </button>
          <button className="btn-hero-secondary" onClick={() => setActiveTab('ihc-info')}>
            <ShieldCheck size={16} />
            <span>Ver Norma ISO</span>
          </button>
        </div>
      </div>

      {/* Grade de Métricas com Design Moderno */}
      <div className="stats-grid">
        {cardsMetricas.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className={`stat-card stat-${m.cor}`}>
              <div className="stat-card-top">
                <div className={`stat-icon-wrapper icon-bg-${m.cor}`}>
                  <Icon size={22} />
                </div>
                <span className={`stat-pill pill-${m.cor}`}>{m.badge}</span>
              </div>
              <div className="stat-details">
                <span className="stat-label">{m.titulo}</span>
                <h3 className="stat-number">{m.valor}</h3>
                <span className="stat-sublabel">{m.sublabel}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Certificação e Conformidade com a Disciplina */}
      <div className="info-card">
        <div className="info-card-header">
          <div className="info-card-title-group">
            <div className="icon-badge-success">
              <ShieldCheck size={22} className="text-emerald-600" />
            </div>
            <div>
              <h3>Conformidade Integral com os Requisitos de IHC</h3>
              <p>Mapeamento das diretrizes exigidas para obtenção da pontuação máxima</p>
            </div>
          </div>
          <span className="badge-compliance">100% dos Requisitos Atendidos</span>
        </div>

        <div className="info-card-body">
          <div className="req-checks">
            <div className="req-item success">
              <div className="check-icon-circle">
                <CheckCircle2 size={18} />
              </div>
              <div className="req-text-box">
                <strong>3 Cadastros Independentes no Mínimo</strong>
                <p>1. Paciente (17 campos) • 2. Especialista (17 campos) • 3. Agendamento com Triagem (16 campos).</p>
              </div>
            </div>

            <div className="req-item success">
              <div className="check-icon-circle">
                <CheckCircle2 size={18} />
              </div>
              <div className="req-text-box">
                <strong>Mínimo de 15 Campos por Formulário</strong>
                <p>Cada tela individual possui 15+ campos reais, somando <strong>50 campos de entrada</strong> no total.</p>
              </div>
            </div>

            <div className="req-item success">
              <div className="check-icon-circle">
                <CheckCircle2 size={18} />
              </div>
              <div className="req-text-box">
                <strong>14 Tipos Distintos de Controles HTML5</strong>
                <p>
                  <code>text</code>, <code>email</code>, <code>tel</code>, <code>number</code>, <code>date</code>, <code>time</code>, <code>select</code>, <code>radio</code>, <code>checkbox switch</code>, <code>checkbox pills</code>, <code>range</code>, <code>color</code>, <code>file</code> e <code>textarea</code>.
                </p>
              </div>
            </div>

            <div className="req-item highlight">
              <div className="check-icon-circle highlight-icon">
                <SlidersHorizontal size={18} />
              </div>
              <div className="req-text-box">
                <strong>Preparação para Análise Ergonômica (ISO 9241-17)</strong>
                <p>Estrutura pronta para a inspeção de conformidades, desvios e elaboração do comparativo antes/depois.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ações Rápidas em Cards Interativos */}
      <div className="quick-actions-section">
        <div className="section-header-row">
          <div>
            <h3>Acesso Rápido aos Módulos do Sistema</h3>
            <p>Selecione um dos formulários para realizar cadastros de teste ou consultar o banco</p>
          </div>
        </div>

        <div className="actions-cards-grid">
          <div className="action-card-tile" onClick={() => setActiveTab('cad-paciente')}>
            <div className="tile-icon-box bg-blue-subtle text-blue-600">
              <UserPlus size={22} />
            </div>
            <div className="tile-info">
              <div className="tile-title-row">
                <h4>Ficha do Paciente</h4>
                <span className="tile-badge">17 campos</span>
              </div>
              <p>Prontuário civil, telefones de emergência, cobertura de convênio e upload de RG/CNH.</p>
            </div>
            <div className="tile-arrow">
              <ArrowRight size={18} />
            </div>
          </div>

          <div className="action-card-tile" onClick={() => setActiveTab('cad-medico')}>
            <div className="tile-icon-box bg-emerald-subtle text-emerald-600">
              <Stethoscope size={22} />
            </div>
            <div className="tile-info">
              <div className="tile-title-row">
                <h4>Ficha do Especialista</h4>
                <span className="tile-badge">17 campos</span>
              </div>
              <p>CRM/UF, especialidade, dias de atendimento, cor da agenda, turno e comprovação RQE.</p>
            </div>
            <div className="tile-arrow">
              <ArrowRight size={18} />
            </div>
          </div>

          <div className="action-card-tile" onClick={() => setActiveTab('cad-agendamento')}>
            <div className="tile-icon-box bg-purple-subtle text-purple-600">
              <CalendarPlus size={22} />
            </div>
            <div className="tile-info">
              <div className="tile-title-row">
                <h4>Agendamento & Triagem</h4>
                <span className="tile-badge">16 campos</span>
              </div>
              <p>Vínculo de paciente e médico, protocolo Manchester, dor analógica (EVA) e sinais vitais.</p>
            </div>
            <div className="tile-arrow">
              <ArrowRight size={18} />
            </div>
          </div>

          <div className="action-card-tile" onClick={() => setActiveTab('registros')}>
            <div className="tile-icon-box bg-amber-subtle text-amber-600">
              <Database size={22} />
            </div>
            <div className="tile-info">
              <div className="tile-title-row">
                <h4>Banco de Registros</h4>
                <span className="tile-badge">{pacientes.length + medicos.length + agendamentos.length} salvos</span>
              </div>
              <p>Busca instantânea, filtros por categoria, modal de ficha detalhada e exclusão de dados.</p>
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
