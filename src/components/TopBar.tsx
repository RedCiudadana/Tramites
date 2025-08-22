import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';
import logo from '../assets/logoredblanco.png';

export default function TopBar() {
  return (
    <div className="bg-gray-900 text-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
          {/* Contact Info */}
          <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <div className="flex items-center space-x-1">
              <img width={'25px'} src={logo}/>
            </div>
            <div className="flex items-center space-x-1">
              <span>Sitio oficial de la Asociación Civil Red Ciudadana</span>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-1">
            <a
              href="https://facebook.com/redciudadanagt"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:bg-gray-800 rounded transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com/redciudadanagt"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:bg-gray-800 rounded transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com/redciudadanagt"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:bg-gray-800 rounded transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com/@redciudadanagt"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:bg-gray-800 rounded transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}