
import React, { useState } from 'react';
import Header from '@/components/Header';
import ChecklistSection from '@/components/ChecklistSection';
import PrintButton from '@/components/PrintButton';
import EventDetailsForm, { EventDetails } from '@/components/EventDetailsForm';
import { initialChecklistData } from '@/data/checklistData';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [checklistData, setChecklistData] = useState(initialChecklistData);
  const [eventDetails, setEventDetails] = useState<EventDetails | undefined>(undefined);
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

  const handleSaveEventDetails = (details: EventDetails) => {
    setEventDetails(details);
  };

  // Calculate overall progress
  const totalItems = checklistData.reduce((acc, section) => acc + section.items.length, 0);
  const completedItems = checklistData.reduce(
    (acc, section) => acc + section.items.filter(item => item.isChecked).length, 
    0
  );
  const overallProgress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#DAC386]/10">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Event Details Form */}
        <EventDetailsForm onSave={handleSaveEventDetails} />
        
        {/* Progress Tracking */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-[#7F7354]/20">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <h2 className="font-semibold text-xl text-[#1D4334]">Event Preparation Progress</h2>
            <div className="text-sm text-[#7F7354]">
              {completedItems} of {totalItems} tasks completed ({Math.round(overallProgress)}%)
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-[#7F7354] to-[#1D4334] h-3 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mb-6 text-right">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleResetChecklist} 
            className="gap-2 border-[#7F7354] text-[#1D4334] hover:bg-[#DAC386]/20"
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
        
        <PrintButton checklistData={checklistData} eventDetails={eventDetails} />
      </main>
      
      <footer className="bg-[#847C57]/10 py-6 border-t border-[#847C57]/20">
        <div className="container mx-auto px-4 text-center text-[#1D4334] text-sm">
          <p>© {new Date().getFullYear()} The Knightly Photo Booth</p>
          <p className="mt-1">Use this checklist before every event to ensure you're fully prepared.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
