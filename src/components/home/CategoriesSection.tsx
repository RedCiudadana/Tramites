import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { categories } from '../../data/procedures';

export default function CategoriesSection() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/catalogo/${categoryId}`);
  };

  return (
    <>
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Categorías de Trámites
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encuentra rápidamente el tipo de trámite que necesitas realizar
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<any>;
            
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 text-center group border border-gray-100"
              >
                <div className="bg-blue-50 text-blue-800 p-4 rounded-full mb-4 mx-auto w-16 h-16 flex items-center justify-center group-hover:bg-blue-800 group-hover:text-white transition-colors">
                  <IconComponent className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} trámites</p>
              </button>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/catalogo')}
            className="bg-blue-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-900 transition-colors inline-flex items-center space-x-2"
          >
            <span>Ver todos los trámites</span>
            <Icons.ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>

    {/* Institutions Section */}
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Principales Instituciones
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conoce las instituciones gubernamentales más importantes donde puedes realizar tus trámites
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* RENAP */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-600 p-3 rounded-xl">
                <Icons.User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900">RENAP</h3>
                <p className="text-sm text-blue-700">Registro Nacional de las Personas</p>
              </div>
            </div>
            <p className="text-blue-800 text-sm mb-4">
              Institución encargada de la identificación y registro civil de los guatemaltecos.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-blue-700">
                <Icons.FileText className="h-4 w-4" />
                <span>DPI y renovaciones</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-blue-700">
                <Icons.Certificate className="h-4 w-4" />
                <span>Certificaciones de nacimiento</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-blue-700">
                <Icons.Phone className="h-4 w-4" />
                <span>1551</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/catalogo?search=RENAP')}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Ver trámites
            </button>
          </div>

          {/* Registro Mercantil */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-all">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-600 p-3 rounded-xl">
                <Icons.Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-900">Registro Mercantil</h3>
                <p className="text-sm text-green-700">Ministerio de Economía</p>
              </div>
            </div>
            <p className="text-green-800 text-sm mb-4">
              Registro de empresas, comerciantes individuales y sociedades mercantiles.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-green-700">
                <Icons.Building className="h-4 w-4" />
                <span>Inscripción de empresas</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-green-700">
                <Icons.FileCheck className="h-4 w-4" />
                <span>Patentes de comercio</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-green-700">
                <Icons.Phone className="h-4 w-4" />
                <span>2412-0000</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/catalogo?search=Registro Mercantil')}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Ver trámites
            </button>
          </div>

          {/* USAC */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-purple-600 p-3 rounded-xl">
                <Icons.GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-900">USAC</h3>
                <p className="text-sm text-purple-700">Universidad de San Carlos</p>
              </div>
            </div>
            <p className="text-purple-800 text-sm mb-4">
              Universidad pública, autónoma y laica de Guatemala. Educación superior gratuita.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-purple-700">
                <Icons.BookOpen className="h-4 w-4" />
                <span>Inscripciones universitarias</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-purple-700">
                <Icons.Award className="h-4 w-4" />
                <span>Certificaciones académicas</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-purple-700">
                <Icons.Phone className="h-4 w-4" />
                <span>2418-8000</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/catalogo?search=USAC')}
              className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Ver trámites
            </button>
          </div>

          {/* MSPAS */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200 hover:shadow-lg transition-all">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-red-600 p-3 rounded-xl">
                <Icons.Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-900">MSPAS</h3>
                <p className="text-sm text-red-700">Ministerio de Salud Pública</p>
              </div>
            </div>
            <p className="text-red-800 text-sm mb-4">
              Ministerio encargado de formular políticas y programas en materia de salud pública.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-red-700">
                <Icons.FileHeart className="h-4 w-4" />
                <span>Certificados de salud</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-red-700">
                <Icons.Shield className="h-4 w-4" />
                <span>Licencias sanitarias</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-red-700">
                <Icons.Phone className="h-4 w-4" />
                <span>2440-4747</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/catalogo?search=MSPAS')}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Ver trámites
            </button>
          </div>

          {/* Organismo Judicial */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200 hover:shadow-lg transition-all">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-yellow-600 p-3 rounded-xl">
                <Icons.Scale className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-900">Organismo Judicial</h3>
                <p className="text-sm text-yellow-700">Poder Judicial</p>
              </div>
            </div>
            <p className="text-yellow-800 text-sm mb-4">
              Encargado de la administración de justicia y protección de derechos constitucionales.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-yellow-700">
                <Icons.FileCheck className="h-4 w-4" />
                <span>Antecedentes penales</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-yellow-700">
                <Icons.Gavel className="h-4 w-4" />
                <span>Certificaciones judiciales</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-yellow-700">
                <Icons.Phone className="h-4 w-4" />
                <span>1572</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/catalogo?search=Organismo Judicial')}
              className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors font-medium"
            >
              Ver trámites
            </button>
          </div>

          {/* Municipalidades */}
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200 hover:shadow-lg transition-all">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-indigo-600 p-3 rounded-xl">
                <Icons.MapPin className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-indigo-900">Municipalidades</h3>
                <p className="text-sm text-indigo-700">Gobiernos Locales</p>
              </div>
            </div>
            <p className="text-indigo-800 text-sm mb-4">
              Gobiernos locales encargados de servicios públicos y desarrollo urbano municipal.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-indigo-700">
                <Icons.Home className="h-4 w-4" />
                <span>Licencias de construcción</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-indigo-700">
                <Icons.Receipt className="h-4 w-4" />
                <span>Boleto de ornato</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-indigo-700">
                <Icons.Phone className="h-4 w-4" />
                <span>Varía por municipio</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/catalogo?search=Municipalidad')}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Ver trámites
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            ¿Necesitas información sobre otra institución?
          </p>
          <button
            onClick={() => navigate('/catalogo')}
            className="bg-gray-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors inline-flex items-center space-x-2"
          >
            <Icons.Search className="h-5 w-5" />
            <span>Explorar todas las instituciones</span>
          </button>
        </div>
      </div>
    </section>
    </>
  );
}