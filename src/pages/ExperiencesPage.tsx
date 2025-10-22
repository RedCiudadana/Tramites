import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Award,
  Star,
  Filter,
  Phone,
  Mail,
  MapPin,
  User
} from 'lucide-react';
import { useProcedures } from '../hooks/useProcedures';
import { useInstitutions } from '../hooks/useInstitutions';
import { useExperiences } from '../hooks/useExperiences';
import { useLanguage } from '../contexts/LanguageContext';
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
  'from-green-500 to-green-700': { icon: 'text-green-600', bg: 'bg-green-50' },
  'from-blue-500 to-blue-700': { icon: 'text-blue-600', bg: 'bg-blue-50' },
  'from-emerald-500 to-emerald-700': { icon: 'text-emerald-600', bg: 'bg-emerald-50' },
  'from-purple-500 to-purple-700': { icon: 'text-purple-600', bg: 'bg-purple-50' },
  'from-indigo-500 to-indigo-700': { icon: 'text-indigo-600', bg: 'bg-indigo-50' },
  'from-cyan-500 to-cyan-700': { icon: 'text-cyan-600', bg: 'bg-cyan-50' },
  'from-orange-500 to-orange-700': { icon: 'text-orange-600', bg: 'bg-orange-50' },
  'from-rose-500 to-rose-700': { icon: 'text-rose-600', bg: 'bg-rose-50' },
  'from-amber-500 to-amber-700': { icon: 'text-amber-600', bg: 'bg-amber-50' }
};

