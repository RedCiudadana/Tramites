import React, { useState, useMemo } from 'react';
import { Search, Filter, Building2, Clock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProcedures } from '../hooks/useProcedures';
import loader from '../assets/loader.gif';
import CatalogHero from '../components/catalog/CatalogHero';
import Breadcrumb from '../components/common/Breadcrumb';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const { procedures, loading } = useProcedures();

  const filteredProcedures = useMemo(() => {
    setIsFiltering(true);
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

    setTimeout(() => setIsFiltering(false), 300);
    return filtered;
  }, [procedures, searchQuery, categoryFilter]);

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

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Catálogo de Trámites' }]} />

        <CatalogHero totalProcedures={procedures.length} />

        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar trámites por nombre, descripción o institución..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-5 w-5" />
                <span>Filtros</span>
              </button>
            </div>

            {showFilters && (
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

        {/* Results Header with Loading Indicator */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Mostrando <span className="font-semibold text-gray-900">{filteredProcedures.length}</span> de <span className="font-semibold text-gray-900">{procedures.length}</span> trámites
          </p>
          {isFiltering && <LoadingSpinner size="sm" inline />}
        </div>

        {/* Procedures List */}
        {isFiltering ? (
          <LoadingSpinner size="lg" text="Filtrando trámites..." />
        ) : (
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
        </div>
        )}

        {/* No Results */}
        {!isFiltering && filteredProcedures.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <Search className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron trámites
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
