
import React from 'react';
import { AnalysisResult } from './results/analysisTypes';
import LightSection from './results/LightSection';
import ColorSection from './results/ColorSection';
import EffectsSection from './results/EffectsSection';
import DetailSection from './results/DetailSection';
import OpticsSection from './results/OpticsSection';
import ProfileSection from './results/ProfileSection';
import MasksSection from './results/MasksSection';

interface ResultsDisplayProps {
  result: AnalysisResult | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Sugestões de Edição no Lightroom</h2>
      
      <LightSection light={result.light} />
      <ColorSection color={result.color} />
      <EffectsSection effects={result.effects} />
      <DetailSection detail={result.detail} />
      <OpticsSection optics={result.optics} />
      <ProfileSection profile={result.profile} />
      <MasksSection masks={result.masks} />
    </div>
  );
};

// Export the old interface for backward compatibility
export type { AnalysisResult };
export default ResultsDisplay;
