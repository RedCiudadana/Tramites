/*
  # Seed Procedures Data

  Insert comprehensive procedure data linked to institutions
*/

-- Insert procedures
INSERT INTO procedures (id, name, description, full_description, institution_id, category, subcategory, duration, type, user_type, requirements, steps, is_digital, respaldo_legal, fecha_actualizado, fecha_revision) VALUES

-- RENAP Procedures
('650e8400-e29b-41d4-a716-446655440001', 'Renovación de DPI', 'Renovación del Documento Personal de Identificación', 'Proceso para renovar el DPI cuando está próximo a vencer o ya venció. Es obligatorio para todos los ciudadanos guatemaltecos mayores de edad mantener vigente su documento de identificación.', '550e8400-e29b-41d4-a716-446655440001', 'identidad', 'Documentos de Identificación', '5-7 días hábiles', 'mixto', 'persona', 
ARRAY['DPI anterior (original y fotocopia)', 'Partida de nacimiento certificada (original)', 'Comprobante de residencia (recibo de luz, agua o teléfono)', 'Fotografía reciente tamaño cédula', 'Pago de Q25.00'], 
ARRAY['Solicitar cita en línea o acudir directamente', 'Presentar documentos requeridos en ventanilla', 'Toma de fotografía y huellas dactilares', 'Verificación de datos personales', 'Pago de la tarifa correspondiente', 'Recibir comprobante de trámite', 'Recoger DPI en fecha indicada'], 
false, 'Decreto 90-2005 Ley del Registro Nacional de las Personas', '2024-01-15', '2024-01-20'),

('650e8400-e29b-41d4-a716-446655440002', 'Certificación de Nacimiento', 'Obtención de certificación de partida de nacimiento', 'Documento oficial que certifica el nacimiento de una persona registrada en Guatemala. Es requerido para múltiples trámites oficiales y personales.', '550e8400-e29b-41d4-a716-446655440001', 'identidad', 'Certificaciones Civiles', '1-2 días hábiles', 'digital', 'persona',
ARRAY['DPI del solicitante (si es mayor de edad)', 'DPI de los padres (si el solicitante es menor)', 'Datos completos de la persona: nombres, apellidos, fecha y lugar de nacimiento', 'Pago de Q10.00 por certificación'],
ARRAY['Ingresar al portal web de RENAP', 'Completar formulario con datos personales', 'Realizar pago en línea o en banco', 'Descargar certificación digital', 'Verificar autenticidad con código QR'],
true, 'Decreto 90-2005 Ley del Registro Nacional de las Personas', '2024-01-10', '2024-01-18'),

-- Registro Mercantil Procedures
('650e8400-e29b-41d4-a716-446655440003', 'Inscripción de Empresa', 'Inscripción de sociedad anónima o limitada', 'Proceso legal para constituir e inscribir una empresa en el Registro Mercantil de Guatemala, otorgándole personalidad jurídica para operar comercialmente.', '550e8400-e29b-41d4-a716-446655440002', 'negocios', 'Constitución de Empresas', '15-20 días hábiles', 'presencial', 'empresa',
ARRAY['Escritura pública de constitución', 'Formulario de inscripción completo', 'DPI de socios y representantes legales', 'Comprobante de pago de capital autorizado', 'Nómina de socios con porcentajes de participación', 'Comprobante de pago de aranceles registrales'],
ARRAY['Elaborar escritura pública ante notario', 'Presentar documentos en Registro Mercantil', 'Revisión legal de documentos', 'Pago de aranceles correspondientes', 'Publicación en Diario Oficial', 'Inscripción definitiva', 'Obtención de patente de comercio'],
false, 'Código de Comercio Decreto 2-70', '2024-01-08', '2024-01-16'),

('650e8400-e29b-41d4-a716-446655440004', 'Patente de Comercio', 'Obtención de patente para ejercer el comercio', 'Autorización legal para ejercer actividades comerciales en Guatemala. Es obligatoria para toda persona individual o jurídica que se dedique al comercio.', '550e8400-e29b-41d4-a716-446655440002', 'negocios', 'Licencias Comerciales', '8-10 días hábiles', 'mixto', 'ambos',
ARRAY['Formulario de solicitud de patente', 'DPI del solicitante o representante legal', 'Escritura de constitución (para empresas)', 'Comprobante de inscripción en SAT', 'Comprobante de pago de patente', 'Fotografía del establecimiento comercial'],
ARRAY['Completar formulario de solicitud', 'Reunir documentación requerida', 'Presentar solicitud en ventanilla', 'Pago de derechos de patente', 'Inspección del establecimiento (si aplica)', 'Resolución de otorgamiento', 'Retiro de patente autorizada'],
false, 'Código de Comercio Decreto 2-70', '2024-01-12', '2024-01-19'),

-- USAC Procedures
('650e8400-e29b-41d4-a716-446655440005', 'Inscripción Universitaria', 'Proceso de inscripción para estudios universitarios', 'Proceso de admisión e inscripción para estudiar una carrera universitaria en la Universidad de San Carlos de Guatemala, la universidad pública del país.', '550e8400-e29b-41d4-a716-446655440003', 'educacion', 'Educación Superior', '30-45 días', 'digital', 'persona',
ARRAY['Certificado de estudios de diversificado', 'Partida de nacimiento certificada', 'DPI vigente', 'Fotografías tamaño cédula', 'Constancia de examen médico', 'Comprobante de pago de inscripción', 'Formulario de inscripción completo'],
ARRAY['Realizar pre-inscripción en línea', 'Presentar examen de conocimientos básicos', 'Completar documentación requerida', 'Realizar examen médico', 'Asignación de carrera según punteo', 'Inscripción definitiva en facultad', 'Inicio de clases según calendario académico'],
true, 'Ley Orgánica de la Universidad de San Carlos', '2024-01-14', '2024-01-21'),

