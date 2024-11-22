import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { HeaderComponent } from '../header/header.component';
import { ListComponent } from '../list/list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [HeaderComponent, ListComponent, CommonModule, FormsModule, FontAwesomeModule, DragDropModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  lists: { id: string; title: string; cards: { id: string; text: string }[], newCardText: string }[] = [];
  newListTitle: string = '';
  

  faTrash = faTrash;
  faPlus = faPlus;

  // Add a new list
  addList() {
    if (!this.newListTitle.trim()) return;
    this.lists.push({
      id: uuidv4(),
      title: this.newListTitle.trim(),
      cards: [],
      newCardText: '', // Initialize the newCardText property for each list
    });
    this.newListTitle = '';
  }

  // Add a card to a specific list
  addCard(listId: string) {
    const list = this.lists.find(list => list.id === listId);
    if (list && list.newCardText.trim()) {
      list.cards.push({
        id: uuidv4(),
        text: list.newCardText.trim(),
      });
      list.newCardText = ''; // Clear the input field after adding the card
    }
  }

  // Remove a list by ID
  removeList(listId: string) {
    this.lists = this.lists.filter((list) => list.id !== listId);
  }

  // Remove a card by ID from a specific list
  removeCard(listId: string, cardId: string) {
    const list = this.lists.find(list => list.id === listId);
    if (list) {
      list.cards = list.cards.filter(card => card.id !== cardId);
    }
  }

  // Handle list or card drop event
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      // Reordering cards within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Moving cards between different lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
