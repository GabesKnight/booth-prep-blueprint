
export interface ChecklistItem {
  id: string;
  text: string;
  isChecked: boolean;
}

export interface ChecklistSection {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export const initialChecklistData: ChecklistSection[] = [
  {
    id: "equipment",
    title: "1. Equipment Checklist",
    items: [
      { id: "booth-setup", text: "Photo booth setup & frame", isChecked: false },
      { id: "camera", text: "Camera with fully charged battery", isChecked: false },
      { id: "backup-camera", text: "Backup camera", isChecked: false },
      { id: "lighting", text: "Main lighting equipment", isChecked: false },
      { id: "backup-lighting", text: "Backup lighting", isChecked: false },
      { id: "printer", text: "Photo printer", isChecked: false },
      { id: "printer-supplies", text: "Printer paper & ink cartridges", isChecked: false },
      { id: "touchscreen", text: "Touchscreen/interface device", isChecked: false },
      { id: "backdrop", text: "Backdrop(s)", isChecked: false },
      { id: "backdrop-stand", text: "Backdrop stand", isChecked: false },
      { id: "memory-cards", text: "Extra memory cards", isChecked: false },
      { id: "tripod", text: "Tripod/mounting equipment", isChecked: false },
      { id: "cables", text: "All necessary cables & adapters", isChecked: false },
    ]
  },
  {
    id: "power",
    title: "2. Power & Connectivity",
    items: [
      { id: "power-strips", text: "Power strips", isChecked: false },
      { id: "extension-cords", text: "Extension cords", isChecked: false },
      { id: "backup-power", text: "Backup power supply/battery", isChecked: false },
      { id: "surge-protectors", text: "Surge protectors", isChecked: false },
      { id: "wifi-hotspot", text: "Wi-Fi hotspot device", isChecked: false },
      { id: "data-plan", text: "Confirmed data plan/connectivity", isChecked: false },
      { id: "cable-organizers", text: "Cable management/organizers", isChecked: false },
      { id: "gaffer-tape", text: "Gaffer tape (for securing cables)", isChecked: false },
    ]
  },
  {
    id: "props",
    title: "3. Props & Decor",
    items: [
      { id: "photo-props", text: "Photo props kit", isChecked: false },
      { id: "themed-props", text: "Event-specific themed props", isChecked: false },
      { id: "sanitization", text: "Prop sanitization supplies", isChecked: false },
      { id: "prop-table", text: "Props display table/stand", isChecked: false },
      { id: "booth-signage", text: "Photo booth signage", isChecked: false },
      { id: "instructions", text: "User instructions signage", isChecked: false },
      { id: "decor-items", text: "Booth decorations", isChecked: false },
      { id: "prop-organizer", text: "Prop storage/organizer", isChecked: false },
    ]
  },
  {
    id: "branding",
    title: "4. Branding & Customization",
    items: [
      { id: "photo-overlays", text: "Custom photo overlays", isChecked: false },
      { id: "start-screens", text: "Branded start screens", isChecked: false },
      { id: "custom-prints", text: "Custom print templates", isChecked: false },
      { id: "guestbook", text: "Event guestbook & supplies", isChecked: false },
      { id: "business-cards", text: "Business cards", isChecked: false },
      { id: "promo-materials", text: "Promotional materials", isChecked: false },
      { id: "booth-branding", text: "Booth branding elements", isChecked: false },
      { id: "client-logo", text: "Client logo files", isChecked: false },
    ]
  },
  {
    id: "software",
    title: "5. Software & Files",
    items: [
      { id: "software-update", text: "Software updated to latest version", isChecked: false },
      { id: "event-settings", text: "Event-specific settings configured", isChecked: false },
      { id: "test-shots", text: "Test shots & prints completed", isChecked: false },
      { id: "backup-software", text: "Software backup files", isChecked: false },
      { id: "gallery-setup", text: "Online gallery setup", isChecked: false },
      { id: "email-templates", text: "Email templates configured", isChecked: false },
      { id: "sharing-setup", text: "Social media sharing setup", isChecked: false },
      { id: "image-backup", text: "Image backup solution", isChecked: false },
    ]
  },
  {
    id: "staff",
    title: "6. Staff Essentials",
    items: [
      { id: "uniforms", text: "Staff uniforms/attire", isChecked: false },
      { id: "contact-info", text: "Venue & event contact information", isChecked: false },
      { id: "event-timeline", text: "Event timeline & schedule", isChecked: false },
      { id: "staff-meals", text: "Staff meals/snacks & water", isChecked: false },
      { id: "event-contract", text: "Copy of event contract", isChecked: false },
      { id: "staff-checklist", text: "Staff setup checklist", isChecked: false },
      { id: "staff-badges", text: "Staff identification badges", isChecked: false },
      { id: "talking-points", text: "Service & upsell talking points", isChecked: false },
    ]
  },
  {
    id: "emergency",
    title: "7. Emergency & Backup Kit",
    items: [
      { id: "extra-batteries", text: "Extra batteries (AA, AAA, camera)", isChecked: false },
      { id: "basic-toolkit", text: "Basic toolkit", isChecked: false },
      { id: "first-aid", text: "First-aid kit", isChecked: false },
      { id: "hand-sanitizer", text: "Hand sanitizer & cleaning supplies", isChecked: false },
      { id: "repair-kit", text: "Equipment repair kit", isChecked: false },
      { id: "emergency-contacts", text: "Emergency contact list", isChecked: false },
      { id: "weather-protection", text: "Weather protection gear", isChecked: false },
      { id: "backup-plan", text: "Written backup plan for emergencies", isChecked: false },
    ]
  }
];
