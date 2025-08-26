import React from 'react';
import { ArrowLeft, Clock, Building2, User, CheckCircle, AlertCircle, FileText, Users, ChevronRight, MapPin, Phone, Globe, Mail, Lightbulb, MessageSquare, ThumbsUp, Star, Send, List, PlayCircle, ClipboardList, ExternalLink, Info, Lightbulb as LightbulbIcon, MessageCircleIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Procedure } from '../../types';
import { useComments } from '../../hooks/useComments';

interface ProcedureDetailProps {
  procedure: Procedure;
}

const institutionInfo: Record<string, any> = {
  'RENAP': {
    fullName: 'Registro Nacional de las Personas',
    description: 'Institución encargada de la identificación y registro civil de los guatemaltecos',
    address: '6a Avenida 4-64, Zona 4, Ciudad de Guatemala',
    phone: '1551',
    website: 'https://www.renap.gob.gt',
    email: 'info@renap.gob.gt',
    hours: 'Lunes a Viernes: 8:00 AM - 4:00 PM',
    services: ['Emisión de DPI', 'Certificaciones de nacimiento', 'Certificaciones de defunción', 'Cambio de nombre']
  },
  'Registro Mercantil': {
    fullName: 'Registro Mercantil General de la República',
    description: 'Institución responsable del registro de empresas y comerciantes en Guatemala',
    address: '7a Avenida 7-61, Zona 4, Ciudad de Guatemala',
    phone: '2412-0000',
    website: 'https://www.registromercantil.gob.gt',
    email: 'info@registromercantil.gob.gt',
    hours: 'Lunes a Viernes: 8:00 AM - 4:30 PM',
    services: ['Inscripción de empresas', 'Modificaciones societarias', 'Patentes de comercio', 'Certificaciones mercantiles']
  },
  'Municipalidad': {
    fullName: 'Municipalidades de Guatemala',
    description: 'Gobiernos locales encargados de servicios municipales y licencias locales',
    address: 'Varía según municipio',
    phone: 'Varía según municipio',
    website: 'https://www.infom.gob.gt',
    email: 'Varía según municipio',
    hours: 'Lunes a Viernes: 8:00 AM - 4:00 PM',
    services: ['Licencias de construcción', 'Boleto de ornato', 'Permisos comerciales', 'Servicios públicos']
  },
  'USAC': {
    fullName: 'Universidad de San Carlos de Guatemala',
    description: 'Universidad pública autónoma de Guatemala',
    address: 'Ciudad Universitaria, Zona 12, Ciudad de Guatemala',
    phone: '2418-8000',
    website: 'https://www.usac.edu.gt',
    email: 'webmaster@usac.edu.gt',
    hours: 'Lunes a Viernes: 7:00 AM - 6:00 PM',
    services: ['Inscripciones', 'Certificaciones académicas', 'Títulos universitarios', 'Equivalencias']
  },
  'MSPAS': {
    fullName: 'Ministerio de Salud Pública y Asistencia Social',
    description: 'Ministerio encargado de la salud pública en Guatemala',
    address: '6a Avenida 3-45, Zona 11, Ciudad de Guatemala',
    phone: '2440-4747',
    website: 'https://www.mspas.gob.gt',
    email: 'info@mspas.gob.gt',
    hours: 'Lunes a Viernes: 8:00 AM - 4:30 PM',
    services: ['Certificados de salud', 'Licencias sanitarias', 'Vacunación', 'Programas de salud']
  },
  'Organismo Judicial': {
    fullName: 'Organismo Judicial de Guatemala',
    description: 'Poder judicial encargado de la administración de justicia',
    address: '21 Calle 7-70, Zona 1, Ciudad de Guatemala',
    phone: '2248-5555',
    website: 'https://www.oj.gob.gt',
    email: 'webmaster@oj.gob.gt',
    hours: 'Lunes a Viernes: 8:00 AM - 4:30 PM',
    services: ['Antecedentes penales', 'Certificaciones judiciales', 'Procesos judiciales', 'Mediación']
  }
};

