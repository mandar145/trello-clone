import React, { useState } from 'react';
import Card from './Card';
import { Droppable, Draggable } from 'react-beautiful-dnd';

export default function List( { title, listId }) {
    const [cards, setCards] = useState([]); // State to store list of cards - cards is an array and setcards updates card with new elements
    const [newCardText, setNewCardText] = useState(''); // State for the new card text

  // Handler for adding a new card
  const addCard = () => {
    if (newCardText.trim() === '') return; // Prevent empty cards
    setCards([...cards, newCardText]); // Add the new card to the list
    setNewCardText(''); // Clear the input field
  };

  return (
    <Droppable droppableId={listId} type="card">
      {(provided) => (
        <div
          className="list"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h3>{title}</h3>
          {cards.map((text, index) => (
            <Draggable key={index} draggableId={`card-${listId}-${index}`} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="card" // Added class for styling
                >
                  <Card text={text} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}

          <div className="add-card">
            <input
              type="text"
              value={newCardText}
              onChange={(e) => setNewCardText(e.target.value)}
              placeholder="Add a new card"
            />
            <button onClick={addCard}>Add Card</button>
          </div>
        </div>
      )}
    </Droppable>
  );
}