"use client";

import React, { useState } from "react";
import ActivitySimulator from "./ActivitySimulator";
import List from "./List";
import { DndContext } from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";

export default function Board() {
  const [lists, setLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState("");

  const handleAddList = () => {
    if (newListTitle.trim() === "") return;

    const newList = { id: uuidv4(), title: newListTitle, cards: [] };
    setLists([...lists, newList]);
    setNewListTitle("");
  };

  const handleDeleteList = (listIndex) => {
    const updatedLists = lists.filter((_, index) => index !== listIndex);
    setLists(updatedLists);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Return if no valid drop target
    if (!over) return;

    const fromListId = active.data.current?.listId;
    const toListId = over.data.current?.listId;

    // Validate fromListId and toListId
    if (!fromListId || !toListId) return;

    setLists((prevLists) => {
      const fromList = prevLists.find((list) => list.id === fromListId);
      const toList = prevLists.find((list) => list.id === toListId);

      // Ensure both fromList and toList exist
      if (!fromList || !toList) return prevLists;

      // Ensure fromList has a cards array
      const fromCards = fromList.cards || [];
      const draggedCardIndex = fromCards.findIndex(
        (card) => card.id === active.id
      );

      // Validate draggedCardIndex
      if (draggedCardIndex === -1) return prevLists;

      // Remove the card from the source list
      const [movedCard] = fromCards.splice(draggedCardIndex, 1);

      // Ensure toList has a cards array
      const toCards = toList.cards || [];
      toCards.push(movedCard);

      return prevLists.map((list) => {
        if (list.id === fromListId) return { ...list, cards: fromCards };
        if (list.id === toListId) return { ...list, cards: toCards };
        return list;
      });
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="board">
        <ActivitySimulator lists={lists} setLists={setLists} />
        <div className="list-container">
          {lists.map((list, index) => (
            <List
              key={list.id}
              title={list.title}
              listId={list.id}
              listIndex={index}
              cards={list.cards || []} // Ensure cards is always an array
              onDeleteList={() => handleDeleteList(index)}
            />
          ))}
          <div className="add-list-container">
            <input
              type="text"
              className="form-control"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              placeholder="Add List"
            />
            <button className="btn btn-dark" onClick={handleAddList}>
              <i className="fa-regular fa-circle-check"></i>
            </button>
          </div>
        </div>
      </div>
    </DndContext>
  );
}
