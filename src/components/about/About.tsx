import React from 'react';
import { 
  Heart, 
  Target, 
  Users, 
  BarChart3, 
  Shield, 
  Globe, 
  CheckCircle, 
  Award,
  Eye,
  Lightbulb,
  Building2,
  FileText,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  ExternalLink
} from 'lucide-react';

export default function About() {
  const objectives = [
    {
      icon: Target,
      title: "Democratizar el Acceso a la Información",
      description: "Facilitar que todos los ciudadanos guatemaltecos tengan acceso a información clara y verificada sobre trámites gubernamentales."
    },
    {
      icon: Shield,
      title: "Verificar y Actualizar Información",
      description: "Mantener un sistema de verificación constante que garantice la precisión y actualidad de todos los datos proporcionados."
    },
    {
      icon: Users,
      title: "Empoderar a la Ciudadanía",
      description: "Proporcionar herramientas y conocimiento para que los ciudadanos puedan realizar sus trámites de manera eficiente y informada."
    },
    {
      icon: BarChart3,
      title: "Promover la Transparencia",
      description: "Analizar y evaluar la eficiencia de los procesos gubernamentales desde una perspectiva ciudadana independiente."
    }
  ];

  const observatoryFeatures = [
    {
      icon: Eye,
      title: "Monitoreo Independiente",
      description: "Evaluamos la eficiencia de los trámites gubernamentales desde la perspectiva ciudadana, sin sesgos institucionales."
    },
    {
      icon: TrendingUp,
      title: "Análisis de Tendencias",
      description: "Identificamos patrones y tendencias en la evolución de los procesos gubernamentales a lo largo del tiempo."
    },
    {
      icon: Award,
      title: "Reconocimiento de Buenas Prácticas",
      description: "Destacamos las instituciones y procesos que demuestran excelencia en servicio ciudadano."
    },
    {
      icon: Lightbulb,
      title: "Recomendaciones de Mejora",
      description: "Proporcionamos sugerencias específicas para optimizar procesos y mejorar la experiencia ciudadana."
    }
  ];

  const evaluationCriteria = [
    { name: "Digitalización", description: "Nivel de automatización y disponibilidad en línea" },
    { name: "Simplificación", description: "Facilidad de uso y comprensión del proceso" },
    { name: "Interoperabilidad", description: "Integración entre diferentes sistemas gubernamentales" },
    { name: "Trazabilidad", description: "Capacidad de seguimiento del estado del trámite" },
    { name: "Accesibilidad", description: "Disponibilidad para personas con diferentes capacidades" },
    { name: "Satisfacción del Usuario", description: "Experiencia general reportada por los ciudadanos" }
  ];

  const redCiudadanaValues = [
    {
      icon: Heart,
      title: "Compromiso Social",
      description: "Trabajamos por el bien común y el fortalecimiento de la democracia guatemalteca."
    },
    {
      icon: Shield,
      title: "Transparencia",
      description: "Operamos con total transparencia en nuestros procesos, metodologías y financiamiento."
    },
    {
      icon: CheckCircle,
      title: "Rigor Técnico",
      description: "Aplicamos metodologías rigurosas para garantizar la calidad y precisión de nuestra información."
    },
    {
      icon: Users,
      title: "Participación Ciudadana",
      description: "Fomentamos la participación activa de los ciudadanos en el monitoreo de la gestión pública."
    }
  ];

  const achievements = [
    { number: "120+", label: "Trámites Documentados", description: "Procesos gubernamentales analizados y verificados" },
    { number: "25+", label: "Instituciones Monitoreadas", description: "Entidades públicas bajo seguimiento continuo" },
    { number: "50+", label: "Colaboradores Activos", description: "Ciudadanos que contribuyen con verificación de datos" },
    { number: "95%", label: "Precisión de Datos", description: "Nivel de exactitud en la información proporcionada" }
  ];

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-blue-100 p-4 rounded-xl">
              <Heart className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Acerca de Red Ciudadana
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Somos una organización de sociedad civil comprometida con la transparencia, 
            el acceso a la información pública y el fortalecimiento de la democracia en Guatemala.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 md:p-12 mb-16 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Nuestra Misión</h2>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              Facilitar el acceso ciudadano a los servicios públicos mediante la recopilación, 
              verificación y organización de información sobre trámites gubernamentales, 
              promoviendo la transparencia y eficiencia en la gestión pública guatemalteca.
            </p>
          </div>
        </div>

        {/* Objectives */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Objetivos</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Trabajamos con propósitos claros para generar un impacto positivo en la sociedad guatemalteca
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {objectives.map((objective, index) => {
              const IconComponent = objective.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-xl flex-shrink-0">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{objective.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{objective.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Observatory Section */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold">Observatorio Ciudadano</h2>
              </div>
              <p className="text-xl text-purple-100 leading-relaxed">
                Nuestro sistema de análisis independiente que evalúa la eficiencia y accesibilidad 
                de los procesos gubernamentales desde la perspectiva ciudadana.
              </p>
            </div>
            
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {observatoryFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                        <p className="text-gray-700 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <span>Criterios de Evaluación</span>
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {evaluationCriteria.map((criterion, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                      <h5 className="font-medium text-gray-900 mb-1">{criterion.name}</h5>
                      <p className="text-xs text-gray-600">{criterion.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Red Ciudadana Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Valores</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Los principios que guían nuestro trabajo y compromiso con la sociedad guatemalteca
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {redCiudadanaValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-all">
                  <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestro Impacto</h2>
              <p className="text-lg text-gray-600">
                Resultados tangibles de nuestro compromiso con la transparencia y el servicio ciudadano
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{achievement.number}</div>
                  <div className="font-semibold text-gray-900 mb-1">{achievement.label}</div>
                  <div className="text-sm text-gray-600">{achievement.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How We Work */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Cómo Trabajamos</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Nuestra metodología garantiza información precisa y actualizada
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Recopilación</h3>
                <p className="text-gray-700 text-sm">
                  Recolectamos información directamente de fuentes oficiales y experiencias ciudadanas verificadas.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">2. Verificación</h3>
                <p className="text-gray-700 text-sm">
                  Nuestro equipo verifica cada dato con múltiples fuentes y actualiza la información regularmente.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">3. Publicación</h3>
                <p className="text-gray-700 text-sm">
                  Organizamos y presentamos la información de manera clara y accesible para todos los ciudadanos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact and Collaboration */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Únete a Nuestra Misión</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Red Ciudadana es un esfuerzo colectivo. Tu participación fortalece la democracia guatemalteca.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Cómo Puedes Colaborar</h3>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Reporta cambios en procesos gubernamentales</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Comparte tu experiencia con trámites</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Verifica información en tu comunidad</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Difunde información útil a otros ciudadanos</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Contáctanos</h3>
              <div className="space-y-3 text-blue-100">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5" />
                  <span>info@redciudadana.org.gt</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5" />
                  <span>+502 2440-0000</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5" />
                  <span>Zona 1, Ciudad de Guatemala</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5" />
                  <a href="https://redciudadana.org.gt" className="hover:text-white transition-colors flex items-center space-x-1">
                    <span>redciudadana.org.gt</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            © 2025 Red Ciudadana Guatemala. Organización de sociedad civil comprometida con la transparencia y la democracia.
          </p>
        </div>
      </div>
    </div>
  );
}