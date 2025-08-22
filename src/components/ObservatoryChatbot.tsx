import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Search, 
  FileText, 
  Building2, 
  Users, 
  Clock,
  Star,
  ChevronRight,
  Lightbulb,
  HelpCircle,
  ArrowLeft,
  Zap,
  Shield,
  CheckCircle,
  ChevronLeft,
  Play,
  Pause,
  Award,
  TrendingUp,
  Heart,
  Target,
  Globe,
  Smartphone
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
  relatedProcedures?: string[];
}

interface KeyProcedure {
  id: string;
  name: string;
  category: 'personal' | 'business';
  institution: string;
  description: string;
  requirements: string[];
  steps: string[];
  cost: string;
  duration: string;
  tips: string[];
  isDigital: boolean;
  popularity: number;
  story: string;
  impact: string;
}

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  action: string;
  stats: {
    label: string;
    value: string;
  }[];
}

const heroSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Tu Guía Personal para Trámites Guatemaltecos',
    subtitle: '20 Procedimientos Esenciales al Alcance de Tus Manos',
    description: 'Desde renovar tu DPI hasta iniciar tu propio negocio, te acompañamos paso a paso en los trámites más importantes de tu vida ciudadana.',
    image: '🇬🇹',
    cta: 'Comenzar mi consulta',
    action: 'start-chat',
    stats: [
      { label: 'Trámites Cubiertos', value: '20' },
      { label: 'Ciudadanos Ayudados', value: '50K+' },
      { label: 'Tiempo Ahorrado', value: '75%' }
    ]
  },
  {
    id: '2',
    title: 'Historias de Éxito Ciudadano',
    subtitle: 'Cada Trámite Cuenta una Historia',
    description: 'María renovó su DPI en tiempo récord, Carlos abrió su negocio sin contratiempos, Ana obtuvo su pasaporte para cumplir sus sueños. ¿Cuál será tu historia?',
    image: '📖',
    cta: 'Ver historias reales',
    action: 'success-stories',
    stats: [
      { label: 'Historias Exitosas', value: '1,200+' },
      { label: 'Satisfacción', value: '96%' },
      { label: 'Tiempo Promedio', value: '2 min' }
    ]
  },
  {
    id: '3',
    title: 'Tecnología al Servicio del Ciudadano',
    subtitle: 'Información Inteligente, Respuestas Instantáneas',
    description: 'Nuestro asistente especializado conoce cada detalle de los 20 trámites más importantes. Pregunta lo que necesites, cuando lo necesites.',
    image: '🤖',
    cta: 'Probar el asistente',
    action: 'try-assistant',
    stats: [
      { label: 'Respuestas Instantáneas', value: '24/7' },
      { label: 'Precisión', value: '98%' },
      { label: 'Idiomas', value: '2' }
    ]
  }
];

