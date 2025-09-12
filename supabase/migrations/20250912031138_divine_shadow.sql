/*
  # Create Procedures Database

  1. New Tables
    - `institutions`
      - `id` (uuid, primary key)
      - `name` (text, short name)
      - `full_name` (text, complete official name)
      - `description` (text, institution description)
      - `category` (text, institution category)
      - `website` (text, official website)
      - `phone` (text, contact phone)
      - `email` (text, contact email)
      - `address` (text, physical address)
      - `working_hours` (text, service hours)
      - `services` (text[], array of services)
      - `is_digital_enabled` (boolean, offers digital services)
      - `social_media` (jsonb, social media links)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `procedures`
      - `id` (uuid, primary key)
      - `name` (text, procedure name)
      - `description` (text, short description)
      - `full_description` (text, detailed description)
      - `institution_id` (uuid, foreign key to institutions)
      - `category` (text, procedure category)
      - `subcategory` (text, procedure subcategory)
      - `duration` (text, estimated time)
      - `type` (text, digital/presencial/mixto)
      - `user_type` (text, persona/empresa/ambos)
      - `requirements` (text[], array of requirements)
      - `steps` (text[], array of steps)
      - `is_digital` (boolean, fully digital process)
      - `respaldo_legal` (text, legal framework)
      - `fecha_actualizado` (date, last official update)
      - `fecha_revision` (date, last review by Red Ciudadana)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated insert/update
    - Add policies for admin management

  3. Indexes
    - Add indexes for better query performance
    - Category and type filtering
    - Search functionality
    - Foreign key relationships
*/

-- Create institutions table
CREATE TABLE IF NOT EXISTS institutions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  full_name text NOT NULL,
  description text,
  category text NOT NULL,
  website text,
  phone text,
  email text,
  address text,
  working_hours text,
  services text[] DEFAULT '{}',
  is_digital_enabled boolean DEFAULT false,
  social_media jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create procedures table
CREATE TABLE IF NOT EXISTS procedures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  full_description text NOT NULL,
  institution_id uuid REFERENCES institutions(id),
  category text NOT NULL,
  subcategory text,
  duration text NOT NULL,
  type text NOT NULL CHECK (type IN ('digital', 'presencial', 'mixto')),
  user_type text NOT NULL CHECK (user_type IN ('persona', 'empresa', 'ambos')),
  requirements text[] DEFAULT '{}',
  steps text[] DEFAULT '{}',
  is_digital boolean DEFAULT false,
  respaldo_legal text,
  fecha_actualizado date,
  fecha_revision date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_institutions_category ON institutions(category);
CREATE INDEX IF NOT EXISTS idx_institutions_name ON institutions(name);
CREATE INDEX IF NOT EXISTS idx_procedures_category ON procedures(category);
CREATE INDEX IF NOT EXISTS idx_procedures_type ON procedures(type);
CREATE INDEX IF NOT EXISTS idx_procedures_user_type ON procedures(user_type);
CREATE INDEX IF NOT EXISTS idx_procedures_institution_id ON procedures(institution_id);
CREATE INDEX IF NOT EXISTS idx_procedures_name ON procedures(name);

-- Enable Row Level Security
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE procedures ENABLE ROW LEVEL SECURITY;

-- Create policies for institutions
CREATE POLICY "Institutions are publicly readable"
  ON institutions FOR SELECT
  TO public USING (true);

CREATE POLICY "Authenticated users can insert institutions"
  ON institutions FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update institutions"
  ON institutions FOR UPDATE
  TO authenticated USING (true);

-- Create policies for procedures
CREATE POLICY "Procedures are publicly readable"
  ON procedures FOR SELECT
  TO public USING (true);

CREATE POLICY "Authenticated users can insert procedures"
  ON procedures FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update procedures"
  ON procedures FOR UPDATE
  TO authenticated USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_institutions_updated_at
  BEFORE UPDATE ON institutions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_procedures_updated_at
  BEFORE UPDATE ON procedures
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();