import React, { useState } from 'react';
import { MessageCircle, X, Send, User, Bot, Search, Building2, Clock, FileText } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  relatedProcedures?: string[];
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: '¿Qué es Red Ciudadana?',
    answer: 'Red Ciudadana es una organización de sociedad civil que recopila, verifica y organiza información sobre trámites gubernamentales para facilitar el acceso ciudadano a los servicios públicos. Nuestro objetivo es empoderar a los ciudadanos con información clara y completa.',
    category: 'identidad',
    relatedProcedures: []
  },
  {
    id: '2',
    question: '¿Cómo funciona el portal de información?',
    answer: 'Nuestro portal organiza información verificada sobre trámites gubernamentales. Puedes buscar por categorías, usar nuestro buscador inteligente, o consultar el observatorio ciudadano para ver análisis de eficiencia de procesos.',
    category: 'negocios',
    relatedProcedures: []
  },
  {
    id: '3',
    question: '¿La información está actualizada?',
    answer: 'Sí, nuestro equipo de investigación ciudadana verifica y actualiza constantemente la información. También contamos con una red de colaboradores que nos ayudan a mantener los datos al día.',
    category: 'justicia',
    relatedProcedures: []
  },
  {
    id: '4',
    question: '¿Puedo realizar trámites directamente aquí?',
    answer: 'No, este portal es únicamente informativo. Te proporcionamos toda la información necesaria para que llegues preparado a las oficinas gubernamentales o portales oficiales donde debes realizar tu trámite.',
    category: 'salud'
  },
  {
    id: '5',
    question: '¿Qué es el Observatorio Ciudadano?',
    answer: 'Es nuestro sistema de análisis independiente que evalúa la eficiencia y accesibilidad de los procesos gubernamentales desde la perspectiva ciudadana, midiendo tiempos, satisfacción y nivel de digitalización.',
    category: 'educacion'
  },
  {
    id: '6',
    question: '¿Cómo puedo contribuir con información?',
    answer: 'Puedes reportar cambios en procesos, compartir tu experiencia, verificar información existente, o contactarnos con actualizaciones. Tu contribución ayuda a mantener la información actualizada para todos.',
    category: 'vivienda'
  }
];