const keyProcedures: KeyProcedure[] = [
  // Personal Procedures (10)
  {
    id: 'dpi',
    name: 'Renovación de DPI',
    category: 'personal',
    institution: 'RENAP',
    description: 'Renovación del Documento Personal de Identificación vencido o próximo a vencer',
    requirements: [
      'DPI anterior (original y copia)',
      'Partida de nacimiento certificada (no mayor a 6 meses)',
      'Comprobante de residencia (no mayor a 3 meses)',
      'Fotografías recientes tamaño cédula (2)'
    ],
    steps: [
      'Solicitud en línea o presencial',
      'Presentar documentos requeridos',
      'Toma de fotografía y huellas',
      'Pago de aranceles (Q100)',
      'Esperar tiempo de procesamiento',
      'Recoger documento en oficina asignada'
    ],
    cost: 'Q100 (gratuito para mayores de 60 años)',
    duration: '30 días hábiles',
    tips: [
      'Llega temprano para evitar filas largas',
      'Verifica que tu partida de nacimiento esté certificada',
      'Puedes hacer cita previa en línea',
      'Conserva el comprobante de solicitud'
    ],
    isDigital: true,
    popularity: 95,
    story: 'María, madre de familia de Quetzaltenango, necesitaba renovar su DPI vencido para poder votar en las elecciones. Gracias a la información clara sobre los requisitos, llegó preparada con todos los documentos y completó el trámite en una sola visita.',
    impact: 'El DPI es tu llave de acceso a todos los servicios ciudadanos. Sin él, no puedes votar, trabajar formalmente, abrir cuentas bancarias o realizar otros trámites importantes.'
  },
  {
    id: 'pasaporte',
    name: 'Pasaporte Guatemalteco',
    category: 'personal',
    institution: 'IGM',
    description: 'Emisión o renovación del pasaporte guatemalteco para viajes internacionales',
    requirements: [
      'DPI vigente (original y fotocopia)',
      'Boleta de pago cancelada en banco autorizado',
      'Cita programada en el portal de Migración',
      'Pasaporte anterior (si es renovación)'
    ],
    steps: [
      'Pagar en banco autorizado',
      'Agendar cita en línea',
      'Acudir el día de la cita con documentos',
      'Toma de fotografía, huellas y firma',
      'Entrega del pasaporte (mismo día o pocos días)'
    ],
    cost: 'US$50 (5 años) o US$85 (10 años)',
    duration: 'Mismo día o pocos días hábiles',
    tips: [
      'No olvides la constancia de cita ni la boleta de pago',
      'Llena los datos exactamente como aparecen en tu DPI',
      'Renueva varios meses antes de que expire',
      'Menores de edad deben ir con ambos padres'
    ],
    isDigital: true,
    popularity: 85,
    story: 'Ana, estudiante universitaria, soñaba con estudiar en el extranjero. Su pasaporte había expirado y tenía poco tiempo. Siguiendo nuestra guía, programó su cita, pagó correctamente y obtuvo su nuevo pasaporte el mismo día, cumpliendo su sueño de estudiar en España.',
    impact: 'Tu pasaporte es tu puerta al mundo. Abre oportunidades de estudio, trabajo y experiencias internacionales que pueden cambiar tu vida para siempre.'
  },
  {
    id: 'licencia-conducir',
    name: 'Licencia de Conducir',
    category: 'personal',
    institution: 'PNC - Maycom',
    description: 'Obtención o renovación de licencia de conducir para vehículos',
    requirements: [
      'DPI vigente (original y fotocopia)',
      'Constancia de examen teórico-práctico de escuela autorizada',
      'Examen de la vista por oftalmólogo colegiado',
      'Solvencia de multas de tránsito',
      'Boleta de pago de licencia'
    ],
    steps: [
      'Curso y examen en escuela de automovilismo',
      'Examen visual con especialista',
      'Pago de licencia (Q100 por año)',
      'Presentarse en Maycom con documentos',
      'Llenar formulario y toma de datos biométricos',
      'Entrega inmediata de licencia'
    ],
    cost: 'Q100 por año de vigencia (máximo 5 años)',
    duration: '30 minutos a 2 horas en Maycom',
    tips: [
      'Verifica multas antes de renovar',
      'No dejes vencer tu licencia para evitar multas',
      'Conserva tu comprobante de pago',
      'Respeta las categorías de tu licencia'
    ],
    isDigital: false,
    popularity: 90,
    story: 'Carlos, joven emprendedor de Antigua Guatemala, necesitaba su licencia para entregar productos de su negocio. Siguió todos los pasos correctamente, desde el curso hasta el examen visual, y obtuvo su licencia sin contratiempos, impulsando su emprendimiento.',
    impact: 'Una licencia de conducir no solo te da movilidad, sino independencia económica. Te permite trabajar, emprender y acceder a oportunidades que requieren transporte.'
  },
  {
    id: 'antecedentes-penales',
    name: 'Antecedentes Penales',
    category: 'personal',
    institution: 'Organismo Judicial',
    description: 'Constancia de carencia de antecedentes penales para trámites laborales o académicos',
    requirements: [
      'DPI vigente',
      'Boleta de pago por Q30',
      'Dirección de correo electrónico activa'
    ],
    steps: [
      'Pagar Q30 en bancos autorizados',
      'Ingresar al portal CAPE del OJ',
      'Registrarse como usuario',
      'Completar formulario con datos y número de boleta',
      'Recibir constancia por correo electrónico',
      'Descargar e imprimir la constancia'
    ],
    cost: 'Q30',
    duration: 'Menos de 24 horas',
    tips: [
      'Prefiere el trámite en línea',
      'Guarda bien el número de referencia del pago',
      'La constancia incluye código QR para verificación',
      'Tiene vigencia de 6 meses'
    ],
    isDigital: true,
    popularity: 88,
    story: 'Luis, recién graduado de ingeniería, necesitaba sus antecedentes penales para postularse a su primer empleo. Usando el sistema en línea, obtuvo su constancia en pocas horas y pudo aplicar a tiempo, consiguiendo el trabajo de sus sueños.',
    impact: 'Los antecedentes penales son tu carta de presentación profesional. Demuestran tu integridad y abren puertas laborales y académicas importantes.'
  },
  {
    id: 'antecedentes-policiacos',
    name: 'Antecedentes Policíacos',
    category: 'personal',
    institution: 'PNC',
    description: 'Constancia de carencia de antecedentes policíacos',
    requirements: [
      'DPI vigente',
      'Boleto de Ornato del año en curso',
      'Boleta de pago de Q30',
      'Cuenta de correo electrónico'
    ],
    steps: [
      'Pagar Q30 en Banrural o BI',
      'Ingresar al portal de Antecedentes Policiales',
      'Registrarse y verificar cuenta por correo',
      'Ingresar número de boleta y referencia',
      'Descargar constancia en PDF',
      'Validar con código QR si es necesario'
    ],
    cost: 'Q30',
    duration: 'Pocos minutos en línea',
    tips: [
      'Asegúrate de haber pagado el ornato vigente',
      'Revisa tu carpeta de spam para confirmación',
      'Tiene vigencia de 6 meses',
      'Ambas constancias (penales y policiales) son necesarias'
    ],
    isDigital: true,
    popularity: 82,
    story: 'Patricia, maestra de primaria, necesitaba renovar su constancia para continuar trabajando en el sector educativo. El proceso digital le permitió obtenerla rápidamente sin faltar a clases, manteniendo su compromiso con sus estudiantes.',
    impact: 'Junto con los antecedentes penales, esta constancia completa tu perfil de confiabilidad, especialmente importante para trabajos con menores o en seguridad.'
  },
  {
    id: 'inscripcion-nacimiento',
    name: 'Inscripción de Nacimiento',
    category: 'personal',
    institution: 'RENAP',
    description: 'Registro de nacimiento de un hijo o hija en el sistema civil',
    requirements: [
      'DPI de los padres (ambos si no están casados)',
      'Informe de nacimiento del hospital o profesional autorizado',
      'Formulario de inscripción de RENAP'
    ],
    steps: [
      'Acudir a oficina RENAP dentro de 60 días',
      'Presentar documentos requeridos',
      'Elegir nombre y apellidos del bebé',
      'Firmar acta de inscripción',
      'Obtener certificación de nacimiento',
      'Registrar en sistemas de salud'
    ],
    cost: 'Gratuito dentro de 60 días (Q25 multa después)',
    duration: '30 minutos',
    tips: [
      'No esperes, registra al bebé lo antes posible',
      'No es necesario llevar al recién nacido',
      'Pide copias adicionales de la certificación',
      'Un solo padre puede ir si están casados'
    ],
    isDigital: false,
    popularity: 75,
    story: 'Roberto y Carmen, padres primerizos, estaban nerviosos por registrar a su bebé. Siguiendo nuestra guía, completaron el proceso sin complicaciones, asegurando que su hija tuviera desde el primer día su identidad legal y acceso a servicios de salud.',
    impact: 'Registrar a tu hijo es darle identidad y futuro. Sin este documento, no podrá acceder a educación, salud o cualquier servicio ciudadano en el futuro.'
  },
  {
    id: 'inap-certificacion',
    name: 'Certificación INAP',
    category: 'personal',
    institution: 'INAP',
    description: 'Certificación Básica en Administración Pública para empleos gubernamentales',
    requirements: [
      'Ser guatemalteco mayor de 18 años',
      'Nivel académico medio (diversificado)',
      'Acceso a Internet',
      'Cuenta de correo electrónico',
      'Pago de Q100'
    ],
    steps: [
      'Inscribirse cuando abran convocatorias',
      'Registrarse en Campus Virtual del INAP',
      'Pagar Q100 del curso',
      'Completar módulos de estudio (20 horas)',
      'Rendir evaluaciones (mínimo 70/100)',
      'Descargar constancia de certificación'
    ],
    cost: 'Q100',
    duration: '6-8 semanas',
    tips: [
      'Distribuye las 20 horas en varias semanas',
      'Participa en foros para resolver dudas',
      'Conserva tu certificado para empleos públicos',
      'No lo dejes para el último momento'
    ],
    isDigital: true,
    popularity: 65,
    story: 'Elena, contadora desempleada, vio una oportunidad en el sector público. Completó su certificación INAP durante las noches, y gracias a este requisito pudo aplicar y obtener un puesto estable en una municipalidad.',
    impact: 'Esta certificación es tu puerta de entrada al servicio público, ofreciendo estabilidad laboral y la oportunidad de servir a tu comunidad.'
  },
  {
    id: 'igss-afiliacion',
    name: 'Afiliación Voluntaria IGSS',
    category: 'personal',
    institution: 'IGSS',
    description: 'Afiliación como contribuyente voluntario para continuar cotizando al IGSS',
    requirements: [
      'Haber cotizado 12 meses en últimos 36 meses',
      'Solicitar dentro del año siguiente al cese laboral',
      'Carta de solicitud dirigida al IGSS',
      'DPI vigente y número de afiliación anterior'
    ],
    steps: [
      'Agendar cita en IGSS',
      'Preparar solicitud de contribuyente voluntario',
      'Presentarse con documentos',
      'Esperar resolución (1-2 meses)',
      'Activar estado y comenzar pagos mensuales',
      'Obtener carné de afiliado voluntario'
    ],
    cost: '5.5% del último sueldo mensual',
    duration: '30-60 días para aprobación',
    tips: [
      'Mantén pagos al día (máximo 3 meses de atraso)',
      'Solo cubre pensión, no servicios médicos',
      'Sé disciplinado con pagos mensuales',
      'Puedes pagar adelantado trimestralmente'
    ],
    isDigital: false,
    popularity: 60,
    story: 'Marcos, trabajador independiente, quería asegurar su futuro después de dejar su empleo formal. Se afilió voluntariamente al IGSS y ahora tiene la tranquilidad de saber que tendrá una pensión digna en su vejez.',
    impact: 'Afiliarte voluntariamente al IGSS es invertir en tu futuro. Garantiza una pensión y protección para tu familia, sin depender de un empleador.'
  },
  {
    id: 'nit-personal',
    name: 'Obtención de NIT Personal',
    category: 'personal',
    institution: 'SAT',
    description: 'Inscripción en el RTU y obtención del Número de Identificación Tributaria',
    requirements: [
      'DPI vigente',
      'Correo electrónico personal',
      'Comprobante de dirección (factura de servicios)',
      'Dispositivo con internet'
    ],
    steps: [
      'Crear usuario en Agencia Virtual SAT',
      'Iniciar inscripción RTU en línea',
      'Llenar formulario con datos personales',
      'Cargar documentos escaneados',
      'Enviar solicitud y esperar aprobación',
      'Descargar Constancia de RTU'
    ],
    cost: 'Gratuito',
    duration: 'Menos de 24 horas',
    tips: [
      'Asegúrate que documentos sean legibles',
      'Usa email que revises frecuentemente',
      'Ratifica datos anualmente en tu cumpleaños',
      'Descarga tu constancia RTU'
    ],
    isDigital: true,
    popularity: 85,
    story: 'Sofía, estudiante universitaria, necesitaba su NIT para abrir su primera cuenta bancaria. El proceso en línea fue tan sencillo que lo completó desde su teléfono durante un descanso entre clases.',
    impact: 'Tu NIT es tu identidad fiscal. Te permite trabajar formalmente, abrir cuentas bancarias, comprar vehículos y participar plenamente en la economía formal.'
  },
  {
    id: 'boleto-ornato',
    name: 'Pago de Boleto de Ornato',
    category: 'personal',
    institution: 'Municipalidad',
    description: 'Tributo municipal anual obligatorio para mayores de 18 años',
    requirements: [
      'Ser mayor de 18 años',
      'Declarar ingreso mensual aproximado',
      'Conocer municipalidad donde debe pagar'
    ],
    steps: [
      'Acudir a municipalidad correspondiente',
      'Presentar DPI en ventanilla de ornato',
      'Declarar rango de ingresos',
      'Cancelar monto indicado',
      'Recibir Boleto de Ornato',
      'Conservar comprobante'
    ],
    cost: 'Q4 a Q150 según ingresos',
    duration: '5-10 minutos',
    tips: [
      'Págalo cada año a tiempo',
      'Guarda el recibo en lugar seguro',
      'Puedes pagar por terceros con DPI',
      'Sin multa durante primer trimestre'
    ],
    isDigital: true,
    popularity: 70,
    story: 'Diego, joven profesional, siempre olvidaba pagar su ornato hasta que necesitó sus antecedentes policiales para un nuevo trabajo. Ahora lo paga cada enero y nunca más ha tenido contratiempos con sus trámites.',
    impact: 'Aunque parece pequeño, el ornato es tu contribución al desarrollo de tu comunidad. Además, es requisito para muchos otros trámites importantes.'
  },

  // Business Procedures (10)
  {
    id: 'registro-mercantil',
    name: 'Registro Mercantil',
    category: 'business',
    institution: 'Registro Mercantil',
    description: 'Inscripción de comerciante individual o empresa y obtención de Patente de Comercio',
    requirements: [
      'Formulario de inscripción completo',
      'DPI del propietario o representante legal',
      'Comprobantes de pago de aranceles',
      'Escritura de constitución (si es sociedad)'
    ],
    steps: [
      'Llenar formulario en línea',
      'Pagar aranceles (Q100 empresa + Q100 comerciante)',
      'Presentar documentos en ventanillas',
      'Esperar aprobación de inscripción',
      'Descargar Patente de Comercio',
      'Adherir Q50 en timbres fiscales'
    ],
    cost: 'Q200 (Q100 empresa + Q100 comerciante) + Q50 timbres',
    duration: '5-10 días hábiles',
    tips: [
      'Completa el formulario cuidadosamente',
      'Verifica que el nombre no esté registrado',
      'Exhibe la patente en el local del negocio',
      'Conserva todos los comprobantes'
    ],
    isDigital: true,
    popularity: 90,
    story: 'Andrea, emprendedora de repostería, quería formalizar su negocio casero. Con nuestra guía, completó su registro mercantil y ahora puede facturar legalmente, expandiendo su clientela y aumentando sus ingresos significativamente.',
    impact: 'Registrar tu negocio es el primer paso hacia el crecimiento. Te da credibilidad, acceso a créditos bancarios y la posibilidad de competir en mercados más grandes.'
  },
  {
    id: 'nit-empresa',
    name: 'NIT Empresarial',
    category: 'business',
    institution: 'SAT',
    description: 'Registro tributario de la empresa para facturar y pagar impuestos',
    requirements: [
      'Patente de Comercio',
      'DPI del representante legal',
      'Escritura de constitución (sociedades)',
      'Nombramiento del representante'
    ],
    steps: [
      'Solicitar NIT en portal SAT',
      'Completar formulario electrónico',
      'Verificar correo de confirmación',
      'Agendar cita en oficina tributaria',
      'Presentar documentos originales',
      'Obtener NIT y Constancia RTU'
    ],
    cost: 'Gratuito',
    duration: '3-5 días hábiles',
    tips: [
      'Ten listos todos los documentos',
      'Elige el régimen tributario adecuado',
      'Conserva credenciales de Agencia Virtual',
      'Actualiza datos cuando sea necesario'
    ],
    isDigital: true,
    popularity: 95,
    story: 'José, dueño de un taller mecánico, necesitaba su NIT empresarial para poder facturar a empresas grandes. El proceso digital le permitió obtenerlo rápidamente y ahora tiene contratos con flotas vehiculares importantes.',
    impact: 'El NIT empresarial es tu pasaporte al mundo de los negocios formales. Sin él, no puedes facturar, acceder a créditos empresariales o participar en licitaciones.'
  },
  {
    id: 'regimen-tributario',
    name: 'Elección de Régimen Tributario',
    category: 'business',
    institution: 'SAT',
    description: 'Selección entre Pequeño Contribuyente o Régimen General para IVA e ISR',
    requirements: [
      'Estar inscrito en RTU',
      'Proyección de ingresos anuales',
      'Conocimiento de obligaciones fiscales'
    ],
    steps: [
      'Evaluar ingresos proyectados',
      'Comparar beneficios de cada régimen',
      'Seleccionar régimen en inscripción SAT',
      'Configurar obligaciones tributarias',
      'Activar facturación electrónica',
      'Comenzar a cumplir obligaciones'
    ],
    cost: 'Gratuito',
    duration: 'Inmediato',
    tips: [
      'Pequeño Contribuyente: hasta Q465,380 anuales',
      'Régimen General: sin límite pero más obligaciones',
      'Puedes cambiar de régimen posteriormente',
      'Asesórate sobre el más conveniente'
    ],
    isDigital: true,
    popularity: 85,
    story: 'Carmen, consultora independiente, eligió el régimen de Pequeño Contribuyente al iniciar. Cuando su negocio creció, cambió al Régimen General para aprovechar mejor las deducciones fiscales.',
    impact: 'Elegir el régimen correcto puede ahorrarte miles de quetzales en impuestos y simplificar significativamente tus obligaciones fiscales.'
  },
  {
    id: 'facturacion-fel',
    name: 'Autorización FEL',
    category: 'business',
    institution: 'SAT',
    description: 'Habilitación para emitir Facturas Electrónicas en Línea',
    requirements: [
      'Usuario activo en Agencia Virtual SAT',
      'NIT empresarial vigente',
      'Régimen tributario definido'
    ],
    steps: [
      'Activar usuario en Agencia Virtual',
      'Habilitar emisión de documentos fiscales',
      'Emitir primera factura de prueba',
      'Descargar App FEL (opcional)',
      'Configurar datos de facturación',
      'Comenzar a emitir DTEs'
    ],
    cost: 'Gratuito',
    duration: 'Inmediato',
    tips: [
      'Todos los negocios nuevos deben usar FEL',
      'Declara mensualmente aunque no tengas ventas',
      'Usa la app móvil para mayor comodidad',
      'Conserva respaldos de todas las facturas'
    ],
    isDigital: true,
    popularity: 90,
    story: 'Miguel, vendedor de repuestos, temía la tecnología hasta que descubrió lo fácil que es FEL. Ahora emite facturas desde su teléfono y tiene mejor control de sus ventas que nunca antes.',
    impact: 'FEL no solo cumple con la ley, sino que moderniza tu negocio. Te da mejor control de ventas, reduce errores y facilita la contabilidad.'
  },
  {
    id: 'libros-contables',
    name: 'Habilitación de Libros Contables',
    category: 'business',
    institution: 'SAT',
    description: 'Registro oficial de libros contables según régimen tributario',
    requirements: [
      'NIT empresarial activo',
      'Definición del tipo de libros necesarios',
      'Acceso a Declaraguate'
    ],
    steps: [
      'Ingresar a Declaraguate (Form. SAT-7121)',
      'Completar formulario de habilitación',
      'Generar boleta de pago',
      'Pagar arancel (aprox. Q50 por libro)',
      'Finalizar solicitud en línea',
      'Imprimir Resolución de Habilitación'
    ],
    cost: 'Aproximadamente Q50 por libro',
    duration: '1-2 días hábiles',
    tips: [
      'Pequeños Contribuyentes: Libro de Compras y Ventas',
      'Régimen General: libros contables completos',
      'Actualiza libros periódicamente',
      'Conserva resolución con los libros'
    ],
    isDigital: true,
    popularity: 75,
    story: 'Laura, propietaria de una boutique, pensaba que los libros contables eran complicados. Con la guía correcta, habilitó sus libros digitalmente y ahora lleva un control perfecto de su inventario y finanzas.',
    impact: 'Los libros contables bien llevados son la base de un negocio exitoso. Te permiten tomar decisiones informadas y cumplir con tus obligaciones fiscales.'
  },
  {
    id: 'licencia-municipal',
    name: 'Licencia Municipal de Funcionamiento',
    category: 'business',
    institution: 'Municipalidad',
    description: 'Permiso municipal para operar negocio en establecimiento físico',
    requirements: [
      'Formulario de solicitud municipal',
      'DPI del propietario',
      'Constancia de NIT (RTU)',
      'Patente de Comercio',
      'Contrato de arrendamiento o título de propiedad'
    ],
    steps: [
      'Solicitar formulario en municipalidad',
      'Llenar datos del negocio y ubicación',
      'Adjuntar documentos requeridos',
      'Pagar tarifa municipal',
      'Esperar inspección del establecimiento',
      'Recibir Licencia de Funcionamiento'
    ],
    cost: 'Varía según municipio y tipo de negocio',
    duration: '5-15 días hábiles',
    tips: [
      'Verifica zonificación antes de ubicarte',
      'Prepara el local para inspección',
      'Renueva anualmente antes del 31 de enero',
      'Mantén licencia visible en el negocio'
    ],
    isDigital: false,
    popularity: 85,
    story: 'Roberto abrió su restaurante sin licencia municipal y fue multado. Aprendió la lección, obtuvo todos los permisos correctamente y ahora opera tranquilo, enfocándose en brindar el mejor servicio a sus clientes.',
    impact: 'La licencia municipal te da tranquilidad legal y credibilidad ante tus clientes. Evita multas y cierres que pueden arruinar tu inversión.'
  },
  {
    id: 'inscripcion-patronal',
    name: 'Inscripción Patronal IGSS',
    category: 'business',
    institution: 'IGSS',
    description: 'Registro como empleador para afiliar trabajadores al seguro social',
    requirements: [
      'Formulario DRPT-001 completo',
      'DPI del patrono o representante legal',
      'NIT y Patente de Comercio',
      'Certificación contable de contador colegiado'
    ],
    steps: [
      'Obtener y llenar Formulario DRPT-001',
      'Reunir documentos de soporte',
      'Presentar en CATEM o delegación IGSS',
      'Esperar aprobación de solicitud',
      'Recibir número de inscripción patronal',
      'Comenzar a afiliar empleados'
    ],
    cost: 'Gratuito (luego 12.67% patronal + 4.83% laboral)',
    duration: '5-10 días hábiles',
    tips: [
      'Es obligatorio si contratas empleados',
      'Afilia empleados con Formulario DRPT-59',
      'Paga planillas mensualmente',
      'Usa IGSS en Línea para reportes'
    ],
    isDigital: false,
    popularity: 80,
    story: 'Claudia, dueña de una peluquería, quería contratar ayudantes pero temía los trámites del IGSS. Una vez inscrita como patrona, se dio cuenta de que tener empleados formales le dio más credibilidad y mejores trabajadores.',
    impact: 'Ser un empleador formal te permite acceder al mejor talento. Los trabajadores prefieren empleos con prestaciones, y tú obtienes mayor compromiso y productividad.'
  },
  {
    id: 'contratos-trabajo',
    name: 'Registro de Contratos RECIT',
    category: 'business',
    institution: 'Ministerio de Trabajo',
    description: 'Registro electrónico de contratos individuales de trabajo',
    requirements: [
      'Contrato de trabajo firmado',
      'Datos completos del empleador y empleado',
      'Acta de nombramiento (personas jurídicas)',
      'Constancia del RTU'
    ],
    steps: [
      'Acceder a plataforma RECIT',
      'Crear usuario con correo corporativo',
      'Registrar nuevo contrato',
      'Ingresar información del contrato',
      'Adjuntar contrato escaneado en PDF',
      'Descargar Constancia Definitiva'
    ],
    cost: 'Gratuito',
    duration: '3 días hábiles',
    tips: [
      'Registra dentro de 15 días de contratación',
      'Verifica que cumpla condiciones mínimas',
      'Conserva constancia con contrato original',
      'Registra modificaciones también'
    ],
    isDigital: true,
    popularity: 70,
    story: 'Fernando, constructor, siempre había trabajado informalmente hasta que un cliente grande le exigió contratos registrados. Ahora usa RECIT para todos sus empleados y accede a proyectos mucho más grandes y rentables.',
    impact: 'Los contratos registrados protegen tanto al empleador como al empleado. Te dan seguridad jurídica y acceso a mejores oportunidades de negocio.'
  },
  {
    id: 'permiso-sanitario',
    name: 'Permiso Sanitario',
    category: 'business',
    institution: 'Ministerio de Salud',
    description: 'Carné de manipulación de alimentos para negocios gastronómicos',
    requirements: [
      'DPI del solicitante',
      'Fotografía tamaño cédula reciente',
      'Asistir a charla sanitaria'
    ],
    steps: [
      'Solicitar en Centro de Salud local',
      'Llenar solicitud de manipulación de alimentos',
      'Inscribirse en charla sanitaria',
      'Asistir a capacitación (1-2.5 horas)',
      'Realizar exámenes médicos (si aplica)',
      'Recibir carné de manipulador'
    ],
    cost: 'Gratuito',
    duration: '1-2 semanas',
    tips: [
      'Obligatorio para todos los manipuladores',
      'Renueva anualmente',
      'Asiste puntualmente a la charla',
      'Mantén carné visible en el negocio'
    ],
    isDigital: false,
    popularity: 75,
    story: 'Marta, vendedora de comida típica, obtuvo su permiso sanitario y notó inmediatamente cómo los clientes confiaban más en su puesto. Sus ventas aumentaron porque la gente veía que cumplía con los estándares de salud.',
    impact: 'El permiso sanitario no solo cumple la ley, sino que genera confianza en tus clientes. En el negocio de alimentos, la confianza es todo.'
  },
  {
    id: 'licencia-ambiental',
    name: 'Licencia Ambiental',
    category: 'business',
    institution: 'MARN',
    description: 'Autorización ambiental para negocios con potencial impacto ambiental',
    requirements: [
      'Clasificación de categoría ambiental',
      'Instrumento de Evaluación Ambiental',
      'Formularios del MARN',
      'Pago de tarifa administrativa'
    ],
    steps: [
      'Determinar categoría ambiental del proyecto',
      'Elaborar instrumento ambiental correspondiente',
      'Presentar solicitud en SAGA o presencial',
      'Pagar tarifa según categoría',
      'Esperar evaluación técnica del MARN',
      'Recibir Resolución y Licencia Ambiental'
    ],
    cost: 'Q50 (Categoría C) hasta varios miles según categoría',
    duration: '30-90 días según categoría',
    tips: [
      'Consulta Listado Taxativo para tu categoría',
      'Contrata consultor ambiental si es necesario',
      'Cumple medidas de mitigación impuestas',
      'Renueva según plazo otorgado'
    ],
    isDigital: true,
    popularity: 45,
    story: 'Raúl, dueño de un taller de pintura automotriz, inicialmente evitó la licencia ambiental. Cuando finalmente la obtuvo, no solo evitó multas sino que mejoró sus procesos, reduciendo costos y siendo más competitivo.',
    impact: 'La licencia ambiental te convierte en un empresario responsable. Además de cumplir la ley, mejora tu eficiencia operativa y tu imagen ante clientes conscientes del medio ambiente.'
  }
];

