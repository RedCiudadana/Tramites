import React, { useState, useMemo } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Building2, 
  Clock, 
  User, 
  Users,
  FileText,
  Globe,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';
import { procedures, categories } from '../../data/procedures';
import { Procedure, Category } from '../../types';

export default function DatabaseView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('');
  const [sortField, setSortField] = useState<keyof Procedure>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Filtrar y ordenar datos
  const filteredAndSortedProcedures = useMemo(() => {
    let filtered = procedures.filter(procedure => {
      const matchesSearch = searchQuery === '' || 
        procedure.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        procedure.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        procedure.institution.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === '' || procedure.category === selectedCategory;
      const matchesType = selectedType === '' || procedure.type === selectedType;
      const matchesUserType = selectedUserType === '' || 
        procedure.userType === selectedUserType || 
        procedure.userType === 'ambos';
      
      return matchesSearch && matchesCategory && matchesType && matchesUserType;
    });

    // Ordenar
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, selectedType, selectedUserType, sortField, sortDirection]);

  const handleSort = (field: keyof Procedure) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleRowExpansion = (procedureId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(procedureId)) {
      newExpanded.delete(procedureId);
    } else {
      newExpanded.add(procedureId);
    }
    setExpandedRows(newExpanded);
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Nombre', 'Descripción', 'Institución', 'Categoría', 'Duración', 'Tipo', 'Usuario', 'Digital'];
    const csvData = filteredAndSortedProcedures.map(procedure => [
      procedure.id,
      `"${procedure.name}"`,
      `"${procedure.description}"`,
      procedure.institution,
      procedure.category,
      procedure.duration,
      procedure.type,
      procedure.userType,
      procedure.isDigital ? 'Sí' : 'No'
    ]);

    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'tramites_database.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Database className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Base de Datos de Trámites
              </h1>
              <p className="text-gray-600">
                Vista completa de todos los trámites, categorías e instituciones
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Trámites</p>
                <p className="text-3xl font-bold text-gray-900">{procedures.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categorías</p>
                <p className="text-3xl font-bold text-gray-900">{categories.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <Database className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Instituciones</p>
                <p className="text-3xl font-bold text-gray-900">
                  {[...new Set(procedures.map(p => p.institution))].length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <Building2 className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Trámites Digitales</p>
                <p className="text-3xl font-bold text-gray-900">
                  {procedures.filter(p => p.isDigital).length}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-xl">
                <Globe className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, descripción o institución..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-5 w-5" />
                <span>Filtros</span>
                {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              <button
                onClick={exportToCSV}
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Download className="h-5 w-5" />
                <span>Exportar CSV</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Todas las categorías</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Trámite
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Todos los tipos</option>
                    <option value="digital">Digital</option>
                    <option value="presencial">Presencial</option>
                    <option value="mixto">Mixto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Usuario
                  </label>
                  <select
                    value={selectedUserType}
                    onChange={(e) => setSelectedUserType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Todos los usuarios</option>
                    <option value="persona">Persona</option>
                    <option value="empresa">Empresa</option>
                    <option value="ambos">Ambos</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSelectedType('');
                    setSelectedUserType('');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {filteredAndSortedProcedures.length} de {procedures.length} trámites
          </p>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center space-x-1 font-medium text-gray-900 hover:text-purple-600"
                    >
                      <span>Nombre</span>
                      {sortField === 'name' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('institution')}
                      className="flex items-center space-x-1 font-medium text-gray-900 hover:text-purple-600"
                    >
                      <span>Institución</span>
                      {sortField === 'institution' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('category')}
                      className="flex items-center space-x-1 font-medium text-gray-900 hover:text-purple-600"
                    >
                      <span>Categoría</span>
                      {sortField === 'category' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('duration')}
                      className="flex items-center space-x-1 font-medium text-gray-900 hover:text-purple-600"
                    >
                      <span>Duración</span>
                      {sortField === 'duration' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('type')}
                      className="flex items-center space-x-1 font-medium text-gray-900 hover:text-purple-600"
                    >
                      <span>Tipo</span>
                      {sortField === 'type' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('userType')}
                      className="flex items-center space-x-1 font-medium text-gray-900 hover:text-purple-600"
                    >
                      <span>Usuario</span>
                      {sortField === 'userType' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAndSortedProcedures.map((procedure) => (
                  <React.Fragment key={procedure.id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{procedure.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {procedure.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-900">{procedure.institution}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-900 capitalize">
                          {getCategoryName(procedure.category)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-900">{procedure.duration}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(procedure.type)}`}>
                          <span className="mr-1">{getTypeIcon(procedure.type)}</span>
                          {procedure.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {procedure.userType === 'persona' ? (
                            <User className="h-4 w-4 text-gray-400" />
                          ) : procedure.userType === 'empresa' ? (
                            <Building2 className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Users className="h-4 w-4 text-gray-400" />
                          )}
                          <span className="text-gray-900 capitalize">{procedure.userType}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => toggleRowExpansion(procedure.id)}
                            className="text-purple-600 hover:text-purple-700 transition-colors"
                            title="Ver detalles"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <a
                            href={`/tramite/${procedure.id}`}
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                            title="Ver página completa"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Expanded Row Details */}
                    {expandedRows.has(procedure.id) && (
                      <tr className="bg-gray-50">
                        <td colSpan={7} className="px-6 py-4">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Descripción Completa</h4>
                              <p className="text-gray-700 text-sm">{procedure.fullDescription}</p>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Requisitos</h4>
                                <ul className="text-sm text-gray-700 space-y-1">
                                  {procedure.requirements.map((req, index) => (
                                    <li key={index} className="flex items-start space-x-2">
                                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                      <span>{req}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Pasos del Proceso</h4>
                                <ol className="text-sm text-gray-700 space-y-1">
                                  {procedure.steps.map((step, index) => (
                                    <li key={index} className="flex items-start space-x-2">
                                      <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                                        {index + 1}
                                      </span>
                                      <span>{step}</span>
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAndSortedProcedures.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Database className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No se encontraron trámites
              </h3>
              <p className="text-gray-600">
                Ajusta los filtros o términos de búsqueda para ver más resultados
              </p>
            </div>
          )}
        </div>

        {/* Categories Summary */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Resumen por Categorías</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => {
              const categoryProcedures = procedures.filter(p => p.category === category.id);
              const digitalCount = categoryProcedures.filter(p => p.isDigital).length;
              
              return (
                <div key={category.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Database className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{category.name}</h4>
                      <p className="text-sm text-gray-600">{categoryProcedures.length} trámites</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Digitales:</span>
                      <span className="font-medium text-green-600">{digitalCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Presenciales:</span>
                      <span className="font-medium text-blue-600">{categoryProcedures.length - digitalCount}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Institutions Summary */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Resumen por Instituciones</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...new Set(procedures.map(p => p.institution))].map(institution => {
              const institutionProcedures = procedures.filter(p => p.institution === institution);
              const digitalCount = institutionProcedures.filter(p => p.isDigital).length;
              
              return (
                <div key={institution} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Building2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{institution}</h4>
                      <p className="text-sm text-gray-600">{institutionProcedures.length} trámites</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Digitales:</span>
                      <span className="font-medium text-green-600">{digitalCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Presenciales:</span>
                      <span className="font-medium text-blue-600">{institutionProcedures.length - digitalCount}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}