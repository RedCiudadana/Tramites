import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProcedureCatalog from '../components/catalog/ProcedureCatalog';

const CatalogPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';


  return (
    <ProcedureCatalog 
      searchQuery={searchQuery}
      selectedCategory={category || ''}
    />
  );
};

export default CatalogPage;