const quickActions = [
  { icon: Search, label: 'Buscar trámite', action: 'search' },
  { icon: FileText, label: 'Trámites personales', action: 'personal' },
  { icon: Building2, label: 'Trámites de negocios', action: 'business' },
  { icon: Star, label: 'Más populares', action: 'popular' }
];

const faqs = [
  {
    id: '1',
    question: '¿Cuáles son los trámites más importantes para una persona?',
    answer: 'Los trámites personales esenciales incluyen: renovación de DPI, obtención de pasaporte, licencia de conducir, antecedentes penales y policíacos, y obtención del NIT personal. Estos documentos son fundamentales para la vida cotidiana en Guatemala.',
    category: 'personal'
  },
  {
    id: '2',
    question: '¿Qué necesito para iniciar un negocio legalmente?',
    answer: 'Para formalizar un negocio necesitas: registro mercantil, NIT empresarial, elección de régimen tributario, autorización FEL, licencia municipal, y si tienes empleados, inscripción patronal en IGSS y registro de contratos.',
    category: 'business'
  },
  {
    id: '3',
    question: '¿Cuánto tiempo toman estos trámites?',
    answer: 'Los tiempos varían: trámites digitales como antecedentes penales toman menos de 24 horas, mientras que otros como el DPI pueden tomar 30 días. Los trámites empresariales suelen tomar entre 5-15 días hábiles.',
    category: 'general'
  },
  {
    id: '4',
    question: '¿Cuáles trámites se pueden hacer en línea?',
    answer: 'Muchos trámites ya son digitales: DPI, pasaporte, antecedentes penales y policíacos, NIT, FEL, libros contables, y licencia ambiental. Esto agiliza los procesos y reduce visitas presenciales.',
    category: 'digital'
  }
];