const quickActions = [
  { icon: Search, label: 'Buscar información', action: 'search' },
  { icon: Building2, label: 'Ver observatorio', action: 'observatory' },
  { icon: Clock, label: 'Categorías', action: 'categories' },
  { icon: FileText, label: 'Centro de ayuda', action: 'help' }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      message: '¡Hola! Soy el asistente de Red Ciudadana. ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre trámites, instituciones o usar las opciones rápidas.',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showFAQs, setShowFAQs] = useState(true);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setShowFAQs(false);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        message: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Check for Red Ciudadana specific keywords
    if (input.includes('red ciudadana') || input.includes('organizacion') || input.includes('que es')) {
      return 'Red Ciudadana es una organización de sociedad civil que trabaja por la transparencia y el acceso a la información pública. Recopilamos y verificamos información sobre trámites gubernamentales para empoderar a los ciudadanos. ¿Te gustaría saber más sobre algún servicio específico?';
    }
    
    if (input.includes('observatorio') || input.includes('analisis') || input.includes('eficiencia')) {
      return 'Nuestro Observatorio Ciudadano analiza la eficiencia de los procesos gubernamentales desde la perspectiva ciudadana. Evaluamos digitalización, tiempos, satisfacción y accesibilidad. ¿Te interesa ver el análisis de algún trámite específico?';
    }
    
    if (input.includes('informacion') || input.includes('actualizada') || input.includes('verificada')) {
      return 'Toda nuestra información es verificada por nuestro equipo de investigación ciudadana y actualizada constantemente. También contamos con una red de colaboradores que nos ayudan a mantener los datos al día. ¿Buscas información sobre algún trámite específico?';
    }
    
    if (input.includes('tramite') || input.includes('proceso') || input.includes('documentos')) {
      return 'Tenemos información detallada sobre más de 120 trámites organizados por categorías: identidad, negocios, vivienda, educación, salud y justicia. Cada trámite incluye requisitos, pasos y tiempos estimados. ¿Qué tipo de trámite te interesa?';
    }
    
    if (input.includes('contribuir') || input.includes('ayudar') || input.includes('colaborar')) {
      return 'Puedes contribuir de varias formas: reportando cambios en procesos, compartiendo tu experiencia con trámites, verificando información existente, o contactándonos con actualizaciones. Tu participación fortalece nuestra comunidad informada. ¿Te interesa alguna forma específica de colaborar?';
    }
    
    if (input.includes('contacto') || input.includes('ayuda') || input.includes('soporte')) {
      return 'Puedes contactarnos por teléfono (+502 2440-0000), correo (info@redciudadana.org.gt), o seguirnos en redes sociales. También tenemos un centro de ayuda completo con preguntas frecuentes. ¿Necesitas ayuda con algo específico?';
    }
    
    // Default response
    return 'Como asistente de Red Ciudadana, puedo ayudarte a encontrar información sobre trámites gubernamentales, explicarte cómo funciona nuestro observatorio, o guiarte sobre cómo contribuir con la comunidad. ¿En qué puedo ayudarte específicamente?';
  };

  const handleFAQClick = (faq: FAQ) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: faq.question,
      timestamp: new Date()
    };

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      message: faq.answer,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setShowFAQs(false);
  };

  const handleQuickAction = (action: string) => {
    let response = '';
    switch (action) {
      case 'search':
        response = 'Puedes usar el buscador en la parte superior de la página para encontrar información sobre cualquier trámite. También puedes navegar por categorías o preguntarme directamente. ¿Qué información necesitas?';
        break;
      case 'observatory':
        response = 'El Observatorio Ciudadano analiza la eficiencia de procesos gubernamentales evaluando digitalización, tiempos, satisfacción y accesibilidad. Puedes ver análisis detallados y comparaciones. ¿Te interesa algún análisis específico?';
        break;
      case 'categories':
        response = 'Organizamos la información en 6 categorías: Identidad, Negocios, Vivienda, Educación, Salud y Justicia. Cada categoría contiene trámites relacionados con información completa y verificada. ¿Qué categoría te interesa explorar?';
        break;
      case 'help':
        response = 'Nuestro Centro de Ayuda incluye preguntas frecuentes, guías de uso, información de contacto y recursos adicionales. También puedes contribuir reportando cambios o compartiendo experiencias. ¿Necesitas ayuda con algo específico?';
        break;
    }

    const botMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'bot',
      message: response,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setShowFAQs(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-GT', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-full shadow-xl hover:from-blue-500 hover:to-blue-400 transition-all hover:scale-110 transform"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Asistente Red Ciudadana</h3>
                  <p className="text-xs opacity-90">En línea</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Bot className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div className={`p-3 rounded-2xl ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* FAQ Suggestions */}
            {showFAQs && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 font-medium">Preguntas frecuentes:</p>
                <div className="grid gap-2">
                  {faqs.slice(0, 4).map((faq) => (
                    <button
                      key={faq.id}
                      onClick={() => handleFAQClick(faq)}
                      className="text-left p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-xs text-blue-800"
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>

                <p className="text-sm text-gray-600 font-medium mt-4">Acciones rápidas:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => {
                    const IconComponent = action.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(action.action)}
                        className="flex items-center space-x-1 p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-xs text-gray-700"
                      >
                        <IconComponent className="h-4 w-4" />
                        <span>{action.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Pregúntame sobre Red Ciudadana..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <button
                onClick={() => setShowFAQs(true)}
                className="text-xs text-blue-600 hover:text-blue-700"
              >
                Ver preguntas frecuentes
              </button>
              <p className="text-xs text-gray-500">
                Presiona Enter para enviar
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}