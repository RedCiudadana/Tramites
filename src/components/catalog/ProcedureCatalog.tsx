import React, { useState, useMemo } from 'react';
import { Search, Filter, Building2, Clock, User, Users, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { procedures } from '../../data/procedures';
import { Procedure } from '../../types';

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

  const filteredProcedures = useMemo(() => {
    return procedures.filter(procedure => {
      const matchesSearch = localSearchQuery === '' || 
        procedure.name.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
        procedure.description.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
        procedure.institution.toLowerCase().includes(localSearchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === '' || procedure.category === selectedCategory;
      const matchesType = typeFilter === '' || procedure.userType === typeFilter || procedure.userType === 'ambos';
      const matchesModality = modalityFilter === '' || procedure.type === modalityFilter;
      
      return matchesSearch && matchesCategory && matchesType && matchesModality;
    });
  }, [localSearchQuery, selectedCategory, typeFilter, modalityFilter]);

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

  return (
    <div className="min-h-screen bg-gray-50">
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
        <div className="grid gap-6">
          {filteredProcedures.map((procedure) => (
            <div
              key={procedure.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
              onClick={() => handleProcedureClick(procedure)}
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {procedure.name}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(procedure.type)}`}>
                            {getTypeIcon(procedure.type)} {procedure.type}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">
                          {procedure.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Building2 className="h-4 w-4" />
                            <span>{procedure.institution}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{procedure.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {procedure.userType === 'persona' ? (
                              <User className="h-4 w-4" />
                            ) : procedure.userType === 'empresa' ? (
                              <Building2 className="h-4 w-4" />
                            ) : (
                              <Users className="h-4 w-4" />
                            )}
                            <span className="capitalize">{procedure.userType}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <button className="w-full lg:w-auto bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition-colors font-medium">
                      Ver información
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProcedures.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron trámites
            </h3>
            <p className="text-gray-600">
              Intenta ajustar los filtros o cambia los términos de búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}