import React from 'react';
import HeroSection from '../components/home/HeroSection';
import PopularProceduresSection from '../components/home/PopularProceduresSection';
import CategoriesSection from '../components/home/CategoriesSection';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <PopularProceduresSection />
      <CategoriesSection />
    </>
  );
};

export default HomePage;