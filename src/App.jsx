import React from 'react';
import { ClinicProvider, useClinic } from './context/ClinicContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import ToastContainer from './components/layout/ToastContainer';
import Dashboard from './components/dashboard/Dashboard';
import PacienteForm from './components/forms/PacienteForm';
import MedicoForm from './components/forms/MedicoForm';
import AgendamentoForm from './components/forms/AgendamentoForm';
import RecordsView from './components/records/RecordsView';
import DetailModal from './components/records/DetailModal';
import IhcGuide from './components/ihc/IhcGuide';

function AppContent() {
  const { activeTab } = useClinic();

  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'cad-paciente':
        return <PacienteForm />;
      case 'cad-medico':
        return <MedicoForm />;
      case 'cad-agendamento':
        return <AgendamentoForm />;
      case 'registros':
        return <RecordsView />;
      case 'ihc-info':
        return <IhcGuide />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="content-scrollable">
          {renderCurrentTab()}
        </div>
      </main>
      <DetailModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ClinicProvider>
      <AppContent />
    </ClinicProvider>
  );
}
