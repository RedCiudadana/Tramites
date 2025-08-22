import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProcedureCatalog from '../components/catalog/ProcedureCatalog';
import HeroSlider from '../components/common/HeroSlider';
import { procedures } from '../data/procedures';

const CatalogPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const catalogSlides = [
    {
      id: '1',
      title: 'Catálogo de Trámites',
      subtitle: 'Información Verificada y Actualizada',
      description: 'Encuentra toda la información que necesitas sobre trámites gubernamentales en Guatemala. Requisitos, pasos, tiempos y contactos oficiales.',
      backgroundImage: '',
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: 'text-white',
      buttonText: 'Explorar Trámites',
      buttonAction: () => {
        const element = document.getElementById('catalog-content');
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: '2',
      title: 'Información Ciudadana',
      subtitle: 'Recopilada por Red Ciudadana',
      description: 'Nuestra organización de sociedad civil verifica y actualiza constantemente la información para que tengas datos confiables y actualizados.',
      backgroundImage: '',
      backgroundColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      textColor: 'text-white',
      buttonText: 'Conocer Más',
      buttonAction: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      buttonAction: () => window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    {
      id: '3',
      title: 'Trámites Digitales',
      subtitle: 'La Nueva Era de los Servicios Públicos',
      description: 'Descubre qué trámites puedes realizar completamente en línea y ahorra tiempo en tus gestiones gubernamentales.',
      backgroundImage: '',
      backgroundColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      textColor: 'text-white',
      buttonText: 'Ver Trámites Digitales',
      buttonAction: () => {
        // Filtrar por trámites digitales
        window.location.href = '/catalogo?digital=true';
      }
    }
  ];

  return (
    <>
      <HeroSlider 
        slides={catalogSlides}
        height="h-[500px]"
        autoPlay={true}
        autoPlayInterval={6000}
      />
      <div id="catalog-content">
        <ProcedureCatalog 
          searchQuery={searchQuery}
          selectedCategory={category || ''}
        />
      </div>
    </>
  );
};

export default CatalogPage;