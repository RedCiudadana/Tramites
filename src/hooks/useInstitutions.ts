import { useState, useEffect, useMemo } from 'react';
import { Institution } from '../types';
import { institutions as allInstitutions } from '../data/procedures';

interface UseInstitutionsOptions {
  category?: string;
  digitalOnly?: boolean;
  search?: string;
}

export function useInstitutions(options: UseInstitutionsOptions = {}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate loading time for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [options]);

  const institutions = useMemo(() => {
    let filtered = [...allInstitutions];

    // Apply filters
    if (options.category) {
      filtered = filtered.filter(inst => inst.category === options.category);
    }

    if (options.digitalOnly) {
      filtered = filtered.filter(inst => inst.isDigitalEnabled);
    }

    if (options.search) {
      const searchLower = options.search.toLowerCase();
      filtered = filtered.filter(inst =>
        inst.name.toLowerCase().includes(searchLower) ||
        inst.fullName.toLowerCase().includes(searchLower) ||
        inst.description.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [options.category, options.digitalOnly, options.search]);

  const refetch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  return {
    institutions,
    loading,
    error,
    refetch
  };
}