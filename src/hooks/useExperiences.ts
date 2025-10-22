import { useState, useEffect } from 'react';
import experiencesData from '../data/experiences.json';

export interface Experience {
  id: string;
  nombre: string;
  descripcion: string;
  icon: string;
  color: string;
  categoria: string;
  duracion_estimada: string;
  ids_procedures: string[];
  pasos_adicionales: string[];
}

export function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);
      setExperiences(experiencesData as Experience[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar experiencias');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    experiences,
    loading,
    error
  };
}
