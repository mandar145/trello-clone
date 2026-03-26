import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPlus, faPen, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

// ── Interfaces ────────────────────────────────────────────────────────────────

export interface Card {
  id: string;
  text: string;
}

export interface List {
  id: string;
  title: string;
  cards: Card[];
  newCardText: string; // transient UI state – stripped on save
}

// ── Persistence types ─────────────────────────────────────────────────────────

interface PersistedList {
  id: string;
  title: string;
  cards: { id: string; text: string }[];
}

const STORAGE_KEY = 'trello_board_angular';

// ── Component ─────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule, FontAwesomeModule, DragDropModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  lists: List[] = [];

  // "Add a list" panel
  isAddingList = false;
  newListTitle = '';

  // Inline list-title editing
  editingListId: string | null = null;
  editingListTitle = '';

  // Inline card editing
  editingCardId: string | null = null;
  editingCardText = '';

  // Activity simulator
  private activityInterval: ReturnType<typeof setInterval> | null = null;
  opsCount = 0;

  get isActivityRunning(): boolean {
    return this.activityInterval !== null;
  }

  // Icons
  faTrash = faTrash;
  faPlus  = faPlus;
  faPen   = faPen;
  faXmark = faXmark;
  faCheck = faCheck;

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.loadFromLocalStorage();
  }

  // ── Persistence ──────────────────────────────────────────────────────────

  private saveToLocalStorage(): void {
    const payload: PersistedList[] = this.lists.map(l => ({
      id: l.id,
      title: l.title,
      cards: l.cards.map(c => ({ id: c.id, text: c.text })),
    }));
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }

  private loadFromLocalStorage(): void {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed: PersistedList[] = JSON.parse(raw);
      this.lists = parsed.map(l => ({
        id: l.id,
        title: l.title,
        cards: l.cards.map(c => ({ id: c.id, text: c.text })),
        newCardText: '',
      }));
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }

  // ── trackBy ──────────────────────────────────────────────────────────────

  trackByListId(_index: number, list: List): string { return list.id; }
  trackByCardId(_index: number, card: Card): string { return card.id; }

  // ── Add / Remove List ─────────────────────────────────────────────────────

  openAddList(): void {
    this.isAddingList = true;
    this.newListTitle = '';
  }

  cancelAddList(): void {
    this.isAddingList = false;
    this.newListTitle = '';
  }

  addList(): void {
    if (!this.newListTitle.trim()) return;
    this.lists.push({
      id: uuidv4(),
      title: this.newListTitle.trim(),
      cards: [],
      newCardText: '',
    });
    this.newListTitle = '';
    this.isAddingList = false;
    this.saveToLocalStorage();
  }

  removeList(listId: string): void {
    this.lists = this.lists.filter(l => l.id !== listId);
    this.saveToLocalStorage();
  }

  // ── Inline list-title editing ─────────────────────────────────────────────

  startEditList(list: List): void {
    this.editingListId = list.id;
    this.editingListTitle = list.title;
  }

  confirmEditList(): void {
    if (!this.editingListId) return;
    const list = this.lists.find(l => l.id === this.editingListId);
    if (list && this.editingListTitle.trim()) {
      list.title = this.editingListTitle.trim();
      this.saveToLocalStorage();
    }
    this.editingListId = null;
    this.editingListTitle = '';
  }

  cancelEditList(): void {
    this.editingListId = null;
    this.editingListTitle = '';
  }

  // ── Add / Remove Card ─────────────────────────────────────────────────────

  addCard(listId: string): void {
    const list = this.lists.find(l => l.id === listId);
    if (list && list.newCardText.trim()) {
      list.cards.push({ id: uuidv4(), text: list.newCardText.trim() });
      list.newCardText = '';
      this.saveToLocalStorage();
    }
  }

  removeCard(listId: string, cardId: string): void {
    const list = this.lists.find(l => l.id === listId);
    if (list) {
      list.cards = list.cards.filter(c => c.id !== cardId);
      this.saveToLocalStorage();
    }
  }

  // ── Inline card editing ───────────────────────────────────────────────────

  startEditCard(card: Card): void {
    this.editingCardId = card.id;
    this.editingCardText = card.text;
  }

  confirmEditCard(listId: string): void {
    if (!this.editingCardId) return;
    const list = this.lists.find(l => l.id === listId);
    if (list) {
      const card = list.cards.find(c => c.id === this.editingCardId);
      if (card && this.editingCardText.trim()) {
        card.text = this.editingCardText.trim();
        this.saveToLocalStorage();
      }
    }
    this.editingCardId = null;
    this.editingCardText = '';
  }

  cancelEditCard(): void {
    this.editingCardId = null;
    this.editingCardText = '';
  }

  // ── Drag & Drop ───────────────────────────────────────────────────────────

  drop(event: CdkDragDrop<Card[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.saveToLocalStorage();
  }

  // ── Activity simulator ────────────────────────────────────────────────────

  startActivity(): void {
    if (this.activityInterval) return;
    this.opsCount = 0;

    this.activityInterval = setInterval(() => {
      for (let i = 0; i < 50; i++) {
        if (Math.random() < 0.5) {
          this.lists.push({
            id: uuidv4(),
            title: `List ${Math.random().toString(36).substring(2, 7)}`,
            cards: [],
            newCardText: '',
          });
        } else if (this.lists.length > 0) {
          const idx = Math.floor(Math.random() * this.lists.length);
          this.lists[idx].cards.push({
            id: uuidv4(),
            text: `Card ${Math.random().toString(36).substring(2, 7)}`,
          });
        }
        this.opsCount++;
      }
    }, 100);
  }

  stopActivity(): void {
    if (this.activityInterval) {
      clearInterval(this.activityInterval);
      this.activityInterval = null;
      this.saveToLocalStorage();
    }
  }
}
