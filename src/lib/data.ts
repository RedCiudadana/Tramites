import institutionsData from '../data/Copia de instituciones.json';
import proceduresData from '../data/Copia de procedures.json';
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

const institutions = institutionsData as Institution[];
const procedures = proceduresData as Procedure[];

const enrichedProcedures = procedures.map(procedure => {
  const institution = institutions.find(inst => inst.id === procedure.institution_id);
  return {
    ...procedure,
    institutions: institution
  };
});

export const proceduresService = {
  async getAll(): Promise<Procedure[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(enrichedProcedures), 100);
    });
  },

  async getById(id: string): Promise<Procedure | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const procedure = enrichedProcedures.find(p => p.id === id);
        resolve(procedure || null);
      }, 100);
    });
  },

  async getByCategory(category: string): Promise<Procedure[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = enrichedProcedures.filter(p => p.category === category);
        resolve(filtered);
      }, 100);
    });
  },

  async search(query: string): Promise<Procedure[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerQuery = query.toLowerCase();
        const filtered = enrichedProcedures.filter(p =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.description.toLowerCase().includes(lowerQuery) ||
          p.full_description.toLowerCase().includes(lowerQuery)
        );
        resolve(filtered);
      }, 100);
    });
  }
};

export const institutionsService = {
  async getAll(): Promise<Institution[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(institutions), 100);
    });
  },

  async getById(id: string): Promise<Institution | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const institution = institutions.find(i => i.id === id);
        resolve(institution || null);
      }, 100);
    });
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
    return new Promise((resolve) => {
      setTimeout(() => {
        const enrichedObservatory = observatoryData.map(item => {
          const procedure = enrichedProcedures.find(p => p.id === item.procedure_id);
          return {
            ...item,
            procedure: procedure ? {
              id: procedure.id,
              name: procedure.name,
              category: procedure.category,
              subcategory: procedure.subcategory,
              institution_id: procedure.institution_id,
              institutions: procedure.institutions ? {
                name: procedure.institutions.name,
                full_name: procedure.institutions.full_name
              } : undefined
            } : undefined
          };
        });
        resolve(enrichedObservatory);
      }, 100);
    });
  }
};
