
import React from 'react';
import { Sun } from 'lucide-react';
import ResultCard from '../ResultCard';
import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@/components/ui/table';
import { AnalysisResult } from '../results/analysisTypes';
import { Progress } from '@/components/ui/progress';

interface LightSectionProps {
  light: AnalysisResult['light'];
}

// Função auxiliar para normalizar os valores para porcentagens de progresso
const getProgressValue = (value: string): number => {
  // Remover caracteres não numéricos exceto - e .
  const numericValue = value.replace(/[^\d.-]/g, '');
  const num = parseFloat(numericValue);
  
  // Se não for um número, retornar valor neutro
  if (isNaN(num)) return 50;
  
  // Para valores em escalas diferentes, normalizar
  if (num >= -100 && num <= 100) {
    return (num + 100) / 2; // Converte -100 a 100 para 0 a 100
  } else if (num >= -5 && num <= 5) {
    return (num + 5) * 10; // Converte -5 a 5 para 0 a 100
  }
  
  return Math.min(Math.max(num, 0), 100); // Limitar entre 0 e 100
};

const LightSection: React.FC<LightSectionProps> = ({ light }) => {
  const renderProgressBar = (value: string, label: string) => {
    const progressValue = getProgressValue(value);
    
    return (
      <div className="flex flex-col space-y-1 my-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 font-medium">{label}</span>
          <span className="font-mono">{value}</span>
        </div>
        <Progress value={progressValue} className="h-2" />
      </div>
    );
  };

  return (
    <ResultCard title="Luz" icon={<Sun size={20} />}>
      <p className="text-sm text-gray-600 mb-6 italic border-l-4 border-primary/30 pl-3">
        {light.explanation || "Configurações de luz adaptadas para esta imagem."}
      </p>
      
      <div className="space-y-4">
        {renderProgressBar(light.exposure, "Exposição")}
        {renderProgressBar(light.contrast, "Contraste")}
        {renderProgressBar(light.highlights, "Realces")}
        {renderProgressBar(light.shadows, "Sombras")}
        {renderProgressBar(light.whites, "Brancos")}
        {renderProgressBar(light.blacks, "Pretos")}
      </div>
    </ResultCard>
  );
};

export default LightSection;
