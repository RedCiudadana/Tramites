import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  ChevronRight,
  Search,
  Briefcase,
  Store,
  Utensils,
  Home,
  Car,
  GraduationCap,
  Building2,
  Heart,
  Plane,
  CheckCircle,
  Clock,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useProcedures } from '../hooks/useProcedures';

interface Experience {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  procedureIds: string[];
  estimatedTime: string;
  difficulty: 'Fácil' | 'Moderado' | 'Complejo';
}

const experiences: Experience[] = [
  {
    id: 'panadero',
    title: 'Quiero ser Panadero',
    description: 'Todos los trámites necesarios para abrir tu panadería en Guatemala',
    icon: Utensils,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    procedureIds: [
      '650e8400-e29b-41d4-a716-446655440002',
      '650e8400-e29b-41d4-a716-446655440004'
    ],
    estimatedTime: '45-60 días',
    difficulty: 'Moderado'
  },
  {
    id: 'negocio',
    title: 'Quiero Abrir un Negocio',
    description: 'Pasos para formalizar tu empresa y empezar a operar legalmente',
    icon: Store,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    procedureIds: [
      '650e8400-e29b-41d4-a716-446655440002'
    ],
    estimatedTime: '30-45 días',
    difficulty: 'Moderado'
  },
  {
    id: 'construir',
    title: 'Quiero Construir mi Casa',
    description: 'Permisos y licencias necesarias para construir tu vivienda',
    icon: Home,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    procedureIds: [
      '650e8400-e29b-41d4-a716-446655440003'
    ],
    estimatedTime: '60-90 días',
    difficulty: 'Complejo'
  },
  {
    id: 'exportar',
    title: 'Quiero Exportar Productos',
    description: 'Requisitos para exportar tus productos al extranjero',
    icon: Plane,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    procedureIds: [
      '650e8400-e29b-41d4-a716-446655440004'
    ],
    estimatedTime: '20-30 días',
    difficulty: 'Complejo'
  },
  {
    id: 'trabajador',
    title: 'Quiero Contratar Empleados',
    description: 'Trámites laborales para contratar personal de manera formal',
    icon: Briefcase,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    procedureIds: [
      '650e8400-e29b-41d4-a716-446655440002'
    ],
    estimatedTime: '15-20 días',
    difficulty: 'Fácil'
  },
  {
    id: 'estudiar',
    title: 'Quiero Estudiar en la Universidad',
    description: 'Proceso completo para inscribirte en la educación superior',
    icon: GraduationCap,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    procedureIds: [
      '650e8400-e29b-41d4-a716-446655440001'
    ],
    estimatedTime: '30-45 días',
    difficulty: 'Fácil'
  }
];

export default function ExperiencesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const { procedures } = useProcedures();

  const filteredExperiences = experiences.filter(exp =>
    exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exp.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getExperienceProcedures = (experience: Experience) => {
    return procedures.filter(proc => experience.procedureIds.includes(proc.id));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil':
        return 'bg-green-100 text-green-800';
      case 'Moderado':
        return 'bg-yellow-100 text-yellow-800';
      case 'Complejo':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Target className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Experiencias Guiadas
            </h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Descubre todos los trámites necesarios para alcanzar tus metas específicas
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar experiencias... (ej: negocio, casa, exportar)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
            />
          </div>
        </div>

        {!selectedExperience ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map((experience) => {
              const Icon = experience.icon;
              const expProcedures = getExperienceProcedures(experience);

              return (
                <button
                  key={experience.id}
                  onClick={() => setSelectedExperience(experience)}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden text-left group border-2 border-transparent hover:border-red-500"
                >
                  <div className={`${experience.bgColor} p-6`}>
                    <Icon className={`w-12 h-12 ${experience.color} mb-4`} />
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                      {experience.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {experience.description}
                    </p>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {expProcedures.length} trámite{expProcedures.length !== 1 ? 's' : ''}
                      </span>
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getDifficultyColor(experience.difficulty)}`}>
                        {experience.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{experience.estimatedTime}</span>
                    </div>

                    <div className="flex items-center justify-end gap-2 text-red-600 font-semibold text-sm group-hover:gap-3 transition-all pt-2">
                      Ver detalles
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <button
              onClick={() => setSelectedExperience(null)}
              className="mb-6 flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              Volver a experiencias
            </button>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className={`${selectedExperience.bgColor} p-8`}>
                {React.createElement(selectedExperience.icon, {
                  className: `w-16 h-16 ${selectedExperience.color} mb-4`
                })}
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  {selectedExperience.title}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {selectedExperience.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-gray-600" />
                      <span className="font-semibold text-gray-900">
                        {getExperienceProcedures(selectedExperience).length} trámite{getExperienceProcedures(selectedExperience).length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <span className="font-semibold text-gray-900">
                        {selectedExperience.estimatedTime}
                      </span>
                    </div>
                  </div>

                  <div className={`rounded-lg px-4 py-2 shadow-sm ${getDifficultyColor(selectedExperience.difficulty)}`}>
                    <span className="font-semibold text-sm">
                      {selectedExperience.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  Trámites Requeridos
                </h3>

                <div className="space-y-4">
                  {getExperienceProcedures(selectedExperience).map((procedure, index) => (
                    <div
                      key={procedure.id}
                      className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors border-l-4 border-red-600"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                          {index + 1}
                        </div>

                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">
                            {procedure.name}
                          </h4>
                          <p className="text-gray-600 text-sm mb-4">
                            {procedure.description}
                          </p>

                          <div className="flex flex-wrap gap-4 mb-4">
                            {procedure.institutions && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Building2 className="w-4 h-4" />
                                <span>{procedure.institutions.name}</span>
                              </div>
                            )}

                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{procedure.duration}</span>
                            </div>

                            {procedure.is_digital ? (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                💻 Digital
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                🏢 Presencial
                              </span>
                            )}
                          </div>

                          <Link
                            to={`/tramite/${procedure.id}`}
                            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold text-sm"
                          >
                            Ver detalles completos
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6">
                  <div className="flex gap-3">
                    <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">
                        Información Importante
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Los tiempos pueden variar según la institución y completitud de documentos</li>
                        <li>• Algunos trámites pueden realizarse en paralelo para agilizar el proceso</li>
                        <li>• Verifica los requisitos específicos en cada trámite antes de iniciar</li>
                        <li>• Mantén copias digitales de todos tus documentos</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
