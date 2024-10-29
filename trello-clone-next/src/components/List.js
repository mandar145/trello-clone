"use client";

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import DraggableCard from './DraggableCard';

export default function List({ title, listId, cards }) {
    const { setNodeRef: setDroppableRef } = useDroppable({
        id: listId,
        data: { listId }, // Ensures listId is accessible in drag events
    });

    return (
        <div ref={setDroppableRef} className="list">
            <h3>{title}</h3>
            <div className="card-container">
                {cards.map(card => (
                    <DraggableCard key={card.id} card={card} listId={listId} />
                ))}
            </div>
        </div>
    );
}
