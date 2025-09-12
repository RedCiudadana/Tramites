// Mock data storage for comments (replacing Supabase)
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

// Mock data storage (in a real app, this would be persisted)
let mockComments: ProcedureComment[] = [
  {
    id: '1',
    procedure_id: '1',
    author_name: 'María González',
    author_email: 'maria@email.com',
    rating: 4,
    comment: 'El proceso fue bastante rápido, aunque tuve que hacer dos visitas porque no tenía todos los documentos la primera vez.',
    helpful_count: 5,
    is_verified: true,
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    procedure_id: '1',
    author_name: 'Carlos Pérez',
    rating: 5,
    comment: 'Excelente servicio. Todo se hizo en línea y recibí mi DPI en una semana.',
    helpful_count: 8,
    is_verified: false,
    created_at: '2024-01-20T14:15:00Z',
    updated_at: '2024-01-20T14:15:00Z'
  },
  {
    id: '3',
    procedure_id: '2',
    author_name: 'Ana Rodríguez',
    author_email: 'ana@empresa.com',
    rating: 3,
    comment: 'El proceso es largo y requiere muchos documentos. Sería bueno que fuera más digital.',
    helpful_count: 3,
    is_verified: true,
    created_at: '2024-01-18T09:45:00Z',
    updated_at: '2024-01-18T09:45:00Z'
  }
];

let mockVotes: CommentHelpfulVote[] = [];

// Mock Supabase-like API
export const supabase = {
  from: (table: string) => ({
    select: (columns: string = '*') => ({
      eq: (column: string, value: string) => ({
        order: (column: string, options?: { ascending: boolean }) => ({
          then: (callback: (result: { data: ProcedureComment[] | null; error: any }) => void) => {
            if (table === 'procedure_comments') {
              const filteredComments = mockComments.filter(comment => 
                column === 'procedure_id' ? comment.procedure_id === value : true
              );
              
              const sortedComments = options?.ascending === false 
                ? filteredComments.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                : filteredComments.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
              
              callback({ data: sortedComments, error: null });
            }
          }
        })
      }),
      single: () => ({
        then: (callback: (result: { data: CommentHelpfulVote | null; error: any }) => void) => {
          if (table === 'comment_helpful_votes') {
            callback({ data: null, error: null });
          }
        }
      })
    }),
    insert: (data: any[]) => ({
      select: () => ({
        single: () => ({
          then: (callback: (result: { data: ProcedureComment | null; error: any }) => void) => {
            if (table === 'procedure_comments') {
              const newComment: ProcedureComment = {
                id: Date.now().toString(),
                ...data[0],
                helpful_count: 0,
                is_verified: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              };
              mockComments.push(newComment);
              callback({ data: newComment, error: null });
            } else if (table === 'comment_helpful_votes') {
              const newVote: CommentHelpfulVote = {
                id: Date.now().toString(),
                ...data[0],
                created_at: new Date().toISOString()
              };
              mockVotes.push(newVote);
              callback({ data: null, error: null });
            }
          }
        })
      })
    }),
    update: (data: any) => ({
      eq: (column: string, value: string) => ({
        then: (callback: (result: { error: any }) => void) => {
          if (table === 'procedure_comments') {
            const commentIndex = mockComments.findIndex(c => c.id === value);
            if (commentIndex !== -1) {
              mockComments[commentIndex] = { ...mockComments[commentIndex], ...data };
            }
          }
          callback({ error: null });
        }
      })
    })
  }),
  rpc: (functionName: string, params: any) => ({
    then: (callback: (result: { error: any }) => void) => {
      if (functionName === 'increment_helpful_count') {
        const comment = mockComments.find(c => c.id === params.comment_id);
        if (comment) {
          comment.helpful_count += 1;
        }
      }
      callback({ error: null });
    }
  })
};