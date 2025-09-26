import React from 'react';
import { 
  Clock, 
  Building2, 
  User, 
  Users, 
  FileText, 
  CheckCircle, 
  ArrowLeft,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Globe,
  Calendar,
  AlertCircle,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Procedure } from '../../lib/supabase';

interface ProcedureDetailProps {
  procedure: Procedure;
}

export default function ProcedureDetail({ procedure }: ProcedureDetailProps) {
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

  const getUserTypeIcon = (user_type: string) => {
    switch (user_type) {
      case 'persona': return <User className="h-4 w-4" />;
      case 'empresa': return <Building2 className="h-4 w-4" />;
      case 'ambos': return <Users className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const institutionName = procedure.institutions?.name || 'N/A';
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/catalogo"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver al catálogo</span>
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{procedure.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(procedure.type)}`}>
                  {getTypeIcon(procedure.type)} {procedure.type}
                </span>
              </div>

              {procedure.subcategory && (
                <p className="text-lg text-blue-600 font-medium mb-4">
                  {procedure.subcategory}
                </p>
              )}

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {procedure.full_description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <Building2 className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Institución</p>
                    <p className="font-semibold text-blue-900">{institutionName}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                  <Clock className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="text-sm text-green-600 font-medium">Duración</p>
                    <p className="font-semibold text-green-900">{procedure.duration}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                  {getUserTypeIcon(procedure.user_type)}
                  <div>
                    <p className="text-sm text-purple-600 font-medium">Dirigido a</p>
                    <p className="font-semibold text-purple-900 capitalize">{procedure.user_type}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-orange-100 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Requisitos</h2>
          </div>
          
          <div className="grid gap-4">
            {(procedure.requirements || []).map((requirement, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-100">
                <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-800">{requirement}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Pasos a Seguir</h2>
          </div>
          
          <div className="space-y-4">
            {(procedure.steps || []).map((step, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-800 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Legal Framework */}
          {procedure.respaldo_legal && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Marco Legal</h3>
              </div>
              <p className="text-gray-700">{procedure.respaldo_legal}</p>
            </div>
          )}

          {/* Last Updated */}
          {procedure.fecha_actualizado && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Última Actualización</h3>
              </div>
              <p className="text-gray-700">
                {new Date(procedure.fecha_actualizado).toLocaleDateString('es-GT', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-blue-900">Información de Contacto</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-blue-900 mb-3">Institución Responsable</h3>
              <p className="text-blue-800 text-lg font-medium mb-4">{institutionName}</p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-blue-700">
                  <Phone className="h-4 w-4" />
                  <span>Consulta el directorio telefónico oficial</span>
                </div>
                <div className="flex items-center space-x-3 text-blue-700">
                  <Mail className="h-4 w-4" />
                  <span>Información disponible en el sitio web oficial</span>
                </div>
                <div className="flex items-center space-x-3 text-blue-700">
                  <MapPin className="h-4 w-4" />
                  <span>Ubicaciones en el sitio web de la institución</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-blue-900 mb-3">Recursos Adicionales</h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center space-x-3 text-blue-700 hover:text-blue-900 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span>Sitio web oficial de {institutionName}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <div className="flex items-center space-x-3 text-blue-700">
                  <Info className="h-4 w-4" />
                  <span>Horarios de atención disponibles en línea</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Aviso Importante</h3>
              <p className="text-yellow-700 text-sm leading-relaxed">
                Esta información es recopilada y verificada por Red Ciudadana para facilitar el acceso ciudadano. 
                Siempre confirme los requisitos y procedimientos actuales en las fuentes oficiales de la institución 
                antes de realizar su trámite. Los procesos pueden cambiar sin previo aviso.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}