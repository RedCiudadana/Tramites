import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  HelpCircle, 
  FileText, 
  Users, 
  Phone, 
  Mail, 
  MessageCircle,
  Book,
  CheckCircle,
  AlertCircle,
  Clock,
  Building2,
  User,
  Globe,
  Download
} from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface ProcessStep {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqCategories = [
    { id: 'general', name: 'General', icon: HelpCircle },
    { id: 'tramites', name: 'Trámites', icon: FileText },
    { id: 'instituciones', name: 'Instituciones', icon: Building2 },
    { id: 'documentos', name: 'Documentos', icon: CheckCircle },
    { id: 'tiempos', name: 'Tiempos', icon: Clock },
    { id: 'red-ciudadana', name: 'Red Ciudadana', icon: Users }
  ];

  const faqs: FAQ[] = [
    // General
    {
      id: '1',
      question: '¿Qué es Red Ciudadana?',
      answer: 'Red Ciudadana es una organización de sociedad civil que recopila, verifica y organiza información sobre trámites gubernamentales para facilitar el acceso ciudadano a los servicios públicos. Nuestro objetivo es empoderar a los ciudadanos con información clara y completa.',
      category: 'general'
    },
    {
      id: '2',
      question: '¿Es gratuito usar este portal?',
      answer: 'Sí, completamente gratuito. Red Ciudadana es una iniciativa sin fines de lucro que busca democratizar el acceso a la información pública. No cobramos por ningún servicio de información.',
      category: 'general'
    },
    {
      id: '3',
      question: '¿Puedo realizar trámites directamente aquí?',
      answer: 'No, este portal es únicamente informativo. Te proporcionamos toda la información necesaria para que llegues preparado a las oficinas gubernamentales o portales oficiales donde debes realizar tu trámite.',
      category: 'general'
    },

    // Trámites
    {
      id: '4',
      question: '¿Cómo busco información sobre un trámite específico?',
      answer: 'Puedes usar el buscador en la página principal, navegar por categorías, o usar nuestro chatbot. También puedes filtrar por tipo de usuario (persona/empresa) y modalidad (digital/presencial).',
      category: 'tramites'
    },
    {
      id: '5',
      question: '¿Qué información encuentro sobre cada trámite?',
      answer: 'Para cada trámite encontrarás: requisitos completos, pasos detallados, tiempos estimados, información institucional, costos, horarios de atención y enlaces a portales oficiales.',
      category: 'tramites'
    },
    {
      id: '6',
      question: '¿Los trámites digitales se pueden hacer completamente en línea?',
      answer: 'Los trámites marcados como "digitales" generalmente se pueden completar en línea, pero algunos pueden requerir pasos presenciales. Siempre verifica en el portal oficial de la institución.',
      category: 'tramites'
    },

    // Instituciones
    {
      id: '7',
      question: '¿Dónde encuentro información de contacto de las instituciones?',
      answer: 'En cada página de trámite incluimos información completa de la institución: dirección, teléfonos, correos, horarios de atención y sitio web oficial.',
      category: 'instituciones'
    },
    {
      id: '8',
      question: '¿Cómo sé si una institución tiene servicios en línea?',
      answer: 'Indicamos claramente qué trámites son digitales, presenciales o mixtos. También proporcionamos enlaces directos a los portales oficiales de cada institución.',
      category: 'instituciones'
    },

    // Documentos
    {
      id: '9',
      question: '¿Qué documentos necesito tener siempre listos?',
      answer: 'Los documentos más comunes son: DPI vigente, partida de nacimiento certificada, comprobante de residencia reciente, y fotografías tamaño cédula. Cada trámite tiene requisitos específicos.',
      category: 'documentos'
    },
    {
      id: '10',
      question: '¿Dónde obtengo certificaciones de documentos?',
      answer: 'Las partidas de nacimiento se obtienen en RENAP, las certificaciones académicas en tu institución educativa, y otros documentos en sus respectivas instituciones emisoras.',
      category: 'documentos'
    },

    // Tiempos
    {
      id: '11',
      question: '¿Los tiempos estimados son exactos?',
      answer: 'Los tiempos son estimaciones basadas en información oficial y experiencias ciudadanas. Pueden variar según la demanda, época del año y eficiencia de cada oficina.',
      category: 'tiempos'
    },
    {
      id: '12',
      question: '¿Qué hacer si mi trámite toma más tiempo del estimado?',
      answer: 'Contacta directamente a la institución para consultar el estado. Si hay demoras injustificadas, puedes presentar una queja formal o contactar a Red Ciudadana para reportar la situación.',
      category: 'tiempos'
    },

    // Red Ciudadana
    {
      id: '13',
      question: '¿Cómo puedo contribuir con información?',
      answer: 'Puedes reportar cambios en procesos, compartir tu experiencia, verificar información existente, o contactarnos con actualizaciones. Tu contribución ayuda a mantener la información actualizada.',
      category: 'red-ciudadana'
    },
    {
      id: '14',
      question: '¿Cómo verifican la información?',
      answer: 'Nuestro equipo verifica información con fuentes oficiales, experiencias ciudadanas, y monitoreo constante de cambios en procesos gubernamentales. También contamos con una red de colaboradores.',
      category: 'red-ciudadana'
    }
  ];

  const processSteps: ProcessStep[] = [
    {
      title: 'Identifica tu necesidad',
      description: 'Usa nuestro buscador o navega por categorías para encontrar el trámite que necesitas.',
      icon: Search
    },
    {
      title: 'Revisa la información completa',
      description: 'Lee todos los requisitos, pasos y información institucional antes de proceder.',
      icon: FileText
    },
    {
      title: 'Prepara tus documentos',
      description: 'Reúne todos los documentos requeridos y verifica que estén vigentes y en buen estado.',
      icon: CheckCircle
    },
    {
      title: 'Planifica tu visita',
      description: 'Verifica horarios de atención, ubicación y si necesitas cita previa.',
      icon: Clock
    },
    {
      title: 'Ve al portal oficial',
      description: 'Usa los enlaces que proporcionamos para ir directamente al sitio oficial de la institución.',
      icon: Globe
    },
    {
      title: 'Comparte tu experiencia',
      description: 'Ayuda a otros ciudadanos reportando cambios o compartiendo tu experiencia.',
      icon: Users
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'general' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <HelpCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Centro de Ayuda
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Encuentra respuestas a tus preguntas sobre trámites, instituciones y cómo usar 
            la información de Red Ciudadana para tener éxito en tus gestiones gubernamentales.
          </p>
        </div>

        {/* Quick Contact */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 mb-12 text-white">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">¿Necesitas ayuda inmediata?</h2>
            <p className="text-blue-100">Nuestro equipo está aquí para apoyarte</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white/20 p-4 rounded-xl mb-3 mx-auto w-fit">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1">Chat en Vivo</h3>
              <p className="text-sm text-blue-100 mb-3">Respuesta inmediata</p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                Iniciar chat
              </button>
            </div>
            <div className="text-center">
              <div className="bg-white/20 p-4 rounded-xl mb-3 mx-auto w-fit">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1">Correo Electrónico</h3>
              <p className="text-sm text-blue-100 mb-3">info@redciudadana.org.gt</p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                Enviar correo
              </button>
            </div>
            <div className="text-center">
              <div className="bg-white/20 p-4 rounded-xl mb-3 mx-auto w-fit">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1">Teléfono</h3>
              <p className="text-sm text-blue-100 mb-3">+502 2440-0000</p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                Llamar ahora
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Book className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Preguntas Frecuentes</h2>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar en preguntas frecuentes..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {faqCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span className="text-sm font-medium">{category.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {expandedFAQ === faq.id ? (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFAQ === faq.id && (
                      <div className="px-4 pb-4 text-gray-700 border-t border-gray-100">
                        <p className="pt-3">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No se encontraron preguntas que coincidan con tu búsqueda.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Process Guide */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Cómo Usar Red Ciudadana</h3>
              </div>
              <div className="space-y-4">
                {processSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                        <IconComponent className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{step.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Documentation */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Documentación</h3>
              </div>
              <div className="space-y-3">
                <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Download className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Guía de Trámites 2024</span>
                  </div>
                  <span className="text-xs text-gray-500">PDF</span>
                </a>
                <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Download className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Lista de Instituciones</span>
                  </div>
                  <span className="text-xs text-gray-500">PDF</span>
                </a>
                <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Download className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Documentos Comunes</span>
                  </div>
                  <span className="text-xs text-gray-500">PDF</span>
                </a>
              </div>
            </div>

            {/* Community */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Únete a la Comunidad</h3>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Ayuda a otros ciudadanos compartiendo tu experiencia y manteniendo la información actualizada.
              </p>
              <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium">
                Contribuir
              </button>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recursos Adicionales</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Portales Oficiales</h3>
              <p className="text-sm text-gray-600 mb-4">
                Enlaces directos a todos los portales gubernamentales oficiales
              </p>
              <button className="text-blue-600 hover:text-blue-700 font-medium">Ver portales</button>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Reportar Problemas</h3>
              <p className="text-sm text-gray-600 mb-4">
                Informa sobre cambios en procesos o información desactualizada
              </p>
              <button className="text-purple-600 hover:text-purple-700 font-medium">Reportar</button>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Feedback</h3>
              <p className="text-sm text-gray-600 mb-4">
                Comparte tu experiencia para mejorar nuestro servicio
              </p>
              <button className="text-green-600 hover:text-green-700 font-medium">Dar feedback</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}