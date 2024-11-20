import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, ListComponent, HeaderComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  lists: { id: string; title: string; cards: { id: string; text: string }[] }[] =
    [];
  newListTitle: string = '';

  // Add a new list
  addList() {
    if (this.newListTitle.trim() !== '') {
      this.lists.push({
        id: uuidv4(),
        title: this.newListTitle.trim(),
        cards: []
      });
      this.newListTitle = '';
    }
  }

  // Remove a list
  removeList(listId: string) {
    this.lists = this.lists.filter((list) => list.id !== listId);
  }

  // FontAwesome icon
  faTrash = faTrash;
}
