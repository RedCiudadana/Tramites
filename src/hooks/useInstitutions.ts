import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Institution } from '../types';

interface UseInstitutionsOptions {
  category?: string;
  digitalOnly?: boolean;
  search?: string;
}

export function useInstitutions(options: UseInstitutionsOptions = {}) {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInstitutions();
  }, [options.category, options.digitalOnly, options.search]);

  const fetchInstitutions = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from('institutions').select('*');

      // Apply filters
      if (options.category) {
        query = query.eq('category', options.category);
      }

      if (options.digitalOnly) {
        query = query.eq('is_digital_enabled', true);
      }

      if (options.search) {
        query = query.or(`name.ilike.%${options.search}%,full_name.ilike.%${options.search}%,description.ilike.%${options.search}%`);
      }

      const { data, error } = await query.order('name');

      if (error) throw error;

      // Transform data to match our Institution interface
      const transformedData: Institution[] = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        fullName: item.full_name,
        description: item.description,
        category: item.category,
        website: item.website,
        phone: item.phone,
        email: item.email,
        address: item.address,
        workingHours: item.working_hours,
        services: item.services || [],
        isDigitalEnabled: item.is_digital_enabled,
        socialMedia: item.social_media,
        lastUpdated: item.updated_at
      }));

      setInstitutions(transformedData);
    } catch (err) {
      console.error('Error fetching institutions:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return {
    institutions,
    loading,
    error,
    refetch: fetchInstitutions
  };
}