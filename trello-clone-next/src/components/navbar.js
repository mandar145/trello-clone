"use client";

import React from "react";

export default function Navbar({ isActivityRunning, opsCount, onStartActivity, onStopActivity }) {
  return (
    <nav className="app-nav">
      <span className="nav-brand">
        <span className="nav-brand-mark">&#9783;</span>
        Task Board
        <span className="framework-badge">Next.js 15</span>
      </span>

      <div className="nav-controls">
        {isActivityRunning && (
          <div className="activity-status">
            <span className="pulse-dot">
              <i className="fas fa-circle" style={{ fontSize: "8px" }}></i>
            </span>
            <span className="ops-count">{opsCount.toLocaleString()} ops</span>
          </div>
        )}

        <button
          className="nav-btn nav-btn--success"
          disabled={isActivityRunning}
          onClick={onStartActivity}
          title="Start activity simulator"
        >
          Start Activity
        </button>

        <button
          className="nav-btn nav-btn--danger"
          disabled={!isActivityRunning}
          onClick={onStopActivity}
          title="Stop activity simulator"
        >
          Stop Activity
        </button>
      </div>
    </nav>
  );
}
