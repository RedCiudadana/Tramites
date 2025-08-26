import React from 'react';
import { ArrowLeft, ChevronRight, ExternalLink, Building2, Clock, User, Users, Star, ThumbsUp, MessageCircle, Send, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Procedure } from '../../types';
import { useComments } from '../../hooks/useComments';

interface ProcedureDetailProps {
  procedure: Procedure;
}

const institutionInfo: Record<string, any> = {
  'RENAP': {
    fullName: 'Registro Nacional de las Personas',
    website: 'https://www.renap.gob.gt',
    address: '6a Avenida 4-64, Zona 4, Ciudad de Guatemala',
    phone: '1551'
  },
  'Registro Mercantil': {
    fullName: 'Registro Mercantil General de la República',
    website: 'https://www.registromercantil.gob.gt',
    address: '7a Avenida 7-61, Zona 4, Ciudad de Guatemala',
    phone: '2412-0000'
  },
  'Municipalidad': {
    fullName: 'Municipalidades de Guatemala',
    website: 'https://www.infom.gob.gt',
    address: 'Varía según municipio',
    phone: 'Varía según municipio'
  },
  'USAC': {
    fullName: 'Universidad de San Carlos de Guatemala',
    website: 'https://www.usac.edu.gt',
    address: 'Ciudad Universitaria, Zona 12, Ciudad de Guatemala',
    phone: '2418-8000'
  },
  'MSPAS': {
    fullName: 'Ministerio de Salud Pública y Asistencia Social',
    website: 'https://www.mspas.gob.gt',
    address: '6a Avenida 3-45, Zona 11, Ciudad de Guatemala',
    phone: '2440-4747'
  },
  'Organismo Judicial': {
    fullName: 'Organismo Judicial de Guatemala',
    website: 'https://www.oj.gob.gt',
    address: '21 Calle 7-70, Zona 1, Ciudad de Guatemala',
    phone: '2248-5555'
  }
};

