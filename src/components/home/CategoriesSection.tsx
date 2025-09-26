import React from 'react';
                  onClick={() => navigate('/catalogo?search=MINECO')}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
import { useProcedures } from '../../hooks/useProcedures';
import { useInstitutions } from '../../hooks/useInstitutions';

// Create icon map for dynamic access
const iconMap = {
              {/* MINEDUC */}
  Building2,
  GraduationCap,
  Heart,
  Scale,
  MapPin,
  FileText,
                    <h3 className="text-xl font-bold text-purple-900">MINEDUC</h3>
                    <p className="text-sm text-purple-700">Ministerio de Educación</p>
  Building,
  FileCheck,
  BookOpen,
                  Ministerio encargado de la educación pública y el desarrollo educativo nacional.
  FileHeart,
  Shield,
  Gavel,
  Home,
                    <span>{procedures.filter(p => p.institutions?.name === 'MINEDUC').length} trámites educativos</span>
  Zap,
  Users,
  Globe,
                    <span>Certificaciones académicas</span>
};

export default function CategoriesSection() {
                    <span>2411-9595</span>
  const { procedures } = useProcedures();
  const { institutions } = useInstitutions();

                  onClick={() => navigate('/catalogo?search=MINEDUC')}
    navigate(`/catalogo/${categoryId}`);
  };

  // Calculate real category counts from Supabase data
  const categoryMapping = [
    {
      id: 'comunicaciones-y-transporte',
      name: 'Comunicaciones y Transporte',
      icon: 'Phone',
      dbCategory: 'Comunicaciones y Transporte'
    },
    {
      id: 'economia',
      name: 'Economía',
      icon: 'Building2',
      dbCategory: 'Economía'
    },
    {
      id: 'educacion-cultura-deporte',
      name: 'Educación, Cultura y Deporte',
      icon: 'GraduationCap',
      dbCategory: 'Educación, Cultura y Deporte'
    },
                    <span>{procedures.filter(p => p.institutions?.name === 'MSPAS').length} trámites de salud</span>
      id: 'energia',
      name: 'Energía',
      icon: 'Zap',
                    <span>Licencias sanitarias</span>
    },
    {
      id: 'inscripciones-registros',
      name: 'Inscripciones y Registros',
      icon: 'FileText',
      dbCategory: 'Inscripciones y Registros'
    },
    {
      id: 'manejo-animales-vegetales',
      name: 'Manejo de Animales y Vegetales',
      icon: 'Heart',
      dbCategory: 'Manejo de Animales y Vegetales'
    },
    {
              {/* MINGOB */}
      name: 'Mediación y Diálogo',
      icon: 'Users',
      dbCategory: 'Mediación y Diálogo'
                   <Shield className="h-8 w-8 text-white" />
    {
      id: 'medio-ambiente',
                    <h3 className="text-xl font-bold text-yellow-900">MINGOB</h3>
                    <p className="text-sm text-yellow-700">Ministerio de Gobernación</p>
      dbCategory: 'Medio Ambiente'
    },
    {
                  Ministerio encargado de la seguridad interna y el orden público del país.
      name: 'Salud',
      icon: 'Heart',
      dbCategory: 'Salud'
                   <Shield className="h-4 w-4" />
                    <span>{procedures.filter(p => p.institutions?.name === 'MINGOB').length} trámites de seguridad</span>
      id: 'seguridad',
      name: 'Seguridad',
                   <FileCheck className="h-4 w-4" />
                    <span>Antecedentes penales</span>
    },
    {
      id: 'servicios-migracion',
                    <span>2413-8888</span>
      icon: 'Globe',
      dbCategory: 'Servicios de Migración'
    },
                  onClick={() => navigate('/catalogo?search=MINGOB')}
      id: 'territorio-vivienda-infraestructura',
      name: 'Territorio, Vivienda e Infraestructura',
      icon: 'MapPin',
      dbCategory: 'Territorio, Vivienda e Infraestructura'
    },
    {
              {/* MARN */}
      name: 'Trabajo',
      icon: 'Briefcase',
      dbCategory: 'Trabajo'
                   <Globe className="h-8 w-8 text-white" />
  ];

                    <h3 className="text-xl font-bold text-indigo-900">MARN</h3>
                    <p className="text-sm text-indigo-700">Ministerio de Ambiente y Recursos Naturales</p>
    .map(cat => ({
      ...cat,
      count: procedures.filter(p => p.category === cat.dbCategory).length
                  Ministerio encargado de la protección del medio ambiente y recursos naturales.
    .filter(cat => cat.count > 0) // Only show categories that have procedures
    .sort((a, b) => b.count - a.count); // Sort by count descending

                   <Globe className="h-4 w-4" />
                    <span>{procedures.filter(p => p.institutions?.name === 'MARN').length} trámites ambientales</span>
    return institutions.filter(inst => inst.category === category).length;
  };
                   <Shield className="h-4 w-4" />
                    <span>Licencias ambientales</span>
    <>
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <span>2423-0500</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Categorías de Trámites
          </h2>
                  onClick={() => navigate('/catalogo?search=MARN')}
            Encuentra rápidamente el tipo de trámite que necesitas realizar
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categories.map((category) => {
              {/* MINTRABAJO */}
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 border border-teal-200 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-teal-600 p-3 rounded-xl">
                   <Briefcase className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-teal-900">MINTRABAJO</h3>
                    <p className="text-sm text-teal-700">Ministerio de Trabajo y Previsión Social</p>
                  </div>
                </div>
                <p className="text-teal-800 text-sm mb-4">
                  Ministerio encargado de las políticas laborales y la previsión social.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-teal-700">
                   <Briefcase className="h-4 w-4" />
                    <span>{procedures.filter(p => p.institutions?.name === 'MINTRABAJO').length} trámites laborales</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-teal-700">
                   <FileCheck className="h-4 w-4" />
                    <span>Permisos de trabajo</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-teal-700">
                   <Phone className="h-4 w-4" />
                    <span>2422-2500</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/catalogo?search=MINTRABAJO')}
                  className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                >
                  Ver trámites
                </button>
              </div>
              {/* MAGA */}
              {/* MEM */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-orange-600 p-3 rounded-xl">
                   <Zap className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-orange-900">MEM</h3>
                    <p className="text-sm text-orange-700">Ministerio de Energía y Minas</p>
                  </div>
                </div>
                <p className="text-orange-800 text-sm mb-4">
                  Ministerio encargado de la política energética y minera del país.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-orange-700">
                   <Zap className="h-4 w-4" />
                    <span>{procedures.filter(p => p.institutions?.name === 'MEM').length} trámites energéticos</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-orange-700">
                   <FileCheck className="h-4 w-4" />
                    <span>Licencias mineras</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-orange-700">
                   <Phone className="h-4 w-4" />
                    <span>2277-4400</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/catalogo?search=MEM')}
                  className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  Ver trámites
                </button>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-all">
            return (
                  <div className="bg-green-600 p-3 rounded-xl">
                    <Heart className="h-8 w-8 text-white" />
                onClick={() => handleCategoryClick(category.id)}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 text-center group border border-gray-100"
                    <h3 className="text-xl font-bold text-green-900">MAGA</h3>
                    <p className="text-sm text-green-700">Ministerio de Agricultura, Ganadería y Alimentación</p>
                  <IconComponent className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">{category.name}</h3>
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
            <ArrowRight className="h-5 w-5" />
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
                <User className="h-8 w-8 text-white" />
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
                <FileText className="h-4 w-4" />
                <span>{procedures.filter(p => p.name.toLowerCase().includes('dpi')).length} trámites de DPI</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-blue-700">
                <Certificate className="h-4 w-4" />
                <span>{procedures.filter(p => p.name.toLowerCase().includes('nacimiento')).length} certificaciones</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-blue-700">
                <Phone className="h-4 w-4" />
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
                <Building2 className="h-8 w-8 text-white" />
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
                <Building className="h-4 w-4" />
                <span>{procedures.filter(p => p.name.toLowerCase().includes('empresa')).length} trámites empresariales</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-green-700">
                <FileCheck className="h-4 w-4" />
                <span>{procedures.filter(p => p.name.toLowerCase().includes('patente')).length} patentes</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-green-700">
                <Phone className="h-4 w-4" />
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
               <GraduationCap className="h-8 w-8 text-white" />
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
               <BookOpen className="h-4 w-4" />
                <span>{procedures.filter(p => p.name.toLowerCase().includes('inscripcion')).length} inscripciones</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-purple-700">
               <Award className="h-4 w-4" />
                <span>{procedures.filter(p => p.name.toLowerCase().includes('certificacion')).length} certificaciones</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-purple-700">
               <Phone className="h-4 w-4" />
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
               <Heart className="h-8 w-8 text-white" />
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
               <FileHeart className="h-4 w-4" />
                <span>{procedures.filter(p => p.name.toLowerCase().includes('salud')).length} certificados de salud</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-red-700">
               <Shield className="h-4 w-4" />
                <span>{procedures.filter(p => p.name.toLowerCase().includes('licencia')).length} licencias</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-red-700">
               <Phone className="h-4 w-4" />
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
               <Scale className="h-8 w-8 text-white" />
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
               <FileCheck className="h-4 w-4" />
                <span>{procedures.filter(p => p.name.toLowerCase().includes('antecedentes')).length} antecedentes</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-yellow-700">
               <Gavel className="h-4 w-4" />
                <span>{procedures.filter(p => p.name.toLowerCase().includes('judicial')).length} certificaciones</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-yellow-700">
               <Phone className="h-4 w-4" />
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
                <p className="text-green-800 text-sm mb-4">

                  Ministerio encargado del desarrollo agropecuario y la seguridad alimentaria del país.
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-indigo-600 p-3 rounded-xl">
                  <div className="flex items-center space-x-2 text-sm text-green-700">
               <MapPin className="h-8 w-8 text-white" />
                  <div className="flex items-center space-x-2 text-sm text-green-700">
                    <span>{procedures.filter(p => p.institutions?.name === 'MAGA').length} trámites agrícolas</span>
                    <Heart className="h-4 w-4" />
            </div>
                    <span>Agricultura y ganadería</span>
            <p className="text-indigo-800 text-sm mb-4">
                  <div className="flex items-center space-x-2 text-sm text-green-700">
              Gobiernos locales encargados de servicios públicos y desarrollo urbano municipal.
                    <span>2413-7000</span>
            <div className="space-y-2 mb-4">
               <Home className="h-4 w-4" />
                  onClick={() => navigate('/catalogo?search=MAGA')}
                <span>{procedures.filter(p => p.name.toLowerCase().includes('construccion')).length} licencias de construcción</span>
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
               <Receipt className="h-4 w-4" />
                <span>{procedures.filter(p => p.name.toLowerCase().includes('ornato')).length} boletos de ornato</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-indigo-700">
              {/* MINECO */}
               <Phone className="h-4 w-4" />
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all">
            </div>
                  <div className="bg-blue-600 p-3 rounded-xl">
            <button
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    <h3 className="text-xl font-bold text-blue-900">MINECO</h3>
            >
                    <p className="text-sm text-blue-700">Ministerio de Economía</p>
          </div>
                <p className="text-blue-800 text-sm mb-4">
        </div>
                  Ministerio encargado de promover el desarrollo económico y empresarial del país.
          <p className="text-gray-600 mb-6">
            ¿Necesitas información sobre otra institución?
                  <div className="flex items-center space-x-2 text-sm text-blue-700">
          </p>
                    <span>{procedures.filter(p => p.institutions?.name === 'MINECO').length} trámites empresariales</span>
            onClick={() => navigate('/catalogo')}
                  <div className="flex items-center space-x-2 text-sm text-blue-700">
          >
                    <span>Registro mercantil</span>
            <span>Explorar todas las instituciones</span>
                  <div className="flex items-center space-x-2 text-sm text-blue-700">
        </div>
    </section>
    </>
  );
}