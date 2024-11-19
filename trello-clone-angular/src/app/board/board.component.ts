import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { v4 as uuidv4 } from 'uuid';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [HeaderComponent,FormsModule,CommonModule,FontAwesomeModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})


 export class BoardComponent {
  
  lists: { id: string, title: string }[] = []; // List array with UUID as ID
  newListTitle: string = ''; // Input value for new list title

  // Add a new list
  addList() {
    if (!this.newListTitle.trim()) return; // Prevent empty titles
    this.lists.push({ id: uuidv4(), title: this.newListTitle.trim() }); // Use UUID for unique ID
    this.newListTitle = ''; // Clear input
  }

  // Remove a list
  removeList(listId: string) {
    this.lists = this.lists.filter(list => list.id !== listId); // Filter out the list by UUID
  }

  //fONTAWESOME
  faTrash = faTrash;

}