export default function ProcedureDetail({ procedure }: ProcedureDetailProps) {
  const navigate = useNavigate();
  const { comments, loading, error, addComment, markHelpful } = useComments(procedure.id);
  const [showCommentForm, setShowCommentForm] = React.useState(false);
  const [newComment, setNewComment] = React.useState({
    author_name: '',
    author_email: '',
    rating: 5,
    comment: ''
  });
  const [submitting, setSubmitting] = React.useState(false);

  const institution = institutionInfo[procedure.institution] || {};
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'digital': return '💻';
      case 'presencial': return '🏢';
      case 'mixto': return '🔄';
      default: return '📄';
    }
  };

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'digital': return 'bg-green-100 text-green-800';
      case 'presencial': return 'bg-blue-100 text-blue-800';
      case 'mixto': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleGoToInstitution = () => {
    if (institution.website) {
      window.open(institution.website, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.author_name.trim() || !newComment.comment.trim()) return;

    setSubmitting(true);
    const result = await addComment({
      author_name: newComment.author_name,
      author_email: newComment.author_email || undefined,
      rating: newComment.rating,
      comment: newComment.comment
    });

    if (result.success) {
      setNewComment({ author_name: '', author_email: '', rating: 5, comment: '' });
      setShowCommentForm(false);
    }
    setSubmitting(false);
  };

  const handleMarkHelpful = async (commentId: string) => {
    await markHelpful(commentId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-GT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const averageRating = comments.length > 0 
    ? comments.reduce((sum, comment) => sum + comment.rating, 0) / comments.length 
    : 0;
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-800 transition-colors">
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/catalogo" className="hover:text-blue-800 transition-colors">
            Catálogo de Trámites
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">
            {procedure.name}
          </span>
        </nav>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          {/* Back Button */}
          <button
            onClick={() => navigate('/catalogo')}
            className="flex items-center space-x-2 text-blue-800 hover:text-blue-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Volver al catálogo</span>
          </button>
          
          {/* Title and Basic Info */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {procedure.name}
            </h1>
            
            {/* Status Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(procedure.type)}`}>
                <span className="mr-1">{getTypeIcon(procedure.type)}</span>
                {procedure.type.charAt(0).toUpperCase() + procedure.type.slice(1)}
              </span>
              
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <Building2 className="h-4 w-4 mr-1" />
                {procedure.institution}
              </span>
              
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                <Clock className="h-4 w-4 mr-1" />
                {procedure.duration}
              </span>
              
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                {procedure.userType === 'persona' ? (
                  <User className="h-4 w-4 mr-1" />
                ) : procedure.userType === 'empresa' ? (
                  <Building2 className="h-4 w-4 mr-1" />
                ) : (
                  <Users className="h-4 w-4 mr-1" />
                )}
                <span className="capitalize">{procedure.userType}</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Descripción del Trámite
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {procedure.fullDescription || procedure.description}
              </p>
            </div>
          </div>

          {/* Institution Button */}
          <div className="text-center">
            <button
              onClick={handleGoToInstitution}
              disabled={!institution.website}
              className={`inline-flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 ${
                institution.website
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Building2 className="h-6 w-6" />
              <span>
                {institution.website 
                  ? `Ir a ${institution.fullName || procedure.institution}`
                  : 'Portal no disponible'
                }
              </span>
              {institution.website && <ExternalLink className="h-5 w-5" />}
            </button>
            
            {institution.website && (
              <p className="text-sm text-gray-600 mt-3">
                Te dirigirá al portal oficial de {institution.fullName || procedure.institution}
              </p>
            )}
            
            {!institution.website && (
              <p className="text-sm text-gray-500 mt-3">
                Este trámite debe realizarse de forma presencial
              </p>
            )}
          </div>

          {/* Institution Contact Info */}
          {(institution.address || institution.phone) && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Información de Contacto
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {institution.address && (
                  <p className="text-gray-700 mb-2">
                    <strong>Dirección:</strong> {institution.address}
                  </p>
                )}
                {institution.phone && (
                  <p className="text-gray-700">
                    <strong>Teléfono:</strong> {institution.phone}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Comments and Experiences Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Experiencias y Comentarios
              </h3>
              {comments.length > 0 && (
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {renderStars(Math.round(averageRating))}
                    </div>
                    <span className="font-medium">{averageRating.toFixed(1)}</span>
                    <span>({comments.length} {comments.length === 1 ? 'comentario' : 'comentarios'})</span>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowCommentForm(!showCommentForm)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Compartir Experiencia</span>
            </button>
          </div>

          {/* Comment Form */}
          {showCommentForm && (
            <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-4">Comparte tu experiencia</h4>
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      value={newComment.author_name}
                      onChange={(e) => setNewComment(prev => ({ ...prev, author_name: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email (opcional)
                    </label>
                    <input
                      type="email"
                      value={newComment.author_email}
                      onChange={(e) => setNewComment(prev => ({ ...prev, author_email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Calificación *
                  </label>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setNewComment(prev => ({ ...prev, rating: i + 1 }))}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-6 w-6 ${i < newComment.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {newComment.rating} de 5 estrellas
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tu experiencia *
                  </label>
                  <textarea
                    value={newComment.comment}
                    onChange={(e) => setNewComment(prev => ({ ...prev, comment: e.target.value }))}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Comparte tu experiencia con este trámite: ¿fue fácil? ¿qué documentos necesitaste realmente? ¿cuánto tiempo tomó?"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCommentForm(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !newComment.author_name.trim() || !newComment.comment.trim()}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="h-4 w-4" />
                    <span>{submitting ? 'Enviando...' : 'Publicar Experiencia'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Comments List */}
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Cargando comentarios...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-red-800">Error al cargar comentarios: {error}</p>
              </div>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                Sé el primero en compartir tu experiencia
              </h4>
              <p className="text-gray-600 mb-4">
                Ayuda a otros ciudadanos compartiendo cómo fue tu experiencia con este trámite
              </p>
              <button
                onClick={() => setShowCommentForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Compartir Experiencia
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h5 className="font-semibold text-gray-900">{comment.author_name}</h5>
                        {comment.is_verified && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            Verificado
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          {renderStars(comment.rating)}
                        </div>
                        <span className="text-sm text-gray-600">
                          {formatDate(comment.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {comment.comment}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleMarkHelpful(comment.id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-sm">
                        Útil ({comment.helpful_count})
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}