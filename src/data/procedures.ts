import { Procedure, Category, Institution } from '../types';
import { parseCSV, arrayFromString, booleanFromString } from '../utils/csvParser';

// Import CSV files as text
import institutionsCSV from './institutions.csv?raw';
import proceduresCSV from './procedures.csv?raw';

export const categories: Category[] = [
  {
    id: 'identidad',
    name: 'Identidad',
    icon: 'User',
    count: 0
  },
  {
    id: 'negocios',
    name: 'Negocios',
    icon: 'Building2',
    count: 0
  },
  {
    id: 'educacion',
    name: 'Educación',
    icon: 'GraduationCap',
    count: 0
  },
  {
    id: 'salud',
    name: 'Salud',
    icon: 'Heart',
    count: 0
  },
  {
    id: 'justicia',
    name: 'Justicia',
    icon: 'Scale',
    count: 0
  },
  {
    id: 'vivienda',
    name: 'Vivienda',
    icon: 'MapPin',
    count: 0
  },
  {
    id: 'trabajo',
    name: 'Trabajo',
    icon: 'Briefcase',
    count: 0
  },
  {
    id: 'ambiente',
    name: 'Ambiente',
    icon: 'Leaf',
    count: 0
  }
];

// Parse institutions from CSV
function parseInstitutions(): Institution[] {
  const rows = parseCSV(institutionsCSV);
  
  return rows.map(row => ({
    id: row.id,
    name: row.name,
    fullName: row.full_name,
    description: row.description,
    category: row.category,
    website: row.website || undefined,
    phone: row.phone || undefined,
    email: row.email || undefined,
    address: row.address || undefined,
    workingHours: row.working_hours || undefined,
    services: arrayFromString(row.services),
    isDigitalEnabled: booleanFromString(row.is_digital_enabled),
    socialMedia: row.social_media ? { facebook: row.social_media } : undefined,
    lastUpdated: new Date().toISOString()
  }));
}

// Parse procedures from CSV
function parseProcedures(): Procedure[] {
  const rows = parseCSV(proceduresCSV);
  const institutions = parseInstitutions();
  
  return rows.map(row => {
    const institution = institutions.find(inst => inst.id === row.institution_id);
    
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      fullDescription: row.full_description,
      institution: institution?.name || 'Institución no encontrada',
      category: row.category,
      subcategory: row.subcategory || undefined,
      duration: row.duration,
      type: row.type as 'digital' | 'presencial' | 'mixto',
      userType: row.user_type as 'persona' | 'empresa' | 'ambos',
      requirements: arrayFromString(row.requirements),
      steps: arrayFromString(row.steps),
      isDigital: booleanFromString(row.is_digital),
      respaldo_legal: row.respaldo_legal || undefined,
      fecha_actualizado: row.fecha_actualizado || undefined,
      fecha_revision: row.fecha_revision || undefined,
      institutionId: row.institution_id,
      institutionData: institution ? {
        id: institution.id,
        name: institution.name,
        full_name: institution.fullName,
        phone: institution.phone,
        email: institution.email,
        website: institution.website,
        address: institution.address,
        working_hours: institution.workingHours,
        services: institution.services
      } : undefined
    };
  });
}

// Export parsed data
export const institutions = parseInstitutions();
export const procedures = parseProcedures();

// Update category counts
categories.forEach(category => {
  category.count = procedures.filter(proc => proc.category === category.id).length;
});