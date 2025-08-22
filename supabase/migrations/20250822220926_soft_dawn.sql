/*
  # Sistema de Comentarios para Trámites

  1. Nueva Tabla
    - `procedure_comments`
      - `id` (uuid, primary key)
      - `procedure_id` (text, referencia al trámite)
      - `author_name` (text, nombre del autor)
      - `author_email` (text, email opcional)
      - `rating` (integer, calificación 1-5)
      - `comment` (text, contenido del comentario)
      - `helpful_count` (integer, contador de votos útiles)
      - `is_verified` (boolean, si está verificado por moderadores)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Tabla de Votos Útiles
    - `comment_helpful_votes`
      - `id` (uuid, primary key)
      - `comment_id` (uuid, referencia al comentario)
      - `voter_ip` (text, IP del votante para evitar duplicados)
      - `created_at` (timestamp)

  3. Seguridad
    - Enable RLS en ambas tablas
    - Políticas para lectura pública y escritura controlada
*/

-- Crear tabla de comentarios
CREATE TABLE IF NOT EXISTS procedure_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  procedure_id text NOT NULL,
  author_name text NOT NULL,
  author_email text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  helpful_count integer DEFAULT 0,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Crear tabla de votos útiles
CREATE TABLE IF NOT EXISTS comment_helpful_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id uuid NOT NULL REFERENCES procedure_comments(id) ON DELETE CASCADE,
  voter_ip text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(comment_id, voter_ip)
);

-- Habilitar RLS
ALTER TABLE procedure_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_helpful_votes ENABLE ROW LEVEL SECURITY;

-- Políticas para comentarios
CREATE POLICY "Los comentarios son públicos para lectura"
  ON procedure_comments
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Cualquiera puede crear comentarios"
  ON procedure_comments
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Solo moderadores pueden actualizar comentarios"
  ON procedure_comments
  FOR UPDATE
  TO public
  USING (false);

-- Políticas para votos útiles
CREATE POLICY "Los votos son públicos para lectura"
  ON comment_helpful_votes
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Cualquiera puede votar (una vez por IP)"
  ON comment_helpful_votes
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_procedure_comments_procedure_id ON procedure_comments(procedure_id);
CREATE INDEX IF NOT EXISTS idx_procedure_comments_created_at ON procedure_comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comment_helpful_votes_comment_id ON comment_helpful_votes(comment_id);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
CREATE TRIGGER update_procedure_comments_updated_at
  BEFORE UPDATE ON procedure_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();