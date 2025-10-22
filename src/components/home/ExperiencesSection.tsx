import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Utensils, Store, Home, ArrowRight, Clock, FileText } from 'lucide-react';

const featuredExperiences = [
  {
    id: 'panadero',
    title: 'Quiero ser Panadero',
    description: 'Todos los trámites necesarios para abrir tu panadería en Guatemala',
    icon: Utensils,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    hoverColor: 'hover:border-amber-500',
    proceduresCount: 2,
    estimatedTime: '45-60 días',
    difficulty: 'Moderado'
  },
  {
    id: 'negocio',
    title: 'Quiero Abrir un Negocio',
    description: 'Pasos para formalizar tu empresa y empezar a operar legalmente',
    icon: Store,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    hoverColor: 'hover:border-blue-500',
    proceduresCount: 1,
    estimatedTime: '30-45 días',
    difficulty: 'Moderado'
  },
  {
    id: 'construir',
    title: 'Quiero Construir mi Casa',
    description: 'Permisos y licencias necesarias para construir tu vivienda',
    icon: Home,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    hoverColor: 'hover:border-green-500',
    proceduresCount: 1,
    estimatedTime: '60-90 días',
    difficulty: 'Complejo'
  }
];

export default function ExperiencesSection() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil':
        return 'bg-green-100 text-green-800';
      case 'Moderado':
        return 'bg-yellow-100 text-yellow-800';
      case 'Complejo':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Target className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Experiencias Guiadas
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubre todos los trámites necesarios para alcanzar tus metas específicas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {featuredExperiences.map((experience) => {
            const Icon = experience.icon;

            return (
              <div
                key={experience.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group border-2 border-transparent ${experience.hoverColor}`}
              >
                <div className={`${experience.bgColor} p-6`}>
                  <Icon className={`w-12 h-12 ${experience.color} mb-4 group-hover:scale-110 transition-transform`} />
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {experience.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {experience.description}
                  </p>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {experience.proceduresCount} trámite{experience.proceduresCount !== 1 ? 's' : ''}
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getDifficultyColor(experience.difficulty)}`}>
                      {experience.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{experience.estimatedTime}</span>
                  </div>

                  <Link
                    to="/experiencias"
                    className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all group-hover:gap-3 mt-4"
                  >
                    Ver detalles
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/experiencias"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:gap-3 text-lg"
          >
            Ver todas las experiencias
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </section>
  );
}
