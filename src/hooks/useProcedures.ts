import { useState, useEffect, useMemo } from 'react';
import { Procedure } from '../types';
import { procedures as allProcedures } from '../data/procedures';

interface UseProceduresOptions {
  category?: string;
  type?: string;
  userType?: string;
  search?: string;
}

export function useProcedures(options: UseProceduresOptions = {}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate loading time for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [options]);

  const procedures = useMemo(() => {
    let filtered = [...allProcedures];

    // Apply filters
    if (options.category) {
      filtered = filtered.filter(proc => proc.category === options.category);
    }

    if (options.type) {
      filtered = filtered.filter(proc => proc.type === options.type);
    }

    if (options.userType) {
      filtered = filtered.filter(proc => 
        proc.userType === options.userType || proc.userType === 'ambos'
      );
    }

    if (options.search) {
      const searchLower = options.search.toLowerCase();
      filtered = filtered.filter(proc =>
        proc.name.toLowerCase().includes(searchLower) ||
        proc.description.toLowerCase().includes(searchLower) ||
        proc.fullDescription.toLowerCase().includes(searchLower) ||
        proc.institution.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [options.category, options.type, options.userType, options.search]);

  const refetch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  return {
    procedures,
    loading,
    error,
    refetch
  };
}