// Observatory data will be connected to real data sources
// This file is prepared for integration with actual government data

export interface ObservatoryData {
  id: string;
  name: string;
  category: string;
  maturityLevel: number;
  evaluationScore: number;
  evaluationComponents: {
    digitalizacion: number;
    simplificacion: number;
    interoperabilidad: number;
    trazabilidad: number;
    accesibilidad: number;
    satisfaccionUsuario: number;
  };
  averageTime: string;
  monthlyUsers: number;
  satisfactionRate: number;
  isDigital: boolean;
  issues: string[];
  recommendations: string[];
  lastUpdated: string;
}

// Empty array - to be populated with real data
export const observatoryData: ObservatoryData[] = [];