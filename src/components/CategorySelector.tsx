
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

export type PhotoCategory = 
  | 'Retrato'
  | 'Paisagem'
  | 'Urbano'
  | 'Produto'
  | 'Arquitetura'
  | 'Casamento'
  | 'Moda'
  | 'Comida'
  | 'Criativa / Experimental';

interface CategorySelectorProps {
  onSelectCategory: (category: PhotoCategory) => void;
  selectedCategory: PhotoCategory | null;
  imageUploaded: boolean;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const categories: PhotoCategory[] = [
  'Retrato',
  'Paisagem',
  'Urbano',
  'Produto',
  'Arquitetura',
  'Casamento',
  'Moda',
  'Comida',
  'Criativa / Experimental'
];

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  onSelectCategory, 
  selectedCategory,
  imageUploaded,
  onAnalyze,
  isAnalyzing
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <h2 className="text-xl font-semibold mb-4">Selecione a Categoria da Fotografia</h2>
      
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`h-auto py-2 px-4 justify-start ${
                selectedCategory === category ? 'bg-primary text-white' : ''
              }`}
              onClick={() => onSelectCategory(category)}
              disabled={!imageUploaded}
            >
              {category}
            </Button>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button 
            className="bg-accent hover:bg-accent/90 text-white w-full max-w-xs"
            disabled={!imageUploaded || !selectedCategory || isAnalyzing}
            onClick={onAnalyze}
          >
            {isAnalyzing ? 'Analisando...' : 'Analisar Imagem'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
