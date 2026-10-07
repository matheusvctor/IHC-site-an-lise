import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialPacientes, initialMedicos, initialAgendamentos } from '../data/mockData';

const ClinicContext = createContext();

const STORAGE_KEYS = {
  PACIENTES: 'medflow_react_pacientes',
  MEDICOS: 'medflow_react_medicos',
  AGENDAMENTOS: 'medflow_react_agendamentos'
};

export function ClinicProvider({ children }) {
  const [pacientes, setPacientes] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PACIENTES);
    return saved ? JSON.parse(saved) : initialPacientes;
  });

  const [medicos, setMedicos] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MEDICOS);
    return saved ? JSON.parse(saved) : initialMedicos;
  });

  const [agendamentos, setAgendamentos] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AGENDAMENTOS);
    return saved ? JSON.parse(saved) : initialAgendamentos;
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSubtab, setActiveSubtab] = useState('pacientes');
  const [toasts, setToasts] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        resetAllData
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
