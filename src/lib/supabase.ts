import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      institutions: {
        Row: {
          id: string;
          name: string;
          full_name: string;
          description: string | null;
          category: string;
          website: string | null;
          phone: string | null;
          email: string | null;
          address: string | null;
          working_hours: string | null;
          services: string[];
          is_digital_enabled: boolean;
          social_media: any | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          full_name: string;
          description?: string | null;
          category: string;
          website?: string | null;
          phone?: string | null;
          email?: string | null;
          address?: string | null;
          working_hours?: string | null;
          services?: string[];
          is_digital_enabled?: boolean;
          social_media?: any | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          full_name?: string;
          description?: string | null;
          category?: string;
          website?: string | null;
          phone?: string | null;
          email?: string | null;
          address?: string | null;
          working_hours?: string | null;
          services?: string[];
          is_digital_enabled?: boolean;
          social_media?: any | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      procedures: {
        Row: {
          id: string;
          name: string;
          description: string;
          full_description: string;
          institution_id: string | null;
          category: string;
          subcategory: string | null;
          duration: string;
          type: 'digital' | 'presencial' | 'mixto';
          user_type: 'persona' | 'empresa' | 'ambos';
          requirements: string[];
          steps: string[];
          is_digital: boolean;
          respaldo_legal: string | null;
          fecha_actualizado: string | null;
          fecha_revision: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          full_description: string;
          institution_id?: string | null;
          category: string;
          subcategory?: string | null;
          duration: string;
          type: 'digital' | 'presencial' | 'mixto';
          user_type: 'persona' | 'empresa' | 'ambos';
          requirements?: string[];
          steps?: string[];
          is_digital?: boolean;
          respaldo_legal?: string | null;
          fecha_actualizado?: string | null;
          fecha_revision?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          full_description?: string;
          institution_id?: string | null;
          category?: string;
          subcategory?: string | null;
          duration?: string;
          type?: 'digital' | 'presencial' | 'mixto';
          user_type?: 'persona' | 'empresa' | 'ambos';
          requirements?: string[];
          steps?: string[];
          is_digital?: boolean;
          respaldo_legal?: string | null;
          fecha_actualizado?: string | null;
          fecha_revision?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}