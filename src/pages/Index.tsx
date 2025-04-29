
import React, { useState } from 'react';
import Header from '@/components/Header';
import ChecklistSection from '@/components/ChecklistSection';
import PrintButton from '@/components/PrintButton';
import { initialChecklistData } from '@/data/checklistData';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [checklistData, setChecklistData] = useState(initialChecklistData);
  const { toast } = useToast();

  const handleToggleItem = (sectionId: string, itemId: string) => {
    setChecklistData(prevData =>
      prevData.map(section => {
        if (section.id !== sectionId) return section;
        
        return {
          ...section,
          items: section.items.map(item => {
            if (item.id !== itemId) return item;
            return { ...item, isChecked: !item.isChecked };
          }),
        };
      })
    );
  };

  const handleResetChecklist = () => {
    setChecklistData(initialChecklistData);
    toast({
      title: "Checklist Reset",
      description: "Your checklist has been reset to default state.",
    });
  };

  // Calculate overall progress
  const totalItems = checklistData.reduce((acc, section) => acc + section.items.length, 0);
  const completedItems = checklistData.reduce(
    (acc, section) => acc + section.items.filter(item => item.isChecked).length, 
    0
  );
  const overallProgress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <h2 className="font-semibold text-xl text-gray-800">Event Preparation Progress</h2>
            <div className="text-sm text-gray-500">
              {completedItems} of {totalItems} tasks completed ({Math.round(overallProgress)}%)
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mb-6 text-right">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleResetChecklist} 
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Reset Checklist
          </Button>
        </div>
        
        {checklistData.map((section) => (
          <ChecklistSection 
            key={section.id}
            section={section}
            onToggleItem={handleToggleItem}
          />
        ))}
        
        <PrintButton checklistData={checklistData} />
      </main>
      
      <footer className="bg-gray-100 py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Photo Booth Event Prep Checklist</p>
          <p className="mt-1">Use this checklist before every event to ensure you're fully prepared.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
