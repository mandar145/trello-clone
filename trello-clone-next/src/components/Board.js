"use client";

import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { DndContext } from "@dnd-kit/core";
import Navbar from "./navbar";
import List from "./List";

const STORAGE_KEY = "trello_board_next";

export default function Board() {
  const [isMounted, setIsMounted] = useState(false);
  const [lists, setLists] = useState([]);
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [isActivityRunning, setIsActivityRunning] = useState(false);
  const [opsCount, setOpsCount] = useState(0);

  const activityIntervalRef = useRef(null);
  const opsCountRef = useRef(0);

  // ── Mount & load ────────────────────────────────────────────────────

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setLists(JSON.parse(saved));
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsMounted(true);
  }, []);

  // ── Helpers ─────────────────────────────────────────────────────────

  const saveLists = (updatedLists) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLists));
  };

  // ── List handlers ────────────────────────────────────────────────────

  const handleAddList = () => {
    if (!newListTitle.trim()) return;
    const newList = { id: uuidv4(), title: newListTitle.trim(), cards: [] };
    const updated = [...lists, newList];
    setLists(updated);
    saveLists(updated);
    setNewListTitle("");
    setIsAddingList(false);
  };

  const handleDeleteList = (listId) => {
    const updated = lists.filter((l) => l.id !== listId);
    setLists(updated);
    saveLists(updated);
  };

  const handleEditListTitle = (listId, newTitle) => {
    const updated = lists.map((l) =>
      l.id === listId ? { ...l, title: newTitle } : l
    );
    setLists(updated);
    saveLists(updated);
  };

  // ── Card handlers ────────────────────────────────────────────────────

  const handleAddCard = (listId, text) => {
    const newCard = { id: uuidv4(), text };
    const updated = lists.map((l) =>
      l.id === listId ? { ...l, cards: [...l.cards, newCard] } : l
    );
    setLists(updated);
    saveLists(updated);
  };

  const handleDeleteCard = (listId, cardId) => {
    const updated = lists.map((l) =>
      l.id === listId
        ? { ...l, cards: l.cards.filter((c) => c.id !== cardId) }
        : l
    );
    setLists(updated);
    saveLists(updated);
  };

  const handleEditCard = (listId, cardId, newText) => {
    const updated = lists.map((l) =>
      l.id === listId
        ? {
            ...l,
            cards: l.cards.map((c) =>
              c.id === cardId ? { ...c, text: newText } : c
            ),
          }
        : l
    );
    setLists(updated);
    saveLists(updated);
  };

  // ── Drag & drop ──────────────────────────────────────────────────────

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const fromListId = active.data.current?.listId;
    const toListId = over.id;

    if (!fromListId || !toListId || fromListId === toListId) return;

    const cardId = active.id;

    setLists((prevLists) => {
      let movedCard = null;

      const withRemoved = prevLists.map((l) => {
        if (l.id !== fromListId) return l;
        const newCards = l.cards.filter((c) => {
          if (c.id === cardId) { movedCard = c; return false; }
          return true;
        });
        return { ...l, cards: newCards };
      });

      if (!movedCard) return prevLists;

      return withRemoved.map((l) =>
        l.id === toListId ? { ...l, cards: [...l.cards, movedCard] } : l
      );
    });
  };

  // ── Activity simulator ───────────────────────────────────────────────

  const startActivity = () => {
    if (activityIntervalRef.current) return;
    opsCountRef.current = 0;
    setOpsCount(0);
    setIsActivityRunning(true);

    activityIntervalRef.current = setInterval(() => {
      setLists((prevLists) => {
        let updated = prevLists;
        for (let i = 0; i < 50; i++) {
          if (Math.random() < 0.5) {
            updated = [
              ...updated,
              {
                id: uuidv4(),
                title: `List ${Math.random().toString(36).substring(2, 7)}`,
                cards: [],
              },
            ];
          } else if (updated.length > 0) {
            const idx = Math.floor(Math.random() * updated.length);
            updated = updated.map((l, i) =>
              i === idx
                ? {
                    ...l,
                    cards: [
                      ...l.cards,
                      {
                        id: uuidv4(),
                        text: `Card ${Math.random().toString(36).substring(2, 7)}`,
                      },
                    ],
                  }
                : l
            );
          }
          opsCountRef.current++;
        }
        setOpsCount(opsCountRef.current);
        return updated;
      });
    }, 100);
  };

  const stopActivity = () => {
    if (activityIntervalRef.current) {
      clearInterval(activityIntervalRef.current);
      activityIntervalRef.current = null;
    }
    setIsActivityRunning(false);
    // Save current state after stopping
    setLists((current) => { saveLists(current); return current; });
  };

  // ── Keyboard handlers ─────────────────────────────────────────────────

  const handleAddListKeyDown = (e) => {
    if (e.key === "Enter") handleAddList();
    if (e.key === "Escape") { setNewListTitle(""); setIsAddingList(false); }
  };

  // ── Render ────────────────────────────────────────────────────────────

  if (!isMounted) return null;

  return (
    <>
      <Navbar
        isActivityRunning={isActivityRunning}
        opsCount={opsCount}
        onStartActivity={startActivity}
        onStopActivity={stopActivity}
      />

      <div className="board">
        <DndContext onDragEnd={handleDragEnd}>
          <div className="list-container">
            {lists.map((list) => (
              <List
                key={list.id}
                title={list.title}
                listId={list.id}
                cards={list.cards || []}
                onDeleteList={handleDeleteList}
                onDeleteCard={handleDeleteCard}
                onAddCard={handleAddCard}
                onEditCard={handleEditCard}
                onEditListTitle={handleEditListTitle}
              />
            ))}

            {/* Add a list panel */}
            <div className="add-list-panel">
              {!isAddingList ? (
                <button className="add-list-btn" onClick={() => setIsAddingList(true)}>
                  <i className="fas fa-plus"></i> Add another list
                </button>
              ) : (
                <div className="add-list-form">
                  <input
                    type="text"
                    className="add-list-input"
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                    onKeyDown={handleAddListKeyDown}
                    placeholder="Enter list title…"
                    autoFocus
                  />
                  <div className="add-list-form-actions">
                    <button className="btn-confirm-list" onClick={handleAddList}>
                      Add list
                    </button>
                    <button
                      className="btn-cancel-list"
                      onClick={() => { setNewListTitle(""); setIsAddingList(false); }}
                    >
                      <i className="fas fa-xmark"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DndContext>
      </div>
    </>
  );
}
