
import React from 'react';
import { Layers } from 'lucide-react';
import ResultCard from '../ResultCard';
import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { AnalysisResult } from '../ResultsDisplay';

interface MasksSectionProps {
  masks: AnalysisResult['masks'];
}

const MasksSection: React.FC<MasksSectionProps> = ({ masks }) => {
  return (
    <ResultCard title="Máscaras Recomendadas" icon={<Layers size={20} />}>
      {masks.map((mask, index) => (
        <div key={index} className="mb-6 last:mb-0">
          <h4 className="font-semibold text-lg mb-2">Máscara: {mask.type}</h4>
          <p className="text-sm text-gray-600 mb-4">{mask.explanation || `Configurações para máscara de ${mask.type.toLowerCase()}.`}</p>
          
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Luz</TableCell>
                <TableCell>{mask.settings.light}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Cor</TableCell>
                <TableCell>{mask.settings.color}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Efeito</TableCell>
                <TableCell>{mask.settings.effects}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Detalhe</TableCell>
                <TableCell>{mask.settings.detail}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          {index < masks.length - 1 && <Separator className="my-6" />}
        </div>
      ))}
    </ResultCard>
  );
};

export default MasksSection;
