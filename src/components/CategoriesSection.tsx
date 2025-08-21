import React from 'react';
import * as Icons from 'lucide-react';
import { categories } from '../data/procedures';

interface CategoriesSectionProps {
  onCategorySelect: (categoryId: string) => void;
  onSectionChange: (section: string) => void;
}

export default function CategoriesSection({ onCategorySelect, onSectionChange }: CategoriesSectionProps) {
  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId);
    onSectionChange('catalogo');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Categorías de Trámites
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encuentra rápidamente el tipo de trámite que necesitas realizar
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<any>;
            
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 text-center group border border-gray-100"
              >
                <div className="bg-blue-50 text-blue-800 p-4 rounded-full mb-4 mx-auto w-16 h-16 flex items-center justify-center group-hover:bg-blue-800 group-hover:text-white transition-colors">
                  <IconComponent className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} trámites</p>
              </button>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => onSectionChange('catalogo')}
            className="bg-blue-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-900 transition-colors inline-flex items-center space-x-2"
          >
            <span>Ver todos los trámites</span>
            <Icons.ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}