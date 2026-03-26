import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() isActivityRunning = false;
  @Input() opsCount = 0;

  @Output() startActivity = new EventEmitter<void>();
  @Output() stopActivity  = new EventEmitter<void>();

  faCircle = faCircle;

  onStartActivity(): void { this.startActivity.emit(); }
  onStopActivity(): void  { this.stopActivity.emit();  }
}
