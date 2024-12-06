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
  activityInterval: any = null;

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


// Start automated activity for performance testing
startActivity() {
  if (this.activityInterval) return;

  let batchSize = 50; // Number of operations per interval
  let intervalTime = 100; // Time in milliseconds for the interval

  this.activityInterval = setInterval(() => {
    for (let i = 0; i < batchSize; i++) {
      const randomAction = Math.floor(Math.random() * 2);

      if (randomAction === 0) {
        // Randomly create a new list
        this.lists.push({
          id: uuidv4(),
          title: `List ${Math.random().toString(36).substring(2, 7)}`,
          cards: [],
          newCardText: '',
        });
      } else if (randomAction === 1 && this.lists.length > 0) {
        // Randomly add a card to an existing list
        const randomList = this.lists[Math.floor(Math.random() * this.lists.length)];
        randomList.cards.push({
          id: uuidv4(),
          text: `Card ${Math.random().toString(36).substring(2, 7)}`,
        });
      }
    }
  }, intervalTime);
}


  
    stopActivity() {
      if (this.activityInterval) {
        clearInterval(this.activityInterval);
        this.activityInterval = null;
      }
    }

    randomDragDrop() {
      if (this.lists.length > 1) {
        const sourceList = this.lists[Math.floor(Math.random() * this.lists.length)];
        const targetList = this.lists[Math.floor(Math.random() * this.lists.length)];
        if (sourceList.cards.length > 0 && sourceList !== targetList) {
          // Move the last card from source to target
          const card = sourceList.cards.pop();
          if (card) targetList.cards.push(card);
        }
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
