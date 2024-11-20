import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, ListComponent,HeaderComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  lists: { id: string; title: string; cards: { id: string; text: string }[] }[] =
    [];
  newListTitle: string = '';

  // Add a new list
  addList() {
    if (!this.newListTitle.trim()) return; // Prevent empty titles
    this.lists.push({
      id: uuidv4(),
      title: this.newListTitle.trim(),
      cards: [],
    }); // Initialize with empty cards array
    this.newListTitle = ''; // Clear input
  }

  // Remove a list by ID
  removeList(listId: string) {
    this.lists = this.lists.filter((list) => list.id !== listId);
  }
}
