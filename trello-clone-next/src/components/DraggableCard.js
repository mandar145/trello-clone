"use client";

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import Card from './Card';

export default function DraggableCard({ card, listId }) {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: card.id,
        data: { listId }, // Provides listId to identify the originating list
    });

    return (
        <div ref={setNodeRef} {...listeners} {...attributes}>
            <Card text={card.text} />
        </div>
    );
}
