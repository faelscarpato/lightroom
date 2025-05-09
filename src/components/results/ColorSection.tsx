
import React from 'react';
import { Droplet } from 'lucide-react';
import ResultCard from '../ResultCard';
import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@/components/ui/table';
import { AnalysisResult } from '../ResultsDisplay';

interface ColorSectionProps {
  color: AnalysisResult['color'];
}

const ColorSection: React.FC<ColorSectionProps> = ({ color }) => {
  return (
    <ResultCard title="Cor" icon={<Droplet size={20} />}>
      <p className="text-sm text-gray-600 mb-4">{color.explanation || "Ajustes de cor recomendados para esta imagem."}</p>
      <Table className="mb-6">
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Temperatura</TableCell>
            <TableCell>{color.temperature}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Matiz</TableCell>
            <TableCell>{color.tint}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Vibração</TableCell>
            <TableCell>{color.vibrance}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Saturação</TableCell>
            <TableCell>{color.saturation}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
      <h4 className="font-semibold mb-2">HSL (Matiz, Saturação, Luminância)</h4>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Vermelho</TableCell>
            <TableCell>{color.hsl.red}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Laranja</TableCell>
            <TableCell>{color.hsl.orange}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Amarelo</TableCell>
            <TableCell>{color.hsl.yellow}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Verde</TableCell>
            <TableCell>{color.hsl.green}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Aqua</TableCell>
            <TableCell>{color.hsl.aqua}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Azul</TableCell>
            <TableCell>{color.hsl.blue}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Roxo</TableCell>
            <TableCell>{color.hsl.purple}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Magenta</TableCell>
            <TableCell>{color.hsl.magenta}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ResultCard>
  );
};

export default ColorSection;
