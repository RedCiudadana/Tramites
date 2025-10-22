import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import CatalogPage from '../pages/CatalogPage';
import CategoriesPage from '../pages/CategoriesPage';
import ProcedureDetailPage from '../pages/ProcedureDetailPage';
import InstitutionsPage from '../pages/InstitutionsPage';
import InstitutionDetailPage from '../pages/InstitutionDetailPage';
import ObservatoryPage from '../pages/ObservatoryPage';
import AssistantPage from '../pages/AssistantPage';
import ExperiencesPage from '../pages/ExperiencesPage';
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
          <Route path="/categorias" element={<CategoriesPage />} />
          <Route path="/tramite/:id" element={<ProcedureDetailPage />} />
          <Route path="/procedures/:id" element={<ProcedureDetailPage />} />
          <Route path="/instituciones" element={<InstitutionsPage />} />
          <Route path="/institutions" element={<InstitutionsPage />} />
          <Route path="/instituciones/:id" element={<InstitutionDetailPage />} />
          <Route path="/institutions/:id" element={<InstitutionDetailPage />} />
          <Route path="/observatorio" element={<ObservatoryPage />} />
          <Route path="/asistente-tramites" element={<AssistantPage />} />
          <Route path="/experiencias" element={<ExperiencesPage />} />
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