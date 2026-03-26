"use client";

import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";

export default function DraggableCard({ id, listId, text, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { listId },
    disabled: isEditing,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    zIndex: isDragging ? 1000 : undefined,
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") handleCancel();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`card${isDragging ? " is-dragging" : ""}`}
      {...(isEditing ? {} : { ...attributes, ...listeners })}
    >
      {isEditing ? (
        <>
          <textarea
            className="card-edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            autoFocus
          />
          <div className="card-edit-actions">
            <button className="btn-save" onClick={handleSave}>
              <i className="fas fa-check"></i> Save
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
              <i className="fas fa-xmark"></i>
            </button>
          </div>
        </>
      ) : (
        <div className="card-display-row">
          <p className="card-text">{text}</p>
          <div className="card-actions">
            <button
              className="icon-btn icon-btn--sm"
              title="Edit card"
              onClick={(e) => { e.stopPropagation(); setIsEditing(true); setEditText(text); }}
            >
              <i className="fas fa-pen"></i>
            </button>
            <button
              className="icon-btn icon-btn--sm icon-btn--danger"
              title="Delete card"
              onClick={(e) => { e.stopPropagation(); onDelete(id); }}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
