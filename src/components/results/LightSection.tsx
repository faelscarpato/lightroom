
import React from 'react';
import { Sun } from 'lucide-react';
import ResultCard from '../ResultCard';
import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@/components/ui/table';
import { AnalysisResult } from '../ResultsDisplay';

interface LightSectionProps {
  light: AnalysisResult['light'];
}

const LightSection: React.FC<LightSectionProps> = ({ light }) => {
  return (
    <ResultCard title="Luz" icon={<Sun size={20} />}>
      <p className="text-sm text-gray-600 mb-4">{light.explanation || "Configurações de luz adaptadas para esta imagem."}</p>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Exposição</TableCell>
            <TableCell>{light.exposure}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Contraste</TableCell>
            <TableCell>{light.contrast}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Realces</TableCell>
            <TableCell>{light.highlights}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Sombras</TableCell>
            <TableCell>{light.shadows}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Brancos</TableCell>
            <TableCell>{light.whites}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Pretos</TableCell>
            <TableCell>{light.blacks}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ResultCard>
  );
};

export default LightSection;
