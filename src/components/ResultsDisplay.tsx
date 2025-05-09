
import React from 'react';
import { AnalysisResult } from './results/analysisTypes';
import LightSection from './results/LightSection';
import ColorSection from './results/ColorSection';
import EffectsSection from './results/EffectsSection';
import DetailSection from './results/DetailSection';
import OpticsSection from './results/OpticsSection';
import ProfileSection from './results/ProfileSection';
import MasksSection from './results/MasksSection';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';

interface ResultsDisplayProps {
  result: AnalysisResult | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  if (!result) return null;

  const handleDownload = () => {
    // Criar um arquivo JSON para download
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "lightroom-settings.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleShare = () => {
    // Implementação básica de compartilhamento
    if (navigator.share) {
      navigator.share({
        title: 'Minha Edição de Foto no Lightroom',
        text: 'Confira minhas configurações recomendadas para Lightroom!',
      }).catch(console.error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-center sm:text-left">Sugestões de Edição no Lightroom</h2>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={handleDownload}
          >
            <Download size={16} />
            Exportar
          </Button>
          <Button 
            variant="default"
            className="flex items-center gap-2"
            onClick={handleShare}
          >
            <Share2 size={16} />
            Compartilhar
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LightSection light={result.light} />
        <ColorSection color={result.color} />
        <EffectsSection effects={result.effects} />
        <DetailSection detail={result.detail} />
        <OpticsSection optics={result.optics} />
        <ProfileSection profile={result.profile} />
      </div>
      
      <div className="mt-4">
        <MasksSection masks={result.masks} />
      </div>
    </div>
  );
};

// Export the old interface for backward compatibility
export type { AnalysisResult };
export default ResultsDisplay;
