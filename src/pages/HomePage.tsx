import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CategoriesSection from '../components/home/CategoriesSection';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
    </>
  );
};

export default HomePage;