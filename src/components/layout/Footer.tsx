import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logored.png';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img src={logo} alt="Red Ciudadana" />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Organización de sociedad civil que recopila y verifica información sobre trámites 
              gubernamentales para facilitar el acceso ciudadano a los servicios públicos.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Información</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/catalogo" className="hover:text-white transition-colors">Catálogo de Información</Link></li>
              <li><Link to="/observatorio" className="hover:text-white transition-colors">Observatorio</Link></li>
              <li><Link to="/base-datos" className="hover:text-white transition-colors">Base de Datos</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Sobre Red Ciudadana</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cómo Contribuir</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+502 2440-0000</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@redciudadana.org.gt</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Zona 1, Ciudad de Guatemala</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h5 className="font-medium mb-2">Horarios de Atención</h5>
              <p className="text-sm text-gray-400">
                Lunes a Viernes: 8:00 AM - 5:00 PM<br/>
                Información disponible 24/7 en línea
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Red Ciudadana Guatemala. Organización de sociedad civil.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link to="/terminos" className="hover:text-white transition-colors">
                Términos y Condiciones
              </Link>
              <Link to="/privacidad" className="hover:text-white transition-colors">
                Política de Privacidad
              </Link>
              <Link to="/accesibilidad" className="hover:text-white transition-colors">
                Accesibilidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}