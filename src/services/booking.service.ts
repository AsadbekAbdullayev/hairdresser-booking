import { Injectable } from '@angular/core';

export interface BookedSlot {
  day: string;
  time: string;
}

export interface DaySlots {
  day: string;
  times: { time: string; booked: boolean }[];
}

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private readonly storageKey = 'bookedSlots';
  private readonly days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  // Generate slots for 1 week (9 AM - 5 PM)
  getAvailableSlots(): DaySlots[] {
    const bookedSlots = this.getBookedSlots();

    return this.days.map((day) => {
      const times = Array.from({ length: 9 }, (_, i) => {
        const hour = 9 + i;
        const timeSlot = `${hour}:00`;

        return {
          time: timeSlot,
          booked: bookedSlots.some(
            (slot) => slot.day === day && slot.time === timeSlot
          ),
        };
      });

      return { day, times };
    });
  }

  // Read booked slots from localStorage
  getBookedSlots(): BookedSlot[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? (JSON.parse(stored) as BookedSlot[]) : [];
    } catch {
      return [];
    }
  }

  // Save slots safely
  private saveSlots(slots: BookedSlot[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(slots));
  }

  // Book a slot
  bookSlot(day: string, time: string): void {
    const bookedSlots = this.getBookedSlots();

    if (!bookedSlots.some((slot) => slot.day === day && slot.time === time)) {
      this.saveSlots([...bookedSlots, { day, time }]);
    }
  }

  // Cancel booking
  unbookSlot(day: string, time: string): void {
    const updated = this.getBookedSlots().filter(
      (slot) => !(slot.day === day && slot.time === time)
    );
    this.saveSlots(updated);
  }

  // Clear all slots
  clearAll(): void {
    localStorage.removeItem(this.storageKey);
  }
}
