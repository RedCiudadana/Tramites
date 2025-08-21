import React from 'react';
import { Smartphone, Brain, Shield, Zap, QrCode, MessageSquare } from 'lucide-react';

export default function InnovationSection() {
  const innovations = [
    {
      icon: Smartphone,
      title: 'App Móvil Ciudadana',
      description: 'Accede a toda la información de trámites desde tu teléfono, sin importar dónde estés',
      status: 'Disponible',
      color: 'bg-green-500'
    },
    {
      icon: Brain,
      title: 'Asistente de Información',
      description: 'Chatbot que te ayuda a encontrar la información exacta que necesitas',
      status: 'Beta',
      color: 'bg-purple-500'
    },
    {
      icon: QrCode,
      title: 'Códigos QR Informativos',
      description: 'Escanea y accede instantáneamente a información detallada de cualquier trámite',
      status: 'Próximamente',
      color: 'bg-blue-500'
    },
    {
      icon: Shield,
      title: 'Verificación de Información',
      description: 'Sistema de verificación ciudadana para mantener la información actualizada',
      status: 'En desarrollo',
      color: 'bg-orange-500'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Información Instantánea',
      description: 'Búsqueda inteligente que te conecta con la información que necesitas al instante'
    },
    {
      icon: MessageSquare,
      title: 'Comunidad Activa',
      description: 'Red de ciudadanos que comparten experiencias y actualizan información constantemente'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Innovación Ciudadana para la Transparencia
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Red Ciudadana utiliza tecnología para democratizar el acceso a la información 
            y empoderar a los ciudadanos con conocimiento sobre sus derechos y procesos
          </p>
        </div>

        {/* Innovation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {innovations.map((innovation, index) => {
            const IconComponent = innovation.icon;
            return (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all hover:scale-105 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${innovation.color} p-3 rounded-xl`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                    {innovation.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{innovation.title}</h3>
                <p className="text-blue-100 text-sm">{innovation.description}</p>
              </div>
            );
          })}
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-blue-600 p-3 rounded-xl flex-shrink-0">
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-blue-100">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-4">¿Quieres ser parte del cambio?</h3>
            <p className="text-blue-100 mb-6">
              Únete a Red Ciudadana y ayuda a otros ciudadanos compartiendo tu experiencia y conocimiento
            </p>
            <button className="bg-white text-blue-800 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Únete a Red Ciudadana
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}