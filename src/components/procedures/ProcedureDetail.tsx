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
import { Procedure } from '../../lib/data';
import Breadcrumb from '../common/Breadcrumb';
import SocialShareButton from '../common/SocialShareButton';
import { AcronymText } from '../common/AcronymTooltip';

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
      case 'digital': return 'bg-blue-100 text-blue-800';
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

  const parseArrayField = (field: string[] | string | undefined): string[] => {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    if (typeof field === 'string') {
      return field.split(',').map(item => item.trim()).filter(item => item.length > 0);
    }
    return [];
  };

  const requirements = parseArrayField(procedure.requirements);
  const steps = parseArrayField(procedure.steps);
  const institutionName = procedure.institutions?.name || 'N/A';
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Catálogo de Trámites', path: '/catalogo' },
            { label: procedure.name }
          ]}
        />

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
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
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
                <AcronymText text={procedure.full_description} />
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <Building2 className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Institución</p>
                    <p className="font-semibold text-blue-900">{institutionName}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Duración</p>
                    <p className="font-semibold text-blue-900">{procedure.duration}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  {getUserTypeIcon(procedure.user_type)}
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Dirigido a</p>
                    <p className="font-semibold text-blue-900 capitalize">{procedure.user_type}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Button */}
            <div className="flex flex-col gap-3">
              <SocialShareButton
                title={`${procedure.name} - Red Ciudadana`}
                description={procedure.description || procedure.full_description}
                hashtags={['RedCiudadana', 'TrámitesGuatemala', 'Transparencia']}
              />
              <p className="text-xs text-gray-500 text-center">
                Comparte este trámite
              </p>
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
            {requirements.map((requirement, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-100">
                <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-800">
                  <AcronymText text={requirement} />
                </p>
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
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-800 pt-1">
                  <AcronymText text={step} />
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Cost Information */}
          {(procedure.costo || procedure.codigo_moneda) && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Costo del Trámite</h3>
              </div>
              <div className="space-y-2">
                {procedure.costo && (
                  <p className="text-gray-700">
                    <span className="font-medium">Costo:</span> {procedure.costo}
                  </p>
                )}
                {procedure.codigo_moneda && (
                  <p className="text-gray-700">
                    <span className="font-medium">Moneda:</span> {procedure.codigo_moneda}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Document Information */}
          {procedure.documento_obtenible && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Documento que Obtienes</h3>
              </div>
              <p className="text-gray-700">{procedure.documento_obtenible}</p>
            </div>
          )}

          {/* Legal Framework */}
          {procedure.respaldo_legal && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
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
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
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

        {/* Official Link */}
        {procedure.enlace && (
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8 mb-8 border border-blue-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <ExternalLink className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-blue-900">Enlace Oficial del Trámite</h2>
            </div>
            <p className="text-blue-800 mb-4">
              Accede directamente al portal oficial para realizar este trámite en línea o obtener más información.
            </p>
            <a
              href={procedure.enlace}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Globe className="h-5 w-5" />
              <span>Ver Trámite</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}

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