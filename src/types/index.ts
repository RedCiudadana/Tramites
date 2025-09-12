export interface Procedure {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  institution: string;
  category: string;
  subcategory?: string;
  duration: string;
  type: 'digital' | 'presencial' | 'mixto';
  userType: 'persona' | 'empresa' | 'ambos';
  requirements: string[];
  steps: string[];
  isDigital: boolean;
  respaldo_legal?: string;
  fecha_actualizado?: string;
  fecha_revision?: string;
}

export interface UserProcedure {
  id: string;
  procedureId: string;
  procedureName: string;
  status: 'recibido' | 'en-revision' | 'aprobado' | 'observado';
  submittedDate: string;
  estimatedCompletion: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface FormData {
  name: string;
  cui: string;
  email: string;
  phone: string;
  document?: File;
  additionalInfo?: string;
}