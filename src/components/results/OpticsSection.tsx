
import React from 'react';
import { Sliders } from 'lucide-react';
import ResultCard from '../ResultCard';
import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@/components/ui/table';
import { AnalysisResult } from '../ResultsDisplay';

interface OpticsSectionProps {
  optics: AnalysisResult['optics'];
}

const OpticsSection: React.FC<OpticsSectionProps> = ({ optics }) => {
  return (
    <ResultCard title="Ótica" icon={<Sliders size={20} />}>
      <p className="text-sm text-gray-600 mb-4">{optics.explanation || "Correções ópticas para esta imagem."}</p>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Correções de lente automáticas</TableCell>
            <TableCell>{optics.autoCorrections}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Remoção de aberração cromática</TableCell>
            <TableCell>{optics.chromaticAberration}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Ajustes manuais</TableCell>
            <TableCell>{optics.manualAdjustments}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ResultCard>
  );
};

export default OpticsSection;
