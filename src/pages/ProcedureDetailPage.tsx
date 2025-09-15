import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { procedures } from '../data/procedures';
import ProcedureDetail from '../components/procedures/ProcedureDetail';

const ProcedureDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const procedure = procedures.find(p => p.id === id);

  if (!procedure) {
    return <Navigate to="/404" replace />;
  }

  return <ProcedureDetail procedure={procedure} />;
};

export default ProcedureDetailPage;