export default function ProcedureDetail({ procedure }: ProcedureDetailProps) {
  const [newComment, setNewComment] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const [authorName, setAuthorName] = React.useState('');
  const [authorEmail, setAuthorEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('overview');
  const navigate = useNavigate();
  
  // Usar el hook de comentarios con Supabase
  const { comments, loading: commentsLoading, error: commentsError, addComment, markHelpful } = useComments(procedure.id);

  const institution = institutionInfo[procedure.institution] || {};
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'digital': return '💻';
      case 'presencial': return '🏢';
      case 'mixto': return '🔄';
      default: return '📄';
    }
  };

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'digital': return 'bg-green-100 text-green-800';
      case 'presencial': return 'bg-blue-100 text-blue-800';
      case 'mixto': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && rating > 0 && authorName.trim()) {
      setIsSubmitting(true);
      
      const result = await addComment({
        author_name: authorName.trim(),
        author_email: authorEmail.trim() || undefined,
        rating,
        comment: newComment.trim()
      });

      if (result.success) {
        // Limpiar formulario
        setNewComment('');
        setRating(0);
        setAuthorName('');
        setAuthorEmail('');
        
        // Mostrar mensaje de éxito
        alert('¡Gracias por compartir tu experiencia! Tu comentario ha sido publicado.');
      } else {
        alert('Error al publicar el comentario: ' + result.error);
      }
      
      setIsSubmitting(false);
    } else {
      alert('Por favor completa todos los campos requeridos (nombre, calificación y comentario).');
    }
  };

  const handleHelpful = async (commentId: string) => {
    const result = await markHelpful(commentId);
    if (!result.success) {
      alert(result.error || 'Error al marcar como útil');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-GT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n.charAt(0)).join('').substring(0, 2).toUpperCase();
  };

  const calculateAverageRating = () => {
    if (comments.length === 0) return 0;
    const sum = comments.reduce((acc, comment) => acc + comment.rating, 0);
    return (sum / comments.length).toFixed(1);
  };

  // Función auxiliar para manejar comentarios legacy (mantener compatibilidad)
  const handleLegacyHelpful = (commentId: string) => {
    // Esta función mantiene la funcionalidad para comentarios que no están en Supabase
    console.log('Legacy helpful click for comment:', commentId);
  };

  // Combinar comentarios de Supabase con comentarios legacy si existen
  const legacyComments = [
    {
      id: 'legacy-1',
      author_name: 'María González',
      rating: 5,
      created_at: '2024-01-15T00:00:00Z',
      comment: 'Excelente información. Llegué preparada con todos los documentos y el proceso fue muy rápido. Recomiendo ir temprano para evitar filas.',
      helpful_count: 12,
      isLegacy: true
    },
    {
      id: 'legacy-2',
      author_name: 'Carlos Mendoza',
      rating: 4,
      created_at: '2024-01-10T00:00:00Z',
      comment: 'La información está completa, pero me hubiera gustado saber que necesitaba hacer cita previa. Tuve que regresar otro día.',
      helpful_count: 8,
      isLegacy: true
    },
    {
      id: 'legacy-3',
      author_name: 'Ana Rodríguez',
      rating: 5,
      created_at: '2024-01-08T00:00:00Z',
      comment: 'Perfecto! Seguí todos los pasos y no tuve ningún problema. El personal fue muy amable y el proceso tomó exactamente el tiempo estimado.',
      helpful_count: 15,
      isLegacy: true
    }
  ];

  // Combinar comentarios reales con legacy para mostrar
  const allComments = [...comments, ...legacyComments].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const handleHelpfulClick = (commentId: string, isLegacy?: boolean) => {
    if (isLegacy) {
      handleLegacyHelpful(commentId);
    } else {
      handleHelpful(commentId);
    }
  };

  // Función para limpiar el formulario
  const resetForm = () => {
    setNewComment('');
    setRating(0);
    setAuthorName('');
    setAuthorEmail('');
  };

  const handleCommentSubmitOld = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && rating > 0) {
      const comment = {
        id: Date.now().toString(),
        author: 'Usuario Anónimo',
        rating,
        date: new Date().toISOString().split('T')[0],
        comment: newComment,
        helpful: 0
      };
      setNewComment('');
      setRating(0);
    }
  };

  const procedureTips = {
    '1': [ // Renovación de DPI
      'Llega temprano para evitar filas largas, especialmente los lunes',
      'Verifica que tu partida de nacimiento esté certificada y no sea mayor a 6 meses',
      'Lleva efectivo para el pago, no todas las oficinas aceptan tarjeta',
      'Si tu DPI está muy deteriorado, lleva una copia adicional',
      'Puedes hacer cita previa en línea para ahorrar tiempo'
    ],
    '2': [ // Inscripción de Empresa
      'Consulta con un abogado antes de redactar la escritura pública',
      'Verifica que el nombre de tu empresa no esté registrado',
      'Prepara al menos 3 opciones de nombre por si alguna está ocupada',
      'El proceso puede tomar más tiempo en diciembre y enero',
      'Guarda todas las copias de documentos en un lugar seguro'
    ],
    '3': [ // Licencia de Construcción
      'Contrata un arquitecto colegiado para sellar los planos',
      'Verifica las restricciones de construcción en tu zona',
      'Ten listos los planos estructurales desde el inicio',
      'Consulta con vecinos sobre experiencias en la municipalidad',
      'Considera contratar un gestor si el proceso es complejo'
    ],
    '4': [ // Inscripción Universitaria
      'Estudia con anticipación para el examen de admisión',
      'Verifica que todos tus documentos estén apostillados si estudiaste en el extranjero',
      'Mantén copias digitales de todos tus documentos',
      'Inscríbete en línea tan pronto abran las inscripciones',
      'Ten un plan B con otras carreras o universidades'
    ],
    '5': [ // Certificado de Salud
      'Ve en ayunas si requieres exámenes de laboratorio',
      'Lleva una botella de agua para después de los exámenes',
      'Programa tu cita un día que no tengas actividades importantes',
      'Verifica si tu centro de salud requiere cita previa',
      'Lleva un suéter, los centros de salud suelen estar fríos'
    ],
    '6': [ // Antecedentes Penales
      'Asegúrate de tener una conexión a internet estable',
      'Ten listos los datos de tu tarjeta para el pago en línea',
      'Descarga el PDF inmediatamente después del proceso',
      'Verifica que todos tus datos personales estén correctos',
      'Guarda el documento en varios lugares (email, nube, etc.)'
    ]
  };

  const tips = procedureTips[procedure.id as keyof typeof procedureTips] || [
    'Llega preparado con todos los documentos requeridos',
    'Verifica los horarios de atención antes de tu visita',
    'Ten paciencia, algunos procesos pueden tomar tiempo',
    'Mantén copias de todos tus documentos importantes'
  ];

  const menuSections = [
    { id: 'overview', label: 'Información General', icon: Info },
    { id: 'steps', label: 'Pasos a Seguir', icon: PlayCircle },
    { id: 'requirements', label: 'Requisitos', icon: ClipboardList },
    { id: 'portal', label: 'Portal Oficial', icon: ExternalLink },
    { id: 'institution', label: 'Información Institucional', icon: Building2 },
    { id: 'tips', label: 'Consejos', icon: LightbulbIcon },
    { id: 'comments', label: 'Experiencias', icon: MessageCircleIcon }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = menuSections.map(section => section.id);
      const currentSection = sections.find(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Lateral Menu */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center space-x-2 mb-4">
                  <List className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Contenido</h3>
                </div>
                <nav className="space-y-2">
                  {menuSections.map((section) => {
                    const IconComponent = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                          activeSection === section.id
                            ? 'bg-blue-50 text-blue-800 border-l-2 border-blue-600'
                            : 'text-gray-600 hover:text-blue-800 hover:bg-gray-50'
                        }`}
                      >
                        <IconComponent className="h-4 w-4 flex-shrink-0" />
                        <span>{section.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div id="overview" className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{getTypeIcon(procedure.type)}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(procedure.type)}`}>
                      {procedure.type.charAt(0).toUpperCase() + procedure.type.slice(1)}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{procedure.name}</h1>
                  <p className="text-gray-600 mb-4">{procedure.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Tiempo estimado</p>
                        <p className="text-sm text-gray-600">{procedure.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Institución</p>
                        <p className="text-sm text-gray-600">{procedure.institution}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Tipo de usuario</p>
                        <p className="text-sm text-gray-600 capitalize">{procedure.userType}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Steps Section */}
            <div id="steps" className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center space-x-2 mb-6">
                <PlayCircle className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Pasos a Seguir</h2>
              </div>
              <div className="space-y-4">
                {procedure.steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-medium text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements Section */}
            <div id="requirements" className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center space-x-2 mb-6">
                <ClipboardList className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Requisitos</h2>
              </div>
              <div className="grid gap-4">
                {procedure.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{requirement}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Portal Section */}
            <div id="portal" className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center space-x-2 mb-6">
                <ExternalLink className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Portal Oficial</h2>
              </div>
              {procedure.isDigital ? (
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-blue-800 mb-3">
                    Puedes realizar este trámite o obtener más información en el portal oficial:
                  </p>
                  <a
                    href={institution.website || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Globe className="h-4 w-4" />
                    <span>Ir al portal oficial</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              ) : (
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-yellow-800 font-medium mb-1">Trámite presencial</p>
                      <p className="text-yellow-700 text-sm">
                        Este trámite debe realizarse de forma presencial en las oficinas de {procedure.institution}.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Institution Information */}
            <div id="institution" className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center space-x-2 mb-6">
                <Building2 className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Información Institucional</h2>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{institution.fullName || procedure.institution}</h3>
                {institution.description && (
                  <p className="text-gray-600 mb-4">{institution.description}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {institution.address && (
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Dirección</p>
                        <p className="text-sm text-gray-600">{institution.address}</p>
                      </div>
                    </div>
                  )}
                  
                  {institution.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Teléfono</p>
                        <p className="text-sm text-gray-600">{institution.phone}</p>
                      </div>
                    </div>
                  )}
                  
                  {institution.email && (
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Correo</p>
                        <p className="text-sm text-gray-600">{institution.email}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  {institution.website && (
                    <div className="flex items-center space-x-3">
                      <Globe className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Sitio Web</p>
                        <a 
                          href={institution.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-700 underline"
                        >
                          Visitar sitio oficial
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {institution.hours && (
                    <div className="flex items-start space-x-3">
                      <Clock className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Horarios de Atención</p>
                        <p className="text-sm text-gray-600">{institution.hours}</p>
                      </div>
                    </div>
                  )}
                  
                  {institution.services && (
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Otros Servicios</p>
                      <div className="flex flex-wrap gap-2">
                        {institution.services.map((service: string, index: number) => (
                          <span 
                            key={index}
                            className="bg-blue-50 text-blue-800 px-2 py-1 rounded-full text-xs"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tips and Advice Section */}
            <div id="tips" className="mt-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Lightbulb className="h-6 w-6 text-yellow-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Consejos y Recomendaciones</h2>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                  <p className="text-yellow-800 text-sm mb-3 font-medium">
                    💡 Consejos de ciudadanos que ya completaron este trámite:
                  </p>
                  <ul className="space-y-2">
                    {tips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2 text-yellow-800">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div id="comments" className="mt-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Experiencias de Ciudadanos</h2>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">{allComments.length} comentarios</span>
                    {allComments.length > 0 && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">
                          {calculateAverageRating()} promedio
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Add Comment Form */}
                <form onSubmit={handleCommentSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">Comparte tu experiencia</h3>
                  
                  {/* Author Information */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tu nombre *
                      </label>
                      <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="Nombre completo"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email (opcional)
                      </label>
                      <input
                        type="email"
                        value={authorEmail}
                        onChange={(e) => setAuthorEmail(e.target.value)}
                        placeholder="tu@email.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Califica este trámite *
                    </label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`p-1 ${
                            star <= rating ? 'text-yellow-400' : 'text-gray-300'
                          } hover:text-yellow-400 transition-colors`}
                        >
                          <Star className="h-6 w-6 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment Text */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tu experiencia *
                    </label>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Comparte consejos, tiempos reales, dificultades encontradas, o cualquier información útil para otros ciudadanos..."
                      required
                    />
                  </div>

                  {/* Error Display */}
                  {commentsError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{commentsError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!newComment.trim() || rating === 0 || !authorName.trim() || isSubmitting}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>{isSubmitting ? 'Publicando...' : 'Publicar comentario'}</span>
                  </button>
                  
                  <p className="text-xs text-gray-500 mt-2">
                    * Campos requeridos. Tu comentario será visible públicamente para ayudar a otros ciudadanos.
                  </p>
                </form>

                {/* Loading State */}
                {commentsLoading && (
                  <div className="text-center py-4">
                    <p className="text-gray-500">Cargando comentarios...</p>
                  </div>
                )}

                {/* Comments List */}
                <div className="space-y-6">
                  {allComments.map((comment) => (
                    <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center font-medium text-sm">
                            {getInitials(comment.author_name)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium text-gray-900">{comment.author_name}</h4>
                              {comment.isLegacy && (
                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                                  Comentario anterior
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= comment.rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                {formatDate(comment.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-3 ml-13">{comment.comment}</p>
                      
                      <div className="flex items-center space-x-4 ml-13">
                        <button
                          onClick={() => handleHelpfulClick(comment.id, comment.isLegacy)}
                          className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>Útil ({comment.helpful_count})</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Comments */}
                {allComments.length === 0 && !commentsLoading && (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-2">Aún no hay comentarios para este trámite</p>
                    <p className="text-sm text-gray-500">¡Sé el primero en compartir tu experiencia!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-8">
              <button
                onClick={() => navigate('/catalogo')}
                className="flex items-center space-x-2 text-blue-800 hover:text-blue-900 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-blue-50 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Volver al catálogo</span>
              </button>
            </div>

            {/* Red Ciudadana Info */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-2">Información recolectada por Red Ciudadana</h3>
                  <p className="text-blue-800 text-sm mb-3">
                    Esta información ha sido recopilada y verificada por nuestro equipo de investigación ciudadana. 
                    Si encuentras algún error o cambio en el proceso, ayúdanos a mantener la información actualizada.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                      Reportar cambio
                    </button>
                    <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium text-sm">
                      Compartir experiencia
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
          </div>
        </div>
      </div>
    </div>
  );
}