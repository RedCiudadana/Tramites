import React from 'react';
import { Search, Menu, MessageCircle } from 'lucide-react';
import logo from '../assets/logorednegro.png';

interface HeaderProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  onSearchOpen: () => void;
}

export default function Header({ currentSection, onSectionChange, onSearchOpen }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'catalogo', label: 'Catálogo de Trámites' },
    { id: 'observatorio', label: 'Observatorio' },
    { id: 'asistente-tramites', label: 'Asistente de Trámites' },
    { id: 'ayuda', label: 'Ayuda' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => onSectionChange('inicio')}>
            <img src={logo}/>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentSection === item.id
                    ? 'bg-blue-50 text-blue-800 shadow-sm'
                    : 'text-gray-700 hover:text-blue-800 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onSearchOpen}
              className="p-2.5 text-gray-400 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors md:hidden"
            >
              <Search className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 text-gray-400 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 bg-white">
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left px-4 py-3 text-sm font-medium transition-colors rounded-lg ${
                    currentSection === item.id
                      ? 'text-blue-800 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-800 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-gradient-to-r from-green-500 to-green-400 text-white p-4 rounded-full shadow-xl hover:from-green-400 hover:to-green-300 transition-all hover:scale-110 transform animate-pulse">
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}