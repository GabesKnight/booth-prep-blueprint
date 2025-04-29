
import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer, Download } from 'lucide-react';
import { ChecklistSection } from '@/data/checklistData';

interface PrintButtonProps {
  checklistData: ChecklistSection[];
}

const PrintButton: React.FC<PrintButtonProps> = ({ checklistData }) => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print the checklist');
      return;
    }

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
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            text-align: center;
            color: #4f46e5;
            margin-bottom: 10px;
          }
          h2 {
            color: #4f46e5;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 5px;
            margin-top: 25px;
          }
          .header-info {
            text-align: center;
            margin-bottom: 30px;
            color: #6b7280;
          }
          .checkbox-item {
            margin: 8px 0;
            padding-left: 30px;
            position: relative;
          }
          .checkbox-item::before {
            content: "☐";
            position: absolute;
            left: 0;
            font-size: 1.2em;
          }
          .checked::before {
            content: "☑";
          }
          .item-text {
            text-decoration: none;
          }
          .section-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          @media print {
            body {
              font-size: 12px;
            }
          }
          @media (max-width: 600px) {
            .section-grid {
              grid-template-columns: 1fr;
            }
          }
          .event-details {
            margin: 20px 0;
            padding: 15px;
            border: 1px solid #e5e7eb;
            border-radius: 5px;
          }
          .event-details p {
            margin: 5px 0;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 0.8em;
            color: #6b7280;
          }
        </style>
      </head>
      <body>
        <h1>Photo Booth Event Prep Checklist</h1>
        <div class="header-info">
          <p>Your comprehensive guide to photo booth event preparation</p>
        </div>
        
        <div class="event-details">
          <p><strong>Event Name:</strong> ________________________________</p>
          <p><strong>Date:</strong> ________________________________</p>
          <p><strong>Venue:</strong> ________________________________</p>
          <p><strong>Setup Time:</strong> ________________________________</p>
          <p><strong>Event Coordinator Contact:</strong> ________________________________</p>
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
          <p>________________________________________________</p>
          <p>________________________________________________</p>
        </div>
        
        <div class="footer">
          <p>Generated on ${new Date().toLocaleDateString()}</p>
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
        className="gap-2 bg-indigo-600 hover:bg-indigo-700"
      >
        <Printer className="h-4 w-4" />
        Print Checklist
      </Button>
      <Button 
        onClick={handlePrint}
        variant="outline"
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        Export PDF
      </Button>
    </div>
  );
};

export default PrintButton;
