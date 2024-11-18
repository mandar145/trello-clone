import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  onStartActivity() {
    console.log('Activity started.');
    // Logic to start the activity
  }

  onStopActivity() {
    console.log('Activity stopped.');
    // Logic to stop the activity
  }

}
