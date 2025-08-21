import React, { useState } from 'react';
import { FileText, Clock, Shield } from 'lucide-react';
import TopBar from './components/TopBar';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import CategoriesSection from './components/CategoriesSection';
import QuickActions from './components/QuickActions';
import InnovationSection from './components/InnovationSection';
import CitizenFeedback from './components/CitizenFeedback';
import ProcedureCatalog from './components/ProcedureCatalog';
import ProcedureDetail from './components/ProcedureDetail';
import ProcedureForm from './components/ProcedureForm';
import ObservatoryDashboard from './components/ObservatoryDashboard';
import ObservatoryChatbot from './components/ObservatoryChatbot';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import Chatbot from './components/Chatbot';
import HelpPage from './components/HelpPage';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import Accessibility from './components/Accessibility';
import GDPRBottomBar from './components/GDPRBottomBar';
import { Procedure, FormData } from './types';
import ScrollToTop from './components/scrolltotop';
import ScrollTopButton from './components/scrolltotopButton';

function App() {
  const [currentSection, setCurrentSection] = useState('inicio');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('');
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
  };

  const handleProcedureSelect = (procedure: Procedure) => {
    setSelectedProcedure(procedure);
  };

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    if (section === 'inicio') {
      setSearchQuery('');
      setSelectedCategory('');
      setSelectedProcedure(null);
    }
  };

  const handleBack = () => {
    if (currentSection === 'tramite-detalle') {
      setCurrentSection('catalogo');
    } else if (currentSection === 'formulario') {
      setCurrentSection('tramite-detalle');
    }
  };

  const handleFormSubmit = (formData: FormData) => {
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'catalogo':
        return (
          <ProcedureCatalog
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onProcedureSelect={handleProcedureSelect}
            onSectionChange={handleSectionChange}
          />
        );
      case 'observatorio':
        return <ObservatoryDashboard />;
      case 'asistente-tramites':
        return <ObservatoryChatbot />;
      case 'tramite-detalle':
        return selectedProcedure ? (
          <ProcedureDetail
            procedure={selectedProcedure}
            onBack={handleBack}
            onStartProcedure={handleProcedureSelect}
            onSectionChange={handleSectionChange}
          />
        ) : null;
      case 'formulario':
        return selectedProcedure ? (
          <ProcedureForm
            procedure={selectedProcedure}
            onBack={handleBack}
            onSubmit={handleFormSubmit}
            onSectionChange={handleSectionChange}
          />
        ) : null;
      case 'ayuda':
        return <HelpPage />;
      case 'terminos':
        return <TermsAndConditions />;
      case 'privacidad':
        return <PrivacyPolicy />;
      case 'accesibilidad':
        return <Accessibility />;
      default:
        return (
          <>
            <HeroSection 
              onSearch={handleSearch} 
              onSectionChange={handleSectionChange}
            />
            <CategoriesSection 
              onCategorySelect={handleCategorySelect}
              onSectionChange={handleSectionChange}
            />
            <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  {/* Benefits */}
                  <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="flex flex-col items-center text-center group">
                      <div className="bg-gradient-to-br from-blue-600 to-blue-500 p-6 rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-xl">
                        <FileText className="h-10 w-10" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">Información Completa</h3>
                      <p className="text-blue-200 leading-relaxed">
                        Todos los requisitos, pasos y documentos necesarios organizados de forma clara y comprensible
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center group">
                      <div className="bg-gradient-to-br from-green-600 to-green-500 p-6 rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-xl">
                        <Clock className="h-10 w-10" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">Ahorra Tiempo</h3>
                      <p className="text-blue-200 leading-relaxed">
                        Llega preparado a las oficinas con toda la información y documentos necesarios
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center group">
                      <div className="bg-gradient-to-br from-purple-600 to-purple-500 p-6 rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-xl">
                        <Shield className="h-10 w-10" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">Información Verificada</h3>
                      <p className="text-blue-200 leading-relaxed">
                        Datos verificados y actualizados constantemente por nuestro equipo de investigación ciudadana
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <InnovationSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        onSearchOpen={() => setIsSearchModalOpen(true)}
      />
      
      <main>
        <ScrollToTop section={currentSection} />
        <ScrollTopButton />
        {renderCurrentSection()}
      </main>

      <Footer onSectionChange={handleSectionChange} />

      <Chatbot />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onProcedureSelect={handleProcedureSelect}
        onSectionChange={handleSectionChange}
      />

      <GDPRBottomBar onSectionChange={handleSectionChange} />
    </div>
  );
}

export default App;