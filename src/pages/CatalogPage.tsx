import React, { useState, useMemo } from 'react';
import { Search, Filter, Building2, Clock, User, Users, ChevronRight, ArrowRight, Globe, Phone, Mail, MapPin, Briefcase, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useProcedures } from '../hooks/useProcedures';
import { useInstitutions } from '../hooks/useInstitutions';
import { useExperiences } from '../hooks/useExperiences';
import { Procedure } from '../lib/data';
import loader from '../assets/loader.gif';
import CatalogHero from '../components/catalog/CatalogHero';

const CatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'procedures' | 'institutions' | 'experiences'>('procedures');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { procedures, loading: proceduresLoading } = useProcedures();
  const { institutions, loading: institutionsLoading } = useInstitutions();
  const { experiences, loading: experiencesLoading } = useExperiences();

  const loading = proceduresLoading || institutionsLoading || experiencesLoading;

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

  const filteredExperiences = useMemo(() => {
    if (!searchQuery) return experiences;

    const query = searchQuery.toLowerCase();
    return experiences.filter(e =>
      e.nombre.toLowerCase().includes(query) ||
      e.descripcion.toLowerCase().includes(query) ||
      e.categoria.toLowerCase().includes(query)
    );
  }, [experiences, searchQuery]);

  const categories = useMemo(() => {
    const unique = [...new Set(procedures.map(p => p.category).filter(Boolean))];
    return unique.sort();
  }, [procedures]);

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
            <p className="text-gray-600">Cargando catálogo...</p>
          </div>
        </div>
      </div>
    );
  }

  const activeData = activeTab === 'procedures' ? filteredProcedures :
                     activeTab === 'institutions' ? filteredInstitutions :
                     filteredExperiences;

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-800 transition-colors">
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">Catálogo Completo</span>
        </nav>

        <CatalogHero totalProcedures={procedures.length} />

        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('procedures')}
                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium transition-colors ${
                  activeTab === 'procedures'
                    ? 'border-blue-800 text-blue-800'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Trámites ({procedures.length})</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('institutions')}
                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium transition-colors ${
                  activeTab === 'institutions'
                    ? 'border-blue-800 text-blue-800'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Instituciones ({institutions.length})</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('experiences')}
                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium transition-colors ${
                  activeTab === 'experiences'
                    ? 'border-blue-800 text-blue-800'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Experiencias ({experiences.length})</span>
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
                  placeholder={`Buscar ${activeTab === 'procedures' ? 'trámites' : activeTab === 'institutions' ? 'instituciones' : 'experiencias'}...`}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

        <div className="grid gap-6">
          {activeTab === 'procedures' && filteredProcedures.map((procedure) => (
            <div
              key={procedure.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 group"
              onClick={() => navigate(`/tramite/${procedure.id}`)}
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-800 transition-colors">
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
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <button className="w-full lg:w-auto bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors font-medium flex items-center space-x-2">
                      <span>Ver detalles</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {activeTab === 'institutions' && filteredInstitutions.map((institution) => (
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
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
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
                        className="text-blue-600 hover:text-blue-800 hover:underline"
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

          {activeTab === 'experiences' && filteredExperiences.map((experience) => (
            <div
              key={experience.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 group"
              onClick={() => navigate(`/experiencias#${experience.id}`)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-800 transition-colors">
                        {experience.nombre}
                      </h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {experience.categoria}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{experience.descripcion}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{experience.duracion_estimada}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{experience.ids_procedures.length} trámites</span>
                      </div>
                    </div>
                  </div>
                  <button className="ml-4 bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors font-medium flex items-center space-x-2">
                    <span>Ver ruta</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeData.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <Search className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-gray-600 mb-6">
              Intenta con otros términos de búsqueda o ajusta los filtros
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('');
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
