import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  FileText,
  Eye,
  Download,
  CheckCircle,
  XCircle,
  MinusCircle
} from 'lucide-react';
import { useObservatory, useObservatoryStats } from '../../hooks/useObservatory';

export default function ObservatoryDashboard() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'digital' | 'partial' | 'none'>('all');
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getDigitalIcon = (value: number) => {
    if (value === 100) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (value === 50) return <MinusCircle className="w-5 h-5 text-yellow-600" />;
    return <XCircle className="w-5 h-5 text-red-600" />;
  };

  const getDigitalLabel = (value: number) => {
    if (value === 100) return '100% Digital';
    if (value === 50) return '50% Mixto';
    return '0% Presencial';
  };

  const filteredData = observatoryData.filter(item => {
    if (selectedFilter === 'digital') return item.completamente_en_linea === 100;
    if (selectedFilter === 'partial') return item.completamente_en_linea === 50;
    if (selectedFilter === 'none') return item.completamente_en_linea === 0;
    return true;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
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
                Evaluación de la digitalización y eficiencia de los procesos gubernamentales
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Trámites</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalProcedures}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completamente Digitales</p>
                <p className="text-3xl font-bold text-green-600">{stats.digitalProcedures}</p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Evaluación Promedio</p>
                <p className="text-3xl font-bold text-gray-900">{stats.averageEvaluation}%</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Trámites Excelentes</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.excellentProcedures}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-xl">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-8 border border-gray-100">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos ({observatoryData.length})
            </button>
            <button
              onClick={() => setSelectedFilter('digital')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'digital'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Digitales 100% ({stats.digitalProcedures})
            </button>
            <button
              onClick={() => setSelectedFilter('partial')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'partial'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Mixtos 50% ({stats.partialDigitalProcedures})
            </button>
            <button
              onClick={() => setSelectedFilter('none')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'none'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Presenciales ({stats.nonDigitalProcedures})
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[300px]">
                    Trámite
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Digitalización
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pasos
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Madurez
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Evaluación
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="font-medium">{item.tramite}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {item.num_requisitos}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center space-x-2">
                        {getDigitalIcon(item.completamente_en_linea)}
                        <span className="text-sm font-medium">
                          {item.completamente_en_linea}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                      {item.num_pasos}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                        item.maturity_level >= 4.0 ? 'bg-green-100 text-green-800' :
                        item.maturity_level >= 3.0 ? 'bg-blue-100 text-blue-800' :
                        item.maturity_level >= 2.0 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.maturity_level.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getScoreColor(item.evaluation_score)}`}>
                        {item.evaluation_score}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => {
                          // Store selected item in session storage
                          sessionStorage.setItem('selectedObservatoryItem', JSON.stringify(item));
                          // Scroll to detail section
                          document.getElementById('detail-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center space-x-1 mx-auto"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Ver detalle</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Section Placeholder */}
        <div id="detail-section" className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Detalle del Trámite</h3>
          <p className="text-gray-600">
            Selecciona un trámite de la tabla para ver su información detallada de evaluación.
          </p>
        </div>

        {/* Methodology */}
        <div className="mt-8 bg-blue-50 rounded-xl p-8 border border-blue-100">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Metodología de Evaluación</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-blue-800">
            <div>
              <h4 className="font-semibold mb-2">Criterios Evaluados:</h4>
              <ul className="space-y-1">
                <li>• Completamente en línea (0%, 50%, 100%)</li>
                <li>• Adjunta documentos digitalmente</li>
                <li>• Firma electrónica avanzada</li>
                <li>• Resultado electrónico</li>
                <li>• Número de pasos y requisitos</li>
                <li>• Intercambio de datos entre entidades</li>
                <li>• Consulta de estado</li>
                <li>• Notificaciones electrónicas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Escala de Evaluación:</h4>
              <ul className="space-y-1">
                <li>• <strong>80-100:</strong> Excelente digitalización</li>
                <li>• <strong>60-79:</strong> Buena implementación digital</li>
                <li>• <strong>40-59:</strong> Digitalización parcial</li>
                <li>• <strong>0-39:</strong> Requiere modernización</li>
              </ul>
              <h4 className="font-semibold mt-4 mb-2">Nivel de Madurez:</h4>
              <ul className="space-y-1">
                <li>• <strong>4.0-5.0:</strong> Proceso maduro y optimizado</li>
                <li>• <strong>3.0-3.9:</strong> Proceso en desarrollo</li>
                <li>• <strong>2.0-2.9:</strong> Proceso básico</li>
                <li>• <strong>0-1.9:</strong> Proceso inicial</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
