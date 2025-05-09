
import React from 'react';
import { Palette } from 'lucide-react';
import ResultCard from '../ResultCard';
import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@/components/ui/table';
import { AnalysisResult } from '../ResultsDisplay';

interface ProfileSectionProps {
  profile: AnalysisResult['profile'];
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ profile }) => {
  return (
    <ResultCard title="Perfil Sugerido" icon={<Palette size={20} />}>
      <p className="text-sm text-gray-600 mb-4">{profile.explanation}</p>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Perfil Adobe</TableCell>
            <TableCell>{profile.adobeProfile}</TableCell>
          </TableRow>
          {profile.customProfile && (
            <TableRow>
              <TableCell className="font-medium">Perfil personalizado</TableCell>
              <TableCell>{profile.customProfile}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ResultCard>
  );
};

export default ProfileSection;
