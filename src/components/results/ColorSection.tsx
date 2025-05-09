
import React from 'react';
import { Droplet } from 'lucide-react';
import ResultCard from '../ResultCard';
import { AnalysisResult } from '../results/analysisTypes';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ColorSectionProps {
  color: AnalysisResult['color'];
}

// Função auxiliar para normalizar os valores para porcentagens
const getProgressValue = (value: string): number => {
  // Remover caracteres não numéricos exceto - e .
  const numericValue = value.replace(/[^\d.-]/g, '');
  const num = parseFloat(numericValue);
  
  // Se não for um número, retornar valor neutro
  if (isNaN(num)) return 50;
  
  // Para valores em escalas diferentes, normalizar
  if (num >= -100 && num <= 100) {
    return (num + 100) / 2; // Converte -100 a 100 para 0 a 100
  } else if (num >= 0 && num <= 10000) {
    return num / 100; // Temperatura em Kelvin
  }
  
  return Math.min(Math.max(num, 0), 100); // Limitar entre 0 e 100
};

const ColorSection: React.FC<ColorSectionProps> = ({ color }) => {
  const renderProgressBar = (value: string, label: string, colorClass: string = "bg-primary") => {
    const progressValue = getProgressValue(value);
    
    return (
      <div className="flex flex-col space-y-1 my-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 font-medium">{label}</span>
          <span className="font-mono">{value}</span>
        </div>
        <Progress value={progressValue} className={`h-2 ${colorClass}`} />
      </div>
    );
  };

  const colorClasses = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
    aqua: "bg-cyan-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    magenta: "bg-pink-500"
  };

  return (
    <ResultCard title="Cor" icon={<Droplet size={20} />}>
      <p className="text-sm text-gray-600 mb-6 italic border-l-4 border-primary/30 pl-3">
        {color.explanation || "Ajustes de cor recomendados para esta imagem."}
      </p>
      
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Básico</TabsTrigger>
          <TabsTrigger value="hsl">HSL</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4 mt-4">
          {renderProgressBar(color.temperature, "Temperatura")}
          {renderProgressBar(color.tint, "Matiz")}
          {renderProgressBar(color.vibrance, "Vibração")}
          {renderProgressBar(color.saturation, "Saturação")}
        </TabsContent>
        
        <TabsContent value="hsl" className="mt-4">
          <div className="space-y-4">
            {Object.entries(color.hsl).map(([key, value]) => (
              <div key={key} className="flex flex-col space-y-1">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${colorClasses[key as keyof typeof colorClasses] || "bg-gray-500"}`}></div>
                  <span className="text-gray-700 capitalize">{key}</span>
                </div>
                <p className="text-sm pl-6 text-gray-600">{value}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </ResultCard>
  );
};

export default ColorSection;
