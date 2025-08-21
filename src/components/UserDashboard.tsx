import React from 'react';
import { Clock, CheckCircle, AlertTriangle, Eye, FileText, Calendar } from 'lucide-react';
import { userProcedures } from '../data/procedures';

export default function UserDashboard() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'recibido': return <Clock className="h-5 w-5 text-blue-500" />;
      case 'en-revision': return <Eye className="h-5 w-5 text-yellow-500" />;
      case 'aprobado': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'observado': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recibido': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'en-revision': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'aprobado': return 'bg-green-50 text-green-800 border-green-200';
      case 'observado': return 'bg-red-50 text-red-800 border-red-200';
      default: return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'recibido': return 'Recibido';
      case 'en-revision': return 'En Revisión';
      case 'aprobado': return 'Aprobado';
      case 'observado': return 'Observado';
      default: return 'Desconocido';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-GT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getActionButton = (status: string) => {
    switch (status) {
      case 'aprobado':
        return (
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
            Descargar resultado
          </button>
        );
      case 'observado':
        return (
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
            Ver observaciones
          </button>
        );
      default:
        return (
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            Ver detalles
          </button>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mis Trámites
          </h1>
          <p className="text-gray-600">
            Seguimiento y estado de todos tus trámites en proceso
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{userProcedures.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">En proceso</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userProcedures.filter(p => ['recibido', 'en-revision'].includes(p.status)).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Aprobados</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userProcedures.filter(p => p.status === 'aprobado').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Observados</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userProcedures.filter(p => p.status === 'observado').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Procedures List */}
        <div className="space-y-6">
          {userProcedures.map((userProcedure) => (
            <div key={userProcedure.id} className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {userProcedure.procedureName}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(userProcedure.status)}`}>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(userProcedure.status)}
                          <span>{getStatusText(userProcedure.status)}</span>
                        </div>
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Enviado: {formatDate(userProcedure.submittedDate)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Estimado: {formatDate(userProcedure.estimatedCompletion)}</span>
                      </div>
                    </div>
                    
                    {userProcedure.status === 'observado' && (
                      <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-sm text-red-800">
                          <strong>Observaciones:</strong> Se requiere información adicional. 
                          Revisa los comentarios y vuelve a enviar la documentación.
                        </p>
                      </div>
                    )}
                    
                    {userProcedure.status === 'aprobado' && (
                      <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-800">
                          <strong>¡Felicidades!</strong> Tu trámite ha sido aprobado. 
                          Ya puedes descargar el resultado final.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    {getActionButton(userProcedure.status)}
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="px-6 pb-6">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      userProcedure.status === 'recibido' ? 'bg-blue-500 w-1/4' :
                      userProcedure.status === 'en-revision' ? 'bg-yellow-500 w-2/4' :
                      userProcedure.status === 'aprobado' ? 'bg-green-500 w-full' :
                      'bg-red-500 w-3/4'
                    }`}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Recibido</span>
                  <span>En revisión</span>
                  <span>Procesado</span>
                  <span>Completado</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {userProcedures.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              ¡Únete a nuestra comunidad!
            </h3>
            <p className="text-gray-600 mb-4">
              Comparte tu experiencia con trámites para ayudar a otros ciudadanos
            </p>
            <button className="bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors font-medium">
              Comenzar a contribuir
            </button>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-2">¿Necesitas ayuda?</h3>
              <p className="text-blue-800 mb-4">
                Si tienes preguntas sobre el estado de tus trámites o necesitas asistencia, 
                estamos aquí para ayudarte.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Chat en vivo
                </button>
                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium">
                  Centro de ayuda
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}