-- Organismo Judicial Procedures
('650e8400-e29b-41d4-a716-446655440006', 'Antecedentes Penales', 'Certificación de antecedentes penales', 'Documento oficial que certifica si una persona tiene o no antecedentes penales en Guatemala. Es requerido para empleos, visas, adopciones y otros trámites legales.', '550e8400-e29b-41d4-a716-446655440005', 'justicia', 'Certificaciones Judiciales', '2-3 días hábiles', 'digital', 'persona',
ARRAY['DPI vigente del solicitante', 'Correo electrónico activo', 'Comprobante de pago de Q25.00', 'Formulario de solicitud completo'],
ARRAY['Ingresar al portal web del Organismo Judicial', 'Completar formulario con datos personales', 'Subir fotografía del DPI', 'Realizar pago en línea', 'Recibir certificación por correo electrónico', 'Verificar autenticidad con código de barras'],
true, 'Ley del Organismo Judicial', '2024-01-16', '2024-01-22'),

-- Municipalidad Procedures
('650e8400-e29b-41d4-a716-446655440007', 'Licencia de Construcción', 'Permiso para construcción o remodelación', 'Autorización municipal para realizar construcciones, ampliaciones o remodelaciones en propiedades ubicadas dentro del municipio de Guatemala.', '550e8400-e29b-41d4-a716-446655440006', 'vivienda', 'Permisos de Construcción', '20-30 días hábiles', 'presencial', 'ambos',
ARRAY['Planos arquitectónicos firmados por arquitecto colegiado', 'Planos estructurales firmados por ingeniero colegiado', 'Escritura de la propiedad', 'DPI del propietario', 'Formulario de solicitud municipal', 'Comprobante de pago de impuestos municipales', 'Estudio de suelos (para construcciones mayores)'],
ARRAY['Elaborar planos con profesionales colegiados', 'Presentar solicitud en ventanilla municipal', 'Revisión técnica de planos', 'Inspección del terreno', 'Pago de licencia y arbitrios', 'Emisión de licencia de construcción', 'Inspecciones durante construcción'],
false, 'Código Municipal Decreto 12-2002', '2024-01-11', '2024-01-17'),

-- SAT Procedures
('650e8400-e29b-41d4-a716-446655440008', 'Inscripción de Contribuyente', 'Registro como contribuyente en SAT', 'Proceso para inscribirse como contribuyente en la Superintendencia de Administración Tributaria, obligatorio para toda persona que realice actividades económicas en Guatemala.', '550e8400-e29b-41d4-a716-446655440007', 'negocios', 'Obligaciones Tributarias', '5-8 días hábiles', 'digital', 'ambos',
ARRAY['DPI vigente del solicitante', 'Escritura de constitución (para empresas)', 'Comprobante de dirección comercial', 'Formulario de inscripción SAT', 'Patente de comercio (si aplica)', 'Contrato de arrendamiento del local comercial'],
ARRAY['Completar formulario en portal SAT Agencia Virtual', 'Subir documentos digitalizados', 'Programar cita para verificación', 'Asistir a cita con documentos originales', 'Activación de usuario en sistema', 'Recepción de NIT y credenciales', 'Configuración de régimen tributario'],
true, 'Código Tributario Decreto 6-91', '2024-01-13', '2024-01-20'),

-- MSPAS Procedures
('650e8400-e29b-41d4-a716-446655440009', 'Certificado de Salud', 'Certificación médica para trabajo o estudios', 'Documento médico oficial que certifica el estado de salud de una persona, requerido para empleos, estudios, viajes y otros trámites oficiales.', '550e8400-e29b-41d4-a716-446655440004', 'salud', 'Certificaciones Médicas', '3-5 días hábiles', 'presencial', 'persona',
ARRAY['DPI vigente', 'Exámenes médicos recientes (sangre, orina, heces)', 'Radiografía de tórax', 'Formulario de solicitud', 'Comprobante de pago de Q50.00', 'Fotografía tamaño cédula'],
ARRAY['Realizar exámenes médicos en laboratorio autorizado', 'Presentar documentos en centro de salud', 'Evaluación médica presencial', 'Revisión de resultados de laboratorio', 'Emisión de certificado médico', 'Entrega de certificado firmado y sellado'],
false, 'Código de Salud Decreto 90-97', '2024-01-09', '2024-01-15'),

-- IGSS Procedures
('650e8400-e29b-41d4-a716-446655440010', 'Afiliación de Trabajador', 'Inscripción de trabajador en seguridad social', 'Proceso para afiliar a un trabajador al Instituto Guatemalteco de Seguridad Social, garantizando su acceso a servicios médicos y prestaciones sociales.', '550e8400-e29b-41d4-a716-446655440008', 'salud', 'Seguridad Social', '7-10 días hábiles', 'mixto', 'empresa',
ARRAY['Formulario de inscripción del trabajador', 'DPI del trabajador', 'Contrato de trabajo', 'Planilla de salarios', 'Constancia patronal de inscripción en IGSS', 'Examen médico de ingreso'],
ARRAY['Completar formulario de inscripción', 'Presentar documentos en agencia IGSS', 'Programar examen médico de ingreso', 'Realizar examen médico', 'Procesamiento de documentos', 'Emisión de carnet de afiliado', 'Activación de servicios médicos'],
false, 'Ley Orgánica del IGSS Decreto 295', '2024-01-07', '2024-01-14');