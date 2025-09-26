import React, { useState, useMemo } from 'react';
import { Search, Filter, Building2, Clock, User, Users, ChevronRight, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useProcedures, useProcedureSearch } from '../../hooks/useProcedures';
import { Procedure } from '../../lib/supabase';
import HeroSlider from '../common/HeroSlider';

interface ProcedureCatalogProps {
  searchQuery?: string;
  selectedCategory?: string;
}

export default function ProcedureCatalog({ 
  searchQuery = '', 
  selectedCategory = ''
}: ProcedureCatalogProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [userTypeFilter, setUserTypeFilter] = useState<string>('');
  const [modalityFilter, setModalityFilter] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  // Use hooks to fetch data from Supabase
  const { procedures: allProcedures, loading: allLoading } = useProcedures();
  const { procedures: searchResults, loading: searchLoading } = useProcedureSearch(
    localSearchQuery || searchQuery, 
    selectedCategory
  );

  const loading = allLoading || searchLoading;
  const procedures = (localSearchQuery || searchQuery || selectedCategory) ? searchResults : allProcedures;
  // Hero slider data
  const heroSlides = [
    {
      id: '1',
      title: 'Catálogo Completo',
      subtitle: 'de Trámites Gubernamentales',
      description: 'Encuentra toda la información verificada sobre trámites en Guatemala. Más de 120 procesos organizados por categorías con requisitos, pasos y tiempos actualizados.',
      backgroundImage: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1600',
      backgroundColor: '#1e40af',
      textColor: 'text-white',
      buttonText: 'Explorar Trámites',
      buttonAction: () => {
        document.getElementById('tramites-section')?.scrollIntoView({ behavior: 'smooth' });
      },
      stats: [
        { label: 'Trámites', value: procedures.length.toString() },
        { label: 'Instituciones', value: '25+' },
        { label: 'Categorías', value: '6' },
        { label: 'Actualizaciones', value: 'Diarias' }
      ]
    },
    {
      id: '2',
      title: 'Información Verificada',
      subtitle: 'por Red Ciudadana',
      description: 'Nuestro equipo de investigación ciudadana verifica constantemente la información con fuentes oficiales para garantizar datos precisos y actualizados.',
      backgroundImage: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600',
      backgroundColor: '#059669',
      textColor: 'text-white',
      buttonText: 'Conocer Metodología',
      buttonAction: () => navigate('/ayuda'),
      stats: [
        { label: 'Verificaciones', value: 'Semanales' },
        { label: 'Fuentes', value: 'Oficiales' },
        { label: 'Precisión', value: '95%+' },
        { label: 'Colaboradores', value: '50+' }
      ]
    },
    {
      id: '3',
      title: 'Trámites Digitales',
      subtitle: 'y Presenciales',
      description: 'Identifica fácilmente qué trámites puedes hacer completamente en línea y cuáles requieren visitas presenciales. Ahorra tiempo y planifica mejor.',
      backgroundImage: 'https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=1600',
      backgroundColor: '#7c3aed',
      textColor: 'text-white',
      buttonText: 'Ver Trámites Digitales',
      buttonAction: () => {
        setModalityFilter('digital');
        document.getElementById('tramites-section')?.scrollIntoView({ behavior: 'smooth' });
      },
      stats: [
        { label: 'Digitales', value: '40%' },
        { label: 'Mixtos', value: '35%' },
        { label: 'Presenciales', value: '25%' },
        { label: 'Crecimiento', value: '+15%' }
      ]
    }
  ];

  const filteredProcedures = useMemo(() => {
    return procedures.filter(procedure => {
      const institutionName = procedure.institutions?.name || '';
      
      const matchesType = userTypeFilter === '' || procedure.user_type === userTypeFilter || procedure.user_type === 'ambos';
      const matchesModality = modalityFilter === '' || procedure.type === modalityFilter;
      
      return matchesType && matchesModality;
    });
  }, [procedures, userTypeFilter, modalityFilter]);

  const handleProcedureClick = (procedure: Procedure) => {
    navigate(`/tramite/${procedure.id}`);
  };

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

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando trámites...</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-50">
      {/* Hero Slider */}
      <HeroSlider 
        slides={heroSlides}
        autoPlay={true}
        autoPlayInterval={6000}
        height="h-[500px] md:h-[600px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-800 transition-colors">
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">
            {selectedCategory 
              ? `Categoría: ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`
              : 'Catálogo de Trámites'
            }
          </span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Catálogo de Trámites
          </h1>
          <p className="text-gray-600">
            {selectedCategory 
              ? `Trámites de ${selectedCategory} • ${filteredProcedures.length} resultados`
              : `${filteredProcedures.length} trámites disponibles`
            }
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                placeholder="Buscar trámites por nombre, descripción o institución..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filtros</span>
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de usuario
                  </label>
                  <select
                    value={userTypeFilter}
                    onChange={(e) => setUserTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Todos</option>
                    <option value="persona">Persona</option>
                    <option value="empresa">Empresa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Modalidad
                  </label>
                  <select
                    value={modalityFilter}
                    onChange={(e) => setModalityFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Todas</option>
                    <option value="digital">Digital</option>
                    <option value="presencial">Presencial</option>
                    <option value="mixto">Mixto</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setUserTypeFilter('');
                      setModalityFilter('');
                      setLocalSearchQuery('');
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

        {/* Results */}
        <div id="tramites-section" className="grid gap-6">
          {filteredProcedures.map((procedure) => (
            <div
              key={procedure.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 group"
              onClick={() => handleProcedureClick(procedure)}
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between h-full">
                  <div className="flex-1">
                    <div className="mb-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-800 transition-colors">
                          {procedure.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(procedure.type)}`}>
                          {getTypeIcon(procedure.type)} {procedure.type}
                        </span>
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium capitalize">
                          {procedure.category}
                        </span>
                      </div>

                      {procedure.subcategory && (
                        <p className="text-sm text-blue-600 font-medium mb-2">
                          {procedure.subcategory}
                        </p>
                      )}

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {procedure.description}
                      </p>

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
                          {procedure.user_type === 'persona' ? (
                            <User className="h-4 w-4" />
                          ) : procedure.user_type === 'empresa' ? (
                            <Building2 className="h-4 w-4" />
                          ) : (
                            <Users className="h-4 w-4" />
                          )}
                          <span className="capitalize">{procedure.user_type}</span>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    {procedure.fecha_actualizado && (
                      <div className="text-xs text-gray-400 mt-2">
                        Actualizado: {new Date(procedure.fecha_actualizado).toLocaleDateString('es-GT', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 lg:mt-0 lg:ml-6 flex items-end">
                    <button className="w-full lg:w-auto bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors font-medium flex items-center space-x-2 group-hover:bg-blue-900">
                      <span>Ver información</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProcedures.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-6">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron trámites
            </h3>
            <p className="text-gray-600">
              Intenta ajustar los filtros o cambia los términos de búsqueda
            </p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setLocalSearchQuery('');
                  setUserTypeFilter('');
                  setModalityFilter('');
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}