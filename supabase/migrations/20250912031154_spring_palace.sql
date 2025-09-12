/*
  # Seed Institutions Data

  Insert comprehensive institution data for Guatemala
*/

-- Insert institutions
INSERT INTO institutions (id, name, full_name, description, category, website, phone, email, address, working_hours, services, is_digital_enabled, social_media) VALUES

-- RENAP
('550e8400-e29b-41d4-a716-446655440001', 'RENAP', 'Registro Nacional de las Personas', 'Institución encargada de la identificación y registro civil de los guatemaltecos', 'identidad', 'https://www.renap.gob.gt', '1551', 'info@renap.gob.gt', '6a Avenida 4-64, Zona 1, Ciudad de Guatemala', 'Lunes a Viernes: 8:00 AM - 4:00 PM', ARRAY['Emisión de DPI', 'Certificaciones de nacimiento', 'Certificaciones de defunción', 'Certificaciones de matrimonio', 'Cambio de nombre'], true, '{"facebook": "https://facebook.com/renapguatemala", "twitter": "https://twitter.com/renapgt"}'),

-- Registro Mercantil
('550e8400-e29b-41d4-a716-446655440002', 'Registro Mercantil', 'Registro Mercantil General de la República', 'Registro de empresas, comerciantes individuales y sociedades mercantiles', 'negocios', 'https://www.registromercantil.gob.gt', '2412-0000', 'info@registromercantil.gob.gt', '7a Avenida 7-61, Zona 4, Ciudad de Guatemala', 'Lunes a Viernes: 8:00 AM - 4:30 PM', ARRAY['Inscripción de empresas', 'Patentes de comercio', 'Modificaciones societarias', 'Certificaciones mercantiles', 'Registro de marcas'], true, '{"facebook": "https://facebook.com/registromercantilgt"}'),

-- USAC
('550e8400-e29b-41d4-a716-446655440003', 'USAC', 'Universidad de San Carlos de Guatemala', 'Universidad pública, autónoma y laica de Guatemala', 'educacion', 'https://www.usac.edu.gt', '2418-8000', 'webmaster@usac.edu.gt', 'Ciudad Universitaria, Zona 12, Ciudad de Guatemala', 'Lunes a Viernes: 7:00 AM - 5:00 PM', ARRAY['Inscripciones universitarias', 'Certificaciones académicas', 'Títulos universitarios', 'Equivalencias', 'Cursos de extensión'], true, '{"facebook": "https://facebook.com/usacgt", "twitter": "https://twitter.com/usacgt"}'),

-- MSPAS
('550e8400-e29b-41d4-a716-446655440004', 'MSPAS', 'Ministerio de Salud Pública y Asistencia Social', 'Ministerio encargado de formular políticas y programas en materia de salud pública', 'salud', 'https://www.mspas.gob.gt', '2440-4747', 'info@mspas.gob.gt', '6a Avenida 3-45, Zona 11, Ciudad de Guatemala', 'Lunes a Viernes: 8:00 AM - 4:00 PM', ARRAY['Certificados de salud', 'Licencias sanitarias', 'Registro de medicamentos', 'Permisos de funcionamiento', 'Certificaciones médicas'], false, '{"facebook": "https://facebook.com/mspasguatemala"}'),

-- Organismo Judicial
('550e8400-e29b-41d4-a716-446655440005', 'Organismo Judicial', 'Organismo Judicial de Guatemala', 'Encargado de la administración de justicia y protección de derechos constitucionales', 'justicia', 'https://www.oj.gob.gt', '1572', 'info@oj.gob.gt', '21 Calle 9-23, Zona 1, Ciudad de Guatemala', 'Lunes a Viernes: 8:00 AM - 4:00 PM', ARRAY['Antecedentes penales', 'Certificaciones judiciales', 'Cartas de recomendación', 'Constancias judiciales'], true, '{"facebook": "https://facebook.com/organismoJudicialGT"}'),

-- Municipalidad de Guatemala
('550e8400-e29b-41d4-a716-446655440006', 'Municipalidad de Guatemala', 'Municipalidad de Guatemala', 'Gobierno local de la Ciudad de Guatemala', 'vivienda', 'https://www.muniguate.gob.gt', '2285-8000', 'info@muniguate.gob.gt', '21 Calle 6-77, Zona 1, Ciudad de Guatemala', 'Lunes a Viernes: 8:00 AM - 4:00 PM', ARRAY['Licencias de construcción', 'Boleto de ornato', 'Permisos de funcionamiento', 'Certificaciones municipales', 'Servicios públicos'], true, '{"facebook": "https://facebook.com/muniguate"}'),

-- SAT
('550e8400-e29b-41d4-a716-446655440007', 'SAT', 'Superintendencia de Administración Tributaria', 'Institución encargada de la administración tributaria y aduanera', 'negocios', 'https://www.sat.gob.gt', '1544', 'info@sat.gob.gt', '8a Avenida 18-67, Zona 12, Ciudad de Guatemala', 'Lunes a Viernes: 8:00 AM - 4:00 PM', ARRAY['Inscripción de contribuyentes', 'Declaraciones tributarias', 'Certificaciones tributarias', 'Exenciones fiscales', 'Régimen de pequeño contribuyente'], true, '{"facebook": "https://facebook.com/satguatemala", "twitter": "https://twitter.com/satgt"}'),

-- IGSS
('550e8400-e29b-41d4-a716-446655440008', 'IGSS', 'Instituto Guatemalteco de Seguridad Social', 'Institución de seguridad social que brinda protección a los trabajadores', 'salud', 'https://www.igssgt.org', '2412-1224', 'info@igssgt.org', '7a Avenida 22-72, Zona 1, Ciudad de Guatemala', 'Lunes a Viernes: 8:00 AM - 4:00 PM', ARRAY['Afiliación de trabajadores', 'Prestaciones médicas', 'Pensiones', 'Subsidios', 'Certificaciones laborales'], true, '{"facebook": "https://facebook.com/igssoficial"}');