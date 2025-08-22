import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalogo?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const popularSearches = [
    'Renovación de DPI',
    'Inscribir empresa',
    'Antecedentes penales',
    'Certificado de salud'
  ];

  const handlePopularSearch = (search: string) => {
    navigate(`/catalogo?search=${encodeURIComponent(search)}`);
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Observatorio de Trámites
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
              de Guatemala
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            Red Ciudadana recopila y organiza información sobre trámites gubernamentales para que tengas todo lo necesario antes de ir a las oficinas oficiales.
            <br/><br/>
            <span className="font-semibold text-white">Información verificada y actualizada por la sociedad civil.</span>
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="¿Qué información necesitas? Ej: renovar DPI, inscribir empresa..."
                className="w-full pl-16 pr-40 py-5 text-lg rounded-2xl text-gray-900 placeholder-gray-500 border-0 focus:ring-4 focus:ring-blue-300/50 focus:outline-none shadow-2xl backdrop-blur-sm"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl"
              >
                <span>Buscar</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Popular Searches */}
          <div className="mb-12">
            <p className="text-blue-200 text-sm mb-3">Búsquedas populares:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handlePopularSearch(search)}
                  className="bg-blue-800/30 backdrop-blur-sm text-blue-100 px-4 py-2 rounded-full text-sm hover:bg-blue-700/40 transition-colors border border-blue-600/30"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}