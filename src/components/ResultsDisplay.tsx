import React from 'react';
import ResultCard from './ResultCard';
import {
  Sun,
  Droplet,
  Sliders,
  Eye,
  Filter,
  Contrast,
  Palette,
  Layers
} from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

export interface AnalysisResult {
  light: {
    exposure: string;
    contrast: string;
    highlights: string;
    shadows: string;
    whites: string;
    blacks: string;
    explanation?: string;
  };
  color: {
    temperature: string;
    tint: string;
    vibrance: string;
    saturation: string;
    hsl: {
      red: string;
      orange: string;
      yellow: string;
      green: string;
      aqua: string;
      blue: string;
      purple: string;
      magenta: string;
    };
    explanation?: string;
  };
  effects: {
    texture: string;
    clarity: string;
    dehaze: string;
    vignette: string;
    grain: string;
    explanation?: string;
  };
  detail: {
    sharpness: string;
    noiseReduction: string;
    colorNoiseReduction: string;
    sharpnessMask: string;
    explanation?: string;
  };
  optics: {
    autoCorrections: string;
    chromaticAberration: string;
    manualAdjustments: string;
    explanation?: string;
  };
  profile: {
    adobeProfile: string;
    customProfile: string;
    explanation: string;
  };
  masks: {
    type: string;
    settings: {
      light: string;
      color: string;
      effects: string;
      detail: string;
    };
    explanation?: string;
  }[];
}

interface ResultsDisplayProps {
  result: AnalysisResult | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Sugestões de Edição no Lightroom</h2>

      <ResultCard title="Luz" icon={<Sun size={20} />}>
        <p className="text-sm text-gray-600 mb-4">{result.light.explanation || "Configurações de luz adaptadas para esta imagem."}</p>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Exposição</TableCell>
              <TableCell>{result.light.exposure}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Contraste</TableCell>
              <TableCell>{result.light.contrast}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Realces</TableCell>
              <TableCell>{result.light.highlights}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Sombras</TableCell>
              <TableCell>{result.light.shadows}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Brancos</TableCell>
              <TableCell>{result.light.whites}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Pretos</TableCell>
              <TableCell>{result.light.blacks}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ResultCard>

      <ResultCard title="Cor" icon={<Droplet size={20} />}>
        <p className="text-sm text-gray-600 mb-4">{result.color.explanation || "Ajustes de cor recomendados para esta imagem."}</p>
        <Table className="mb-6">
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Temperatura</TableCell>
              <TableCell>{result.color.temperature}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Matiz</TableCell>
              <TableCell>{result.color.tint}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Vibração</TableCell>
              <TableCell>{result.color.vibrance}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Saturação</TableCell>
              <TableCell>{result.color.saturation}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        <h4 className="font-semibold mb-2">HSL (Matiz, Saturação, Luminância)</h4>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Vermelho</TableCell>
              <TableCell>{result.color.hsl.red}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Laranja</TableCell>
              <TableCell>{result.color.hsl.orange}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Amarelo</TableCell>
              <TableCell>{result.color.hsl.yellow}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Verde</TableCell>
              <TableCell>{result.color.hsl.green}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Aqua</TableCell>
              <TableCell>{result.color.hsl.aqua}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Azul</TableCell>
              <TableCell>{result.color.hsl.blue}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Roxo</TableCell>
              <TableCell>{result.color.hsl.purple}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Magenta</TableCell>
              <TableCell>{result.color.hsl.magenta}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ResultCard>

      <ResultCard title="Efeito" icon={<Filter size={20} />}>
        <p className="text-sm text-gray-600 mb-4">{result.effects.explanation || "Efeitos sugeridos para aprimorar a imagem."}</p>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Textura</TableCell>
              <TableCell>{result.effects.texture}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Claridade</TableCell>
              <TableCell>{result.effects.clarity}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Remoção de neblina</TableCell>
              <TableCell>{result.effects.dehaze}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Vinheta</TableCell>
              <TableCell>{result.effects.vignette}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Grão</TableCell>
              <TableCell>{result.effects.grain}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ResultCard>

      <ResultCard title="Detalhe" icon={<Eye size={20} />}>
        <p className="text-sm text-gray-600 mb-4">{result.detail.explanation || "Configurações de detalhamento recomendadas."}</p>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Nitidez</TableCell>
              <TableCell>{result.detail.sharpness}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Redução de ruído</TableCell>
              <TableCell>{result.detail.noiseReduction}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Redução de ruído de cor</TableCell>
              <TableCell>{result.detail.colorNoiseReduction}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Máscara de nitidez</TableCell>
              <TableCell>{result.detail.sharpnessMask}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ResultCard>

      <ResultCard title="Ótica" icon={<Sliders size={20} />}>
        <p className="text-sm text-gray-600 mb-4">{result.optics.explanation || "Correções ópticas para esta imagem."}</p>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Correções de lente automáticas</TableCell>
              <TableCell>{result.optics.autoCorrections}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Remoção de aberração cromática</TableCell>
              <TableCell>{result.optics.chromaticAberration}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Ajustes manuais</TableCell>
              <TableCell>{result.optics.manualAdjustments}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ResultCard>

      <ResultCard title="Perfil Sugerido" icon={<Palette size={20} />}>
        <p className="text-sm text-gray-600 mb-4">{result.profile.explanation}</p>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Perfil Adobe</TableCell>
              <TableCell>{result.profile.adobeProfile}</TableCell>
            </TableRow>
            {result.profile.customProfile && (
              <TableRow>
                <TableCell className="font-medium">Perfil personalizado</TableCell>
                <TableCell>{result.profile.customProfile}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ResultCard>

      <ResultCard title="Máscaras Recomendadas" icon={<Layers size={20} />}>
        {result.masks.map((mask, index) => (
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
            
            {index < result.masks.length - 1 && <Separator className="my-6" />}
          </div>
        ))}
      </ResultCard>
    </div>
  );
};

export default ResultsDisplay;
