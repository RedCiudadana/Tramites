import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useProcedures } from '../hooks/useProcedures';
import ProcedureDetail from '../components/procedures/ProcedureDetail';

const ProcedureDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { procedures, loading, error } = useProcedures();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando información del trámite...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error al cargar el trámite: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  const procedure = procedures.find(p => p.id === id);

  if (!procedure) {
    return <Navigate to="/404" replace />;
  }

  return <ProcedureDetail procedure={procedure} />;
};

export default ProcedureDetailPage;