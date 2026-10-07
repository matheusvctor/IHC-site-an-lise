export const initialPacientes = [
  {
    id: 'PAC-101',
    nome: 'Camila Ferreira Bastos',
    cpf: '342.891.708-22',
    dataNasc: '1995-04-18',
    telefone: '(11) 98765-4321',
    email: 'camila.bastos@email.com',
    tipoSanguineo: 'O+',
    sexo: 'Feminino',
    temConvenio: true,
    criadoEm: '06/10/2026'
  },
  {
    id: 'PAC-102',
    nome: 'Lucas Gabriel Monteiro',
    cpf: '455.109.828-54',
    dataNasc: '1988-11-03',
    telefone: '(11) 97123-8899',
    email: 'lucas.monteiro@email.com',
    tipoSanguineo: 'A+',
    sexo: 'Masculino',
    temConvenio: false,
    criadoEm: '06/10/2026'
  },
  {
    id: 'PAC-103',
    nome: 'Beatriz Vasconcelos',
    cpf: '219.743.608-11',
    dataNasc: '2001-08-25',
    telefone: '(11) 99455-1234',
    email: 'beatriz.v@email.com',
    tipoSanguineo: 'B-',
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
    turno: 'Manhã',
    corAgenda: '#2563eb',
    documento: 'diploma_crm_fernando.pdf',
    telemedicina: true,
    criadoEm: '06/10/2026'
  },
  {
    id: 'MED-202',
    nome: 'Dra. Juliana Mendes Rocha',
    registro: 'CRM-SP 189442',
    especialidade: 'Dermatologia',
    experiencia: 9,
    turno: 'Tarde',
    corAgenda: '#db2777',
    documento: 'rqe_dermatologia_juliana.pdf',
    telemedicina: true,
    criadoEm: '06/10/2026'
  },
  {
    id: 'MED-203',
    nome: 'Dr. Thiago Siqueira Prado',
    registro: 'CRM-SP 205118',
    especialidade: 'Ortopedia e Traumatologia',
    experiencia: 7,
    turno: 'Integral',
    corAgenda: '#059669',
    documento: 'rqe_ortopedia_thiago.pdf',
    telemedicina: false,
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
    data: '2026-10-12',
    hora: '09:30',
    formato: 'Telemedicina',
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
    data: '2026-10-14',
    hora: '14:00',
    formato: 'Presencial',
    linkTeleconsulta: 'https://meet.clinicamedflow.com.br/sala-orto-203',
    nivelDor: 6,
    observacoes: 'Dor no joelho direito após entorse durante corrida no último fim de semana.',
    criadoEm: '06/10/2026'
  }
];
