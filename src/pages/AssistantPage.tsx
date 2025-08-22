import React from 'react';
import ObservatoryChatbot from '../components/assistant/ObservatoryChatbot';
import HeroSlider from '../components/common/HeroSlider';

const AssistantPage: React.FC = () => {
  const assistantSlides = [
    {
      id: '1',
      title: 'Asistente de Trámites',
      subtitle: 'Tu Guía Inteligente 24/7',
      description: 'Pregúntame sobre cualquier trámite gubernamental. Te ayudo con requisitos, tiempos, instituciones y pasos detallados para completar tus gestiones.',
      backgroundImage: '',
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: 'text-white',
      buttonText: 'Comenzar Chat',
      buttonAction: () => {
        const element = document.getElementById('assistant-content');
        element?.scrollIntoView({ behavior: 'smooth' });
      },
      stats: [
        { label: 'Consultas Resueltas', value: '25K+' },
        { label: 'Disponibilidad', value: '24/7' },
        { label: 'Tiempo de Respuesta', value: '<5 seg' },
        { label: 'Satisfacción', value: '98%' }
      ]
    },
    {
      id: '2',
      title: 'Inteligencia Artificial',
      subtitle: 'Respuestas Precisas y Actualizadas',
      description: 'Utilizo la base de datos más completa de trámites guatemaltecos, constantemente actualizada por el equipo de Red Ciudadana.',
      backgroundImage: '',
      backgroundColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      textColor: 'text-white',
      buttonText: 'Explorar Capacidades',
      buttonAction: () => {
        const element = document.getElementById('features-section');
        element?.scrollIntoView({ behavior: 'smooth' });
      },
      stats: [
        { label: 'Base de Conocimiento', value: '500+ Trámites' },
        { label: 'Instituciones', value: '50+' },
        { label: 'Actualizaciones', value: 'Diarias' },
        { label: 'Idiomas', value: 'Español' }
      ]
    },
    {
      id: '3',
      title: 'Asistencia Personalizada',
      subtitle: 'Adaptado a Tus Necesidades',
      description: 'Ya seas persona individual o empresa, te proporciono información específica y relevante para tu situación particular.',
      backgroundImage: '',
      backgroundColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      textColor: 'text-white',
      buttonText: 'Iniciar Conversación',
      buttonAction: () => {
        const chatInput = document.querySelector('input[placeholder*="pregunta"]') as HTMLInputElement;
        if (chatInput) {
          chatInput.focus();
          chatInput.value = '¿Cómo puedes ayudarme?';
        }
      },
      stats: [
        { label: 'Tipos de Usuario', value: 'Persona/Empresa' },
        { label: 'Categorías', value: '6 Principales' },
        { label: 'Preguntas Frecuentes', value: '200+' },
        { label: 'Casos de Uso', value: 'Ilimitados' }
      ]
    }
  ];

  return (
    <>
      <HeroSlider 
        slides={assistantSlides}
        height="h-[500px]"
        autoPlay={true}
        autoPlayInterval={6000}
      />
      <div id="assistant-content">
        <ObservatoryChatbot />
      </div>
    </>
  );
};

export default AssistantPage;