"use client";

import React, { useState } from "react";
import DraggableCard from "./DraggableCard";
import { useDroppable } from "@dnd-kit/core";

export default function List({
  title,
  listId,
  cards = [],
  onDeleteList,
  onDeleteCard,
  onAddCard,
  onEditCard,
  onEditListTitle,
}) {
  const [newCardText, setNewCardText] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitleValue, setEditTitleValue] = useState(title);

  const { setNodeRef } = useDroppable({ id: listId, data: { listId } });

  const handleAddCard = () => {
    if (!newCardText.trim()) return;
    onAddCard(listId, newCardText.trim());
    setNewCardText("");
  };

  const handleCardKeyDown = (e) => {
    if (e.key === "Enter") handleAddCard();
  };

  const handleSaveTitle = () => {
    if (editTitleValue.trim()) {
      onEditListTitle(listId, editTitleValue.trim());
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") handleSaveTitle();
    if (e.key === "Escape") {
      setEditTitleValue(title);
      setIsEditingTitle(false);
    }
  };

  return (
    <div ref={setNodeRef} className="list">
      {/* List header */}
      <div className="list-header">
        {isEditingTitle ? (
          <input
            className="list-title-input"
            value={editTitleValue}
            onChange={(e) => setEditTitleValue(e.target.value)}
            onKeyDown={handleTitleKeyDown}
            autoFocus
          />
        ) : (
          <h3 className="list-title" onDoubleClick={() => { setIsEditingTitle(true); setEditTitleValue(title); }}>
            {title}
          </h3>
        )}

        <div className="list-header-actions">
          {isEditingTitle ? (
            <>
              <button className="icon-btn" title="Save" onClick={handleSaveTitle}>
                <i className="fas fa-check"></i>
              </button>
              <button className="icon-btn" title="Cancel" onClick={() => { setEditTitleValue(title); setIsEditingTitle(false); }}>
                <i className="fas fa-xmark"></i>
              </button>
            </>
          ) : (
            <>
              <button className="icon-btn" title="Rename list" onClick={() => { setIsEditingTitle(true); setEditTitleValue(title); }}>
                <i className="fas fa-pen"></i>
              </button>
              <button className="icon-btn icon-btn--danger" title="Delete list" onClick={() => onDeleteList(listId)}>
                <i className="fas fa-trash"></i>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Cards */}
      {cards
        .filter((card) => card && card.id)
        .map((card) => (
          <DraggableCard
            key={card.id}
            id={card.id}
            listId={listId}
            text={card.text}
            onDelete={(cardId) => onDeleteCard(listId, cardId)}
            onEdit={(cardId, newText) => onEditCard(listId, cardId, newText)}
          />
        ))}

      {/* Add card */}
      <div className="add-card">
        <input
          type="text"
          className="add-card-input"
          value={newCardText}
          onChange={(e) => setNewCardText(e.target.value)}
          onKeyDown={handleCardKeyDown}
          placeholder="Add a card…"
        />
        <button className="btn-add-card" onClick={handleAddCard} title="Add card">
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </div>
  );
}
