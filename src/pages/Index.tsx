
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import ImageUploader from '@/components/ImageUploader';
import CategorySelector, { PhotoCategory } from '@/components/CategorySelector';
import ResultsDisplay, { AnalysisResult } from '@/components/ResultsDisplay';

const demoResult: AnalysisResult = {
  light: {
    exposure: "+0.5",
    contrast: "+15",
    highlights: "-10",
    shadows: "+15",
    whites: "+5",
    blacks: "-5",
    explanation: "Aumentei ligeiramente a exposição para revelar mais detalhes, aumentei o contraste para dar profundidade e ajustei as sombras para preservar detalhes nas áreas escuras."
  },
  color: {
    temperature: "5500K (neutro com leve aquecimento)",
    tint: "+5 (leve magenta)",
    vibrance: "+10",
    saturation: "+5",
    hsl: {
      red: "Matiz: 0, Saturação: +5, Luminância: 0",
      orange: "Matiz: +5, Saturação: +10, Luminância: 0",
      yellow: "Matiz: -5, Saturação: +15, Luminância: +5",
      green: "Matiz: 0, Saturação: -5, Luminância: 0",
      aqua: "Matiz: +5, Saturação: +10, Luminância: 0",
      blue: "Matiz: +10, Saturação: +5, Luminância: -5",
      purple: "Matiz: 0, Saturação: 0, Luminância: 0",
      magenta: "Matiz: -5, Saturação: 0, Luminância: 0"
    },
    explanation: "Apliquei um equilíbrio de cores neutro com leve aquecimento para melhorar os tons de pele, aumentando a vibração para cores mais vivas sem parecer artificial."
  },
  effects: {
    texture: "+10",
    clarity: "+15",
    dehaze: "+5",
    vignette: "Quantidade: -15, Ponto médio: 50, Arredondamento: 50, Plumagem: 50",
    grain: "Quantidade: 0, Tamanho: 0, Rugosidade: 0",
    explanation: "Aumentei textura e claridade para dar mais definição à imagem, com leve remoção de névoa e sutil vinheta para direcionar o olhar ao ponto focal."
  },
  detail: {
    sharpness: "Quantidade: 40, Raio: 1.0, Detalhe: 25",
    noiseReduction: "Luminância: 10, Detalhe: 50, Contraste: 0",
    colorNoiseReduction: "25",
    sharpnessMask: "40",
    explanation: "Apliquei nitidez moderada para realçar detalhes sem artefatos, com suave redução de ruído para manter a textura natural."
  },
  optics: {
    autoCorrections: "Ativado",
    chromaticAberration: "Remover",
    manualAdjustments: "Distorção: 0, Vinheta da lente: 0",
    explanation: "Habilitei correções automáticas de lente para corrigir distorção e aberração cromática detectadas na imagem."
  },
  profile: {
    adobeProfile: "Adobe Color",
    customProfile: "N/A",
    explanation: "O perfil Adobe Color oferece um bom equilíbrio entre saturação e contraste, mantendo a naturalidade dos tons de pele nesta fotografia."
  },
  masks: [
    {
      type: "Céu",
      settings: {
        light: "Exposição: -0.3, Contraste: +10",
        color: "Temperatura: -5 (mais frio), Saturação: +10",
        effects: "Claridade: +15, Textura: +5",
        detail: "Nitidez: +10"
      },
      explanation: "Escureci levemente o céu para destacar as nuvens e adicionei mais textura e cor para um visual mais dramático."
    },
    {
      type: "Sujeito Principal",
      settings: {
        light: "Exposição: +0.2, Sombras: +10",
        color: "Vibração: +5, Saturação: 0",
        effects: "Claridade: +10, Textura: +5",
        detail: "Nitidez: +15"
      },
      explanation: "Aumentei levemente a exposição no sujeito para destacá-lo do fundo, com aumento de nitidez para realçar detalhes importantes."
    }
  ]
};

const Index = () => {
  const { toast } = useToast();
  const [uploadedImage, setUploadedImage] = useState<{ file: File; url: string } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleImageUpload = (file: File, imageUrl: string) => {
    setUploadedImage({ file, url: imageUrl });
    setResult(null); // Reset results when a new image is uploaded
  };

  const handleCategorySelect = (category: PhotoCategory) => {
    setSelectedCategory(category);
    setResult(null); // Reset results when category changes
  };

  const analyzeImage = () => {
    if (!uploadedImage || !selectedCategory) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma imagem e uma categoria.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // In a real application, this is where you would send the image to the API
    // For demo purposes, we'll just set a timeout to simulate the API call
    setTimeout(() => {
      setResult(demoResult);
      setIsAnalyzing(false);
      toast({
        title: "Análise Completa",
        description: `Imagem analisada com sucesso na categoria ${selectedCategory}.`,
      });
    }, 2000);

    // In a production application, you would implement the API call here:
    /*
    const formData = new FormData();
    formData.append('image', uploadedImage.file);
    formData.append('category', selectedCategory);
    
    fetch('your-api-endpoint', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setResult(data);
        setIsAnalyzing(false);
        toast({
          title: "Análise Completa",
          description: `Imagem analisada com sucesso na categoria ${selectedCategory}.`,
        });
      })
      .catch(error => {
        console.error('Error analyzing image:', error);
        setIsAnalyzing(false);
        toast({
          title: "Erro na Análise",
          description: "Ocorreu um erro ao analisar a imagem. Tente novamente mais tarde.",
          variant: "destructive",
        });
      });
    */
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Lightroom AI Mentor</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Envie sua foto e descubra as configurações ideais de edição no Adobe Lightroom com base em análise profissional
            de IA especializada em fotografia.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {!result && (
            <>
              <ImageUploader onImageUpload={handleImageUpload} />
              <CategorySelector 
                onSelectCategory={handleCategorySelect}
                selectedCategory={selectedCategory}
                imageUploaded={!!uploadedImage}
                onAnalyze={analyzeImage}
                isAnalyzing={isAnalyzing}
              />
            </>
          )}

          {isAnalyzing && (
            <div className="text-center py-10">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
              <p className="mt-4 text-lg">Analisando sua imagem...</p>
            </div>
          )}

          {result && (
            <div className="w-full">
              <div className="flex justify-center mb-6">
                <button 
                  onClick={() => {
                    setResult(null);
                  }}
                  className="text-primary hover:text-primary/80 font-medium flex items-center"
                >
                  ← Voltar para o upload
                </button>
              </div>
              <ResultsDisplay result={result} />
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 Lightroom AI Mentor - Análise Fotográfica + Sugestão de Presets</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
