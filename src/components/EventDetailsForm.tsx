
import React, { useState, useEffect } from 'react';
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { CalendarIcon, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export interface EventDetails {
  eventName: string;
  eventDate: Date | undefined;
  eventTime: string;
  setupTime: string;
  eventAddress: string;
  clientName: string;
  clientPhone: string;
}

interface EventDetailsFormProps {
  onSave: (details: EventDetails) => void;
}

const EventDetailsForm: React.FC<EventDetailsFormProps> = ({ onSave }) => {
  const { toast } = useToast();
  const [hasRequiredFields, setHasRequiredFields] = useState(false);
  
  const form = useForm<EventDetails>({
    defaultValues: {
      eventName: "",
      eventDate: undefined,
      eventTime: "",
      setupTime: "",
      eventAddress: "",
      clientName: "",
      clientPhone: "",
    }
  });

  // Watch for changes in the required fields
  const eventName = form.watch("eventName");
  const eventDate = form.watch("eventDate");
  const eventTime = form.watch("eventTime");
  
  // Check if required fields have values
  useEffect(() => {
    if (eventName && eventDate && eventTime) {
      setHasRequiredFields(true);
    } else {
      setHasRequiredFields(false);
    }
  }, [eventName, eventDate, eventTime]);

  const calculateSetupTime = (eventTime: string): string => {
    if (!eventTime) return "";
    
    try {
      // Parse the time string (format: HH:MM)
      const [hours, minutes] = eventTime.split(':').map(Number);
      
      // Subtract 60 minutes for setup
      let setupHours = hours;
      let setupMinutes = minutes;
      
      if (setupMinutes < 60) {
        setupHours = setupHours - 1;
        setupMinutes = setupMinutes + 60 - 60;
      } else {
        setupMinutes = setupMinutes - 60;
      }
      
      // Handle edge cases
      if (setupHours < 0) setupHours = 23;
      
      // Format the setup time
      return `${String(setupHours).padStart(2, '0')}:${String(setupMinutes).padStart(2, '0')}`;
    } catch (error) {
      console.error("Error calculating setup time:", error);
      return "";
    }
  };

  // Update setup time when event time changes
  const handleEventTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEventTime = e.target.value;
    form.setValue("eventTime", newEventTime);
    
    const newSetupTime = calculateSetupTime(newEventTime);
    form.setValue("setupTime", newSetupTime);
  };

  const onSubmit = (data: EventDetails) => {
    onSave(data);
    toast({
      title: "Event details saved",
      description: "Your event details have been saved successfully.",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <h2 className="font-semibold text-xl text-gray-800 mb-4">Event Details</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Event Name */}
            <FormField
              control={form.control}
              name="eventName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Event Date */}
            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            {/* Event Time */}
            <FormField
              control={form.control}
              name="eventTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Start Time</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 opacity-50" />
                      <Input 
                        type="time" 
                        placeholder="Select time"
                        {...field}
                        onChange={handleEventTimeChange}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Setup Time (Calculated) */}
            <FormField
              control={form.control}
              name="setupTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Setup Time (60 mins before)</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 opacity-50" />
                      <Input 
                        type="time"
                        readOnly 
                        className="bg-gray-50" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Client Name */}
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter client name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Client Phone */}
            <FormField
              control={form.control}
              name="clientPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter client phone number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Event Address */}
          <FormField
            control={form.control}
            name="eventAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Address</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter event address"
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {hasRequiredFields && (
            <Button type="submit" className="bg-brand-darkGreen hover:bg-brand-darkGreen/90 text-brand-gold">
              Save Event Details
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default EventDetailsForm;
