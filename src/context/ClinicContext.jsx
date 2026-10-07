import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialPacientes, initialMedicos, initialAgendamentos } from '../data/mockData';

const ClinicContext = createContext();

const STORAGE_KEYS = {
  PACIENTES: 'synapse_health_pacientes',
  MEDICOS: 'synapse_health_medicos',
  AGENDAMENTOS: 'synapse_health_agendamentos'
};

export const DEFAULT_PACIENTE_FORM = {
  nome: '',
  cpf: '',
  dataNasc: '',
  telefone: '',
  email: '',
  tipoSanguineo: 'O+',
  sexo: 'Feminino',
  temConvenio: false
};

export const DEFAULT_MEDICO_FORM = {
  nome: '',
  registro: '',
  especialidade: '',
  experiencia: 5,
  turno: 'Manhã',
  corAgenda: '#2563eb',
  documento: '',
  telemedicina: true
};

export const DEFAULT_AGENDAMENTO_FORM = {
  pacienteId: '',
  medicoId: '',
  data: '',
  hora: '09:30',
  formato: 'Presencial',
  linkTeleconsulta: 'https://meet.synapsehealth.com.br/sala-virtual',
  nivelDor: 0,
  observacoes: ''
};

export function ClinicProvider({ children }) {
  const [pacientes, setPacientes] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PACIENTES) || localStorage.getItem('medflow_react_pacientes');
    return saved ? JSON.parse(saved) : initialPacientes;
  });

  const [medicos, setMedicos] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MEDICOS) || localStorage.getItem('medflow_react_medicos');
    return saved ? JSON.parse(saved) : initialMedicos;
  });

  const [agendamentos, setAgendamentos] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AGENDAMENTOS) || localStorage.getItem('medflow_react_agendamentos');
    return saved ? JSON.parse(saved) : initialAgendamentos;
  });

  // Drafts para preservação entre abas (ISO 9241-17, Cláusula 8.6.2)
  const [pacienteDraft, setPacienteDraft] = useState(DEFAULT_PACIENTE_FORM);
  const [pacienteUndo, setPacienteUndo] = useState(null);

  const [medicoDraft, setMedicoDraft] = useState(DEFAULT_MEDICO_FORM);
  const [medicoUndo, setMedicoUndo] = useState(null);

  const [agendamentoDraft, setAgendamentoDraft] = useState(DEFAULT_AGENDAMENTO_FORM);
  const [agendamentoUndo, setAgendamentoUndo] = useState(null);

  const [activeTab, setActiveTabState] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return ['cad-paciente', 'cad-medico', 'cad-agendamento', 'registros', 'ihc-info', 'dashboard'].includes(hash) ? hash : 'dashboard';
  });

  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    window.location.hash = tab;
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['cad-paciente', 'cad-medico', 'cad-agendamento', 'registros', 'ihc-info', 'dashboard'].includes(hash)) {
        setActiveTabState(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);
  const [activeSubtab, setActiveSubtab] = useState('pacientes');
  const [toasts, setToasts] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Verificação de unicidade em banco (ISO 9241-17, Cláusula 6.5.2b)
  const isCpfUnique = (cpf, excludeId = null) => {
    if (!cpf) return true;
    return !pacientes.some(p => p.cpf === cpf && p.id !== excludeId);
  };

  const isCrmUnique = (crm, excludeId = null) => {
    if (!crm) return true;
    return !medicos.some(m => m.registro && m.registro.toLowerCase().trim() === crm.toLowerCase().trim() && m.id !== excludeId);
  };

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PACIENTES, JSON.stringify(pacientes));
  }, [pacientes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEDICOS, JSON.stringify(medicos));
  }, [medicos]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AGENDAMENTOS, JSON.stringify(agendamentos));
  }, [agendamentos]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addPaciente = (pacienteData) => {
    const novo = {
      ...pacienteData,
      id: 'PAC-' + Date.now().toString().slice(-4),
      criadoEm: new Date().toLocaleDateString('pt-BR')
    };
    setPacientes(prev => [novo, ...prev]);
    addToast(`Paciente "${novo.nome}" cadastrado com sucesso!`, 'success');
  };

  const addMedico = (medicoData) => {
    const novo = {
      ...medicoData,
      id: 'MED-' + Date.now().toString().slice(-4),
      criadoEm: new Date().toLocaleDateString('pt-BR')
    };
    setMedicos(prev => [novo, ...prev]);
    addToast(`Profissional "${novo.nome}" cadastrado com sucesso!`, 'success');
  };

  const addAgendamento = (agendamentoData) => {
    const pacObj = pacientes.find(p => p.id === agendamentoData.pacienteId);
    const medObj = medicos.find(m => m.id === agendamentoData.medicoId);

    const novo = {
      ...agendamentoData,
      id: 'AGD-' + Date.now().toString().slice(-4),
      pacienteNome: pacObj ? pacObj.nome : 'Paciente Desconhecido',
      medicoNome: medObj ? medObj.nome : 'Médico Desconhecido',
      especialidade: medObj ? medObj.especialidade : '',
      corMedico: medObj ? medObj.corAgenda : '#2563eb',
      criadoEm: new Date().toLocaleDateString('pt-BR')
    };

    setAgendamentos(prev => [novo, ...prev]);
    addToast(`Agendamento de ${novo.pacienteNome} confirmado com sucesso!`, 'success');
  };

  const deletePaciente = (id) => {
    setPacientes(prev => prev.filter(p => p.id !== id));
    addToast('Paciente excluído do sistema.', 'info');
  };

  const deleteMedico = (id) => {
    setMedicos(prev => prev.filter(m => m.id !== id));
    addToast('Profissional de saúde excluído.', 'info');
  };

  const deleteAgendamento = (id) => {
    setAgendamentos(prev => prev.filter(a => a.id !== id));
    addToast('Agendamento cancelado e removido.', 'info');
  };

  const loadDemoData = () => {
    setPacientes(initialPacientes);
    setMedicos(initialMedicos);
    setAgendamentos(initialAgendamentos);
    addToast('Dados de demonstração restaurados com sucesso!', 'success');
  };

  const resetAllData = () => {
    if (window.confirm('Tem certeza de que deseja apagar todos os registros do sistema?')) {
      setPacientes([]);
      setMedicos([]);
      setAgendamentos([]);
      addToast('Todos os dados foram resetados.', 'warning');
    }
  };

  return (
    <ClinicContext.Provider
      value={{
        pacientes,
        medicos,
        agendamentos,
        activeTab,
        setActiveTab: (tab) => {
          setActiveTab(tab);
          setIsMobileMenuOpen(false); // fecha o menu no mobile ao clicar
        },
        activeSubtab,
        setActiveSubtab,
        toasts,
        addToast,
        removeToast,
        selectedDetail,
        setSelectedDetail,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        toggleMobileMenu: () => setIsMobileMenuOpen(prev => !prev),
        addPaciente,
        addMedico,
        addAgendamento,
        deletePaciente,
        deleteMedico,
        deleteAgendamento,
        loadDemoData,
        resetAllData,
        pacienteDraft,
        setPacienteDraft,
        pacienteUndo,
        setPacienteUndo,
        medicoDraft,
        setMedicoDraft,
        medicoUndo,
        setMedicoUndo,
        agendamentoDraft,
        setAgendamentoDraft,
        agendamentoUndo,
        setAgendamentoUndo,
        isCpfUnique,
        isCrmUnique
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
}

export function useClinic() {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
}
