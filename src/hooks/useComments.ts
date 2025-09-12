import { useState, useEffect } from 'react';
import { supabase, ProcedureComment } from '../lib/supabase';

export function useComments(procedureId: string) {
  const [comments, setComments] = useState<ProcedureComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar comentarios
  const fetchComments = async () => {
    try {
      setLoading(true);
      await supabase
        .from('procedure_comments')
        .select('*')
        .eq('procedure_id', procedureId)
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (error) throw error;
          setComments(data || []);
          setLoading(false);
        });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar comentarios');
      setLoading(false);
    } finally {
      // Loading is handled in the promise chain above
    }
  };

  // Agregar nuevo comentario
  const addComment = async (commentData: {
    author_name: string;
    author_email?: string;
    rating: number;
    comment: string;
  }) => {
    try {
      return new Promise((resolve) => {
        supabase
        .from('procedure_comments')
        .insert([
          {
            procedure_id: procedureId,
            ...commentData
          }
        ])
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          // Agregar el nuevo comentario al estado local
          setComments(prev => [data, ...prev]);
          resolve({ success: true, data });
        });
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al agregar comentario';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Marcar comentario como útil
  const markHelpful = async (commentId: string) => {
    try {
      // Obtener IP del usuario (simulada para desarrollo)
      const voterIp = await getClientIP();

      // Verificar si ya votó
      return new Promise((resolve) => {
        supabase
        .from('comment_helpful_votes')
        .select('id')
        .eq('comment_id', commentId)
        .eq('voter_ip', voterIp)
        .single()
        .then(({ data: existingVote }) => {
          if (existingVote) {
            resolve({ success: false, error: 'Ya has marcado este comentario como útil' });
            return;
          }

          // Agregar voto
          supabase
            .from('comment_helpful_votes')
            .insert([
              {
                comment_id: commentId,
                voter_ip: voterIp
              }
            ])
            .then(() => {
              // Actualizar contador en el comentario usando RPC
              supabase.rpc('increment_helpful_count', {
                comment_id: commentId
              }).then(() => {
                // Actualizar estado local
                setComments(prev => prev.map(comment => 
                  comment.id === commentId 
                    ? { ...comment, helpful_count: comment.helpful_count + 1 }
                    : comment
                ));
                resolve({ success: true });
              });
            });
        });
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al marcar como útil';
      return { success: false, error: errorMessage };
    }
  };

  // Función auxiliar para obtener IP (simulada)
  const getClientIP = async (): Promise<string> => {
    try {
      // En producción, podrías usar un servicio como ipapi.co
      // Por ahora, generamos un identificador único por sesión
      let sessionId = localStorage.getItem('session_id');
      if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2, 15);
        localStorage.setItem('session_id', sessionId);
      }
      return sessionId;
    } catch {
      return Math.random().toString(36).substring(2, 15);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [procedureId]);

  return {
    comments,
    loading,
    error,
    addComment,
    markHelpful,
    refetch: fetchComments
  };
}