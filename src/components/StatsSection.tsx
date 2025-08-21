import React from 'react';
import { Users, Clock, CheckCircle, TrendingUp, Award, Zap } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: '850K+',
      label: 'Ciudadanos informados',
      description: 'Han consultado información en nuestro portal',
      color: 'bg-blue-500',
      trend: '+15%'
    },
    {
      icon: CheckCircle,
      value: '120+',
      label: 'Trámites documentados',
      description: 'Procedimientos investigados y verificados',
      color: 'bg-green-500',
      trend: '+23%'
    },
    {
      icon: Clock,
      value: '75%',
      label: 'Ciudadanos mejor preparados',
      description: 'Llegan con documentos completos a oficinas',
      color: 'bg-purple-500',
      trend: '+8%'
    },
    {
      icon: Award,
      value: '4.8/5',
      label: 'Utilidad de información',
      description: 'Calificación promedio de la información',
      color: 'bg-yellow-500',
      trend: '+0.3'
    }
  ];

  const achievements = [
    {
      icon: Zap,
      title: 'Transparencia Ciudadana',
      description: 'Premio Nacional de Transparencia y Acceso a la Información 2024'
    },
    {
      icon: TrendingUp,
      title: 'Impacto Social Comprobado',
      description: 'Reconocimiento internacional por trabajo en sociedad civil'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Impacto de Red Ciudadana
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Números que reflejan nuestro compromiso con la transparencia y el acceso a la información 
            para todos los ciudadanos de Guatemala
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:scale-105 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-xl`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
                    {stat.trend}
                  </span>
                </div>
                <div className="mb-2">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-lg font-semibold text-gray-800">{stat.label}</div>
                </div>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Achievements */}
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <IconComponent className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm">{achievement.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}