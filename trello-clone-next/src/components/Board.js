"use client";

import React, { useState } from 'react';
import List from './List';
import { DndContext } from '@dnd-kit/core';

export default function Board() {
    const [lists, setLists] = useState([
        { id: '1', title: 'To Do', cards: [{ id: '1', text: 'Sample Card 1' }] },
        { id: '2', title: 'In Progress', cards: [{ id: '2', text: 'Sample Card 2' }] },
        { id: '3', title: 'Done', cards: [{ id: '3', text: 'Sample Card 3' }] }
    ]);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        console.log('Active:', active); // Check the active item
        console.log('Over:', over); // Check the over item

        if (!over) return; // If dropped outside any list

        const fromListId = active.data.current?.listId;
        const toListId = over.data.current?.listId;

        if (!fromListId || !toListId) {
            console.warn("Missing listId in active or over data");
            return;
        }

        if (fromListId !== toListId) {
            moveCard(fromListId, toListId, active.id);
        }
    };

    const moveCard = (fromListId, toListId, cardId) => {
        const fromList = lists.find(list => list.id === fromListId);
        const toList = lists.find(list => list.id === toListId);

        const cardIndex = fromList.cards.findIndex(card => card.id === cardId);
        const [movedCard] = fromList.cards.splice(cardIndex, 1);

        toList.cards.push(movedCard);

        setLists([...lists]);
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="board">
                <h2>My Board</h2>
                <div className="list-container">
                    {lists.map(list => (
                        <List key={list.id} title={list.title} listId={list.id} cards={list.cards} />
                    ))}
                </div>
            </div>
        </DndContext>
    );
}
