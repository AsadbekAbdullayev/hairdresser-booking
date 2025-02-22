import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    NzToolTipModule,
    NzTableModule,
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  bookedSlots: { [key: string]: string } = {
    'Monday-09:00': 'Asadbek Abdullayev',
    'Tuesday-10:00': 'Jasurbek Ibragimov',
    'Wednesday-11:00': 'Samandar Yuldashev',
  }; // Stores booked slots with user names
  schedule = [
    {
      day: 'Monday',
      hours: [
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
      ],
    },
    {
      day: 'Tuesday',
      hours: [
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
      ],
    },
    {
      day: 'Wednesday',
      hours: [
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
      ],
    },
    {
      day: 'Thursday',
      hours: [
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
      ],
    },
    {
      day: 'Friday',
      hours: [
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
      ],
    },
  ];

  isVisible = false;
  userName = '';
  selectedDay = '';
  selectedHour = '';

  constructor(private message: NzMessageService) {}

  // Open booking modal
  bookSlot(day: string, hour: string) {
    this.selectedDay = day;
    this.selectedHour = hour;
    this.isVisible = true;
  }

  // Confirm booking
  handleOk(): void {
    if (this.userName.trim()) {
      const key = `${this.selectedDay}-${this.selectedHour}`;
      this.bookedSlots[key] = this.userName; // Store user's name

      this.message.success(
        `Successfully booked ${this.selectedDay} at ${this.selectedHour} for ${this.userName}`
      );
      this.isVisible = false;
      this.userName = ''; // Reset input
    } else {
      this.message.warning('Please enter your name');
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  // Check if slot is booked
  isBooked(day: string, hour: string): boolean {
    return !!this.bookedSlots[`${day}-${hour}`];
  }

  // Get booked user name
  getBookedUser(day: string, hour: string): string {
    return this.bookedSlots[`${day}-${hour}`] || '';
  }
}
