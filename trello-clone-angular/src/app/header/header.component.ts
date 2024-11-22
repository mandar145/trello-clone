import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Output() startActivity = new EventEmitter<void>();
  @Output() stopActivity = new EventEmitter<void>();

  onStartActivity() {
    this.startActivity.emit();
  }

  onStopActivity() {
    this.stopActivity.emit();
  }

}
