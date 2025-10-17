import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronRight,
  Building2,
  GraduationCap,
  Heart,
  Scale,
  Phone,
  Briefcase,
  Users,
  Globe,
  FileText,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { useProcedures } from '../hooks/useProcedures';

const iconMap: { [key: string]: React.ElementType } = {
  Building2,
  GraduationCap,
  Heart,
  Scale,
  Phone,
  Briefcase,
  Users,
  Globe,
  FileText
};

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  count: number;
}

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { procedures } = useProcedures();

  const categoryDefinitions = [
    {
      id: 'Comunicaciones y Transporte',
      name: 'Comunicaciones y Transporte',
      description: 'Trámites relacionados con telecomunicaciones, transporte y logística',
      icon: 'Phone',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'Economía',
      name: 'Economía',
      description: 'Registro de empresas, patentes, comercio y asuntos económicos',
      icon: 'Building2',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'Educación',
      name: 'Educación',
      description: 'Servicios educativos, certificaciones y programas académicos',
      icon: 'GraduationCap',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'Salud y Asistencia Social',
      name: 'Salud y Asistencia Social',
      description: 'Servicios de salud, asistencia médica y programas sociales',
      icon: 'Heart',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 'Justicia',
      name: 'Justicia',
      description: 'Servicios legales, judiciales y de seguridad ciudadana',
      icon: 'Scale',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      id: 'Trabajo',
      name: 'Trabajo',
      description: 'Empleo, seguridad social y relaciones laborales',
      icon: 'Briefcase',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 'Participación Ciudadana',
      name: 'Participación Ciudadana',
      description: 'Trámites para la participación y organización civil',
      icon: 'Users',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    },
    {
      id: 'Relaciones Exteriores',
      name: 'Relaciones Exteriores',
      description: 'Pasaportes, visas y servicios consulares',
      icon: 'Globe',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50'
    }
  ];

  const categories: Category[] = useMemo(() => {
    return categoryDefinitions.map(cat => {
      const count = procedures.filter(p => p.category === cat.id).length;
      return { ...cat, count };
    }).sort((a, b) => b.count - a.count);
  }, [procedures]);

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalProcedures = procedures.length;
  const categoriesWithProcedures = categories.filter(c => c.count > 0).length;

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/catalogo/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-white/80 mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white font-medium">Categorías de Trámites</span>
          </nav>

          <div className="text-center">
            <FileText className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Categorías de Trámites
            </h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto mb-6">
              Explora los trámites organizados por categorías temáticas
            </p>

            <div className="flex justify-center gap-8 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">{categoriesWithProcedures}</div>
                <div className="text-red-100 text-sm">Categorías activas</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">{totalProcedures}</div>
                <div className="text-red-100 text-sm">Trámites disponibles</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar categorías..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">¿Qué son las categorías?</h3>
                <p className="text-gray-700 text-sm">
                  Las categorías agrupan los trámites según su naturaleza y el sector al que pertenecen.
                  Esto te permite encontrar rápidamente todos los servicios relacionados con un área específica
                  como salud, educación, economía, entre otros.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const Icon = iconMap[category.icon] || FileText;

            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                disabled={category.count === 0}
                className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden text-left group border-2 border-transparent ${
                  category.count > 0
                    ? 'hover:border-red-500 cursor-pointer'
                    : 'opacity-60 cursor-not-allowed'
                }`}
              >
                <div className={`${category.bgColor} p-6`}>
                  <div className="flex items-start justify-between mb-4">
                    <Icon className={`w-12 h-12 ${category.color} ${category.count > 0 ? 'group-hover:scale-110' : ''} transition-transform`} />
                    <div className="bg-white rounded-full px-3 py-1 shadow-sm">
                      <span className="font-bold text-gray-900">{category.count}</span>
                    </div>
                  </div>

                  <h3 className={`text-xl font-bold text-gray-900 mb-2 ${category.count > 0 ? 'group-hover:text-red-600' : ''} transition-colors`}>
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </div>

                {category.count > 0 ? (
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {category.count} trámite{category.count !== 1 ? 's' : ''} disponible{category.count !== 1 ? 's' : ''}
                      </span>
                      <div className="flex items-center gap-2 text-red-600 font-semibold text-sm group-hover:gap-3 transition-all">
                        Ver trámites
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6">
                    <span className="text-sm text-gray-500 italic">
                      Sin trámites disponibles
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron categorías
            </h3>
            <p className="text-gray-600">
              Intenta con otros términos de búsqueda
            </p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:gap-3"
          >
            Ver catálogo completo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
