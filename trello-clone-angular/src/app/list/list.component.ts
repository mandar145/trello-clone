import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  @Input() list: any; // Accept list data from parent
  @Output() removeList = new EventEmitter<string>(); // Notify parent to remove list

  newCardText: string = '';

  // Add a new card to the list
  addCard() {
    if (this.newCardText.trim() !== '') {
      const newCard = {
        id: uuidv4(),
        text: this.newCardText.trim(),
      };
      this.list.cards.push(newCard);
      this.newCardText = ''; // Clear input field
    }
  }

  // Remove a card from the list
  deleteCard(cardId: string) {
    this.list.cards = this.list.cards.filter((card: any) => card.id !== cardId);
  }

  // Notify parent to remove this list
  emitRemoveList() {
    this.removeList.emit(this.list.id);
  }

  // FontAwesome icons
  faTrash = faTrash;
  faPlus = faPlus;
}
