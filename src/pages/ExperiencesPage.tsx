import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  ChevronRight,
  Search,
  CheckCircle,
  Clock,
  FileText,
  AlertCircle,
  Building2,
  Sprout,
  Globe,
  Leaf,
  Pill,
  Dna,
  Microscope,
  Package,
  FlaskConical
} from 'lucide-react';
import { useProcedures } from '../hooks/useProcedures';
import { useLanguage } from '../contexts/LanguageContext';
import experiencesData from '../data/experiences.json';

interface Experience {
  id: string;
  nombre: string;
  descripcion: string;
  icon: string;
  color: string;
  categoria: string;
  duracion_estimada: string;
  ids_procedures: string[];
  pasos_adicionales: string[];
}

const iconMap: Record<string, React.ElementType> = {
  Sprout,
  Globe,
  Leaf,
  Pill,
  Dna,
  Microscope,
  Package,
  FlaskConical,
  Target
};

export default function ExperiencesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const { procedures } = useProcedures();
  const { t } = useLanguage();
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    setExperiences(experiencesData as Experience[]);
  }, []);

  const filteredExperiences = experiences.filter(exp =>
    exp.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exp.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exp.categoria.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getExperienceProcedures = (experience: Experience) => {
    return procedures.filter(proc => experience.ids_procedures.includes(proc.id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Target className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('experiences.title')}
            </h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              {t('experiences.description')}
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
              placeholder={t('header.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
            />
          </div>
        </div>

        {!selectedExperience ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {experiences.length} Experiencias Disponibles
              </h2>
              <p className="text-gray-600">
                Rutas personalizadas para alcanzar objetivos específicos
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExperiences.map((experience) => {
                const IconComponent = iconMap[experience.icon] || Target;
                const expProcedures = getExperienceProcedures(experience);

                return (
                  <button
                    key={experience.id}
                    onClick={() => setSelectedExperience(experience)}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden text-left group border-2 border-transparent hover:border-red-500"
                  >
                    <div className={`bg-gradient-to-br ${experience.color} p-6 text-white`}>
                      <IconComponent className="w-12 h-12 mb-4" />
                      <h3 className="text-xl font-bold mb-2">
                        {experience.nombre}
                      </h3>
                      <p className="text-white/90 text-sm mb-3">
                        {experience.descripcion}
                      </p>
                      <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                        {experience.categoria}
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          {expProcedures.length} {t('categories.procedures')}
                        </span>
                        <span className="text-xs px-3 py-1 rounded-full font-semibold bg-blue-100 text-blue-800">
                          {experience.duracion_estimada}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{experience.pasos_adicionales.length} pasos adicionales</span>
                      </div>

                      <div className="flex items-center justify-end gap-2 text-red-600 font-semibold text-sm group-hover:gap-3 transition-all pt-2">
                        {t('procedure.viewDetails')}
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {filteredExperiences.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No se encontraron experiencias
                </h3>
                <p className="text-gray-600">
                  Intenta con otros términos de búsqueda
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="max-w-5xl mx-auto">
            <button
              onClick={() => setSelectedExperience(null)}
              className="mb-6 flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              {t('common.back')} a experiencias
            </button>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className={`bg-gradient-to-br ${selectedExperience.color} p-8 text-white`}>
                {React.createElement(iconMap[selectedExperience.icon] || Target, {
                  className: 'w-16 h-16 mb-4'
                })}
                <h2 className="text-3xl font-bold mb-3">
                  {selectedExperience.nombre}
                </h2>
                <p className="text-lg text-white/90 mb-6">
                  {selectedExperience.descripcion}
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4" />
                      <span className="font-semibold">
                        {getExperienceProcedures(selectedExperience).length} {t('categories.procedures')}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4" />
                      <span className="font-semibold">
                        {selectedExperience.duracion_estimada}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <span className="font-semibold text-sm">
                      {selectedExperience.categoria}
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
                            {t('procedure.viewDetails')}
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedExperience.pasos_adicionales.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <FileText className="w-6 h-6 text-blue-600" />
                      Pasos Adicionales Recomendados
                    </h3>

                    <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                      <ul className="space-y-3">
                        {selectedExperience.pasos_adicionales.map((paso, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-700">
                            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <span>{paso}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6">
                  <div className="flex gap-3">
                    <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
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