export default function ObservatoryChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      message: '¡Hola! Soy tu asistente especializado en trámites guatemaltecos. Tengo información detallada sobre los 20 trámites más importantes del país. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showFAQs, setShowFAQs] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'personal' | 'business'>('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleSlideAction = (action: string) => {
    switch (action) {
      case 'start-chat':
        document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'success-stories':
        document.getElementById('success-stories')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'try-assistant':
        document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Search for specific procedures
    const matchedProcedure = keyProcedures.find(proc => 
      proc.name.toLowerCase().includes(input) ||
      proc.description.toLowerCase().includes(input) ||
      input.includes(proc.name.toLowerCase().split(' ')[0])
    );

    if (matchedProcedure) {
      return `Te ayudo con información sobre **${matchedProcedure.name}**:

📋 **Descripción**: ${matchedProcedure.description}

🏢 **Institución**: ${matchedProcedure.institution}

💰 **Costo**: ${matchedProcedure.cost}

⏱️ **Duración**: ${matchedProcedure.duration}

${matchedProcedure.isDigital ? '💻 **Trámite Digital**: Sí' : '🏢 **Trámite Presencial**: Sí'}

**Historia de éxito**: ${matchedProcedure.story}

**¿Por qué es importante?**: ${matchedProcedure.impact}

**Consejos principales**:
${matchedProcedure.tips.slice(0, 2).map(tip => `• ${tip}`).join('\n')}

¿Te gustaría conocer los requisitos completos o los pasos detallados?`;
    }

    // Category-based responses
    if (input.includes('personal') || input.includes('persona')) {
      const personalProcs = keyProcedures.filter(p => p.category === 'personal').slice(0, 5);
      return `Los **trámites personales** más importantes son:

${personalProcs.map(p => `• **${p.name}** (${p.institution}) - ${p.duration}`).join('\n')}

Estos documentos son esenciales para la vida cotidiana. ¿Sobre cuál te gustaría saber más?`;
    }

    if (input.includes('negocio') || input.includes('empresa') || input.includes('comercio')) {
      const businessProcs = keyProcedures.filter(p => p.category === 'business').slice(0, 5);
      return `Para **iniciar un negocio** legalmente necesitas estos trámites:

${businessProcs.map(p => `• **${p.name}** (${p.institution}) - ${p.cost}`).join('\n')}

¿Te interesa información específica sobre alguno de estos trámites?`;
    }

    if (input.includes('popular') || input.includes('importante') || input.includes('común')) {
      const popularProcs = keyProcedures.sort((a, b) => b.popularity - a.popularity).slice(0, 5);
      return `Los **trámites más populares** en Guatemala son:

${popularProcs.map((p, i) => `${i + 1}. **${p.name}** (${p.popularity}% popularidad)`).join('\n')}

Estos son los que más realizan los guatemaltecos. ¿Cuál te interesa?`;
    }

    if (input.includes('digital') || input.includes('línea') || input.includes('internet')) {
      const digitalProcs = keyProcedures.filter(p => p.isDigital).slice(0, 6);
      return `**Trámites que puedes hacer en línea**:

${digitalProcs.map(p => `• **${p.name}** - ${p.duration}`).join('\n')}

Los trámites digitales son más rápidos y cómodos. ¿Cuál quieres realizar?`;
    }

    if (input.includes('costo') || input.includes('precio') || input.includes('cuánto')) {
      return `**Costos de trámites principales**:

**Gratuitos**: NIT, FEL, Registro de contratos, Permiso sanitario
**Económicos**: Antecedentes (Q30), Ornato (Q4-150)
**Moderados**: DPI (Q100), Licencia conducir (Q100/año)
**Variables**: Pasaporte (US$50-85), Licencias municipales

¿Te interesa el costo específico de algún trámite?`;
    }

    if (input.includes('tiempo') || input.includes('duración') || input.includes('demora')) {
      return `**Tiempos de trámites**:

**Inmediatos**: FEL, Régimen tributario
**Rápidos (1-3 días)**: Antecedentes penales, NIT, Contratos RECIT
**Moderados (5-15 días)**: Registro mercantil, Licencias municipales
**Largos (30+ días)**: DPI, Licencia ambiental

¿Necesitas información sobre algún trámite específico?`;
    }

    // General help
    if (input.includes('ayuda') || input.includes('información') || input.includes('orientación')) {
      return `Puedo ayudarte con información sobre **20 trámites clave** en Guatemala:

🔹 **10 trámites personales**: DPI, pasaporte, licencia, antecedentes, etc.
🔹 **10 trámites de negocios**: Registro mercantil, NIT, licencias, etc.

**¿Qué necesitas?**
• Información específica de un trámite
• Comparar opciones
• Conocer requisitos y pasos
• Consejos prácticos

Escribe el nombre del trámite o dime qué quieres hacer.`;
    }

    // Default response
    return `Como especialista en trámites guatemaltecos, puedo ayudarte con información detallada sobre los 20 procedimientos más importantes del país.

**Puedes preguntarme sobre**:
• Trámites específicos (ej: "DPI", "pasaporte", "registro mercantil")
• Categorías ("trámites personales", "trámites de negocios")
• Características ("trámites digitales", "costos", "tiempos")

¿Qué información necesitas?`;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setShowFAQs(false);

    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        message: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleFAQClick = (faq: any) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: faq.question,
      timestamp: new Date()
    };

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      message: faq.answer,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setShowFAQs(false);
  };

  const handleQuickAction = (action: string) => {
    let response = '';
    switch (action) {
      case 'search':
        response = 'Puedes buscar cualquier trámite escribiendo su nombre. Por ejemplo: "DPI", "pasaporte", "registro mercantil", "antecedentes", etc. ¿Qué trámite necesitas?';
        break;
      case 'personal':
        const personalProcs = keyProcedures.filter(p => p.category === 'personal').slice(0, 5);
        response = `**Trámites personales más importantes**:\n\n${personalProcs.map(p => `• **${p.name}** - ${p.institution}`).join('\n')}\n\n¿Sobre cuál quieres información detallada?`;
        break;
      case 'business':
        const businessProcs = keyProcedures.filter(p => p.category === 'business').slice(0, 5);
        response = `**Trámites esenciales para negocios**:\n\n${businessProcs.map(p => `• **${p.name}** - ${p.institution}`).join('\n')}\n\n¿Cuál te interesa conocer?`;
        break;
      case 'popular':
        const popularProcs = keyProcedures.sort((a, b) => b.popularity - a.popularity).slice(0, 5);
        response = `**Los 5 trámites más populares**:\n\n${popularProcs.map((p, i) => `${i + 1}. **${p.name}** (${p.popularity}%)`).join('\n')}\n\n¿Cuál necesitas realizar?`;
        break;
    }

    const botMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'bot',
      message: response,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setShowFAQs(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-GT', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const filteredProcedures = selectedCategory === 'all' 
    ? keyProcedures 
    : keyProcedures.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Slider */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          {/* Slide Content */}
          <div className="text-center">
            <div className="mb-8">
              <div className="text-8xl mb-6 animate-bounce">
                {heroSlides[currentSlide].image}
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                {heroSlides[currentSlide].title}
              </h1>
              <h2 className="text-2xl md:text-3xl text-blue-200 mb-6 font-medium">
                {heroSlides[currentSlide].subtitle}
              </h2>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
                {heroSlides[currentSlide].description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-8">
              {heroSlides[currentSlide].stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-blue-200">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => handleSlideAction(heroSlides[currentSlide].action)}
              className="bg-white text-blue-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl"
            >
              {heroSlides[currentSlide].cta}
            </button>
          </div>

          {/* Slider Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
            <button
              onClick={prevSlide}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="flex space-x-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-white' : 'bg-white/40'
                  }`}
                  aria-label={`Ir a slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              aria-label="Siguiente slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors ml-4"
              aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tu Compañero en el Camino Ciudadano
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Cada trámite cuenta una historia. Cada documento abre una puerta. Cada proceso completado 
            es un paso hacia tus metas. Estamos aquí para acompañarte en cada uno de ellos.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Section */}
          <div className="lg:col-span-2" id="chat-section">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-t-xl">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Asistente de Trámites</h3>
                    <p className="text-xs opacity-90">Especializado en procedimientos guatemaltecos</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        {message.type === 'user' ? (
                          <User className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Bot className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                      <div className={`p-3 rounded-2xl ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                        <div className="text-sm whitespace-pre-line">{message.message}</div>
                        <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* FAQ Suggestions */}
                {showFAQs && (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 font-medium">Preguntas frecuentes:</p>
                    <div className="grid gap-2">
                      {faqs.slice(0, 4).map((faq) => (
                        <button
                          key={faq.id}
                          onClick={() => handleFAQClick(faq)}
                          className="text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-sm text-blue-800"
                        >
                          {faq.question}
                        </button>
                      ))}
                    </div>

                    <p className="text-sm text-gray-600 font-medium mt-4">Acciones rápidas:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.map((action, index) => {
                        const IconComponent = action.icon;
                        return (
                          <button
                            key={index}
                            onClick={() => handleQuickAction(action.action)}
                            className="flex items-center space-x-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700"
                          >
                            <IconComponent className="h-4 w-4" />
                            <span>{action.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Pregunta sobre cualquier trámite guatemalteco..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    aria-label="Escribe tu pregunta sobre trámites"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    aria-label="Enviar mensaje"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={() => setShowFAQs(true)}
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    Ver preguntas frecuentes
                  </button>
                  <p className="text-xs text-gray-500">
                    Presiona Enter para enviar
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Top Procedures */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trámites Más Consultados</h3>
              <div className="space-y-3">
                {keyProcedures
                  .sort((a, b) => b.popularity - a.popularity)
                  .slice(0, 5)
                  .map((procedure, index) => (
                    <div key={procedure.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {procedure.name}
                        </p>
                        <p className="text-xs text-gray-500">{procedure.institution}</p>
                      </div>
                      <div className="text-xs text-gray-400">
                        {procedure.popularity}%
                      </div>
                    </div>
                  ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}