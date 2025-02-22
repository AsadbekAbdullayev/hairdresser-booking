import { Component } from '@angular/core';
import { BookingComponent } from './booking/booking.component';
@Component({
  selector: 'app-root',
  imports: [BookingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hairdresser-booking';
}
