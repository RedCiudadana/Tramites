import React from 'react';
import { Clock, Zap, Shield, HeadphonesIcon } from 'lucide-react';

interface QuickActionsProps {
  onSectionChange: (section: string) => void;
}

export default function QuickActions({ onSectionChange }: QuickActionsProps) {
  const quickActions = [
    {
      icon: Zap,
      title: 'Trámites Express',
      description: 'Completa en menos de 5 minutos',
      action: () => onSectionChange('catalogo'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: Clock,
      title: 'Seguimiento Rápido',
      description: 'Información sobre tiempos de proceso',
      action: () => onSectionChange('catalogo'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: Shield,
      title: 'Documentos Seguros',
      description: 'Información sobre documentos requeridos',
      action: () => onSectionChange('catalogo'),
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: HeadphonesIcon,
      title: 'Soporte 24/7',
      description: 'Asistencia inmediata disponible',
      action: () => onSectionChange('ayuda'),
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Acciones Rápidas
          </h2>
          <p className="text-gray-600">
            Accede directamente a las funciones más utilizadas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className={`${action.color} text-white p-6 rounded-xl transition-all hover:scale-105 shadow-sm hover:shadow-md text-left`}
              >
                <IconComponent className="h-8 w-8 mb-3" />
                <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}