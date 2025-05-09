
import React from 'react';
import { Filter } from 'lucide-react';
import ResultCard from '../ResultCard';
import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@/components/ui/table';
import { AnalysisResult } from '../ResultsDisplay';

interface EffectsSectionProps {
  effects: AnalysisResult['effects'];
}

const EffectsSection: React.FC<EffectsSectionProps> = ({ effects }) => {
  return (
    <ResultCard title="Efeito" icon={<Filter size={20} />}>
      <p className="text-sm text-gray-600 mb-4">{effects.explanation || "Efeitos sugeridos para aprimorar a imagem."}</p>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Textura</TableCell>
            <TableCell>{effects.texture}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Claridade</TableCell>
            <TableCell>{effects.clarity}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Remoção de neblina</TableCell>
            <TableCell>{effects.dehaze}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Vinheta</TableCell>
            <TableCell>{effects.vignette}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Grão</TableCell>
            <TableCell>{effects.grain}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ResultCard>
  );
};

export default EffectsSection;
