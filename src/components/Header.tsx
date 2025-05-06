
import React from 'react';
import { Image } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-4 md:px-8 bg-primary text-white">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Lightroom AI Mentor</h1>
        </div>
        <p className="hidden md:block text-sm">Análise Fotográfica + Sugestão de Presets</p>
      </div>
    </header>
  );
};

export default Header;
