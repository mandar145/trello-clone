"use client"; // Necessary for Next.js client-side rendering

import React, { useState } from "react";
import List from "./List"; // Ensure List is imported correctly

import { DndContext } from "@dnd-kit/core"; // Import DndContext from @dnd-kit/core
import { v4 as uuidv4 } from "uuid"; // Import uuid for unique IDs

export default function Board() {
  const [lists, setLists] = useState([
    { id: "1", title: "To Do", cards: [] },
    { id: "2", title: "In Progress", cards: [] },
    { id: "3", title: "Done", cards: [] },
  ]);

  // New state to handle new list title input
  const [newListTitle, setNewListTitle] = useState("");

  // Functions

  // Function to add a new list
  const handleAddList = () => {
    if (newListTitle.trim() === "") return;

    const newList = { id: uuidv4(), title: newListTitle, cards: [] };
    setLists([...lists, newList]);
    setNewListTitle("");
  };

  // Delete a specific card in a list
  const handleDeleteCard = (listIndex, cardIndex) => {
    setLists((prevLists) =>
      prevLists.map((list, i) =>
        i === listIndex
          ? { ...list, cards: list.cards.filter((_, j) => j !== cardIndex) }
          : list
      )
    );
  };

  // Delete a list
  const handleDeleteList = (listIndex) => {
    const updatedLists = lists.filter((_, index) => index !== listIndex);
    setLists(updatedLists);
  };

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
    const targetIndex = list.cards.findIndex(
      (card) => card.id === targetCardId
    );
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

      <br></br>
        <div className="list-container">
          {lists.map((list, index) => (
            <List
              key={list.id}
              title={list.title}
              listId={list.id}
              listIndex={index} // Pass the index here
              cards={list.cards}
              onDeleteCard={(cardIndex) => handleDeleteCard(index, cardIndex)} // Pass delete card handler
              onDeleteList={() => handleDeleteList(index)}
            />
          ))}

          {/* Add List Button as the last item */}
          <div
            className="add-list-container"
            style={{
              backgroundColor: "#f4f4f8", // Background color
              padding: "10px", // Padding
              borderRadius: "5px", // Rounded corners
              display:"flex",
              alignItems:"center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow effect          
              cursor: "pointer", // Pointer cursor on hover
            }}
          >
            <input
              type="text"
              className="form-control"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              placeholder="Add List"
            />
            <br />&nbsp;
            <button className="btn btn-dark" onClick={handleAddList}>
            <i className="fa-regular fa-circle-check"></i>
            </button>
          </div>
        </div>
      </div>
    </DndContext>
  );
}
