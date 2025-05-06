
import React, { useState } from 'react';
import { Upload, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface ImageUploaderProps {
  onImageUpload: (file: File, imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.match('image.*')) {
      toast({
        title: "Tipo de arquivo inválido",
        description: "Por favor selecione uma imagem.",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreview(e.target.result as string);
        onImageUpload(file, e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
          isDragging ? 'border-primary bg-primary/10' : 'border-gray-300'
        } ${preview ? 'bg-gray-50' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!preview ? (
          <div className="flex flex-col items-center justify-center py-6">
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-1">
              Arraste e solte sua imagem aqui
            </p>
            <p className="text-sm text-gray-500 mb-4">
              ou clique para selecionar um arquivo
            </p>
            <Button 
              onClick={() => inputRef.current?.click()}
              variant="default"
              className="bg-primary hover:bg-primary/90"
            >
              Selecionar Imagem
            </Button>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileInput}
              ref={inputRef}
            />
          </div>
        ) : (
          <div className="w-full">
            <div className="relative w-full rounded-lg overflow-hidden aspect-video">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex justify-center mt-4">
              <Button 
                onClick={() => {
                  setPreview(null);
                  if (inputRef.current) inputRef.current.value = '';
                }}
                variant="outline"
                className="mr-2"
              >
                Remover
              </Button>
              <Button 
                onClick={() => inputRef.current?.click()}
                className="bg-primary hover:bg-primary/90"
              >
                Trocar Imagem
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
