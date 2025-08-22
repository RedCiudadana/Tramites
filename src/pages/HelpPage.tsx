import React from 'react';
import HelpPageComponent from '../components/help/HelpPage';
import HeroSlider from '../components/common/HeroSlider';

const HelpPage: React.FC = () => {
  const helpSlides = [
    {
      id: '1',
      title: 'Centro de Ayuda',
      subtitle: 'Toda la Información que Necesitas',
      description: 'Encuentra respuestas a tus preguntas sobre trámites, instituciones y cómo usar Red Ciudadana para tener éxito en tus gestiones gubernamentales.',
      backgroundImage: '',
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: 'text-white',
      buttonText: 'Explorar Ayuda',
      buttonAction: () => {
        const element = document.getElementById('help-content');
        element?.scrollIntoView({ behavior: 'smooth' });
      },
      stats: [
        { label: 'Preguntas Frecuentes', value: '50+' },
        { label: 'Guías Disponibles', value: '25+' },
        { label: 'Tiempo de Respuesta', value: '<24h' },
        { label: 'Satisfacción', value: '96%' }
      ]
    },
    {
      id: '2',
      title: 'Soporte Especializado',
      subtitle: 'Equipo de Expertos a Tu Servicio',
      description: 'Nuestro equipo de especialistas en trámites gubernamentales está disponible para ayudarte con consultas específicas y casos complejos.',
      backgroundImage: '',
      backgroundColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      textColor: 'text-white',
      buttonText: 'Contactar Soporte',
      buttonAction: () => {
        const element = document.getElementById('contact-section');
        element?.scrollIntoView({ behavior: 'smooth' });
      },
      stats: [
        { label: 'Especialistas', value: '15+' },
        { label: 'Años de Experiencia', value: '10+' },
        { label: 'Casos Resueltos', value: '5K+' },
        { label: 'Canales de Contacto', value: '4' }
      ]
    },
    {
      id: '3',
      title: 'Recursos Educativos',
      subtitle: 'Aprende y Empodérate',
      description: 'Accede a guías detalladas, tutoriales paso a paso y recursos educativos para convertirte en un experto en trámites gubernamentales.',
      backgroundImage: '',
      backgroundColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      textColor: 'text-white',
      buttonText: 'Ver Recursos',
      buttonAction: () => {
        const element = document.getElementById('resources-section');
        element?.scrollIntoView({ behavior: 'smooth' });
      },
      stats: [
        { label: 'Guías Descargables', value: '20+' },
        { label: 'Videos Tutoriales', value: '35+' },
        { label: 'Infografías', value: '50+' },
        { label: 'Actualizaciones', value: 'Semanales' }
      ]
    }
  ];

  return (
    <>
      <HeroSlider 
        slides={helpSlides}
        height="h-[500px]"
        autoPlay={true}
        autoPlayInterval={6500}
      />
      <div id="help-content">
        <HelpPageComponent />
      </div>
    </>
  );
};

export default HelpPage;