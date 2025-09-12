import { Institution } from '../types';

export const institutions: Institution[] = [
  {
    id: 'renap',
    name: 'RENAP',
    fullName: 'Registro Nacional de las Personas',
    description: 'Institución encargada de la identificación y registro civil de los guatemaltecos. Administra el sistema de identificación personal y emite documentos oficiales de identidad.',
    category: 'identidad',
    website: 'https://www.renap.gob.gt',
    phone: '1551',
    email: 'info@renap.gob.gt',
    address: 'Avenida La Reforma 1-64, Zona 9, Ciudad de Guatemala',
    workingHours: 'Lunes a Viernes: 8:00 AM - 4:00 PM',
    services: [
      'Emisión de DPI',
      'Renovación de DPI',
      'Certificaciones de nacimiento',
      'Certificaciones de defunción',
      'Certificaciones de matrimonio',
      'Cambio de datos personales'
    ],
    isDigitalEnabled: true,
    socialMedia: {
      facebook: 'https://facebook.com/renapguatemala',
      twitter: 'https://twitter.com/renapguatemala'
    },
    lastUpdated: '2024-12-20'
  },
  {
    id: 'registro-mercantil',
    name: 'Registro Mercantil',
    fullName: 'Registro Mercantil General de la República',
    description: 'Dependencia del Ministerio de Economía encargada del registro de empresas, comerciantes individuales y sociedades mercantiles en Guatemala.',
    category: 'negocios',
    website: 'https://www.mineco.gob.gt',
    phone: '2412-0000',
    email: 'info@mineco.gob.gt',
    address: '8a Avenida 10-43, Zona 1, Ciudad de Guatemala',
    workingHours: 'Lunes a Viernes: 8:00 AM - 4:30 PM',
    services: [
      'Inscripción de empresas',
      'Inscripción de comerciantes individuales',
      'Patentes de comercio',
      'Modificaciones societarias',
      'Certificaciones registrales',
      'Consultas en línea'
    ],
    isDigitalEnabled: false,
    socialMedia: {
      facebook: 'https://facebook.com/minecoguatemala'
    },
    lastUpdated: '2024-12-18'
  },
  {
    id: 'usac',
    name: 'USAC',
    fullName: 'Universidad de San Carlos de Guatemala',
    description: 'Universidad pública, autónoma y laica de Guatemala. La única universidad estatal del país que ofrece educación superior gratuita a los guatemaltecos.',
    category: 'educacion',
    website: 'https://www.usac.edu.gt',
    phone: '2418-8000',
    email: 'webmaster@usac.edu.gt',
    address: 'Ciudad Universitaria, Zona 12, Ciudad de Guatemala',
    workingHours: 'Lunes a Viernes: 7:00 AM - 6:00 PM',
    services: [
      'Inscripciones universitarias',
      'Certificaciones académicas',
      'Títulos universitarios',
      'Equivalencias de estudios',
      'Programas de extensión',
      'Investigación científica'
    ],
    isDigitalEnabled: true,
    socialMedia: {
      facebook: 'https://facebook.com/usacgt',
      twitter: 'https://twitter.com/usacgt',
      instagram: 'https://instagram.com/usacgt'
    },
    lastUpdated: '2024-12-22'
  },
  {
    id: 'mspas',
    name: 'MSPAS',
    fullName: 'Ministerio de Salud Pública y Asistencia Social',
    description: 'Ministerio encargado de formular políticas, planes y programas en materia de salud pública y asistencia social para la población guatemalteca.',
    category: 'salud',
    website: 'https://www.mspas.gob.gt',
    phone: '2440-4747',
    email: 'info@mspas.gob.gt',
    address: '6a Avenida 3-45, Zona 11, Ciudad de Guatemala',
    workingHours: 'Lunes a Viernes: 8:00 AM - 4:30 PM',
    services: [
      'Certificados de salud',
      'Licencias sanitarias',
      'Registro de medicamentos',
      'Vigilancia epidemiológica',
      'Programas de vacunación',
      'Atención médica pública'
    ],
    isDigitalEnabled: false,
    socialMedia: {
      facebook: 'https://facebook.com/mspasguatemala',
      twitter: 'https://twitter.com/mspasguatemala'
    },
    lastUpdated: '2024-12-19'
  },
  {
    id: 'organismo-judicial',
    name: 'Organismo Judicial',
    fullName: 'Organismo Judicial de Guatemala',
    description: 'Poder del Estado encargado de la administración de justicia, protección de derechos constitucionales y resolución de conflictos legales.',
    category: 'justicia',
    website: 'https://www.oj.gob.gt',
    phone: '1572',
    email: 'info@oj.gob.gt',
    address: '21 Calle 7-70, Zona 1, Ciudad de Guatemala',
    workingHours: 'Lunes a Viernes: 8:00 AM - 4:00 PM',
    services: [
      'Antecedentes penales',
      'Certificaciones judiciales',
      'Procesos judiciales',
      'Mediación y conciliación',
      'Registro de abogados',
      'Consultas jurídicas'
    ],
    isDigitalEnabled: true,
    socialMedia: {
      facebook: 'https://facebook.com/organismoJudicialGT'
    },
    lastUpdated: '2024-12-21'
  },
  {
    id: 'municipalidad-guatemala',
    name: 'Municipalidad de Guatemala',
    fullName: 'Municipalidad de Guatemala',
    description: 'Gobierno local de la Ciudad de Guatemala, encargado de servicios públicos municipales, desarrollo urbano y administración local.',
    category: 'vivienda',
    website: 'https://www.muniguate.com',
    phone: '2285-8000',
    email: 'info@muniguate.com',
    address: '21 Calle 6-77, Zona 1, Ciudad de Guatemala',
    workingHours: 'Lunes a Viernes: 8:00 AM - 4:00 PM',
    services: [
      'Licencias de construcción',
      'Boleto de ornato',
      'Permisos municipales',
      'Servicios públicos',
      'Desarrollo urbano',
      'Registro de vecindad'
    ],
    isDigitalEnabled: false,
    socialMedia: {
      facebook: 'https://facebook.com/MunicipalidadGuatemala',
      twitter: 'https://twitter.com/MuniGuate'
    },
    lastUpdated: '2024-12-15'
  },
  {
    id: 'sat',
    name: 'SAT',
    fullName: 'Superintendencia de Administración Tributaria',
    description: 'Institución encargada de la administración del régimen tributario, aduanero y de la facilitación del comercio exterior en Guatemala.',
    category: 'negocios',
    website: 'https://www.sat.gob.gt',
    phone: '1544',
    email: 'info@sat.gob.gt',
    address: '7a Avenida 3-33, Zona 9, Ciudad de Guatemala',
    workingHours: 'Lunes a Viernes: 8:00 AM - 5:00 PM',
    services: [
      'Inscripción de contribuyentes',
      'Declaraciones tributarias',
      'Facturación electrónica',
      'Régimen de pequeño contribuyente',
      'Trámites aduaneros',
      'Consultas tributarias'
    ],
    isDigitalEnabled: true,
    socialMedia: {
      facebook: 'https://facebook.com/SATGuatemala',
      twitter: 'https://twitter.com/SATGuatemala'
    },
    lastUpdated: '2024-12-17'
  },
  {
    id: 'igss',
    name: 'IGSS',
    fullName: 'Instituto Guatemalteco de Seguridad Social',
    description: 'Institución autónoma encargada de aplicar un régimen nacional, unitario y obligatorio de seguridad social para los trabajadores guatemaltecos.',
    category: 'salud',
    website: 'https://www.igssgt.org',
    phone: '2412-1224',
    email: 'info@igssgt.org',
    address: '7a Avenida 22-72, Zona 1, Ciudad de Guatemala',
    workingHours: 'Lunes a Viernes: 7:30 AM - 3:30 PM',
    services: [
      'Afiliación de trabajadores',
      'Prestaciones médicas',
      'Prestaciones económicas',
      'Pensiones y jubilaciones',
      'Subsidios por enfermedad',
      'Maternidad y accidentes'
    ],
    isDigitalEnabled: true,
    socialMedia: {
      facebook: 'https://facebook.com/IGSSGuatemala'
    },
    lastUpdated: '2024-12-16'
  }
];

// Helper functions
export const getInstitutionById = (id: string): Institution | undefined => {
  return institutions.find(institution => institution.id === id);
};

export const getInstitutionsByCategory = (category: string): Institution[] => {
  return institutions.filter(institution => institution.category === category);
};

export const getDigitalInstitutions = (): Institution[] => {
  return institutions.filter(institution => institution.isDigitalEnabled);
};

export const searchInstitutions = (query: string): Institution[] => {
  const lowercaseQuery = query.toLowerCase();
  return institutions.filter(institution =>
    institution.name.toLowerCase().includes(lowercaseQuery) ||
    institution.fullName.toLowerCase().includes(lowercaseQuery) ||
    institution.description.toLowerCase().includes(lowercaseQuery) ||
    institution.services.some(service => service.toLowerCase().includes(lowercaseQuery))
  );
};