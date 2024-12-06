"use client"; // Required for Next.js client-side rendering

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

export default function ActivitySimulator({ lists, setLists }) {
  const [isActive, setIsActive] = useState(false);
  const [intervalIds, setIntervalIds] = useState([]);

  // Function to add a random card to a random list
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

  // Function to add a new random list
  const addRandomList = () => {
    const newList = {
      id: uuidv4(),
      title: `List ${Date.now()}`,
      cards: [],
    };

    setLists((prevLists) => [...prevLists, newList]);
  };

  // Start activity logic
  const startActivity = () => {
    if (isActive) return;
    setIsActive(true);

    // High-speed card addition: 5 cards every 50ms
    const cardInterval = setInterval(() => {
      for (let i = 0; i < 5; i++) addRandomCard();
    }, 50);

    // High-speed list addition: 1 list every 500ms
    const listInterval = setInterval(() => {
      addRandomList();
    }, 500);

    setIntervalIds([cardInterval, listInterval]);
  };

  // Stop activity logic
  const stopActivity = () => {
    setIsActive(false);
    intervalIds.forEach((id) => clearInterval(id)); // Clear all intervals
    setIntervalIds([]);
  };

  return (
    <div className="activity-controls">
      <button
        onClick={startActivity}
        className="btn btn-success"
        disabled={isActive}
      >
        Start Activity
      </button>
      <button
        onClick={stopActivity}
        className="btn btn-danger"
        disabled={!isActive}
      >
        Stop Activity
      </button>
    </div>
  );
}
