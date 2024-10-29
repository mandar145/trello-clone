"use client"; // Necessary for Next.js client-side rendering

import React, { useState } from "react";
import List from "./List"; // Ensure List is imported correctly
import { DndContext } from "@dnd-kit/core"; // Import DndContext from @dnd-kit/core

export default function Board() {
  const [lists, setLists] = useState([
    { id: "1", title: "To Do", cards: [{ id: "1", text: "Task 1" }] },
    { id: "2", title: "In Progress", cards: [{ id: "2", text: "Task 2" }] },
    { id: "3", title: "Done", cards: [{ id: "3", text: "Task 3" }] },
  ]);

  const handleDragEnd = (event) => {
    const active = event.active;
    const over = event.over;

    if (!over) return;

    const fromListId = active.data.current ? active.data.current.listId : null;
    const toListId = over.data.current ? over.data.current.listId : null;

    if (fromListId && toListId && fromListId === toListId) {
      reorderCardWithinList(fromListId, active.id, over.id);
    } else if (fromListId && toListId) {
      moveCard(fromListId, toListId, active.id);
    }
  };

  const reorderCardWithinList = (listId, cardId, targetCardId) => {
    const list = lists.find((list) => list.id === listId);
    const cardIndex = list.cards.findIndex((card) => card.id === cardId);
    const [movedCard] = list.cards.splice(cardIndex, 1);
    const targetIndex = list.cards.findIndex((card) => card.id === targetCardId);
    list.cards.splice(targetIndex, 0, movedCard);
    setLists([...lists]);
  };

  const moveCard = (fromListId, toListId, cardId) => {
    const fromList = lists.find((list) => list.id === fromListId);
    const toList = lists.find((list) => list.id === toListId);
    const cardIndex = fromList.cards.findIndex((card) => card.id === cardId);
    const [movedCard] = fromList.cards.splice(cardIndex, 1);
    toList.cards.push(movedCard);
    setLists([...lists]);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="board">
        <h2>My Board</h2>
        <div className="list-container">
          {lists.map((list) => (
            <List
              key={list.id}
              title={list.title}
              listId={list.id}
              cards={list.cards}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
}
