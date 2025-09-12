import { Procedure, Category, UserProcedure } from '../types';

export const categories: Category[] = [
  { id: 'identidad', name: 'Identidad', icon: 'User', count: 12 },
  { id: 'negocios', name: 'Negocios', icon: 'Building2', count: 18 },
  { id: 'vivienda', name: 'Vivienda', icon: 'Home', count: 8 },
  { id: 'educacion', name: 'Educación', icon: 'GraduationCap', count: 15 },
  { id: 'salud', name: 'Salud', icon: 'Heart', count: 10 },
  { id: 'justicia', name: 'Justicia', icon: 'Scale', count: 7 },
];

export const procedures: Procedure[] = [
  {
    id: '1',
    name: 'Renovación de DPI',
    description: 'Renovación del Documento Personal de Identificación vencido o próximo a vencer',
    fullDescription: 'Proceso para renovar tu Documento Personal de Identificación cuando esté vencido o próximo a vencer. Este trámite es esencial para mantener tu identificación oficial vigente.',
    institution: 'RENAP',
    category: 'identidad',
    duration: '5-7 días hábiles',
    type: 'mixto',
    userType: 'persona',
    requirements: [
      'DPI anterior (original y copia)',
      'Partida de nacimiento certificada (no mayor a 6 meses)',
      'Comprobante de residencia (no mayor a 3 meses)',
      'Fotografías recientes tamaño cédula (2)'
    ],
    steps: [
      'Solicitud en línea o presencial',
      'Presentar documentos requeridos',
      'Toma de fotografía y huellas',
      'Pago de aranceles',
      'Esperar tiempo de procesamiento',
      'Recoger documento en oficina asignada'
    ],
    isDigital: true,
    subcategory: 'Documentos de identidad',
    respaldo_legal: 'Decreto 90-2005 - Ley del Registro Nacional de las Personas',
    fecha_actualizado: '2024-12-15',
    fecha_revision: '2024-12-20'
  },
  {
    id: '2',
    name: 'Inscripción de Empresa',
    description: 'Registro e inscripción de nueva empresa en el Registro Mercantil',
    fullDescription: 'Proceso completo para inscribir una nueva empresa en el Registro Mercantil General de la República. Incluye todos los pasos necesarios para la constitución legal.',
    institution: 'Registro Mercantil',
    category: 'negocios',
    duration: '10-15 días hábiles',
    type: 'presencial',
    userType: 'empresa',
    requirements: [
      'Escritura pública de constitución',
      'Testimonio de la escritura (3 copias)',
      'Formulario de inscripción completo',
      'Comprobante de pago de aranceles',
      'Cédula del representante legal'
    ],
    steps: [
      'Elaboración de escritura pública',
      'Presentación en ventanilla del Registro',
      'Revisión de documentos',
      'Calificación registral',
      'Inscripción definitiva',
      'Entrega de patente de comercio'
    ],
    isDigital: false,
    subcategory: 'Registro empresarial',
    respaldo_legal: 'Código de Comercio - Decreto 2-70',
    fecha_actualizado: '2024-11-20',
    fecha_revision: '2024-12-18'
  },
  {
    id: '3',
    name: 'Licencia de Construcción',
    description: 'Solicitud de licencia municipal para construcción de vivienda',
    fullDescription: 'Obtención de licencia municipal para construcción, ampliación o remodelación de vivienda. Incluye revisión de planos y cumplimiento de normativas.',
    institution: 'Municipalidad',
    category: 'vivienda',
    duration: '20-30 días hábiles',
    type: 'presencial',
    userType: 'persona',
    requirements: [
      'Planos arquitectónicos sellados',
      'Planos estructurales',
      'Escritura del terreno',
      'Boleto de ornato vigente',
      'Estudio de suelos',
      'Formulario municipal completo'
    ],
    steps: [
      'Presentación de documentos',
      'Revisión técnica municipal',
      'Inspección del terreno',
      'Aprobación de planos',
      'Pago de licencia',
      'Entrega de licencia aprobada'
    ],
    isDigital: false,
    subcategory: 'Permisos municipales',
    respaldo_legal: 'Código Municipal - Decreto 12-2002',
    fecha_actualizado: '2024-10-30',
    fecha_revision: '2024-12-15'
  },
  {
    id: '4',
    name: 'Inscripción Universitaria',
    description: 'Proceso de inscripción para nuevo ingreso a universidad pública',
    fullDescription: 'Proceso completo de inscripción para estudiantes de nuevo ingreso en universidades públicas. Incluye asignación de curso básico y matrícula.',
    institution: 'USAC',
    category: 'educacion',
    duration: '30-45 días',
    type: 'digital',
    userType: 'persona',
    requirements: [
      'Título de diversificado',
      'Certificado de notas de diversificado',
      'Partida de nacimiento',
      'DPI vigente',
      'Fotografías tamaño cédula',
      'Comprobante de pago de examen'
    ],
    steps: [
      'Pre-inscripción en línea',
      'Pago de examen de admisión',
      'Presentar examen',
      'Consulta de resultados',
      'Inscripción definitiva',
      'Asignación de cursos'
    ],
    isDigital: true,
    subcategory: 'Educación superior',
    respaldo_legal: 'Ley Orgánica de la Universidad de San Carlos - Decreto 325',
    fecha_actualizado: '2024-12-01',
    fecha_revision: '2024-12-22'
  },
  {
    id: '5',
    name: 'Certificado de Salud',
    description: 'Emisión de certificado médico para trámites laborales o académicos',
    fullDescription: 'Obtención de certificado de salud oficial requerido para trámites laborales, académicos o migratorios. Incluye exámenes médicos básicos.',
    institution: 'MSPAS',
    category: 'salud',
    duration: '3-5 días hábiles',
    type: 'presencial',
    userType: 'persona',
    requirements: [
      'DPI vigente',
      'Fotografía reciente',
      'Comprobante de pago',
      'Formulario de solicitud'
    ],
    steps: [
      'Solicitud en centro de salud',
      'Examen médico general',
      'Exámenes de laboratorio',
      'Evaluación médica',
      'Emisión de certificado',
      'Entrega de documento'
    ],
    isDigital: false,
    subcategory: 'Certificaciones médicas',
    respaldo_legal: 'Código de Salud - Decreto 90-97',
    fecha_actualizado: '2024-11-15',
    fecha_revision: '2024-12-19'
  },
  {
    id: '6',
    name: 'Antecedentes Penales',
    description: 'Solicitud de certificación de antecedentes penales',
    fullDescription: 'Certificación oficial de antecedentes penales requerida para trámites laborales, migratorios o académicos. Documento con validez legal.',
    institution: 'Organismo Judicial',
    category: 'justicia',
    duration: '2-3 días hábiles',
    type: 'digital',
    userType: 'persona',
    requirements: [
      'DPI vigente',
      'Formulario de solicitud',
      'Comprobante de pago en línea',
      'Correo electrónico válido'
    ],
    steps: [
      'Solicitud en línea',
      'Pago electrónico',
      'Verificación de identidad',
      'Procesamiento de solicitud',
      'Generación de certificado',
      'Descarga del documento'
    ],
    isDigital: true,
    subcategory: 'Certificaciones judiciales',
    respaldo_legal: 'Ley del Organismo Judicial - Decreto 2-89',
    fecha_actualizado: '2024-12-10',
    fecha_revision: '2024-12-21'
  }
];

export const userProcedures: UserProcedure[] = [
  {
    id: 'up1',
    procedureId: '1',
    procedureName: 'Renovación de DPI',
    status: 'en-revision',
    submittedDate: '2024-01-15',
    estimatedCompletion: '2024-01-25'
  },
  {
    id: 'up2',
    procedureId: '4',
    procedureName: 'Inscripción Universitaria',
    status: 'aprobado',
    submittedDate: '2024-01-10',
    estimatedCompletion: '2024-01-20'
  },
  {
    id: 'up3',
    procedureId: '6',
    procedureName: 'Antecedentes Penales',
    status: 'recibido',
    submittedDate: '2024-01-18',
    estimatedCompletion: '2024-01-22'
  }
];