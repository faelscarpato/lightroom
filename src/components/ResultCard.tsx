
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
    <Card className="mb-4 overflow-hidden photo-card">
      <CardHeader 
        className="py-3 px-4 cursor-pointer bg-secondary/50 flex flex-row items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="p-4">
          {children}
        </CardContent>
      )}
    </Card>
  );
};

export default ResultCard;
