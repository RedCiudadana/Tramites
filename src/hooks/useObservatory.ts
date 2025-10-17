import { useState, useEffect } from 'react';
import { observatoryService } from '../lib/data';

export interface ObservatoryData {
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
  procedure?: {
    id: string;
    name: string;
    category: string;
    subcategory?: string;
    institution_id?: string;
    institutions?: {
      name: string;
      full_name: string;
    };
  };
}

export function useObservatory() {
  const [observatoryData, setObservatoryData] = useState<ObservatoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchObservatoryData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await observatoryService.getAll();
      setObservatoryData(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos del observatorio');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObservatoryData();
  }, []);

  return {
    observatoryData,
    loading,
    error,
    refetch: fetchObservatoryData
  };
}

export function useObservatoryStats() {
  const { observatoryData, loading, error } = useObservatory();

  const stats = {
    totalProcedures: observatoryData.length,
    totalInstitutions: [...new Set(observatoryData.map(item => item.procedure?.category))].length,
    averageEvaluation: observatoryData.length > 0 
      ? Math.round(observatoryData.reduce((sum, item) => sum + item.evaluation_score, 0) / observatoryData.length)
      : 0,
    digitalProcedures: observatoryData.filter(item => item.is_digital).length,
    excellentProcedures: observatoryData.filter(item => item.maturity_level >= 4.5).length,
    bestProcedures: observatoryData
      .sort((a, b) => b.maturity_level - a.maturity_level)
      .slice(0, 5)
  };

  return {
    stats,
    loading,
    error
  };
}