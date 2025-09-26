export interface ObservatoryData {
  id: string;
  name: string;
  category: string;
  maturityLevel: number;
  evaluationScore: number;
  evaluationComponents: {
    digitalizacion: number;
    simplificacion: number;
    interoperabilidad: number;
    trazabilidad: number;
    accesibilidad: number;
    satisfaccionUsuario: number;
  };
  averageTime: string;
  monthlyUsers: number;
  satisfactionRate: number;
  isDigital: boolean;
  issues: string[];
  recommendations: string[];
  lastUpdated: string;
}

export const observatoryData: ObservatoryData[] = [
  {
    id: '1',
    name: 'Renovación de DPI',
    category: 'identidad',
    maturityLevel: 4.2,
    evaluationScore: 84,
    evaluationComponents: {
      digitalizacion: 4.5,
      simplificacion: 4.0,
      interoperabilidad: 4.2,
      trazabilidad: 4.1,
      accesibilidad: 4.3,
      satisfaccionUsuario: 4.2
    },
    averageTime: '5-7 días',
    monthlyUsers: 45000,
    satisfactionRate: 87,
    isDigital: true,
    issues: [
      'Tiempo de procesamiento variable en algunas regiones',
      'Necesidad de mejorar la comunicación de estados intermedios'
    ],
    recommendations: [
      'Implementar notificaciones automáticas por SMS',
      'Optimizar el proceso de verificación de documentos',
      'Crear centros de atención express en zonas de alta demanda'
    ],
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    name: 'Inscripción de Empresa',
    category: 'negocios',
    maturityLevel: 3.1,
    evaluationScore: 62,
    evaluationComponents: {
      digitalizacion: 2.5,
      simplificacion: 3.2,
      interoperabilidad: 2.8,
      trazabilidad: 3.0,
      accesibilidad: 3.1,
      satisfaccionUsuario: 3.0
    },
    averageTime: '10-15 días',
    monthlyUsers: 8500,
    satisfactionRate: 72,
    isDigital: false,
    issues: [
      'Proceso completamente presencial',
      'Múltiples ventanillas y documentos físicos requeridos',
      'Falta de seguimiento en tiempo real',
      'Tiempos de espera prolongados'
    ],
    recommendations: [
      'Digitalizar el proceso de inscripción',
      'Implementar firma electrónica',
      'Crear portal de seguimiento en línea',
      'Reducir requisitos documentales mediante verificación automática'
    ],
    lastUpdated: '2024-01-10'
  },
  {
    id: '3',
    name: 'Licencia de Construcción',
    category: 'vivienda',
    maturityLevel: 2.8,
    evaluationScore: 56,
    evaluationComponents: {
      digitalizacion: 2.0,
      simplificacion: 2.5,
      interoperabilidad: 2.3,
      trazabilidad: 2.8,
      accesibilidad: 2.7,
      satisfaccionUsuario: 2.9
    },
    averageTime: '20-30 días',
    monthlyUsers: 3200,
    satisfactionRate: 65,
    isDigital: false,
    issues: [
      'Proceso completamente manual',
      'Revisión de planos en papel',
      'Múltiples inspecciones presenciales',
      'Comunicación limitada sobre el estado del trámite'
    ],
    recommendations: [
      'Implementar revisión digital de planos',
      'Crear sistema de citas en línea para inspecciones',
      'Desarrollar aplicación móvil para inspectores',
      'Automatizar notificaciones de estado'
    ],
    lastUpdated: '2024-01-08'
  },
  {
    id: '4',
    name: 'Inscripción Universitaria',
    category: 'educacion',
    maturityLevel: 4.6,
    evaluationScore: 92,
    evaluationComponents: {
      digitalizacion: 4.8,
      simplificacion: 4.5,
      interoperabilidad: 4.7,
      trazabilidad: 4.4,
      accesibilidad: 4.6,
      satisfaccionUsuario: 4.7
    },
    averageTime: '30-45 días',
    monthlyUsers: 25000,
    satisfactionRate: 92,
    isDigital: true,
    issues: [
      'Picos de demanda durante períodos de inscripción',
      'Necesidad de mejorar la experiencia móvil'
    ],
    recommendations: [
      'Implementar sistema de colas virtuales',
      'Optimizar la aplicación móvil',
      'Añadir chatbot para consultas frecuentes',
      'Crear sistema de recordatorios automáticos'
    ],
    lastUpdated: '2024-01-12'
  },
  {
    id: '5',
    name: 'Certificado de Salud',
    category: 'salud',
    maturityLevel: 3.4,
    evaluationScore: 68,
    evaluationComponents: {
      digitalizacion: 3.0,
      simplificacion: 3.5,
      interoperabilidad: 3.2,
      trazabilidad: 3.4,
      accesibilidad: 3.6,
      satisfaccionUsuario: 3.3
    },
    averageTime: '3-5 días',
    monthlyUsers: 18000,
    satisfactionRate: 78,
    isDigital: false,
    issues: [
      'Exámenes médicos requieren presencia física',
      'Resultados entregados en papel',
      'Falta integración entre laboratorios'
    ],
    recommendations: [
      'Digitalizar resultados de laboratorio',
      'Implementar certificados digitales',
      'Crear red integrada de centros de salud',
      'Desarrollar sistema de citas en línea'
    ],
    lastUpdated: '2024-01-14'
  },
  {
    id: '6',
    name: 'Antecedentes Penales',
    category: 'justicia',
    maturityLevel: 4.8,
    evaluationScore: 96,
    evaluationComponents: {
      digitalizacion: 5.0,
      simplificacion: 4.7,
      interoperabilidad: 4.9,
      trazabilidad: 4.6,
      accesibilidad: 4.8,
      satisfaccionUsuario: 4.8
    },
    averageTime: '2-3 días',
    monthlyUsers: 32000,
    satisfactionRate: 95,
    isDigital: true,
    issues: [
      'Ocasionales problemas de conectividad en horas pico'
    ],
    recommendations: [
      'Ampliar capacidad de servidores',
      'Implementar sistema de respaldo',
      'Añadir verificación biométrica opcional',
      'Crear API para instituciones autorizadas'
    ],
    lastUpdated: '2024-01-16'
  },
  {
    id: '7',
    name: 'Registro de Vehículo',
    category: 'identidad',
    maturityLevel: 3.7,
    evaluationScore: 74,
    evaluationComponents: {
      digitalizacion: 3.5,
      simplificacion: 3.8,
      interoperabilidad: 3.6,
      trazabilidad: 3.7,
      accesibilidad: 3.9,
      satisfaccionUsuario: 3.7
    },
    averageTime: '7-10 días',
    monthlyUsers: 12000,
    satisfactionRate: 81,
    isDigital: true,
    issues: [
      'Verificación física del vehículo requerida',
      'Integración limitada con aseguradoras'
    ],
    recommendations: [
      'Implementar inspección virtual mediante fotos',
      'Integrar con sistemas de aseguradoras',
      'Crear aplicación móvil para inspectores',
      'Automatizar verificación de documentos'
    ],
    lastUpdated: '2024-01-11'
  },
  {
    id: '8',
    name: 'Permiso de Trabajo',
    category: 'negocios',
    maturityLevel: 2.9,
    evaluationScore: 58,
    evaluationComponents: {
      digitalizacion: 2.2,
      simplificacion: 3.1,
      interoperabilidad: 2.8,
      trazabilidad: 2.9,
      accesibilidad: 3.0,
      satisfaccionUsuario: 2.8
    },
    averageTime: '15-20 días',
    monthlyUsers: 5500,
    satisfactionRate: 68,
    isDigital: false,
    issues: [
      'Múltiples instituciones involucradas',
      'Documentación extensa requerida',
      'Proceso de verificación manual'
    ],
    recommendations: [
      'Crear ventanilla única digital',
      'Implementar verificación automática de antecedentes',
      'Digitalizar todo el proceso',
      'Reducir documentos mediante integración de sistemas'
    ],
    lastUpdated: '2024-01-09'
  }
];