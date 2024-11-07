"use client"; // Necessary for Next.js client-side rendering

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // For unique IDs

export default function ActivitySimulator({ lists, setLists }) {
  const [isActive, setIsActive] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Function to add a random card
  const addRandomCard = () => {
    const listIndex = Math.floor(Math.random() * lists.length);
    const newCard = { id: uuidv4(), text: `Task ${Date.now()}` };

    setLists((prevLists) =>
      prevLists.map((list, index) =>
        index === listIndex
          ? { ...list, cards: [...list.cards, newCard] }
          : list
      )
    );
  };

  // Function to add a random list
  const addRandomList = () => {
    const newList = {
      id: uuidv4(),
      title: `List ${Date.now()}`,
      cards: [],
    };

    setLists((prevLists) => [...prevLists, newList]);
  };

  // Start activity simulation
  const startActivity = () => {
    if (isActive) return;

    setIsActive(true);
    const newIntervalId = setInterval(() => {
      addRandomCard();
      if (Math.random() > 0.5) {
        addRandomList();
      }
    }, 2000); // Adjust interval as needed
    setIntervalId(newIntervalId);
  };

  // Stop activity simulation
  const stopActivity = () => {
    setIsActive(false);
    clearInterval(intervalId);
  };

  return (
    <div className="activity-controls">
      <button onClick={startActivity} disabled={isActive}>
        Start Activity
      </button>
      <button onClick={stopActivity} disabled={!isActive}>
        Stop Activity
      </button>
    </div>
  );
}
