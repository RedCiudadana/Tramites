export interface ObservatoryDataItem {
  id: string;
  procedure_id: string;
  maturity_level: number;
  evaluation_score: number;
  evaluation_components: {
    digitalizacion: number;
    simplificacion: number;
    interoperabilidad: number;
    trazabilidad: number;
    accesibilidad: number;
    satisfaccionUsuario: number;
  };
  average_time: string;
  monthly_users: number;
  satisfaction_rate: number;
  is_digital: boolean;
  issues: string[];
  recommendations: string[];
  last_updated: string;
  created_at: string;
  updated_at: string;
}

const observatoryData: ObservatoryDataItem[] = [
  {
    id: '1',
    procedure_id: '650e8400-e29b-41d4-a716-446655440001',
    maturity_level: 4.2,
    evaluation_score: 84,
    evaluation_components: {
      digitalizacion: 4.5,
      simplificacion: 4.0,
      interoperabilidad: 4.2,
      trazabilidad: 4.1,
      accesibilidad: 4.3,
      satisfaccionUsuario: 4.2
    },
    average_time: '25 horas y 27 minutos',
    monthly_users: 450,
    satisfaction_rate: 87,
    is_digital: true,
    issues: [
      'Tiempo de procesamiento variable en algunas regiones',
      'Necesidad de mejorar la comunicación de estados intermedios'
    ],
    recommendations: [
      'Implementar notificaciones automáticas',
      'Optimizar el proceso de verificación de documentos',
      'Crear centros de atención express en zonas de alta demanda'
    ],
    last_updated: '2023-04-25',
    created_at: '2023-04-25',
    updated_at: '2023-04-25'
  },
  {
    id: '2',
    procedure_id: '650e8400-e29b-41d4-a716-446655440002',
    maturity_level: 3.8,
    evaluation_score: 76,
    evaluation_components: {
      digitalizacion: 3.5,
      simplificacion: 4.0,
      interoperabilidad: 3.8,
      trazabilidad: 3.9,
      accesibilidad: 4.1,
      satisfaccionUsuario: 3.5
    },
    average_time: '20 días',
    monthly_users: 120,
    satisfaction_rate: 78,
    is_digital: true,
    issues: [
      'Proceso requiere múltiples validaciones',
      'Documentación extensa'
    ],
    recommendations: [
      'Simplificar requisitos',
      'Automatizar validaciones',
      'Mejorar interfaz de usuario'
    ],
    last_updated: '2023-04-24',
    created_at: '2023-04-24',
    updated_at: '2023-04-24'
  },
  {
    id: '3',
    procedure_id: '650e8400-e29b-41d4-a716-446655440003',
    maturity_level: 4.0,
    evaluation_score: 80,
    evaluation_components: {
      digitalizacion: 4.2,
      simplificacion: 3.8,
      interoperabilidad: 4.0,
      trazabilidad: 4.1,
      accesibilidad: 4.0,
      satisfaccionUsuario: 3.9
    },
    average_time: '72 horas',
    monthly_users: 85,
    satisfaction_rate: 82,
    is_digital: true,
    issues: [
      'Coordinación con campo necesaria',
      'Supervisión requerida'
    ],
    recommendations: [
      'Agilizar proceso de supervisión',
      'Implementar inspecciones virtuales cuando sea posible'
    ],
    last_updated: '2023-04-18',
    created_at: '2023-04-18',
    updated_at: '2023-04-18'
  },
  {
    id: '4',
    procedure_id: '650e8400-e29b-41d4-a716-446655440004',
    maturity_level: 3.5,
    evaluation_score: 70,
    evaluation_components: {
      digitalizacion: 3.2,
      simplificacion: 3.5,
      interoperabilidad: 3.4,
      trazabilidad: 3.8,
      accesibilidad: 3.6,
      satisfaccionUsuario: 3.5
    },
    average_time: '15 días',
    monthly_users: 200,
    satisfaction_rate: 75,
    is_digital: true,
    issues: [
      'Tiempo de análisis extenso',
      'Requiere pago anticipado'
    ],
    recommendations: [
      'Reducir tiempos de análisis',
      'Optimizar proceso de laboratorio'
    ],
    last_updated: '2023-05-02',
    created_at: '2023-05-02',
    updated_at: '2023-05-02'
  }
];

export default observatoryData;
