import React, { useState } from 'react';
import DraggableCard from './DraggableCard';
import { useDroppable } from '@dnd-kit/core';

export default function List({ title, listId, cards }) {
  const [newCardText, setNewCardText] = useState('');
  
  // Set up the droppable area using useDroppable
  const { setNodeRef } = useDroppable({
    id: listId,
    data: { listId }
  });

  function addCard() {
    if (newCardText.trim() === '') return;

    const newCard = { id: Date.now().toString(), text: newCardText };
    cards.push(newCard);
    setNewCardText('');
  }

  return (
    <div ref={setNodeRef} className="list">
      <h4>{title}</h4>
      <hr></hr>
      {cards.map((card) => (
        <DraggableCard key={card.id} id={card.id} listId={listId} text={card.text} />
      ))}
      <div className="add-card">
        <input
          type="text" className='form-control'
          value={newCardText}
          onChange={(e) => setNewCardText(e.target.value)}
          placeholder="Add a new card"
        />
        <br/>
        <button  className='btn btn-dark' onClick={addCard}>Add Card</button>
      </div>
    </div>
  );
}
