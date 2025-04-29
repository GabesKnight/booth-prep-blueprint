
import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer, Download } from 'lucide-react';
import { ChecklistSection } from '@/data/checklistData';
import { EventDetails } from '@/components/EventDetailsForm';

interface PrintButtonProps {
  checklistData: ChecklistSection[];
  eventDetails?: EventDetails;
}

const PrintButton: React.FC<PrintButtonProps> = ({ checklistData, eventDetails }) => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print the checklist');
      return;
    }

    // Format event details
    const formattedDate = eventDetails?.eventDate 
      ? new Date(eventDetails.eventDate).toLocaleDateString() 
      : "________________________________";
    
    // Generate a printable version of the checklist
    const printContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Photo Booth Event Prep Checklist</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.4;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #1D4334;
            font-size: 11px;
          }
          h1 {
            text-align: center;
            color: #7F7354;
            margin-bottom: 10px;
            font-size: 18px;
          }
          h2 {
            color: #1D4334;
            border-bottom: 1px solid #DAC386;
            padding-bottom: 5px;
            margin-top: 12px;
            margin-bottom: 8px;
            font-size: 14px;
          }
          .header-info {
            text-align: center;
            margin-bottom: 15px;
            color: #7F7354;
          }
          .checkbox-item {
            margin: 4px 0;
            padding-left: 20px;
            position: relative;
          }
          .checkbox-item::before {
            content: "☐";
            position: absolute;
            left: 0;
            font-size: 1.1em;
            color: #7F7354;
          }
          .checked::before {
            content: "☑";
            color: #1D4334;
          }
          .item-text {
            text-decoration: none;
          }
          .section-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 5px;
          }
          @media print {
            body {
              font-size: 11px;
            }
            h1 {
              font-size: 18px;
            }
            h2 {
              font-size: 14px;
            }
          }
          @media (max-width: 600px) {
            .section-grid {
              grid-template-columns: 1fr;
            }
          }
          .event-details {
            margin: 15px 0;
            padding: 10px;
            border: 1px solid #DAC386;
            border-radius: 5px;
            background-color: #DAC386/10;
          }
          .event-details p {
            margin: 3px 0;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 0.8em;
            color: #847C57;
          }
          .company-name {
            font-weight: bold;
            color: #7F7354;
          }
          .reminder-box {
            margin-top: 15px;
            padding: 10px;
            border: 1px dashed #7F7354;
            background-color: #DAC386/10;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h1>The Knightly Photo Booth</h1>
        <div class="header-info">
          <p>Event Preparation Checklist</p>
        </div>
        
        <div class="event-details">
          <p><strong>Event Name:</strong> ${eventDetails?.eventName || "________________________________"}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Event Time:</strong> ${eventDetails?.eventTime || "________________________________"}</p>
          <p><strong>Setup Time:</strong> ${eventDetails?.setupTime || "________________________________"}</p>
          <p><strong>Venue:</strong> ${eventDetails?.eventAddress || "________________________________"}</p>
          <p><strong>Client Name:</strong> ${eventDetails?.clientName || "________________________________"}</p>
          <p><strong>Client Phone:</strong> ${eventDetails?.clientPhone || "________________________________"}</p>
        </div>
        
        ${checklistData.map(section => `
          <h2>${section.title}</h2>
          <div class="section-grid">
            ${section.items.map(item => `
              <div class="checkbox-item ${item.isChecked ? 'checked' : ''}">
                <span class="item-text">${item.text}</span>
              </div>
            `).join('')}
          </div>
        `).join('')}
        
        <div class="event-details">
          <p><strong>Additional Notes:</strong></p>
          <p>________________________________________________</p>
          <p>________________________________________________</p>
        </div>
        
        <div class="reminder-box">
          <p><strong>REMINDER:</strong> Review all items before leaving for the event. Incomplete items could impact your event's success!</p>
        </div>
        
        <div class="footer">
          <p>Generated on ${new Date().toLocaleDateString()}</p>
          <p class="company-name">The Knightly Photo Booth</p>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Give the browser a moment to load the content before printing
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <div className="flex gap-4 justify-center mt-4 mb-8">
      <Button 
        onClick={handlePrint}
        className="gap-2 bg-[#7F7354] hover:bg-[#1D4334] text-[#DAC386]"
      >
        <Printer className="h-4 w-4" />
        Print Checklist
      </Button>
      <Button 
        onClick={handlePrint}
        variant="outline"
        className="gap-2 border-[#7F7354] text-[#7F7354] hover:bg-[#DAC386]/20"
      >
        <Download className="h-4 w-4" />
        Export PDF
      </Button>
    </div>
  );
};

export default PrintButton;
