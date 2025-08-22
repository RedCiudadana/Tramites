import React, { useState } from 'react';
import { AlertTriangle, X, Send, FileText, Clock, Building2, User } from 'lucide-react';

export default function ReportProblemsButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    problemType: '',
    procedureName: '',
    institution: '',
    description: '',
    contactEmail: '',
    contactName: ''
  });

  const problemTypes = [
    { value: 'outdated-info', label: 'Información desactualizada' },
    { value: 'wrong-requirements', label: 'Requisitos incorrectos' },
    { value: 'changed-process', label: 'Proceso ha cambiado' },
    { value: 'wrong-contact', label: 'Información de contacto incorrecta' },
    { value: 'new-procedure', label: 'Nuevo trámite no listado' },
    { value: 'other', label: 'Otro problema' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aquí se enviaría la información al backend
    console.log('Reporte enviado:', formData);
    
    // Simular envío exitoso
    alert('¡Gracias por tu reporte! Nuestro equipo revisará la información y la actualizará pronto.');
    
    // Limpiar formulario y cerrar modal
    setFormData({
      problemType: '',
      procedureName: '',
      institution: '',
      description: '',
      contactEmail: '',
      contactName: ''
    });
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed right-6 bottom-32 z-40">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-full shadow-xl transition-all hover:scale-110 transform group"
          title="Reportar Problemas"
        >
          <AlertTriangle className="h-6 w-6" />
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Reportar Problemas
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
          </div>
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Reportar Problemas</h2>
                    <p className="text-orange-100 text-sm">Informa sobre cambios en procesos o información desactualizada</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Problem Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="h-4 w-4 inline mr-1" />
                  Tipo de problema *
                </label>
                <select
                  name="problemType"
                  value={formData.problemType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Selecciona el tipo de problema</option>
                  {problemTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Procedure Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Nombre del trámite *
                </label>
                <input
                  type="text"
                  name="procedureName"
                  value={formData.procedureName}
                  onChange={handleInputChange}
                  required
                  placeholder="Ej: Renovación de DPI, Inscripción de empresa..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* Institution */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building2 className="h-4 w-4 inline mr-1" />
                  Institución
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  placeholder="Ej: RENAP, Registro Mercantil, Municipalidad..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción del problema *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Describe detalladamente qué información está incorrecta, qué ha cambiado, o qué problema encontraste..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  Información de contacto (opcional)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="Tu nombre"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="tu@email.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Opcional: Si proporcionas tu contacto, podremos informarte cuando actualicemos la información.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-lg hover:from-orange-700 hover:to-red-700 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Enviar Reporte</span>
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-2xl border-t border-gray-200">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    ¿Por qué es importante reportar problemas?
                  </p>
                  <p className="text-xs text-gray-600">
                    Tu reporte nos ayuda a mantener la información actualizada y precisa para todos los ciudadanos. 
                    Red Ciudadana depende de la colaboración ciudadana para verificar y actualizar constantemente 
                    la información sobre trámites gubernamentales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}