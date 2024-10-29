import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export default function DraggableCard({ id, listId, text }) {
  // Set up the draggable item using useDraggable
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { listId }
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="card">
      <p>{text}</p>
    </div>
  );
}
