import React, { useState, useEffect } from "react";
import DraggableCard from "./DraggableCard";
import { useDroppable } from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid"; // Use UUID for consistent ID generation

export default function List({
  title,
  listId,
  cards,
  onDeleteCard,
  onDeleteList,
}) {
  const [newCardText, setNewCardText] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensure component renders after client mounts
  }, []);

  // Initialize the droppable area for the list
  const { setNodeRef } = useDroppable({
    id: listId,
    data: { listId },
  });

  // Function to add a new card
  function addCard() {
    if (newCardText.trim() === "") return;

    const newCard = { id: uuidv4(), text: newCardText }; // Generate a unique ID for each new card
    cards.push(newCard); // Add the card to the list
    setNewCardText(""); // Clear the input
  }

  if (!isMounted) return null; // Render only after mounting on the client to avoid hydration issues

  return (
    <div ref={setNodeRef} className="list">
      <div className="list-header">
        <h4>{title}</h4>
        <button
          className="delete-list btn btn-danger"
          onClick={() => onDeleteList(listId)} // Button to delete the entire list
        >
          <i className="fa-solid fa-x"></i>
        </button>
      </div>
      <hr />
      {/* Render each card in the list */}
      {cards.map((card, cardIndex) => (
        <div
          key={card.id}
          className="card-container"
          style={{ display: "flex", alignItems: "center" }}
        >
          <DraggableCard id={card.id} listId={listId} text={card.text}  />
          <button
            className="delete-card btn btn-danger"
            onClick={() => onDeleteCard(cardIndex)} // Trigger delete card with cardIndex only
            style={{ marginLeft: "8px" }}
          >
            <i className="fas fa-trash-alt"></i> 
          </button>
        </div>
      ))}
      {/* Input and button to add new cards */}
      <div className="add-card">
        <input
          type="text"
          className="form-control"
          value={newCardText}
          onChange={(e) => setNewCardText(e.target.value)}
          placeholder="Add a new card"
        />
        <br />
        <button className="btn btn-dark" onClick={addCard}>
        <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  );
}
