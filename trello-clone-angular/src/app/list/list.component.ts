import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() list: any; // List data passed from the parent
  @Output() removeList = new EventEmitter<string>(); // Emit list ID to remove
  newCardText: string = ''; // Input for new card text

  // Add a card
  addCard() {
    if (this.newCardText.trim() !== '') {
      this.list.cards.push({
        id: uuidv4(),
        text: this.newCardText
      });
      this.newCardText = '';
    }
  }

  // Remove a card
  deleteCard(cardId: string) {
    this.list.cards = this.list.cards.filter((card: any) => card.id !== cardId);
  }

  // Emit event to remove list
  emitRemoveList() {
    this.removeList.emit(this.list.id);
  }

  // FontAwesome icons
  faPlus = faPlus;
  faTrash = faTrash;
}
