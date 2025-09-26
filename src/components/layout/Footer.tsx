import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Music2, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logored.png';
import European from '../../assets/european.png';
import Indico from '../../assets/indico.png'

export default function Footer() {
  return (
    <footer>
      <div className='bg-white my-8'>
        <div className='m-auto'>
          <div className='text-center mb-4'>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Con el apoyo de:
            </h2>
          </div>
          <div className='flex justify-center align-center mt-8 mb-16'>
            <img style={{width: '300px', height: '95px'}} src={European}/>
            <img style={{width: '300px', height: '95px'}} className='ml-4' src={Indico}/>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <img src={logo} alt="Red Ciudadana" />
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Organización de sociedad civil que recopila información sobre trámites 
                gubernamentales para facilitar el acceso ciudadano a los servicios públicos.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/Redciudadanagt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/redxguate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/redxguate/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.tiktok.com/@redxguate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Music2 className="h-5 w-5" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCQwc62j7beStZYFzwPxBEQg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Información</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/catalogo" className="hover:text-white transition-colors">Catálogo de Información</Link></li>
                <li><Link to="/observatorio" className="hover:text-white transition-colors">Observatorio</Link></li>
                <li><Link to="/acerca-de" className="hover:text-white transition-colors">Acerca de Red Ciudadana</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <ul className="space-y-3 text-gray-400">
                {/* <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+502 2440-0000</span>
                </li> */}
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@redciudadana.org.gt</span>
                </li>
                <li className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <span>Zona 10, Ciudad de Guatemala</span>
                </li>
              </ul>
              
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white flex justify-center align-center">
        <div className="my-4 py-4">
          <div className="text-sm mb-4 md:mb-0" style={{ fontSize: '16px' }}>
            © 2025 Asociación Red Ciudadana 2025
          </div>
        </div>
      </div>
    </footer>
  );
}