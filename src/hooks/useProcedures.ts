import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Procedure } from '../types';

interface UseProceduresOptions {
  category?: string;
  type?: string;
  userType?: string;
  search?: string;
}

export function useProcedures(options: UseProceduresOptions = {}) {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProcedures();
  }, [options.category, options.type, options.userType, options.search]);

  const fetchProcedures = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('procedures')
        .select(`
          *,
          institutions (
            id,
            name,
            full_name,
            phone,
            email,
            website,
            address,
            working_hours,
            services
          )
        `);

      // Apply filters
      if (options.category) {
        query = query.eq('category', options.category);
      }

      if (options.type) {
        query = query.eq('type', options.type);
      }

      if (options.userType) {
        query = query.or(`user_type.eq.${options.userType},user_type.eq.ambos`);
      }

      if (options.search) {
        query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%,full_description.ilike.%${options.search}%`);
      }

      const { data, error } = await query.order('name');

      if (error) throw error;

      // Transform data to match our Procedure interface
      const transformedData: Procedure[] = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        fullDescription: item.full_description,
        institution: item.institutions?.name || 'Institución no encontrada',
        category: item.category,
        subcategory: item.subcategory,
        duration: item.duration,
        type: item.type,
        userType: item.user_type,
        requirements: item.requirements || [],
        steps: item.steps || [],
        isDigital: item.is_digital,
        respaldo_legal: item.respaldo_legal,
        fecha_actualizado: item.fecha_actualizado,
        fecha_revision: item.fecha_revision,
        institutionId: item.institution_id,
        institutionData: item.institutions
      }));

      setProcedures(transformedData);
    } catch (err) {
      console.error('Error fetching procedures:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return {
    procedures,
    loading,
    error,
    refetch: fetchProcedures
  };
}