import React, { useState, useEffect } from 'react';
import { X, Sparkles, Search, Target, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PromoPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const hasSeenPromo = localStorage.getItem('hasSeenPromo');
    const lastSeenDate = localStorage.getItem('promoLastSeen');
    const today = new Date().toDateString();

    if (!hasSeenPromo || lastSeenDate !== today) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('hasSeenPromo', 'true');
      localStorage.setItem('promoLastSeen', new Date().toDateString());
    }, 300);
  };

  const handleClick = () => {
    localStorage.setItem('hasSeenPromo', 'true');
    localStorage.setItem('promoLastSeen', new Date().toDateString());
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isAnimating
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0'
      }`}
    >
      <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-2xl shadow-2xl overflow-hidden max-w-sm">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 text-white rounded-full p-1.5 transition-all z-10"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative p-6 pb-4">
          <div className="absolute top-0 right-0 opacity-10">
            <Sparkles className="w-32 h-32" />
          </div>

          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-yellow-400 rounded-full p-2 animate-pulse">
                <Sparkles className="w-5 h-5 text-red-900" />
              </div>
              <span className="bg-yellow-400 text-red-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Nuevo
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              Descubre Nuestras Nuevas Funcionalidades
            </h3>
            <p className="text-red-100 text-sm mb-4">
              Hemos mejorado tu experiencia con herramientas poderosas
            </p>

            <div className="space-y-3 mb-5">
              <Link
                to="/categorias"
                onClick={handleClick}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 p-3 rounded-lg transition-all group"
              >
                <div className="bg-white/20 rounded-lg p-2 group-hover:scale-110 transition-transform">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm">Categorías</div>
                  <div className="text-red-100 text-xs">Explora por temas</div>
                </div>
                <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                to="/experiencias"
                onClick={handleClick}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 p-3 rounded-lg transition-all group"
              >
                <div className="bg-white/20 rounded-lg p-2 group-hover:scale-110 transition-transform">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm">Experiencias Guiadas</div>
                  <div className="text-red-100 text-xs">Alcanza tus metas</div>
                </div>
                <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                to="/observatorio"
                onClick={handleClick}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 p-3 rounded-lg transition-all group"
              >
                <div className="bg-white/20 rounded-lg p-2 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm">Observatorio</div>
                  <div className="text-red-100 text-xs">Estadísticas en tiempo real</div>
                </div>
                <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-black/20 px-6 py-3 text-center">
          <button
            onClick={handleClose}
            className="text-white text-xs hover:text-red-100 transition-colors underline"
          >
            No mostrar hoy
          </button>
        </div>

        <div className="absolute -bottom-2 -left-2 w-24 h-24 bg-yellow-400 rounded-full opacity-10 blur-2xl"></div>
        <div className="absolute -top-2 -right-2 w-24 h-24 bg-white rounded-full opacity-10 blur-2xl"></div>
      </div>
    </div>
  );
}
