import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private storageKey = 'bookedSlots';

  constructor() {}

  // Generate time slots for 1 week (Monday - Sunday, 9 AM - 5 PM)
  getAvailableSlots(): {
    day: string;
    times: { time: string; booked: boolean }[];
  }[] {
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    const bookedSlots = this.getBookedSlots();
    const slots: { day: string; times: { time: string; booked: boolean }[] }[] =
      [];

    days.forEach((day) => {
      const times = [];
      for (let hour = 9; hour <= 17; hour++) {
        const timeSlot = `${hour}:00`;
        times.push({
          time: timeSlot,
          booked: bookedSlots.some(
            (slot) => slot.day === day && slot.time === timeSlot
          ),
        });
      }
      slots.push({ day, times });
    });

    return slots;
  }

  // Get booked slots from localStorage
  getBookedSlots(): { day: string; time: string }[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  // Book a time slot and save to localStorage
  bookSlot(day: string, time: string): void {
    const bookedSlots = this.getBookedSlots();
    bookedSlots.push({ day, time });
    localStorage.setItem(this.storageKey, JSON.stringify(bookedSlots));
  }
}
