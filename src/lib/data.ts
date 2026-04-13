import institutionsData from '../data/institutions';
import proceduresData from '../data/procedures';
import observatoryData from '../data/observatory';
import type { InstitutionData } from '../data/institutions';
import type { ProcedureData } from '../data/procedures';

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

function mapInstitution(raw: InstitutionData): Institution {
  return {
    ...raw,
    id: String(raw.id),
    category: '',
  };
}

function mapProcedure(raw: ProcedureData, institution?: InstitutionData): Procedure {
  return {
    ...raw,
    id: String(raw.id),
    institution_id: String(raw.institution_id),
    requirements: raw.requirements.split(', '),
    steps: raw.steps.split(', '),
    codigo_moneda: raw.codigo_moneda ?? undefined,
    costo: raw.costo ?? undefined,
    documento_obtenible: raw.documento_obtenible ?? undefined,
    enlace: raw.enlace ?? undefined,
    institutions: institution ? mapInstitution(institution) : undefined,
  };
}

export const proceduresService = {
  async getAll(): Promise<Procedure[]> {
    const sorted = [...proceduresData].sort((a, b) => a.name.localeCompare(b.name));
    return sorted.map(p => {
      const inst = institutionsData.find(i => i.id === p.institution_id);
      return mapProcedure(p, inst);
    });
  },

  async getById(id: string): Promise<Procedure | null> {
    const numId = Number(id);
    const raw = proceduresData.find(p => p.id === numId);
    if (!raw) return null;
    const inst = institutionsData.find(i => i.id === raw.institution_id);
    return mapProcedure(raw, inst);
  },

  async getByCategory(category: string): Promise<Procedure[]> {
    const filtered = proceduresData
      .filter(p => p.category === category)
      .sort((a, b) => a.name.localeCompare(b.name));
    return filtered.map(p => {
      const inst = institutionsData.find(i => i.id === p.institution_id);
      return mapProcedure(p, inst);
    });
  },

  async search(query: string): Promise<Procedure[]> {
    const lower = query.toLowerCase();
    const filtered = proceduresData
      .filter(p =>
        p.name.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
    return filtered.map(p => {
      const inst = institutionsData.find(i => i.id === p.institution_id);
      return mapProcedure(p, inst);
    });
  }
};

export const institutionsService = {
  async getAll(): Promise<Institution[]> {
    const sorted = [...institutionsData].sort((a, b) => a.name.localeCompare(b.name));
    return sorted.map(mapInstitution);
  },

  async getById(id: string): Promise<Institution | null> {
    const numId = Number(id);
    const raw = institutionsData.find(i => i.id === numId);
    if (!raw) return null;
    return mapInstitution(raw);
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
    const sorted = [...observatoryData].sort((a, b) => b.evaluation_score - a.evaluation_score);
    return sorted;
  }
};
