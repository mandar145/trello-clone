import React from 'react';
import { Draggable } from '@dnd-kit/core'; // Ensure Draggable is imported correctly

export default function Card({ text, id, listId }) {
  return (
    <Draggable id={id} data={{ listId }}>
      <div className="card form-control">
        <p>{text}</p>
      </div>
    </Draggable>
  );
}
