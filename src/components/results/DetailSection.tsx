
import React from 'react';
import { Eye } from 'lucide-react';
import ResultCard from '../ResultCard';
import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@/components/ui/table';
import { AnalysisResult } from '../ResultsDisplay';

interface DetailSectionProps {
  detail: AnalysisResult['detail'];
}

const DetailSection: React.FC<DetailSectionProps> = ({ detail }) => {
  return (
    <ResultCard title="Detalhe" icon={<Eye size={20} />}>
      <p className="text-sm text-gray-600 mb-4">{detail.explanation || "Configurações de detalhamento recomendadas."}</p>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Nitidez</TableCell>
            <TableCell>{detail.sharpness}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Redução de ruído</TableCell>
            <TableCell>{detail.noiseReduction}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Redução de ruído de cor</TableCell>
            <TableCell>{detail.colorNoiseReduction}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Máscara de nitidez</TableCell>
            <TableCell>{detail.sharpnessMask}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ResultCard>
  );
};

export default DetailSection;
