
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChecklistSection as ChecklistSectionType } from '@/data/checklistData';
import ChecklistItem from './ChecklistItem';
import { Progress } from '@/components/ui/progress';

interface ChecklistSectionProps {
  section: ChecklistSectionType;
  onToggleItem: (sectionId: string, itemId: string) => void;
}

const ChecklistSection: React.FC<ChecklistSectionProps> = ({ section, onToggleItem }) => {
  const completedItems = section.items.filter(item => item.isChecked).length;
  const totalItems = section.items.length;
  const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex justify-between">
          <span>{section.title}</span>
          <span className="text-sm text-gray-500 font-normal">
            {completedItems}/{totalItems}
          </span>
        </CardTitle>
        <Progress value={progressPercentage} className="h-2.5" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          {section.items.map((item) => (
            <ChecklistItem 
              key={item.id} 
              item={item} 
              onToggle={(itemId) => onToggleItem(section.id, itemId)} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChecklistSection;
