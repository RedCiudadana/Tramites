import React from 'react';
import ObservatoryDashboard from '../components/observatory/ObservatoryDashboard';
import HeroSlider from '../components/common/HeroSlider';
import { observatoryData } from '../data/observatory';

const ObservatoryPage: React.FC = () => {
  const observatorySlides = [
    {
      id: '1',
      title: 'Observatorio Ciudadano',
      subtitle: 'Análisis Independiente de Trámites',
      description: 'Evaluamos la eficiencia y accesibilidad de los procesos gubernamentales desde la perspectiva ciudadana, midiendo digitalización, tiempos y satisfacción.',
      backgroundImage: '',
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: 'text-white',
      buttonText: 'Ver Dashboard',
      buttonAction: () => {
        const element = document.getElementById('observatory-content');
        element?.scrollIntoView({ behavior: 'smooth' });
      },
      stats: [
        { label: 'Trámites Analizados', value: observatoryData.length.toString() },
        { label: 'Evaluación Promedio', value: Math.round(observatoryData.reduce((sum, item) => sum + item.evaluationScore, 0) / observatoryData.length) + '%' },
        { label: 'Usuarios Mensuales', value: '125K+' },
        { label: 'Instituciones', value: '15+' }
      ]
    },
    {
      id: '2',
      title: 'Metodología Rigurosa',
      subtitle: 'Evaluación Basada en Evidencia',
      description: 'Utilizamos una metodología científica para evaluar cada trámite en 6 dimensiones clave: digitalización, simplificación, interoperabilidad, trazabilidad, accesibilidad y satisfacción.',
      backgroundImage: '',
      backgroundColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      textColor: 'text-white',
      buttonText: 'Conocer Metodología',
      buttonAction: () => {
        const element = document.getElementById('methodology-section');
        element?.scrollIntoView({ behavior: 'smooth' });
      },
      stats: [
        { label: 'Dimensiones', value: '6' },
        { label: 'Indicadores', value: '24' },
        { label: 'Escala', value: '0-5' },
        { label: 'Actualizaciones', value: 'Trimestrales' }
      ]
    },
    {
      id: '3',
      title: 'Impacto Ciudadano',
      subtitle: 'Transformando la Administración Pública',
      description: 'Nuestros análisis han contribuido a mejorar procesos gubernamentales, reducir tiempos de espera y aumentar la satisfacción ciudadana.',
      backgroundImage: '',
      backgroundColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      textColor: 'text-white',
      buttonText: 'Ver Casos de Éxito',
      buttonAction: () => {
        const element = document.getElementById('success-cases');
        element?.scrollIntoView({ behavior: 'smooth' });
      },
      stats: [
        { label: 'Mejoras Implementadas', value: '45+' },
        { label: 'Tiempo Ahorrado', value: '2.5M hrs' },
        { label: 'Satisfacción Mejorada', value: '+35%' },
        { label: 'Procesos Digitalizados', value: '28' }
      ]
    }
  ];

  return (
    <>
      <HeroSlider 
        slides={observatorySlides}
        height="h-[500px]"
        autoPlay={true}
        autoPlayInterval={7000}
      />
      <div id="observatory-content">
        <ObservatoryDashboard />
      </div>
    </>
  );
};

export default ObservatoryPage;