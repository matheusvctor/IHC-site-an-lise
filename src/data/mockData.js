export const initialPacientes = [
  {
    id: 'PAC-101',
    nome: 'Camila Ferreira Bastos',
    dataNasc: '1995-04-18',
    telefone: '(11) 98765-4321',
    email: 'camila.bastos@email.com',
    sexo: 'Feminino',
    temConvenio: true,
    criadoEm: '06/10/2026'
  },
  {
    id: 'PAC-102',
    nome: 'Lucas Gabriel Monteiro',
    dataNasc: '1988-11-03',
    telefone: '(11) 97123-8899',
    email: 'lucas.monteiro@email.com',
    sexo: 'Masculino',
    temConvenio: false,
    criadoEm: '06/10/2026'
  },
  {
    id: 'PAC-103',
    nome: 'Beatriz Vasconcelos',
    dataNasc: '2001-08-25',
    telefone: '(11) 99455-1234',
    email: 'beatriz.v@email.com',
    sexo: 'Feminino',
    temConvenio: true,
    criadoEm: '06/10/2026'
  }
];

export const initialMedicos = [
  {
    id: 'MED-201',
    nome: 'Dr. Fernando Albuquerque',
    registro: 'CRM-SP 148920',
    especialidade: 'Cardiologia',
    experiencia: 14,
    corAgenda: '#2563eb',
    documento: 'diploma_crm_fernando.pdf',
    criadoEm: '06/10/2026'
  },
  {
    id: 'MED-202',
    nome: 'Dra. Juliana Mendes Rocha',
    registro: 'CRM-SP 189442',
    especialidade: 'Dermatologia',
    experiencia: 9,
    corAgenda: '#db2777',
    documento: 'rqe_dermatologia_juliana.pdf',
    criadoEm: '06/10/2026'
  },
  {
    id: 'MED-203',
    nome: 'Dr. Thiago Siqueira Prado',
    registro: 'CRM-SP 205118',
    especialidade: 'Ortopedia e Traumatologia',
    experiencia: 7,
    corAgenda: '#059669',
    documento: 'rqe_ortopedia_thiago.pdf',
    criadoEm: '06/10/2026'
  }
];

export const initialAgendamentos = [
  {
    id: 'AGD-301',
    pacienteId: 'PAC-101',
    pacienteNome: 'Camila Ferreira Bastos',
    medicoId: 'MED-201',
    medicoNome: 'Dr. Fernando Albuquerque',
    especialidade: 'Cardiologia',
    corMedico: '#2563eb',
    hora: '09:30',
    linkTeleconsulta: 'https://meet.clinicamedflow.com.br/sala-cardio-101',
    nivelDor: 2,
    observacoes: 'Paciente relata episódios de palpitação leve durante esforço físico moderado.',
    criadoEm: '06/10/2026'
  },
  {
    id: 'AGD-302',
    pacienteId: 'PAC-102',
    pacienteNome: 'Lucas Gabriel Monteiro',
    medicoId: 'MED-203',
    medicoNome: 'Dr. Thiago Siqueira Prado',
    especialidade: 'Ortopedia e Traumatologia',
    corMedico: '#059669',
    hora: '14:00',
    linkTeleconsulta: 'https://meet.clinicamedflow.com.br/sala-orto-203',
    nivelDor: 6,
    observacoes: 'Dor no joelho direito após entorse durante corrida no último fim de semana.',
    criadoEm: '06/10/2026'
  }
];
