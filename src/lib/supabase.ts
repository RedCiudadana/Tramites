import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Institution {
  id: string;
  name: string;
  full_name: string;
  description?: string;
  category: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  working_hours?: string;
  services: string[];
  is_digital_enabled: boolean;
  social_media: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Procedure {
  id: string;
  name: string;
  description: string;
  full_description: string;
  institution_id?: string;
  category: string;
  subcategory?: string;
  duration: string;
  type: string;
  user_type: string;
  requirements: string[];
  steps: string[];
  is_digital: boolean;
  respaldo_legal?: string;
  fecha_actualizado?: string;
  fecha_revision?: string;
  codigo_moneda?: string;
  costo?: string;
  documento_obtenible?: string;
  enlace?: string;
  created_at: string;
  updated_at: string;
}

export interface ProcedureComment {
  id: string;
  procedure_id: string;
  author_name: string;
  author_email?: string;
  rating: number;
  comment: string;
  helpful_count: number;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface CommentHelpfulVote {
  id: string;
  comment_id: string;
  voter_ip: string;
  created_at: string;
}

export interface ObservatoryData {
  id: string;
  procedure_id: string;
  maturity_level: number;
  evaluation_score: number;
  evaluation_components: Record<string, number>;
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

// Database service functions
export const proceduresService = {
  async getAll() {
    const { data, error } = await supabase
      .from('procedures')
      .select(`
        *,
        institutions (
          name,
          full_name,
          category,
          website,
          phone,
          email
        )
      `)
      .order('name');
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('procedures')
      .select(`
        *,
        institutions (
          name,
          full_name,
          category,
          website,
          phone,
          email,
          address,
          working_hours
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('procedures')
      .select(`
        *,
        institutions (
          name,
          full_name
        )
      `)
      .eq('category', category)
      .order('name');
    
    if (error) throw error;
    return data;
  },

  async search(query: string) {
    const { data, error } = await supabase
      .from('procedures')
      .select(`
        *,
        institutions (
          name,
          full_name
        )
      `)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,full_description.ilike.%${query}%`)
      .order('name');
    
    if (error) throw error;
    return data;
  }
};

export const institutionsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('institutions')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('institutions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }
};