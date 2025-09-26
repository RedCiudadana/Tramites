import React, { useState } from 'react';
import { 
  Database, 
  Code, 
  Server, 
  Download, 
  Eye, 
  Building2, 
  Clock, 
  User, 
  Users,
  FileText,
  Globe,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  GitBranch,
  Settings,
  Zap,
  Shield,
  Link as LinkIcon,
  Copy,
  CheckCircle
} from 'lucide-react';
import { procedures, categories } from '../../data/procedures';

export default function DatabaseView() {
  const [activeTab, setActiveTab] = useState<'schema' | 'variables' | 'api' | 'examples'>('schema');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Estructura de datos principal
  const procedureSchema = {
    id: "string (único)",
    name: "string (nombre del trámite)",
    description: "string (descripción corta)",
    fullDescription: "string (descripción completa)",
    institution: "string (institución responsable)",
    category: "string (categoría del trámite)",
    duration: "string (tiempo estimado)",
    type: "'digital' | 'presencial' | 'mixto'",
    userType: "'persona' | 'empresa' | 'ambos'",
    requirements: "string[] (lista de requisitos)",
    steps: "string[] (pasos del proceso)",
    isDigital: "boolean (si es completamente digital)"
  };

  const categorySchema = {
    id: "string (identificador único)",
    name: "string (nombre de la categoría)",
    icon: "string (nombre del ícono Lucide)",
    count: "number (cantidad de trámites)"
  };

  const commentSchema = {
    id: "string (UUID)",
    procedure_id: "string (ID del trámite)",
    author_name: "string (nombre del autor)",
    author_email: "string | null (email opcional)",
    rating: "number (1-5)",
    comment: "string (texto del comentario)",
    helpful_count: "number (votos útiles)",
    is_verified: "boolean (comentario verificado)",
    created_at: "timestamp",
    updated_at: "timestamp"
  };

  const observatorySchema = {
    id: "string",
    name: "string (nombre del trámite)",
    category: "string (categoría)",
    maturityLevel: "number (0-5)",
    evaluationScore: "number (0-100)",
    evaluationComponents: {
      digitalizacion: "number (0-5)",
      simplificacion: "number (0-5)",
      interoperabilidad: "number (0-5)",
      trazabilidad: "number (0-5)",
      accesibilidad: "number (0-5)",
      satisfaccionUsuario: "number (0-5)"
    },
    averageTime: "string",
    monthlyUsers: "number",
    satisfactionRate: "number (0-100)",
    isDigital: "boolean",
    issues: "string[]",
    recommendations: "string[]",
    lastUpdated: "string (ISO date)"
  };

  const apiEndpoints = [
    {
      method: "GET",
      endpoint: "/api/procedures",
      description: "Obtener todos los trámites",
      params: "?category=string&type=string&search=string",
      response: "Procedure[]"
    },
    {
      method: "GET",
      endpoint: "/api/procedures/:id",
      description: "Obtener un trámite específico",
      params: "id: string",
      response: "Procedure"
    },
    {
      method: "GET",
      endpoint: "/api/categories",
      description: "Obtener todas las categorías",
      params: "ninguno",
      response: "Category[]"
    },
    {
      method: "POST",
      endpoint: "/api/comments",
      description: "Crear nuevo comentario",
      params: "ProcedureComment (sin id, timestamps)",
      response: "ProcedureComment"
    },
    {
      method: "GET",
      endpoint: "/api/comments/:procedureId",
      description: "Obtener comentarios de un trámite",
      params: "procedureId: string",
      response: "ProcedureComment[]"
    },
    {
      method: "GET",
      endpoint: "/api/observatory",
      description: "Obtener datos del observatorio",
      params: "?category=string",
      response: "ObservatoryData[]"
    }
  ];

  const codeExamples = {
    typescript: `// Tipos TypeScript para la aplicación
export interface Procedure {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  institution: string;
  category: string;
  duration: string;
  type: 'digital' | 'presencial' | 'mixto';
  userType: 'persona' | 'empresa' | 'ambos';
  requirements: string[];
  steps: string[];
  isDigital: boolean;
}

export interface ProcedureComment {
  id: string;
  procedure_id: string;
  author_name: string;
  author_email?: string;
  rating: number;
  comment: string;
  helpful_count: number;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}`,
    
    supabase: `-- Estructura de tablas en Supabase
CREATE TABLE procedure_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  procedure_id text NOT NULL,
  author_name text NOT NULL,
  author_email text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  helpful_count integer DEFAULT 0,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE procedure_comments ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Los comentarios son públicos para lectura"
  ON procedure_comments FOR SELECT
  TO public USING (true);

CREATE POLICY "Cualquiera puede crear comentarios"
  ON procedure_comments FOR INSERT
  TO public WITH CHECK (true);`,

    react: `// Hook para consumir datos de trámites
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useProcedures(filters?: {
  category?: string;
  type?: string;
  search?: string;
}) {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProcedures();
  }, [filters]);

  const fetchProcedures = async () => {
    try {
      setLoading(true);
      // Aquí conectarías con tu API o base de datos
      const data = await fetch('/api/procedures?' + new URLSearchParams(filters));
      const procedures = await data.json();
      setProcedures(procedures);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { procedures, loading, error, refetch: fetchProcedures };
}`,

    api: `// Ejemplo de API endpoint en Node.js/Express
app.get('/api/procedures', async (req, res) => {
  try {
    const { category, type, search } = req.query;
    
    let query = supabase
      .from('procedures')
      .select('*');
    
    if (category) {
      query = query.eq('category', category);
    }
    
    if (type) {
      query = query.eq('type', type);
    }
    
    if (search) {
      query = query.or(\`name.ilike.%\${search}%,description.ilike.%\${search}%\`);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`
  };

  const renderSchema = () => (
    <div className="space-y-8">
      {/* Procedure Schema */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Esquema: Procedure</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
          <pre className="text-gray-800">
{JSON.stringify(procedureSchema, null, 2)}
          </pre>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Descripción:</strong> Estructura principal que contiene toda la información de un trámite gubernamental.</p>
          <p><strong>Fuente de datos:</strong> Archivo estático <code>src/data/procedures.ts</code> (migrar a base de datos)</p>
        </div>
      </div>

      {/* Category Schema */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-green-100 p-2 rounded-lg">
            <Database className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Esquema: Category</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
          <pre className="text-gray-800">
{JSON.stringify(categorySchema, null, 2)}
          </pre>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Descripción:</strong> Categorías para organizar los trámites (identidad, negocios, vivienda, etc.)</p>
          <p><strong>Fuente de datos:</strong> Archivo estático <code>src/data/procedures.ts</code></p>
        </div>
      </div>

      {/* Comments Schema */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Users className="h-5 w-5 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Esquema: ProcedureComment (Supabase)</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
          <pre className="text-gray-800">
{JSON.stringify(commentSchema, null, 2)}
          </pre>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Descripción:</strong> Comentarios y experiencias de usuarios sobre trámites específicos.</p>
          <p><strong>Fuente de datos:</strong> Tabla <code>procedure_comments</code> en Supabase</p>
          <p><strong>Estado:</strong> ✅ Implementado y funcional</p>
        </div>
      </div>

      {/* Observatory Schema */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-orange-100 p-2 rounded-lg">
            <Zap className="h-5 w-5 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Esquema: ObservatoryData</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-gray-800">
{JSON.stringify(observatorySchema, null, 2)}
          </pre>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Descripción:</strong> Datos de análisis y evaluación de eficiencia de trámites.</p>
          <p><strong>Fuente de datos:</strong> Archivo estático <code>src/data/observatory.ts</code> (migrar a base de datos)</p>
        </div>
      </div>
    </div>
  );

  const renderVariables = () => (
    <div className="space-y-8">
      {/* Variables to Collect */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-red-100 p-2 rounded-lg">
            <Server className="h-5 w-5 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Variables a Recolectar (Input)</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">📋 Información Básica del Trámite</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <code className="bg-gray-100 px-2 py-1 rounded">name</code>
                <span className="text-gray-600">- Nombre oficial del trámite</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <code className="bg-gray-100 px-2 py-1 rounded">description</code>
                <span className="text-gray-600">- Descripción corta</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <code className="bg-gray-100 px-2 py-1 rounded">institution</code>
                <span className="text-gray-600">- Institución responsable</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <code className="bg-gray-100 px-2 py-1 rounded">duration</code>
                <span className="text-gray-600">- Tiempo estimado</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">🔧 Configuración del Trámite</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <code className="bg-gray-100 px-2 py-1 rounded">type</code>
                <span className="text-gray-600">- digital/presencial/mixto</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <code className="bg-gray-100 px-2 py-1 rounded">userType</code>
                <span className="text-gray-600">- persona/empresa/ambos</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <code className="bg-gray-100 px-2 py-1 rounded">category</code>
                <span className="text-gray-600">- Categoría del trámite</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <code className="bg-gray-100 px-2 py-1 rounded">isDigital</code>
                <span className="text-gray-600">- Boolean si es 100% digital</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold text-gray-900 mb-3">📝 Arrays de Información Detallada</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <code className="font-semibold text-red-800">requirements: string[]</code>
              <p className="text-sm text-red-700 mt-1">Lista de documentos y requisitos necesarios</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <code className="font-semibold text-red-800">steps: string[]</code>
              <p className="text-sm text-red-700 mt-1">Pasos ordenados del proceso</p>
            </div>
          </div>
        </div>
      </div>

      {/* Variables to Consume */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-green-100 p-2 rounded-lg">
            <Eye className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Variables a Consumir (Output)</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">📊 Datos de Análisis</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <code className="bg-gray-100 px-2 py-1 rounded">maturityLevel</code>
                <span className="text-gray-600">- Nivel de madurez (0-5)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <code className="bg-gray-100 px-2 py-1 rounded">evaluationScore</code>
                <span className="text-gray-600">- Puntaje de evaluación (0-100)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <code className="bg-gray-100 px-2 py-1 rounded">satisfactionRate</code>
                <span className="text-gray-600">- Tasa de satisfacción (%)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <code className="bg-gray-100 px-2 py-1 rounded">monthlyUsers</code>
                <span className="text-gray-600">- Usuarios mensuales</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">💬 Datos de Usuarios</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <code className="bg-gray-100 px-2 py-1 rounded">comments</code>
                <span className="text-gray-600">- Comentarios de usuarios</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <code className="bg-gray-100 px-2 py-1 rounded">ratings</code>
                <span className="text-gray-600">- Calificaciones (1-5)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <code className="bg-gray-100 px-2 py-1 rounded">helpful_count</code>
                <span className="text-gray-600">- Votos de utilidad</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <code className="bg-gray-100 px-2 py-1 rounded">averageRating</code>
                <span className="text-gray-600">- Calificación promedio</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold text-gray-900 mb-3">🔍 Componentes de Evaluación</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <code className="text-sm font-semibold text-green-800">digitalizacion</code>
              <p className="text-xs text-green-700 mt-1">Nivel de automatización</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <code className="text-sm font-semibold text-green-800">simplificacion</code>
              <p className="text-xs text-green-700 mt-1">Facilidad de uso</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <code className="text-sm font-semibold text-green-800">interoperabilidad</code>
              <p className="text-xs text-green-700 mt-1">Integración entre sistemas</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <code className="text-sm font-semibold text-green-800">trazabilidad</code>
              <p className="text-xs text-green-700 mt-1">Seguimiento del proceso</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <code className="text-sm font-semibold text-green-800">accesibilidad</code>
              <p className="text-xs text-green-700 mt-1">Acceso para todos los usuarios</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <code className="text-sm font-semibold text-green-800">satisfaccionUsuario</code>
              <p className="text-xs text-green-700 mt-1">Experiencia del usuario</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Flow */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <GitBranch className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Flujo de Datos</h3>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="bg-red-50 p-4 rounded-lg text-center flex-1">
            <Server className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <h4 className="font-semibold text-red-800">Input</h4>
            <p className="text-sm text-red-700">Datos recolectados de instituciones</p>
          </div>
          
          <div className="text-gray-400">
            <ChevronDown className="h-6 w-6 md:hidden" />
            <ExternalLink className="h-6 w-6 hidden md:block" />
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg text-center flex-1">
            <Database className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold text-blue-800">Processing</h4>
            <p className="text-sm text-blue-700">Análisis y evaluación</p>
          </div>
          
          <div className="text-gray-400">
            <ChevronDown className="h-6 w-6 md:hidden" />
            <ExternalLink className="h-6 w-6 hidden md:block" />
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg text-center flex-1">
            <Eye className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold text-green-800">Output</h4>
            <p className="text-sm text-green-700">Datos para consumo público</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAPI = () => (
    <div className="space-y-8">
      {/* API Endpoints */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-purple-100 p-2 rounded-lg">
            <LinkIcon className="h-5 w-5 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Endpoints de API Recomendados</h3>
        </div>
        
        <div className="space-y-4">
          {apiEndpoints.map((endpoint, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                  endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {endpoint.method}
                </span>
                <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                  {endpoint.endpoint}
                </code>
              </div>
              <p className="text-gray-700 text-sm mb-2">{endpoint.description}</p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-900">Parámetros:</span>
                  <code className="ml-2 bg-gray-100 px-2 py-1 rounded text-xs">
                    {endpoint.params}
                  </code>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Respuesta:</span>
                  <code className="ml-2 bg-gray-100 px-2 py-1 rounded text-xs">
                    {endpoint.response}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Authentication */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-orange-100 p-2 rounded-lg">
            <Shield className="h-5 w-5 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Autenticación y Seguridad</h3>
        </div>
        
        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-800 mb-2">Supabase RLS (Row Level Security)</h4>
            <p className="text-sm text-orange-700 mb-3">
              Los comentarios están protegidos con políticas de seguridad a nivel de fila.
            </p>
            <div className="bg-white p-3 rounded border">
              <code className="text-xs text-gray-800">
                -- Política para lectura pública<br/>
                CREATE POLICY "Los comentarios son públicos para lectura"<br/>
                ON procedure_comments FOR SELECT TO public USING (true);
              </code>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">API Keys</h4>
            <p className="text-sm text-blue-700">
              Usar <code>VITE_SUPABASE_ANON_KEY</code> para operaciones públicas de lectura.
              Usar <code>SUPABASE_SERVICE_ROLE_KEY</code> solo en el backend para operaciones administrativas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExamples = () => (
    <div className="space-y-8">
      {Object.entries(codeExamples).map(([language, code]) => (
        <div key={language} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-100 p-2 rounded-lg">
                <Code className="h-5 w-5 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 capitalize">
                {language === 'typescript' ? 'TypeScript Types' :
                 language === 'supabase' ? 'Supabase Schema' :
                 language === 'react' ? 'React Hook' : 'API Endpoint'}
              </h3>
            </div>
            <button
              onClick={() => copyToClipboard(code, language)}
              className="flex items-center space-x-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
            >
              {copiedCode === language ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-600">Copiar</span>
                </>
              )}
            </button>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
              <code>{code}</code>
            </pre>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Database className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Documentación Técnica - Base de Datos
              </h1>
              <p className="text-gray-600">
                Guía para desarrolladores: esquemas, variables y APIs del sistema de trámites
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Esquemas Definidos</p>
                <p className="text-3xl font-bold text-gray-900">4</p>
                <p className="text-xs text-gray-500">Procedure, Category, Comment, Observatory</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Variables Input</p>
                <p className="text-3xl font-bold text-gray-900">12</p>
                <p className="text-xs text-gray-500">Variables a recolectar</p>
              </div>
              <div className="bg-red-100 p-3 rounded-xl">
                <Server className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Variables Output</p>
                <p className="text-3xl font-bold text-gray-900">15</p>
                <p className="text-xs text-gray-500">Variables a consumir</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <Eye className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">API Endpoints</p>
                <p className="text-3xl font-bold text-gray-900">6</p>
                <p className="text-xs text-gray-500">Endpoints recomendados</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <LinkIcon className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-8 border border-gray-100">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {[
              { id: 'schema', label: 'Esquemas de Datos', icon: Database },
              { id: 'variables', label: 'Variables I/O', icon: GitBranch },
              { id: 'api', label: 'APIs y Endpoints', icon: LinkIcon },
              { id: 'examples', label: 'Ejemplos de Código', icon: Code }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-purple-800 border-b-2 border-purple-800 bg-purple-50'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'schema' && renderSchema()}
        {activeTab === 'variables' && renderVariables()}
        {activeTab === 'api' && renderAPI()}
        {activeTab === 'examples' && renderExamples()}

        {/* Implementation Status */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-100">
          <h3 className="text-xl font-bold text-blue-900 mb-6">Estado de Implementación</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-800 mb-3">✅ Implementado</h4>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Sistema de comentarios con Supabase</li>
                <li>• Esquemas TypeScript completos</li>
                <li>• Hooks React para consumo de datos</li>
                <li>• RLS y políticas de seguridad</li>
                <li>• Interfaz de usuario completa</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-800 mb-3">🔄 Pendiente</h4>
              <ul className="space-y-2 text-sm text-orange-700">
                <li>• Migrar datos de procedures a base de datos</li>
                <li>• Implementar API REST completa</li>
                <li>• Sistema de análisis del observatorio</li>
                <li>• Recolección automática de datos</li>
                <li>• Dashboard administrativo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}