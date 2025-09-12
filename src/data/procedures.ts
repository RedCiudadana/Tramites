export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const categories: Category[] = [
  {
    id: 'identidad',
    name: 'Identidad',
    icon: 'User',
    count: 15
  },
  {
    id: 'negocios',
    name: 'Negocios',
    icon: 'Building2',
    count: 25
  },
  {
    id: 'educacion',
    name: 'Educación',
    icon: 'GraduationCap',
    count: 12
  },
  {
    id: 'salud',
    name: 'Salud',
    icon: 'Heart',
    count: 18
  },
  {
    id: 'justicia',
    name: 'Justicia',
    icon: 'Scale',
    count: 8
  },
  {
    id: 'vivienda',
    name: 'Vivienda',
    icon: 'MapPin',
    count: 10
  }
];

// Procedures are now fetched from Supabase via hooks
export const procedures: any[] = [];