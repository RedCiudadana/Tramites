import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import CatalogPage from '../pages/CatalogPage';
import ProcedureDetailPage from '../pages/ProcedureDetailPage';
import ObservatoryPage from '../pages/ObservatoryPage';
import AssistantPage from '../pages/AssistantPage';
import HelpPage from '../pages/HelpPage';
import TermsPage from '../pages/TermsPage';
import PrivacyPage from '../pages/PrivacyPage';
import AccessibilityPage from '../pages/AccessibilityPage';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/catalogo/:category" element={<CatalogPage />} />
          <Route path="/tramite/:id" element={<ProcedureDetailPage />} />
          <Route path="/observatorio" element={<ObservatoryPage />} />
          <Route path="/asistente-tramites" element={<AssistantPage />} />
          <Route path="/ayuda" element={<HelpPage />} />
          <Route path="/terminos" element={<TermsPage />} />
          <Route path="/privacidad" element={<PrivacyPage />} />
          <Route path="/accesibilidad" element={<AccessibilityPage />} />
          <Route path="/acerca-de" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;