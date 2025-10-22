import { supabase } from './supabase';
import observatoryData from '../data/observatory';

export interface Institution {
  id: string;
  name: string;
  full_name: string;
  description?: string;
  category: string;
  website?: string;
  phone?: number | string;
  email?: string;
  address?: string;
  working_hours?: string;
  services?: string;
  is_digital_enabled: boolean;
  social_media?: string;
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
  costo?: string | number;
  documento_obtenible?: string;
  enlace?: string;
  created_at: string;
  updated_at: string;
  institutions?: Institution;
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


export const proceduresService = {
  async getAll(): Promise<Procedure[]> {
    const { data, error } = await supabase
      .from('procedures')
      .select(`
        *,
        institutions (*)
      `)
      .order('name');

    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Procedure | null> {
    const { data, error } = await supabase
      .from('procedures')
      .select(`
        *,
        institutions (*)
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getByCategory(category: string): Promise<Procedure[]> {
    const { data, error } = await supabase
      .from('procedures')
      .select(`
        *,
        institutions (*)
      `)
      .eq('category', category)
      .order('name');

    if (error) throw error;
    return data || [];
  },

  async search(query: string): Promise<Procedure[]> {
    const { data, error } = await supabase
      .from('procedures')
      .select(`
        *,
        institutions (*)
      `)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order('name');

    if (error) throw error;
    return data || [];
  }
};

export const institutionsService = {
  async getAll(): Promise<Institution[]> {
    const { data, error } = await supabase
      .from('institutions')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Institution | null> {
    const { data, error } = await supabase
      .from('institutions')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  }
};

const commentsStorage: { [key: string]: ProcedureComment[] } = {};
const votesStorage: CommentHelpfulVote[] = [];

export const commentsService = {
  async getByProcedureId(procedureId: string): Promise<ProcedureComment[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(commentsStorage[procedureId] || []);
      }, 100);
    });
  },

  async addComment(
    procedureId: string,
    commentData: {
      author_name: string;
      author_email?: string;
      rating: number;
      comment: string;
    }
  ): Promise<ProcedureComment> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newComment: ProcedureComment = {
          id: Math.random().toString(36).substring(2, 15),
          procedure_id: procedureId,
          ...commentData,
          helpful_count: 0,
          is_verified: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        if (!commentsStorage[procedureId]) {
          commentsStorage[procedureId] = [];
        }
        commentsStorage[procedureId].unshift(newComment);
        resolve(newComment);
      }, 100);
    });
  },

  async markHelpful(commentId: string, voterIp: string): Promise<{ success: boolean; error?: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingVote = votesStorage.find(
          v => v.comment_id === commentId && v.voter_ip === voterIp
        );

        if (existingVote) {
          resolve({ success: false, error: 'Ya has marcado este comentario como útil' });
          return;
        }

        const vote: CommentHelpfulVote = {
          id: Math.random().toString(36).substring(2, 15),
          comment_id: commentId,
          voter_ip: voterIp,
          created_at: new Date().toISOString()
        };

        votesStorage.push(vote);

        for (const procId in commentsStorage) {
          const comment = commentsStorage[procId].find(c => c.id === commentId);
          if (comment) {
            comment.helpful_count++;
            break;
          }
        }

        resolve({ success: true });
      }, 100);
    });
  }
};

export const observatoryService = {
  async getAll(): Promise<any[]> {
    const { data, error } = await supabase
      .from('observatory')
      .select('*')
      .order('evaluation_score', { ascending: false });

    if (error) throw error;
    return data || [];
  }
};
