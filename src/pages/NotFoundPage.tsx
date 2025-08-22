import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-6xl font-bold text-blue-600 mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Página no encontrada
          </h1>
          <p className="text-gray-600">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Home className="h-5 w-5" />
            <span>Ir al inicio</span>
          </Link>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/catalogo"
              className="inline-flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Buscar trámites</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver atrás</span>
            </button>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>¿Necesitas ayuda? <Link to="/ayuda" className="text-blue-600 hover:text-blue-700">Visita nuestro centro de ayuda</Link></p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;