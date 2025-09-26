/*
  # Create Observatory Data Table

  1. New Tables
    - `observatory_data`
      - `id` (uuid, primary key)
      - `procedure_id` (uuid, foreign key to procedures table)
      - `maturity_level` (decimal, 0-5 scale)
      - `evaluation_score` (integer, 0-100 percentage)
      - `evaluation_components` (jsonb, detailed component scores)
      - `average_time` (text, human readable time estimate)
      - `monthly_users` (integer, number of users per month)
      - `satisfaction_rate` (integer, 0-100 percentage)
      - `is_digital` (boolean, digital availability)
      - `issues` (text array, list of identified issues)
      - `recommendations` (text array, list of recommendations)
      - `last_updated` (date, when data was last updated)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `observatory_data` table
    - Add policy for public read access
    - Add policy for authenticated users to insert/update

  3. Indexes
    - Index on procedure_id for fast lookups
    - Index on maturity_level for filtering
    - Index on evaluation_score for sorting
    - Index on last_updated for freshness queries
*/

-- Create the observatory_data table
CREATE TABLE IF NOT EXISTS observatory_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  procedure_id uuid NOT NULL REFERENCES procedures(id) ON DELETE CASCADE,
  maturity_level decimal(3,2) NOT NULL DEFAULT 0.0 CHECK (maturity_level >= 0.0 AND maturity_level <= 5.0),
  evaluation_score integer NOT NULL DEFAULT 0 CHECK (evaluation_score >= 0 AND evaluation_score <= 100),
  evaluation_components jsonb NOT NULL DEFAULT '{
    "digitalizacion": 0.0,
    "simplificacion": 0.0,
    "interoperabilidad": 0.0,
    "trazabilidad": 0.0,
    "accesibilidad": 0.0,
    "satisfaccionUsuario": 0.0
  }'::jsonb,
  average_time text NOT NULL DEFAULT '',
  monthly_users integer NOT NULL DEFAULT 0 CHECK (monthly_users >= 0),
  satisfaction_rate integer NOT NULL DEFAULT 0 CHECK (satisfaction_rate >= 0 AND satisfaction_rate <= 100),
  is_digital boolean NOT NULL DEFAULT false,
  issues text[] NOT NULL DEFAULT '{}',
  recommendations text[] NOT NULL DEFAULT '{}',
  last_updated date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE observatory_data ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Observatory data is publicly readable"
  ON observatory_data
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert observatory data"
  ON observatory_data
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update observatory data"
  ON observatory_data
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_observatory_data_procedure_id 
  ON observatory_data (procedure_id);

CREATE INDEX IF NOT EXISTS idx_observatory_data_maturity_level 
  ON observatory_data (maturity_level DESC);

CREATE INDEX IF NOT EXISTS idx_observatory_data_evaluation_score 
  ON observatory_data (evaluation_score DESC);

CREATE INDEX IF NOT EXISTS idx_observatory_data_last_updated 
  ON observatory_data (last_updated DESC);

CREATE INDEX IF NOT EXISTS idx_observatory_data_satisfaction_rate 
  ON observatory_data (satisfaction_rate DESC);

CREATE INDEX IF NOT EXISTS idx_observatory_data_monthly_users 
  ON observatory_data (monthly_users DESC);

-- Create trigger for updating updated_at timestamp
CREATE TRIGGER update_observatory_data_updated_at
  BEFORE UPDATE ON observatory_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add constraint to ensure unique observatory data per procedure
ALTER TABLE observatory_data 
ADD CONSTRAINT unique_procedure_observatory 
UNIQUE (procedure_id);

-- Add comments for documentation
COMMENT ON TABLE observatory_data IS 'Observatory analysis data for government procedures';
COMMENT ON COLUMN observatory_data.maturity_level IS 'Overall maturity level from 0.0 to 5.0';
COMMENT ON COLUMN observatory_data.evaluation_score IS 'Overall evaluation score from 0 to 100';
COMMENT ON COLUMN observatory_data.evaluation_components IS 'Detailed component scores in JSON format';
COMMENT ON COLUMN observatory_data.average_time IS 'Human readable average processing time';
COMMENT ON COLUMN observatory_data.monthly_users IS 'Number of users per month';
COMMENT ON COLUMN observatory_data.satisfaction_rate IS 'User satisfaction rate from 0 to 100';
COMMENT ON COLUMN observatory_data.is_digital IS 'Whether the procedure is available digitally';
COMMENT ON COLUMN observatory_data.issues IS 'Array of identified issues';
COMMENT ON COLUMN observatory_data.recommendations IS 'Array of improvement recommendations';
COMMENT ON COLUMN observatory_data.last_updated IS 'Date when the analysis was last updated';