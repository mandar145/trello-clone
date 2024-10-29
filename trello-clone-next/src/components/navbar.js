"use client"; // Necessary for Next.js client-side rendering
import React from "react";

export default function navbar() {
  return (
    <div>
      <nav
        className="navbar navbar-light"
        style={{ backgroundColor: "#000", color:"#fff" }}
      >
        <a className="navbar-brand" href="#">
          <h4 style={{color:"#fff" }}>Task Manager</h4>
        </a>
      </nav>
    </div>
  );
}
