import React from 'react';
import { ArrowLeft, ChevronRight, ExternalLink, Building2, Clock, User, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Procedure } from '../../types';

interface ProcedureDetailProps {
  procedure: Procedure;
}

const institutionInfo: Record<string, any> = {
  'RENAP': {
    fullName: 'Registro Nacional de las Personas',
    website: 'https://www.renap.gob.gt',
    address: '6a Avenida 4-64, Zona 4, Ciudad de Guatemala',
    phone: '1551'
  },
  'Registro Mercantil': {
    fullName: 'Registro Mercantil General de la República',
    website: 'https://www.registromercantil.gob.gt',
    address: '7a Avenida 7-61, Zona 4, Ciudad de Guatemala',
    phone: '2412-0000'
  },
  'Municipalidad': {
    fullName: 'Municipalidades de Guatemala',
    website: 'https://www.infom.gob.gt',
    address: 'Varía según municipio',
    phone: 'Varía según municipio'
  },
  'USAC': {
    fullName: 'Universidad de San Carlos de Guatemala',
    website: 'https://www.usac.edu.gt',
    address: 'Ciudad Universitaria, Zona 12, Ciudad de Guatemala',
    phone: '2418-8000'
  },
  'MSPAS': {
    fullName: 'Ministerio de Salud Pública y Asistencia Social',
    website: 'https://www.mspas.gob.gt',
    address: '6a Avenida 3-45, Zona 11, Ciudad de Guatemala',
    phone: '2440-4747'
  },
  'Organismo Judicial': {
    fullName: 'Organismo Judicial de Guatemala',
    website: 'https://www.oj.gob.gt',
    address: '21 Calle 7-70, Zona 1, Ciudad de Guatemala',
    phone: '2248-5555'
  }
};

export default function ProcedureDetail({ procedure }: ProcedureDetailProps) {
  const navigate = useNavigate();
  const institution = institutionInfo[procedure.institution] || {};
  
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

  const handleGoToInstitution = () => {
    if (institution.website) {
      window.open(institution.website, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-800 transition-colors">
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/catalogo" className="hover:text-blue-800 transition-colors">
            Catálogo de Trámites
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">
            {procedure.name}
          </span>
        </nav>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          {/* Back Button */}
          <button
            onClick={() => navigate('/catalogo')}
            className="flex items-center space-x-2 text-blue-800 hover:text-blue-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Volver al catálogo</span>
          </button>
          
          {/* Title and Basic Info */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {procedure.name}
            </h1>
            
            {/* Status Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(procedure.type)}`}>
                <span className="mr-1">{getTypeIcon(procedure.type)}</span>
                {procedure.type.charAt(0).toUpperCase() + procedure.type.slice(1)}
              </span>
              
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <Building2 className="h-4 w-4 mr-1" />
                {procedure.institution}
              </span>
              
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                <Clock className="h-4 w-4 mr-1" />
                {procedure.duration}
              </span>
              
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                {procedure.userType === 'persona' ? (
                  <User className="h-4 w-4 mr-1" />
                ) : procedure.userType === 'empresa' ? (
                  <Building2 className="h-4 w-4 mr-1" />
                ) : (
                  <Users className="h-4 w-4 mr-1" />
                )}
                <span className="capitalize">{procedure.userType}</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Descripción del Trámite
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {procedure.fullDescription || procedure.description}
              </p>
            </div>
          </div>

          {/* Institution Button */}
          <div className="text-center">
            <button
              onClick={handleGoToInstitution}
              disabled={!institution.website}
              className={`inline-flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 ${
                institution.website
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Building2 className="h-6 w-6" />
              <span>
                {institution.website 
                  ? `Ir a ${institution.fullName || procedure.institution}`
                  : 'Portal no disponible'
                }
              </span>
              {institution.website && <ExternalLink className="h-5 w-5" />}
            </button>
            
            {institution.website && (
              <p className="text-sm text-gray-600 mt-3">
                Te dirigirá al portal oficial de {institution.fullName || procedure.institution}
              </p>
            )}
            
            {!institution.website && (
              <p className="text-sm text-gray-500 mt-3">
                Este trámite debe realizarse de forma presencial
              </p>
            )}
          </div>

          {/* Institution Contact Info */}
          {(institution.address || institution.phone) && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Información de Contacto
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {institution.address && (
                  <p className="text-gray-700 mb-2">
                    <strong>Dirección:</strong> {institution.address}
                  </p>
                )}
                {institution.phone && (
                  <p className="text-gray-700">
                    <strong>Teléfono:</strong> {institution.phone}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}