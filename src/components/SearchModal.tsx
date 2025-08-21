import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { procedures } from '../data/procedures';
import { Procedure } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProcedureSelect: (procedure: Procedure) => void;
  onSectionChange: (section: string) => void;
}

export default function SearchModal({ isOpen, onClose, onProcedureSelect, onSectionChange }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Procedure[]>([]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = procedures.filter(procedure =>
      procedure.name.toLowerCase().includes(query.toLowerCase()) ||
      procedure.description.toLowerCase().includes(query.toLowerCase()) ||
      procedure.institution.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5); // Limit to 5 results

    setResults(filtered);
  }, [query]);

  const handleProcedureClick = (procedure: Procedure) => {
    onProcedureSelect(procedure);
    onSectionChange('tramite-detalle');
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Buscar Trámites</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿Qué trámite necesitas hacer?"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
          </div>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div className="py-2">
              {results.map((procedure) => (
                <button
                  key={procedure.id}
                  onClick={() => handleProcedureClick(procedure)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{procedure.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{procedure.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{procedure.institution}</span>
                        <span>{procedure.duration}</span>
                        <span className="capitalize">{procedure.type}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          ) : query.trim() !== '' ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-2">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <p className="text-gray-600">No se encontraron trámites para "{query}"</p>
              <p className="text-sm text-gray-500 mt-1">
                Intenta con otros términos de búsqueda
              </p>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-2">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <p className="text-gray-600">Comienza a escribir para buscar trámites</p>
              <p className="text-sm text-gray-500 mt-1">
                Puedes buscar por nombre, institución o descripción
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600 text-center">
            ¿No encuentras lo que buscas? <a href="#" className="text-blue-600 hover:text-blue-700">Contáctanos</a>
          </p>
        </div>
      </div>
    </div>
  );
}