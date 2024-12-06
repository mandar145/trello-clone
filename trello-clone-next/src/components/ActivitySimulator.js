"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ActivitySimulator({ lists, setLists }) {
  const [isActive, setIsActive] = useState(false);
  const [intervalIds, setIntervalIds] = useState([]);

  const addRandomCard = () => {
    if (lists.length === 0) return;

    const randomIndex = Math.floor(Math.random() * lists.length);
    const newCard = { id: uuidv4(), text: `Task ${Date.now()}` };

    setLists((prevLists) =>
      prevLists.map((list, index) =>
        index === randomIndex
          ? { ...list, cards: [...list.cards, newCard] }
          : list
      )
    );
  };

  const addRandomList = () => {
    const newList = {
      id: uuidv4(),
      title: `List ${Date.now()}`,
      cards: [],
    };

    setLists((prevLists) => [...prevLists, newList]);
  };

  const startActivity = () => {
    if (isActive) return;
    setIsActive(true);

    intervalIds.forEach((id) => clearInterval(id));
    setIntervalIds([]);

    const cardInterval = setInterval(() => {
      for (let i = 0; i < 5; i++) addRandomCard();
    }, 50);

    const listInterval = setInterval(() => {
      addRandomList();
    }, 500);

    setIntervalIds([cardInterval, listInterval]);
  };

  const stopActivity = () => {
    setIsActive(false);
    intervalIds.forEach((id) => clearInterval(id)); // Clear all intervals
    setIntervalIds([]); // Reset intervals
  };

  return (
    <div className="activity-controls">
      <button
        onClick={startActivity}
        className="btn btn-success"
        disabled={isActive}
      >
        <i className="fas fa-play"></i> Start Activity
      </button>
      <button
        onClick={stopActivity}
        className="btn btn-danger"
        disabled={!isActive}
      >
        <i className="fas fa-stop"></i> Stop Activity
      </button>
    </div>
  );
}
