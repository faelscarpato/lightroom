
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import ImageUploader from '@/components/ImageUploader';
import CategorySelector, { PhotoCategory } from '@/components/CategorySelector';
import ResultsDisplay, { AnalysisResult } from '@/components/ResultsDisplay';
import { supabase } from '@/integrations/supabase/client';
import { Loader } from 'lucide-react';

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

  const analyzeImage = async () => {
    if (!uploadedImage || !selectedCategory) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma imagem e uma categoria.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      // Chame a Edge Function do Supabase
      const { data, error } = await supabase.functions.invoke('analyze-photo', {
        body: {
          imageBase64: uploadedImage.url, // A URL já é um data URL com a imagem em base64
          category: selectedCategory
        }
      });

      if (error) {
        throw new Error(error.message || 'Erro ao analisar imagem');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      console.log('Resultado da análise:', data);
      setResult(data);
      toast({
        title: "Análise Completa",
        description: `Imagem analisada com sucesso na categoria ${selectedCategory}.`,
      });
    } catch (error) {
      console.error('Erro ao analisar imagem:', error);
      toast({
        title: "Erro na Análise",
        description: error.message || "Ocorreu um erro ao analisar a imagem. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Lightroom AI Mentor
          </h1>
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
            <div className="text-center py-10 flex flex-col items-center justify-center">
              <div className="relative">
                <Loader size={48} className="animate-spin text-primary" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full bg-white"></div>
                </div>
              </div>
              <p className="mt-4 text-lg">Analisando sua imagem com IA...</p>
              <p className="text-sm text-gray-500 max-w-md mt-2">
                Estamos processando sua foto para criar recomendações personalizadas para o Lightroom.
                Isso pode levar alguns segundos.
              </p>
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
      
      <footer className="bg-gray-100 py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 Lightroom AI Mentor - Análise Fotográfica + Sugestão de Presets</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
