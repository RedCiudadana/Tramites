import React, { useState, useMemo } from 'react';
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
  FlaskConical,
  Store,
  Briefcase,
  Plane,
  Users,
  Home,
  GraduationCap,
  Award
} from 'lucide-react';
import { useProcedures } from '../hooks/useProcedures';
import { useExperiences } from '../hooks/useExperiences';
import { useLanguage } from '../contexts/LanguageContext';
import InfoTooltip from '../components/common/InfoTooltip';
import loader from '../assets/loader.gif';

const iconMap: Record<string, React.ElementType> = {
  Sprout,
  Globe,
  Leaf,
  Pill,
  Dna,
  Microscope,
  Package,
  FlaskConical,
  Target,
  Store,
  Briefcase,
  Plane,
  Users,
  Home,
  GraduationCap,
  Award,
  Building2
};

const colorMap: Record<string, { icon: string; bg: string }> = {
  'from-blue-500 to-blue-700': { icon: 'text-blue-600', bg: 'bg-blue-50' },
  'from-blue-500 to-blue-700': { icon: 'text-blue-600', bg: 'bg-blue-50' },
  'from-emerald-500 to-emerald-700': { icon: 'text-emerald-600', bg: 'bg-emerald-50' },
  'from-blue-500 to-blue-700': { icon: 'text-blue-600', bg: 'bg-blue-50' },
  'from-indigo-500 to-indigo-700': { icon: 'text-indigo-600', bg: 'bg-indigo-50' },
  'from-cyan-500 to-cyan-700': { icon: 'text-cyan-600', bg: 'bg-cyan-50' },
  'from-orange-500 to-orange-700': { icon: 'text-orange-600', bg: 'bg-orange-50' },
  'from-rose-500 to-rose-700': { icon: 'text-rose-600', bg: 'bg-rose-50' },
  'from-amber-500 to-amber-700': { icon: 'text-amber-600', bg: 'bg-amber-50' }
};

export default function ExperiencesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>(null);

  const { procedures, loading: proceduresLoading } = useProcedures();
  const { experiences, loading: experiencesLoading } = useExperiences();
  const { t } = useLanguage();

  const loading = proceduresLoading || experiencesLoading;

  const selectedExperience = useMemo(() => {
    return experiences.find(exp => exp.id === selectedExperienceId) || null;
  }, [experiences, selectedExperienceId]);

  const filteredExperiences = useMemo(() => {
    if (!searchQuery) return experiences;
    const query = searchQuery.toLowerCase();
    return experiences.filter(exp =>
      exp.nombre.toLowerCase().includes(query) ||
      exp.descripcion.toLowerCase().includes(query) ||
      exp.categoria.toLowerCase().includes(query)
    );
  }, [experiences, searchQuery]);

  const getExperienceProcedures = (experienceId: string) => {
    const experience = experiences.find(exp => exp.id === experienceId);
    if (!experience) return [];
    return procedures.filter(proc => experience.ids_procedures.includes(proc.id.toString()));
  };

  const getColorClasses = (colorGradient: string) => {
    return colorMap[colorGradient] || { icon: 'text-blue-600', bg: 'bg-blue-50' };
  };

  const getTypeIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'digital': return '💻';
      case 'presencial': return '🏢';
      case 'mixto': return '🔄';
      default: return '📄';
    }
  };

  const getStatusColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'digital': return 'bg-blue-100 text-blue-800';
      case 'presencial': return 'bg-blue-100 text-blue-800';
      case 'mixto': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <img src={loader} alt="Cargando..." className="h-16 w-16 mx-auto mb-4" />
            <p className="text-gray-600">Cargando experiencias...</p>
          </div>
        </div>
      </div>
    );
  }

  if (selectedExperience) {
    const expProcedures = getExperienceProcedures(selectedExperience.id);
    const colors = getColorClasses(selectedExperience.color);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSelectedExperienceId(null)}
              className="mb-6 flex items-center gap-2 text-white hover:text-blue-100 font-semibold"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              {t('common.back')} a experiencias
            </button>

            <div className="flex items-center gap-4 mb-4">
              {React.createElement(iconMap[selectedExperience.icon] || Target, {
                className: 'w-16 h-16'
              })}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {selectedExperience.nombre}
                </h1>
                <p className="text-xl text-blue-100">
                  {selectedExperience.descripcion}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4" />
                  <span className="font-semibold">
                    {expProcedures.length} {t('categories.procedures')}
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
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-blue-600" />
              Trámites Requeridos
            </h3>

            <div className="space-y-4">
              {expProcedures.map((procedure, index) => (
                <div
                  key={procedure.id}
                  className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors border-l-4 border-blue-600"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
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
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(procedure.type)}`}>
                          {getTypeIcon(procedure.type)} {procedure.type}
                        </span>
                      </div>

                      <Link
                        to={`/tramite/${procedure.id}`}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
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
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Target className="w-16 h-16 mx-auto mb-4" />
            <div className="flex items-center justify-center gap-3 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                {t('experiences.title')}
              </h1>
              <div className="mt-2">
                <InfoTooltip
                  text="Las Experiencias Guiadas te muestran todos los trámites necesarios para alcanzar una meta específica, organizados paso a paso en el orden correcto."
                  position="bottom"
                />
              </div>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
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
              placeholder="Buscar experiencias... (ej: negocio, semillas, exportar)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiences.map((experience) => {
            const IconComponent = iconMap[experience.icon] || Target;
            const expProcedures = getExperienceProcedures(experience.id);
            const colors = getColorClasses(experience.color);

            return (
              <button
                key={experience.id}
                onClick={() => setSelectedExperienceId(experience.id)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden text-left group border-2 border-transparent hover:border-blue-500"
              >
                <div className={`${colors.bg} p-6`}>
                  <IconComponent className={`w-12 h-12 ${colors.icon} mb-4`} />
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {experience.nombre}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {experience.descripcion}
                  </p>
                  <span className={`inline-block ${colors.icon} text-xs px-3 py-1 rounded-full font-semibold bg-white`}>
                    {experience.categoria}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {expProcedures.length} {t('categories.procedures')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{experience.duracion_estimada}</span>
                  </div>

                  <div className="flex items-center justify-end gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all pt-2">
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
      </div>
    </div>
  );
}
