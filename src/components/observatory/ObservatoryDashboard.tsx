import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Filter,
  Download,
  Eye,
  Target,
  Zap,
  Shield,
  Star,
  Award,
  Building2,
  FileText
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { useObservatory, useObservatoryStats } from '../../hooks/useObservatory';

export default function ObservatoryDashboard() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMaturity, setSelectedMaturity] = useState('');
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analysis'>('dashboard');

  // Use JSON data
  const { observatoryData, loading, error } = useObservatory();
  const { stats } = useObservatoryStats();

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando datos del observatorio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error al cargar datos</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const getMaturityColor = (level: number) => {
    if (level >= 4.5) return 'bg-green-500 text-white';
    if (level >= 3.5) return 'bg-blue-500 text-white';
    if (level >= 2.5) return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  const getMaturityLabel = (level: number) => {
    if (level >= 4.5) return 'Excelente';
    if (level >= 3.5) return 'Bueno';
    if (level >= 2.5) return 'Regular';
    return 'Necesita Mejora';
  };

  const filteredData = observatoryData.filter(item => {
    const matchesCategory = !selectedCategory || item.procedure?.category === selectedCategory;
    const matchesMaturity = !selectedMaturity || 
      (selectedMaturity === 'excellent' && item.maturity_level >= 4.5) ||
      (selectedMaturity === 'good' && item.maturity_level >= 3.5 && item.maturity_level < 4.5) ||
      (selectedMaturity === 'regular' && item.maturity_level >= 2.5 && item.maturity_level < 3.5) ||
      (selectedMaturity === 'poor' && item.maturity_level < 2.5);
    return matchesCategory && matchesMaturity;
  });

  // Use stats from the hook
  const overallStats = stats;

  // Chart data
  const maturityDistribution = [
    { name: 'Excelente (4.5-5.0)', value: observatoryData.filter(item => item.maturity_level >= 4.5).length, color: '#10B981' },
    { name: 'Bueno (3.5-4.4)', value: observatoryData.filter(item => item.maturity_level >= 3.5 && item.maturity_level < 4.5).length, color: '#3B82F6' },
    { name: 'Regular (2.5-3.4)', value: observatoryData.filter(item => item.maturity_level >= 2.5 && item.maturity_level < 3.5).length, color: '#F59E0B' },
    { name: 'Necesita Mejora (0-2.4)', value: observatoryData.filter(item => item.maturity_level < 2.5).length, color: '#EF4444' }
  ];

  const categoryData = observatoryData.reduce((acc, item) => {
    const category = item.procedure?.category || 'Sin categoría';
    const existing = acc.find(cat => cat.category === category);
    if (existing) {
      existing.count += 1;
      existing.avgMaturity = (existing.avgMaturity + item.maturity_level) / 2;
    } else {
      acc.push({
        category: category.charAt(0).toUpperCase() + category.slice(1),
        count: 1,
        avgMaturity: item.maturity_level
      });
    }
    return acc;
  }, [] as any[]);

  const digitalVsPresencial = [
    { name: 'Digital', value: observatoryData.filter(item => item.is_digital).length, color: '#10B981' },
    { name: 'Presencial/Mixto', value: observatoryData.filter(item => !item.is_digital).length, color: '#6B7280' }
  ];

  const satisfactionData = observatoryData.map(item => ({
    name: item.procedure?.name && item.procedure.name.length > 15 ? item.procedure.name.substring(0, 15) + '...' : item.procedure?.name || 'Sin nombre',
    satisfaction: item.satisfaction_rate,
    maturity: item.maturity_level * 20
  })).sort((a, b) => b.satisfaction - a.satisfaction).slice(0, 8);

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Trámites</p>
              <p className="text-3xl font-bold text-gray-900">{overallStats.totalProcedures}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Instituciones</p>
              <p className="text-3xl font-bold text-gray-900">{overallStats.totalInstitutions}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <Building2 className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Evaluación Promedio</p>
              <p className="text-3xl font-bold text-gray-900">{overallStats.averageEvaluation}%</p>
              <p className="text-xs text-gray-500">Promedio de 0 a 100</p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Trámites Excelentes</p>
              <p className="text-3xl font-bold text-gray-900">{overallStats.excellentProcedures}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-xl">
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Maturity Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución por Nivel de Madurez</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={maturityDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${value}`}
              >
                {maturityDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [value, name]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            {maturityDistribution.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Digital vs Presencial */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Modalidad de Trámites</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={digitalVsPresencial}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
              >
                {digitalVsPresencial.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Category Performance */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rendimiento por Categoría</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(value, name) => [value.toFixed(1), name === 'avgMaturity' ? 'Madurez Promedio' : 'Cantidad']} />
              <Bar dataKey="count" fill="#3B82F6" name="Cantidad" />
              <Bar dataKey="avgMaturity" fill="#10B981" name="Madurez Promedio" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Satisfaction vs Maturity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Satisfacción vs Madurez</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={satisfactionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(value, name) => [value + (name === 'satisfaction' ? '%' : '%'), name === 'satisfaction' ? 'Satisfacción' : 'Madurez']} />
              <Area type="monotone" dataKey="satisfaction" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="maturity" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Best Procedures */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <Award className="h-6 w-6 text-yellow-600" />
          <h3 className="text-xl font-semibold text-gray-900">Mejores Trámites</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {overallStats.bestProcedures.map((procedure, index) => (
            <div key={procedure.id} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 border border-green-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMaturityColor(procedure.maturity_level)}`}>
                    {procedure.maturity_level.toFixed(1)}
                  </span>
                </div>
                {procedure.is_digital && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Digital
                  </span>
                )}
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{procedure.procedure?.name || 'Sin nombre'}</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>⏱️ {procedure.average_time}</p>
                <p>👥 {procedure.monthly_users.toLocaleString()} usuarios/mes</p>
                <p>⭐ {procedure.satisfaction_rate}% satisfacción</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Observatorio Ciudadano de Trámites
              </h1>
              <p className="text-gray-600">
                Análisis independiente de la eficiencia y accesibilidad de los procesos gubernamentales desde la perspectiva ciudadana
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-8 border border-gray-100">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-4 font-medium text-sm transition-colors ${
                activeTab === 'dashboard'
                  ? 'text-blue-800 border-b-2 border-blue-800 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard General
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`px-6 py-4 font-medium text-sm transition-colors ${
                activeTab === 'analysis'
                  ? 'text-blue-800 border-b-2 border-blue-800 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Análisis Detallado
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'dashboard' ? renderDashboard() : (
          <>
            {/* Filters and Controls */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Todas las categorías</option>
                      <option value="identidad">Identidad</option>
                      <option value="negocios">Negocios</option>
                      <option value="vivienda">Vivienda</option>
                      <option value="educacion">Educación</option>
                      <option value="salud">Salud</option>
                      <option value="justicia">Justicia</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nivel de Madurez
                    </label>
                    <select
                      value={selectedMaturity}
                      onChange={(e) => setSelectedMaturity(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Todos los niveles</option>
                      <option value="excellent">Excelente (4.5-5.0)</option>
                      <option value="good">Bueno (3.5-4.4)</option>
                      <option value="regular">Regular (2.5-3.4)</option>
                      <option value="poor">Necesita Mejora (0-2.4)</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setViewMode(viewMode === 'overview' ? 'detailed' : 'overview')}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    <span>{viewMode === 'overview' ? 'Vista Detallada' : 'Vista General'}</span>
                  </button>

                  <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Exportar</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Procedures Analysis */}
            <div className="space-y-6">
              {filteredData.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMaturityColor(item.maturity_level)}`}>
                            {item.maturity_level.toFixed(1)} - {getMaturityLabel(item.maturity_level)}
                          </span>
                          {item.is_digital && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              Digital
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">{item.procedure?.name || 'Sin nombre'}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>Tiempo promedio: {item.average_time}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Users className="h-4 w-4" />
                            <span>Usuarios/mes: {item.monthly_users.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <TrendingUp className="h-4 w-4" />
                            <span>Satisfacción: {item.satisfaction_rate}%</span>
                          </div>
                        </div>

                        {viewMode === 'detailed' && (
                          <div className="space-y-4">
                            {/* Evaluation Score */}
                            <div>
                              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-blue-900">Puntaje de Evaluación</h4>
                                  <span className="text-2xl font-bold text-blue-800">{item.evaluation_score}%</span>
                                </div>
                                <div className="w-full bg-blue-200 rounded-full h-3">
                                  <div 
                                    className="bg-blue-600 h-3 rounded-full transition-all duration-500" 
                                    style={{ width: `${item.evaluation_score}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <h4 className="font-medium text-gray-900 mb-3">Componentes de Evaluación</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Object.entries(item.evaluation_components).map(([component, score]) => {
                                  const componentLabels: Record<string, string> = {
                                    digitalizacion: '4.1 Digitalización',
                                    simplificacion: '4.2 Simplificación',
                                    interoperabilidad: '4.3 Interoperabilidad',
                                    trazabilidad: '4.4 Trazabilidad',
                                    accesibilidad: '4.5 Accesibilidad',
                                    satisfaccionUsuario: '4.6 Satisfacción del Usuario'
                                  };
                                  
                                  return (
                                    <div key={component} className="bg-gray-50 p-3 rounded-lg">
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700 capitalize">
                                          {componentLabels[component]}
                                        </span>
                                        <span className="text-sm font-bold text-gray-900">{score}/5</span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                          className={`h-2 rounded-full ${
                                            score >= 4.5 ? 'bg-green-500' :
                                            score >= 3.5 ? 'bg-blue-500' :
                                            score >= 2.5 ? 'bg-yellow-500' : 'bg-red-500'
                                          }`}
                                          style={{ width: `${(score / 5) * 100}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Issues and Recommendations */}
                            {item.issues.length > 0 && (
                              <div>
                                <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                  <span>Áreas de Mejora</span>
                                </h4>
                                <ul className="space-y-2">
                                  {item.issues.map((issue, index) => (
                                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                                      <span>{issue}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div>
                              <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>Recomendaciones</span>
                              </h4>
                              <ul className="space-y-2">
                                {item.recommendations.map((recommendation, index) => (
                                  <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>{recommendation}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="px-6 pb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Nivel de Madurez</span>
                      <span>{item.maturity_level.toFixed(1)}/5.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          item.maturity_level >= 4.5 ? 'bg-green-500' :
                          item.maturity_level >= 3.5 ? 'bg-blue-500' :
                          item.maturity_level >= 2.5 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${(item.maturity_level / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <BarChart3 className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No se encontraron trámites
                </h3>
                <p className="text-gray-600">
                  Ajusta los filtros para ver más resultados
                </p>
              </div>
            )}
          </>
        )}

        {/* Methodology */}
        <div className="mt-12 bg-blue-50 rounded-xl p-8 border border-blue-100">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Metodología de Evaluación</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-blue-800">
            <div>
              <h4 className="font-semibold mb-2">Dimensiones Evaluadas:</h4>
              <ul className="space-y-1">
                <li>• <strong>Digitalización:</strong> Nivel de automatización del proceso</li>
                <li>• <strong>Usabilidad:</strong> Facilidad de uso para el ciudadano</li>
                <li>• <strong>Eficiencia:</strong> Tiempo y recursos requeridos</li>
                <li>• <strong>Transparencia:</strong> Claridad en requisitos y procesos</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Escala de Madurez:</h4>
              <ul className="space-y-1">
                <li>• <strong>4.5-5.0:</strong> Excelente - Proceso completamente optimizado</li>
                <li>• <strong>3.5-4.4:</strong> Bueno - Proceso eficiente con mejoras menores</li>
                <li>• <strong>2.5-3.4:</strong> Regular - Proceso funcional que requiere mejoras</li>
                <li>• <strong>0-2.4:</strong> Necesita Mejora - Proceso que requiere transformación</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}