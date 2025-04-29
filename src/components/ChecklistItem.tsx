
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ChecklistItem as ChecklistItemType } from '@/data/checklistData';

interface ChecklistItemProps {
  item: ChecklistItemType;
  onToggle: (id: string) => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ item, onToggle }) => {
  return (
    <div className="flex items-center space-x-2 py-1.5">
      <Checkbox 
        id={item.id} 
        checked={item.isChecked} 
        onCheckedChange={() => onToggle(item.id)} 
      />
      <label 
        htmlFor={item.id} 
        className={`text-sm sm:text-base select-none cursor-pointer ${
          item.isChecked ? 'line-through text-gray-400' : ''
        }`}
      >
        {item.text}
      </label>
    </div>
  );
};

export default ChecklistItem;