export default function ExperiencesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'experiences' | 'procedures' | 'institutions'>('experiences');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { procedures, loading: proceduresLoading } = useProcedures();
  const { institutions, loading: institutionsLoading } = useInstitutions();
  const { experiences, loading: experiencesLoading } = useExperiences();
  const { t } = useLanguage();

  const loading = proceduresLoading || institutionsLoading || experiencesLoading;

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

  const filteredProcedures = useMemo(() => {
    let filtered = procedures;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.institutions?.name.toLowerCase().includes(query)
      );
    }
    if (categoryFilter) {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }
    return filtered;
  }, [procedures, searchQuery, categoryFilter]);

  const filteredInstitutions = useMemo(() => {
    if (!searchQuery) return institutions;
    const query = searchQuery.toLowerCase();
    return institutions.filter(i =>
      i.name.toLowerCase().includes(query) ||
      i.full_name?.toLowerCase().includes(query) ||
      i.description?.toLowerCase().includes(query)
    );
  }, [institutions, searchQuery]);

  const categories = useMemo(() => {
    const unique = [...new Set(procedures.map(p => p.category).filter(Boolean))];
    return unique.sort();
  }, [procedures]);

  const getExperienceProcedures = (experienceId: string) => {
    const experience = experiences.find(exp => exp.id === experienceId);
    if (!experience) return [];
    return procedures.filter(proc => experience.ids_procedures.includes(proc.id.toString()));
  };

  const getColorClasses = (colorGradient: string) => {
    return colorMap[colorGradient] || { icon: 'text-red-600', bg: 'bg-red-50' };
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
      case 'digital': return 'bg-green-100 text-green-800';
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
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSelectedExperienceId(null)}
              className="mb-6 flex items-center gap-2 text-white hover:text-red-100 font-semibold"
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
                <p className="text-xl text-red-100">
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
              <CheckCircle className="w-6 h-6 text-green-600" />
              Trámites Requeridos
            </h3>

            <div className="space-y-4">
              {expProcedures.map((procedure, index) => (
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
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(procedure.type)}`}>
                          {getTypeIcon(procedure.type)} {procedure.type}
                        </span>
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
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => {
                  setActiveTab('experiences');
                  setSearchQuery('');
                  setCategoryFilter('');
                }}
                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium transition-colors ${
                  activeTab === 'experiences'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Experiencias ({experiences.length})</span>
                </div>
              </button>
              <button
                onClick={() => {
                  setActiveTab('procedures');
                  setSearchQuery('');
                  setCategoryFilter('');
                }}
                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium transition-colors ${
                  activeTab === 'procedures'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Trámites ({procedures.length})</span>
                </div>
              </button>
              <button
                onClick={() => {
                  setActiveTab('institutions');
                  setSearchQuery('');
                  setCategoryFilter('');
                }}
                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium transition-colors ${
                  activeTab === 'institutions'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Instituciones ({institutions.length})</span>
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Buscar ${activeTab === 'experiences' ? 'experiencias' : activeTab === 'procedures' ? 'trámites' : 'instituciones'}...`}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {activeTab === 'procedures' && (
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="h-5 w-5" />
                  <span>Filtros</span>
                </button>
              )}
            </div>

            {showFilters && activeTab === 'procedures' && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría
                    </label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Todas las categorías</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setCategoryFilter('');
                        setSearchQuery('');
                      }}
                      className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Limpiar filtros
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {activeTab === 'experiences' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map((experience) => {
              const IconComponent = iconMap[experience.icon] || Target;
              const expProcedures = getExperienceProcedures(experience.id);
              const colors = getColorClasses(experience.color);

              return (
                <button
                  key={experience.id}
                  onClick={() => setSelectedExperienceId(experience.id)}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden text-left group border-2 border-transparent hover:border-red-500"
                >
                  <div className={`${colors.bg} p-6`}>
                    <IconComponent className={`w-12 h-12 ${colors.icon} mb-4`} />
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
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

                    <div className="flex items-center justify-end gap-2 text-red-600 font-semibold text-sm group-hover:gap-3 transition-all pt-2">
                      {t('procedure.viewDetails')}
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {activeTab === 'procedures' && (
          <div className="grid gap-6">
            {filteredProcedures.map((procedure) => (
              <div
                key={procedure.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 group"
                onClick={() => navigate(`/tramite/${procedure.id}`)}
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                          {procedure.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(procedure.type)}`}>
                          {getTypeIcon(procedure.type)} {procedure.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{procedure.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Building2 className="h-4 w-4" />
                          <span>{procedure.institutions?.name || 'N/A'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{procedure.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span className="capitalize">{procedure.user_type}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'institutions' && (
          <div className="grid gap-6">
            {filteredInstitutions.map((institution) => (
              <div
                key={institution.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {institution.name}
                      </h3>
                      {institution.full_name && (
                        <p className="text-sm text-gray-600 mb-2">{institution.full_name}</p>
                      )}
                      {institution.description && (
                        <p className="text-gray-600 mb-4">{institution.description}</p>
                      )}
                    </div>
                    {institution.is_digital_enabled && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Digital
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {institution.phone && (
                      <div className="flex items-start space-x-2">
                        <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                        <span className="text-gray-600">{institution.phone}</span>
                      </div>
                    )}
                    {institution.email && (
                      <div className="flex items-start space-x-2">
                        <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                        <span className="text-gray-600">{institution.email}</span>
                      </div>
                    )}
                    {institution.address && (
                      <div className="flex items-start space-x-2 md:col-span-2">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                        <span className="text-gray-600">{institution.address}</span>
                      </div>
                    )}
                    {institution.website && (
                      <div className="flex items-start space-x-2 md:col-span-2">
                        <Globe className="h-4 w-4 text-gray-400 mt-0.5" />
                        <a
                          href={institution.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 hover:text-red-800 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {institution.website}
                        </a>
                      </div>
                    )}
                    {institution.working_hours && (
                      <div className="flex items-start space-x-2 md:col-span-2">
                        <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                        <span className="text-gray-600">{institution.working_hours}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {((activeTab === 'experiences' && filteredExperiences.length === 0) ||
          (activeTab === 'procedures' && filteredProcedures.length === 0) ||
          (activeTab === 'institutions' && filteredInstitutions.length === 0)) && (
          <div className="text-center py-12 bg-white rounded-lg">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-gray-600 mb-6">
              Intenta con otros términos de búsqueda
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('');
              }}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
