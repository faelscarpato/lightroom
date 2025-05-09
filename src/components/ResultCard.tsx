
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

interface ResultCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, icon, children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card className="mb-4 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-primary/70">
      <CardHeader 
        className="py-3 px-4 cursor-pointer bg-secondary/30 flex flex-row items-center justify-between transition-colors hover:bg-secondary/40"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-primary">{icon}</span>}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        {isExpanded ? 
          <ChevronUp size={20} className="text-gray-500" /> : 
          <ChevronDown size={20} className="text-gray-500" />
        }
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="p-4 animate-fade-in">
          {children}
        </CardContent>
      )}
    </Card>
  );
};

export default ResultCard;
